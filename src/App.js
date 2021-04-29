import React from 'react';
import Filter from './components/Filter';
import Products from './components/Products';
import data from "./data.json"

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      products: data.products,
      size: "",
      sort: ""
    }
  }

  sortProducts = (event) => {
    const sortValue = event.target.value
    console.log("sort product", sortValue)
    this.setState((state) => ({
      sort: sortValue,
      products: this.state.products.sort((a,b) => {
        if(sortValue === "lowest"){
          return (a.price < b.price) ? -1 : 1
        } else if (sortValue === "highest"){
          return (a.price > b.price) ? -1 : 1
        } else {
          return (a._id < b._id) ? -1 : 1
        }
      })
    }))
  }
  filterProducts = (event) => {
    const filterValue = event.target.value
    console.log("filter product", filterValue)
    if(event.target.value === ""){
      this.setState({size: filterValue, products: data.products})
    } else {
      this.setState({
        size: filterValue,
        products: data.products.filter((product) => product.avaliableSizes.includes(filterValue))//product.avaliableSizes.indexOf(event.target.value)>=0)
      })
    }
  }


  render(){
    return (
      <div className="grid-container">
        <header>
          <a href="/">React Store</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter 
                count={this.state.products.length}
                size={this.state.size}
                sort={this.state.sort}
                filterProducts={this.filterProducts}
                sortProducts={this.sortProducts}
              ></Filter>
              <Products products={this.state.products}></Products>
            </div>
            <div className="sidebar">
              Cart Items
            </div>
          </div>
        </main>
        <footer>
          Have Fun Shopping!
        </footer>
      </div>
   )
  }
}

export default App;
