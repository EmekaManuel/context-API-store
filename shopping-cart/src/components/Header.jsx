import React from "react";
import { Navbar, Container, FormControl, Dropdown, Nav, Badge, Button } from "react-bootstrap";
import {FaShoppingCart} from "react-icons/fa"
import {Link} from "react-router-dom"
import { CartState } from "../Context/Context";

const Header = () => {

  const {state: {cart}, dispatch, filterDispatch} = CartState();

  
  return (
    <Navbar bg="dark" variant="dark" style={{ height: 80 }}>
      <Container>
        <Navbar.Brand>
          <Link to="/">Shopping Cart</Link>
        </Navbar.Brand>
        <Navbar.Text className="search">
          <FormControl
            onChange = {
              (e) => {(
                filterDispatch({
                  type: "FILTER_BY_SEARCH",
                  payload: e.target.value
                })
              )}
            }
            className="m-auto"
            placeholder="search a product"
            style={{ width: 500 }}
          ></FormControl>
        </Navbar.Text>
        <Nav>
            <Dropdown alignRight>

          <Dropdown.Toggle variant="success">
            <FaShoppingCart color="white" fontSize="25px"/>
            <Badge>{cart.length}</Badge> {/**some random number */}
          </Dropdown.Toggle>
          <Dropdown.Menu style={{minWidth: 370}}>
            {
              cart.length > 0 ? (
                <>
                <div>
                  {
                    cart.map((prod) => (
                      <span className="cartItem" key={prod.id}>
                        <img src={prod.image} className="cartItemImg" alt={prod.name} />
                        <div className="cardItemDetail">
                          <span>{prod.name}</span>
                          <span>{prod.price.split("."[0])}</span>
                        </div>
                        <div onClick={() => dispatch({type: "REMOVE_FROM_CART", payload: prod})}>X</div>
                      </span>
                    ))
                  }
                </div>
                <Link to = "/cart">
                  <Button style = {{width: "95%", margin: "0 10px"}}>Go To Cart</Button>
                </Link>
              </>) : (

                <span style = {{padding: 10}}> Cart is Empty</span>
              )
            }
          </Dropdown.Menu>
            </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
