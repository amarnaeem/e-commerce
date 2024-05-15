import { createContext, useState, ReactNode, useContext, useEffect, useCallback, Dispatch, SetStateAction } from "react";

export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
  description: string
}

interface AppContextProps {
  isLoading: boolean;
  open: boolean;
  onClose: () => void;
  setIsLoading: (isLoading: boolean) => void;
  cart: Product[];
  addToCart: (product: Product) => void;
  removeProduct: (productId: number) => void;
  incrementProduct: (productId: number) => void;
  decrementProduct: (product: Product) => void;
  showDrawer: () => void; 
  setCart: Dispatch<SetStateAction<Product[]>>;
}

const initialAppContext: AppContextProps = {
  isLoading: false,
  setIsLoading: () => {},
  cart: [],
  addToCart: () => {},
  removeProduct: () => {},
  incrementProduct: () => {},
  decrementProduct: () => {},
  open: false, 
  onClose: () => {},
  showDrawer: () => {},
  setCart: () => {}
};

export const AppContext = createContext<AppContextProps>(initialAppContext);

export const useAppContext = () => useContext(AppContext);

export default function Context({ children }: { children: ReactNode }): JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const initialCart: Product[] = JSON.parse(localStorage.getItem('cartItems') ?? '[]');
  const [cart, setCart] = useState<Product[]>(initialCart);
  // const [cart, setCart] = useState<Product[]>(localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []);
  const [open, setOpen] = useState<boolean>(false); 

  const showDrawer = useCallback(() => { 
    setOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setOpen(false);
  }, []);

  const addToCart = useCallback((item: Product) => {
    setCart(prevCart => {
      const isItemInCart = prevCart.find((cartItem) => cartItem.id === item.id);
      if (isItemInCart) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  }, []);

  const removeProduct = useCallback((productId: number) => {
    setCart(prevCart => prevCart.filter((product) => product.id !== productId));
  }, []);

  const decrementProduct = useCallback((item: Product) => {
    setCart(prevCart => {
      const isItemInCart = prevCart.find((cartItem) => cartItem.id === item.id);
      if (isItemInCart?.quantity === 1) {
        return prevCart.filter((cartItem) => cartItem.id !== item.id);
      } else {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
      }
    });
  }, []);

  const incrementProduct = useCallback((productId: number) => {
    setCart(prevCart => prevCart.map((product) =>
      product.id === productId ? { ...product, quantity: product.quantity + 1 } : product
    ));
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const cartItems = localStorage.getItem("cartItems");
    if (cartItems) {
      setCart(JSON.parse(cartItems));
    }
  }, []);

  const values: AppContextProps = {
    isLoading,
    setIsLoading,
    cart,
    addToCart,
    removeProduct,
    incrementProduct,
    decrementProduct,
    showDrawer,
    onClose,
    open,
    setCart
  };

  return (
    <AppContext.Provider value={values}>
      {children}
    </AppContext.Provider>
  );
}
