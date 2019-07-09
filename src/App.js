import React from 'react';
import './App.css';
import Navbar from './pages/header'
import MovieList from './pages/movie-list'
import ManageMovie from './pages/admin/manage-movie'
import MovieDetail from './pages/movie-detail'
import Register from './pages/register'
import Login from './pages/login'
import {Route} from 'react-router-dom'
import Carrousel from './pages/carousel'
import {ApiUrl} from './supports/ApiUrl'
import Axios from 'axios'
import {OnRegisterSuccess} from './redux/Action'
import {connect} from 'react-redux'
import seatReservasion from './pages/seat-reservation'
import Jumbo from './pages/jumbotron'

class App extends React.Component{
 componentDidMount(){
   var username = localStorage.getItem('terserah')
  //  alert(username)
   if(username !== null){
     Axios.get(ApiUrl +'/users?username=' + username)
     .then((res)=>{
        console.log(res.data);
        this.props.OnRegisterSuccess(res.data[0])
        
     })
     .catch((err)=>{

     })
   }
 }

  render (){
    if(this.props.user === "" && localStorage.getItem('terserah') !== null){
      return (<p>Loading ...</p>)
    }
    return (
      <div>
        <Navbar/>
        <Route exact path='/' component={Jumbo} />
        <Route path="/movie-list" component={MovieList} />
        <Route path="/manage-movie"  component={ManageMovie}/>
        <Route path='/movie-detail' component={MovieDetail}/>
        <Route path='/register' component={Register}/>
        <Route path='/login' component={Login}/>
        <Route path='/contoh' component={Carrousel}/>
        <Route path='/seat-reservation' component={seatReservasion} />
      </div>
    );
  }
  }

  const mapStateToProps = (state) =>{
    return{
      user : state.user.username
    }
  }


export default connect(mapStateToProps,{OnRegisterSuccess}) (App);
