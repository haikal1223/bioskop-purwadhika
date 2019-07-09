import React, {Component} from 'react'
import {Paper} from '@material-ui/core'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {OnRegisterSuccess} from './../redux/Action'
import Axios from 'axios';

// Ambil input value
// passwod dan confirm password harus sama
// klik registerdi check username ada atau belum di json server
// kalau sudah ada munculkan error msg
// kalo belum ada simpan datanya, dan login

class Register extends Component {
    state ={
        error : '',
        loading : false
    }
    onBtnClickRegister = () =>{
        var username = this.refs.username.value
        var password = this.refs.password.value
        var confirm = this.refs.confirm.value
        if(username === '' || password ===''|| confirm === ''){
            this.setState({error : 'Semua Form Harus diisi'})
        }else{
            if(confirm !== password){
                this.setState({error : 'Pasword and Confirm must be same'})
            }else{
                this.setState({loading : true })
                // Ngecek username udah ada atau belum
                Axios.get('http://localhost:2000/users?username=' + username)
                .then((res) =>{
                    if(res.data.length > 0){
                        this.setState({error : 'Username has been taken',loading : false})
                    }else{
                        Axios.post('http://localhost:2000/users',{username,password})
                        .then((res) =>{
                        this.props.OnRegisterSuccess(res.data)
                        // paramater pertama key / terserah, untuk get data
                        localStorage.setItem('terserah', res.data.username)
                            
                        })
                        .catch((err) =>{
                            console.log(err);
                            
                        })
                    }            
                })
                .catch((err) =>{
                    console.log(err);
                    
                })
            }

        }

    }
    closeError = () =>{
        this.setState({error : ''})
    }
    render(){
        if(this.props.user.username !== ''){
          return(
              <Redirect to='/'/>
          )
                    
        }
        return(
            <div className='container bg-register'>
            <div className='row justify-content-center mt-5'>
                <div className='col-md-6 '>
                    <Paper className='container'>
                    <h1>REGISTER</h1>
                    <input ref='username' className='form-control mt-3'  type='text' placeholder='Username' />
                    <input ref='password' className='form-control mt-3'  type='password' placeholder='Password' />
                    <input ref='confirm' className='form-control mt-3'  type='password' placeholder='Confirm Password' />
                    {this.state.error === '' ? null :
                    <div className='alert alert-danger mt-3'>{this.state.error} <span style={{fontWeight : 'bold', 
                cursor : 'pointer',float : 'right'}} onClick={this.closeError}> x</span>  </div>
                    }
                    {this.state.loading === true ? 
                    <Loader type='ThreeDots' color = 'black' width = '40px' /> :
                    <input type='button' className='btn btn-primary mt-3 mb-2 ' value='Register Now' onClick={this.onBtnClickRegister}/>

                    
                }
                    </Paper>
                    <p className='mt-3' style={{fontStyle:'italic'}}>
                        Sudah punya akun ?
                        <Link to='/login'>
                        <span style={{fontStyle:'bolder', textDecoration:'underline', color:'blue' }}>
                            Silahkan Login</span>
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
        user : state.user
    }
}
export default connect(mapStateToProps,{OnRegisterSuccess}) (Register)