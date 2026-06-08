"use client";

/**
 * Global cart state — React context + localStorage persistence.
 * Easy to swap for Shopify/Medusa later: keep the same public API
 * (addItem/removeItem/updateQty) and replace the internals.
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import type { Product } from "@/data/content";

export type CartItem = {
  id: string; // `${slug}-${size}-${color}`
  slug: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  qty: number;
};

type State = { items: CartItem[] };

type Action =
  | { type: "ADD"; item: CartItem }
  | { type: "REMOVE"; id: string }
  | { type: "QTY"; id: string; qty: number }
  | { type: "CLEAR" }
  | { type: "HYDRATE"; items: CartItem[] };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "HYDRATE":
      return { items: action.items };
    case "ADD": {
      const existing = state.items.find((i) => i.id === action.item.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === action.item.id
              ? { ...i, qty: i.qty + action.item.qty }
              : i
          ),
        };
      }
      return { items: [...state.items, action.item] };
    }
    case "REMOVE":
      return { items: state.items.filter((i) => i.id !== action.id) };
    case "QTY":
      return {
        items: state.items
          .map((i) =>
            i.id === action.id ? { ...i, qty: Math.max(1, action.qty) } : i
          )
          .filter((i) => i.qty > 0),
      };
    case "CLEAR":
      return { items: [] };
    default:
      return state;
  }
}

type CartContextType = {
  items: CartItem[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (
    product: Pick<Product, "slug" | "name" | "price" | "images" | "photos">,
    opts: { size: string; color: string; qty?: number }
  ) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextType | null>(null);
const STORAGE_KEY = "sts-cart-v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [] });
  const [isOpen, setOpen] = useState(false);

  // Hydrate from localStorage on mount.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) dispatch({ type: "HYDRATE", items: JSON.parse(raw) });
    } catch {
      /* ignore corrupt storage */
    }
  }, []);

  // Persist on change.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch {
      /* storage full / unavailable */
    }
  }, [state.items]);

  const addItem: CartContextType["addItem"] = useCallback(
    (product, { size, color, qty = 1 }) => {
      const id = `${product.slug}-${size}-${color}`;
      dispatch({
        type: "ADD",
        item: {
          id,
          slug: product.slug,
          name: product.name,
          price: product.price,
          image: product.photos?.[0] ?? product.images[0],
          size,
          color,
          qty,
        },
      });
      setOpen(true);
    },
    []
  );

  const value = useMemo<CartContextType>(() => {
    const count = state.items.reduce((n, i) => n + i.qty, 0);
    const subtotal = state.items.reduce((n, i) => n + i.qty * i.price, 0);
    return {
      items: state.items,
      count,
      subtotal,
      isOpen,
      openCart: () => setOpen(true),
      closeCart: () => setOpen(false),
      addItem,
      removeItem: (id) => dispatch({ type: "REMOVE", id }),
      updateQty: (id, qty) => dispatch({ type: "QTY", id, qty }),
      clear: () => dispatch({ type: "CLEAR" }),
    };
  }, [state.items, isOpen, addItem]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within <CartProvider>");
  return ctx;
}
