import React, { useContext } from "react";
import { withRouter, NavLink } from 'react-router-dom';
import { FirebaseContext } from '../firebase';

const Header = () => {
  const { user, firebase } = useContext(FirebaseContext);
  return (
    <div className="header">
      <div className="flex">
        <NavLink to="/" className="header-title">
          Home
        </NavLink>
        {user && ( 
            <>
                <NavLink to="/jobs" className="header-link">
                    Jobs
                </NavLink>
                <div className="divider"> | </div>
                <NavLink to="/create" className="header-link">
                Create Job
                </NavLink>
                <div className="divider"> | </div>
                <NavLink to="/search" className="header-link">Search</NavLink>
            </>
        )}
      </div>
      <div className="flex">
      {user ? (
        <>
          <div className="header-name">{user.displayName}</div>
          <div className="divider">|</div>
          <div 
            className="header-button"
            onClick={() => firebase.logout()}  
          >Logout</div>
        </>
      )
       : (
            <NavLink to="/login" className="header-link">
              Login
            </NavLink>
          )
      }
        
      </div>
    </div>
  )
}

export default Header;