import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";
import React, { ReactNode, useCallback, useState } from "react";

interface IPropsAlertDialog {
    title: string;
    message: string;
    children: ReactNode;
    callback(): any;
}

export function AlertDialog(props: IPropsAlertDialog) {
    const [isOpen, setIsOpen] = useState(false);

    const callback = useCallback(
        () => {
            props.callback();
            setIsOpen(false);
        },
        [],
    );

    return (
        <>
            <div onClick={() => setIsOpen(true)}>
                {props.children}
            </div>
            <Dialog
                open={isOpen}
                onClose={() => setIsOpen(false)}
            >
                <DialogTitle>{props.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {props.message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => callback()} color="primary" autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
