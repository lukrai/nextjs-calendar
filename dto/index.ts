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
