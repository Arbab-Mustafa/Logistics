"use client"

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import DOMPurify from 'dompurify';
import Image from 'next/image';
import { WHATSAPP_NUMBER } from '@/constants/constants';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ProductCard } from '@/components/ProductCard';
import {  Grid2x2, List, Filter, Search, User, CreditCard } from 'lucide-react';
import { toast } from 'sonner';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import Link from 'next/link';
import { fetchInventory, InventoryFilterParams, NormalizedProduct } from '@/lib/api/inventoryApi';
// Add this import for the dialog component
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
const MAX_PRODUCTS = 10000;
const SEARCH_CHARGE = 2;
const ITEMS_PER_PAGE = 9; // Changed from 12 to 9
// WhatsApp phone number is imported from constants

export default function Dashboard() {
    const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);
    const [credits, setCredits] = useState(100);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
    const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'name-asc' | 'sales-desc'>('price-asc');
    // New state for quick view modal
    const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    
    const router = useRouter();
     interface Product {
        additionalImages: string[] | null;
        description: string;
        id: number;
        name: string;
        price: number;
        stock: number;
        sales: number;
        image: string | null;
        category: string | null;
      }
      const fetchMoreProducts = async () => {
        if (totalProducts >= MAX_PRODUCTS) return;
        
        setIsLoading(true);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Add more products (between 30-50 more)
        const newProducts = Math.floor(Math.random() * 20) + 30;
        const updatedTotal = Math.min(totalProducts + newProducts, MAX_PRODUCTS);
        
        setTotalProducts(updatedTotal);
        setIsLoading(false);
      };
    // Fetch products from API
    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            try {
                const params: InventoryFilterParams = {
                    page: currentPage,
                    limit: ITEMS_PER_PAGE,
                    search: debouncedSearchTerm,
                    category: selectedCategory !== 'all' ? selectedCategory : undefined,
                    sortBy: sortBy,
                    minPrice: priceRange[0],
                    maxPrice: priceRange[1]
                };

                const response = await fetchInventory(params);
                
                setProducts(
                    response.products.map((product): NormalizedProduct => ({
                      ...product,
                      name: product.name || 'Unnamed Product',
                      image: product.image || '/placeholder-product.png',
                      category: product.category || 'Uncategorized',
                      description: product.description || 'No description available',
                      stock: product.stock ?? 0, // handles both null and undefined
                      additionalImages: Array.isArray(product.additionalImages)
                        ? product.additionalImages
                        : [],
                    }))
                  );
                  
                setTotalPages(response.totalPages);
                setTotalProducts(response.total);
            } catch (error) {
                console.error('Error fetching products:', error);
                toast.error('Failed to load products');
                setProducts([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, [debouncedSearchTerm, selectedCategory, currentPage, priceRange, sortBy]);

    // Debounce search term to avoid excessive API calls
    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchTerm !== debouncedSearchTerm) {
                // Apply search charge if terms are different
                if (searchTerm && searchTerm !== '') {
                    setCredits(prev => {
                        const newCredits = prev - SEARCH_CHARGE;
                        if (newCredits < 0) {
                            toast.error("Insufficient credits for search");
                            return prev;
                        }
                        toast.success(`Search charge: ${SEARCH_CHARGE} credits`);
                        return newCredits;
                    });
                }
                setDebouncedSearchTerm(searchTerm);
                setCurrentPage(1); // Reset to first page when search changes
            }
        }, 500);
        
        return () => clearTimeout(timer);
    }, [searchTerm, debouncedSearchTerm]);
    
    const handleOrder = useCallback((productId: number) => {
        const product = products.find(p => p.id === productId);
        if (product) {
            toast.success(`Ordered: ${product.name}`);
        }
    }, [products]);
    
    // New function to handle quick view
    const handleQuickView = useCallback((productId: number) => {
        const product = products.find(p => p.id === productId);
        if (product) {
            setSelectedProduct(product);
            setIsQuickViewOpen(true);
        }
    }, [products]);
    
    // Function to redirect to WhatsApp with product info
    const redirectToWhatsApp = useCallback((product: Product) => {
        const message = encodeURIComponent(
            `I want to order:\n*${product.name}*\nPrice: $${product.price}`
        );
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
    }, []);
    
    const handlePriceRangeChange = (value: string, index: number) => {
        const newValue = parseInt(value);
        if (!isNaN(newValue)) {
            const newRange = [...priceRange] as [number, number];
            newRange[index] = newValue;
            setPriceRange(newRange);
        }
    };
    
    const goToProfile = () => {
        router.push('/dashboard/profile');
    };
    
    return (
        <SidebarProvider>
            <div className="min-h-screen flex w-full bg-[#0A0A0A]">
                {/* Sidebar */}
                <aside className="w-64 bg-[#1A1A1A] p-4 hidden md:block">
                    <div className="flex items-center gap-2 mb-8">
                        <Image src={"/logo.jpg"} height={50} width={50} alt='text' className="h-6 w-6 text-green-500" />
                        <h1 className="text-xl font-bold text-white">TJR</h1>
                    </div>
                    <nav className="space-y-2">
                        <Link href="/dashboard" className="flex w-full items-center px-3 py-2 text-green-500 hover:bg-green-500/10 rounded-md">
                            Dashboard
                        </Link>
                    
                        <Link href="/dashboard/orders" className="flex w-full items-center px-3 py-2 text-gray-300 hover:text-green-500 hover:bg-green-500/10 rounded-md">
                            Orders
                        </Link>
                        <Link href="/dashboard/analytics" className="flex w-full items-center px-3 py-2 text-gray-300 hover:text-green-500 hover:bg-green-500/10 rounded-md">
                            Analytics
                        </Link>
                        <Link href="/dashboard/profile" className="flex w-full items-center px-3 py-2 text-gray-300 hover:text-green-500 hover:bg-green-500/10 rounded-md">
                            Profile
                        </Link>
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-6">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                        <h2 className="text-2xl font-bold text-white">Products</h2>
                        <div className="flex items-center gap-4">
                            <div className="bg-[#1A1A1A] px-3 py-2 rounded-lg flex items-center text-green-500">
                                <CreditCard className="h-4 w-4 mr-2" />
                                <span className="font-semibold">{credits} Credits</span>
                            </div>
                            <Button 
                                className="border-green-500 text-green-500 hover:bg-green-500/20"
                                onClick={goToProfile}
                            >
                                <User className="h-4 w-4 mr-2" />
                                Profile
                            </Button>
                            <div className="flex items-center bg-[#1A1A1A] rounded-lg">
                                <Button
                                    className={`${viewType === 'grid' ? 'text-green-500' : 'text-gray-400'}`}
                                    onClick={() => setViewType('grid')}
                                >
                                    <Grid2x2 className="h-5 w-5" />
                                </Button>
                                <Button
                                    className={`${viewType === 'list' ? 'text-green-500' : 'text-gray-400'}`}
                                    onClick={() => setViewType('list')}
                                >
                                    <List className="h-5 w-5" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="bg-[#1A1A1A] p-4 rounded-lg mb-6">
                        <h3 className="text-white font-semibold mb-4">Filters</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                <Input
                                    placeholder="Search products..."
                                    className="pl-10 bg-black/30 border-none text-white"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                {searchTerm && (
                                    <div className="text-xs text-gray-400 mt-1">
                                        Search cost: {SEARCH_CHARGE} credits
                                    </div>
                                )}
                            </div>
                            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                <SelectTrigger className="bg-black/30 border-none text-white">
                                    <SelectValue placeholder="Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Categories</SelectItem>
                                    <SelectItem value="electronics">Electronics</SelectItem>
                                    <SelectItem value="clothing">Clothing</SelectItem>
                                    <SelectItem value="accessories">Accessories</SelectItem>
                                    <SelectItem value="home & kitchen">Home & Kitchen</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select 
                                value={sortBy} 
                                onValueChange={(value: 'price-asc' | 'price-desc' | 'name-asc' | 'sales-desc') => setSortBy(value)}
                            >
                                <SelectTrigger className="bg-black/30 border-none text-white">
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                                    <SelectItem value="name-asc">Name: A to Z</SelectItem>
                                    <SelectItem value="sales-desc">Bestselling</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm text-gray-400 block mb-2">Price Range</label>
                                <div className="flex items-center gap-2">
                                    <Input
                                        type="number"
                                        className="bg-black/30 border-none text-white"
                                        placeholder="Min"
                                        value={priceRange[0]}
                                        onChange={(e) => handlePriceRangeChange(e.target.value, 0)}
                                    />
                                    <span className="text-gray-400">to</span>
                                    <Input
                                        type="number"
                                        className="bg-black/30 border-none text-white"
                                        placeholder="Max"
                                        value={priceRange[1]}
                                        onChange={(e) => handlePriceRangeChange(e.target.value, 1)}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end items-end">
                                <Button className="bg-[#1A1A1A] text-white border-green-500 hover:bg-green-500/20">
                                    <Filter className="h-4 w-4 mr-2" />
                                    Apply Filters
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Products Grid/List */}
                    {isLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <div key={index} className="bg-[#1A1A1A] h-80 rounded-lg animate-pulse"></div>
                            ))}
                        </div>
                    ) : products.length > 0 ? (
                        <div className={`grid ${viewType === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
                            {products.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={{
                                        ...product,
                                        image: product.image ?? '/placeholder-product.png',
                                        category: product.category ?? 'Uncategorized'
                                    }}
                                    viewType={viewType}
                                    onOrder={handleOrder}
                                   onQuickView ={handleQuickView} // Add this prop
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-gray-400">No products found matching your criteria</p>
                        </div>
                    )}

                    {/* Pagination */}
                    <>
  {totalPages > 1 && (
    <div className="flex flex-col md:flex-row items-center justify-between mt-8 gap-4">
      <span className="text-gray-400 text-sm font-medium">
        Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}
        -
        {Math.min(currentPage * ITEMS_PER_PAGE, totalProducts)}
        {" "}of {isLoading ? "..." : totalProducts} products
      </span>
      <div className="flex items-center gap-3">
        {isLoading && (
          <div className="flex items-center gap-1.5 mr-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse delay-150"></div>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse delay-300"></div>
          </div>
        )}
        <Pagination>
          <PaginationContent className="flex flex-row items-center gap-3">
            <PaginationItem>
              <PaginationPrevious
                href="#"
                size="default"
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault();
                  if (currentPage > 1) setCurrentPage(currentPage - 1);
                }}
                className={`bg-[#1A1A1A] text-white hover:bg-green-500/20 hover:scale-105 rounded-full transition-all duration-300 shadow-md ${
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }`}
              />
            </PaginationItem>
            {(() => {
              // Show first, last, current, and neighbors
              const pages = [];
              const start = Math.max(1, currentPage - 2);
              const end = Math.min(totalPages, currentPage + 2);

              if (start > 1) {
                pages.push(
                  <PaginationItem key={1}>
                    <PaginationLink
                      href="#"
                      size="default"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(1);
                      }}
                      className="bg-[#1A1A1A] text-white hover:bg-green-500/20 hover:scale-105 rounded-full shadow-md transition-all duration-300"
                      isActive={currentPage === 1}
                    >
                      1
                    </PaginationLink>
                  </PaginationItem>
                );
                if (start > 2) {
                  pages.push(
                    <PaginationItem key="start-ellipsis">
                      <span className="flex h-9 w-9 items-center justify-center text-gray-400">...</span>
                    </PaginationItem>
                  );
                }
              }

              for (let i = start; i <= end; i++) {
                pages.push(
                  <PaginationItem key={i}>
                    <PaginationLink
                      href="#"
                      size="default"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(i);
                      }}
                      className={`bg-[#1A1A1A] text-white hover:bg-green-500/20 hover:scale-105 rounded-full transition-all duration-300 shadow-md ${
                        currentPage === i ? "border-2 border-green-500 font-bold ring-2 ring-green-500/30 ring-offset-1 ring-offset-gray-900" : ""
                      }`}
                      isActive={currentPage === i}
                    >
                      {i}
                    </PaginationLink>
                  </PaginationItem>
                );
              }

              if (end < totalPages) {
                if (end < totalPages - 1) {
                  pages.push(
                    <PaginationItem key="end-ellipsis">
                      <span className="flex h-9 w-9 items-center justify-center text-gray-400">...</span>
                    </PaginationItem>
                  );
                }
                pages.push(
                  <PaginationItem key={totalPages}>
                    <PaginationLink
                      href="#"
                      size="default"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(totalPages);
                      }}
                      className="bg-[#1A1A1A] text-white hover:bg-green-500/20 hover:scale-105 rounded-full shadow-md transition-all duration-300"
                      isActive={currentPage === totalPages}
                    >
                      {totalPages}
                    </PaginationLink>
                  </PaginationItem>
                );
              }
              return pages;
            })()}
            <PaginationItem>
              <PaginationNext
                href="#"
                size="default"
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault();
                  if (currentPage < totalPages) {
                    setCurrentPage(currentPage + 1);
                    // If approaching the end, trigger loading more products
                    if (currentPage >= totalPages - 3 && totalProducts < MAX_PRODUCTS) {
                      fetchMoreProducts();
                    }
                  }
                }}
                className={`bg-[#1A1A1A] text-white hover:bg-green-500/20 hover:scale-105 rounded-full transition-all duration-300 shadow-md ${
                  currentPage === totalPages && totalProducts >= MAX_PRODUCTS 
                    ? "pointer-events-none opacity-50" 
                    : ""
                }`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )}
</>

                    {/* Quick View Modal */}
                    {/* Quick View Modal */}
<Dialog open={isQuickViewOpen} onOpenChange={setIsQuickViewOpen}>
    <DialogContent className="bg-[#1A1A1A] text-white border-green-500 max-w-2xl">
        {selectedProduct && (
            <>
                <DialogHeader>
                    <DialogTitle className="text-xl text-green-500">
                        {selectedProduct.name}
                    </DialogTitle>

                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <div className="flex flex-col gap-4">
                        <div className="aspect-square relative bg-black/20 rounded-lg overflow-hidden flex items-center justify-center">
                            <img 
                                src={selectedProduct.image ?? '/placeholder-product.png'} 
                                alt={selectedProduct.name ?? 'Product image'}
                                className="object-contain w-full h-full"
                            />
                        </div>
                        
                        {/* Additional Images Gallery */}
                        {selectedProduct.additionalImages && Array.isArray(selectedProduct.additionalImages) && selectedProduct.additionalImages.length > 0 && (
                            <div>
                                <h4 className="text-sm text-gray-400 mb-2">Additional Images</h4>
                                <div className="grid grid-cols-4 gap-2">
                                    {selectedProduct.additionalImages.map((img, index) => (
                                        <div 
                                            key={index} 
                                            className="aspect-square bg-black/30 rounded-md overflow-hidden cursor-pointer hover:border-green-500 hover:border-2"
                                        >
                                            <img 
                                                src={img} 
                                                alt={`${selectedProduct.name} - view ${index + 1}`}
                                                className="object-cover w-full h-full"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    
                    <div className="flex flex-col justify-between">
                        <div>
                            <p className="text-gray-400 mb-2">Category: {selectedProduct.category}</p>
                            <p className="text-2xl font-bold mb-4">${selectedProduct.price}</p>
                            <div 
                                className="text-gray-300 mb-4 flex flex-col gap-4 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar"
                                dangerouslySetInnerHTML={{ 
                                    __html: DOMPurify.sanitize(selectedProduct.description) 
                                }}
                            />
                            {selectedProduct.stock > 0 ? (
                                <p className="text-green-500 mb-4">In Stock: {selectedProduct.stock} units</p>
                            ) : (
                                <p className="text-red-500 mb-4">Out of Stock</p>
                            )}
                        </div>
                        <div className="space-y-3 mt-4">
                            <Button 
                                className="w-full bg-green-500 hover:bg-green-600 text-white"
                                onClick={() => redirectToWhatsApp(selectedProduct)}
                            >
                                Checkout via WhatsApp
                            </Button>
                            <Button 
                                className="w-full border-green-500 text-green-500 hover:bg-green-500/20"
                                onClick={() => {
                                    handleOrder(selectedProduct.id);
                                    setIsQuickViewOpen(false);
                                }}
                            >
                                Add to Order
                            </Button>
                        </div>
                    </div>
                </div>
            </>
        )}
    </DialogContent>
</Dialog>
                </main>
            </div>
        </SidebarProvider>
    );
}
