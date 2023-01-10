import { Link, useHistory } from 'react-router-dom';

import { deleteToken } from '../utils/token';

import Button from './Button';

import './styles/NavBar.css';

const NavBar = () => {
  const history = useHistory();

  const marginRight = {
    marginRight: '10px',
  };

  const logoutStye = {
    marginRight: '10px',
    backgroundColor: '#E01E37',
  };

  function logout() {
    deleteToken();
    history.push('/login');
  }

  return (
    <>
      <div id='appbar'>
        <div className='center'>
          <span id='logo'>
            <b>Pantau</b>
          </span>

          <span className='float-right'>
            <Link to='live'>
              <Button text='Live' style={marginRight} />
            </Link>
            <Link to='playback'>
              <Button text='Playback' style={marginRight} />
            </Link>
            <Link to='event'>
              <Button text='Event' style={marginRight} />
            </Link>
            <Button text='Logout' style={logoutStye} onClick={logout} />
          </span>
        </div>
      </div>
    </>
  );
};

export default NavBar;
