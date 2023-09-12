import { SideNav } from '../components/SideNav'
import OrderRequestContent from '../components/OrderRequestContent'

function OrderRequest() {
    if(localStorage.getItem('isLogged')!== 'true'){
        window.location.href='/login'
      }

  return (
    <div>

        <SideNav></SideNav>
        <OrderRequestContent></OrderRequestContent>
       
    </div>
    
  )
}

export default OrderRequest