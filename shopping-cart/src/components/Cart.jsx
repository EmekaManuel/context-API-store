import React, { useState, useEffect } from "react";
import { ListGroup, Button, Row, Col, Image, Form } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { CartState } from "../Context/Context";
import Rating from "./Rating";

const Cart = () => {
  const {
    state: { cart },
    dispatch,
  } = CartState();

  const [total, setTotal] = useState();

  useEffect(() => {
    setTotal(
      cart.reduce(
        (acc, current) => acc + Number(current.price) * current.qty,
        0
      )
    );
  }, [cart]);

  return (
    <div className="home">
      <div className="productContainer">
        <ListGroup>
          {cart.map((prod) => (
            <ListGroup.Item>
              <Row>
                <Col md = {2}>
                  <Image src={prod.image} fluid rounded />
                </Col>
                <Col md = {2}>
                  <span>{prod.name}</span>
                </Col>
                <Col md={2}>$ {prod.price}</Col>
                <Col md={2}>
                  <Rating rating={prod.ratings}/>
                </Col>
                <Col md={2}>
                  <Form.Control as = "select" value={prod.qty} >
                    {
                      [...Array(prod.inStock).keys()].map((x) => (
                        <option key = {x + 1}>{x + 1}</option>
                      ))
                    }
                  </Form.Control>
                </Col>
                <Col md={2}>
                  <Button type = "button" variant = "light" 
                          onClick={() => dispatch({type: "REMOVE_FROM_CART", payload: prod})}> <AiFillDelete fontSize={20}/>

                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>

      <div className="filters summary">
        <span className="title">SubTotal: ({cart.length}) items</span>
        <span style={{ fontWeight: 700, fontSize: 20 }}>Total: ${total}</span>
        <Button type="button" disabled={cart.length === 0}>
          Proceed to CheckOut
        </Button>
      </div>
    </div>
  );
};

export default Cart;
