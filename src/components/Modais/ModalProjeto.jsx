import { useState, useEffect } from 'react'

export function ModalProjeto({ isOpen, onClose, onSave, projetoInicial = null }) {
  const [formData, setFormData] = useState({ titulo: '', descricao: '', tech: '', emoji: '🚀' })
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (projetoInicial) setFormData(projetoInicial)
    else setFormData({ titulo: '', descricao: '', tech: '', emoji: '🚀' })
    setIsSaving(false) // Reseta o loading ao abrir/fechar
  }, [projetoInicial, isOpen])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSaving(true)
    await onSave(formData)
    setIsSaving(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 w-screen h-screen z-[9999] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onClose} />

      <div className="relative bg-zinc-900 border border-zinc-800 p-8 rounded-3xl w-full max-w-md shadow-2xl mx-4">
        <h2 className="text-3xl font-bold mb-6 text-violet-400">
          {projetoInicial ? 'Editar Projeto' : 'Novo Projeto'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
  <div className="flex gap-3">
    {/* Campo de Emoji */}
    <div className="w-24">
      <label className="text-xs text-zinc-500 mb-1 block ml-1">Ícone</label>
      <input 
        placeholder="🚀"
        value={formData.emoji} 
        className="w-full bg-zinc-800 rounded-xl p-4 text-center text-2xl outline-none focus:ring-2 focus:ring-violet-500" 
        onChange={(e) => setFormData({...formData, emoji: e.target.value})} 
        maxLength="2" // Limita para não virar um texto
      />
    </div>

    {/* Campo de Título */}
    <div className="flex-1">
      <label className="text-xs text-zinc-500 mb-1 block ml-1">Título do Projeto</label>
      <input 
        placeholder="Nome do projeto"
        value={formData.titulo} 
        className="w-full bg-zinc-800 rounded-xl p-4 outline-none focus:ring-2 focus:ring-violet-500" 
        onChange={(e) => setFormData({...formData, titulo: e.target.value})} 
        required 
      />
    </div>
  </div>
          <textarea 
            placeholder="Descrição"
            value={formData.descricao} 
            className="w-full bg-zinc-800 rounded-xl p-4 outline-none focus:ring-2 focus:ring-violet-500 h-28 resize-none" 
            onChange={(e) => setFormData({...formData, descricao: e.target.value})} 
          />
          <input 
            placeholder="Tecnologias (ex: React, Python)"
            value={formData.tech} 
            className="w-full bg-zinc-800 rounded-xl p-4 outline-none focus:ring-2 focus:ring-violet-500" 
            onChange={(e) => setFormData({...formData, tech: e.target.value})} 
          />

          <div className="flex gap-4 pt-4">
            <button type="button" onClick={onClose} className="flex-1 bg-zinc-800 py-4 rounded-2xl font-semibold">
              Cancelar
            </button>
            <button 
              type="submit" 
              disabled={isSaving}
              className="flex-1 bg-violet-600 py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSaving ? (
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}