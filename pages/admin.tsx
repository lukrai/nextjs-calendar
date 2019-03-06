import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Link from 'next/link';
import Layout from "../components/layout/layout";
import adminAccessOnly from "../components/adminAccessOnly";
import { getUsers } from "../actions/user.action";
// @ts-ignore
import { NextAuth } from "next-auth/client";

interface IProps {
	session: any;
	users: any;
}

interface IState {
	number: number;
	users: any;
}

export default class Admin extends React.Component<IProps, IState> {
	static async getInitialProps({ req }) {
		const session = await NextAuth.init({ req });
		// const users = await getUsers();
		return {
			session,
			// users,
		}
	}

	// @ts-ignore
	constructor(props) {
		super(props);
		this.state = {
			number: 0,
			users: [],
		};
		console.log(this.props.session);
	}


	async componentDidMount () {
		const { session } = this.props;
		if (session && session.user && session.user.admin === true) {
			try {
				const users = await getUsers();
				this.setState({ users });
			} catch (error) {
				console.log(error);
			}
			
		}
	}

	render() {
		if (!this.props.session.user || this.props.session.user.admin !== true) {
			return adminAccessOnly();
		}

		console.log(this.props.session);
		return (
			<Layout>
				<Grid container direction="column" alignItems="center" justify="center">
					<Paper>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>Name</TableCell>
									<TableCell>Surname</TableCell>
									<TableCell>Email</TableCell>
									<TableCell>Court</TableCell>
									<TableCell>Number</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{this.state.users.map(user => (
									<TableRow key={user.id}>
										<TableCell component="th" scope="row">
											{user.first_name}
										</TableCell>
										<TableCell>{user.last_name}</TableCell>
										<TableCell>{user.email}</TableCell>
										<TableCell>{user.court}</TableCell>
										<TableCell>{user.phone_number}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</Paper>
				</Grid>
			</Layout>
		);
	}
}
