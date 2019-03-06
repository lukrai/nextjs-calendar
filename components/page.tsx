import React from "react";
import Layout from "./layout/layout";
import NextAuth from "next-auth/client";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

export default class extends React.Component {
	static async getInitialProps({ req }) {
		return {
			session: await NextAuth.init({ req, force: false }),// Add this.props.session to all pages
			lang: "en" // Add a lang property to all pages for accessibility
		}
	}

	adminAccessOnly() {
		return (
			<Layout {...this.props} navmenu={false}>
				<Grid container direction="column" alignItems="center" justify="center">
					<Typography component="h2" variant="display4" gutterBottom>
						Access Denied
                	</Typography>
					<Typography gutterBottom>
						You must be signed in as an administrator to access this page.
                	</Typography>
				</Grid>
			</Layout>
		);
	}
}
