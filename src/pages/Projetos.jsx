import { useState, useEffect } from 'react'
import { ProjetoCard } from '../components/ProjetoCard'
import { ModalProjeto } from '../components/Modais/ModalProjeto'
import { ModalConfirmacao } from '../components/Modais/ModalConfirmacao'
import { SkeletonCard } from '../components/SkeletonCard' // Importando o Skeleton

const API_URL = 'https://meu-portfolio-fullstack.onrender.com'

export function Projetos({ setToast }) {
  const [projetos, setProjetos] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalForm, setModalForm] = useState({ open: false, data: null })
  const [modalDelete, setModalDelete] = useState({ open: false, id: null, titulo: '' })

  const fetchProjetos = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/projetos`)
      if (!res.ok) throw new Error()
      const data = await res.json()
      setProjetos(data)
    } catch (err) {
      setToast({ message: "Erro de conexão com a API", type: "error" })
    } finally {
      // Pequeno delay para o skeleton ser visível (opcional)
      setTimeout(() => setLoading(false), 800) 
    }
  }

  const handleSalvar = async (dados) => {
    const isEdit = !!modalForm.data
    try {
      const res = await fetch(isEdit ? `${API_URL}/projetos/${modalForm.data.id}` : `${API_URL}/projetos`, {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
      })
      if (res.ok) {
        await fetchProjetos()
        setToast({ message: isEdit ? "Atualizado!" : "Criado!", type: "success" })
        setModalForm({ open: false, data: null })
      }
    } catch (err) {
      setToast({ message: "Erro ao salvar", type: "error" })
    }
  }

  const handleDeletar = async () => {
    // Verificação de segurança: se não tiver ID, não faz nada
    if (!modalDelete.id) return;

    try {
      const res = await fetch(`${API_URL}/projetos/${modalDelete.id}`, { 
        method: 'DELETE' 
      });

      if (res.ok) {
        // Atualiza a lista na tela
        await fetchProjetos();
        setToast({ message: "Projeto removido com sucesso!", type: "success" });
      } else {
        throw new Error();
      }
    } catch (err) {
      setToast({ message: "Erro ao excluir projeto", type: "error" });
    } finally {
      // FECHA O MODAL: Isso é o que faz o botão de excluir "terminar" a ação
      setModalDelete({ open: false, id: null, titulo: '' });
    }
  };

  useEffect(() => { fetchProjetos() }, [])

  return (
    <>
      <section className="py-12">
        <div className="flex justify-between items-center mb-16">
          <div>
            <h2 className="text-5xl font-bold mb-2">Meus Projetos</h2>
            <p className="text-zinc-400">Gerencie seu portfólio</p>
          </div>
          <button 
            onClick={() => setModalForm({ open: true, data: null })} 
            className="bg-emerald-600 hover:bg-emerald-500 transition-all px-8 py-4 rounded-2xl font-bold flex items-center gap-2"
          >
            <span>➕</span> Novo Projeto
          </button>
        </div>

        {/* Lógica de Skeleton Loading */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(n => <SkeletonCard key={n} />)}
          </div>
        ) : (
          <>
            {/* Lógica de Empty State (Lista Vazia) */}
            {projetos.length === 0 ? (
              <div className="text-center py-20 bg-zinc-900/30 rounded-3xl border-2 border-dashed border-zinc-800">
                <div className="text-6xl mb-4">📂</div>
                <h3 className="text-xl font-semibold">Nenhum projeto por aqui</h3>
                <p className="text-zinc-500 mt-2">Clique em "Novo Projeto" para começar.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projetos.map(p => (
                  <ProjetoCard 
                    key={p.id} 
                    projeto={p} 
                    onEdit={(proj) => setModalForm({ open: true, data: proj })} 
                    onDelete={(proj) => setModalDelete({ open: true, id: proj.id, titulo: proj.titulo })} 
                  />
                ))}
              </div>
            )}
          </>
        )}
      </section>

      <ModalProjeto 
        isOpen={modalForm.open} 
        onClose={() => setModalForm({ ...modalForm, open: false })} 
        onSave={handleSalvar} 
        projetoInicial={modalForm.data} 
      />

      <ModalConfirmacao 
        isOpen={modalDelete.open} 
        onClose={() => setModalDelete({ ...modalDelete, open: false })} 
        onConfirm={handleDeletar} 
        mensagem={`Excluir "${modalDelete.titulo}"?`} 
      />
    </>
  )
}