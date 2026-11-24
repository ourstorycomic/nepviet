'use client';

import { useState, useEffect, useCallback } from 'react';
import { Product } from '@/types';
import { PRODUCTS } from '@/data/products';
import {
  fetchProductsFromDb,
  insertProductToDb,
  updateProductInDb,
  deleteProductFromDb,
} from '@/services/supabaseService';
import { isSupabaseConfigured } from '@/lib/supabase';

export const PRODUCTS_STORAGE_KEY = 'nepviet_products_catalog_v3';
export const PRODUCTS_UPDATED_EVENT = 'nepviet_products_updated';

/**
 * Lấy danh sách sản phẩm hiện tại từ LocalStorage (nếu có tùy chỉnh) hoặc danh mục gốc 24 sản phẩm.
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
 * Custom React Hook quản lý danh mục sản phẩm kết hợp Supabase Database và LocalStorage Cache.
 */
export function useProducts() {
  const [products, setProductsState] = useState<Product[]>(PRODUCTS);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isCloudSynced, setIsCloudSynced] = useState(false);

  const reloadProducts = useCallback(async () => {
    // 1. Tải trước từ LocalStorage để render tức thì không bị giật lag
    const local = getStoredProducts();
    setProductsState(local);
    setIsLoaded(true);

    // 2. Nếu đã kết nối Supabase, đồng bộ dữ liệu thực từ Cloud
    if (isSupabaseConfigured()) {
      try {
        const cloudProducts = await fetchProductsFromDb();
        if (cloudProducts && cloudProducts.length > 0) {
          // THUẬT TOÁN HỢP NHẤT THÔNG MINH (Smart Merge):
          // Không bao giờ ghi đè làm mất sản phẩm vừa tạo ở client hoặc đang chờ kiểm định!
          const currentLocal = getStoredProducts();
          const cloudMap = new Map(cloudProducts.map((p) => [p.id, p]));

          // Lấy tất cả sản phẩm chỉ có ở local (chưa lên cloud hoặc được tạo cục bộ)
          const localOnly = currentLocal.filter((lp) => !cloudMap.has(lp.id));

          // Với các sản phẩm có ở cả cloud và local, hợp nhất thông tin kiểm duyệt mới nhất
          const mergedCloud = cloudProducts.map((cp) => {
            const matchedLocal = currentLocal.find((lp) => lp.id === cp.id);
            if (matchedLocal) {
              return {
                ...cp,
                approvalStatus: matchedLocal.approvalStatus || cp.approvalStatus,
                rejectionReason: matchedLocal.rejectionReason || cp.rejectionReason,
                artisanName: matchedLocal.artisanName || cp.artisanName,
              };
            }
            return cp;
          });

          const finalMerged = [...localOnly, ...mergedCloud];
          setProductsState(finalMerged);
          saveStoredProducts(finalMerged);
          setIsCloudSynced(true);
        } else if (cloudProducts && cloudProducts.length === 0) {
          // Bảng Supabase đang trống, vẫn giữ local
          setIsCloudSynced(true);
        }
      } catch (e) {
        console.warn('Không thể đồng bộ Supabase ngầm:', e);
      }
    } else {
      setIsCloudSynced(false);
    }
  }, []);

  useEffect(() => {
    reloadProducts();

    const handleUpdate = () => {
      const current = getStoredProducts();
      setProductsState(current);
    };

    const handleConfigChange = () => {
      reloadProducts();
    };

    window.addEventListener(PRODUCTS_UPDATED_EVENT, handleUpdate);
    window.addEventListener('storage', handleUpdate);
    window.addEventListener('nepviet_supabase_config_changed', handleConfigChange);

    return () => {
      window.removeEventListener(PRODUCTS_UPDATED_EVENT, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
      window.removeEventListener('nepviet_supabase_config_changed', handleConfigChange);
    };
  }, [reloadProducts]);

  const addProduct = async (newProduct: Omit<Product, 'id'> & { id?: string }) => {
    const current = getStoredProducts();
    const id = newProduct.id || `prod-${Date.now().toString(36)}`;
    const fullProduct: Product = {
      ...newProduct,
      id,
    };
    const updated = [fullProduct, ...current];
    saveStoredProducts(updated);
    setProductsState(updated);

    // Đồng bộ lên Supabase nếu có kết nối
    if (isSupabaseConfigured()) {
      try {
        await insertProductToDb(fullProduct);
      } catch (err) {
        console.error('Lỗi đẩy sản phẩm mới lên Supabase:', err);
      }
    }

    return fullProduct;
  };

  const updateProduct = async (id: string, updates: Partial<Product>) => {
    const current = getStoredProducts();
    const updated = current.map((p) => (p.id === id ? { ...p, ...updates } : p));
    saveStoredProducts(updated);
    setProductsState(updated);

    // Đồng bộ cập nhật lên Supabase nếu có kết nối
    if (isSupabaseConfigured()) {
      try {
        await updateProductInDb(id, updates);
      } catch (err) {
        console.error('Lỗi cập nhật sản phẩm lên Supabase:', err);
      }
    }
  };

  const deleteProduct = async (id: string) => {
    const current = getStoredProducts();
    const updated = current.filter((p) => p.id !== id);
    saveStoredProducts(updated);
    setProductsState(updated);

    // Đồng bộ xóa lên Supabase nếu có kết nối
    if (isSupabaseConfigured()) {
      try {
        await deleteProductFromDb(id);
      } catch (err) {
        console.error('Lỗi xóa sản phẩm trên Supabase:', err);
      }
    }
  };

  const resetToDefault = () => {
    resetStoredProducts();
    setProductsState(PRODUCTS);
  };

  return {
    products,
    isLoaded,
    isCloudSynced,
    addProduct,
    updateProduct,
    deleteProduct,
    resetToDefault,
    refreshProducts: reloadProducts,
  };
}
