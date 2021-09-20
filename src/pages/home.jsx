import axios from "axios";
import React from "react";
import { Card , Image, Button} from "react-bootstrap";
import {Link}from "react-router-dom"
import "../style/home.scss"

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
    };
  }

  componentDidMount() {
    axios.get("https://shoes-ecommerce-api.herokuapp.com/product/getProduct").then((res) => {
      this.setState({ product: res.data });
    });
  }

  showProduct = () => {
    return this.state.product.map((item) => {
      return (
        <Card style={{ width: "18rem" }} classname="card">
          <Card.Img variant="top" src={item.img}  />
          <Card.Body>
            <Card.Title className="name">{item.name}</Card.Title>
            <Card.Title>IDR.{(item.price).toLocaleString()}</Card.Title>
            <Card.Title>Stock :{item.stock}</Card.Title>
            <Card.Text className="desc">{item.description}</Card.Text>
            <Button variant="primary" className="card-button" as={Link} to={`/detail/${item.idproduct}`}>Buy</Button>
          </Card.Body>
        </Card>
      );
    });
  };
  render() {
    return <div className="home" >
        <div >
            <h1 className="title">Product</h1>
        </div>
        <div className="container-product">{this.showProduct()} </div>

    </div>;
  }
}

export default Home;
