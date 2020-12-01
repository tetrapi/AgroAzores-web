import React, {PureComponent} from "react";
import {Fade, Grid, IconButton, InputAdornment, Modal, Paper, TextField} from "@material-ui/core";
import {CalendarToday, Close, Receipt} from "@material-ui/icons";
import Config from "../../config.json";
import Button from "@material-ui/core/Button";
import './index.css'


export const ProductListModal = (props) => (
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
			<form onSubmit={(e) => {}}>
				<div className="card position-absolute"
				     style={{right: "50%", top: "50%", transform: "translate(50%,-50%)", height: "70%"}}>
					<div className="header d-flex" style={{borderBottom: "0.1px #e0e0e0 solid"}}>
						<div className="w-50">
							<div style={{fontSize: 22, fontWeight: "400", padding: 12}}>
								Novo Produto
							</div>
						</div>
						<div className="w-50">
							<IconButton aria-label="delete" className="float-right"
							            onClick={(e) => props.onClose(e)}>
								<Close fontSize="large"/>
							</IconButton>
						</div>
					</div>
					<div style={{overflowY: "auto", padding: 8}}>
						{renderProductCards(props)}
					</div>
				</div>
			</form>
		</Fade>
	</Modal>
)

const renderProductCards = (props) => {
	if (!props.products) return false
	return props.products.map(product => {
		console.log("product", product)
		return (
			<div key={product.id} className={"my-2"} >
				<div style={{
					height: 200,
					width: 500,
					cursor: "pointer",
					position: "relative"

				}}
				     onClick={() => props.onCardClicked(product)}
				>
					<div
						className={"testclass"}
						style={{
							height: "100%",
							backgroundImage: "url(" + Config.url + product.image + ")",
							backgroundSize: "cover",
						}}
					/>
					<div
						style={{
							width: 200,
							position: "absolute",
							right: "90%",
							top: "50%",
							transform: "translate(90%,-50%)",
							fontSize: 28,
							color: "white",
							fontWeight: 600
						}}
					>
						{product.name}
					</div>
				</div>
			</div>
		)
	})
}