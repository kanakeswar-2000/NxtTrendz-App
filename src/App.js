import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }
  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    this.setState({
      cartList: cartList.map(eachproduct => {
        if (eachproduct.id === id) {
          const updatedquantity = eachproduct.quantity + 1
          return {...eachproduct, quantity: updatedquantity}
        } else {
          return eachproduct
        }
      }),
    })
  }
  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const product = cartList.find(eachproduct => eachproduct.id === id)
    if (product.quantity > 1) {
      this.setState({
        cartList: cartList.map(eachproduct => {
          if (eachproduct.id === id) {
            const updatedQty = eachproduct.quantity - 1
            return {...eachproduct, quantity: updatedQty}
          } else {
            return eachproduct
          }
        }),
      })
    } else {
      this.removeCartItem(id)
    }
  }
  removeCartItem = id => {
    const {cartList} = this.state
    const updatedList = cartList.filter(eachproduct => {
      if (eachproduct.id === id) {
        return null
      } else {
        return eachproduct
      }
    })
    this.setState({cartList: updatedList})
  }
  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    const productId = product.id
    const {cartList} = this.state
    const item = cartList.find(eachproduct => eachproduct.id === productId)
    if (item === undefined) {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    } else {
      const {cartList} = this.state
      this.setState({
        cartList: cartList.map(eachproduct => {
          if (eachproduct.id === product.id) {
            const updatedquantity = eachproduct.quantity + product.quantity
            return {...eachproduct, quantity: updatedquantity}
          } else {
            return eachproduct
          }
        }),
      })
    }
    //   TODO: Update the code here to implement addCartItem
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
