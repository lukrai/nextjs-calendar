import fetch from "isomorphic-fetch";
import { ICourtCase, ICourtCases, ICourtCasesTuple } from "../dto";

const courtCaseTest: ICourtCase = {
    fileNo: "Nr. eB2-1047-730/2018",
    court: "Kauno Apylinkės Teismas",
    courtNo: " Kauno rūmai",
    firstName: "Vardenis",
    lastName: "Pavardenis",
    phoneNumber: "+37012345678",
};

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

export async function getCalendarData() {
    return new Promise(
        (resolve, reject) => {
            setTimeout(() => {
                resolve(initialData);
            }, 200);
        });
}
