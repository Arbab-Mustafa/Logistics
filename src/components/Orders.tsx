"use client";
import React, { useState, useEffect } from 'react';
 import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarProvider } from "@/components/ui/sidebar";
import { 
   
  Search, 
  Filter, 
  Package, 
  Calendar,
  CreditCard
} from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Mock order data
interface Order {
  id: number;
  orderNumber: string;
  customer: {
    name: string;
    email: string;
  };
  orderDate: string;
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED' | 'REFUNDED' | 'ON_HOLD';
  paymentStatus: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED' | 'PARTIALLY_REFUNDED';
  totalAmount: number;
  items: number;
}

const mockOrders: Order[] = [
  {
    id: 1,
    orderNumber: 'ORD-001',
    customer: { name: 'John Doe', email: 'john@example.com' },
    orderDate: '2024-04-25',
    status: 'SHIPPED',
    paymentStatus: 'PAID',
    totalAmount: 129.99,
    items: 2
  },
  {
    id: 2,
    orderNumber: 'ORD-002',
    customer: { name: 'Jane Smith', email: 'jane@example.com' },
    orderDate: '2024-04-24',
    status: 'PENDING',
    paymentStatus: 'PENDING',
    totalAmount: 79.50,
    items: 1
  },
  {
    id: 3,
    orderNumber: 'ORD-003',
    customer: { name: 'Robert Johnson', email: 'robert@example.com' },
    orderDate: '2024-04-23',
    status: 'DELIVERED',
    paymentStatus: 'PAID',
    totalAmount: 245.75,
    items: 3
  },
  {
    id: 4,
    orderNumber: 'ORD-004',
    customer: { name: 'Sarah Williams', email: 'sarah@example.com' },
    orderDate: '2024-04-22',
    status: 'CANCELLED',
    paymentStatus: 'REFUNDED',
    totalAmount: 59.99,
    items: 1
  },
  {
    id: 5,
    orderNumber: 'ORD-005',
    customer: { name: 'Michael Brown', email: 'michael@example.com' },
    orderDate: '2024-04-21',
    status: 'PROCESSING',
    paymentStatus: 'PAID',
    totalAmount: 187.25,
    items: 2
  }
];

