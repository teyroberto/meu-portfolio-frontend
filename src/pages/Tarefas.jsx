import { useState, useEffect } from 'react'

export function Tarefas({ setToast }) {
  const [tarefas, setTarefas] = useState([])
  const [form, setForm] = useState({ titulo: '', descricao: '', prioridade: 'media' })
  const [loading, setLoading] = useState(false)

  const carregarTarefas = async () => {
    try {
      const res = await fetch('https://meu-portfolio-fullstack.onrender.com/tarefas')
      const data = await res.json()
      setTarefas(data)
    } catch (err) { console.error(err) }
  }

  useEffect(() => { carregarTarefas() }, [])

  const handleAddTarefa = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('https://meu-portfolio-fullstack.onrender.com/tarefas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (res.ok) {
        setToast({ message: "Tarefa anotada!", type: "success" })
        setForm({ titulo: '', descricao: '', prioridade: 'media' })
        carregarTarefas()
      }
    } finally { setLoading(false) }
  }

  const moverTarefa = async (id, novoStatus) => {
    try {
      await fetch(`https://meu-portfolio-fullstack.onrender.com/tarefas/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: novoStatus })
      })
      carregarTarefas()
    } catch (err) { console.error(err) }
  }

  const Coluna = ({ titulo, status, cor }) => (
    <div className="bg-zinc-900/40 border border-zinc-800 p-4 rounded-3xl min-h-[500px] flex flex-col">
      <h3 className={`font-bold mb-4 flex items-center gap-2 ${cor}`}>
        <span className={`w-2 h-2 rounded-full ${cor.replace('text', 'bg')}`}></span>
        {titulo}
      </h3>
      <div className="space-y-3">
        {tarefas.filter(t => t.status === status).map(t => (
          <div key={t.id} className="bg-zinc-800/50 p-4 rounded-2xl border border-zinc-700/50 group">
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-zinc-900 rounded text-zinc-500">
                {t.prioridade}
              </span>
            </div>
            <h4 className="font-bold text-sm mb-1">{t.titulo}</h4>
            <p className="text-xs text-zinc-500 mb-4">{t.descricao}</p>
            
            <div className="flex gap-2 justify-end">
              {status !== 'pendente' && (
                <button onClick={() => moverTarefa(t.id, 'pendente')} className="text-xs p-1 hover:bg-zinc-700 rounded">⬅️</button>
              )}
              {status === 'pendente' && (
                <button onClick={() => moverTarefa(t.id, 'fazendo')} className="text-xs p-1 hover:bg-zinc-700 rounded">➡️</button>
              )}
              {status === 'fazendo' && (
                <button onClick={() => moverTarefa(t.id, 'concluido')} className="text-xs p-1 hover:bg-zinc-700 rounded">✅</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="py-10 max-w-6xl mx-auto px-4">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-bold text-white">Task Board 📋</h2>
        <button onClick={() => document.getElementById('modal-tarefa').showModal()} className="bg-violet-600 hover:bg-violet-500 px-6 py-2 rounded-xl font-bold text-sm transition-all">
          + Nova Tarefa
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Coluna titulo="Pendente" status="pendente" cor="text-amber-500" />
        <Coluna titulo="Fazendo" status="fazendo" cor="text-blue-500" />
        <Coluna titulo="Concluído" status="concluido" cor="text-emerald-500" />
      </div>

      {/* Modal Simples para Criar Tarefa */}
      <dialog id="modal-tarefa" className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl text-white backdrop:bg-black/80">
        <h3 className="text-xl font-bold mb-4">Nova Tarefa</h3>
        <form onSubmit={handleAddTarefa} className="flex flex-col gap-4 w-80">
          <input required placeholder="Título" className="bg-zinc-800 p-3 rounded-xl outline-none" value={form.titulo} onChange={e => setForm({...form, titulo: e.target.value})} />
          <textarea placeholder="Descrição" className="bg-zinc-800 p-3 rounded-xl outline-none" value={form.descricao} onChange={e => setForm({...form, descricao: e.target.value})} />
          <select className="bg-zinc-800 p-3 rounded-xl outline-none" value={form.prioridade} onChange={e => setForm({...form, prioridade: e.target.value})}>
            <option value="baixa">Baixa</option>
            <option value="media">Média</option>
            <option value="alta">Alta</option>
          </select>
          <div className="flex gap-2">
            <button type="submit" className="flex-1 bg-violet-600 p-3 rounded-xl font-bold">Salvar</button>
            <button type="button" onClick={() => document.getElementById('modal-tarefa').close()} className="flex-1 bg-zinc-800 p-3 rounded-xl">Cancelar</button>
          </div>
        </form>
      </dialog>
    </div>
  )
}