import React, {Component} from 'react'
import {Paper} from '@material-ui/core'
import {Link,} from 'react-router-dom'
import {connect} from 'react-redux'
import Axios from 'axios'
import {OnRegisterSuccess} from './../redux/Action'
import {Redirect} from 'react-router-dom'
import { ApiUrl } from '../supports/ApiUrl';
// Ambil Value dari inputan
// Validasi Inputan
// Kita GET data user berdasarkan inputan
// apabila dapat data berarti berhasil login
// apabila data tiadak ada, berarti username or password invalid atau sidah di ambil usernamnenya
// apabila berhasil login, taruh data di global state dan username di localStorage



class Login extends Component {
    onBtnLogin = () =>{
        var username = this.refs.username.value
        var password = this.refs.password.value
        if(username === '' || password === ''){
            alert('Semua Form Hasrus Terisi')
        }else{
            Axios.get(ApiUrl+'/users?username=' + username  +'&password=' + password )
            .then((res)=>{
                if(res.data.length === 0){
                    alert('Username or Password invalid')
                }else{
                    this.props.OnRegisterSuccess(res.data[0])
                    localStorage.setItem('terserah',username)

                }       
            })
            .catch((err)=>{
                console.log(err);
                
            })
        }
    }
    render(){
        if(this.props.username !== '') {
            return (
                <Redirect  to='/movie-list' />
            )
        }
        return(
            <div className='container bg-register'>
            <div className='row justify-content-center mt-5'>
                <div className='col-md-6 '>
                    <Paper className='container'>
                    <h1>LOGIN</h1>
                    <input ref='username' className='form-control mt-3'  type='text' placeholder='Username' />
                    <input ref='password' className='form-control mt-3'  type='password' placeholder='Password' />
                    <input type='button' className='btn btn-primary mt-5' value='Login   Now' onClick={this.onBtnLogin}/>
                   
                    </Paper>
                   
                    <p className='mt-3' style={{fontStyle :'italic',color : 'white'}}>
                        Belum punya akun ? <Link to='/register'>
                            <span style={{fontStyle :'bolder', textDecoration:'underline', color:'blue'}}> 
                        Register Now</span>
                    </Link>

                    </p>

                </div>
            </div>
            </div>
        )
    }
}
const mapStateToProps = (state) =>{
    return{
        username : state.user.username
    }
}
export default connect(mapStateToProps,{OnRegisterSuccess}) (Login)