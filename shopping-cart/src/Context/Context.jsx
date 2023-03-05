import React, { useContext } from 'react'
import { createContext, useReducer } from 'react'
import { faker} from "@faker-js/faker"
import { CartReducer, FilterReducer } from './Reducers'

const Cart = createContext()
faker.seed(99);
const Context = ({children}) => {

  const products = [...Array(20)].map(() => ({
    id: faker.datatype.uuid(),
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    image: faker.image.fashion(640, 480, true),
    inStock: faker.helpers.arrayElements([0,2,3,4,5],1),
    fastDelivery: faker.datatype.boolean(),
    ratings: faker.helpers.arrayElements([1,2,3,4,5],1)
  }))
  // console.log(products)

   const [state, dispatch]= useReducer(CartReducer, {
    products: products,
    cart: []
   } )

   const [filterState, filterDispatch] = useReducer(FilterReducer, {
    byStock: false,
    byFastDelivery: false,
    byRating: 0,
    searchQuery: ""
   })

  return (
    <Cart.Provider value={{state, dispatch, filterState, filterDispatch}}>
        {children}
    </Cart.Provider>
    )
}

export default Context

export const CartState = () => {
  return useContext(Cart)
}

