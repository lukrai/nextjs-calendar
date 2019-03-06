import React from "react";
import Grid from '@material-ui/core/Grid';

interface IProps {
    container?: boolean;
}

export default class MainBody extends React.Component<IProps> {
    render() {
        if (this.props.container === false) {
            return (
                <React.Fragment>
                    {this.props.children}
                </React.Fragment>
            );
        } else {
            return (
                <Grid container>
                    <Grid item style={{ padding: "1em" }} xs={12}>
                        {this.props.children}
                    </Grid>
                </Grid>
            );
        }
    }
}
