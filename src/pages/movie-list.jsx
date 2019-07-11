import React from 'react'
import Axios  from 'axios'
import {Link} from 'react-router-dom'
import {Redirect} from 'react-router-dom'
import { connect} from 'react-redux'


class MovieList extends React.Component{

    state = { data : [],
            userLogin : ''
    }
    

    componentDidMount(){
        let user = localStorage.getItem('terserah')
        if(user !== null){
            console.log(user)
            this.setState({userLogin : user})
        }
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
                    <div className=' mycard'>
                        <div className='poster'>

                   
                        <Link to={'/movie-detail?id=' + val.id}>
                            
                        <img src={val.img} alt='Movie'     />
                        </Link>
                        </div>
                       
                        <div className='container'>
                        <div className = 'judul-container'>
                            <p className='judul'>{val.title}</p>

                         </div>
                        <p className='sutradara'>{val.sutradara}</p>
                        <div className='genre rounded-pill'>{val.genre}</div>
                        </div>
                    </div>
            </div>
            )
        })
        return jsx
        
    }

    render(){
        if(localStorage.getItem('terserah') === null) {
            return (
                <Redirect to='/' />
            )
        }else{
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
}

const mapStateToProps = (state) => {
    return{
        abcd : state.user.username
    }
}

export default connect(mapStateToProps)(MovieList)
