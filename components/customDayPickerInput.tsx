import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import React, { ReactNode, useCallback, useState } from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";

const MONTHS = [
    'Sausis',
    'Vasaris',
    'Kovas',
    'Balandis',
    'Gegužė',
    'Birželis',
    'Liepa',
    'Rugpjūtis',
    'Rugsėjis',
    'Spalis',
    'Lapkritis',
    'Gruodis',
];

const WEEKDAYS_LONG = [
    'Sekmadienis',
    'Pirmadienis',
    'Antradienis',
    'Trečiadienis',
    'Ketvirtadienis',
    'Penktadienis',
    'Šeštadienis',
];

const WEEKDAYS_SHORT = ['Sk', 'Pr', 'An', 'Tr', 'Kt', 'Pn', 'Št'];

const enabledDaysByMonths = [{ enabledDay: 0, fromDate: new Date(2019, 4, 15) }, { enabledDay: 1, fromDate: new Date(2019, 4, 1) }, { enabledDay: 2, fromDate: new Date(2019, 3, 15) }]

export class CustomDayPickerInput extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            selectedDay: undefined,
        };

        this.handleDayClick = this.handleDayClick.bind(this);
        this.modifier = this.modifier.bind(this);
    }

    public render() {
        return (
            <div style={{ display: "flex" }}>
                <Typography style={{ alignSelf: "flex-end", marginRight: "1em" }} variant="h5">Posėdžių data</Typography>
                <DayPickerInput
                    component={DatePickerCustomInput}
                    value={this.state.selectedDay}
                    format={"LL"}
                    dayPickerProps={{
                        onDayClick: this.handleDayClick,
                        firstDayOfWeek: 1,
                        disabledDays: {
                            daysOfWeek: this.modifier(this.state.selectedDay),
                        },
                        showWeekNumbers: true,
                        locale: "lt",
                        months: MONTHS,
                        weekdaysLong: WEEKDAYS_LONG,
                        weekdaysShort: WEEKDAYS_SHORT,
                    }}
                ></DayPickerInput>
                {this.state.selectedDay ? (
                    <p>You clicked {this.state.selectedDay.toLocaleDateString()}</p>
                ) : (
                        <p>Please select a day.</p>
                    )}
            </div>
        );
    }

    private handleDayClick(day) {
        this.setState({ selectedDay: day });
    }

    private modifier(date: Date) {
        let tempEnabledDay = { enabledDay: 3, fromDate: new Date(2018) };
        enabledDaysByMonths.length > 0 && enabledDaysByMonths.sort((a, b) => a.fromDate.getTime() - b.fromDate.getTime());
        for (const o of enabledDaysByMonths) {
            if (date != null && date > o.fromDate && date > tempEnabledDay.fromDate) {
                tempEnabledDay = o;
            }
        }

        return [0, 1, 2, 3, 4, 5, 6].filter(o => o !== tempEnabledDay.enabledDay);
    }
}

function DatePickerCustomInput(props) {
    return (
        <TextField
            type="text"
            name="text"
            label="Data"
            placeholder=""
            {...props}
        />
    );
}
