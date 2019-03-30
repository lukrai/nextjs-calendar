import { Grid, IconButton, Paper, Typography } from "@material-ui/core";
import Block from "@material-ui/icons/Block";
import React, { useState } from "react";
import { ICourtCase } from "../../dto";

const calendarItemStyle: React.CSSProperties = { minWidth: "150px", minHeight: "75px" };

interface IPropsGridItem {
    rowIndex: number;
    columnIndex: number;
    disableGridItem(rowIndex: number, columnIndex: number): void;
}

interface IPropsGridCalandarItem extends IPropsGridItem {
    courtCase: ICourtCase;
}

export function CalendarItem(props: IPropsGridCalandarItem) {
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

export function DisabledItem(props: IPropsGridItem) {
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

export function EmptyItem(props: IPropsGridItem) {
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
