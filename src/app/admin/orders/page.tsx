// src/app/admin/orders/page.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, RefreshCw, Eye, Download, Plus } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";
import {  Navbarx } from "@/components/nav2bar";


// Order status types from your schema
type OrderStatus = 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';

interface Address {
  id: number;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface OrderItem {
  id: number;
  productId: number;
  productName: string;
  productSku: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

interface Order {
  id: number;
  orderNumber: string;
  userId: number;
  totalAmount: number;
  shippingCost: number;
  taxAmount: number;
  discountAmount: number;
  grandTotal: number;
  currency: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  shippingAddressId: number;
  shippingAddress?: Address;
  billingAddressId?: number;
  billingAddress?: Address;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  orderItems: OrderItem[];
  statusHistory?: Array<{
    id: number;
    status: OrderStatus;
    note?: string;
    createdAt: string;
    createdBy?: string;
  }>;
}

export default function OrdersManagement() {
  // State
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewingOrder, setViewingOrder] = useState<Order | null>(null);
  const [isOrderDetailOpen, setIsOrderDetailOpen] = useState(false);
  const [isAddOrderOpen, setIsAddOrderOpen] = useState(false);
  
  // Order form
  const [newOrder, setNewOrder] = useState({
    customerEmail: "",
    items: [{ productId: 0, quantity: 1 }],
    shippingAddress: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: ""
    },
    billingAddress: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: ""
    },
    useShippingForBilling: true,
    notes: ""
  });
  
  // Filters
  const [orderNumber, setOrderNumber] = useState("");
  const [status, setStatus] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  
  // Fetch orders
  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "10",
        orderNumber: orderNumber || "",
        status: status !== "all" ? status : "",
        dateFrom: dateFrom || "",
        dateTo: dateTo || ""
      });

      const response = await fetch(`/api/admin/orders?${params}`);
      const data = await response.json();

      if (response.ok) {
        setOrders(data.orders);
        setTotalPages(data.totalPages);
      } else {
        console.error("Failed to fetch orders:", data.error);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, orderNumber, status, dateFrom, dateTo]);

  // Get order details
  const getOrderDetails = async (orderId: number) => {
    try {
      const response = await fetch(`/api/admin/orders/${orderId}`);
      const data = await response.json();
      
      if (response.ok) {
        setViewingOrder(data);
        setIsOrderDetailOpen(true);
      } else {
        console.error("Failed to fetch order details:", data.error);
      }
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  // Update order status
  const updateOrderStatus = async (orderId: number, status: OrderStatus, note: string = "") => {
    try {
      const response = await fetch(`/api/admin/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status, note })
      });
      
      if (response.ok) {
        // If we're viewing this order, update its details
        if (viewingOrder && viewingOrder.id === orderId) {
          getOrderDetails(orderId);
        }
        fetchOrders();
      } else {
        const error = await response.json();
        alert(`Failed to update order status: ${error.message}`);
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Failed to update order status");
    }
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Apply filters
  const applyFilters = () => {
    setCurrentPage(1);
    fetchOrders();
  };

  // Reset filters
  const resetFilters = () => {
    setOrderNumber("");
    setStatus("all");
    setDateFrom("");
    setDateTo("");
    setCurrentPage(1);
  };

  // Add item to new order
  const addItemToOrder = () => {
    setNewOrder({
      ...newOrder,
      items: [...newOrder.items, { productId: 0, quantity: 1 }]
    });
  };

  // Remove item from new order
  const removeItemFromOrder = (index: number) => {
    const items = [...newOrder.items];
    items.splice(index, 1);
    setNewOrder({
      ...newOrder,
      items
    });
  };

  // Handle order form submission
  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const orderData = {
        customerEmail: newOrder.customerEmail,
        items: newOrder.items,
        shippingAddress: newOrder.shippingAddress,
        billingAddress: newOrder.useShippingForBilling 
          ? newOrder.shippingAddress 
          : newOrder.billingAddress,
        notes: newOrder.notes
      };
      
      const response = await fetch('/api/admin/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      });
      
      if (response.ok) {
        fetchOrders();
        setIsAddOrderOpen(false);
        setNewOrder({
          customerEmail: "",
          items: [{ productId: 0, quantity: 1 }],
          shippingAddress: {
            street: "",
            city: "",
            state: "",
            postalCode: "",
            country: ""
          },
          billingAddress: {
            street: "",
            city: "",
            state: "",
            postalCode: "",
            country: ""
          },
          useShippingForBilling: true,
          notes: ""
        });
      } else {
        const error = await response.json();
        alert(`Failed to create order: ${error.message}`);
      }
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Failed to create order");
    }
  };

  // Get status badge color
  const getStatusBadgeColor = (status: OrderStatus) => {
    switch (status) {
      case "PENDING": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "PROCESSING": return "bg-blue-100 text-blue-800 border-blue-200";
      case "SHIPPED": return "bg-purple-100 text-purple-800 border-purple-200";
      case "DELIVERED": return "bg-green-100 text-green-800 border-green-200";
      case "CANCELLED": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };
  const getPaymentStatusBadgeColor = (status: PaymentStatus) => {
    switch (status) {
      case "PENDING": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "PAID": return "bg-green-100 text-green-800 border-green-200";
      case "FAILED": return "bg-red-100 text-red-800 border-red-200";
      case "REFUNDED": return "bg-purple-100 text-purple-800 border-purple-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Create page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
      } else if (currentPage >= totalPages - 2) {
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pages.push(i);
        }
      }
    }
    
    return pages;
  };

  // Effect to fetch orders
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
      <div className="w-full space-y-6">
        <Navbarx />
        <div className="flex justify-center items-center p-4 text-center bg-white shadow-md rounded-md">
          <h1 className="text-3xl font-bold text-gray-800">Order Management</h1>
        </div><div><Dialog open={isAddOrderOpen} onOpenChange={setIsAddOrderOpen}>
            <DialogTrigger asChild>
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="mr-2 h-4 w-4" /> Add Manual Order
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Create Manual Order</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmitOrder} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="customerEmail">Customer Email</Label>
                  <Input
                    id="customerEmail"
                    value={newOrder.customerEmail}
                    onChange={(e) => setNewOrder({...newOrder, customerEmail: e.target.value})}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label>Order Items</Label>
                    <Button type="button"   onClick={addItemToOrder}>
                      <Plus className="h-4 w-4 mr-1" /> Add Item
                    </Button>
                  </div>
                  
                  {newOrder.items.map((item, index) => (
                    <div key={index} className="flex gap-2 items-end">
                      <div className="flex-1">
                        <Label htmlFor={`productId-${index}`}>Product ID</Label>
                        <Input
                          id={`productId-${index}`}
                          type="number"
                          value={item.productId}
                          onChange={(e) => {
                            const items = [...newOrder.items];
                            items[index].productId = parseInt(e.target.value);
                            setNewOrder({...newOrder, items});
                          }}
                          required
                        />
                      </div>
                      <div className="w-24">
                        <Label htmlFor={`quantity-${index}`}>Quantity</Label>
                        <Input
                          id={`quantity-${index}`}
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => {
                            const items = [...newOrder.items];
                            items[index].quantity = parseInt(e.target.value);
                            setNewOrder({...newOrder, items});
                          }}
                          required
                        />
                      </div>
                      {newOrder.items.length > 1 && (
                        <Button 
                          type="button" 
                         
                          className="text-red-500"
                          onClick={() => removeItemFromOrder(index)}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="space-y-2">
                  <Label>Shipping Address</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      placeholder="Street"
                      value={newOrder.shippingAddress.street}
                      onChange={(e) => setNewOrder({
                        ...newOrder, 
                        shippingAddress: {...newOrder.shippingAddress, street: e.target.value}
                      })}
                      required
                    />
                    <Input
                      placeholder="City"
                      value={newOrder.shippingAddress.city}
                      onChange={(e) => setNewOrder({
                        ...newOrder, 
                        shippingAddress: {...newOrder.shippingAddress, city: e.target.value}
                      })}
                      required
                    />
                    <Input
                      placeholder="State/Province/Region"
                      value={newOrder.shippingAddress.state}
                      onChange={(e) => setNewOrder({
                        ...newOrder, 
                        shippingAddress: {...newOrder.shippingAddress, state: e.target.value}
                      })}
                      required
                    />
                    <Input
                      placeholder="Postal Code"
                      value={newOrder.shippingAddress.postalCode}
                      onChange={(e) => setNewOrder({
                        ...newOrder, 
                        shippingAddress: {...newOrder.shippingAddress, postalCode: e.target.value}
                      })}
                      required
                    />
                    <Input
                      placeholder="Country"
                      value={newOrder.shippingAddress.country}
                      onChange={(e) => setNewOrder({
                        ...newOrder, 
                        shippingAddress: {...newOrder.shippingAddress, country: e.target.value}
                      })}
                      required
                    />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="useShippingForBilling"
                    checked={newOrder.useShippingForBilling}
                    onChange={(e) => setNewOrder({...newOrder, useShippingForBilling: e.target.checked})}
                  />
                  <Label htmlFor="useShippingForBilling">Use shipping address for billing</Label>
                </div>
                
                {!newOrder.useShippingForBilling && (
                  <div className="space-y-2">
                    <Label>Billing Address</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        placeholder="Street"
                        value={newOrder.billingAddress.street}
                        onChange={(e) => setNewOrder({
                          ...newOrder, 
                          billingAddress: {...newOrder.billingAddress, street: e.target.value}
                        })}
                        required
                      />
                      <Input
                        placeholder="City"
                        value={newOrder.billingAddress.city}
                        onChange={(e) => setNewOrder({
                          ...newOrder, 
                          billingAddress: {...newOrder.billingAddress, city: e.target.value}
                        })}
                        required
                      />
                      <Input
                        placeholder="State/Province/Region"
                        value={newOrder.billingAddress.state}
                        onChange={(e) => setNewOrder({
                          ...newOrder, 
                          billingAddress: {...newOrder.billingAddress, state: e.target.value}
                        })}
                        required
                      />
                      <Input
                        placeholder="Postal Code"
                        value={newOrder.billingAddress.postalCode}
                        onChange={(e) => setNewOrder({
                          ...newOrder, 
                          billingAddress: {...newOrder.billingAddress, postalCode: e.target.value}
                        })}
                        required
                      />
                      <Input
                        placeholder="Country"
                        value={newOrder.billingAddress.country}
                        onChange={(e) => setNewOrder({
                          ...newOrder, 
                          billingAddress: {...newOrder.billingAddress, country: e.target.value}
                        })}
                        required
                      />
                    </div>
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="notes">Order Notes</Label>
                  <Textarea
                    id="notes"
                    value={newOrder.notes}
                    onChange={(e) => setNewOrder({...newOrder, notes: e.target.value})}
                    placeholder="Add any special instructions or notes"
                  />
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button 
                    type="button" 
                   
                    onClick={() => setIsAddOrderOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-green-600 hover:bg-green-700">
                    Create Order
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Order Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <div className="flex min-w-[200px] gap-2 flex-col">
                <Label htmlFor="orderNumber">Order Number</Label>
                <Input
                  id="orderNumber"
                  value={orderNumber}
                  className="gap-2"
                  onChange={(e) => setOrderNumber(e.target.value)}
                  placeholder="Search by order #"
                />
              </div>
              
              <div className="w-[200px] flex gap-2 flex-col">
                <Label htmlFor="status">Status</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Order Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="PENDING">Pending</SelectItem>
                    <SelectItem value="PROCESSING">Processing</SelectItem>
                    <SelectItem value="SHIPPED">Shipped</SelectItem>
                    <SelectItem value="DELIVERED">Delivered</SelectItem>
                    <SelectItem value="CANCELLED">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="w-[180px] flex gap-2 flex-col">
                <Label htmlFor="dateFrom">Date From</Label>
                <Input
                  id="dateFrom"
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                />
              </div>
              
              <div className="w-[180px] flex gap-2 flex-col">
                <Label htmlFor="dateTo">Date To</Label>
                <Input
                  id="dateTo"
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                />
              </div>
              
              <div className="flex items-end space-x-2">
                <Button onClick={applyFilters} className="bg-green-600 hover:bg-green-700">
                  <Search className="h-4 w-4 mr-2" /> Apply Filters
                </Button>
                <Button  onClick={resetFilters}>
                  <RefreshCw className="h-4 w-4 mr-2" /> Reset
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="bg-white rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order #</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    Loading orders...
                  </TableCell>
                </TableRow>
              ) : orders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    No orders found.
                  </TableCell>
                </TableRow>
              ) : (
                orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>
                      <span className="font-medium">{order.orderNumber}</span>
                    </TableCell>
                    <TableCell>{formatDate(order.createdAt)}</TableCell>
                    <TableCell>Customer #{order.userId}</TableCell>
                    <TableCell>
                      <span className="font-medium">${order.grandTotal.toFixed(2)}</span>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusBadgeColor(order.status)}>
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getPaymentStatusBadgeColor(order.paymentStatus)}>
                        {order.paymentStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                  
                          onClick={() => getOrderDetails(order.id)}
                        >
                          <Eye className="h-4 w-4 mr-1" /> View
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {totalPages > 1 && (
          <Pagination className="mt-8">
            <PaginationContent>
              <PaginationItem>
                <PaginationLink
                                  onClick={() => {
                                      if (currentPage !== 1) {
                                          handlePageChange(Math.max(1, currentPage - 1));
                                      }
                                  } }
                                  aria-disabled={currentPage === 1}
                                  tabIndex={currentPage === 1 ? -1 : 0}
                                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""} size={undefined}                >
                  Previous
                </PaginationLink>
              </PaginationItem>
              
              {getPageNumbers().map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                          onClick={() => handlePageChange(page)}
                          isActive={page === currentPage} size={undefined}                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationLink
                                  onClick={() => {
                                      if (currentPage !== totalPages) {
                                          handlePageChange(Math.min(totalPages, currentPage + 1));
                                      }
                                  } }
                                  aria-disabled={currentPage === totalPages}
                                  tabIndex={currentPage === totalPages ? -1 : 0}
                                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""} size={undefined}                >
                  Next
                </PaginationLink>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}

        {/* Order Detail Dialog */}
        <Dialog open={isOrderDetailOpen} onOpenChange={setIsOrderDetailOpen}>
          <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
            {viewingOrder && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex justify-between">
                    <span>Order #{viewingOrder.orderNumber}</span>
                    <Badge className={getStatusBadgeColor(viewingOrder.status)}>
                      {viewingOrder.status}
                    </Badge>
                  </DialogTitle>
                </DialogHeader>
                
                <div className="space-y-6 py-4">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Order Information</h3>
                      <div className="space-y-1 text-sm">
                        <p><span className="font-medium">Date:</span> {formatDate(viewingOrder.createdAt)}</p>
                        <p><span className="font-medium">Customer ID:</span> {viewingOrder.userId}</p>
                        <p>
                          <span className="font-medium">Payment Status:</span>
                          <Badge className={`ml-2 ${getPaymentStatusBadgeColor(viewingOrder.paymentStatus)}`}>
                            {viewingOrder.paymentStatus}
                          </Badge>
                        </p>
                        {viewingOrder.notes && (
                          <p><span className="font-medium">Notes:</span> {viewingOrder.notes}</p>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Shipping Address</h3>
                      {viewingOrder.shippingAddress ? (
                        <div className="space-y-1 text-sm">
                          <p>{viewingOrder.shippingAddress.street}</p>
                          <p>{viewingOrder.shippingAddress.city}, {viewingOrder.shippingAddress.state} {viewingOrder.shippingAddress.postalCode}</p>
                          <p>{viewingOrder.shippingAddress.country}</p>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500">Shipping address not available</p>
                      )}
                      
                      {viewingOrder.billingAddress && (
                        <>
                          <h3 className="text-lg font-medium mb-2 mt-4">Billing Address</h3>
                          <div className="space-y-1 text-sm">
                            <p>{viewingOrder.billingAddress.street}</p>
                            <p>{viewingOrder.billingAddress.city}, {viewingOrder.billingAddress.state} {viewingOrder.billingAddress.postalCode}</p>
                            <p>{viewingOrder.billingAddress.country}</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Order Items</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Product</TableHead>
                          <TableHead>SKU</TableHead>
                          <TableHead className="text-right">Price</TableHead>
                          <TableHead className="text-right">Quantity</TableHead>
                          <TableHead className="text-right">Total</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {viewingOrder.orderItems.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>{item.productName}</TableCell>
                            <TableCell>{item.productSku}</TableCell>
                            <TableCell className="text-right">${item.unitPrice.toFixed(2)}</TableCell>
                            <TableCell className="text-right">{item.quantity}</TableCell>
                            <TableCell className="text-right">${item.totalPrice.toFixed(2)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Update Status</h3>
                      <div className="flex gap-2">
                        <Select 
                          onValueChange={(value) => updateOrderStatus(
                            viewingOrder.id, 
                            value as OrderStatus
                          )}
                        >
                          <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Change Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="PENDING">Pending</SelectItem>
                            <SelectItem value="PROCESSING">Processing</SelectItem>
                            <SelectItem value="SHIPPED">Shipped</SelectItem>
                            <SelectItem value="DELIVERED">Delivered</SelectItem>
                            <SelectItem value="CANCELLED">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button className="bg-green-600 hover:bg-green-700">
                          Update
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-right">
                      <div className="text-sm">
                        <p>Subtotal: ${viewingOrder.totalAmount.toFixed(2)}</p>
                        <p>Shipping: ${viewingOrder.shippingCost.toFixed(2)}</p>
                        <p>Tax: ${viewingOrder.taxAmount.toFixed(2)}</p>
                        {viewingOrder.discountAmount > 0 && (
                          <p>Discount: -${viewingOrder.discountAmount.toFixed(2)}</p>
                        )}
                      </div>
                      <div className="text-xl font-bold">
                        Total: ${viewingOrder.grandTotal.toFixed(2)}
                      </div>
                    </div>
                  </div>
                  
                  {viewingOrder.statusHistory && viewingOrder.statusHistory.length > 0 && (
                    <div>
                      <h3 className="text-lg font-medium mb-2">Status History</h3>
                      <div className="space-y-2">
                        {viewingOrder.statusHistory.map((history) => (
                          <div key={history.id} className="flex justify-between text-sm border-b pb-2">
                            <div>
                              <Badge className={getStatusBadgeColor(history.status)}>
                                {history.status}
                              </Badge>
                              {history.note && <span className="ml-2">{history.note}</span>}
                            </div>
                            <div className="text-gray-500">
                              {formatDate(history.createdAt)}
                              {history.createdBy && <span> by {history.createdBy}</span>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button
                  
                    onClick={() => setIsOrderDetailOpen(false)}
                  >
                    Close
                  </Button>
                  <Button 
                  
                    className="gap-2"
                  >
                    <Download className="h-4 w-4" /> Download Invoice
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
 
  );
}