import React from "react";
import { Table, Button, FormControl, Form, Modal, Toast } from "react-bootstrap";
import { connect } from "react-redux";
import {deleteProduct,editProduct, getCart, onCheckout} from "../redux/action"

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state={
        indexEdit : null,
        qty : null,
        form : false,
        tos :false,
        indexCheckout : null,
        checkoutAll : false
        
    }
  }

  componentDidMount(){
    let iduser = localStorage.getItem("token")
    this.props.getCart(iduser)
    console.log(iduser)
  }

  showTableHead = () => {
    return (
      <thead>
        <tr>
          <th>No</th>
          <th>Name</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Action</th>
          <th>Payment</th>
        </tr>
      </thead>
    );
  };


  showTableCart = () => {
    const {indexEdit}=this.state
    return this.props.cart.map((item, index) => {
        if(index === indexEdit){
            return (
                <tbody>
                  <tr>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td><div style={{display:"flex"}}>
                    <Button variant="warning" onClick={this.onMinus} disabled={this.state.qty ===1} >-</Button>
                    <Form.Control type="number" value={this.state.qty} onChange={(e)=> this.onChangeQty(e, item.quantity)}  defaultValue={(item.quantity)} />
                    <Button variant="warning" onClick={this.onPlus} disabled={this.state.qty=== item.stock} >+</Button>
                    </div></td>
                    <td>{item.quantity * item.price}</td>
                    <td><Button variant="warning" onClick={()=> this.onSave(index)}>Save</Button>{' '}
                <Button variant="warning" onClick={()=>this.setState({indexEdit: null, qty:null})}>Cancel</Button>
                </td>
                <td><Button variant="warning" disabled={true} >Checkout</Button></td>

                  </tr>
                </tbody>
              )

        }
      return (
        <tbody>
          <tr>
            <td>{index + 1}</td>
            <td>{item.name}</td>
            <td>{item.quantity}</td>
            <td>{(item.quantity * item.price).toLocaleString()}</td>
            <td>
              <Button variant="warning" onClick={()=>this.onEdit(index)}>Edit</Button> 
              <Button variant="warning" onClick={()=>this.onDelete(index)}>Delete</Button>
            </td>
            <td><Button variant="warning" onClick={()=>this.onCheckoutPage(index)}>Checkout</Button></td>
          </tr>
        </tbody>
      );
    });
  };

  onPlus =()=>{
      this.setState({qty : this.state.qty +1})
  }

  onMinus =()=>{
      this.setState({qty : this.state.qty -1})
  }

  onEdit =(index)=>{
    console.log(index)
      this.setState({indexEdit : index, qty:this.props.cart[index].quantity})
  }
  onDelete =(index)=>{
      // this.props.deleteProduct(this.props.id, index)
      console.log(this.props.cart[index].idcart)
      let data ={
        idcart : this.props.cart[index].idcart
      }

      this.props.deleteProduct(data)
  }

  onSave=(index)=>{
    // console.log(this.state.cart[index])
      this.setState({indexEdit : null})
      let data ={
        quantity : this.state.qty,
        totalPrice : this.props.cart[index].price * this.state.qty,
        idcart : this.props.cart[index].idcart
      }
      console.log(data)
      console.log(this.props.cart[index])
      this.props.editProduct(data)
  }

  onCheckoutPage =(index)=>{
    console.log(index)
      if(this.props.cart.length ===0){
          return this.setState({tos : true})
      }
      else if(index===null){
        this.setState({form :true, checkoutAll:true})
        console.log("yes")
        return
      }else{
        this.setState({form :true, indexCheckout :index})
      }
  }

  onOke =()=>{
    const {indexCheckout,checkoutAll}= this.state
      // let data ={
      //     email : this.props.email,
      //     product : checkoutAll===true ? [this.props.cart] : [this.props.cart[indexCheckout]]
      // }
      if(checkoutAll===true){
        let data ={
          email : this.props.email,
          product : this.props.cart
        }
        console.log(data)
      // console.log(checkoutAll)
      this.setState({form : false, indexCheckout : null, checkoutAll: false})
      this.props.onCheckout(data.product, data.email)

      // for(let i=0; i<data.product.length; i++){
      //   console.log(data.product[i])
      // }
      }else{
        let productItem =[]
        productItem.push(this.props.cart[indexCheckout])
        let data ={
          email : this.props.email,
          product : productItem
        }
        console.log(data)
      
      this.setState({form : false, indexCheckout : null, checkoutAll: false})
      this.props.onCheckout(data.product, data.email)

      // for(let i=0; i<data.product.length; i++){
      //   console.log(data.product[i])
      // }
      }
      // console.log(indexCheckout)
      // console.log(data)
      // console.log(checkoutAll)
      // this.setState({form : false, indexCheckout : null, checkoutAll: false})

      // for(let i=0; i<data.product.length; i++){
      //   // console.log(data.product[i])
      //   this.props.onCheckout(data.product[i], data.email)
      // }

      
  }


  render() {
    return (
      <div style={{width:"80vw", margin:"auto", marginTop:"5vh"}}>
        <h1 style={{textAlign:"center"}}>Cart Detail</h1>
        <Table striped bordered hover variant="dark">
          {this.showTableHead()}
          {this.showTableCart()}
        </Table>
       <div>
       <Button variant="success" onClick={()=>this.onCheckoutPage(null)}>Checkout All</Button>
       </div>



        <Modal show={this.state.form} onHide={() => this.setState({ form: false })}>
          <Modal.Header closeButton>
            <Modal.Title>Hore selangkah lagi kamu menyelesaikan belanjaan kamu</Modal.Title>
          </Modal.Header>
          <Modal.Body> Silahkan checkout belanjaan kamu</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.onOke}>
              Oke
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={this.state.tos} onHide={() => this.setState({ tos : false })}>
          <Modal.Header closeButton>
            <Modal.Title>Error</Modal.Title>
          </Modal.Header>
          <Modal.Body>Keranjang belanjamu kosong</Modal.Body>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    iduser : state.userReducer.iduser,
    cart : state.userReducer.cart,
    email : state.userReducer.email
  };
};

export default connect(mapStateToProps, {deleteProduct, editProduct, getCart, onCheckout})(Cart);
