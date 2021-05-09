import React, { Component } from 'react'
import { connect } from 'react-redux'
import { filterProducts, sortProducts } from "../actions/productActions"

class Filter extends Component {
  constructor() {
    super()
    this.state = {
      sort: ""
    }
  }
  render() {

    return (
      !this.props.products ? (<div>Loading...</div>) : (
        <div className="filter">
          <div className="product-count"> {this.props.filteredProducts.length} Products</div>
          <div className="filter-size">
            Filter{' '}
            <select value={this.props.size} onChange={(e) => (

              this.props.filterProducts(this.props.products, e.target.value, this.state.order)
            )}>
              <option value="">All</option>
              <option value="Large">Large</option>
              <option value="Middium">Middium</option>
              <option value="Small">Small</option>
            </select>
          </div>
          <div className="filter-price">
            Order{' '}
            <select value={this.props.sort} onChange={(e) => {
              this.setState({ order: e.target.value })
              this.props.sortProducts(this.props.filteredProducts, e.target.value)
            }}>
              <option value="latest">Latest</option>
              <option value="highest">Highest</option>
              <option value="lowest">Lowest</option>
            </select>
          </div>
        </div>
      ))
  }
}
export default connect((state) => ({
  size: state.products.size,
  sort: state.products.sort,
  products: state.products.items,
  filteredProducts: state.products.filteredItems
}), {
  filterProducts,
  sortProducts
})(Filter)