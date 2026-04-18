import { useState } from 'react'
import emailjs from '@emailjs/browser'

export function Contato({ setToast }) {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ nome: '', email: '', mensagem: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    // IDs do seu painel EmailJS
    const SERVICE_ID = "gmail.com" // Vá em Email Services
    const TEMPLATE_ID = "template_odt4wiy" // Vá em Email Templates
    const PUBLIC_KEY = "M2hVdlOXkafEvd2_8" // Vá em Account > API Keys

    const templateParams = {
      from_name: form.nome,
      reply_to: form.email,
      message: form.mensagem,
    }

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then(() => {
        setToast({ message: "E-mail enviado com sucesso! 🚀", type: "success" })
        setForm({ nome: '', email: '', mensagem: '' })
      })
      .catch((err) => {
        console.error("Erro EmailJS:", err)
        setToast({ message: "Ops! Algo deu errado ao enviar.", type: "error" })
      })
      .finally(() => setLoading(false))
  }

  return (
    <section className="py-12 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-12">
        <h2 className="text-5xl font-bold mb-4">Vamos conversar?</h2>
        <p className="text-zinc-400">Preencha o formulário e eu te responderei direto no seu e-mail.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-zinc-900/50 p-8 rounded-3xl border border-zinc-800 shadow-xl">
        <div>
          <label className="text-xs text-zinc-500 ml-1 mb-2 block uppercase tracking-wider font-bold">Nome</label>
          <input 
            required
            value={form.nome}
            onChange={(e) => setForm({...form, nome: e.target.value})}
            className="w-full bg-zinc-800 rounded-xl p-4 outline-none focus:ring-2 focus:ring-violet-500 transition-all text-white"
            placeholder="Seu nome"
          />
        </div>

        <div>
          <label className="text-xs text-zinc-500 ml-1 mb-2 block uppercase tracking-wider font-bold">E-mail</label>
          <input 
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({...form, email: e.target.value})}
            className="w-full bg-zinc-800 rounded-xl p-4 outline-none focus:ring-2 focus:ring-violet-500 transition-all text-white"
            placeholder="seu@email.com"
          />
        </div>

        <div>
          <label className="text-xs text-zinc-500 ml-1 mb-2 block uppercase tracking-wider font-bold">Mensagem</label>
          <textarea 
            required
            value={form.mensagem}
            onChange={(e) => setForm({...form, mensagem: e.target.value})}
            className="w-full bg-zinc-800 rounded-xl p-4 outline-none focus:ring-2 focus:ring-violet-500 h-40 resize-none transition-all text-white"
            placeholder="Olá Roberto, gostaria de falar sobre..."
          />
        </div>

        <button 
          type="submit"
          disabled={loading}
          className="w-full bg-violet-600 hover:bg-violet-500 py-5 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-lg shadow-violet-900/20"
        >
          {loading ? (
            <div className="w-6 h-6 border-3 border-white/20 border-t-white rounded-full animate-spin" />
          ) : (
            "Enviar Mensagem 🚀"
          )}
        </button>
      </form>
    </section>
  )
}