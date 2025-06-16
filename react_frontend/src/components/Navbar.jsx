import {Link} from 'react-router-dom'
import "../css/Navbar.css"
import { useState } from 'react';

function Navbar(){
    const token = localStorage.getItem("token")
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const handleLogout = () =>{
        localStorage.removeItem("token")
        window.location.reload()
    }
    return <nav className="navbar">
        <div className="navbar-brand">
            <Link to="/">
            Be_Lyke_Ck
            </Link>
        </div>
        <div className="navbar-links">
            <Link to="/" className='nav-link'>Home</Link>
            <Link to="/fav" className='nav-link'>Fav</Link>
            <Link to="/cart" className='nav-link'>Cart</Link>
            <Link to="/order" className='nav-link'>Order</Link>
            {token && (
                    <div className="dropdown">
                        <button className="nav-link" onClick={() => setDropdownOpen(!dropdownOpen)}>
                            User
                        </button>
                        {dropdownOpen && (
                            <div className="dropdown-menu">
                                <button onClick={handleLogout}>Logout</button>
                            </div>
                        )}
                    </div>
                )}
        </div>
    </nav>
}

export default Navbar