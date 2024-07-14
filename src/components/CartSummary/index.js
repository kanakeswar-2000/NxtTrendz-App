// Write your code here
import './index.css'
import CartContext from '../../context/CartContext'
const CartSummary = () => {
  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        const count = cartList.length
        const pricesList = cartList.map(eachproduct => {
          return eachproduct.price * eachproduct.quantity
        })
        const reducer = (accumulater, currentvalue) =>
          accumulater + currentvalue
        const totalsum = pricesList.reduce(reducer)
        return (
          <div className="summary-container">
            <h1>Order Total: Rs {totalsum}/-</h1>

            <p>{count} items in cart</p>
            <button className="checkout-button">Checkout</button>
          </div>
        )
      }}
    </CartContext.Consumer>
  )
}
export default CartSummary
