import {Fade, Grid, IconButton, InputAdornment, Modal, Paper, TextField} from "@material-ui/core";
import {CalendarToday, Close, Receipt} from "@material-ui/icons";
import Config from "../../../config.json";
import Button from "@material-ui/core/Button";
import React from "react";

export const CreateProductModal = (props) => {

	console.log("Create Product Modal -> ", props)

	if (!props.show) return false

	return (
		<Modal
			aria-labelledby="spring-modal-title"
			aria-describedby="spring-modal-description"
			className=""
			open={props.show}
			onClose={(e) => props.onClose(e)}
			closeAfterTransition
			// BackdropComponent={Backdrop}
			// BackdropProps={{
			//     timeout: 500,
			// }}
		>
			<Fade in={props.show}>
				<form onSubmit={(e) => {
					console.log("Create product button pressed")
					props.onAddProduct(e)
				}}>
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
								            onClick={(e) => props.onClose(e)}>
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
										backgroundImage: 'url(' + Config.url + props.product.image + ')',
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
										backgroundColor: props.product.color_light
									}} className="mx-auto text-center">
										{props.product.name}
									</div>
								</div>
							</div>
						</div>

						<div className="">
							<div className="d-table mx-5" style={{width: 450}}>
								<Grid container spacing={3}>
									<Grid item xs={12}>
										<Paper className="position-relative"
										       style={{backgroundColor: '#fff', height: 56}}>
											<TextField
												label="Quantidade"
												id="quantity"
												name="quantity"
												type="number"
												className="w-100"
												InputProps={{
													startAdornment: <InputAdornment
														position="start">+1</InputAdornment>,
												}}
												variant="outlined"
											/>
										</Paper>
									</Grid>
									<Grid item xs={12}>
										<Paper className="position-relative"
										       style={{backgroundColor: '#fff', height: 56}}>
											<TextField
												label="Preço"
												id="price"
												name="price"
												type="number"
												className="w-100"
												InputProps={{
													startAdornment: <InputAdornment
														position="start">€</InputAdornment>,
												}}
												variant="outlined"
											/>
										</Paper>
									</Grid>
									<Grid item xs={12}>
										<Paper className="position-relative"
										       style={{backgroundColor: '#fff', height: 56}}>
											<TextField
												id="stock_date"
												label="Data"
												name="stock_date"
												type="date"
												className="w-100"
												InputProps={{
													startAdornment: <InputAdornment
														position="start"><CalendarToday/></InputAdornment>
												}}
												InputLabelProps={{
													shrink: true,
												}}
												variant="outlined"
											/>
										</Paper>
									</Grid>
									<Grid item xs={12}>
										<Paper className="position-relative"
										       style={{backgroundColor: '#fff', height: 56}}>
											<TextField
												label="Quantidade miníma"
												id="min_quantity"
												name="min_quantity"
												type="number"
												className="w-100"
												InputProps={{
													startAdornment: <InputAdornment position="start">+1</InputAdornment>,
												}}
												variant="outlined"
											/>
										</Paper>
									</Grid>
									<Grid item xs={12}/>
									<Grid item xs={12}/>
								</Grid>
								<Button
									variant="contained"
									color="primary"
									className="w-100 my-3"
									style={{height: 56}}
									endIcon={<Receipt/>}
									type="submit"
								>
									Adicionar produto
								</Button>
							</div>
						</div>
					</div>
				</form>
			</Fade>
		</Modal>
	)
}
