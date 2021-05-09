import React, { Component } from 'react'
import formatCurrency from '../utils'
import Fade from "react-reveal/Fade"
import Zoom from "react-reveal/Zoom"
import Modal from "react-modal"
import { connect } from 'react-redux'
import { fetchProducts } from "../actions/productActions"
import { addToCart } from "../actions/cartActions"
import Button from '@material-ui/core/Button';

class Products extends Component {
    constructor(props) {
        super(props)
        this.state = {
            product: null,
        }
    }
    componentDidMount() {
        this.props.fetchProducts()
    }
    openModal = (product) => {
        this.setState({ product })
    }
    closeModal = () => {
        this.setState({ product: null })
    }
    render() {
        const { product } = this.state
        return (
            <div>
                <Fade bottom cascade>
                    {!this.props.products ? (<div>Loading...</div>) : (<ul className="products">
                        {this.props.products.map(product => (
                            <li key={product._id}>
                                <div className="product">
                                    <a href={"#" + product._id} onClick={() => this.openModal(product)} className="product-card">
                                        <img src={product.image} alt={product.title}></img>
                                        <p className="product-title">
                                            {product.title}
                                        </p>
                                    </a>
                                    <div className="productPrice">
                                        <div>
                                            {formatCurrency(product.price)}
                                        </div>
                                        <Button variant="contained" color="primary" disableElevation className="button-primary" style={{ fontSize: "15px" }} onClick={() => this.props.addToCart(product)}>
                                            Add to Cart
                                        </Button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    )}
                </Fade>
                {product && (
                    <Modal
                        isOpen={true}
                        onRequestClose={this.closeModal}
                    >
                        <Zoom>
                            <button className="close-modal" onClick={this.closeModal}>
                                x
                            </button>
                            <div className="product-details">
                                <img src={product.image} alt={product.title}></img>
                                <div className="product-details-description">
                                    <p>
                                        <strong>{product.title}</strong>
                                    </p>
                                    <p>
                                        <p>{product.description}</p>
                                    </p>
                                    <p>
                                        Avaliable Sizes{' '}
                                        {product.avaliableSizes.map(x => (
                                            <span>
                                                {' '}
                                                <button>{x}</button>
                                            </span>
                                        ))}
                                    </p>
                                    <div className="productPrice">
                                        <div>{formatCurrency(product.price)}</div>
                                        <Button
                                            onClick={() => {
                                                this.props.addToCart(product)
                                                this.closeModal()
                                            }}
                                            variant="contained"
                                            color="primary"
                                            disableElevation
                                            className="button-primary"
                                            style={{ fontSize: "15px" }}
                                        >
                                            Add To Cart
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Zoom>
                    </Modal>
                )}
            </div>
        )
    }
}
export default connect((state) => ({ products: state.products.filteredItems }), {
    fetchProducts,
    addToCart
})(Products)