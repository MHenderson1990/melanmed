import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  let { user, logout } = useAuth();
  let navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <nav style={{
      backgroundColor: '#1B4332',
      padding: '0 40px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '70px',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      {/* Logo */}
      <Link to="/" style={{
        color: '#C9A84C',
        fontSize: '24px',
        fontWeight: 'bold',
        textDecoration: 'none',
        fontFamily: 'Georgia, serif'
      }}>
        MelanMed
      </Link>

      {/* Nav Links */}
      <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
        <Link to="/doctors" style={{
          color: 'white',
          textDecoration: 'none',
          fontSize: '16px'
        }}>
          Find a Doctor
        </Link>

        {user ? (
          <>
            <Link to="/dashboard" style={{
              color: 'white',
              textDecoration: 'none',
              fontSize: '16px'
            }}>
              My Dashboard
            </Link>
            <button
              onClick={handleLogout}
              style={{
                backgroundColor: '#C9A84C',
                color: '#1B4332',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '14px'
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{
              color: 'white',
              textDecoration: 'none',
              fontSize: '16px'
            }}>
              Login
            </Link>
            <Link to="/register" style={{
              backgroundColor: '#C9A84C',
              color: '#1B4332',
              padding: '8px 16px',
              borderRadius: '6px',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '14px'
            }}>
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;