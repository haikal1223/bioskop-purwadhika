import React from 'react'
import Axios from 'axios'
import {connect} from 'react-redux'
import {ApiUrl} from './../supports/ApiUrl'
import {Table, TableBody,TableCell,TableRow,TableHead,Paper,  TableFooter } from '@material-ui/core'
import numeral from 'numeral'
import {Redirect} from 'react-router-dom'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {Link} from 'react-router-dom'



class Cart extends React.Component{
    state ={
        modalOpen : false ,
        cartUser : [],
        booked : []
    }

    componentDidMount(){
        Axios.get(ApiUrl + '/users/' + this.props.idUser) 
     .then((res)=>{
         this.setState({cartUser : res.data.cart})
     })
     .catch((err)=>{
         console.log(err);
         
     })
    
    }
   checkHargaCart = () =>{
        var isi = this.props.qty.length
        if(isi !== 0 ){
            var hasil = 0
            for(var i = 0; i< isi; i++ ){
                hasil += isi[i] * 35000

            }
        }
        return hasil
        
    }
renderCart =()=>{
    // var alpha ='ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
    // var {} =
    // let dataCart = 
    // // let alphaSeat = []
    // let seatNumber = this.state.booked
    //     // for(var j = 0;j < alpha.length;j++){
    //     //     if(dataCart.seatChoosen[0][j] === j){
    //     //         alphaSeat.push(alpha[j],dataCart.seatChoosen[j][1])
    //     //     }
    //     // }
    // console.log(seatNumber);
    
    
    let jsx = this.state.cartUser.map((val,index)=>{
        return(
            <TableRow>   
                <TableCell>{val.title}</TableCell>
                <TableCell>{val.qty}  </TableCell>
                <TableCell>Rp.{numeral(val.total).format(0,0)}</TableCell>
            </TableRow>
            
        )

    })

    return jsx
}
    closeModal = () => {
        this.setState({modalOpen : false})
    }
    render(){
        if(localStorage.getItem('terserah') === null) {
            return (<div> 
                    <Modal isOpen={this.state.modalOpen} toggle={this.closeModal}>
                        <ModalHeader>
                            Silahkan Login Terlebih Dahulu
                        </ModalHeader>
                    </Modal>
                <Redirect to='/' />
            </div>
                
            )
        }else{
            
        
        return(
            <div className='container'>
                <center>

                    <h1>CART</h1>
                </center>
                    <Paper>
                        <Table>
                            <TableHead>
                            <TableCell>Title Movies</TableCell>
                            <TableCell>qty</TableCell>
                            <TableCell>Price</TableCell>
                            </TableHead>
                            <TableBody>
                            {this.renderCart()}
                            </TableBody>
                            <TableFooter>
                            {this.checkHargaCart}
                            </TableFooter>
                           </Table>
                    </Paper>           
                <div>

                    <Link to='/movie-list'>
                    <input type='button' value="Lanjutkan Belanja" className='btn btn-primary mt-2 mr-2' />
                    </Link>
                    <Link to='/transaction'>
                    <input type='button' value="CheckOut" className='btn btn-success mt-2 mr-2' />
                    </Link>
                </div>
            </div>

        )

        
    }
}
}

const mapStateToProps = (state) =>{
    return{
        idUser : state.user.id
    }
}
export default connect(mapStateToProps)(Cart)