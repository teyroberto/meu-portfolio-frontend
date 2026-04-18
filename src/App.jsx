import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import { Navbar } from './components/Navbar'
import { Toast } from './components/Toast'
import { Home } from './pages/Home'
import { Projetos } from './pages/Projetos'
import { Contato } from './pages/Contato'
import { Sobre } from './pages/Sobre'
import { Encurtador } from './pages/Encurtador'
import { Financas } from './pages/Financas'
import { Tarefas } from './pages/Tarefas'

function App() {
  const [toast, setToast] = useState(null)

  return (
    <Router>
      
      <div className="bg-zinc-950 text-white min-h-screen">
        <Navbar />
        <div className="max-w-6xl mx-auto px-8 pt-28 pb-20">
          <Routes>
            <Route path="/contato" element={<Contato setToast={setToast} />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/" element={<Home />} />
            <Route path="/projetos" element={<Projetos setToast={setToast} />} />
            <Route path="/encurtador" element={<Encurtador setToast={setToast} />} />
            <Route path="/financas" element={<Financas setToast={setToast} />} />
            <Route path="/tarefas" element={<Tarefas setToast={setToast} />} />.
          </Routes>
        </div>
        
        {toast && (
          <Toast 
            message={toast.message} 
            type={toast.type} 
            onClose={() => setToast(null)} 
          />
        )}
      </div>
    </Router>
  )
}

export default App