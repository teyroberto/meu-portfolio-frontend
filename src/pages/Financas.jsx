import { useState, useEffect } from 'react'

export function Financas({ setToast }) {
  const [transacoes, setTransacoes] = useState([])
  const [resumo, setResumo] = useState({ saldo: 0, entradas: 0, saidas: 0 })
  const [form, setForm] = useState({ descricao: '', valor: '', tipo: 'saida', categoria: 'Outros' })
  const [loading, setLoading] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false) // Alerta customizado

  const carregarDados = async () => {
    try {
      const resResumo = await fetch('http://127.0.0.1:8000/transacoes/resumo')
      const dataResumo = await resResumo.json()
      setResumo(dataResumo)

      const resLista = await fetch('http://127.0.0.1:8000/transacoes')
      const dataLista = await resLista.json()
      setTransacoes(dataLista)
    } catch (err) { console.error(err) }
  }

  useEffect(() => { carregarDados() }, [])

  const handleAddTransacao = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('http://127.0.0.1:8000/transacoes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, valor: parseFloat(form.valor), data: new Date().toLocaleDateString('pt-BR') })
      })
      if (res.ok) {
        setToast({ message: "Lançamento realizado!", type: "success" })
        setForm({ descricao: '', valor: '', tipo: 'saida', categoria: 'Outros' })
        carregarDados()
      }
    } finally { setLoading(false) }
  }

  const handleReset = async () => {
    await fetch('http://127.0.0.1:8000/transacoes/reset', { method: 'DELETE' })
    setToast({ message: "Histórico limpo!", type: "success" })
    setShowConfirm(false)
    carregarDados()
  }

  return (
    <div className="py-10 max-w-6xl mx-auto px-4 animate-in fade-in duration-500">
      
      {/* Resumo no topo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
          <p className="text-zinc-500 text-xs font-bold uppercase">Entradas</p>
          <h3 className="text-2xl font-bold text-emerald-500">R$ {resumo.entradas.toFixed(2)}</h3>
        </div>
        <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
          <p className="text-zinc-500 text-xs font-bold uppercase">Saídas</p>
          <h3 className="text-2xl font-bold text-red-500">R$ {resumo.saidas.toFixed(2)}</h3>
        </div>
        <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
          <p className="text-zinc-500 text-xs font-bold uppercase">Saldo</p>
          <h3 className={`text-2xl font-bold ${resumo.saldo >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            R$ {resumo.saldo.toFixed(2)}
          </h3>
        </div>
      </div>

      {/* Grid Principal: Esquerda (Form) e Direita (Lista) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* LADO ESQUERDO: FORMULÁRIO */}
        <div className="bg-zinc-900/50 p-8 rounded-3xl border border-zinc-800 shadow-xl">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">Novo Lançamento 📝</h3>
          <form onSubmit={handleAddTransacao} className="space-y-4">
            <div>
              <label className="text-[10px] font-bold text-zinc-500 uppercase ml-1">Descrição</label>
              <input 
                required
                className="w-full bg-zinc-800 p-3 rounded-xl mt-1 outline-none focus:ring-2 focus:ring-violet-500 transition-all"
                value={form.descricao}
                onChange={e => setForm({...form, descricao: e.target.value})}
                placeholder="Ex: Aluguel"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold text-zinc-500 uppercase ml-1">Valor (R$)</label>
                <input 
                  required type="number" step="0.01"
                  className="w-full bg-zinc-800 p-3 rounded-xl mt-1 outline-none"
                  value={form.valor}
                  onChange={e => setForm({...form, valor: e.target.value})}
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-zinc-500 uppercase ml-1">Tipo</label>
                <select 
                  className="w-full bg-zinc-800 p-3 rounded-xl mt-1 outline-none"
                  value={form.tipo}
                  onChange={e => setForm({...form, tipo: e.target.value})}
                >
                  <option value="saida">Saída 🔴</option>
                  <option value="entrada">Entrada 🟢</option>
                </select>
              </div>
            </div>
            <button className="w-full bg-violet-600 hover:bg-violet-500 py-4 rounded-2xl font-bold transition-all mt-4">
              {loading ? "Gravando..." : "Confirmar"}
            </button>
          </form>

          {/* NOVO ALERTA DE RESET MELHORADO */}
          <div className="mt-8 pt-6 border-t border-zinc-800/50">
            {!showConfirm ? (
              <button onClick={() => setShowConfirm(true)} className="text-zinc-600 hover:text-red-400 text-[10px] font-bold uppercase transition-all">
                Limpar Histórico 🗑️
              </button>
            ) : (
              <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl flex flex-col items-center gap-3 animate-in zoom-in-95">
                <p className="text-red-400 text-xs font-bold">Tem certeza? Isso apagará tudo.</p>
                <div className="flex gap-4">
                  <button onClick={handleReset} className="bg-red-500 text-white px-4 py-1 rounded-lg text-xs font-bold">Sim, apagar</button>
                  <button onClick={() => setShowConfirm(false)} className="text-zinc-400 text-xs">Cancelar</button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* LADO DIREITO: LISTA */}
        <div className="bg-zinc-900/30 border border-zinc-800 rounded-3xl flex flex-col max-h-[600px]">
          <div className="p-6 border-b border-zinc-800 bg-zinc-900/50 flex justify-between items-center">
            <h3 className="font-bold">Histórico</h3>
            <span className="text-[10px] bg-zinc-800 px-2 py-1 rounded text-zinc-400">{transacoes.length} itens</span>
          </div>
          <div className="overflow-y-auto divide-y divide-zinc-800/50">
            {transacoes.length === 0 ? (
              <p className="p-20 text-center text-zinc-600 text-sm italic">Nenhum registro...</p>
            ) : (
              transacoes.map((t) => (
                <div key={t.id} className="p-4 flex justify-between items-center hover:bg-zinc-800/20">
                  <div>
                    <p className="font-medium text-sm text-zinc-200">{t.descricao}</p>
                    <p className="text-[10px] text-zinc-500">{t.data}</p>
                  </div>
                  <span className={`font-mono font-bold ${t.tipo === 'entrada' ? 'text-emerald-400' : 'text-red-400'}`}>
                    {t.tipo === 'entrada' ? '+' : '-'} R$ {t.valor.toFixed(2)}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  )
}