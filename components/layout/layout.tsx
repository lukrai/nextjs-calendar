import React from "react";
import Router from "next/router";
import Head from "next/head";
import Link from "next/link";
// import Signin from './signin'
import NextAuth from "next-auth/client";
// import Cookies from 'universal-cookie'
// import Styles from '../css/index.scss'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SupervisedUserCircle from '@material-ui/icons/SupervisedUserCircle';
import DateRangeRounded from '@material-ui/icons/DateRangeRounded';
import MoreIcon from '@material-ui/icons/MoreVert';

import MainBody from "./mainBody";

import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';

const styles = (theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        grow: {
            flexGrow: 1,
        },
        menuButton: {
            marginLeft: -12,
            marginRight: 20,
        },
        title: {
            display: 'none',
            [theme.breakpoints.up('sm')]: {
                display: 'block',
            },
        },
        // search: {
        //   position: 'relative',
        //   borderRadius: theme.shape.borderRadius,
        //   backgroundColor: fade(theme.palette.common.white, 0.15),
        //   '&:hover': {
        //     backgroundColor: fade(theme.palette.common.white, 0.25),
        //   },
        //   marginRight: theme.spacing.unit * 2,
        //   marginLeft: 0,
        //   width: '100%',
        //   [theme.breakpoints.up('sm')]: {
        //     marginLeft: theme.spacing.unit * 3,
        //     width: 'auto',
        //   },
        // },
        searchIcon: {
            width: theme.spacing.unit * 9,
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
            width: '100%',
        },
        inputInput: {
            paddingTop: theme.spacing.unit,
            paddingRight: theme.spacing.unit,
            paddingBottom: theme.spacing.unit,
            paddingLeft: theme.spacing.unit * 10,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: 200,
            },
        },
        sectionDesktop: {
            display: 'none',
            [theme.breakpoints.up('md')]: {
                display: 'flex',
            },
        },
        sectionMobile: {
            display: 'flex',
            [theme.breakpoints.up('md')]: {
                display: 'none',
            },
        },
    });

export interface IProps extends WithStyles<typeof styles> { }

interface IState {
    anchorEl: null | HTMLElement;
    mobileMoreAnchorEl: null | HTMLElement;
}

class Layout extends React.Component<IProps, IState> {
    // static propTypes() {
    //     // return {
    //     //     session: React.PropTypes.object.isRequired,
    //     //     providers: React.PropTypes.object.isRequired,
    //     //     children: React.PropTypes.object.isRequired,
    //     //     fluid: React.PropTypes.boolean,
    //     //     navmenu: React.PropTypes.boolean,
    //     //     signinBtn: React.PropTypes.boolean
    //     // }
    // }
    // @ts-ignore
    constructor(props) {
        super(props)
        this.state = {
            // navOpen: false,
            // modal: false,
            // providers: null,

            anchorEl: null,
            mobileMoreAnchorEl: null,
        }
        this.toggleModal = this.toggleModal.bind(this)
    }
    // @ts-ignore
    handleProfileMenuOpen = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleMenuClose = () => {
        this.setState({ anchorEl: null });
        this.handleMobileMenuClose();
    };
    // @ts-ignore
    handleMobileMenuOpen = event => {
        this.setState({ mobileMoreAnchorEl: event.currentTarget });
    };

    handleMobileMenuClose = () => {
        this.setState({ mobileMoreAnchorEl: null });
    };
    // @ts-ignore
    async toggleModal(e) {
        if (e) e.preventDefault()

        // Save current URL so user is redirected back here after signing in
        // if (this.state.modal !== true) {
        //     const cookies = new Cookies()
        //     cookies.set('redirect_url', window.location.pathname, { path: '/' })
        // }

        // this.setState({
        //     providers: this.state.providers || await NextAuth.providers(),
        //     modal: !this.state.modal
        // })
    }

