import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { WithStyles, withStyles, createStyles, Theme } from "@material-ui/core/styles";
import Router from "next/router";
import Link from 'next/link';
import Layout from "../components/layout/layout";
// @ts-ignore
import { NextAuth } from "next-auth/client";


const styles = (theme: Theme) => createStyles({
    root: {
        textAlign: 'center',
        paddingTop: theme.spacing.unit * 20,
    },
    margin: {
        margin: theme.spacing.unit * 2,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: "center",
        color: theme.palette.text.secondary,
    },
});

interface IProps extends WithStyles<typeof styles> {
    session: any;
}


interface IState {
    number: number;
    email: string;
    password: string;
    session: any;
}

export default class Login extends React.Component<IProps, IState> {
    static async getInitialProps({ req }) {
        console.log("getInitialProps");
        return {
            session: await NextAuth.init({ req, force: false }),
        }
    }

    // @ts-ignore
    constructor(props) {
        super(props);
        this.state = {
            number: 0,
            email: "",
            password: "",
            session: this.props.session,
        };

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSignInSubmit = this.handleSignInSubmit.bind(this);
    }

    private handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            email: event.target.value,
        })
    }

    private handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            password: event.target.value
        })
    }

    private handleSignInSubmit() {
        // event.preventDefault()

        // An object passed NextAuth.signin will be passed to your signin() function
        NextAuth.signin({
            email: this.state.email,
            password: this.state.password
        })
            .then(authenticated => {
                Router.push(`/auth/callback`)
            })
            .catch(() => {
                alert("Authentication failed.")
            })
    }

    render() {
        console.log(this.props);
        const { classes } = this.props;
        if (this.props.session && this.props.session.user) {
            return null;
        } else {
            return (
                <Layout>
                    <div style={{ textAlign: "center" }}>
                        <form id="signin" method="post" action="/auth/signin" onSubmit={this.handleSignInSubmit}>
                            <input name="_csrf" type="hidden" value={this.state.session.csrfToken} />
                            <Typography variant="h4" gutterBottom>
                                Login
        		            </Typography>
                            <div>
                                <TextField
                                    style={{ width: "250px" }}
                                    label="Email"
                                    value={this.state.email}
                                    onChange={this.handleEmailChange}
                                    margin="normal" />
                            </div>
                            <div>
                                <TextField
                                    style={{ width: "250px" }}
                                    label="Password"
                                    type="password"
                                    autoComplete="current-password"
                                    onChange={this.handlePasswordChange}
                                    margin="normal" />
                            </div>
                            <Button type="submit" variant="contained" color="primary" style={{ marginTop: "20px" }}>
                                Log in
      			        </Button>
                        </form>
                    </div>
                    {/* <form id="signin" method="post" action="/auth/signin" onSubmit={this.handleSignInSubmit}> */}
                    {/* <input name="_csrf" type="hidden" value={this.state.session.csrfToken} /> */}
                    {/* <p>
                            <label htmlFor="email">Email address</label><br />
                            <input name="email" type="text" placeholder="j.smith@example.com" id="email" className="form-control" value={this.state.email} onChange={this.handleEmailChange} />
                        </p> */}
                    {/* <p>
                            <label htmlFor="password">Password</label><br />
                            <input name="password" type="password" placeholder="" id="password" className="form-control" value={this.state.password} onChange={this.handlePasswordChange} />
                        </p> */}
                    {/* <p className="text-right">
                            <button id="submitButton" type="submit" className="btn btn-outline-primary">Sign in</button>
                        </p> */}
                    {/* <Button variant="contained" color="primary">
                            Sign in
      			            </Button> */}
                    {/* </form> */}
                </Layout>
            );
        }
    }
}

// export default withStyles(styles)(Login);