import { Link } from 'react-router-dom';

export function ProjetoCard({ projeto, onDelete, onEdit }) {
  return (
    <div className="bg-zinc-900 rounded-3xl p-8 text-center hover:scale-105 transition-all group relative border border-zinc-800/50">
      <div className="text-6xl mb-6">{projeto.emoji}</div>
      <h3 className="text-2xl font-semibold mb-3">{projeto.titulo}</h3>
      <p className="text-zinc-400 mb-8 text-sm min-h-[60px]">{projeto.descricao}</p>
      
      <div className="inline-block bg-zinc-800 text-xs px-5 py-2 rounded-full mb-6 text-violet-300">{projeto.tech}</div>
      {projeto.titulo === "Encurtador de Links Premium" && (
      <Link 
        to="/encurtador" 
        className="mb-4 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-xl font-bold text-sm transition-all transform hover:scale-105 shadow-lg shadow-emerald-900/20"
      >
        Acessar Ferramenta 🔗
      </Link>
    )}

      {projeto.titulo === "Gestor de Finanças Pessoais" && (
      <Link 
        to="/financas" 
        className="w-full mt-4 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2"
      >
        Abrir Dashboard 💰
      </Link>
    )}

        {projeto.titulo === "Kanban Task Board" && (
        <Link 
          to="/tarefas" 
          className="w-full mt-4 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2"
      >
          Gerenciar Tarefas 📋
        </Link>
      )}
      <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 flex gap-2 transition-opacity">
        <button onClick={() => onEdit(projeto)} className="bg-blue-600 w-9 h-9 rounded-xl flex items-center justify-center">✏️</button>
        <button onClick={() => onDelete(projeto)} className="bg-red-600 w-9 h-9 rounded-xl flex items-center justify-center">🗑️</button>
      </div>
    </div>
  )
}