import React from 'react'
import numeral from 'numeral'

class SeatRes extends React.Component {
    state = {
        seats : 100 ,
        baris : 5,
        booked : [[2,4] , [3,5]],
        chosen : [ ],
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
        var arr = []
        for(var i = 0;i < this.state.baris;i++){
            arr.push([])
            for(var j = 0;j <this.state.seats/this.state.baris;j++){
                arr[i].push(1)
            }
        }

        for(var i =0; i <this.state.booked.length;i++){
            arr[this.state.booked[i][0]][this.state.booked[i][1]] = 2
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
    



    

    render(){
        return(
            <div className='container mt-5 mb-5 '>
                <h1 style={{color : 'white'}}>Order Seat Here</h1>
                <div className='row justify-content-center'>

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
            </div>

        )
    }
}

export default SeatRes