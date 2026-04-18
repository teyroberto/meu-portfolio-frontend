import { Link, useLocation } from 'react-router-dom'

export function Navbar() {
  const location = useLocation()
  
  return (
    <nav className="fixed top-0 w-full bg-zinc-900/90 backdrop-blur-lg z-50 border-b border-zinc-800">
      <div className="max-w-6xl mx-auto px-8 py-5 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-violet-400">Roberto.dev</h1>
        <div className="flex space-x-8 text-lg">
          <Link to="/" className={`hover:text-violet-400 transition-colors ${location.pathname === '/' ? 'text-violet-400 font-semibold' : ''}`}>Home</Link>
          <Link to="/sobre" className={`hover:text-violet-400 transition-colors ${location.pathname === '/sobre' ? 'text-violet-400 font-semibold' : ''}`}>Sobre</Link>
          <Link to="/projetos" className={`hover:text-violet-400 transition-colors ${location.pathname === '/projetos' ? 'text-violet-400 font-semibold' : ''}`}>Projetos</Link>
          <Link to="/contato" className={`hover:text-violet-400 transition-colors ${location.pathname === '/contato' ? 'text-violet-400 font-semibold' : ''}`}>Contato</Link>
          
        </div>
      </div>
    </nav>
  )
}