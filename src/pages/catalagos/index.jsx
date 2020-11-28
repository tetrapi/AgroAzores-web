import React, {PureComponent} from 'react';
import Connect from "react-redux/es/connect/connect";
import {responseValidation, responseValidationDelete} from "./functions"
import './index.css';
import {MDBDataTable} from "mdbreact";
import {Link, withRouter} from "react-router-dom";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import {debug} from "../../actions/encrypt";
import DeleteIcon from "@material-ui/icons/DeleteForever";


class Products extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
        }
    }

    // react functions
    componentWillReceiveProps(nextProps, nextContext) {
        debug('produtos view props', nextProps);
        if (nextProps.products !== null) {
            let posts = nextProps.products;
            let columns = [];
            let data = {};
            if (posts[0]) {
                for (let post in posts[0]) {
                    if (!(post === 'created_at' || post ===  'updated_at' || post === 'id')) {
                        columns.push({
                            label: post,
                            field: post,
                            // sort: 'asc',
                            // width: 150
                        });
                    }

                }
                columns.push({
                    label: 'Ações',
                    field: 'actions',
                    width: 65,
                    searchable: false
                });
                for (let post in posts) {
                    posts[post]['actions'] =
                        <div className='actions'>
                            <Link to={'orders/update/' + posts[post]['id']}> <EditIcon/></Link>
                            <Link to={'orders/delete/' + posts[post]['id']}> <DeleteIcon/></Link>
                            {/*<a onClick={() => this.deleteConfirmation(posts[post]['id'])}><DeleteIcon/></a>*/}
                        </div>;
                }
                data = {
                    'columns': columns,
                    'rows': posts
                };
                this.setState({posts: data});
            }
        }
    }

    async componentDidMount() {
        this.props.responseValidation(null, this.props)
    }

    render() {

        const addButton = props => <Link style={{color: '#fff'}} to="/products/create" {...props} />;
        return (
            <div className="container-fluid">
                <h2> Produtos </h2>
                <div className="">
                    <Button variant="contained" color="primary" component={addButton}>
                        Adicionar
                    </Button>

                    <MDBDataTable
                        entriesLabel="Mostrar registos"
                        displayEntries={false}
                        entries={10}
                        striped
                        bordered
                        small
                        btn
                        scrollX
                        noBottomColumns
                        noRecordsFoundLabel="Não foram encontrados nenhuns resultados!"
                        infoLabel={['A mostrar', 'até', 'de', 'registos']}
                        searchLabel={"Pesquisa"}
                        paginationLabel={['Anterior', 'Seguinte']}
                        data={this.state.posts}
                    />
                </div>
            </div>
        );
    }

    //    custom functions
    deleteConfirmation(id) {
        var retVal = window.confirm("Tem a certeza que pretende este registo?");
        if (retVal === true) {
            let postData = id;
            this.props.responseValidationDelete(postData, this.props);
            return true;
        } else {
            document.write("Cancelar!");
            return false;
        }
    }
}

const mapStateToProps = store => ({
    // example: store.productsReducer.example,
    products: store.productsReducer.products,
});

const mapFunctionsToProps = {
    responseValidation,
    responseValidationDelete
};

export default withRouter(Connect(mapStateToProps, mapFunctionsToProps)((Products)));
