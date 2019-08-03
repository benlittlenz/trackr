import React, { useState, useContext } from "react";
import { withRouter, NavLink } from 'react-router-dom';
import { FirebaseContext } from '../firebase';
import { Menu } from 'semantic-ui-react'


const Header = () => {
  const { user, firebase } = useContext(FirebaseContext);
  const [activeItem, setActiveItem] = useState('')

  function handleItemClick(name) {
    setActiveItem(name)
  }
  return (

    <Menu vertical>
        <Menu.Item>
          <Menu.Header>Jobs</Menu.Header>

          <Menu.Menu>
          <NavLink to="/create">
            <Menu.Item
                name='create job'
                active={activeItem === 'create job'}
                onClick={handleItemClick}
            />
          </NavLink>
            <NavLink to="/jobs">
              <Menu.Item
                name='View Jobs'
                active={activeItem === 'view jobs'}
                onClick={handleItemClick}
              />
            </NavLink>
            
            <Menu.Item
              name='search Jobs'
              active={activeItem === 'view jobs'}
              onClick={handleItemClick}
            />
          </Menu.Menu>
        </Menu.Item>

        <Menu.Item>
          <Menu.Header>Stock</Menu.Header>

          <Menu.Menu>
            <Menu.Item
              name='view stock'
            />
            <Menu.Item
              name='update stock'
            />
          </Menu.Menu>
        </Menu.Item>

        <Menu.Item>
          <Menu.Header>Account</Menu.Header>
          {user && (
            <p>Signed in as {user.displayName}</p>
          )}
            <Menu.Menu>
              {user ? (
                <Menu.Item 
                  name="logout"
                  onClick={() => firebase.logout()}  
                />
              )
              : (
                <Menu.Item 
                  name="login"
                />

              )
            }
            </Menu.Menu>
        </Menu.Item>
      </Menu>
    
  )
}

export default Header;
