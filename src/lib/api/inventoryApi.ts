// src/lib/api/inventoryApi.ts
import { Inventory } from '@prisma/client';

export interface NormalizedProduct {
  additionalImages: string[];
  description: string;
  id: number;
  name: string;
  price: number;
  stock: number;
  sales: number;
  image: string;
  category: string;
}
export interface Product {
  additionalImages: string[] | null;
  description: string;
  id: number;
  name: string | null;
  price: number;
  stock: number;
  sales: number;
  image: string | null;
  category: string | null;
}


export interface PaginatedResponse {
  products: Product[];
  totalPages: number;
  currentPage: number;
  total: number;
}

export interface InventoryFilterParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  sortBy?: string;
  minPrice?: number;
  maxPrice?: number;
}

export async function fetchInventory(
  params: InventoryFilterParams
): Promise<PaginatedResponse> {
  const queryParams = new URLSearchParams();

  // Add all defined parameters to the query
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      queryParams.append(key, String(value));
    }
  });

  const response = await fetch(`/api/inventory?${queryParams.toString()}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch inventory');
  }

  return response.json();
}

export async function createInventoryItem(
  itemData: Partial<Inventory>
): Promise<Inventory> {
  const response = await fetch('/api/inventory', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(itemData),
  });

  if (!response.ok) {
    throw new Error('Failed to create inventory item');
  }

  return response.json();
}

export async function updateInventoryItem(
  id: number,
  itemData: Partial<Inventory>
): Promise<Inventory> {
  const response = await fetch(`/api/inventory/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(itemData),
  });

  if (!response.ok) {
    throw new Error('Failed to update inventory item');
  }

  return response.json();
}

export async function deleteInventoryItem(id: number): Promise<void> {
  const response = await fetch(`/api/inventory/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete inventory item');
  }
}