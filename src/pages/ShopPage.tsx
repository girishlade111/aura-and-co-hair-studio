import React, { useState } from "react";
import { Sparkles, ShoppingBag, Eye, Star, X, Check, ArrowRight } from "lucide-react";
import { salonProducts, ProductItem } from "@/data/products";
import { formatCurrency } from "@/lib/utils";
import { useAppStore } from "@/store/useBookingStore";

interface ShopPageProps {
  onNavigate: (route: string) => void;
}

export function ShopPage({ onNavigate }: ShopPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [quickViewProduct, setQuickViewProduct] = useState<ProductItem | null>(null);
  const [addedNotice, setAddedNotice] = useState<string | null>(null);

  const { addToCart, setIsCartOpen } = useAppStore();

  const categories = ["All", "Shampoo & Cleanser", "Conditioner & Masque", "Oil & Serum", "Treatment", "Styling"];

  const filteredProducts = salonProducts.filter(
    (p) => selectedCategory === "All" || p.category === selectedCategory
  );

  const handleAddToCart = (product: ProductItem) => {
    addToCart(product);
    setAddedNotice(`Added "${product.name}" to cart`);
    setTimeout(() => setAddedNotice(null), 3000);
  };

  return (
    <div className="min-h-screen py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B8935A]/10 border border-[#B8935A]/30 text-[#B8935A] text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Salon Dispensary
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl text-[#1B1512] dark:text-[#F6F1EA] tracking-tight">
            Curated Take-Home Haircare
          </h1>
          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
            Preserve your salon tone, moisture envelope, and cuticle seal at home. Authentic Kérastase, Olaplex, Davines, and Moroccanoil formulations authorized directly by our master colorists.
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                  selectedCategory === cat
                    ? "bg-[#B8935A] text-white shadow"
                    : "bg-white/60 dark:bg-white/5 border border-[#B8935A]/20 hover:border-[#B8935A] text-stone-700 dark:text-stone-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Added to Cart Notification Toast */}
        {addedNotice && (
          <div className="fixed bottom-24 right-6 z-50 bg-[#1B1512] text-white px-5 py-3 rounded-2xl border border-[#B8935A] shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4">
            <Check className="w-4 h-4 text-[#B8935A]" />
            <span className="text-xs font-semibold">{addedNotice}</span>
            <button
              onClick={() => setIsCartOpen(true)}
              className="ml-2 text-xs text-[#B8935A] underline font-bold"
            >
              View Cart
            </button>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white dark:bg-[#1A1412] rounded-3xl border border-[#B8935A]/20 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Image & Quick View button */}
              <div className="relative aspect-square overflow-hidden bg-stone-100 dark:bg-black/30">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#1B1512]/80 backdrop-blur-sm text-stone-200 text-[10px] px-2.5 py-0.5 rounded-full uppercase font-medium">
                  {product.brand}
                </div>

                {/* Hover Quick View Trigger */}
                <button
                  onClick={() => setQuickViewProduct(product)}
                  className="absolute inset-x-4 bottom-4 py-2.5 bg-white/90 dark:bg-black/90 backdrop-blur-sm text-xs font-semibold rounded-xl text-stone-900 dark:text-stone-100 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 shadow-lg"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Quick View</span>
                </button>
              </div>

              {/* Product Info */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-amber-500 text-[11px]">
                    <Star className="w-3 h-3 fill-current" />
                    <span className="font-semibold text-stone-700 dark:text-stone-300">{product.rating}</span>
                    <span className="text-stone-400">({product.reviewsCount})</span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#1B1512] dark:text-[#F6F1EA] leading-snug line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#B8935A]/15 flex items-center justify-between gap-2">
                  <div className="font-serif text-lg font-bold text-[#B8935A]">
                    {formatCurrency(product.price)}
                  </div>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="px-4 py-2 bg-[#B8935A] hover:bg-[#9E7B45] text-white rounded-xl text-xs font-semibold tracking-wide transition-all shadow-sm flex items-center gap-1.5 active:scale-95"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setQuickViewProduct(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-white dark:bg-[#1A1412] rounded-3xl overflow-hidden border border-[#B8935A]/30 shadow-2xl p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-stone-900 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              <div className="aspect-square rounded-2xl overflow-hidden bg-stone-100 dark:bg-black/40">
                <img
                  src={quickViewProduct.image}
                  alt={quickViewProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-4">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-[#B8935A] bg-[#B8935A]/10 px-2.5 py-1 rounded-full">
                  {quickViewProduct.brand} · {quickViewProduct.size}
                </span>

                <h3 className="font-serif text-2xl font-bold text-[#1B1512] dark:text-[#F6F1EA]">
                  {quickViewProduct.name}
                </h3>

                <div className="font-serif text-2xl font-bold text-[#B8935A]">
                  {formatCurrency(quickViewProduct.price)}
                </div>

                <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                  {quickViewProduct.description}
                </p>

                <div className="p-3 rounded-xl bg-stone-50 dark:bg-white/5 border border-stone-200 dark:border-stone-800 text-xs">
                  <strong className="text-[#B8935A] block mb-1">How to use:</strong>
                  {quickViewProduct.howToUse}
                </div>

                <button
                  onClick={() => {
                    handleAddToCart(quickViewProduct);
                    setQuickViewProduct(null);
                  }}
                  className="w-full py-3 bg-[#B8935A] hover:bg-[#9E7B45] text-white rounded-xl text-xs font-semibold tracking-wide shadow flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart ({formatCurrency(quickViewProduct.price)})</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
