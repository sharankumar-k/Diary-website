import { useState } from 'react'
import useAuth from '../context/AuthContext'

function Header({ onOpenLogin, onOpenRegister }) {
  const { user, isAuthenticated, isLoading, logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="brand" href="#home" onClick={closeMenu}>
          PureDairy
        </a>

        <nav
          id="main-navigation"
          className={menuOpen ? 'open' : ''}
          aria-label="Main navigation"
        >
          <a className="active" href="#home" onClick={closeMenu}>
            Home
          </a>
          <a href="#about" onClick={closeMenu}>
            About Us
          </a>
          <a href="#products" onClick={closeMenu}>
            Products
          </a>
          <a href="#quality" onClick={closeMenu}>
            Quality
          </a>
          <a href="#contact" onClick={closeMenu}>
            Contact
          </a>
        </nav>

        <div className="header-actions">
          {!isLoading && !isAuthenticated && (
            <>
              <button type="button" onClick={onOpenLogin}>
                Login
              </button>
              <button type="button" onClick={onOpenRegister}>
                Register
              </button>
            </>
          )}

          {!isLoading && isAuthenticated && (
            <>
              <span className="user-greeting">
                Hi, {user?.name}
              </span>
              <button type="button" onClick={logout}>
                Logout
              </button>
            </>
          )}

          <a className="order-button" href="#products">
            Order Now
          </a>

          <button
            className="menu-button"
            aria-controls="main-navigation"
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={menuOpen}
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header