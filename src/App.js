import React from 'react'
import store from "./store"
import { Provider } from "react-redux"
import { BrowserRouter, Route, Link } from "react-router-dom"
import HistoryScreen from './screens/HistoryScreen'
import HomeScreen from './screens/HomeScreen'

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="grid-container">
            <header>
              <Link to="/">Better Buys</Link>
              <Link to="/history">History</Link>
            </header>
            <main>
              <Route path="/history" component={HistoryScreen} />
              <Route path="/" component={HomeScreen} exact />

            </main>
            <footer>
              Have Fun Shopping!
        </footer>
          </div>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App
