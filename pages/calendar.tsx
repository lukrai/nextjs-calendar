
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import Block from "@material-ui/icons/Block";
// @ts-ignore
import { NextAuth } from "next-auth/client";
import Link from "next/link";
import Router from "next/router";
import React, { useState, useCallback } from "react";
import Layout from "../components/layout/layout";

const calendarItemStyle: React.CSSProperties = { minWidth: "150px", minHeight: "75px" };

const courtCaseTest: ICourtCase = {
    fileNo: "Nr. eB2-1047-730/2018",
    court: "Kauno Apylinkės Teismas",
    courtNo: " Kauno rūmai",
    firstName: "Vardenis",
    lastName: "Pavardenis",
    phoneNumber: "+37012345678",
};

type Nullable<T> = T | null;

interface ICourtCase {
    fileNo?: string;
    court?: string;
    courtNo?: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    isDisabled?: boolean;
}

type ICourtCasesTuple = [Nullable<ICourtCase>, Nullable<ICourtCase>, Nullable<ICourtCase>, Nullable<ICourtCase>, Nullable<ICourtCase>, Nullable<ICourtCase>, Nullable<ICourtCase>];

interface ICourtCases {
    time: string;
    courtCases: ICourtCasesTuple;
}

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
                <Typography variant="h3">Calendar</Typography>
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

interface IGridItem {
    rowIndex: number;
    columnIndex: number;
    disableGridItem(rowIndex: number, columnIndex: number): void;
}

interface IGridCalandarItem extends IGridItem {
    courtCase: ICourtCase;
}

function CalendarItem(props: IGridCalandarItem) { // tslint:disable-line:function-name
    const { fileNo, court, courtNo, firstName, lastName, phoneNumber } = props.courtCase;
    const [isVisible, setIsVisible] = useState(false);

    return (
        <Grid item xs style={calendarItemStyle}>
            <Paper style={{ height: "100%", padding: "8px", position: "relative" }}>
                <Typography variant="subtitle2" gutterBottom>
                    {fileNo}
                </Typography>
                <Typography>
                    {court}
                </Typography>
                <Typography gutterBottom>
                    {courtNo}
                </Typography>
                <Typography>
                    {firstName} {lastName} {phoneNumber}
                </Typography>
                <div
                    style={{
                        height: "100%",
                        position: "absolute",
                        top: "0",
                        right: "0",
                        backgroundColor: isVisible ? "#e0e0e0" : "",
                        opacity: isVisible ? 0.75 : 0,
                        borderRadius: "4px",
                    }}
                    onMouseOver={() => setIsVisible(true)}
                    onMouseOut={() => setIsVisible(false)}
                >
                    <IconButton color="secondary" onClick={() => props.disableGridItem(props.rowIndex, props.columnIndex)}>
                        <Block style={{ fontSize: "0.5em" }}></Block>
                    </IconButton>
                </div>
            </Paper>

        </Grid>
    );
}

function DisabledItem(props: IGridItem) { // tslint:disable-line:function-name
    const [isVisible, setIsVisible] = useState(false);

    return (
        <Grid item xs style={calendarItemStyle}>
            <Paper style={{ height: "100%", backgroundColor: "#e57373", position: "relative" }}>
                <Grid container justify="center">
                    <Block color="disabled" style={{ fontSize: "7em" }} />
                </Grid>
                <div
                    style={{
                        height: "100%",
                        position: "absolute",
                        top: "0",
                        right: "0",
                        backgroundColor: isVisible ? "#e0e0e0" : "",
                        opacity: isVisible ? 0.75 : 0,
                        borderRadius: "4px",
                    }}
                    onMouseOver={() => setIsVisible(true)}
                    onMouseOut={() => setIsVisible(false)}
                >
                    <IconButton color="secondary" onClick={() => props.disableGridItem(props.rowIndex, props.columnIndex)}>
                        <Block style={{ fontSize: "0.5em" }}></Block>
                    </IconButton>
                </div>
            </Paper>
        </Grid>
    );
}

function EmptyItem(props: IGridItem) { // tslint:disable-line:function-name
    const [isVisible, setIsVisible] = useState(false);
    const itemStyle = { height: "100%", top: "0", right: "0", backgroundColor: isVisible ? "#e0e0e0" : "", opacity: isVisible ? 1 : 0, borderRadius: "4px" };

    return (
        <Grid item container xs style={calendarItemStyle} >
            <Grid item xs></Grid>
            <div
                style={itemStyle}
                onMouseOver={() => setIsVisible(true)}
                onMouseOut={() => setIsVisible(false)}
            >
                <IconButton color="secondary" onClick={() => props.disableGridItem(props.rowIndex, props.columnIndex)}>
                    <Block style={{ fontSize: "0.5em" }}></Block>
                </IconButton>
            </div>
        </Grid>
    );
}

function GridColumnHeadings(props: { columnCount: number, disableGridColumn(columnCount: number): void }) {
    const headings: JSX.Element[] = [];
    for (let i = 0; i < props.columnCount; i += 1) {
        headings.push(
            <Grid item xs style={calendarItemStyle} wrap="wrap">
                <Typography variant="h3" gutterBottom >
                    K{i + 1}
                    <IconButton color="secondary" onClick={() => props.disableGridColumn(i)}>
                        <Block></Block>
                    </IconButton>
                    <AlertDialog callback={props.disableGridColumn.bind(null, i)}>
                        <IconButton color="secondary">
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

function AlertDialog(props) {
    const [isOpen, setIsOpen] = useState(false);

    const callback = useCallback(
        () => {
          props.callback();
          setIsOpen(false);
        },
        [],
      );

    return (
        <div >
            <div onClick={() => setIsOpen(true)}>
            {props.children}
            </div>
            <Button variant="outlined" color="primary" onClick={() => setIsOpen(true)}>
                Open alert dialog
                </Button>

            <Dialog
                open={isOpen}
                onClose={() => setIsOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Let Google help apps determine location. This means sending anonymous location data to
                        Google, even when no apps are running.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsOpen(false)} color="primary">
                        Disagree
                    </Button>
                    <Button onClick={() => callback()} color="primary" autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
