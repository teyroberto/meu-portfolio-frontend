import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [projetos, setProjetos] = useState([])
  const [status, setStatus] = useState('Carregando...')

  // O LINK DO SEU BACKEND NO RENDER
  const API_URL = "https://meu-portfolio-fullstack.onrender.com"

  useEffect(() => {
    axios.get(`${API_URL}/projetos`)
      .then(res => {
        setProjetos(res.data)
        setStatus('Conectado ao Backend!')
      })
      .catch(err => {
        console.error(err)
        setStatus('Erro ao conectar no Render')
      })
  }, [])

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Meu Novo Frontend</h1>
      <p>Status: <strong>{status}</strong></p>
      
      <h2>Projetos do Banco de Dados:</h2>
      {projetos.length === 0 ? (
        <p>Nenhum projeto encontrado (Banco vazio).</p>
      ) : (
        <ul>
          {projetos.map(p => (
            <li key={p.id}>{p.titulo} - {p.tech}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default App