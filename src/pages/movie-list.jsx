import React from 'react'
import Axios  from 'axios'
import {Link} from 'react-router-dom'

import { connect} from 'react-redux'


class MovieList extends React.Component{

    state = { data : []
            
    }
    

    componentDidMount(){
        this.getDataMovies()
    }
    
     getDataMovies = () => {
         Axios.get('http://localhost:2000/movies')
         .then((res) => {
            this.setState({data : res.data})    
            console.log('test' + res.data);
                     
         })
         .catch((err) =>{
             console.log(err);
             
         })
    }

    onPrintList = () =>{
        // console.log(this.state.data);
       
        
        var jsx = this.state.data.map((val)=>{
            return(


            <div className='mt-2 mr-2'>
                <div>
                    
                    <div className=' mycard'>
                    <div className='duration'>
                        <span className='text-uppercase'>{val.duration} Min</span>
                        </div>
                        <Link to={'/movie-detail?id=' + val.id}>
                        <img src={val.img} alt='Movie'     />
                        </Link>
                       
                        <div className='container'>
                        <div className = 'judul-container'>
                            <p className='judul'>{val.title}</p>

                         </div>
                        <p className='sutradara'>{val.sutradara}</p>
                        <div className='genre rounded-pill'>{val.genre}</div>
                        </div>
                    </div>

                </div>


            </div>
            )
        })
        return jsx
        
    }

    render(){
      
        return(
            
            <div className='container mt-5'>

               { this.props.abcd !== ""?
                <div className='alert alert-success'>
                    Hello , Welcome Back  {this.props.abcd}
                </div>: null
                }   
            <div className='row'>
                {this.onPrintList()}

            </div>
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return{
        abcd : state.user.username
    }
}

export default connect(mapStateToProps)(MovieList)
