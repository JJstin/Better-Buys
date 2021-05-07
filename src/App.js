import React from 'react'
import Cart from './components/Cart'
import Filter from './components/Filter'
import Products from './components/Products'
import data from "./data.json"
import store from "./store"
import { Provider } from "react-redux"

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      products: data.products,
      cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
      size: "",
      sort: ""
    }
  }
  createOrder = (order) => {
  }

  removeFromCart = (product) => {
    const cartItems = this.state.cartItems.slice()

    this.setState({ cartItems: cartItems.filter((item) => item._id !== product._id) })
    localStorage.setItem("cartItems", JSON.stringify(cartItems.filter((item) => item._id !== product._id)))
  }

  addToCart = (product) => {
    const cartItems = this.state.cartItems.slice()
    let alreadyInCart = false

    cartItems.forEach((item) => {
      if (item._id === product._id) {
        item.count++
        alreadyInCart = true
      }
    })
    if (!alreadyInCart) {
      cartItems.push({ ...product, count: 1 })
    }
    this.setState({ cartItems })
    localStorage.setItem("cartItems", JSON.stringify(cartItems))
  }

  // sortProducts = (event) => {
  //   const sortValue = event.target.value
  //   console.log("sort product", sortValue)
  //   this.setState((state) => ({
  //     sort: sortValue,
  //     products: this.state.products.sort((a, b) => {
  //       if (sortValue === "lowest") {
  //         return (a.price < b.price) ? -1 : 1
  //       } else if (sortValue === "highest") {
  //         return (a.price > b.price) ? -1 : 1
  //       } else {
  //         return (a._id < b._id) ? -1 : 1
  //       }
  //     })
  //   }))
  // }
  // filterProducts = (event) => {
  //   const filterValue = event.target.value
  //   console.log("filter product", filterValue)
  //   if (event.target.value === "") {
  //     this.setState({ size: filterValue, products: data.products })
  //   } else {
  //     this.setState({
  //       size: filterValue,
  //       products: data.products.filter((product) => product.avaliableSizes.includes(filterValue))//product.avaliableSizes.indexOf(event.target.value)>=0)
  //     })
  //   }
  // }


  render() {
    return (
      <Provider store={store}>
        <div className="grid-container">
          <header>
            <a href="/">React Store</a>
          </header>
          <main>
            <div className="content">
              <div className="main">
                <Filter></Filter>
                <Products addToCart={this.addToCart}></Products>
              </div>
              <div className="sidebar">
                <Cart cartItems={this.state.cartItems} removeFromCart={this.removeFromCart} createOrder={this.createOrder}></Cart>
              </div>
            </div>
          </main>
          <footer>
            Have Fun Shopping!
        </footer>
        </div>
      </Provider>
    )
  }
}

export default App
