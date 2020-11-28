import React, {PureComponent} from 'react';
import Connect from "react-redux/es/connect/connect";
import {responseValidationView} from "./functions"
import './index.css';
import {withRouter} from "react-router-dom";

class ProductsView extends PureComponent {
    // react functions

    render() {


        return (
            <div>

            </div>
        )
    }

//    custom functions
}

const mapStateToProps = store => ({
    products_view: store.productsReducer.products_view,
});

const mapFunctionsToProps = {
    responseValidationView,
};

export default withRouter(Connect(mapStateToProps, mapFunctionsToProps)((ProductsView)));
