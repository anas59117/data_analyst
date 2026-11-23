import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { logout } from '@/services/authService'

const navItems = [
  { to: '/', label: 'Accueil', icon: '⚽' },
  { to: '/grille', label: 'Grille', icon: '📋' },
  { to: '/classement', label: 'Classement', icon: '🏆' },
  { to: '/profil', label: 'Profil', icon: '👤' },
]

export default function Layout() {
  const { user } = useAuth()

  return (
    <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
      <header style={{
        background: 'var(--bg-card)',
        borderBottom: '1px solid var(--border)',
        padding: '12px 0',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}>
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <NavLink to="/" style={{ textDecoration: 'none' }}>
            <span style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.5rem',
              fontWeight: 700,
              color: 'var(--accent)',
              letterSpacing: '-0.02em',
            }}>
              Gwin
            </span>
          </NavLink>

          {user && (
            <nav style={{ display: 'flex', gap: '4px' }}>
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  style={({ isActive }) => ({
                    padding: '8px 14px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    color: isActive ? 'var(--accent)' : 'var(--fg-muted)',
                    background: isActive ? 'var(--bg-input)' : 'transparent',
                    textDecoration: 'none',
                    transition: 'color 0.15s, background 0.15s',
                  })}
                >
                  <span style={{ marginRight: '6px' }}>{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                </NavLink>
              ))}
            </nav>
          )}

          {user && (
            <button
              onClick={logout}
              style={{
                padding: '8px 14px',
                background: 'transparent',
                color: 'var(--fg-muted)',
                fontSize: '0.85rem',
              }}
            >
              Quitter
            </button>
          )}
        </div>
      </header>

      <main style={{ flex: 1, padding: '24px 0' }}>
        <div className="container">
          <Outlet />
        </div>
      </main>

      <footer style={{
        borderTop: '1px solid var(--border)',
        padding: '16px 0',
        textAlign: 'center',
        color: 'var(--fg-muted)',
        fontSize: '0.8rem',
      }}>
        Gwin — Pronostics Ligue 1
      </footer>
    </div>
  )
}
