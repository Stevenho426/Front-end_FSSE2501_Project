import {createContext, useContext, useEffect, useState} from "react";
import type {GetCartItemsDtoType} from "../src/data/GetCartItemsDto.type.ts";
import {LoginUserContext} from "./LoginUserContext.ts";


type CartItemContext = {
  cartItemList: GetCartItemsDtoType[];
  setCartItemListContext: (items: GetCartItemsDtoType[]) => void;
}

// const LOCAL_STORAGE_KEY = "cartItemList";

export const CartItemContext = createContext({} as CartItemContext);

export function CartItemProvider({children}: {children: React.ReactNode}) {

  const loginUser = useContext(LoginUserContext);
  const userKey = loginUser?.email??"guest";
  const [cartItemList, setCartItemList] = useState<GetCartItemsDtoType[]>([]);
  const [isReady, setIsReady] = useState(false);

  const LOCAL_STORAGE_KEY = `cartItemList_${userKey}`;

  useEffect(() => {
    if(!LOCAL_STORAGE_KEY) {
      return;
    }

      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      setCartItemList(stored ? JSON.parse(stored) : []);
      setIsReady(true);

  }, [LOCAL_STORAGE_KEY]);

  // const [cartItemList, setCartItemList] = useState<GetCartItemsDtoType[]>(() => {
  //   const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  //   return stored ? JSON.parse(stored) : [];
  // });


  const setCartItemListContext = (items: GetCartItemsDtoType[]) => {
    setCartItemList(items);
    if(LOCAL_STORAGE_KEY){
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
    }
  };

  useEffect(() => {
    if (!LOCAL_STORAGE_KEY) {
      setCartItemList([]);
      setIsReady(false);
    }
  }, [loginUser]);

  if (!isReady) return null;

  // useEffect(() => {
  //   if (cartItemList.length === 0) {
  //     localStorage.removeItem(LOCAL_STORAGE_KEY);
  //   }
  // }, [cartItemList, LOCAL_STORAGE_KEY]);

  return (
    <CartItemContext.Provider value={{ cartItemList, setCartItemListContext }}>
      {children}
    </CartItemContext.Provider>
  );
}


