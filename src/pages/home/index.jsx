import React, {PureComponent} from 'react';

import Connect from "react-redux/es/connect/connect";


class Home extends PureComponent {

    // Native component render function
    componentDidMount() {
    }

    //render component
    render() {

        return (
            <main id="content" role="main" className="">
            </main>
        );
    }

    // Custom component render functions

}

// Redux reducer variables
const mapStateToProps = store => ({});

// Redux dispatch functions
const mapFunctionsToProps = {};

// Redux Connect function to utilize its functionality
export default Connect(mapStateToProps, mapFunctionsToProps)((Home));
