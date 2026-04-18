export function ModalConfirmacao({ isOpen, onClose, onConfirm, mensagem }) {
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[250] flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl w-full max-w-sm shadow-2xl text-center">
        <div className="text-5xl mb-4">⚠️</div>
        <h3 className="text-xl font-bold mb-4">Tem certeza?</h3>
        <p className="text-zinc-400 mb-8">{mensagem}</p>
        <div className="flex gap-4">
          <button onClick={onClose} className="flex-1 bg-zinc-800 py-3 rounded-xl font-semibold">Cancelar</button>
          <button onClick={onConfirm} className="flex-1 bg-red-600 py-3 rounded-xl font-semibold">Excluir</button>
        </div>
      </div>
    </div>
  )
}