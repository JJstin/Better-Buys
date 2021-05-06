import React, { Component } from 'react'
import formatCurrency from '../utils'
import Fade from "react-reveal/Fade"
import Modal from "react-modal"
import Zoom from "react-reveal/Zoom"


export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: '',
      Email: '',
      Address: '',
      Order: null,
      showCheckout: false,
    }
  }
  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }
  createOrder = (e) => {
    e.preventDefault()
    const shortid = require('shortid')
    const order = {
      _id: shortid.generate(),
      name: this.state.Name,
      email: this.state.Email,
      address: this.state.Address,
      cartItems: this.props.cartItems,
      total: this.props.cartItems.reduce((a, c) => a + c.price * c.count, 0),
    }
    this.setState({ Order: order })
    this.props.createOrder(order)
  }
  closeModal = ()=>{
    this.setState({Order:null})
    localStorage.clear("cartItems")
    window.location.reload()
}
  
  render() {
    const date = new Date().toLocaleString()
    const { cartItems } = this.props
    const order = this.state.Order
    console.log(date.toLocaleString())
    return (
      <div>
        {cartItems.length === 0 ? (
        <div className="cart cart-header">
          Cart is Empty
        </div>) : 
        (<div className="cart cart-header">
          You have {cartItems.length} product{cartItems.length > 1 ? "s" : ""} in your cart
        </div>)}

        {order && (
          <Modal isOpen={true} onRequestClose={this.closeModal}>
            <Zoom>
              <button className="close-modal" onClick={this.closeModal}>
                x
              </button>
              <div className="order-details">
                <h3 className="success-message">Your order has been placed.</h3>
                <h2>Order ID: <u>{order._id}</u></h2>
                <ul>
                  <li>
                    <div>Name:</div>
                    <div>{' '}</div>
                    <div>{order.name}</div>
                  </li>
                  <li>
                    <div>Email:</div>
                    <div>{order.email}</div>
                  </li>
                  <li>
                    <div>Address:</div>
                    <div>{order.address}</div>
                  </li>
                  <li>
                    <div>Date:</div>
                    <div>{date}</div>
                  </li>
                  <li>
                    <div>Total:</div>
                    <div>{formatCurrency(order.total)}</div>
                  </li>
                  <li>
                    <div>Cart Items:</div>
                    <div>
                      {order.cartItems.map((x) => (
                        <div className="order-details items">
                          {x.count} {" x "} {x.title}
                        </div>
                      ))}
                    </div>
                  </li>
                </ul>
              </div>
            </Zoom>
          </Modal>
        )}

        <div>
          <div className="cart">
            <Fade left cascade>
              <ul className="cart-items">
                {cartItems.map((item) => (
                  <li key={item._id}>
                    <div>
                      <img src={item.image} alt={item.title}></img>
                    </div>
                    <div>
                      <div>{item.title}</div>
                      <div className="right">
                        {formatCurrency(item.price)} x {item.count} {" "}
                        <button className="button" onClick={() => this.props.removeFromCart(item)}>Remove</button>
                      </div>

                    </div>
                  </li>
                ))}
              </ul>
            </Fade>
          </div>
          {cartItems.length !== 0 && (
            <>
              <div className="cart">
                <div className="total">
                  <div>
                    Total:{' '}
                    {formatCurrency(cartItems.reduce((a, c) => a + c.price * c.count, 0))}
                  </div>
                  <button className="button primary" onClick={() => this.setState({ showCheckout: true })}>Proceed</button>
                </div>
              </div>
              {this.state.showCheckout && (
                <Fade right cascade>
                  <div className="cart">
                    <form onSubmit={this.createOrder}>
                      <ul className="form-container">
                        <li>
                          <label>Email</label>
                          <input
                            name="Email"
                            type="email"
                            required
                            onChange={this.handleInput}
                          ></input>
                        </li>
                        <li>
                          <label>Name</label>
                          <input
                            name="Name"
                            type="text"
                            required
                            onChange={this.handleInput}
                          ></input>
                        </li>
                        <li>
                          <label>Address</label>
                          <input
                            name="Address"
                            type="text"     
                            required
                            onChange={this.handleInput}
                          ></input>
                        </li>
                        <li>
                          <button type="submit" className="button primary" onClick={this.createOrder}>
                            Check Out
                          </button>
                        </li>
                      </ul>
                    </form>
                  </div>
                </Fade>
              )}
            </>
          )}
        </div>
      </div>
    )
  }
}
