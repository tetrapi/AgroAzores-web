import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Connect from "react-redux/es/connect/connect";
import {getCatalogsInStore, getCatalogsInProduction, getProducts, addProductStock, getProductStockAvailable, getProductStockFuture} from "./functions"
import './index.css';
import {MDBDataTable} from "mdbreact";
import {Link, withRouter} from "react-router-dom";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import {debug, getItem} from "../../actions/encrypt";
import DeleteIcon from "@material-ui/icons/DeleteForever";
import AppBar from '@material-ui/core/AppBar';
import {ProductListModal} from '../product_list/modal'
import {CreateProductModal} from '../modals/create_product/modal'
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
    Switch,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Paper,
    Grid
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
    QueryBuilder,
    AssignmentTurnedIn,
    Store,
    WbSunnyOutlined,
    Add,
    Close,
    CalendarToday,
    Receipt
} from '@material-ui/icons';
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
            modalReserve: false,
            modalReserveFuture: false,
            selectedImage: '',
            product: undefined,
            enable_data: true,
            enable_min_quantity: true,
            expanded: false,
            productFilter: undefined,
            selectedStock: {'name': 'maça', 'color': '#D68D00', 'colorLight': '#FEFFDD'},
	        productListModalVisible: false,
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
    	console.log("user", getItem("user_id"))
	    console.log("stock in store -> ", this.props.catalogsInStore)
    	console.log("stock in production -> ", this.props.catalogsInProduction)

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
	                {this.renderProductFilter()}
                </AppBar>
                <TabPanel value={this.state.value} index={0}>

                    <div className="d-flex flex-wrap">
	                    {this.renderStockInStore()}
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
	            {this.renderProductButton()}
                <CreateProductModal
	                show={this.state.modal}
	                onClose={(e) => this.handleClose()}
	                onAddProduct={(e) => this.addProductStock(e)}
	                product={this.state.product}
                />
                <Modal
                    aria-labelledby="spring-modal-title"
                    aria-describedby="spring-modal-description"
                    className=""
                    open={this.state.modalReserve}
                    onClose={(e) => this.handleCloseReserve()}
                    closeAfterTransition
                    // BackdropComponent={Backdrop}
                    // BackdropProps={{
                    //     timeout: 500,
                    // }}
                >
                    <Fade in={this.state.modalReserve}>
                        <form onSubmit={(e) => this.addProductStock(e)}>
                            <div className="card position-absolute "
                                 style={{right: "50%", top: "50%", transform: "translate(50%,-50%)"}}>
                                <div className="header d-flex" style={{borderBottom: "0.1px #e0e0e0 solid"}}>
                                    <div className="w-50">
                                        <div style={{fontSize: 22, fontWeight: "400", padding: 12}}>
                                            Efetuar Reserva
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
                                    <div className="mx-auto m-3">
                                        <div className="avatar p-2">
                                            <div style={{
                                                width: 500,
                                                height: 250,
                                                backgroundImage: 'url(' + Config.url + this.state.selectedImage + ')',
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
                                                backgroundColor: this.state.selectedStock.colorLight
                                            }} className="mx-auto text-center">
                                                {this.state.selectedStock.name}
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
                                                        <strong>Quantidade Disponível:</strong></div>
                                                    <div className="float-right position-absolute"
                                                         style={{color: '#000', right: 25, top: 17}}><strong>10.000
                                                        kilos</strong></div>
                                                </Paper>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Paper className="position-relative"
                                                       style={{backgroundColor: '#F0F0F0', height: 56}}>
                                                    <div className="float-left position-absolute"
                                                         style={{color: 'rgba(0, 0, 0, 0.54)', left: 25, top: 17}}>
                                                        <strong>Quantidade mínima:</strong></div>
                                                    <div className="float-right position-absolute"
                                                         style={{color: '#000', right: 25, top: 17}}><strong>10.000
                                                        kilos</strong></div>
                                                </Paper>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Paper className="position-relative"
                                                       style={{backgroundColor: '#F0F0F0', height: 56}}>
                                                    <div className="float-left position-absolute"
                                                         style={{color: 'rgba(0, 0, 0, 0.54)', left: 25, top: 17}}>
                                                        <strong>Preço:</strong></div>
                                                    <div className="float-right position-absolute"
                                                         style={{color: '#000', right: 25, top: 17}}><strong>10
                                                        €/kg</strong></div>
                                                </Paper>
                                            </Grid>
                                            <Grid item xs={12}/>
                                            <Grid item xs={12}/>
                                            <Grid item xs={3}>
                                                <Paper className="position-relative"
                                                       style={{backgroundColor: '#FFF', height: 56}}>
                                                    <TextField
                                                        label="Quantidade"
                                                        id="min_quantity"
                                                        name="min_quantity"
                                                        type="number"
                                                        variant="outlined"
                                                    />
                                                </Paper>
                                            </Grid>
                                            <Grid item xs={9}>
                                                <Paper className="position-relative"
                                                       style={{backgroundColor: '#F0F0F0', height: 56}}>
                                                    <div className="float-left position-absolute"
                                                         style={{color: 'rgba(0, 0, 0, 0.54)', left: 25, top: 17}}>
                                                        <strong>Total:</strong></div>
                                                    <div className="float-right position-absolute"
                                                         style={{color: '#000', right: 25, top: 17}}><strong>10.000
                                                        kilos</strong></div>
                                                </Paper>
                                            </Grid>
                                        </Grid>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            className="w-100 my-3"
                                            style={{height: 56}}
                                            endIcon={<Receipt/>}
                                            type="submit"
                                        >
                                            Efetuar Reserba
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </Fade>
                </Modal>
                <Modal
                    aria-labelledby="spring-modal-title"
                    aria-describedby="spring-modal-description"
                    className=""
                    open={this.state.modalReserveFuture}
                    onClose={(e) => this.handleCloseReserve()}
                    closeAfterTransition
                    // BackdropComponent={Backdrop}
                    // BackdropProps={{
                    //     timeout: 500,
                    // }}
                >
                    <Fade in={this.state.modalReserveFuture}>
                        <form onSubmit={(e) => this.addProductStock(e)}>
                            <div className="card position-absolute "
                                 style={{right: "50%", top: "50%", transform: "translate(50%,-50%)"}}>
                                <div className="header d-flex" style={{borderBottom: "0.1px #e0e0e0 solid"}}>
                                    <div className="w-50">
                                        <div style={{fontSize: 22, fontWeight: "400", padding: 12}}>
                                            Efetuar Reserva
                                        </div>
                                    </div>
                                    <div className="w-50">
                                        <IconButton aria-label="delete" className="float-right"
                                                    onClick={(e) => this.handleCloseReserveFuture()}>
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
                                                backgroundImage: 'url(' + Config.url + this.state.selectedImage + ')',
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
                                                backgroundColor: this.state.selectedStock.colorLight
                                            }} className="mx-auto text-center">
                                                {this.state.selectedStock.name}
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
                                                        <strong>Unidade de Venda:</strong></div>
                                                    <div className="float-right position-absolute"
                                                         style={{color: '#000', right: 25, top: 17}}><strong>KG</strong>
                                                    </div>
                                                </Paper>
                                            </Grid>
                                            <Grid item xs={12}/>
                                            <Grid item xs={12}/>
                                            <Grid item xs={12}/>
                                            <Grid item xs={12}/>
                                            <Grid item xs={12}>
                                                <Paper className="position-relative"
                                                       style={{backgroundColor: '#FFF', height: 56}}>
                                                    <TextField
                                                        label="Preço a pagar"
                                                        className="w-100"
                                                        id="min_quantity"
                                                        name="min_quantity"
                                                        type="number"
                                                        variant="outlined"
                                                    />
                                                </Paper>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Paper className="position-relative"
                                                       style={{backgroundColor: '#FFF', height: 56}}>
                                                    <TextField
                                                        label="Quantidade"
                                                        className="w-100"
                                                        id="min_quantity"
                                                        name="min_quantity"
                                                        type="number"
                                                        variant="outlined"
                                                    />
                                                </Paper>
                                            </Grid>
                                        </Grid>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            className="w-100 my-3"
                                            style={{height: 56}}
                                            endIcon={<Receipt/>}
                                            type="submit"
                                        >
                                            Efetuar Reserba
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </Fade>
                </Modal>
	            <ProductListModal
		            show={this.state.productListModalVisible}
		            products={this.props.products}
		            onClose={(e) => {
		            	this.setState({
				            productListModalVisible: false
			            })
		            } }
		            onCardClicked={(product) => {
		            	this.setState({
				            product,
				            modal: true,
				            productListModalVisible: false
			            })
		            }}
	            />
            </div>
        );
    }

    renderStockInStore = () => {
    	console.log("stock in store -> ", this.props.catalogsInStore)
	    return this.props.catalogsInStore.map((e) =>
		    <div key={e.id} className="p-3 w-50">
			    <Card>
				    <CardHeader
					    avatar={
						    <Avatar style={{height: 75, width: 75}} aria-label="recipe"
						            className="avatar">
							    <img src={Config.url + e.product.image} style={{height: "100%"}}/>
						    </Avatar>
					    }
					    title={<strong>Produto: {e.product.name}</strong>}
					    subheader={(<div>
						    <strong>Data: </strong> {e.date_string}<br/><strong>Valor: </strong> {e.price_string}<br/><strong>Quantidade: </strong> {e.quantity_string}
					    </div>)}
				    />
			    </Card>
		    </div>
	    )
    }

    renderProductFilter = () => {
    	console.log("render filter -> ", getItem("user_id"))
    	if (getItem("user_id") !== "5") {
    		return (

			    <Accordion expanded={this.state.expanded} onChange={() => this.acordionHandleChange()}>
				    <AccordionSummary
					    expandIcon={<ExpandMoreIcon/>}
					    aria-controls="panel1bh-content"
					    id="panel1bh-header"
				    >
					    <Typography className="">Filtros</Typography>
				    </AccordionSummary>

				    <AccordionDetails className="d-block">
					    <div className="d-flex">
						    <FormControl variant="outlined" className="my-auto" style={{width: 350}}>
							    <InputLabel id="demo-simple-select-outlined-label"
							                className="w-100">Produto</InputLabel>
							    <Select
								    labelId="demo-simple-select-outlined-label"
								    id="demo-simple-select-outlined"
								    value={this.state.productFilter}
								    onChange={(e) => this.handleChangeProductFilter(e)}
								    label="Produto"
							    >
								    <MenuItem key={0} value={0}> </MenuItem>
								    {
									    this.props.products.map((e) =>
										    <MenuItem key={e.id} value={e.id}>{e.name}</MenuItem>
									    )
								    }
							    </Select>
						    </FormControl>
					    </div>
					    {/*<br/>*/}
					    {/*<div className="d-flex">*/}
					    {/*    <FormControl variant="outlined" className="my-auto">*/}
					    {/*        <InputLabel id="demo-simple-select-outlined-label"*/}
					    {/*                    className="w-100">Ordernar por</InputLabel>*/}
					    {/*        <Select*/}
					    {/*            labelId="demo-simple-select-outlined-label"*/}
					    {/*            id="demo-simple-select-outlined"*/}
					    {/*            value={this.state.product}*/}
					    {/*            onChange={(e) => this.handleChangeProduct(e)}*/}
					    {/*            label="Produto"*/}
					    {/*        >*/}
					    {/*            {*/}
					    {/*                this.props.products.map((e) =>*/}
					    {/*                    <MenuItem key={e.id} value={e.id}>{e.name}</MenuItem>*/}
					    {/*                )*/}
					    {/*            }*/}
					    {/*        </Select>*/}
					    {/*    </FormControl>*/}
					    {/*</div>*/}
				    </AccordionDetails>
			    </Accordion>
		    )
	    }
    }

    renderProductButton = () => {
    	if (getItem("user_id") === "5") {
		    return (
			    <Fab onClick={(e) => this.handleOpen(e)} variant="extended" className="position-fixed"
			         style={{right: 35, bottom: 35, backgroundColor: '#00A32E', color: '#fff'}}>
				    <Add/>
				    Adicionar Produto
			    </Fab>
		    )
	    }
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

    handleChangeProductFilter(e) {
        for (const key in this.props.products) {
        	console.log("key -> ", key)
            if (this.props.products[key].id === e.target.value) {
	            console.log("refreshing with selected product wit id -> ", e.target.value)
	            const data = {product_id: e.target.value}
	            this.props.getProductStockAvailable(data)
	            this.props.getProductStockFuture(data)
                this.setState({
                    productFilter: e.target.value,
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

    acordionHandleChange() {
        if (this.state.expanded) {
            this.setState({
                expanded: false
            })
        } else {
            this.setState({
                expanded: true
            })
        }

    }

    handleOpen() {
        this.setState({
	        productListModalVisible: true
        })
    }

    handleOpenReserve() {
        this.setState({
            modalReserve: true
        })
    }

    handleCloseReserve() {
        this.setState({
            modalReserve: false
        })
    }

    handleOpenReserveFuture() {
        this.setState({
            modalReserveFuture: true
        })
    }

    handleCloseReserveFuture() {
        this.setState({
            modalReserveFuture: false
        })
    }

    addProductStock(e) {
        e.preventDefault();
        let postData = {
            'user_id': getItem("user_id"),
            'product_id': this.state.product.id,
            'quantity': e.target.quantity.value,
            'price': e.target.price.value,
        }
        if (e.target.stock_date.value.length !== 0) {
	        postData['stock_date'] = e.target.stock_date.value;
        }

        if (!e.target.min_quantity.value.length !== 0) {
	        postData['min_quantity'] = e.target.min_quantity.value;
        }


        console.log('post data', postData)
        this.props.addProductStock(postData, this.props);

        e.target.quantity.value = '';
        e.target.min_quantity.value = '';
        e.target.price.value = '';
        e.target.stock_date.value = '';
        this.handleClose();
        this.setState({
            product: 0,
            selectedImage: '',
            enable_data: true,
            enable_min_quantity: true
        })

	    if (this.state.productFilter === undefined) {
		    this.props.getCatalogsInStore();
		    this.props.getCatalogsInProduction();
	    } else {
		    const data = {product_id: this.state.productFilter}
		    this.props.getProductStockAvailable(data)
		    this.props.getProductStockFuture(data)
	    }

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
    addProductStock,
	getProductStockAvailable,
	getProductStockFuture
};

Catalogs.defaultProps = {
    catalogsInProduction: [],
    catalogsInStore: [],
    products: []
}

export default withRouter(Connect(mapStateToProps, mapFunctionsToProps)((Catalogs)));
