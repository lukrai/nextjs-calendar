
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Block from "@material-ui/icons/Block";
// @ts-ignore
import { NextAuth } from "next-auth/client";
import Link from "next/link";
import Router from "next/router";
import React, { useState } from "react";
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

interface ICourtCases {
    time: string;
    courtCases: [Nullable<ICourtCase>, Nullable<ICourtCase>, Nullable<ICourtCase>, Nullable<ICourtCase>, Nullable<ICourtCase>, Nullable<ICourtCase>, Nullable<ICourtCase>];
}

const data: ICourtCases[] = [
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
            data: data,
        };
    }

    public static async getInitialProps({ req }) {
        return {
            session: await NextAuth.init({ req, force: true })
        }
    }

    public render() {
        console.log(this.props);
        return (
            <Layout>
                <Typography variant="h3">Calendar</Typography>
                <Grid container style={{ marginTop: "24px" }}>
                    {this.state.data.map(o => <CalendarRow time={o.time} courtCases={o.courtCases}></CalendarRow>)}
                </Grid>
            </Layout>
        );
    }
}

function CalendarRow(props: ICourtCases) { // tslint:disable-line:function-name
    const { courtCases, time } = props;
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
                && courtCases.map(o => {
                    if (o != null && o.isDisabled !== true) {
                        return <CalendarItem courtCase={o} />;
                    } else if (o != null && o.isDisabled === true) {
                        return <DisabledItem />;
                    }

                    return <EmptyItem />;
                })}
        </Grid>
    );
}

function CalendarItem(props: { courtCase: ICourtCase }) { // tslint:disable-line:function-name
    const { fileNo, court, courtNo, firstName, lastName, phoneNumber } = props.courtCase;
    return (
        <Grid item xs style={calendarItemStyle}>
            <Paper style={{ height: "100%", padding: "8px" }}>
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
            </Paper>
        </Grid>
    );
}

function DisabledItem(props) { // tslint:disable-line:function-name
    return (
        <Grid item xs style={calendarItemStyle}>
            <Paper style={{ height: "100%", backgroundColor: "#e57373" }}>
                <Grid container justify="center">
                    <Block color="disabled" style={{ fontSize: "7em" }} />
                </Grid>
            </Paper>
        </Grid>);
}

function EmptyItem(props) { // tslint:disable-line:function-name
    const [isVisible, setIsVisible] = useState(false);

    return (
        <Grid item container xs style={calendarItemStyle} >
            <Grid item xs={10}></Grid>
            <Grid item xs={2}
                onMouseOver={() => setIsVisible(true)}
                style={{ backgroundColor: isVisible ? "#e0e0e0" : "", opacity: isVisible ? 1 : 0, borderRadius: "4px" }}
                onMouseOut={() => setIsVisible(false)}>
                <IconButton color="secondary">
                    <Block style={{ fontSize: "0.5em" }}></Block>
                </IconButton>
            </Grid>
        </Grid>
    );
}
