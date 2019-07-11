import React from 'react'
import Axios from 'axios'
import {connect} from 'react-redux'
import {ApiUrl} from './../supports/ApiUrl'
import {Table, TableBody,TableCell,TableRow,TableHead,Paper, Container, } from '@material-ui/core'
import numeral from 'numeral'




class Cart extends React.Component{
    state ={
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
                <TableCell>{val.seatChoosen.length}</TableCell>

            </TableRow>
        )

    })

    return jsx
}







    render(){
        return(
            <Container fixed>
                <Paper>
                    <Table>
                        <TableHead>
                        <TableCell>Title Movies</TableCell>
                        <TableCell>Person</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Seats</TableCell>
                        </TableHead>
                        <TableBody>
                        {this.renderCart()}
                        </TableBody>
                    </Table>
                </Paper>           
            </Container>
        )

        
    }
}

const mapStateToProps = (state) =>{
    return{
        idUser : state.user.id
    }
}
export default connect(mapStateToProps)(Cart)