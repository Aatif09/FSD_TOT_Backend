import { Link } from 'react-router';
import "./Navbar.css"
function NavBar() {
  return (
    <div className='aa'>
      <Link to="/">Home Page</Link>
      <Link to="/products">Product Page</Link>

    </div>
  )
}

export default NavBar