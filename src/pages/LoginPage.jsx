import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LogoIcon from '../components/LogoIcon'

function SocialButton({ provider, icon, onClick, state }) {
  const isLoading = state === 'loading'
  const isSuccess = state === 'success'

  return (
    <button
      className={`auth-social-button${isLoading ? ' loading' : ''}${isSuccess ? ' success' : ''}`}
      onClick={onClick}
      disabled={isLoading || isSuccess}
    >
      {isLoading ? (
        <>
          <span className="auth-spinner" />
          Connecting to {provider}…
        </>
      ) : isSuccess ? (
        <>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: 'var(--emerald)' }}>
            <path d="M20 6L9 17l-5-5" />
          </svg>
          Connected! Redirecting…
        </>
      ) : (
        <>
          {icon}
          Continue with {provider}
        </>
      )}
    </button>
  )
}

export default function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [googleState, setGoogleState] = useState('idle')
  const [githubState, setGithubState] = useState('idle')
  const [formLoading, setFormLoading] = useState(false)
  const [formSuccess, setFormSuccess] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [forgotSent, setForgotSent] = useState(false)

  const handleSocialLogin = (provider, setState) => {
    setState('loading')
    setTimeout(() => {
      setState('success')
      setTimeout(() => navigate('/dashboard'), 900)
    }, 1600)
  }

  const handleForgotPassword = (e) => {
    e.preventDefault()
    if (!email) { setEmailError('Enter your email first, then click Forgot password'); return }
    setForgotSent(true)
    setTimeout(() => setForgotSent(false), 4000)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    let valid = true
    setEmailError('')
    setPasswordError('')
    if (!email) { setEmailError('Email is required'); valid = false }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setEmailError('Enter a valid email address'); valid = false }
    if (!password) { setPasswordError('Password is required'); valid = false }
    else if (password.length < 6) { setPasswordError('Password must be at least 6 characters'); valid = false }
    if (!valid) return
    setFormLoading(true)
    setTimeout(() => {
      setFormLoading(false)
      setFormSuccess(true)
      setTimeout(() => navigate('/dashboard'), 800)
    }, 1400)
  }

  const googleIcon = (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  )

  const githubIcon = (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )

  return (
    <div className="auth-page">
      <div className="auth-page-bg">
        <div className="auth-page-orb auth-page-orb1" />
        <div className="auth-page-orb auth-page-orb2" />
        <div className="auth-page-grid" />
      </div>

      <div className="auth-box">
        <Link to="/" className="auth-brand">
          <LogoIcon height={52} />
          <span className="auth-brand-name">BaseBox</span>
        </Link>

        <div className="auth-box-inner">
          <h1 className="auth-box-title">Welcome back</h1>
          <p className="auth-box-sub">Sign in to your BaseBox account</p>

          <div className="auth-socials">
            <SocialButton
              provider="Google"
              icon={googleIcon}
              state={googleState}
              onClick={() => handleSocialLogin('Google', setGoogleState)}
            />
            <SocialButton
              provider="GitHub"
              icon={githubIcon}
              state={githubState}
              onClick={() => handleSocialLogin('GitHub', setGithubState)}
            />
          </div>

          <div className="auth-divider">
            <div className="auth-divider-line" />
            <span>or continue with email</span>
            <div className="auth-divider-line" />
          </div>

          <form onSubmit={handleFormSubmit}>
            {forgotSent && (
              <div className="auth-success-banner">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg>
                Reset link sent — check your inbox
              </div>
            )}
            <div className="auth-field">
              <label className="auth-label">Email address</label>
              <input
                type="email"
                className={`auth-input${emailError ? ' auth-input-error' : ''}`}
                placeholder="you@startup.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (emailError) setEmailError('') }}
                disabled={formLoading || formSuccess}
              />
              {emailError && <div className="auth-field-error">{emailError}</div>}
            </div>
            <div className="auth-field">
              <div className="auth-label-row">
                <label className="auth-label">Password</label>
                <button type="button" className="auth-forgot" onClick={handleForgotPassword}>Forgot password?</button>
              </div>
              <div className="auth-input-wrap">
                <input
                  type={showPass ? 'text' : 'password'}
                  className={`auth-input${passwordError ? ' auth-input-error' : ''}`}
                  placeholder="••••••••••"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); if (passwordError) setPasswordError('') }}
                  disabled={formLoading || formSuccess}
                />
                <button type="button" className="auth-eye" onClick={() => setShowPass(!showPass)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {showPass
                      ? <><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" /><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" /><line x1="1" y1="1" x2="23" y2="23" /></>
                      : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></>
                    }
                  </svg>
                </button>
              </div>
              {passwordError && <div className="auth-field-error">{passwordError}</div>}
            </div>

            <button
              type="submit"
              className={`auth-submit-btn${formLoading ? ' loading' : ''}${formSuccess ? ' success' : ''}`}
              disabled={formLoading || formSuccess}
            >
              {formLoading ? (
                <>
                  <span className="auth-spinner auth-spinner-white" />
                  Signing in…
                </>
              ) : formSuccess ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Redirecting to dashboard…
                </>
              ) : (
                <>
                  Sign in to BaseBox
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </>
              )}
            </button>
          </form>

          <div className="auth-footer">
            Don't have an account?{' '}
            <Link to="/signup">Create one — it's free</Link>
          </div>

          <div className="auth-trust">
            <div className="auth-trust-item">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              SOC 2 compliant
            </div>
            <div className="auth-trust-item">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
              256-bit encryption
            </div>
            <div className="auth-trust-item">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              GDPR ready
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
