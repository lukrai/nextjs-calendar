import Layout from "./layout/layout";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Link from 'next/link';

export default () =>
    (
        <Layout>
            <Grid container direction="column" alignItems="center" justify="center">
                <Typography variant="h1" gutterBottom>
                    Access Denied
                </Typography>
                <Typography gutterBottom>
                    You must be signed in as an <b>administrator</b> to access this page.
                </Typography>
                <Typography gutterBottom>
                    <Link href="/login">
						<a>Click here to login</a>
					</Link>
                </Typography>
            </Grid>
        </Layout>
    );
