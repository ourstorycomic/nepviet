import React from 'react';
import { Metadata } from 'next';
import { PRODUCTS } from '@/data/products';
import { ProductDetailView } from '@/components/ProductDetailView';

interface Props {
  params: {
    slug: string;
  };
}

export const dynamicParams = true;

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = PRODUCTS.find((p) => p.slug === params.slug);
  if (!product) {
    return {
      title: 'Chi tiết sản phẩm thủ công | Nếp Việt',
    };
  }

  return {
    title: `${product.name} | Nếp Việt`,
    description: product.summary,
    openGraph: {
      title: `${product.name} | Nếp Việt`,
      description: product.summary,
      images: [product.images[0]],
    },
  };
}

export default function ProductDetailPage({ params }: Props) {
  const product = PRODUCTS.find((p) => p.slug === params.slug);

  return <ProductDetailView slug={params.slug} initialProduct={product} />;
}
