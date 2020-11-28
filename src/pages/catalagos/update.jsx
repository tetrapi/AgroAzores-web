import React, {PureComponent} from 'react';
import Connect from "react-redux/es/connect/connect";
import {responseValidationUpdate, responseValidationView} from "./functions"
import './index.css';
import Strapi from 'strapi-sdk-javascript/build/main';
import {MDBCol, MDBRow} from "mdbreact";
import {Button} from "@material-ui/core";
import {withRouter} from "react-router-dom";

class ProductsUpdate extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            id: NaN,
            description: '',
            specific_group: '',
            general_group: '',
        }
    }

    // react functions«
    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.product){
            this.setState({
                id: nextProps.product.id,
                code: nextProps.product.code,
                description: nextProps.product.description,
                specific_group: nextProps.product.specific_group,
                general_group: nextProps.product.general_group
            })
        }
    }

    async componentDidMount() {
        try {
            let url = window.location.href;
            let id = url.substring(url.lastIndexOf('/') + 1);
            // let post = await strapi.getEntries('orders/' + id);
            this.props.responseValidationView(id, null, this.props);


        } catch (err) {
            console.log(err)
        }
    }

    render() {
        return (
            <div className="container-fluid">
                <h2>Editar produto: {this.state.description}</h2>
                <MDBRow>
                    <MDBCol md="12">
                        <form onSubmit={(e) => this.formValidation(e)}>
                            <label htmlFor="code" className="grey-text">
                                Codígo
                            </label>
                            <input type="text" id="code" name="code" defaultValue={this.state.code} required={true} className="form-control"/>
                            <br/>
                            <label htmlFor="description" className="grey-text">
                                Descrição
                            </label>
                            <input type="text" id="description" name="description" defaultValue={this.state.description} required={true} className="form-control"/>
                            <br/>
                            <label htmlFor="specific_group" className="grey-text">
                                Grupo específico
                            </label>
                            <input type="text" id="specific_group" name="specific_group" defaultValue={this.state.specific_group} required={true} className="form-control"/>
                            <br/>
                            <label htmlFor="general_group" className="grey-text">
                                Grupo geral
                            </label>
                            <input type="text" id="general_group" name="general_group" defaultValue={this.state.general_group} required={true} className="form-control"/>

                            <div className="mt-4">
                                <Button variant="contained" className="float-left" color="secondary" onClick={(e) => this.props.history.push('/orders')}>
                                    Cancelar
                                </Button>
                                <Button className="float-right" type="submit" variant="contained" color="primary">
                                    Editar
                                </Button>
                            </div>
                        </form>
                    </MDBCol>
                </MDBRow>
            </div>
        )
    }

//    custom functions
    formValidation = (e) => {
        e.preventDefault();
        try{
            // let post = strapi.updateEntry('orders' , this.state.id,  { description: e.target.description.value ,specific_group: e.target.specific_group.value ,general_group: e.target.general_group.value});
            let postData = { code: e.target.code.value, description: e.target.description.value, specific_group: e.target.specific_group.value ,general_group: e.target.general_group.value};
            this.props.responseValidationUpdate(this.state.id, postData, this.props)
        }catch (e) {
            console.log(e)
        }
    }
}

const mapStateToProps = store => ({
    product: store.productsReducer.product,
});

const mapFunctionsToProps = {
    responseValidationUpdate,
    responseValidationView,
};

export default withRouter(Connect(mapStateToProps, mapFunctionsToProps)((ProductsUpdate)));
