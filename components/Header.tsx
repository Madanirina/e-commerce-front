// components/Header.tsx
'use client'

import Link from 'next/link'
import { useCart } from '@/context/CartContext'

export const Header = () => {
  const { cart } = useCart()
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center sticky top-0 z-10">
      <Link href="/" className="text-xl font-bold text-blue-600">
        🛍️ E-Commerce
      </Link>

      <nav className="space-x-4">
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
        <Link href="/login" className="text-gray-700 hover:text-blue-500">
          🔐 Se connecter
        </Link>
      </nav>
    </header>
  )
}
