import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Connect from "react-redux/es/connect/connect";
import {getCatalogsInStore, getCatalogsInProduction, getProducts, addProductStock} from "./functions"
import './index.css';
import {MDBDataTable} from "mdbreact";
import {Link, withRouter} from "react-router-dom";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import {debug} from "../../actions/encrypt";
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
    Fab,
    Modal,
    Fade,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    InputAdornment,
    FormControlLabel,
    Switch
} from '@material-ui/core';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import {QueryBuilder, AssignmentTurnedIn, Store, WbSunnyOutlined, Add, Close, CalendarToday} from '@material-ui/icons';
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
class Catalogs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            modal: false,
            selectedImage: '',
            product: 0,
            enable_data: true,
            enable_min_quantity: true,
        }
    }

    // react functions
    componentWillReceiveProps(nextProps, nextContext) {
        console.log('comclued', nextProps.catalogsInProduction)
        console.log('saf', nextProps.catalogsInStore)
        console.log('products', nextProps.products)

        if (nextProps.products !== this.props.products && nextProps !== []) {
            this.setState({
                selectedImage: nextProps.products[0].image,
                product: nextProps.products[0].id
            })
        }

    }

    componentDidMount() {
        this.props.getCatalogsInStore();
        this.props.getCatalogsInProduction();
        this.props.getProducts();
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
                        style={{padding: 0}}
                        variant="fullWidth"
                        scrollButtons="on"
                        indicatorColor="primary"
                        textColor="primary"
                        aria-label="scrollable force tabs example"
                    >
                        <Tab label="Em loja" icon={<Store/>} {...a11yProps(0)} />
                        <Tab label="Em produção" icon={<WbSunnyOutlined/>} {...a11yProps(1)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={this.state.value} index={0}>
                    <div className="d-flex flex-wrap">
                        {this.props.catalogsInStore.map((e) =>
                            <div key={e.id} className="p-3 w-50">
                                <Card>
                                    <CardHeader
                                        avatar={
                                            <Avatar style={{height: 75, width: 75}} aria-label="recipe"
                                                    className="avatar">
                                                <img src={Config.url + e.product.image}/>
                                            </Avatar>
                                        }
                                        title={<strong>Produto: {e.product.name}</strong>}
                                        subheader={(<div>
                                            <strong>Data: </strong> {e.date_string}<br/><strong>Valor: </strong> {e.price_string}<br/><strong>Quantidade: </strong> {e.quantity_string}
                                        </div>)}
                                    />
                                </Card>
                            </div>
                        )}
                    </div>
                </TabPanel>
                <TabPanel value={this.state.value} index={1}>
                    {this.props.catalogsInProduction.map((e) =>
                        <div key={e.id} className="p-3 w-50">
                            <Card>
                                <CardHeader
                                    avatar={
                                        <Avatar style={{height: 75, width: 75}} aria-label="recipe" className="avatar">
                                            <img className="h-100 w-100" src={Config.url + e.product.image}/>
                                        </Avatar>
                                    }
                                    title={<strong>Produto: {e.product.name}</strong>}
                                    subheader={<div>
                                        <strong>Data: </strong> {e.date_string}<br/><strong>Valor: </strong> {e.price_string}<br/><strong>Quantidade: </strong> {e.quantity_string}
                                    </div>}
                                />
                            </Card>
                        </div>
                    )}
                </TabPanel>
                <Fab onClick={(e) => this.handleOpen(e)} variant="extended" className="position-fixed"
                     style={{right: 35, bottom: 35, backgroundColor: '#00A32E', color: '#fff'}}>
                    <Add/>
                    Adicionar Produto
                </Fab>
                <Modal
                    aria-labelledby="spring-modal-title"
                    aria-describedby="spring-modal-description"
                    className=""
                    open={this.state.modal}
                    onClose={(e) => this.handleClose()}
                    closeAfterTransition
                    // BackdropComponent={Backdrop}
                    // BackdropProps={{
                    //     timeout: 500,
                    // }}
                >
                    <Fade in={this.state.modal}>
                        <form onSubmit={(e) => this.addProductStock}>
                            <div className="card position-absolute "
                                 style={{right: "50%", top: "50%", transform: "translate(50%,-50%)"}}>
                                <div className="header d-flex" style={{borderBottom: "0.1px #e0e0e0 solid"}}>
                                    <div className="w-50">
                                        <div style={{fontSize: 22, fontWeight: "400", padding: 12}}>
                                            Adicionar Produto
                                        </div>
                                    </div>
                                    <div className="w-50">
                                        <IconButton aria-label="delete" className="float-right"
                                                    onClick={(e) => this.handleClose()}>
                                            <Close fontSize="large"/>
                                        </IconButton>
                                    </div>
                                </div>
                                <div className="body d-flex">
                                    <div className="mx-auto d-flex m-3">
                                        <Avatar style={{height: 125, width: 125}} aria-label="recipe"
                                                className="avatar p-2">
                                            <img className="h-100 w-100" src={Config.url + this.state.selectedImage}/>
                                        </Avatar>
                                        <div style={{height: 125, width: 250}} className="p-2 d-flex">
                                            <FormControl variant="outlined" className="w-100 my-auto">
                                                <InputLabel id="demo-simple-select-outlined-label"
                                                            className="w-100">Produto</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-outlined-label"
                                                    id="demo-simple-select-outlined"
                                                    value={this.state.product}
                                                    onChange={(e) => this.handleChangeProduct(e)}
                                                    label="Produto"
                                                >
                                                    {
                                                        this.props.products.map((e) =>
                                                            <MenuItem key={e.id} value={e.id}>{e.name}</MenuItem>
                                                        )
                                                    }
                                                </Select>
                                            </FormControl>
                                        </div>
                                    </div>
                                </div>
                                <div className="">
                                    <div className="d-table mx-5">
                                        <TextField
                                            label="Quantidade"
                                            id="quantity"
                                            name="quantity"
                                            className="w-100 my-3"
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">+1</InputAdornment>,
                                            }}
                                            variant="outlined"
                                        />
                                        <br/>
                                        <TextField
                                            label="Preço"
                                            id="stock_price"
                                            name="stock_price"
                                            className="w-100 my-3"
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">€</InputAdornment>,
                                            }}
                                            variant="outlined"
                                        />
                                        <br/>
                                        <FormControlLabel className=""
                                                          onChange={(e) => this.handleChangeSwitchDate()}
                                                          control={<Switch/>} label="Data"/>
                                        <br/>
                                        <TextField
                                            id="stock_date"
                                            label="Data"
                                            name="stock_date"
                                            type="date"
                                            disabled={this.state.enable_data}
                                            className="w-100 my-3"
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start"><CalendarToday/></InputAdornment>
                                            }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            variant="outlined"
                                        />
                                        <br/>
                                        <FormControlLabel className=""
                                                          onChange={(e) => this.handleChangeSwitchMinQuantity()}
                                                          control={<Switch/>}
                                                          label="Adicionar quantidade mínima por compra"/>
                                        <br/>
                                        <TextField
                                            label="Quantidade miníma"
                                            id="min_quantity"
                                            name="min_quantity"
                                            className="w-100 my-3"
                                            disabled={this.state.enable_min_quantity}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">+1</InputAdornment>,
                                            }}
                                            variant="outlined"
                                        />
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            className="w-100 my-3"
                                            endIcon={<Add/>}
                                        >
                                            Criar Produto
                                        </Button>
                                    </div>
                                </div>
                            </div>

                        </form>
                    </Fade>
                </Modal>
            </div>
        );
    }

    handleChangeProduct(e) {
        for (const key in this.props.products) {
            if (this.props.products[key].id === e.target.value) {
                this.setState({
                    product: e.target.value,
                    selectedImage: this.props.products[key].image
                })
            }
        }

    }

    handleChangeSwitchDate() {
        if (this.state.enable_data) {
            this.setState({
                enable_data: false
            })
        } else {
            this.setState({
                enable_data: true
            })
        }
    }

    handleChangeSwitchMinQuantity() {
        if (this.state.enable_min_quantity) {
            this.setState({
                enable_min_quantity: false
            })
        } else {
            this.setState({
                enable_min_quantity: true
            })
        }
    }

    handleClose() {
        this.setState({
            modal: false
        })
    }

    handleOpen() {
        this.setState({
            modal: true
        })
    }

    addProductStock(e) {
        e.preventDefault();
        this.props.addProductStock();
    }
}

const mapStateToProps = store => ({
    catalogsInProduction: store.catalogsReducer.catalogsInProduction,
    catalogsInStore: store.catalogsReducer.catalogsInStore,
    products: store.catalogsReducer.products,
});

const mapFunctionsToProps = {
    getCatalogsInStore,
    getCatalogsInProduction,
    getProducts,
    addProductStock
};

Catalogs.defaultProps = {
    catalogsInProduction: [],
    catalogsInStore: [],
    products: []
}

export default withRouter(Connect(mapStateToProps, mapFunctionsToProps)((Catalogs)));
