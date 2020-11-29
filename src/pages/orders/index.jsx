import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Connect from "react-redux/es/connect/connect";
import {getOrdersPending, getOrdersConclued} from "./functions"
import './index.css';
import {MDBDataTable} from "mdbreact";
import {Link, withRouter} from "react-router-dom";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import {debug} from "../../actions/encrypt";
import DeleteIcon from "@material-ui/icons/DeleteForever";
import AppBar from '@material-ui/core/AppBar';
import {Tab, Tabs, Box, Card, CardHeader, Avatar, IconButton} from '@material-ui/core';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import {QueryBuilder, AssignmentTurnedIn} from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';


function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-force-tabpanel-${index}`}
            aria-labelledby={`scrollable-force-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-force-tab-${index}`,
        'aria-controls': `scrollable-force-tabpanel-${index}`,
    };
}

// const [value, setValue] = React.useState(0);
// const handleChange = (event, newValue) => {
//     // console.value
//     setValue(newValue);
// };
class Orders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
        }
    }
    // react functions
    componentWillReceiveProps(nextProps, nextContext) {
        console.log('comclued',nextProps.ordersConclued)
        console.log('saf',nextProps.ordersPending)

    }

    componentDidMount() {
        this.props.getOrdersPending();
        this.props.getOrdersConclued();
    }

    handleChange = (event, newValue) => {
        this.setState({
            value: newValue
        })
    };

    render() {
        return (
            <div>
                <AppBar position="static" color="default" className="p-0">
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        style={{padding:0}}
                        variant="fullWidth"
                        scrollButtons="on"
                        indicatorColor="primary"
                        textColor="primary"
                        aria-label="scrollable force tabs example"
                    >
                        <Tab label="Pendente" icon={<QueryBuilder/>} {...a11yProps(0)} />
                        <Tab label="Concluido" icon={<AssignmentTurnedIn/>} {...a11yProps(1)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={this.state.value} index={0}>
                    {this.props.ordersPending.map((e) =>
                        <div key={e.id}>
                            sdasd
                        </div>
                    )}
                </TabPanel>
                <TabPanel value={this.state.value} index={1}>
                    {this.props.ordersConclued.map((e) =>
                        <div key={e.id}>

                            asdf
                            <Card>
                                <CardHeader
                                    avatar={
                                        <Avatar aria-label="recipe" className="avatar">
                                            R
                                        </Avatar>
                                    }
                                    action={
                                        <IconButton aria-label="settings">
                                            {/*<MoreVertIcon />*/}
                                        </IconButton>
                                    }
                                    title="Shrimp and Chorizo Paella"
                                    subheader="September 14, 2016"
                                />
                            </Card>
                        </div>
                    )}
                </TabPanel>
            </div>
        );
    }
}

const mapStateToProps = store => ({
    ordersPending: store.productsReducer.ordersPending,
    ordersConclued: store.productsReducer.ordersConclued,
});

const mapFunctionsToProps = {
    getOrdersPending,
    getOrdersConclued
};

Orders.defaultProps = {
    ordersPending: [],
    ordersConclued: []
}

export default withRouter(Connect(mapStateToProps, mapFunctionsToProps)((Orders)));
