import { ADD_TO_CART, REMOVE_FROM_CART } from "../types"

export const addToCart = (product) => (dispatch, getState) => {
    const cartItems = getState().cart.cartItems.slice()
    let alreadyInCart = false
    cartItems.forEach((element) => {
        if (element._id === product._id) {
            alreadyInCart = true
            element.count++
        }
    })
    if (!alreadyInCart) {
        cartItems.push({ ...product, count: 1 })
    }
    dispatch({
        type: ADD_TO_CART,
        payload: { cartItems }
    })
    localStorage.setItem("cartItems", JSON.stringify(cartItems))
}

export const removeFromCart = (product) => (dispatch, getState) => {
    const cartItems = getState().cart.cartItems.slice().filter(element => element._id !== product._id)
    dispatch({
        type: REMOVE_FROM_CART,
        payload: { cartItems }
    })
    localStorage.setItem("cartItems", JSON.stringify(cartItems))
}

