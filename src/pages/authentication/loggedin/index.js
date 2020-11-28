import React, {PureComponent} from 'react';
import {BrowserRouter as Router, Link, Route, Switch, withRouter} from "react-router-dom";
import Connect from "react-redux/es/connect/connect";
import {logoutOauth} from "../../../actions";
import {getItem} from "../../../actions/encrypt";
import Home from "../../home";
import './index.css';
import $ from "jquery";
import Dashboard from '../../dashboard/index';
import Orders from '../../orders';
import Catalogs from '../../catalagos';
import clsx from 'clsx';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import {Collapse, Menu, MenuItem} from '@material-ui/core'
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Ballot from '@material-ui/icons/Ballot';
import SpeakerNotes from '@material-ui/icons/SpeakerNotes';
import DashboardIcon from '@material-ui/icons/Dashboard';
import {Receipt } from '@material-ui/icons';
import ListIcon from '@material-ui/icons/List';
import AccountCircle from '@material-ui/icons/AccountCircle';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: 0,
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

function Index(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);

    const toggleSideBar = () => {
        // open sidebar
        $('#sidebar').addClass('active');
        // fade in the overlay
        $('.overlay').addClass('active');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(true);
    };

    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openMenu = Boolean(anchorEl);
    const [openCollapse, setOpenCollapse] = React.useState(false);
    const [openCollapseModelIII, setOpenCollapseModelIII] = React.useState(false);
    const [openCollapseForms, setOpenCollapseForms] = React.useState(false);
    const [openCollapseForm, setOpenCollapseForm] = React.useState(false);
    const [openCollapseForm1, setOpenCollapseForm1] = React.useState(false);
    const [openCollapseAdmin, setOpenCollapseAdmin] = React.useState(false);

    const handleOpenSettings = () => {
        setOpenCollapse(!openCollapse);
    }
    const handleOpenSettingsModelIII = () => {
        setOpenCollapseModelIII(!openCollapseModelIII);
    }
    const handleOpenSettingsForms = () => {
        setOpenCollapseForms(!openCollapseForms);
    }
    const handleOpenSettingsAdmin = () => {
        setOpenCollapseAdmin(!openCollapseAdmin);
    }
    const handleOpenSettingsForm = () => {
        setOpenCollapseForm(!openCollapseForm);
    }

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <div>
            <Router>
                <div className={classes.root}>
                    <CssBaseline/>
                    <AppBar
                        position="fixed"
                        className={clsx(classes.appBar, {
                            [classes.appBarShift]: open,
                        })}
                    >
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                                edge="start"
                                className={clsx(classes.menuButton, {
                                    [classes.hide]: open,
                                })}
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Typography variant="h6" noWrap style={{flexGrow: 1}}>

                            </Typography>

                            {auth && (
                                <div>
                                    <IconButton
                                        aria-label="account of current user"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        onClick={handleMenu}
                                        color="inherit"
                                    >
                                        <AccountCircle/>
                                    </IconButton>
                                    <Menu
                                        id="menu-appbar"
                                        anchorEl={anchorEl}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={openMenu}
                                        onClose={handleClose}
                                    >
                                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                                        <MenuItem onClick={() => props.logoutOauth(props)}>Sair</MenuItem>
                                    </Menu>
                                </div>
                            )}
                        </Toolbar>
                    </AppBar>
                    <Drawer
                        variant="permanent"
                        className={clsx(classes.drawer, {
                            [classes.drawerOpen]: open,
                            [classes.drawerClose]: !open,
                        })}
                        classes={{
                            paper: clsx({
                                [classes.drawerOpen]: open,
                                [classes.drawerClose]: !open,
                            }),
                        }}
                    >
                        <div className={classes.toolbar}>
                            <IconButton onClick={handleDrawerClose}>
                                {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                            </IconButton>
                        </div>
                        <Divider/>
                        <List>
                            <Link to="/orders" style={{color: '#000'}}>
                                <ListItem button key='orders'>
                                    <ListItemIcon><Receipt/></ListItemIcon>
                                    <ListItemText primary='Encomendas'/>
                                </ListItem>
                            </Link>
                            <Link to="/catalogs" style={{color: '#000'}}>
                                <ListItem button key='catalogs'>
                                    <ListItemIcon><ListIcon/></ListItemIcon>
                                    <ListItemText primary='Catalogo'/>
                                </ListItem>
                            </Link>
                        </List>
                        <Divider/>
                    </Drawer>
                    <main className={classes.content}>
                        <div className={classes.toolbar}/>
                        <Switch>
                            <Route path="/orders">
                                <Orders/>
                            </Route>

                            <Route path="/catalog">
                                <Catalogs/>
                            </Route>

                            {/*<Route path="/profile">*/}
                            {/*    <Profile/>*/}
                            {/*</Route>*/}

                            <Route path="/">
                                <Dashboard/>
                            </Route>
                        </Switch>
                    </main>
                </div>
                <div className="overlay"/>
            </Router>
        </div>
    )
}

const mapStateToProps = store => ({
    loggedIn: store.loginReducer.loggedIn,
});

const mapFunctionsToProps = {
    logoutOauth,
};

export default withRouter(Connect(mapStateToProps, mapFunctionsToProps)((Index)));
