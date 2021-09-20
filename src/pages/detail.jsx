import React from "react";
import axios from "axios";
import { Button, Image,Alert, Toast, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import "../style/detail.scss"
import {addCart} from "../redux/action"

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      stock: null,
      qtybuy: 1,
      alert : false,
      successCart :false,
      id : false
    };
  }
  componentDidMount() {
    axios.get(`https://cors-anywhere.herokuapp.com/https://shoes-ecommerce-api.herokuapp.com/product/getProductbyId/${this.props.match.params.id}`).then((res) => {
      this.setState({ products: res.data[0], stock: res.data[0].stock });
    });
  }

  onAdd = () => {
    
    this.setState({ qtybuy: this.state.qtybuy + 1 });
    
  };

  onMinus = () => {
    if(this.state.qtybuy <=1){
      return this.setState({alert:true})
    }
    this.setState({ qtybuy: this.state.qtybuy - 1 })
    
  };

  onBuytoCart =()=>{
      const {products, qtybuy} =this.state

      if(!this.props.iduser){
        return this.setState({id : true})
      }
      let data ={
          iduser : this.props.iduser,
          price : products.price,
          quantity : qtybuy,
          status : 'belum bayar',
          idproduct : products.idproduct,
          date :  new Date
      }

    console.log(data)
    this.props.addCart(data)
    this.setState({successCart :true})
      
  }



  render() {
    if (this.state.qtybuy===this.state.stock) {
      return (
        <Alert variant="danger" onClose={() =>  this.setState({ qtybuy: this.state.qtybuy - 1 })} dismissible>
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>
            Change this and that and try again. Duis mollis, est non commodo
            luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
            Cras mattis consectetur purus sit amet fermentum.
          </p>
        </Alert>
      );
    }
    return (
      <div className="detail">
        <h1>Page Detail</h1>
        
        <div className="container">
            <div className="container-image">
          <Image src={this.state.products.img ? this.state.products.img : ""}  className="images"/>

            </div>
            <div className="container-desc">
            <Button variant="success" onClick={this.onBuytoCart}> Buy</Button>
          <h1>{this.state.products.name ? this.state.products.name : ""}</h1>
          <p>{this.state.products.description ? this.state.products.description : ""}</p>

          <p>stock {this.state.stock ? this.state.stock : ""}</p>
          <div style={{display:"flex"}}>

          <Button variant="success" onClick={this.onMinus} >
            {" "}
            -
          </Button>
          <p>{this.state.qtybuy}</p>
          <Button variant="success" onClick={this.onAdd} disabled={this.state.qtybuy ===this.state.stock ? true : false}>
            {" "}
            +
          </Button>
          </div>
          
            </div>
        </div>
     

        <Modal show={this.state.successCart} onHide={() => this.setState({ successCart :false })}>
          <Modal.Header closeButton>
            <Modal.Title>Selamat berbelanja</Modal.Title>
          </Modal.Header>
          <Modal.Body> Selamat data masuk ke keranjang</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={()=> this.setState({successCart : false})}>
              Oke
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={this.state.id} onHide={() => this.setState({ id :false })}>
          <Modal.Header closeButton>
            <Modal.Title>Warning</Modal.Title>
          </Modal.Header>
          <Modal.Body> Anda belum login</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={()=> this.setState({id : false})}>
              Oke
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={this.state.alert} onHide={() => this.setState({ alert:false })}>
          <Modal.Header closeButton>
            <Modal.Title>warning</Modal.Title>
          </Modal.Header>
          <Modal.Body> pembelian minimal 1</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={()=> this.setState({alert :false})}>
              Oke
            </Button>
          </Modal.Footer>
        </Modal>
        
      </div>
    );
  }
}
const mapStateToProps=(state)=>{
    return{
        email : state.userReducer.email,
        iduser :state.userReducer.iduser
    }
}
export default connect (mapStateToProps, {addCart}) (Detail);