    render() {
        const { anchorEl, mobileMoreAnchorEl } = this.state;
        const { classes } = this.props;
        const isMenuOpen = Boolean(anchorEl);
        const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

        const renderMenu = (
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMenuOpen}
                onClose={this.handleMenuClose}
            >
                <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
                <MenuItem onClick={this.handleMenuClose}>My account</MenuItem>
            </Menu>
        );

        const renderMobileMenu = (
            <Menu
                anchorEl={mobileMoreAnchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMobileMenuOpen}
                onClose={this.handleMenuClose}
            >
                <MenuItem onClick={this.handleProfileMenuOpen}>
                    <IconButton color="inherit">
                        <AccountCircle />
                    </IconButton>
                    <p>Profile</p>
                </MenuItem>
            </Menu>
        );

        return (
            <React.Fragment>
                <Head>
                    <meta charSet="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <title>{'Next.js Starter Project'}</title>
                    {/* <style dangerouslySetInnerHTML={{__html: Styles}}/>
                    <script src="https://cdn.polyfill.io/v2/polyfill.min.js"/> */}
                </Head>
                <div className={classes.root}>
                    <AppBar position="static">
                        <Toolbar>
                            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                                Project
                            </Typography>
                            <div className={classes.grow} />

                            <div className={classes.sectionDesktop}>
                                <Link href="/calendar">
                                    <IconButton color="inherit">
                                        <DateRangeRounded /> 
                                    </IconButton>
                                </Link>
                                <Link href="/admin">
                                    <IconButton color="inherit">
                                            <SupervisedUserCircle />
                                    </IconButton>
                                </Link>
                                <IconButton
                                    aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                                    aria-haspopup="true"
                                    onClick={this.handleProfileMenuOpen}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                            </div>
                            <div className={classes.sectionMobile}>
                                <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                                    <MoreIcon />
                                </IconButton>
                            </div>
                        </Toolbar>
                    </AppBar>

                    {renderMenu}
                    {renderMobileMenu}
                    <MainBody>
                        {this.props.children}
                    </MainBody>
                </div>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(Layout);

//             < Navbar light className = "navbar navbar-expand-md pt-3 pb-3" >
//                 <Link prefetch href = "/" >
//                     <NavbarBrand href="/" >
//                         <span className="icon ion-md-home mr-1" > </span> {Package.name}
//                             < /NavbarBrand>
//                             < /Link>
//                             < input className = "nojs-navbar-check" id = "nojs-navbar-check" type = "checkbox" aria - label="Menu" />
//                                 <label tabIndex="1" htmlFor = "nojs-navbar-check" className = "nojs-navbar-label mt-2" />
//                                     <div className="nojs-navbar" >
//                                         <Nav navbar >
//                                         <div tabIndex="1" className = "dropdown nojs-dropdown" >
//                                             <div className="nav-item" >
//                                                 <span className="dropdown-toggle nav-link" > Examples < /span>
//                                                     < /div>
//                                                     < div className = "dropdown-menu" >
//                                                         <Link prefetch href = "/examples/authentication" >
//                                                             <a href="/examples/authentication" className = "dropdown-item" > Auth < /a>
//                                                                 < /Link>
//                                                                 < Link prefetch href = "/examples/async" >
//                                                                     <a href="/examples/async" className = "dropdown-item" > Async Data < /a>
//                                                                         < /Link>
//                                                                         < Link prefetch href = "/examples/layout" >
//                                                                             <a href="/examples/layout" className = "dropdown-item" > Layout < /a>
//                                                                                 < /Link>
//                                                                                 < Link prefetch href = "/examples/routing" >
//                                                                                     <a href="/examples/routing" className = "dropdown-item" > Routing < /a>
//                                                                                         < /Link>
//                                                                                         < Link prefetch href = "/examples/styling" >
//                                                                                             <a href="/examples/styling" className = "dropdown-item" > Styling < /a>
//                                                                                                 < /Link>
//                                                                                                 < /div>
//                                                                                                 < /div>
//                                                                                                 < /Nav>
//                                                                                                 < UserMenu session = { this.props.session } toggleModal = { this.toggleModal } signinBtn = { this.props.signinBtn } />
//                                                                                                     </div>
//                                                                                                     < /Navbar>
//                                                                                                     < MainBody navmenu = { this.props.navmenu } fluid = { this.props.fluid } container = { this.props.container } >
//                                                                                                         { this.props.children }
//                                                                                                         < /MainBody>
//                                                                                                         < Container fluid = { this.props.fluid } >
//                                                                                                             <hr className="mt-3" />
//                                                                                                                 <p className="text-muted small" >
//                                                                                                                     <Link href="https://github.com/iaincollins/nextjs-starter" > <a className="text-muted font-weight-bold" > <span className="icon ion-logo-github" /> { Package.name } { Package.version } </a></Link >
//                                                                                                                         <span>built with </span>
//                                                                                                                         < Link href = "https://github.com/zeit/next.js" > <a className="text-muted font-weight-bold" > Next.js { Package.dependencies.next.replace('^', '') } </a></Link >
//                                                                                                                             <span> & amp; </span>
//                                                                                                                                 < Link href = "https://github.com/facebook/react" > <a className="text-muted font-weight-bold" > React { Package.dependencies.react.replace('^', '') } </a></Link >
//             .
//             < span className = "ml-2" >& copy; { new Date().getYear() + 1900 }.</span>
//     < /p>
//     < /Container>
//     < SigninModal modal = { this.state.modal } toggleModal = { this.toggleModal } session = { this.props.session } providers = { this.state.providers } />
//         </React.Fragment>
//     )
//   }
// }

// export class MainBody extends React.Component {
//     render() {
//         if (this.props.container === false) {
//             return (
//                 <React.Fragment>
//                 { this.props.children }
//                 < /React.Fragment>
//             )
//         } else if (this.props.navmenu === false) {
//             return (
//                 <Container fluid= { this.props.fluid } style = {{ marginTop: '1em' }
//         }>
//             { this.props.children }
//             < /Container>
//       )
//     } else {
//     return (
//         <Container fluid= { this.props.fluid } style = {{ marginTop: '1em' }
// }>
//     <Row>
//     <Col xs="12" md = "9" lg = "10" >
//         { this.props.children }
//         < /Col>
//         < Col xs = "12" md = "3" lg = "2" style = {{ paddingTop: '1em' }}>
//             <h5 className="text-muted text-uppercase" > Examples < /h5>
//                 < ListGroup >
//                 <ListGroupItem>
//                 <Link prefetch href = "/examples/authentication" > <a href="/examples/authentication" className = "d-block" > Auth < /a></Link >
//                     </ListGroupItem>
//                     < ListGroupItem >
//                     <Link prefetch href = "/examples/async" > <a href="/examples/async" className = "d-block" > Async < /a></Link >
//                         </ListGroupItem>
//                         < ListGroupItem >
//                         <Link prefetch href = "/examples/layout" > <a href="/examples/layout" className = "d-block" > Layout < /a></Link >
//                             </ListGroupItem>
//                             < ListGroupItem >
//                             <Link prefetch href = "/examples/routing" > <a href="/examples/routing" className = "d-block" > Routing < /a></Link >
//                                 </ListGroupItem>
//                                 < ListGroupItem >
//                                 <Link prefetch href = "/examples/styling" > <a href="/examples/styling" className = "d-block" > Styling < /a></Link >
//                                     </ListGroupItem>
//                                     < /ListGroup>
//                                     < /Col>
//                                     < /Row>
//                                     < /Container>
//       )
//     }
//   }
// }

// export class UserMenu extends React.Component {
//     constructor(props) {
//         super(props)
//         this.handleSignoutSubmit = this.handleSignoutSubmit.bind(this)
//     }

//     async handleSignoutSubmit(event) {
//         event.preventDefault()

//         // Save current URL so user is redirected back here after signing out
//         const cookies = new Cookies()
//         cookies.set('redirect_url', window.location.pathname, { path: '/' })

//         await NextAuth.signout()
//         Router.push('/')
//     }

//     render() {
//         if (this.props.session && this.props.session.user) {
//             // If signed in display user dropdown menu
//             const session = this.props.session
//             return (
//                 <Nav className= "ml-auto" navbar >
//                     {/*<!-- Uses .nojs-dropdown CSS to for a dropdown that works without client side JavaScript ->*/ }
//                     < div tabIndex = "2" className = "dropdown nojs-dropdown" >
//                         <div className="nav-item" >
//                             <span className="dropdown-toggle nav-link d-none d-md-block" >
//                                 <span className="icon ion-md-contact" style = {{ fontSize: '2em', position: 'absolute', top: -5, left: -25 }
//         }> </span>
//             < /span>
//             < span className = "dropdown-toggle nav-link d-block d-md-none" >
//                 <span className="icon ion-md-contact mr-2" > </span>
//         { session.user.name || session.user.email }
//         </span>
//             < /div>
//             < div className = "dropdown-menu" >
//                 <Link prefetch href = "/account" >
//                     <a href="/account" className = "dropdown-item" > <span className="icon ion-md-person mr-1" > </span> Your Account</a >
//                         </Link>
//                         < AdminMenuItem {...this.props } />
//                             < div className = "dropdown-divider d-none d-md-block" />
//                                 <div className="dropdown-item p-0" >
//                                     <Form id="signout" method = "post" action = "/auth/signout" onSubmit = { this.handleSignoutSubmit } >
//                                         <input name="_csrf" type = "hidden" value = { this.props.session.csrfToken } />
//                                             <Button type="submit" block className = "pl-4 rounded-0 text-left dropdown-item" > <span className="icon ion-md-log-out mr-1" > </span> Sign out</Button >
//                                                 </Form>
//                                                 < /div>
//                                                 < /div>
//                                                 < /div>
//                                                 < /Nav>
//       )
//     } if(this.props.signinBtn === false) {
//     // If not signed in, don't display sign in button if disabled
//     return null
// } else {
//     // If not signed in, display sign in button
//     return (
//         <Nav className= "ml-auto" navbar >
//             <NavItem>
//             {/**
//               * @TODO Add support for passing current URL path as redirect URL
//               * so that users without JavaScript are also redirected to the page
//               * they were on before they signed in.
//               **/}
//             < a href = "/auth?redirect=/" className = "btn btn-outline-primary" onClick = { this.props.toggleModal } > <span className="icon ion-md-log-in mr-1" > </span> Sign up / Sign in </a>
//                 < /NavItem>
//                 < /Nav>
//       )
// }
//   }
// }

// export class AdminMenuItem extends React.Component {
//     render() {
//         if (this.props.session.user && this.props.session.user.admin === true) {
//             return (
//                 <React.Fragment>
//                 <Link prefetch href = "/admin" >
//                     <a href="/admin" className = "dropdown-item" > <span className="icon ion-md-settings mr-1" > </span> Admin</a >
//                         </Link>
//                         < /React.Fragment>
//       )
//         } else {
//             return (<div/>)
//     }
//     }
// }

// export class SigninModal extends React.Component {
//     render() {
//         if (this.props.providers === null) return null

//         return (
//             <Modal isOpen= { this.props.modal } toggle = { this.props.toggleModal } style = {{ maxWidth: 700 }
//     }>
//         <ModalHeader>Sign up / Sign in </ModalHeader>
//             < ModalBody style = {{ padding: '1em 2em' }}>
//                 <Signin session={ this.props.session } providers = { this.props.providers } />
//                     </ModalBody>
//                     < /Modal>
//     )
//   }
// }
