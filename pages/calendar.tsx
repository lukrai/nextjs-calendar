import React from "react";
import Link from "next/link";
import Router from "next/router";
import Layout from "../components/layout/layout";
// @ts-ignore
import { NextAuth } from "next-auth/client";

export default class extends React.Component {
    static async getInitialProps({ req }) {
        return {
            session: await NextAuth.init({ req, force: true })
        }
    }

    async componentDidMount() {
        // // Get latest session data after rendering on client then redirect.
        // // The ensures client state is always updated after signing in or out.
        // const session = await NextAuth.init({ force: true });
        // // Router.push("/calendar");
    }

    render() {
        console.log(this.props);
        return (
            <Layout>
                "aaa"
            </Layout>
        );
    }
}
