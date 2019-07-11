import React from 'react'
import numeral from 'numeral'
import PageNotFound from './page-not-found'
import Axios from 'axios';
import {ApiUrl} from './../supports/ApiUrl'
import {connect} from 'react-redux'


class SeatRes extends React.Component {
    state = {
    
        booked : [],
        chosen : []

    }
    // ComponentDidMount ke triggered setelah render pertama,
    componentDidMount(){
    //     // console.log(this.props.location.state.booked)
    //         this.setState({booked : this.props.location.state.booked})
     Axios.get(ApiUrl + '/movies/' + this.props.location.state.id) 
     .then((res)=>{
         this.setState({booked : res.data.booked})
     })
     .catch((err)=>{
         console.log(err);
         
     })
    }
    

    onSeatClick = (arr) =>{
        var chosen = this.state.chosen
        chosen.push(arr)
        
        this.setState({chosen : chosen})
        
        


    }
    onCancelSeatClick = (arr) =>{
        var chosen = this.state.chosen
        var hasil = chosen.filter((val)=>{
            return val.join('') !== arr.join('')
        })
        this.setState({chosen : hasil})
    }
    renderSeat = () => {
        var {seat,booked} = this.props.location.state
        console.log(seat + '' + booked);
        
        var arr = []
        for(var i = 0;i < seat/20;i++){
            arr.push([])
            for(var j = 0;j <seat/(seat/20);j++){
                arr[i].push(1)
            }
        }
        if(this.state.booked === [] ){

            for(var i =0; i <this.state.booked.length;i++){
                arr[this.state.booked[i][0]][this.state.booked[i][1]] = 2
            }
        }
        for(var i =0; i <this.state.chosen.length;i++){
            arr[this.state.chosen[i][0]][this.state.chosen[i][1]] = 3
        }
    console.log(arr);
    var alpha ='ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
    var jsx = arr.map((val,index)=>{
        return(
            <tr className='d-flex justify-content-center'  >
                {
                    val.map((val1,i)=>{
                        if(val1 === 2){
                            return(
                                <input type='button' disabled style={{width : '45px',height : '45px',color : 'white',textAlign : 'center'}}
                                  value={i+1  + alpha[index]} className='mr-2 mt-2 btn btn-danger'  />
                            ) 
                        }
                        if(val1 === 3){
                            return(
                                <input type='button' style={{width : '45px',height : '45px',color : 'white',textAlign : 'center'}}  value={i+1  + alpha[index]} className='mr-2 mt-2 btn btn-primary ' 
                                onClick={()=> this.onCancelSeatClick([index,i])} />

                            )
                        }
                        return(
                            <input type='button' style={{width : '45px',height : '45px'}} value={i+1 + alpha[index]} className='mr-2 mt-2 btn btn-outline-success' onClick={()=> this.onSeatClick([index,i])} />
                        )
                    })

                    
                }
            </tr>
        )
    })
    return jsx
    }
    
    onBuyClick= ()=>{
        var cart = this.props.cart
        // Post ke movie
        if(this.state.chosen.length !== 0){
            var booked = this.props.location.state.booked
            var arr = [...booked, ...this.state.chosen]
            Axios.patch(ApiUrl + '/movies/' + this.props.location.state.id,
            {booked : arr
            })
            .then((res)=>{
                console.log(res.data);
               var obj = {
                    title : this.props.location.state.title,
                    qty : this.state.chosen.length,
                    total : this.state.chosen.length * 35000,
                    seatChoosen : this.state.chosen
                }
                cart.push(obj)
                Axios.patch(ApiUrl + '/users/' + this.props.id,{
                    cart : cart
                })
                .then((res)=>{
                    alert('masuk')
                    this.setState({booked : [...this.state.booked,...this.state.chosen],chosen : []})
                })
            })
            .catch((err)=>{
                console.log(err);
            
                
            })
        }
        // Lalu Post ke users
    }
    render(){
        console.log(this.props.location.state);
        
        if(this.props.location.state === undefined){
            return(
                <PageNotFound/>
            )
        }
        return(
            <div className='container mt-5 mb-5 '>
                <h1 style={{color : 'white'}}>{this.props.location.state.title}</h1>
                <div className=''>

                <table  style={{backgroundColor : 'black'}} >
                    <thead>
                {this.renderSeat()}
                    </thead>
                   <div className='mt-5' style={{backgroundColor : 'white'
                ,width: '100%'
                ,height:'30px'
                ,border:'0.5px solid grey'
                ,textAlign :'center'
                ,fontWeight:'bolder'}}>
                    LAYAR BIOSKOP
                   </div>
                </table>
                </div>
                {this.state.chosen.length === 0 
                      ?
                      null
                      : 
                           <div className='d-flex justify-content-center mt-2' style={{textAlign:'center',color : 'white'}}>
                            Rp.
                           {numeral( this.state.chosen.length * 35000).format(0,0)   }
                        </div> }    
                        <div className=' mt-2'>
                        <input type='button' className='btn btn-success' value='buy' onClick={this.onBuyClick} />
                        </div>
            </div>
            

        )
    }
}

const mapStateToProps = (state) =>{
    return{
        id : state.user.id,
        cart : state.user.cart
    }
}

export default connect(mapStateToProps)(SeatRes)