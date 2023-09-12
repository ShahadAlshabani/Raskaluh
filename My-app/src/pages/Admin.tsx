import { SideNavAdmin } from '../components/SideNavAdmin'
import Profile from '../components/Profile'

function Admin() {
    if(localStorage.getItem('isLoggedAdmin')!== 'true'){
        window.location.href='/login'
      }
  return (
    <div>
       <SideNavAdmin></SideNavAdmin>
       <Profile></Profile>

    </div>
  )
}

export default Admin