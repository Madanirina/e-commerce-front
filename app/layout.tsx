import './globals.css'
import { Header } from '@/components/Header'
import type { Metadata } from 'next'
import { CartProvider } from '@/context/CartContext'

export const metadata: Metadata = {
  title: 'E-marketou',
  description: 'A simple e-commerce site',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-gray-100">
        <CartProvider>
          <Header />
          <main className="max-w-6xl mx-auto p-4">{children}</main>
        </CartProvider>
      </body>
    </html>
  )
}