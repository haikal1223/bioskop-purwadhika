import React from 'react'
import Slider from "react-slick";
import './../../node_modules/slick-carousel/slick/slick.css'
import './../../node_modules/slick-carousel/slick/slick-theme.css'

class MultipleItems extends React.Component {
    render() {
      const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3
      };
      return (
        <div className='container'>
          <h2> Multiple items </h2>
          <Slider {...settings}>
            <div>
                <img className='gambar' style={{width:'100%',height:'100%'}} src='https://media.21cineplex.com/webcontent/gallery/pictures/15601528435034_300x430.jpg' alt=""/>
            </div>
            <div>
                <img style={{width:'100%',height:'100%'}} src='https://media.21cineplex.com/webcontent/gallery/pictures/156022895488927_300x430.jpg' alt=""/>
            </div>
            <div>
                <img style={{width:'100%',height:'100%'}} src="https://images-na.ssl-images-amazon.com/images/I/715DcnhR0fL._SY606_.jpg" alt=""/>
            </div>
            <div>
              <h3>4</h3>
            </div>
            <div>
              <h3>5</h3>
            </div>
            <div>
              <h3>6</h3>
            </div>
            <div>
              <h3>7</h3>
            </div>
            <div>
              <h3>8</h3>
            </div>
            <div>
              <h3>9</h3>
            </div>
          </Slider>
        </div>
      );
    }
  }
  export default MultipleItems