import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShoppingCart, Eye } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

export interface Product {
  additionalImages: string[] | null;
  description: React.ReactNode;
  id: number;
  name: string;
  price: number;
  stock: number;
  sales: number;
  image: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
  viewType: 'grid' | 'list';
  onOrder: (productId: number) => void;
  onQuickView?: (productId: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, viewType, onQuickView }) => {
 
  const { addToCart } = useCart();
  
  const handleAddToCart = () => {
    addToCart(product);
  };
  const handleViewDetails = () => {
    if (onQuickView) {
      onQuickView(product.id);
    } else {
      window.location.href = `/profile/product/${product.id}`;
    }
  };
  
  return (
    <Card className={`bg-[#1A1A1A] border-none overflow-hidden hover:ring-1 hover:ring-green-500/50 transition-all ${
      viewType === 'list' ? 'flex' : ''
    }`}>
      <div className={`${viewType === 'list' ? 'w-48' : 'w-full'}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-4 flex-1">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-white">{product.name}</h3>
          <span className="text-green-500 font-bold">${product.price.toFixed(2)}</span>
        </div>
        <p className="text-gray-400 text-sm mb-4">{product.category}</p>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-black/30 p-2 rounded">
            <p className="text-xs text-gray-400">Stock</p>
            <p className="text-white font-semibold">{product.stock}</p>
          </div>
          <div className="bg-black/30 p-2 rounded">
            <p className="text-xs text-gray-400">Sales</p>
            <p className="text-white font-semibold">{product.sales}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button className="flex-1 !bg-green-500 hover:bg-green-600" onClick={handleAddToCart}>
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
          <Button  className="border-green-500 text-green-500 hover:bg-green-500/20" onClick={handleViewDetails}>
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
