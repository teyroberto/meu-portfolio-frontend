import { useState } from 'react'

export function Encurtador({ setToast }) {
  const [urlLonga, setUrlLonga] = useState('')
  const [urlCurta, setUrlCurta] = useState('')
  const [loading, setLoading] = useState(false)

  const handleEncurtar = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Aqui faremos a chamada para o seu Python
      const res = await fetch('http://127.0.0.1:8000/encurtar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url_original: urlLonga })
      })

      if (!res.ok) throw new Error()
      
      const data = await res.json()
      // Simulando que o back retorna um objeto com { link_curto: "http://localhost:8000/r/abc12" }
      setUrlCurta(data.link_curto)
      setToast({ message: "Link encurtado com sucesso!", type: "success" })
    } catch (err) {
      setToast({ message: "Erro ao encurtar link", type: "error" })
    } finally {
      setLoading(false)
    }
  }

  const copiarLink = () => {
    navigator.clipboard.writeText(urlCurta)
    setToast({ message: "Copiado para a área de transferência!", type: "success" })
  }

  return (
    <section className="py-12 max-w-3xl mx-auto animate-in fade-in duration-700">
      <div className="text-center mb-12">
        <h2 className="text-5xl font-bold mb-4">Encurtador de Links 🔗</h2>
        <p className="text-zinc-400">Cole uma URL longa e transforme-a em algo fácil de compartilhar.</p>
      </div>

      <div className="bg-zinc-900/50 p-8 rounded-3xl border border-zinc-800 shadow-2xl">
        <form onSubmit={handleEncurtar} className="space-y-4">
          <div>
            <label className="text-xs text-zinc-500 ml-1 mb-2 block font-bold uppercase">Sua URL Longa</label>
            <input 
              required
              type="url"
              placeholder="https://exemplo.com/muito-longa-mesmo"
              value={urlLonga}
              onChange={(e) => setUrlLonga(e.target.value)}
              className="w-full bg-zinc-800 rounded-xl p-4 outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-white"
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-500 py-4 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <div className="w-6 h-6 border-3 border-white/20 border-t-white rounded-full animate-spin" /> : "Gerar Link Curto"}
          </button>
        </form>

        {urlCurta && (
          <div className="mt-8 p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl animate-in zoom-in-95 duration-300">
            <p className="text-emerald-400 text-sm font-bold mb-2 uppercase">Link pronto!</p>
            <div className="flex gap-2">
              <input 
                readOnly
                value={urlCurta}
                className="flex-1 bg-zinc-950 rounded-lg p-3 text-emerald-300 font-mono outline-none"
              />
              <button 
                onClick={copiarLink}
                className="bg-emerald-600 px-6 rounded-lg font-bold hover:bg-emerald-500 transition-all"
              >
                Copiar
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}