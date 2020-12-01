import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Connect from "react-redux/es/connect/connect";
import {getOrdersPending, getOrdersConclued, approveOrder, deleteOrder} from "./functions"
import './index.css';
import {MDBDataTable} from "mdbreact";
import {Link, withRouter} from "react-router-dom";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import {debug, getItem} from "../../actions/encrypt";
import DeleteIcon from "@material-ui/icons/DeleteForever";
import AppBar from '@material-ui/core/AppBar';
import {
    Tab,
    Tabs,
    Box,
    Card,
    CardHeader,
    Avatar,
    IconButton,
    Fade,
    Grid,
    Paper,
    TextField,
    Modal,

} from '@material-ui/core';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import {QueryBuilder, AssignmentTurnedIn, Close, Receipt, Delete, Save} from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Config from "../../config.json";


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
            modalOrderView: false,
            selectedOrder: null
        }
    }

    // react functions
    componentWillReceiveProps(nextProps, nextContext) {

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
        const selectedOrder = this.state.selectedOrder;
        let stockImage = '';
        let name = '';
        let colorLight = '';
        let quantity_string = '';
        let price_string = '';
        let date_string = '';
        let order_id = '';
        if (selectedOrder != null) {
            const stock = selectedOrder.stock;
            const order = selectedOrder;
            quantity_string = order.quantity_string;
            price_string = order.price_string;
            date_string = order.date_string;
            stockImage = stock.product.image;
            name = stock.product.name;
            order_id = order.id;
            colorLight = stock.product.color_light;
        }

        return (
            <div>
                <AppBar position="static" color="default" className="p-0">
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        style={{padding: 0}}
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
                    <div className="d-flex flex-wrap">
                        {this.props.ordersPending.map((e) =>
                            <div key={e.id} className="p-3 w-50" style={{cursor: 'pointer'}}
                                 onClick={() => this.handleOpenModalOrderView(e)}>
                                <Card>
                                    <CardHeader
                                        avatar={
                                            <Avatar style={{height: 75, width: 75}} aria-label="recipe"
                                                    className="avatar">
                                                <img style={{height: '100%'}} src={Config.url + e.stock.product.image}/>
                                            </Avatar>
                                        }
                                        title={<strong>Entidade: {e.buyer.company.name} </strong>}
                                        subheader={(<div>
                                            <strong>Data: </strong> {e.date_string}<br/><strong>Valor: </strong> {e.price_string}
                                        </div>)}
                                    />
                                </Card>
                            </div>
                        )}
                    </div>
                </TabPanel>
                <TabPanel value={this.state.value} index={1}>
                    {this.props.ordersConclued.map((e) =>
                        <div key={e.id} className="p-3 w-50" style={{cursor: 'pointer'}}
                             onClick={() => this.handleOpenModalOrderView(e)}>
                            <Card>
                                <CardHeader
                                    avatar={
                                        <Avatar style={{height: 75, width: 75}} aria-label="recipe"
                                                className="avatar">
                                            <img style={{height: '100%'}} src={Config.url + e.stock.product.image}/>
                                        </Avatar>
                                    }
                                    title={<strong>Entidade: {e.buyer.company.name} </strong>}
                                    subheader={(<div>
                                        <strong>Data: </strong> {e.date_string}<br/><strong>Valor: </strong> {e.price_string}
                                    </div>)}
                                />
                            </Card>
                        </div>
                    )}
                </TabPanel>
                <Modal
                    aria-labelledby="spring-modal-title"
                    aria-describedby="spring-modal-description"
                    className=""
                    open={this.state.modalOrderView}
                    onClose={(e) => this.handleCloseModalOrderView()}
                    closeAfterTransition
                    // BackdropComponent={Backdrop}
                    // BackdropProps={{
                    //     timeout: 500,
                    // }}
                >
                    <Fade in={this.state.modalOrderView}>
                        <form onSubmit={(e) => this.approveOrder(e, order_id)}>
                            <div className="card position-absolute "
                                 style={{right: "50%", top: "50%", transform: "translate(50%,-50%)"}}>
                                <div className="header d-flex" style={{borderBottom: "0.1px #e0e0e0 solid"}}>
                                    <div className="w-50">
                                        <div style={{fontSize: 22, fontWeight: "400", padding: 12}}>
                                            Visualização de encomenda
                                        </div>
                                    </div>
                                    <div className="w-50">
                                        <IconButton aria-label="delete" className="float-right"
                                                    onClick={(e) => this.handleCloseModalOrderView()}>
                                            <Close fontSize="large"/>
                                        </IconButton>
                                    </div>
                                </div>
                                <div className="body d-flex">
                                    <div className="mx-auto m-3">
                                        <div className="avatar p-2">
                                            <div style={{
                                                width: 500,
                                                height: 250,
                                                backgroundImage: 'url(' + Config.url + stockImage + ')',
                                                backgroundSize: "cover",
                                            }}/>
                                        </div>
                                        <div style={{height: 56, width: 400, marginTop: '-45px'}}
                                             className="p-2 d-flex mx-auto">
                                            <div style={{
                                                height: 56,
                                                width: 350,
                                                fontWeight: 600,
                                                fontSize: 22,
                                                border: 'solid 2px #000',
                                                borderRadius: 8,
                                                lineHeight: '44px',
                                                backgroundColor: colorLight
                                            }} className="mx-auto text-center">
                                                {name}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="">
                                    <div className="d-table mx-5" style={{width: 450}}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12}>
                                                <Paper className="position-relative"
                                                       style={{backgroundColor: '#F0F0F0', height: 56}}>
                                                    <div className="float-left position-absolute"
                                                         style={{color: 'rgba(0, 0, 0, 0.54)', left: 25, top: 17}}>
                                                        <strong>{quantity_string}</strong></div>
                                                </Paper>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Paper className="position-relative"
                                                       style={{backgroundColor: '#F0F0F0', height: 56}}>
                                                    <div className="float-left position-absolute"
                                                         style={{color: 'rgba(0, 0, 0, 0.54)', left: 25, top: 17}}>
                                                        <strong>{price_string}</strong></div>
                                                </Paper>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Paper className="position-relative"
                                                       style={{backgroundColor: '#F0F0F0', height: 56}}>
                                                    <div className="float-left position-absolute"
                                                         style={{color: 'rgba(0, 0, 0, 0.54)', left: 25, top: 17}}>
                                                        <strong>{date_string}</strong></div>
                                                </Paper>
                                            </Grid>
                                            <Grid item xs={12}/>
                                            <Grid item xs={12}/>
                                            <Grid item xs={12}/>
                                        </Grid>
                                        {getItem('user_id') === 5 ?
                                            <div className="d-flex">
                                                <Button
                                                    variant="contained"
                                                    className="w-50 mr-3"
                                                    style={{height: 56, backgroundColor: '#d11a2a', color: '#fff'}}
                                                    endIcon={<Delete/>}
                                                    onClick={() => this.deleteOrder(order_id)}
                                                >
                                                    Cancelar
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    className="w-50 ml-3"
                                                    style={{height: 56}}
                                                    endIcon={<Save/>}
                                                    type="submit"
                                                >
                                                    Aprovar
                                                </Button>
                                            </div>
                                            :
                                            <div className="d-flex">
                                                <Button
                                                    variant="contained"
                                                    className="w-50 mr-3"
                                                    style={{height: 56, backgroundColor: '#d11a2a', color: '#fff'}}
                                                    endIcon={<Delete/>}
                                                    onClick={() => this.deleteOrder(order_id)}
                                                >
                                                    Cancelar
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    className="w-50 ml-3"
                                                    style={{height: 56}}
                                                    endIcon={<Save/>}
                                                    type="submit"
                                                >
                                                    Aprovar
                                                </Button>
                                            </div>
                                        }
                                        <br/>
                                        <br/>

                                    </div>
                                </div>
                            </div>
                        </form>
                    </Fade>
                </Modal>
            </div>
        );
    }

    handleCloseModalOrderView(data) {

        this.setState({
            modalOrderView: false,
            selectedOrder: null
        })
    }

    handleOpenModalOrderView(data) {
        this.setState({
            modalOrderView: true,
            selectedOrder: data
        })
    }

    approveOrder(e, order) {
        e.preventDefault();
        console.log(order);
        console.log('aprove order');
        this.props.approveOrder(order, this.props);
        this.props.getOrdersPending();
        this.props.getOrdersConclued();
        this.handleCloseModalOrderView();

    }

    deleteOrder(order) {
        console.log(order);
        console.log('cancel order');
        this.props.deleteOrder(order, this.props);
        this.props.getOrdersPending();
        this.props.getOrdersConclued();
        this.handleCloseModalOrderView();

    }
}

const mapStateToProps = store => ({
    ordersPending: store.productsReducer.ordersPending,
    ordersConclued: store.productsReducer.ordersConclued,
});

const mapFunctionsToProps = {
    getOrdersPending,
    getOrdersConclued,
    approveOrder,
    deleteOrder
};

Orders.defaultProps = {
    ordersPending: [],
    ordersConclued: []
}

export default withRouter(Connect(mapStateToProps, mapFunctionsToProps)((Orders)));
