import { useState, useEffect, useRef } from 'react'
import useAuth from '../context/AuthContext'

function LoginModal({ isOpen, onClose, onSwitchToRegister }) {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const emailRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      const original = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = original
      }
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen && emailRef.current) {
      emailRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const handler = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      setError('Email and password are required.')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please provide a valid email address.')
      return
    }

    setError('')
    setIsLoading(true)

    try {
      await login(email, password)
      setEmail('')
      setPassword('')
      onClose()
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <style>{`
        .auth-modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(17, 17, 17, 0.5);
          padding: 20px;
        }
        .auth-modal-card {
          position: relative;
          background: #fff;
          border-radius: 24px;
          padding: 40px;
          width: 100%;
          max-width: 420px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
        }
        .auth-modal-close {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 32px;
          height: 32px;
          display: grid;
          place-items: center;
          border: 0;
          border-radius: 50%;
          background: transparent;
          color: var(--muted);
          font-size: 24px;
          line-height: 1;
          cursor: pointer;
        }
        .auth-modal-close:hover {
          background: var(--cream);
          color: var(--ink);
        }
        .auth-modal-title {
          margin: 0 0 8px;
          font: 700 28px/1.2 'Playfair Display', Georgia, serif;
          color: var(--ink);
        }
        .auth-modal-subtitle {
          margin: 0 0 24px;
          color: var(--muted);
          font-size: 15px;
          line-height: 1.6;
        }
        .auth-form {
          display: grid;
          gap: 16px;
          margin-top: 16px;
        }
        .auth-form label {
          font-size: 13px;
          font-weight: 700;
          color: var(--muted);
        }
        .auth-form input {
          width: 100%;
          padding: 12px;
          border: 1px solid var(--line);
          border-radius: 10px;
          outline: 0;
          background: #fff;
        }
        .auth-form input:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 2px #0f523833;
        }
        .auth-form input:disabled {
          background: var(--cream);
        }
        .auth-submit {
          margin-top: 4px;
          padding: 14px;
          border: 0;
          border-radius: 10px;
          background: var(--primary);
          color: #fff;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
        }
        .auth-submit:hover {
          background: #2d6a4f;
          color: var(--green);
        }
        .auth-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .auth-modal-switch {
          margin: 20px 0 0;
          font-size: 14px;
          color: var(--muted);
          text-align: center;
        }
        .auth-text-link {
          background: none;
          border: 0;
          color: var(--primary);
          font: inherit;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        .auth-text-link:hover {
          color: #2d6a4f;
        }
        @media (max-width: 767px) {
          .auth-modal-card {
            padding: 28px;
          }
        }
      `}</style>

      <div
        className="auth-modal-overlay"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-title"
      >
        <div
          className="auth-modal-card"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            className="auth-modal-close"
            onClick={onClose}
            aria-label="Close"
          >
            &times;
          </button>

          <h2 id="login-title" className="auth-modal-title">
            Sign In
          </h2>
          <p className="auth-modal-subtitle">
            Welcome back. Enter your details to continue.
          </p>

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <label htmlFor="login-email">Email address</label>
            <input
              id="login-email"
              ref={emailRef}
              type="email"
              autoComplete="email"
              required
              disabled={isLoading}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setError('')
              }}
            />

            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              autoComplete="current-password"
              required
              disabled={isLoading}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError('')
              }}
            />

            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}

            <button type="submit" className="auth-submit" disabled={isLoading}>
              {isLoading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          <p className="auth-modal-switch">
            Don't have an account?{' '}
            <button
              type="button"
              className="auth-text-link"
              onClick={onSwitchToRegister}
            >
              Create an account
            </button>
          </p>
        </div>
      </div>
    </>
  )
}

export default LoginModal