const Orders: React.FC = () => {
  const navigate = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [credits] = useState(100); // Mock credits
  
  useEffect(() => {
    // Simulating data loading from API
    setIsLoading(true);
    setTimeout(() => {
      setOrders(mockOrders);
      setIsLoading(false);
    }, 1000);
  }, []);
  
  // Filter orders based on search term and status
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = 
      statusFilter === 'all' || order.status.toLowerCase() === statusFilter.toLowerCase();
      
    return matchesSearch && matchesStatus;
  });
  
  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'DELIVERED':
        return 'bg-green-500/20 text-green-500';
      case 'SHIPPED':
        return 'bg-blue-500/20 text-blue-500';
      case 'PROCESSING':
        return 'bg-yellow-500/20 text-yellow-500';
      case 'PENDING':
        return 'bg-orange-500/20 text-orange-500';
      case 'CANCELLED':
      case 'REFUNDED':
        return 'bg-red-500/20 text-red-500';
      case 'ON_HOLD':
        return 'bg-purple-500/20 text-purple-500';
      default:
        return 'bg-gray-500/20 text-gray-500';
    }
  };
  
  const getPaymentStatusColor = (status: Order['paymentStatus']) => {
    switch (status) {
      case 'PAID':
        return 'bg-green-500/20 text-green-500';
      case 'PENDING':
        return 'bg-yellow-500/20 text-yellow-500';
      case 'FAILED':
        return 'bg-red-500/20 text-red-500';
      case 'REFUNDED':
      case 'PARTIALLY_REFUNDED':
        return 'bg-purple-500/20 text-purple-500';
      default:
        return 'bg-gray-500/20 text-gray-500';
    }
  };
  
  const viewOrderDetails = (orderId: number) => {
    navigate.push(`/orders/${orderId}`);
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
          <Link href="/dashboard" className="flex w-full items-center px-3 py-2 text-gray-300 hover:text-green-500 rounded-md">
                            Dashboard
                        </Link>
                       
                        <Link href="/dashboard/orders" className="flex w-full items-center px-3 py-2  text-green-500 hover:text-green-500/10 hover:bg-green-500/10 rounded-md">
                            Orders
                        </Link>
                        <Link href="/dashboard/analytics" className="flex w-full items-center px-3 py-2  text-gray-300 hover:text-green-500 hover:bg-green-500/10 rounded-md">
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
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold text-white">Orders</h2>
              <span className="bg-green-500 text-xs text-white rounded-full px-2 py-1">
                {orders.length} Total
              </span>
            </div>
            <div className="bg-[#1A1A1A] px-3 py-2 rounded-lg flex items-center text-green-500">
              <CreditCard className="h-4 w-4 mr-2" />
              <span className="font-semibold">{credits} Credits</span>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-[#1A1A1A] rounded-lg p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input 
                  placeholder="Search orders..." 
                  className="pl-10 bg-black/30 border-none text-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2">
                <Select
                  value={statusFilter}
                  onValueChange={setStatusFilter}
                >
                  <SelectTrigger className="w-[180px] bg-black/30 border-none text-white">
                    <div className="flex items-center">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Filter by status" />
                    </div>
                  </SelectTrigger>
                  <SelectContent className="bg-[#1A1A1A] border-gray-800">
                    <SelectItem value="all" className="text-white hover:bg-green-500/20">All Statuses</SelectItem>
                    <SelectItem value="pending" className="text-white hover:bg-green-500/20">Pending</SelectItem>
                    <SelectItem value="processing" className="text-white hover:bg-green-500/20">Processing</SelectItem>
                    <SelectItem value="shipped" className="text-white hover:bg-green-500/20">Shipped</SelectItem>
                    <SelectItem value="delivered" className="text-white hover:bg-green-500/20">Delivered</SelectItem>
                    <SelectItem value="cancelled" className="text-white hover:bg-green-500/20">Cancelled</SelectItem>
                    <SelectItem value="refunded" className="text-white hover:bg-green-500/20">Refunded</SelectItem>
                    <SelectItem value="on_hold" className="text-white hover:bg-green-500/20">On Hold</SelectItem>
                  </SelectContent>
                </Select>
                
                <Popover>
                  <PopoverTrigger asChild>
                    <Button  className="border-none bg-black/30 text-white hover:bg-green-500/20">
                      <Calendar className="mr-2 h-4 w-4" />
                      <span>Date Range</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-4 bg-[#1A1A1A] border-gray-800 text-white">
                    <div className="space-y-2">
                      <h4 className="font-medium">Select date range</h4>
                      <div className="grid gap-2">
                        <div>
                          <label className="text-sm text-gray-400">Start Date</label>
                          <Input type="date" className="bg-black/30 border-none text-white" />
                        </div>
                        <div>
                          <label className="text-sm text-gray-400">End Date</label>
                          <Input type="date" className="bg-black/30 border-none text-white" />
                        </div>
                      </div>
                      <div className="flex justify-end gap-2 pt-2">
                        <Button className="border-gray-600 text-white hover:bg-gray-700">
                          Clear
                        </Button>
                        <Button className="bg-green-500 hover:bg-green-600">
                          Apply
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-[#1A1A1A] rounded-lg overflow-hidden">
            {isLoading ? (
              <div className="flex justify-center items-center p-8">
                <div className="animate-pulse flex flex-col items-center">
                  <Package className="h-12 w-12 text-green-500 mb-2" />
                  <p className="text-gray-400">Loading orders...</p>
                </div>
              </div>
            ) : filteredOrders.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-black/20 border-b border-gray-800">
                    <TableHead className="text-gray-400">Order</TableHead>
                    <TableHead className="text-gray-400">Customer</TableHead>
                    <TableHead className="text-gray-400">Date</TableHead>
                    <TableHead className="text-gray-400">Status</TableHead>
                    <TableHead className="text-gray-400">Payment</TableHead>
                    <TableHead className="text-gray-400">Amount</TableHead>
                    <TableHead className="text-gray-400">Items</TableHead>
                    <TableHead className="text-gray-400 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id} className="hover:bg-black/20 border-b border-gray-800">
                      <TableCell className="font-medium text-white">{order.orderNumber}</TableCell>
                      <TableCell>
                        <div className="text-white">{order.customer.name}</div>
                        <div className="text-gray-400 text-sm">{order.customer.email}</div>
                      </TableCell>
                      <TableCell className="text-white">{order.orderDate}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                          {order.paymentStatus}
                        </span>
                      </TableCell>
                      <TableCell className="font-medium text-green-500">${order.totalAmount.toFixed(2)}</TableCell>
                      <TableCell className="text-white">{order.items}</TableCell>
                      <TableCell className="text-right">
                        <Button 
                  
                          className="text-gray-400 hover:text-green-500"
                          onClick={() => viewOrderDetails(order.id)}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="flex flex-col items-center justify-center p-8">
                <Package className="h-12 w-12 text-gray-400 mb-2" />
                <h3 className="text-lg font-medium text-white mb-1">No Orders Found</h3>
                <p className="text-gray-400">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Orders;
