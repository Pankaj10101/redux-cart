import { useEffect } from 'react';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from './store/ui-slice';
import Notification from './components/UI/Notification'

let isInitial = true
function App() {
  const dispatch = useDispatch()
  const cartIsVisible = useSelector(state=>state.ui.cartIsVisible)
  const cartItems = useSelector(state=>state.cart.items)
const notification = useSelector(state=>state.ui.notification)
console.log(notification)
  useEffect(()=>{
    const sendCartData = async ()=>{
      dispatch(uiActions.showNotification({
        status : 'pending',
        title: 'sending...',
        message :'sending cart data...'
      }))
    const response = await  fetch('https://authentica-a7b13-default-rtdb.firebaseio.com/cart.json', {
        method : 'PUT',
        body: JSON.stringify(cartItems)
      })

      if(!response.ok){
        throw new Error('sent data failed')
      }

      dispatch(uiActions.showNotification({
        status: 'success',
        title:'success',
        message: 'Sent Cart Data successfully'
      }))

    }

    if(isInitial){
      isInitial=false
      return;
    }
    sendCartData().catch(error=>{
      dispatch(uiActions.showNotification({
        status: 'error',
        title:'Error!',
        message: 'Sending cart data failed'
      }))
    })
  },[cartItems, dispatch])
  return (
    <>
    {notification && <Notification status = {notification.status} title ={notification.title} message={notification.message} />}
    <Layout>
    {cartIsVisible && 
      <Cart />
    }
      <Products />
    </Layout>
    </>
  );
}

export default App;
