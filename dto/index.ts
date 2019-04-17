export interface ICourtCase {
    fileNo?: string;
    court?: string;
    courtNo?: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    isDisabled?: boolean;
}

type Nullable<T> = T | null;

export type ICourtCasesTuple =
    [Nullable<ICourtCase>, Nullable<ICourtCase>, Nullable<ICourtCase>, Nullable<ICourtCase>, Nullable<ICourtCase>, Nullable<ICourtCase>, Nullable<ICourtCase>];

export interface ICourtCases {
    time: string;
    courtCases: ICourtCasesTuple;
}

export const availableCalendarTimes = ["8:00", "8:30", "9:00", "9:30", "10:00", "10:30", "11:00", "11:30", "12:00"]; 
