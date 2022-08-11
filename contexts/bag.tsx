import React from "react";
import { usePersistedState } from "../hooks/usePersistedState ";

interface IProduct {
  _id?: string
  id?: string
  price: number
  name: string
}

interface BagContextData {
  bag: IProduct[]
  saveInBag: (product: IProduct) => void
  updateInBag: (id: string, product: IProduct) => void
  removeInBag: (id: string) => void
}

const BagContext = React.createContext<BagContextData>({} as BagContextData)

const getId = (item: IProduct) => item?._id || item?.id

export const BagProvider: React.FC<any> = ({ children }) => {
  const [bag, setBag] = usePersistedState<IProduct[]>('alan-bag', [])

  function saveInBag(product: IProduct) {
    setBag(items => [...items, product])
  }

  function updateInBag(id: string, update: Partial<IProduct>) {
    setBag(items => items.map(item => getId(item) === id ? { ...item, ...update } : item))
  }

  function removeInBag(id: string) {
    setBag(items => items.filter(item => getId(item) !== id))
  }

  function setBagItem(product: IProduct, quantity: number) {
    // setBag(items => items.map(item => {
    //   if (getId(item) === getId(product)) { //exists
    //     return ({ ...item, ...product, quantity })
    //     if (quantity) {
    //     } else {

    //     }

    //   } else { //not exists

    //   }
    // }).filter(item => quantity ? true : (getId(item) === getId(product)) )
    // )
    setBag(items => {
      const findItem = items.find(item => getId(item) === getId(product))

      if (findItem) {
        if (quantity) {

        } else {
          
        }
      } else {
        return [...items, { ...product, quantity }]
      }

    })
  }

  return (
    <BagContext.Provider value={{ 
      bag,
      saveInBag,
      updateInBag,
      removeInBag
    }} >
      {children}
    </BagContext.Provider>
  )
}

export default BagContext