import React, {PureComponent} from 'react';
import Connect from "react-redux/es/connect/connect";


class Dashboard extends PureComponent {

    // Native component functions
    componentDidMount() {
    }


    // Native component render function
    render() {

        return (
            <div>
                <iframe className='w-100 min-vh-100'
                        src="https://datastudio.google.com/embed/reporting/d12b7bb3-f3aa-44f6-9386-83362bfd0d89/page/otAhB"
                        frameBorder="0" style={{border: 0}} allowFullScreen/>
                <iframe className='w-100 h-100 min-vh-100'
                        src="https://datastudio.google.com/embed/reporting/01700add-74e8-4454-b137-4b682700c329/page/0yIfB"
                        frameBorder="0" style={{border: 0}} allowFullScreen/>
                <iframe className='w-100 h-100 min-vh-100'
                        src="https://datastudio.google.com/embed/reporting/ef6dcdc3-6b9d-4a0b-a4a1-79440d741e42/page/otAhB"
                        frameBorder="0" style={{border: 0}} allowFullScreen/>
                <iframe className='w-100 h-100 min-vh-100'
                        src="https://datastudio.google.com/embed/reporting/e9c694fa-78ff-45ba-bafd-7e99c4982a9d/page/0yIfB"
                        frameBorder="0" style={{border: 0}} allowFullScreen/>
                <iframe className='w-100 h-100 min-vh-100'
                        src="https://datastudio.google.com/embed/reporting/d58f5a4d-1500-4aa8-9ad7-79ed85a4e17a/page/0yIfB"
                        frameBorder="0" style={{border: 0}} allowFullScreen/>
                <iframe className='w-100 h-100 min-vh-100'
                        src="https://datastudio.google.com/embed/reporting/d12b7bb3-f3aa-44f6-9386-83362bfd0d89/page/otAhB"
                        frameBorder="0" style={{border: 0}} allowFullScreen/>
            </div>
        );
    }
}

// Redux reducer variables
const mapStateToProps = store => ({});

// Redux dispatch functions
const mapFunctionsToProps = {};

// Redux Connect function to utilize its functionality
export default Connect(mapStateToProps, mapFunctionsToProps)((Dashboard));
