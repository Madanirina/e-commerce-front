'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()

    const users = JSON.parse(localStorage.getItem('users') || '[]')

    const userExists = users.some((u: any) => u.email === email)
    if (userExists) {
      setError('Cet email est déjà utilisé.')
      return
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      role: 'vendeur',
    }

    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))

    // Simule une "connexion"
    localStorage.setItem('token', 'fake-token')
    localStorage.setItem('userId', newUser.id)
    localStorage.setItem('role', 'vendeur')

    router.push('/vendeur/dashboard')
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Inscription Vendeur</h2>
      <form onSubmit={handleRegister} className="space-y-4">
        <input
          type="text"
          placeholder="Nom"
          value={name}
          required
          onChange={e => setName(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={e => setEmail(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          required
          onChange={e => setPassword(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button type="submit" className="w-full bg-blue-600 text-white px-4 py-2 rounded">
          S’inscrire
        </button>
      </form>
    </div>
  )
}
