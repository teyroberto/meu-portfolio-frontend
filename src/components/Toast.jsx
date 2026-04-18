import { useEffect } from 'react'

export function Toast({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000)
    return () => clearTimeout(timer)
  }, [onClose])

  const bg = type === 'success' ? 'bg-green-600' : 'bg-red-600'

  return (
    <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 ${bg} text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 z-[200] animate-bounce`}>
      <span>{type === 'success' ? '✅' : '❌'}</span>
      <span>{message}</span>
    </div>
  )
}