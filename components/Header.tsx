'use client'

import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { useEffect, useState } from 'react'
import router from 'next/router'

export const Header = () => {
  const { cart } = useCart()
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')
    setIsLoggedIn(!!token)

    if (user) {
      try {
        const parsed = JSON.parse(user)
        setUserName(parsed.name || '')
      } catch (err) {
        console.error('Erreur lors du parsing de user')
      }
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setIsLoggedIn(false)
    router.push('/')
  }

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center sticky top-0 z-10">
      <Link href="/" className="text-xl font-bold text-blue-600">
        🛍️ E-Marketou
      </Link>

      <nav className="space-x-4 flex items-center">
        <Link href="/" className="text-gray-700 hover:underline">
          Accueil
        </Link>

        <Link href="/panier" className="text-gray-700 hover:underline relative">
          Panier
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 rounded-full">
              {totalItems}
            </span>
          )}
        </Link>

        {!isLoggedIn ? (
          <>
            <Link href="/login" className="text-gray-700 hover:text-blue-500">
              🔐 Se connecter
            </Link>
            <Link href="/register" className="text-gray-700 hover:text-blue-500">
              📝 S’inscrire
            </Link>
          </>
        ) : (
          <>
            {userName && (
              <span className="text-gray-600">👤 {userName}</span>
            )}
            <button
              onClick={handleLogout}
              className="text-red-600 hover:underline"
            >
              🔓 Déconnexion
            </button>
          </>
        )}
      </nav>
    </header>
  )
}
