import React, { Component } from 'react'

export default class Filter extends Component {
    render() {
        return (
            <div className="filter">
                <div className="product-count"> {this.props.count} Products</div>
                <div className="filter-price"> 
                    Order{' '}
                    <select value={this.props.sort} onChange={this.props.sortProducts}>
                        <option>Latest</option>
                        <option value="highest">Highest</option>
                        <option value="lowest">Lowest</option>
                    </select>
                </div>
                <div className="filter-size">
                    Filter{' '}
                    <select value={this.props.size} onChange={this.props.filterProducts}>
                        <option value="">All</option>
                        <option value="Large">Large</option>
                        <option value="Middium">Middium</option>
                        <option value="Small">Small</option>
                    </select>
                </div>
            </div>
        )
    }
}
