import React, { useState } from "react";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, CheckCircle2 } from "lucide-react";
import { useAppStore } from "@/store/useBookingStore";
import { formatCurrency } from "@/lib/utils";

interface CartDrawerProps {
  onNavigate?: (route: string) => void;
}

export function CartDrawer({ onNavigate }: CartDrawerProps) {
  const { cart, isCartOpen, setCartOpen, removeFromCart, updateCartQuantity, clearCart } = useAppStore();
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shipping = subtotal > 3000 || subtotal === 0 ? 0 : 150;
  const total = subtotal + shipping;

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[90] flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-[#F6F1EA] dark:bg-[#1A1412] text-[#1B1512] dark:text-[#F6F1EA] h-full shadow-2xl flex flex-col border-l border-[#B8935A]/30 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#B8935A]/20">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#B8935A]" />
            <h3 className="font-serif text-xl tracking-tight font-medium">Bespoke Haircare Cart</h3>
          </div>
          <button
            id="close-cart-btn"
            onClick={() => {
              setCartOpen(false);
              setCheckoutComplete(false);
            }}
            className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-stone-500 hover:text-stone-700 dark:hover:text-stone-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {checkoutComplete ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="font-serif text-2xl font-semibold text-[#1B1512] dark:text-[#F6F1EA]">
              Order Confirmed!
            </h4>
            <p className="text-sm text-stone-600 dark:text-stone-400 max-w-xs">
              Thank you for choosing Aura Labs. Your luxury hair essentials are being hand-packaged in Koregaon Park with complimentary samples.
            </p>
            <div className="pt-4">
              <button
                onClick={() => {
                  clearCart();
                  setCheckoutComplete(false);
                  setCartOpen(false);
                }}
                className="px-6 py-2.5 bg-[#B8935A] text-white rounded-xl text-sm font-medium hover:bg-[#9E7B45] transition-colors"
              >
                Continue Browsing
              </button>
            </div>
          </div>
        ) : cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-3">
            <ShoppingBag className="w-12 h-12 text-[#B8935A]/40" />
            <p className="font-serif text-lg text-stone-500">Your bag is currently empty</p>
            <p className="text-xs text-stone-400 max-w-xs">
              Explore our curated salon backbar essentials, molecular bond repairers, and pure botanical elixirs.
            </p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-3 bg-white/70 dark:bg-black/30 rounded-xl border border-[#B8935A]/15 items-center"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-lg object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-semibold text-[#B8935A] uppercase tracking-wider truncate">
                      {item.product.brand}
                    </p>
                    <p className="text-sm font-medium truncate">{item.product.name}</p>
                    <p className="text-xs text-stone-500">{formatCurrency(item.product.price)}</p>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center border border-[#B8935A]/30 rounded-lg overflow-hidden bg-white dark:bg-stone-900">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-0.5 hover:bg-[#B8935A]/10 text-stone-600 dark:text-stone-300"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-0.5 hover:bg-[#B8935A]/10 text-stone-600 dark:text-stone-300"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-stone-400 hover:text-red-500 p-1 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer Calculation */}
            <div className="p-6 border-t border-[#B8935A]/20 bg-black/5 dark:bg-white/5 space-y-3">
              <div className="flex justify-between text-xs text-stone-500">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-xs text-stone-500">
                <span>Courier to Pune & Pan-India</span>
                <span>{shipping === 0 ? "Free (Orders above ₹3,000)" : formatCurrency(shipping)}</span>
              </div>
              <div className="flex justify-between text-base font-semibold border-t border-[#B8935A]/15 pt-2">
                <span>Total Amount</span>
                <span className="text-[#B8935A] font-serif text-lg">{formatCurrency(total)}</span>
              </div>

              <button
                id="cart-checkout-btn"
                onClick={() => setCheckoutComplete(true)}
                className="w-full mt-2 py-3 bg-[#B8935A] hover:bg-[#9E7B45] text-white rounded-xl font-medium text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99]"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
