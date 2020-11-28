import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Connect from "react-redux/es/connect/connect";
import {responseValidation, responseValidationDelete} from "./functions"
import './index.css';
import {MDBDataTable} from "mdbreact";
import {Link, withRouter} from "react-router-dom";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import {debug} from "../../actions/encrypt";
import DeleteIcon from "@material-ui/icons/DeleteForever";
import AppBar from '@material-ui/core/AppBar';
import {Tab, Tabs, Box} from '@material-ui/core';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Typography from '@material-ui/core/Typography';


function TabPanel(props) {
    const { children, value, index, ...other } = props;

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

function 

// const [value, setValue] = React.useState(0);
// const handleChange = (event, newValue) => {
//     // console.value
//     setValue(newValue);
// };
class Orders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
        }
    }

    // react functions
    componentWillReceiveProps(nextProps, nextContext) {

    }

    componentDidMount() {

    }

    render() {

        return (
            <div className="container-fluid">

            </div>
        );
    }
}

const mapStateToProps = store => ({
    orders: store.productsReducer.orders,
});

const mapFunctionsToProps = {


};

export default withRouter(Connect(mapStateToProps, mapFunctionsToProps)((Orders)));
