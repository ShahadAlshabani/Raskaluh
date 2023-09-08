import Profile from '../components/Profile'
import { SideNav } from '../components/SideNav'

export const User = () => {
    if(localStorage.getItem('isLogged')!== 'true'){
        window.location.href='/login'
      }

  return (
    <div>

        <SideNav></SideNav>
        <Profile></Profile>
       
    </div>
    
  )
}
