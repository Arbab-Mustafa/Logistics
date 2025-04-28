
import React, { useEffect, useState } from 'react';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarProvider } from "@/components/ui/sidebar";
import { LayoutDashboard, ArrowLeft, Package, Star, Truck, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';



// Mock product data structure
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  retailPrice: number;
  stock: number;
  imageUrls: string[];
  categories: {id: number; name: string}[];
  supplier: {id: number; name: string};
  reviews: {id: number; rating: number; comment: string; user: {name: string}}[];
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{id: string}>();
  const router = useRouter(); 
 
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  
  useEffect(() => {
    // In a real application, you would fetch the product data from your API
    // For now, we're using mock data
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockProduct: Product = {
        id: parseInt(id || '1'),
        name: "Premium Bluetooth Headphones",
        description: "High-quality wireless headphones with noise cancellation and 20-hour battery life. Perfect for music lovers and professionals alike.",
        price: 79.99,
        retailPrice: 129.99,
        stock: 45,
        imageUrls: [
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
          "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b",
          "https://images.unsplash.com/photo-1546435770-a3e426bf472b"
        ],
        categories: [
          { id: 1, name: "Electronics" },
          { id: 2, name: "Audio" }
        ],
        supplier: {
          id: 1,
          name: "AudioTech Supplies"
        },
        reviews: [
          { id: 1, rating: 5, comment: "These are amazing! Great sound quality.", user: { name: "John D." } },
          { id: 2, rating: 4, comment: "Good battery life, comfortable fit.", user: { name: "Sarah M." } }
        ]
      };
      
      setProduct(mockProduct);
      setLoading(false);
    }, 1000);
  }, [id]);
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };
  
  const handleAddToCart = () => {
    toast.success(`Added ${quantity} ${product?.name} to cart`);
  };
  
  const handleOrderNow = () => {
    toast.success(`Processing order for ${quantity} ${product?.name}`);
    // In a real application, you would navigate to checkout or process the order
  };
  const goBack = () => {
    router.back();
  };
  
  const calculateAverageRating = () => {
    if (!product || !product.reviews.length) return 0;
    
    const sum = product.reviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / product.reviews.length;
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="animate-pulse text-green-500">Loading product details...</div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center text-white">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Product Not Found</h2>
        <p className="mb-4">The product you&apos;re looking for doesn&apos;t exist or has been removed.</p>
        <Button onClick={goBack} className="bg-green-500 hover:bg-green-600">
          Go Back
        </Button>
      </div>
    );
  }
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-[#0A0A0A]">
        {/* Sidebar */}
        <aside className="w-64 bg-[#1A1A1A] p-4 hidden md:block">
          <div className="flex items-center gap-2 mb-8">
            <LayoutDashboard className="h-6 w-6 text-green-500" />
            <h1 className="text-xl font-bold text-white">TJR</h1>
          </div>
          <nav className="space-y-2">
            <Link href="/">
              <Button 
                className="w-full justify-start text-gray-300 hover:text-green-500"
              >
                Dashboard
              </Button>
            </Link>
            <Link href="/products">
              <Button 
                className="w-full justify-start text-green-500"
              >
                Products
              </Button>
            </Link>
            <Link href="/orders">
              <Button 
                className="w-full justify-start text-gray-300 hover:text-green-500"
              >
                Orders
              </Button>
            </Link>
            <Link href="/analytics">
              <Button 
                className="w-full justify-start text-gray-300 hover:text-green-500"
              >
                Analytics
              </Button>
            </Link>
            <Link href="/profile">
              <Button 
                className="w-full justify-start text-gray-300 hover:text-green-500"
              >
                Profile
              </Button>
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <Button className="text-gray-400" onClick={goBack}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h2 className="text-2xl font-bold text-white">Product Details</h2>
            </div>
            <div className="bg-[#1A1A1A] px-3 py-2 rounded-lg flex items-center">
              <Package className="h-4 w-4 mr-2 text-green-500" />
              <span className="text-white">ID: <span className="text-green-500">{product.id}</span></span>
            </div>
          </div>

          {/* Product Content */}
          <div className="bg-[#1A1A1A] rounded-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
              {/* Product Images */}
              <div>
                <div className="aspect-square overflow-hidden rounded-lg mb-4">
                  <img 
                    src={product.imageUrls[activeImage]} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Thumbnails */}
                <div className="flex gap-2">
                  {product.imageUrls.map((img, index) => (
                    <button 
                      key={index} 
                      className={`w-20 h-20 rounded-md overflow-hidden border-2 ${
                        activeImage === index ? 'border-green-500' : 'border-transparent'
                      }`}
                      onClick={() => setActiveImage(index)}
                    >
                      <img src={img} alt={`${product.name} thumbnail ${index+1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div className="text-white">
                <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        className={`h-4 w-4 ${
                          star <= calculateAverageRating() 
                            ? 'text-yellow-400 fill-yellow-400' 
                            : 'text-gray-400'
                        }`} 
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-400">
                    ({product.reviews.length} reviews)
                  </span>
                </div>
                
                <div className="flex items-end gap-3 mb-4">
                  <span className="text-3xl font-bold text-green-500">${product.retailPrice.toFixed(2)}</span>
                  {product.price < product.retailPrice && (
                    <span className="text-lg text-gray-400 line-through">${product.price.toFixed(2)}</span>
                  )}
                </div>
                
                <div className="bg-black/30 p-3 rounded-md mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Availability:</span>
                    <span className={`font-medium ${product.stock > 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-gray-400">Supplier:</span>
                    <span className="font-medium text-white">{product.supplier.name}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-gray-400">Categories:</span>
                    <div className="flex gap-2">
                      {product.categories.map(category => (
                        <span key={category.id} className="bg-green-500/20 text-green-500 px-2 py-1 rounded text-xs">
                          {category.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-300 mb-6">{product.description}</p>
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-24">
                    <label htmlFor="quantity" className="text-sm text-gray-400 block mb-1">Quantity</label>
                    <Input 
                      id="quantity"
                      type="number" 
                      min="1" 
                      value={quantity} 
                      onChange={handleQuantityChange}
                      className="bg-black/30 border-none text-white"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <Button 
                      className="w-full !bg-green-500 hover:bg-green-600 mb-2"
                      onClick={handleAddToCart}
                      disabled={product.stock <= 0}
                    >
                      Add to Cart
                    </Button>
                    <Button 
                   
                      className="w-full border-green-500 text-green-500 hover:bg-green-500/20"
                      onClick={handleOrderNow}
                      disabled={product.stock <= 0}
                    >
                      <Truck className="h-4 w-4 mr-2" />
                      Dropship Now
                    </Button>
                  </div>
                </div>
                
                {product.stock <= 5 && product.stock > 0 && (
                  <div className="bg-yellow-500/20 text-yellow-500 p-3 rounded-md text-sm flex items-center mb-4">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Low stock! Only {product.stock} items left.
                  </div>
                )}
              </div>
            </div>
            
            {/* Reviews Section */}
            <div className="border-t border-gray-800 p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Customer Reviews</h3>
              
              {product.reviews.length > 0 ? (
                <div className="space-y-4">
                  {product.reviews.map(review => (
                    <div key={review.id} className="bg-black/30 p-4 rounded-md">
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star 
                                key={star} 
                                className={`h-3 w-3 ${
                                  star <= review.rating 
                                    ? 'text-yellow-400 fill-yellow-400' 
                                    : 'text-gray-400'
                                }`} 
                              />
                            ))}
                          </div>
                          <span className="text-white font-medium">{review.user.name}</span>
                        </div>
                      </div>
                      <p className="text-gray-300">{review.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400">No reviews yet.</p>
              )}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default ProductDetail;
