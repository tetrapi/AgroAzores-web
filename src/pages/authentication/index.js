import React, {PureComponent} from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import Connect from "react-redux/es/connect/connect";
import {authenticate} from "./functions"
import {Button, Divider, Grid, TextField} from '@material-ui/core';
import './index.css';
import Card from '@material-ui/core/Card';
import {debug, getItem} from "../../actions/encrypt";

class AuthenticationComponent extends PureComponent {

    render() {
        return (
            <div>
                <svg width="832" height="707" viewBox="0 0 832 707" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_d)">
                        <path
                            d="M-62.7451 -236.127C52.3823 -356.651 592.55 -329.345 662.975 -329.345C804.178 -329.345 877.798 -56.1331 790.084 65.1836C734.259 142.395 609.727 123.562 547.891 187.591C486.054 251.619 499.599 311.685 450.842 362.728C402.085 413.77 282.509 407.924 219.813 450.296C157.118 492.668 190.613 612.251 99.5758 666.864C8.53879 721.476 -195.865 631.082 -122.005 491.726C19.8801 224.024 -266.991 -22.3061 -62.7451 -236.127Z"
                            fill="#00FF47"/>
                    </g>
                    <g filter="url(#filter1_d)">
                        <path
                            d="M-74.8103 -251.334C22.1015 -352.741 476.803 -329.766 536.086 -329.766C654.947 -329.766 716.919 -99.8913 643.083 2.1821C596.091 67.1458 491.263 51.3009 439.21 105.173C387.157 159.045 398.559 209.583 357.516 252.529C316.473 295.476 215.817 290.557 163.042 326.208C110.266 361.859 138.461 462.473 61.8281 508.423C-14.805 554.373 -186.868 478.318 -124.694 361.066C-5.25816 135.827 -246.741 -71.4299 -74.8103 -251.334Z"
                            fill="#00D63C"/>
                    </g>
                    <defs>
                        <filter id="filter0_d" x="-143" y="-332" width="975" height="1039" filterUnits="userSpaceOnUse"
                                color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                            <feColorMatrix in="SourceAlpha" type="matrix"
                                           values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
                            <feOffset dy="20"/>
                            <feGaussianBlur stdDeviation="2"/>
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 1 0 0 0 0 0.28 0 0 0 0.4 0"/>
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
                        </filter>
                        <filter id="filter1_d" x="-143" y="-332" width="822" height="878" filterUnits="userSpaceOnUse"
                                color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                            <feColorMatrix in="SourceAlpha" type="matrix"
                                           values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
                            <feOffset dy="20"/>
                            <feGaussianBlur stdDeviation="2"/>
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0.8375 0 0 0 0 0.2345 0 0 0 0.4 0"/>
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
                        </filter>
                    </defs>
                </svg>
                <div className="p-5" style={{position: 'absolute', left: '50%', top: '60%', transform: 'translate(-50%, -60%)'}}>
                    <div>
                        <Grid container alignItems="center">
                            <div className="px-5">{this.renderAuthenticationComponent()}</div>
                        </Grid>
                    </div>
                </div>
                <div className="authentication-main-container-copy-right">
                    {'Musami' + ' © ' + new Date().getFullYear()}
                </div>
            </div>
        )
    }

    renderAuthenticationComponent = () => {
        const {loading} = this.props;

        if (getItem('loggedIn') === null || (getItem('loggedIn') !== null && !loading)) {
            return (
                <form onSubmit={(e) => this.oauthSubmit(e)} autoComplete="off">
                    <div>
                        <TextField style={{minWidth: '300px'}} className="my-3" id="email" name='email' label="Email" variant="outlined" required/>
                        <br/>
                        <TextField style={{minWidth: '300px'}} className="my-3" id="password" name='password' label="Palavra-chave" variant="outlined" type='password' required/>
                        <br/>
                        <br/>
                        <div className="my-3">
                            <Button

                            style={{minWidth: 300, height: '56px', backgroundColor: '#CACACA', color:'#fff'}}
                            variant="contained"
                            // startIcon={<Person/>}
                            type='submit'
                        >
                            Entrar
                        </Button>
                        </div>
                    </div>
                </form>
            )
        }
    };

    oauthSubmit = (e) => {
        e.preventDefault();
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        let postData = {identifier: email, password: password};
        this.props.authenticate(postData, this.props);
    };
}


const mapStateToProps = store => ({
    loggedIn: store.loginReducer.loggedIn,
    loading: store.loginReducer.loading,
});

const mapFunctionsToProps = {
    authenticate,
};

export default (Connect(mapStateToProps, mapFunctionsToProps)((AuthenticationComponent)));
