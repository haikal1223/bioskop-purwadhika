import React from 'react'
import {Table, TableBody,TableCell,TableRow,TableHead,Paper, Container, TableFooter } from '@material-ui/core'
import Axios from 'axios';
import {connect} from 'react-redux'
import { ApiUrl } from '../supports/ApiUrl';
import numeral from 'numeral'


class Transaction extends React.Component{
   state={
        checkout : [],
        date : ''
   }
   componentDidMount(){
       Axios.get(ApiUrl + '/users/' + this.props.idUser)
       .then((res)=>{
       this.setState({checkout : res.data.cart})

       })
       .catch((err)=>{
           console.log(err);
           
       })
       var date = new Date().getDate(); //Current Date
       var month = new Date().getMonth() + 1; //Current Month
       var year = new Date().getFullYear(); //Current Year
       this.setState({date :date +','+month+','+year})

   }
  

   renderData = () =>{
       let jsx =this.state.checkout.map((val)=>{
           return(
               <TableRow>
                   <TableCell>{this.state.date}</TableCell>
                   <TableCell>{val.title.length}</TableCell>
                   <TableCell>Rp.{numeral(val.total).format(0,0)}</TableCell>
                   <TableCell><input type='button' className='btn btn-primary'/></TableCell>
               </TableRow>
           )
       })
       return jsx
   }

    render(){


        return(
            <div className='container'>
               <center>
                   <h1>
                       HISTORY TRANSACTION
                   </h1>
               </center>
                    <Paper>
                        <Table>
                            <TableHead>
                            <TableCell>Tanggal</TableCell>
                            <TableCell>Jumlah Item</TableCell>
                            <TableCell>Total Harga</TableCell>
                            <TableCell>Detail</TableCell>
                            </TableHead>
                           {this.renderData()}
                           </Table>
                    </Paper>           
               
            </div>

        )
    }
}
const mapStateToProps = (state) =>{
    return{
        idUser : state.user.id
    }
}

export default connect(mapStateToProps) (Transaction)