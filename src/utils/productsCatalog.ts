'use client';

import { useState, useEffect, useCallback } from 'react';
import { Product } from '@/types';
import { PRODUCTS } from '@/data/products';

export const PRODUCTS_STORAGE_KEY = 'nepviet_products_catalog_v2';
export const PRODUCTS_UPDATED_EVENT = 'nepviet_products_updated';

/**
 * Lấy danh sách sản phẩm hiện tại từ LocalStorage (nếu có tùy chỉnh) hoặc danh mục gốc 14 sản phẩm.
 */
export function getStoredProducts(): Product[] {
  if (typeof window === 'undefined') {
    return PRODUCTS;
  }
  try {
    const raw = localStorage.getItem(PRODUCTS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error reading stored products:', err);
  }
  return PRODUCTS;
}

/**
 * Lưu danh mục sản phẩm vào LocalStorage và thông báo đồng bộ sang các tab/trang khác.
 */
export function saveStoredProducts(products: Product[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
    window.dispatchEvent(new Event(PRODUCTS_UPDATED_EVENT));
  } catch (err) {
    console.error('Error saving stored products:', err);
  }
}

/**
 * Khôi phục danh mục về 14 sản phẩm gốc ban đầu.
 */
export function resetStoredProducts(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(PRODUCTS_STORAGE_KEY);
    window.dispatchEvent(new Event(PRODUCTS_UPDATED_EVENT));
  } catch (err) {
    console.error('Error resetting stored products:', err);
  }
}

/**
 * Custom React Hook quản lý danh mục sản phẩm có hỗ trợ Thêm - Sửa - Xóa thời gian thực.
 */
export function useProducts() {
  const [products, setProductsState] = useState<Product[]>(PRODUCTS);
  const [isLoaded, setIsLoaded] = useState(false);

  const reloadProducts = useCallback(() => {
    const current = getStoredProducts();
    setProductsState(current);
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    reloadProducts();

    const handleUpdate = () => {
      reloadProducts();
    };

    window.addEventListener(PRODUCTS_UPDATED_EVENT, handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener(PRODUCTS_UPDATED_EVENT, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, [reloadProducts]);

  const addProduct = (newProduct: Omit<Product, 'id'> & { id?: string }) => {
    const current = getStoredProducts();
    const id = newProduct.id || `prod-${Date.now().toString(36)}`;
    const fullProduct: Product = {
      ...newProduct,
      id,
    };
    const updated = [fullProduct, ...current];
    saveStoredProducts(updated);
    setProductsState(updated);
    return fullProduct;
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    const current = getStoredProducts();
    const updated = current.map((p) => (p.id === id ? { ...p, ...updates } : p));
    saveStoredProducts(updated);
    setProductsState(updated);
  };

  const deleteProduct = (id: string) => {
    const current = getStoredProducts();
    const updated = current.filter((p) => p.id !== id);
    saveStoredProducts(updated);
    setProductsState(updated);
  };

  const resetToDefault = () => {
    resetStoredProducts();
    setProductsState(PRODUCTS);
  };

  return {
    products,
    isLoaded,
    addProduct,
    updateProduct,
    deleteProduct,
    resetToDefault,
  };
}
