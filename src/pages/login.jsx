import React, {Component} from 'react'
import {Paper} from '@material-ui/core'
import {Link,} from 'react-router-dom'
import {connect} from 'react-redux'
import Axios from 'axios'
import {OnRegisterSuccess} from './../redux/Action'
import {Redirect} from 'react-router-dom'
import { ApiUrl } from '../supports/ApiUrl';
import Loader from 'react-loader-spinner'

// Ambil Value dari inputan
// Validasi Inputan
// Kita GET data user berdasarkan inputan
// apabila dapat data berarti berhasil login
// apabila data tiadak ada, berarti username or password invalid atau sidah di ambil usernamnenya
// apabila berhasil login, taruh data di global state dan username di localStorage



class Login extends Component {
    state ={
        error : '',
        loading : false

    }
    onBtnLogin = () =>{
        var username = this.refs.username.value
        var password = this.refs.password.value
        if(username === '' || password === ''){
            this.setState({error : 'Semua Form Harus Di Isi'})
        }else{
            Axios.get(ApiUrl+'/users?username=' + username  +'&password=' + password )
            .then((res)=>{
                if(res.data.length === 0){
                    this.setState({error : 'Username or Password invalid'})
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
    closeError = () =>{
        this.setState({error : ''})
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
                    {this.state.error === '' ? null :
                    <div className='alert alert-danger mt-3 '>{this.state.error}<span style={{fontWeight : 'bold',
                cursor : 'pointer',float : 'right'}} onClick={this.closeError}> x </span></div>}
                    <input type='button' className='btn btn-primary mt-3 mb-3' value='Login   Now' onClick={this.onBtnLogin}/>
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
        username : state.user.username,
        user : state.user
    }
}
export default connect(mapStateToProps,{OnRegisterSuccess}) (Login)