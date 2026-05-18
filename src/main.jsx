import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles.css'

class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error) {
    console.error('App render failed', error)
  }

  render() {
    if (this.state.error) {
      return (
        <main
          style={{
            minHeight: '100vh',
            display: 'grid',
            placeItems: 'center',
            padding: '32px',
            background: '#f6f4ee',
            color: '#10241c',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          <div
            style={{
              width: 'min(680px, 100%)',
              borderRadius: '24px',
              background: '#ffffff',
              padding: '28px',
              boxShadow: '0 18px 50px rgba(16, 36, 28, 0.12)',
            }}
          >
            <p style={{ margin: 0, fontSize: '0.8rem', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
              Application error
            </p>
            <h1 style={{ margin: '12px 0 10px', fontSize: '1.8rem' }}>The page could not finish loading.</h1>
            <p style={{ margin: 0, lineHeight: 1.6 }}>
              {this.state.error.message}
            </p>
          </div>
        </main>
      )
    }

    return this.props.children
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppErrorBoundary>
      <App />
    </AppErrorBoundary>
  </React.StrictMode>,
)
