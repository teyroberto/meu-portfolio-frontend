export function Sobre() {
  const skills = [
    { name: 'React', icon: '⚛️' },
    { name: 'Python', icon: '🐍' },
    { name: 'FastAPI', icon: '⚡' },
    { name: 'Tailwind', icon: '🎨' },
    { name: 'SQLite', icon: '🗄️' },
    { name: 'Git', icon: '🌿' },
  ]

  return (
    <section className="py-12 animate-in fade-in duration-700">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-5xl font-bold mb-6">Sobre Mim</h2>
          <p className="text-zinc-400 text-lg leading-relaxed mb-6">
            Olá! Sou o Roberto, um desenvolvedor focado em criar soluções que unem 
            design elegante e código eficiente. Adoro resolver problemas complexos 
            usando tecnologias modernas.
          </p>
          <div className="grid grid-cols-3 gap-4">
            {skills.map(skill => (
              <div key={skill.name} className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl text-center hover:border-violet-500 transition-colors">
                <div className="text-2xl mb-2">{skill.icon}</div>
                <div className="text-sm font-semibold">{skill.name}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-zinc-900 aspect-square rounded-3xl border border-zinc-800 flex items-center justify-center text-8xl grayscale hover:grayscale-0 transition-all">
          👨‍💻
        </div>
      </div>
    </section>
  )
}