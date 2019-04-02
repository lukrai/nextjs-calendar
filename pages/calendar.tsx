
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Block from "@material-ui/icons/Block";
// @ts-ignore
import { NextAuth } from "next-auth/client";
import Link from "next/link";
import Router from "next/router";
import React, { ReactNode, useCallback, useState } from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import { CalendarItem, DisabledItem, EmptyItem } from "../components/calendar/gridItems";
import {CustomDayPickerInput} from "../components/customDayPickerInput";
import { AlertDialog } from "../components/dialogs/alertDialog";
import Layout from "../components/layout/layout";
import { ICourtCase, ICourtCases, ICourtCasesTuple } from "../dto";

const calendarItemStyle: React.CSSProperties = { minWidth: "150px", minHeight: "75px" };

const courtCaseTest: ICourtCase = {
    fileNo: "Nr. eB2-1047-730/2018",
    court: "Kauno Apylinkės Teismas",
    courtNo: " Kauno rūmai",
    firstName: "Vardenis",
    lastName: "Pavardenis",
    phoneNumber: "+37012345678",
};

interface IGridRowItem extends ICourtCases {
    rowIndex: number;
    disableGridItem(rowIndex: number, columnIndex: number): void;
}

const initialData: ICourtCases[] = [
    { time: "8:00", courtCases: [null, courtCaseTest, null, null, null, null, { isDisabled: true }] },
    { time: "8:30", courtCases: [null, null, null, null, null, null, courtCaseTest] },
    { time: "9:00", courtCases: [null, null, courtCaseTest, null, null, null, null] },
    { time: "9:30", courtCases: [null, null, null, null, courtCaseTest, null, null] },
    { time: "10:00", courtCases: [null, null, null, null, null, null, null] },
    { time: "10:30", courtCases: [null, courtCaseTest, null, courtCaseTest, null, null, null] },
    { time: "11:00", courtCases: [null, null, null, null, null, courtCaseTest, null] },
    { time: "11:30", courtCases: [courtCaseTest, null, null, courtCaseTest, null, null, null] },
    { time: "12:00", courtCases: [null, null, null, courtCaseTest, null, courtCaseTest, null] },
];

interface IProps {
    session: any;
}

interface IState {
    data: ICourtCases[];
}

export default class Calendar extends React.Component<IProps, IState> {
    constructor(props) {
        super(props);
        this.state = {
            data: initialData,
        };

        this.disableGridItem = this.disableGridItem.bind(this);
        this.disableGridColumn = this.disableGridColumn.bind(this);
    }

    public static async getInitialProps({ req }) {
        return {
            session: await NextAuth.init({ req, force: true })
        }
    }

    public render() {
        return (
            <Layout>
                <CustomDayPickerInput/>
                <Grid container style={{ marginTop: "24px" }} >
                    <GridColumnHeadings disableGridColumn={this.disableGridColumn} columnCount={7}></GridColumnHeadings>
                    {this.state.data.map((o, index) => <CalendarRow time={o.time} courtCases={o.courtCases} rowIndex={index} disableGridItem={this.disableGridItem}></CalendarRow>)}
                </Grid>
            </Layout>
        );
    }

    private disableGridItem(rowIndex: number, columnIndex: number) {
        this.setState((state) => {
            const data = state.data.map((o, i) => {
                if (rowIndex === i) {
                    const courtCases = o.courtCases.map((courtCase, j) => {
                        if (columnIndex === j) {
                            return courtCase == null || courtCase.isDisabled === false ? { isDisabled: true } : null;
                        }
                        return courtCase;
                    }) as ICourtCasesTuple;
                    return { ...o, ...{ courtCases } };
                } else {
                    return o;
                }
            });
            return { data };
        });
    }

    private disableGridColumn(columnIndex: number) {
        this.setState((state) => {
            const data = state.data.map((o, i) => {
                const courtCases = o.courtCases.map((courtCase, j) => {
                    if (columnIndex === j) {
                        return { isDisabled: true };
                    }
                    return courtCase;
                }) as ICourtCasesTuple;
                return { ...o, ...{ courtCases } };
            });
            return { data };
        });
    }
}

function CalendarRow(props: IGridRowItem) { // tslint:disable-line:function-name
    const { courtCases, time, rowIndex } = props;
    const isCasesNotEmpty = courtCases.some(courtCase => courtCase != null);
    return (
        <Grid
            item
            container
            direction="row"
            wrap="nowrap"
            spacing={8}
            style={{ marginTop: "4px" }}
        >
            <Grid item style={{ minHeight: "75px", width: "55px", paddingRight: "25px" }}>
                <div style={{ position: "absolute", height: "150px", marginLeft: "50px", marginTop: "-15px", width: "1px", backgroundColor: "#e0e0e0" }}></div>
                <div style={{ marginTop: "-15px" }}>
                    <Typography>
                        {time}
                    </Typography>
                    <div style={{ position: "absolute", margin: "auto", height: "1px", backgroundColor: "#e0e0e0", marginTop: "-10px", marginLeft: "40px", left: 20, right: 0 }} />
                </div>
            </Grid>

            {isCasesNotEmpty
                && courtCases.map((o, index) => {
                    if (o != null && o.isDisabled !== true) {
                        return <CalendarItem courtCase={o} rowIndex={rowIndex} columnIndex={index} disableGridItem={props.disableGridItem} />;
                    } else if (o != null && o.isDisabled === true) {
                        return <DisabledItem rowIndex={rowIndex} columnIndex={index} disableGridItem={props.disableGridItem} />;
                    }

                    return <EmptyItem rowIndex={rowIndex} columnIndex={index} disableGridItem={props.disableGridItem} />;
                })}
        </Grid>
    );
}

function GridColumnHeadings(props: { columnCount: number, disableGridColumn(columnCount: number): void }) {
    const headings: JSX.Element[] = [];
    for (let i = 0; i < props.columnCount; i += 1) {
        headings.push(
            <Grid item xs style={calendarItemStyle} wrap="wrap">
                <Typography variant="h3" gutterBottom style={{ display: "flex" }}>
                    K{i + 1}
                    <AlertDialog
                        title={"Disable grid elements in this column?"}
                        message={"This will disable all columns in this grid and existing items will be lost. Continue?"}
                        callback={props.disableGridColumn.bind(null, i)}
                    >
                        <IconButton color="primary">
                            <Block></Block>
                        </IconButton>
                    </AlertDialog>
                </Typography>
            </Grid>,
        );
    }

    return (
        <Grid container justify="center" direction="row">
            <Grid item style={{ width: "55px" }}></Grid>
            {headings}
        </Grid>
    )
}
