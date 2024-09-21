import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom"
import userContext from "./contexts/userContext";

const NavBar = ({ currUserToken, logout }: { currUserToken?: string, logout: () => void }) => {
  const currUser = useContext(userContext);

  const navigate = useNavigate();

  const handleLogout = (evt: React.MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    logout();
    navigate("/login");
  }
  
  return (
    <nav className='flex justify-between items-center mx-5'>
        <div className='text-lg space-x-3'>
          <Link className="text-3xl" to="/">PB</Link> 
          {currUserToken ?
          <>
            <Link to="/tasks">Tasks</Link>
            <Link to="/projects">Projects</Link>
          </>
          :
          <></>
          }
        </div>
        <div className='text-lg space-x-3'>
          {currUserToken ? 
          <>
            <Link to="/profile">{currUser.username}</Link>
            <Link to="#" onClick={handleLogout}>Logout</Link>
          </>
          :
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
          }
        </div>
    </nav>
  )
}

export default NavBar