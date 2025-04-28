"use client";
import  { useState, useEffect } from 'react';
import Link from 'next/link';

import { SidebarProvider } from "@/components/ui/sidebar";
import {

  BarChart3,
  PieChart,
  TrendingUp,
  Package,
  ShoppingCart,
  DollarSign,

  CreditCard,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart as RechartPieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { z } from 'zod';
import Image from 'next/image';
import React from 'react';

// Define Zod schema for sales data
const SalesDataSchema = z.object({
  name: z.string(),
  sales: z.number(),
  orders: z.number().optional(),
  revenue: z.number().optional(),
});

type SalesData = z.infer<typeof SalesDataSchema>;

// Define Zod schema for category data
const CategoryDataSchema = z.object({
  name: z.string(),
  value: z.number(),
});

type CategoryData = z.infer<typeof CategoryDataSchema>;

// Mock data
const mockMonthlySales: SalesData[] = [
  { name: 'Jan', sales: 65, orders: 45, revenue: 5690 },
  { name: 'Feb', sales: 59, orders: 39, revenue: 5200 },
  { name: 'Mar', sales: 80, orders: 57, revenue: 7300 },
  { name: 'Apr', sales: 81, orders: 60, revenue: 7700 },
  { name: 'May', sales: 56, orders: 38, revenue: 5100 },
  { name: 'Jun', sales: 55, orders: 39, revenue: 5300 },
  { name: 'Jul', sales: 40, orders: 30, revenue: 3900 },
  { name: 'Aug', sales: 72, orders: 51, revenue: 6700 },
  { name: 'Sep', sales: 90, orders: 65, revenue: 8600 },
  { name: 'Oct', sales: 95, orders: 68, revenue: 9100 },
  { name: 'Nov', sales: 105, orders: 75, revenue: 10200 },
  { name: 'Dec', sales: 120, orders: 85, revenue: 11800 },
];

const mockCategoryData: CategoryData[] = [
  { name: 'Electronics', value: 45 },
  { name: 'Clothing', value: 25 },
  { name: 'Home & Kitchen', value: 15 },
  { name: 'Beauty', value: 10 },
  { name: 'Sports', value: 5 },
];

const mockProductPerformance = [
  { name: 'Wireless Earbuds', sales: 127, revenue: 6350 },
  { name: 'Smart Watch', sales: 94, revenue: 8460 },
  { name: 'Fitness Tracker', sales: 215, revenue: 12900 },
  { name: 'Bluetooth Speaker', sales: 76, revenue: 6080 },
  { name: 'Phone Holder', sales: 320, revenue: 6400 },
];

const Analytics: React.FC = () => {
  
  const [timeRange, setTimeRange] = useState('year');
  const [validatedSalesData, setValidatedSalesData] = useState<SalesData[]>([]);
  const [validatedCategoryData, setValidatedCategoryData] = useState<CategoryData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [credits] = useState(100); // Mock credits
  
  const COLORS = ['#22c55e', '#10b981', '#06b6d4', '#3b82f6', '#8b5cf6'];
  
  useEffect(() => {
    setIsLoading(true);
    
    setTimeout(() => {
      try {
        // Validate data with Zod
        const salesData = mockMonthlySales.map(item => SalesDataSchema.parse(item));
        const categoryData = mockCategoryData.map(item => CategoryDataSchema.parse(item));
        
        setValidatedSalesData(salesData);
        setValidatedCategoryData(categoryData);
      } catch (error) {
        console.error('Data validation error:', error);
      }
      
      setIsLoading(false);
    }, 1000);
  }, []);
  
  const totalSales = validatedSalesData.reduce((sum, item) => sum + item.sales, 0);
  const totalRevenue = validatedSalesData.reduce((sum, item) => sum + (item.revenue || 0), 0);
  const totalOrders = validatedSalesData.reduce((sum, item) => sum + (item.orders || 0), 0);
  
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  
  

  interface CustomTooltipProps {
    active?: boolean;
    payload?: Array<{
      name: string;
      value: number;
      color: string;
      dataKey?: string;
    }>;
    label?: string;
  }

  const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#1A1A1A] p-3 border border-gray-800 rounded-md">
          <p className="text-white font-medium">{label}</p>
        
          {payload.map((entry: { name: string; value: number; color: string; dataKey?: string }, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.name === 'Revenue' ? '$' : ''}{entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
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
                     
                        <Link href="/dashboard/orders" className="flex w-full items-center px-3 py-2 text-gray-300 hover:text-green-500 hover:bg-green-500/10 rounded-md">
                            Orders
                        </Link>
                        <Link href="/dashboard/analytics" className="flex w-full items-center px-3 py-2 text-green-500 hover:text-green-500/10 hover:bg-green-500/10 rounded-md">
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
              <h2 className="text-2xl font-bold text-white">Analytics</h2>
            </div>
            <div className="bg-[#1A1A1A] px-3 py-2 rounded-lg flex items-center text-green-500">
              <CreditCard className="h-4 w-4 mr-2" />
              <span className="font-semibold">{credits} Credits</span>
            </div>
          </div>

          {/* Time Range Selector */}
          <div className="bg-[#1A1A1A] rounded-lg p-4 mb-6 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-white">Performance Overview</h3>
            <Select
              value={timeRange}
              onValueChange={setTimeRange}
            >
              <SelectTrigger className="w-[180px] bg-black/30 border-none text-white">
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent className="bg-[#1A1A1A] border-gray-800">
                <SelectItem value="week" className="text-white hover:bg-green-500/20">This Week</SelectItem>
                <SelectItem value="month" className="text-white hover:bg-green-500/20">This Month</SelectItem>
                <SelectItem value="quarter" className="text-white hover:bg-green-500/20">This Quarter</SelectItem>
                <SelectItem value="year" className="text-white hover:bg-green-500/20">This Year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card className="bg-[#1A1A1A] border-none">
              <CardHeader className="pb-2">
                <CardTitle className="text-gray-400 text-sm font-normal flex items-center">
                  <Package className="h-4 w-4 mr-2 text-green-500" />
                  Total Sales
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{totalSales}</div>
                <p className="text-xs text-green-500">+12% from last month</p>
              </CardContent>
            </Card>
            <Card className="bg-[#1A1A1A] border-none">
              <CardHeader className="pb-2">
                <CardTitle className="text-gray-400 text-sm font-normal flex items-center">
                  <ShoppingCart className="h-4 w-4 mr-2 text-green-500" />
                  Total Orders
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{totalOrders}</div>
                <p className="text-xs text-green-500">+8% from last month</p>
              </CardContent>
            </Card>
            <Card className="bg-[#1A1A1A] border-none">
              <CardHeader className="pb-2">
                <CardTitle className="text-gray-400 text-sm font-normal flex items-center">
                  <DollarSign className="h-4 w-4 mr-2 text-green-500" />
                  Revenue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">${totalRevenue.toLocaleString()}</div>
                <p className="text-xs text-green-500">+15% from last month</p>
              </CardContent>
            </Card>
            <Card className="bg-[#1A1A1A] border-none">
              <CardHeader className="pb-2">
                <CardTitle className="text-gray-400 text-sm font-normal flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2 text-green-500" />
                  Average Order Value
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">${averageOrderValue.toFixed(2)}</div>
                <p className="text-xs text-green-500">+5% from last month</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="mb-6">
            <Tabs defaultValue="sales" className="w-full">
              <TabsList className="bg-[#1A1A1A] border-b border-gray-800">
                <TabsTrigger value="sales" className="data-[state=active]:text-green-500">Sales</TabsTrigger>
                <TabsTrigger value="revenue" className="data-[state=active]:text-green-500">Revenue</TabsTrigger>
                <TabsTrigger value="categories" className="data-[state=active]:text-green-500">Categories</TabsTrigger>
              </TabsList>
              
              <TabsContent value="sales" className="mt-4">
                <Card className="bg-[#1A1A1A] border-none overflow-hidden">
                  <CardHeader>
                    <CardTitle className="text-white">Monthly Sales</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <div className="flex justify-center items-center h-80">
                        <div className="animate-pulse flex flex-col items-center">
                          <BarChart3 className="h-12 w-12 text-green-500 mb-2" />
                          <p className="text-gray-400">Loading chart data...</p>
                        </div>
                      </div>
                    ) : (
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={validatedSalesData}
                            margin={{
                              top: 5,
                              right: 30,
                              left: 20,
                              bottom: 5,
                            }}
                          >
                            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                            <XAxis dataKey="name" stroke="#888" />
                            <YAxis stroke="#888" />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Bar dataKey="sales" name="Sales" fill="#22c55e" />
                            <Bar dataKey="orders" name="Orders" fill="#10b981" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="revenue" className="mt-4">
                <Card className="bg-[#1A1A1A] border-none overflow-hidden">
                  <CardHeader>
                    <CardTitle className="text-white">Monthly Revenue</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <div className="flex justify-center items-center h-80">
                        <div className="animate-pulse flex flex-col items-center">
                          <TrendingUp className="h-12 w-12 text-green-500 mb-2" />
                          <p className="text-gray-400">Loading chart data...</p>
                        </div>
                      </div>
                    ) : (
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            data={validatedSalesData}
                            margin={{
                              top: 5,
                              right: 30,
                              left: 20,
                              bottom: 5,
                            }}
                          >
                            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                            <XAxis dataKey="name" stroke="#888" />
                            <YAxis stroke="#888" />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Line 
                              type="monotone" 
                              dataKey="revenue" 
                              name="Revenue" 
                              stroke="#22c55e" 
                              strokeWidth={2}
                              dot={{ r: 4 }}
                              activeDot={{ r: 6 }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="categories" className="mt-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="bg-[#1A1A1A] border-none overflow-hidden">
                    <CardHeader>
                      <CardTitle className="text-white">Sales by Category</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {isLoading ? (
                        <div className="flex justify-center items-center h-80">
                          <div className="animate-pulse flex flex-col items-center">
                            <PieChart className="h-12 w-12 text-green-500 mb-2" />
                            <p className="text-gray-400">Loading chart data...</p>
                          </div>
                        </div>
                      ) : (
                        <div className="h-80">
                          <ResponsiveContainer width="100%" height="100%">
                            <RechartPieChart>
                              <Pie
                                data={validatedCategoryData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={120}
                                fill="#8884d8"
                                dataKey="value"
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                              >
                                {validatedCategoryData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                              </Pie>
                              <Tooltip content={<CustomTooltip />} />
                              <Legend />
                            </RechartPieChart>
                          </ResponsiveContainer>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-[#1A1A1A] border-none overflow-hidden">
                    <CardHeader>
                      <CardTitle className="text-white">Top Products</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {mockProductPerformance.map((product, index) => (
                          <div key={index} className="bg-black/30 p-3 rounded-md">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-white font-medium">{product.name}</span>
                              <span className="text-green-500">${product.revenue.toLocaleString()}</span>
                            </div>
                            <div className="w-full bg-gray-800 rounded-full h-2">
                              <div 
                                className="bg-green-500 h-2 rounded-full" 
                                style={{ width: `${(product.sales / 320) * 100}%` }}
                              />
                            </div>
                            <div className="flex justify-between text-xs mt-1">
                              <span className="text-gray-400">{product.sales} sales</span>
                              <span className="text-gray-400">{((product.sales / 320) * 100).toFixed(1)}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Analytics;
