import React, {PureComponent} from 'react';
import AuthenticationComponent from "./pages/authentication";
import Loggedin from "./pages/authentication/loggedin";
import Connect from "react-redux/es/connect/connect";
import {withTranslation} from "react-i18next";
import {ToastContainer} from "react-toastify";
import {createMuiTheme} from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import {debug,getItem} from "./actions/encrypt";

class App extends PureComponent {

    componentDidMount() {
    }


    render() {
        return (
            <div>
                {this.renderInitialScreen()}
                <ToastContainer autoClose={8000}/>
            </div>
        );
    }


    onAutoLogin = () => {
        if (getItem('loggedIn') === null || getItem('loggedIn') === false) {
            return true
        } else {
            const postData = getItem('personal_data');
            return false;
        }
    };

    renderInitialScreen() {
        if (this.onAutoLogin()) {
            return (
                <div style={{backgroundColor: '#fff', top: 0,bottom: 0,position: 'absolute',left: 0,right: 0,}}>
                    <AuthenticationComponent/>
                </div>
            )
        }
        return (
            <Loggedin/>
        )
    }
}

const mapStateToProps = store => ({
    loggedIn: store.loginReducer.loggedIn,
});

const mapFunctionsToProps = {};

export default (Connect(mapStateToProps, mapFunctionsToProps)((App)));
