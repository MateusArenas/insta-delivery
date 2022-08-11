import React from "react";
import { usePersistedState } from "../hooks/usePersistedState ";

interface IProduct {
  _id?: string
  id?: string
  price: number
  name: string
  quantity: number
}

interface BagContextData {
  bag: IProduct[]
  setBagItem: (product: IProduct, quantity: number) => void
  findBagItem: (product: IProduct) => IProduct | undefined
}

const BagContext = React.createContext<BagContextData>({} as BagContextData)

export const getId = (item: IProduct) => item?._id || item?.id

export const BagProvider: React.FC<any> = ({ children }) => {
  const [bag, setBag] = usePersistedState<IProduct[]>('alan-bag', [])

  const findBagItem = (product: IProduct) => bag.find(item => getId(item) === getId(product))

  const setBagItem = (product: IProduct, quantity: number) => setBag(items => {
    if (items.find(item => getId(item) === getId(product))) {
      if (quantity >= 1) {
        return items.map(item => getId(item) === getId(product) ? { ...item, ...product, quantity } : item )
      } else {  
        return items.filter(item => getId(item) !== getId(product))
      }
    } else {
      return [...items, { ...product, quantity }]
    }
  })

  return (
    <BagContext.Provider value={{ 
      bag,
      findBagItem,
      setBagItem
    }} >
      {children}
    </BagContext.Provider>
  )
}

export default BagContext