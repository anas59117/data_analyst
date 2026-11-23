import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login, register } from '@/services/authService'

export default function LoginPage() {
  const navigate = useNavigate()
  const [isRegister, setIsRegister] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (isRegister) {
        if (!displayName.trim()) {
          setError('Le pseudo est requis')
          setLoading(false)
          return
        }
        await register(email, password, displayName.trim())
      } else {
        await login(email, password)
      }
      navigate('/')
    } catch (err) {
      const code = (err as { code?: string }).code ?? ''
      const errors: Record<string, string> = {
        'auth/email-already-in-use': 'Cet email est déjà utilisé',
        'auth/invalid-credential': 'Email ou mot de passe incorrect',
        'auth/weak-password': 'Mot de passe trop faible (6 caractères min.)',
        'auth/operation-not-allowed': 'Méthode de connexion non activée dans Firebase',
        'auth/invalid-email': 'Email invalide',
        'auth/too-many-requests': 'Trop de tentatives, réessaie plus tard',
      }
      setError(errors[code] ?? `Erreur : ${code || (err as Error).message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '70vh',
      padding: '24px 0',
    }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '2.5rem',
          color: 'var(--accent)',
          letterSpacing: '-0.03em',
        }}>
          Gwin
        </h1>
        <p style={{ color: 'var(--fg-muted)', marginTop: '8px' }}>
          Pronostics Ligue 1
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="card"
        style={{ width: '100%', maxWidth: '400px' }}
      >
        <h2 style={{ fontSize: '1.25rem', marginBottom: '20px' }}>
          {isRegister ? 'Créer un compte' : 'Connexion'}
        </h2>

        {isRegister && (
          <div style={{ marginBottom: '14px' }}>
            <input
              className="input"
              type="text"
              placeholder="Pseudo"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              autoComplete="username"
            />
          </div>
        )}

        <div style={{ marginBottom: '14px' }}>
          <input
            className="input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <input
            className="input"
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete={isRegister ? 'new-password' : 'current-password'}
            required
            minLength={6}
          />
        </div>

        {error && (
          <p style={{
            color: 'var(--danger)',
            fontSize: '0.85rem',
            marginBottom: '14px',
          }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
          style={{ width: '100%', marginBottom: '14px' }}
        >
          {loading ? '...' : isRegister ? "S'inscrire" : 'Se connecter'}
        </button>

        <p style={{
          textAlign: 'center',
          fontSize: '0.85rem',
          color: 'var(--fg-muted)',
        }}>
          {isRegister ? 'Déjà un compte ?' : 'Pas encore de compte ?'}{' '}
          <button
            type="button"
            onClick={() => { setIsRegister(!isRegister); setError('') }}
            style={{
              background: 'none',
              color: 'var(--accent)',
              fontSize: '0.85rem',
              fontWeight: 600,
            }}
          >
            {isRegister ? 'Se connecter' : "S'inscrire"}
          </button>
        </p>
      </form>
    </div>
  )
}
