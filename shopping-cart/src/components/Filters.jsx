// import React, { useState } from 'react'
import {Form, Button} from "react-bootstrap"
import { CartState } from '../Context/Context'
import Rating from './Rating'

const Filters = () => {
    // const [rating, setRating] = useState(1)
    const {filterState: {byStock, byFastDelivery, sort, byRating }, filterDispatch} = CartState()

    return (
    <div className='filters'>
        <span className='title'>Filter Products</span>
        <span>
            <Form.Check
            onChange ={() => filterDispatch({
                type: "SORT_BY_PRICE",
                payload: "lowToHigh",
            })}
            checked = {sort === "lowToHigh" ? true : false}
            inline
            label = "Ascending"
            name = "group1"
            type="radio"
            id = {`inline-1`}>
            </Form.Check>
        </span>
        <span>
            <Form.Check
                 onChange ={() => filterDispatch({
                    type: "SORT_BY_PRICE",
                    payload: "highToLow",
                })}
                checked = {sort === "highToLow" ? true : false}
            inline
            label = "Descending"
            name = "group1"
            type="radio"
            id = {`inline-2`}>
            </Form.Check>
        </span>
        <span>
            <Form.Check
            onChange = {() => filterDispatch({
                type: "FILTER_BY_STOCK"
            })}
            checked = {byStock}
            inline
            label = "Include Out Of Stock"
            name = "group1"
            type="checkbox"
            id = {`inline-3`}>
            </Form.Check>
        </span>
        <span>
            <Form.Check
            onChange = {() => filterDispatch({
                type: "FILTER_BY_DELIVERY"
            })}
            checked = {byFastDelivery}
            inline
            label = "Fast Delivery"
            name = "group1"
            type="checkbox"
            id = {`inline-4`}>
            </Form.Check>
        </span>
        <span>
            <label style={{paddingRight:10}} >Rating:</label>
            <Rating
                onClick={(i) => filterDispatch({
                    type: "FILTER_BY_RATING",
                    payload: i + 1
                })} 
                rating= {byRating} 
                style={{cursor: "pointer"}}/>
        </span>
        <Button 
           onClick = {() => filterDispatch({
            type: "CLEAR_FILTERS"
        })}
        checked = {byStock}
        variant="light">Clear Filters</Button>
    </div>
  )
}

export default Filters