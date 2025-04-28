
import React from 'react';
import { useCart } from '@/contexts/CartContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from 'sonner';

const Checkout = () => {
  const { items, total } = useCart();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.error("Stripe integration not configured. Please add your Stripe secret key.");
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">Checkout</h1>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="bg-[#1A1A1A] rounded-lg p-4">
              <h2 className="text-lg font-semibold text-white mb-4">Shipping Information</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" className="bg-black/30 border-none text-white" required />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" className="bg-black/30 border-none text-white" required />
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" className="bg-black/30 border-none text-white" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" className="bg-black/30 border-none text-white" required />
                  </div>
                  <div>
                    <Label htmlFor="postal">Postal Code</Label>
                    <Input id="postal" className="bg-black/30 border-none text-white" required />
                  </div>
                </div>
                <Button type="submit" className="w-full bg-green-500 hover:bg-green-600">
                  Pay ${total.toFixed(2)}
                </Button>
              </form>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[#1A1A1A] rounded-lg p-4">
              <h2 className="text-lg font-semibold text-white mb-4">Order Summary</h2>
              {items.map(item => (
                <div key={item.id} className="flex justify-between py-2 border-b border-gray-800 last:border-0">
                  <div className="flex items-center gap-2">
                    <span className="text-white">{item.quantity}x</span>
                    <span className="text-white">{item.name}</span>
                  </div>
                  <span className="text-white">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="mt-4 pt-4 border-t border-gray-800">
                <div className="flex justify-between">
                  <span className="text-white">Total</span>
                  <span className="text-white font-bold">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
