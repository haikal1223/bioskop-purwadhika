import React from 'react'
import Slider from 'react-slick'
import './../../node_modules/slick-carousel/slick/slick.css'
import './../../node_modules/slick-carousel/slick/slick-theme.css'
import Axios from 'axios';
import {ApiUrl} from './../supports/ApiUrl'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {OnRegisterSuccess} from './../redux/Action'
import {Redirect} from 'react-router-dom'

class Jumbotron extends React.Component{
    state = {
        data : []
    }
    componentDidMount(){
        Axios.get(ApiUrl + '/movies')
        .then((res) =>{
            this.setState({data : res.data})
            
            
        })
        .catch((err)=>{
            console.log(err);
            
        })
    }
    onSlider = () =>{
        console.log(this.state.data);
        
        var jsx = this.state.data.map((val)=>{
           return(
            <div >
            <img src={val.img} alt="Gambar" style={{ width: "100%",
  height: "70%",border: '10px solid transparent',padding : '15px', borderImageSlice:'30',
  borderImageSource:'url("https://www.pinclipart.com/picdir/middle/235-2358916_film-border-cliparts-png-download.png");'}}/>

            </div>
           )
        })
        return jsx
    }
    render(){
        var settings = {
            arrows:false,
            draggable : false,
            infinite: true,
            autoplay: true,
            speed: 1000,
            autoplaySpeed : 3500,
            slidesToShow: 1 ,
            slidesToScroll: 1
          };
          if(localStorage.getItem('terserah') !== null) {
              return (
                  <Redirect to='/movie-list' />
              )
          } else {
            return(
                <div className='main-container'>
                    <div class="jumbotron bg-transparent text-white">
                        <div className='container'>
                            <div className='row'>
                                <div className='col-md-8'>
                                <h1 class="display-4">Dapatkan Tiket Film Kesayanganmu <br/> SEKARANG!</h1>
                                <p class="lead">Kunjungi Bioskop terdekatmu dan dapatkan promo menarik !!!</p>
                                <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
                               <Link to='/login'>
                               <div className='btn btn-outline-info' > 
                               Login
                               </div>
                               </Link>
                                </div>
                                <div className='col-md-4' style={{border :'3px solid green '}}>
                                   <h1 class='display-4'> Now Showing</h1>
                                <Slider {...settings}>
                                    {this.onSlider()}
                                    </Slider>
                                </div>
                            </div>
                        </div>
                       
                        </div>   
                      
                </div>
            )
          }
            
        
    }
}

const mapStateToProps= (state) =>{
    return{
        afterLogin : state.user.id
    }
}
export default connect(mapStateToProps, {OnRegisterSuccess}) (Jumbotron)