import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [projetos, setProjetos] = useState([])
  const [titulo, setTitulo] = useState('')
  const [tech, setTech] = useState('')
  const [status, setStatus] = useState('Carregando...')

  const API_URL = "https://meu-portfolio-fullstack.onrender.com"

  // Função para buscar projetos
  const buscarProjetos = () => {
    axios.get(`${API_URL}/projetos`)
      .then(res => {
        setProjetos(res.data)
        setStatus('Conectado ao Backend!')
      })
      .catch(() => setStatus('Erro ao conectar no Render'))
  }

  useEffect(() => {
    buscarProjetos()
  }, [])

  // Função para salvar novo projeto
  const handleSalvar = (e) => {
    e.preventDefault()
    if (!titulo || !tech) return alert("Preencha todos os campos!")

    axios.post(`${API_URL}/projetos`, { titulo, tech })
      .then(() => {
        setTitulo('')
        setTech('')
        buscarProjetos() // Atualiza a lista automaticamente
      })
      .catch(() => alert("Erro ao salvar projeto"))
  }

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: 'auto' }}>
      <h1 style={{ color: '#646cff' }}>🚀 Meu Portfolio Fullstack</h1>
      <p>Status: <span style={{ color: status.includes('Erro') ? 'red' : 'green' }}>{status}</span></p>

      <hr />

      <h3>Adicionar Novo Projeto</h3>
      <form onSubmit={handleSalvar} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input 
          placeholder="Nome do Projeto" 
          value={titulo} 
          onChange={(e) => setTitulo(e.target.value)}
          style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <input 
          placeholder="Tecnologia (ex: React, Python)" 
          value={tech} 
          onChange={(e) => setTech(e.target.value)}
          style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ padding: '10px', cursor: 'pointer', backgroundColor: '#646cff', color: 'white', border: 'none', borderRadius: '5px' }}>
          Salvar no Banco de Dados
        </button>
      </form>

      <hr />

      <h3>Projetos Cadastrados:</h3>
      {projetos.length === 0 ? (
        <p>Nenhum projeto encontrado.</p>
      ) : (
        <div style={{ display: 'grid', gap: '10px' }}>
          {projetos.map(p => (
            <div key={p.id} style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
              <strong>{p.titulo}</strong>
              <p style={{ margin: '5px 0 0', fontSize: '0.9em', color: '#666' }}>🛠️ {p.tech}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App