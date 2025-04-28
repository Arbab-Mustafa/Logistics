'use client';

import React, { useState, useEffect } from 'react';
import { UserRole } from '@prisma/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

// Types for our dashboard
interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}




interface DashboardStats {
  users: number;
  orders: number;
  pendingReviews: number;
}

const AdminUsers = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);

  const [stats, setStats] = useState<DashboardStats>({ users: 0, orders: 0, pendingReviews: 0 });
  const [loading, setLoading] = useState(true);
  const [searchEmail, setSearchEmail] = useState('');

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/admin');
      const data = await response.json();
      
      if (data.success) {
        setStats(data.data.stats);
      } else {
        throw new Error(data.error || 'Failed to fetch dashboard data');
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load dashboard data',
        variant: 'destructive',
      });
    }
  };

  // Fetch users data
  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/admin/users');
      const data = await response.json();
      
      if (data.success) {
        setUsers(data.data.users);
      } else {
        throw new Error(data.error || 'Failed to fetch users');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: 'Error',
        description: 'Failed to load users',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle making a user a staff member
  const handleMakeStaff = async (email: string) => {
    try {
      const response = await fetch('/api/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'makeStaff',
          email,
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        toast({
          title: 'Success',
          description: 'User promoted to staff',
          variant: 'default',
        });
        fetchUsers();
      } else {
        throw new Error(data.error || 'Failed to promote user');
      }
    } catch (error) {
      console.error('Error promoting user:', error);
      toast({
        title: 'Error',
        description: 'Failed to promote user',
        variant: 'destructive',
      });
    }
  };

  // Handle revoking a user's role
  const handleRevokeRole = async (email: string) => {
    try {
      const response = await fetch('/api/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'revokeRole',
          email,
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        toast({
          title: 'Success',
          description: 'User role revoked',
          variant: 'default',
        });
        fetchUsers();
      } else {
        throw new Error(data.error || 'Failed to revoke role');
      }
    } catch (error) {
      console.error('Error revoking role:', error);
      toast({
        title: 'Error',
        description: 'Failed to revoke role',
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    fetchDashboardData();
    fetchUsers();
  }, [fetchDashboardData,fetchUsers]);

  // Filter users based on search
  const filteredUsers = users.filter(user => 
    searchEmail === '' || user.email.toLowerCase().includes(searchEmail.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-green-700 mb-6">Admin Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-white border-green-500 shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-green-700">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.users}</p>
          </CardContent>
        </Card>
        
        <Card className="bg-white border-green-500 shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-green-700">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.orders}</p>
          </CardContent>
        </Card>
        
        <Card className="bg-white border-green-500 shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-green-700">Pending Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.pendingReviews}</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="users" className="w-full">
        <TabsList className="bg-gray-200 mb-6">
          <TabsTrigger value="users" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
            Users
          </TabsTrigger>
          <TabsTrigger value="orders" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
            Orders
          </TabsTrigger>
          <TabsTrigger value="reviews" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
            Reviews
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="users" className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">User Management</h2>
            <Input
              placeholder="Search by email"
              value={searchEmail}
              onChange={(e) => setSearchEmail(e.target.value)}
              className="max-w-xs"
            />
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-700"></div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-4">
                      No users found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge className={
                          user.role === 'ADMIN' 
                            ? 'bg-red-500' 
                            : user.role === 'STAFF' 
                              ? 'bg-green-500' 
                              : 'bg-gray-500'
                        }>
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          {user.role === 'CUSTOMER' && (
                            <Button 
                             
                              
                              className="text-green-700 border-green-700 hover:bg-green-50"
                              onClick={() => handleMakeStaff(user.email)}
                            >
                              Make Staff
                            </Button>
                          )}
                          {user.role === 'STAFF' && (
                            <Button 
                             
                              
                              className="text-gray-700 border-gray-700 hover:bg-gray-50"
                              onClick={() => handleRevokeRole(user.email)}
                            >
                              Revoke Role
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </TabsContent>
        
        <TabsContent value="orders" className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Management</h2>
          <p className="text-gray-600">Order management functionality would be implemented here.</p>
        </TabsContent>
        
        <TabsContent value="reviews" className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Review Management</h2>
          <p className="text-gray-600">Review approval functionality would be implemented here.</p>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminUsers;


