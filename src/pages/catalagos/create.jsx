import React, {PureComponent} from 'react';
import Connect from "react-redux/es/connect/connect";
import {responseValidationCreate} from "./functions"
import './index.css';
import Strapi from 'strapi-sdk-javascript/build/main';
import {MDBCol, MDBRow} from "mdbreact";
import {Link, withRouter} from "react-router-dom";
import {Button} from "@material-ui/core";


class ProductsCreate extends PureComponent {
    // react functions
    render() {
        return (
            <div className="container-fluid">
                <h2>Criar tipos</h2>
                <MDBRow>
                    <MDBCol md="12">
                        <form onSubmit={(e) => this.formValidation(e)}>
                            <label htmlFor="code" className="grey-text">
                                Codígo
                            </label>
                            <input type="text" id="code" name="code" required={true} className="form-control"/>
                            <br/>
                            <label htmlFor="description" className="grey-text">
                                Descrição
                            </label>
                            <input type="text" id="description" name="description" required={true} className="form-control"/>
                            <br/>
                            <label htmlFor="specific_group" className="grey-text">
                                Grupo específico
                            </label>
                            <input type="text" id="specific_group" name="specific_group" required={true} className="form-control"/>
                            <br/>
                            <label htmlFor="general_group" className="grey-text">
                                Grupo geral
                            </label>
                            <input type="text" id="general_group" name="general_group" required={true} className="form-control"/>

                            <div className="mt-4">
                                <Button variant="contained" className="float-left" color="secondary" onClick={(e) => this.props.history.push('/orders')}>
                                    Cancelar
                                </Button>
                                <Button className="float-right" type="submit" variant="contained" color="primary">
                                    Criar
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
        try{
            e.preventDefault();
            let postData =  { code: e.target.code.value, description: e.target.description.value, specific_group: e.target.specific_group.value ,general_group: e.target.general_group.value};
            this.props.responseValidationCreate(postData, this.props)
        }catch (e) {
            console.log(e)
        }
    }
}

const mapStateToProps = store => ({
    products_create: store.productsReducer.products_create,
});

const mapFunctionsToProps = {
    responseValidationCreate,
};

export default withRouter(Connect(mapStateToProps, mapFunctionsToProps)((ProductsCreate)));
