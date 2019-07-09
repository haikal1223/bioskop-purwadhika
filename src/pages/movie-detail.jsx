import React from 'react'
// import query from 'querystring'
import Axios from 'axios';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import Slider from 'react-slick'

// Dari Movie List kirim Id ke Movie Detail
// Di Movie Detail kita get movie berdasarkan ID
// DapetData, kemudian taruh di state
// Lalu State di render

class MovieDetail extends React.Component{
    state={
        data : null,
        login : null
    }
    componentDidMount(){
        var id = this.props.location.search.split('=')[1]
        Axios.get('http://localhost:2000/movies/' + id)
        .then((res)=>{
            console.log(res.data)
            this.setState({data : res.data})
            
        })
        .catch((err)=>{
            console.log(err);
            
        })
        
    }
    OnBuyTicketClick = () =>{
        if(this.props.user.id === 0){
            this.setState({login : false})
        }
    }

    render(){
        
      

        if(this.state.login === false){
            return(
                <Redirect to='/login' />
            )
        }
        if(this.state.data===null){
            return (<p>Loading.... </p>)
        }
        return(
            <div className='container mt-5 mb-5'>

                <div className='row'>
                    <div className='col-md-4'>
                        <img height='430px' src={this.state.data.img}></img>
                    </div>
                    <div className='col-md-8'>
                        <h1>{this.state.data.title}</h1>
                        <p>{this.state.data.genre}</p>
                        <h5>{this.state.data.sutradara}</h5>
                        <p>{this.state.data.duration} Minute</p>
                        <p>{this.state.data.playingAt.join(',')}</p>
                        <p style={{fontStyle:'italic'}}>{this.state.data.sinopsis}</p>
                        <input type="button" className='btn btn-primary' value='BUY NOW' onClick={this.OnBuyTicketClick}/>
                    </div>
                    <div>

                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        user : state.user
    }
}
export default connect(mapStateToProps)(MovieDetail)