export type CartItem = {
    _id: string
    name: string
    price: number
    quantity: number
  }
  
  const CART_KEY = 'my-cart'
  
  export const getCart = (): CartItem[] => {
    if (typeof window === 'undefined') return []
    const data = localStorage.getItem(CART_KEY)
    return data ? JSON.parse(data) : []
  }
  
  export const saveCart = (cart: CartItem[]) => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart))
  }
  
  export const addToCart = (item: CartItem) => {
    const cart = getCart()
    const existing = cart.find(p => p._id === item._id)
    if (existing) {
      existing.quantity += item.quantity
    } else {
      cart.push(item)
    }
    saveCart(cart)
  }
  
  export const removeFromCart = (id: string) => {
    const cart = getCart().filter(p => p._id !== id)
    saveCart(cart)
  }
  
  export const updateQuantity = (id: string, quantity: number) => {
    const cart = getCart().map(p =>
      p._id === id ? { ...p, quantity } : p
    )
    saveCart(cart)
  }
  