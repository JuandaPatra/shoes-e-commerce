import React from "react";
import { Button, Table, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { waitPayment, FixPayment, cancelBuy } from "../redux/action";
import "../style/checkPayment.scss"

class Payment extends React.Component {
  componentDidMount() {
    let id = localStorage.getItem("token");
    console.log(this.props.iduser)
    this.props.waitPayment(id);
  }

  showTableHead = () => {
    return (
      <thead>
        <tr>
          <th>No</th>
          <th>Name</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Status</th>
          <th>Action</th>
          <th>Payment</th>
        </tr>
      </thead>
    );
  };
  showTableCart= () =>{
    return(
      this.props.waitPay.map((item, index)=>{
        return(
      <tbody>
      <tr>
        <td>{index + 1}</td>
        <td>{item.name}</td>
        <td>{item.quantity}</td>
        <td>{(item.totalPrice).toLocaleString()}</td>
        <td>
          {item.status}
        </td>
        <td><Button variant="warning" onClick={()=>this.onCancelBuy(index)}>Delete</Button></td>
        <td><Button variant="warning" onClick={()=>this.onPayment(index)}>Checkout</Button></td>
      </tr>
    </tbody>
        )
      })
    )
  }
  onPayment =(index)=>{
    let data ={
      iduser : this.props.waitPay[index].iduser,
      idcart : this.props.waitPay[index].idcart,
      email : this.props.email
    }
    // console.log(data)
    this.props.FixPayment(data)
  }

  onCancelBuy =(index)=>{
    // console.log(this.props.waitPay[index])
    let data ={
      idcart : this.props.waitPay[index].idcart,
      idproduct : this.props.waitPay[index].idproduct
    }
    // console.log(data)
    this.props.cancelBuy(data)
  }
  render() {
    return (
      <div className="checkpay">
        <Button variant="success" className="buyall">Buy now</Button>
        <h1 style={{textAlign:"center"}}>Checkout</h1>
        <div className="tabel">
        <Table striped bordered hover variant="dark">
          {this.showTableHead()}
          {this.showTableCart()}
        </Table>

        </div>


        <Modal show={false} >
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" >
            Close
          </Button>
          <Button variant="primary" >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    waitPay: state.historyReducer.payment,
    iduser : state.userReducer.iduser,
    email : state.userReducer.email
  };
};

export default connect(mapStateToProps, { waitPayment, FixPayment, cancelBuy })(Payment);
