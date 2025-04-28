
import React from 'react';
import { useCart } from '@/contexts/CartContext';
import { Button } from "@/components/ui/button";
import { ShoppingCart, Plus, Minus, X } from 'lucide-react';
import { useRouter } from 'next/router';


const Cart = () => {
  const router = useRouter();
  const { items, removeFromCart, updateQuantity, total, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center p-4">
        <ShoppingCart className="w-16 h-16 text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Your cart is empty</h2>
        <p className="text-gray-400 mb-4">Add some products to your cart and they will appear here</p>
        <Button 
          className="bg-green-500 hover:bg-green-600"
          onClick={() => router.push('/products')}
        >
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Shopping Cart</h1>
          <Button 
           
            className="text-red-500 hover:text-red-600"
            onClick={clearCart}
          >
            Clear Cart
          </Button>
        </div>

        <div className="bg-[#1A1A1A] rounded-lg p-4 mb-6">
          {items.map(item => (
            <div key={item.id} className="flex items-center gap-4 py-4 border-b border-gray-800 last:border-0">
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="text-white font-medium">{item.name}</h3>
                <p className="text-gray-400">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                 
           
                  className="h-8 w-8 border-gray-600"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-white w-8 text-center">{item.quantity}</span>
                <Button
                 
           
                  className="h-8 w-8 border-gray-600"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <Button
                 
            
                  className="h-8 w-8 text-red-500 hover:text-red-600"
                  onClick={() => removeFromCart(item.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#1A1A1A] rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-white">Subtotal</span>
            <span className="text-white font-bold">${total.toFixed(2)}</span>
          </div>
          <Button 
            className="w-full bg-green-500 hover:bg-green-600"
            onClick={() => router.push('/checkout')}
          >
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
