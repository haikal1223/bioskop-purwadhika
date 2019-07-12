import React from 'react'
import {Table, TableBody,TableCell,TableRow,TableHead,Paper, Container, } from '@material-ui/core'
import Axios from 'axios';
import {DeleteForever,EditAttributesRounded, UsbSharp} from '@material-ui/icons'
import {Modal,ModalBody,ModalHeader,ModalFooter, FormGroup,Label,Input} from 'reactstrap'
import {Redirect} from 'react-router-dom'
import { ApiUrl } from '../../supports/ApiUrl';
// Material UI ===> Google

class ManageMovie extends React.Component{
    // state
    // lifecycle
    // functions
    // render
    state = {
        data : [], 
        modalOpen : false, 
        selectedEdit : 0    
    }
    componentDidMount(){
        Axios.get('http://localhost:2000/movies')
        .then((res) => {
           this.setState({data : res.data})    
                    
        })
        .catch((err) =>{
            console.log(err);
            
        })
   }

   RenderSinopsis = (text) => {
       var arr = text.split(' ')
       var newArr = []
       for(var i = 0;i < 5; i++){
           newArr.push(arr[i])
       }
       return newArr.join(' ')
   }

   onPrintList = () => {
       var jsx = this.state.data.map((val,index)=>{
           if(val.id === this.state.selectedEdit){
               return(
                <TableRow>
                    <TableCell> {val.id} </TableCell>
                    <TableCell><input ref='input1' className='form-control'  type='text' defaultValue={val.title}/></TableCell>
                    <TableCell><input ref='input2' className='form-control' type='text' defaultValue={val.sutradara}/></TableCell>
                    <TableCell><input ref='input3' className='form-control' type='text' defaultValue={val.img}/> </TableCell>
                    <TableCell><input ref='input4' className='form-control' type='text' defaultValue={val.genre}/></TableCell>
                    <TableCell><input ref='input5' className='form-control' type='text' defaultValue={val.playingAt}/></TableCell>                    
                    <TableCell><input ref='input6' className='form-control' type='text' defaultValue={val.duration}/></TableCell>
                    <TableCell><textarea ref='input7' className='form-control' defaultValue={val.sinopsis}/></TableCell>
                    <TableCell><input ref='input8' className='form-control' type='text' defaultValue={val.seat}/></TableCell>
                    <TableCell><input type='button' className='btn btn-danger' value='Cancel' onClick={() => this.setState({selectedEdit : 0})}/></TableCell>
                    <TableCell><input type='button' className='btn btn-success' value='Save' onClick={ () => this.onButtonSaveEdit (index)}/></TableCell>
                </TableRow>        
               )
           } 
           return(
            <TableRow>
                        <TableCell> {val.id} </TableCell>
                        <TableCell>{val.title}</TableCell>
                        <TableCell>{val.sutradara}</TableCell>
                        <TableCell><img src={val.img} height='100px' style={{border : '1px solid black'}}/> </TableCell>
                        <TableCell>{val.genre}</TableCell>
                        <TableCell>{val.playingAt.join(',')}</TableCell>                    
                        <TableCell>{val.duration}</TableCell>
                        <TableCell>{this.RenderSinopsis(val.sinopsis)}...</TableCell>
                        <TableCell>{val.seat}</TableCell>
                        <TableCell><EditAttributesRounded onClick={() => this.onButtonEdit(val.id)}/></TableCell>
                        <TableCell><DeleteForever onClick={() =>this.onButtonDelete(val.id,index)}/></TableCell>
                        </TableRow>
           )
       })
       return jsx
   }

onButtonSaveEdit = (i) =>{
    var title = this.refs.input1.value
    var sutradara = this.refs.input2.value
    var img = this.refs.input3.value
    var genre = this.refs.input4.value
    var playingAt = this.refs.input5.value.split(',')
    var duration = this.refs.input6.value
    var sinopsis = this.refs.input7.value
    var seat = this.refs.input8.value

    if(title === '' ||
    sutradara === '' ||
    img === '' ||
    genre === '' ||
    playingAt.length <= 0 ||
    duration <= 0 ||
    sinopsis === '' ||
    seat <= 0){
        alert('Isi form dengan benar')
    }else{
        var data = {
            title,sutradara,img,genre,playingAt,duration,sinopsis,seat
        }
        Axios.put('http://localhost:2000/movies/' + this.state.selectedEdit, data)
        .then((res)=>{
        var movieData = this.state.data
        movieData[i] = res.data
        this.setState({data : movieData, selectedEdit : 0})            
        })
        .catch((err)=>{
            console.log(err);
            
        })
    }
}

onButtonDelete= (id,index) => {
    var confirm = window.confirm('Are You Sure Want To Delete This Data ? ')
    if(confirm === true){
        Axios.delete('http://localhost:2000/movies/' + id)
        .then((res) =>{
            alert('Delete Data Success')
            var data = this.state.data
            data.splice(index,1)
            this.setState({data : data})
          
        })
        .catch((err) =>{

        })
    }
}

   onButtonEdit= (a) => {
    this.setState({selectedEdit : a})

   }

   onButtonSave = () => {
       var playingAt = []
       var waktu = [9,14,16,20,22]
        for(var i = 1; i <=5 ; i++){
                if(this.refs['radio' + i].refs['radio' + i + 'Inner'].checked === true){
                    playingAt.push(waktu[i-1])
                }
        }

    // if(this.refs.radio1.refs.radio1Inner.checked === true){
    //     playingAt.push(9)
    // }
    // if(this.refs.radio2.refs.radio2Inner.checked === true){
    //     playingAt.push(14)
    // }  if(this.refs.radio3.refs.radio3Inner.checked === true){
    //     playingAt.push(16)
    // }  if(this.refs.radio4.refs.radio4Inner.checked === true){
    //     playingAt.push(20)
    // }  if(this.refs.radio5.refs.radio5Inner.checked === true){
    //     playingAt.push(22)
    // }
    console.log(playingAt);
    
       var title = this.refs.title.value
       var sutradara = this.refs.sutradara.value
       var genre = this.refs.genre.value
       var img = this.refs.img.value
       var duration = this.refs.duration.value
       var sinopsis = this.refs.sinopsis.value

       var data = {
           title,
           genre,
           sinopsis,
           playingAt,
           duration,
           sutradara,
           img,


       }
       if(title !== '' &&
        sutradara !=='' &&
         playingAt.length > 0 && 
         genre !== '' &&
         img !== '' &&
         duration !== '' &&
         sinopsis !== ''
        ){

             Axios.post('http://localhost:2000/movies',data)
             .then((res) => {
                 alert('Add Data Success')
                 var movieData = this.state.data
                 movieData.push(res.data)
                 this.setState({data : movieData, modalOpen : false})
             }) 
             .catch((err)=> {
                 console.log(err);
                 
             })
         }else{
             alert('Semua Form Harus diIsi')
         }


   }
    
   closeModal = () => {
       this.setState({modalOpen:false})
   }

    render(){
        if(localStorage.getItem('terserah') === null) {
            return (
                <Redirect to='/' />

            )
        }else{

        
        return(
           <Container fixed>
               <h1>Manage Movie Page</h1>
               <input type='button' className='btn btn-success mb-3' value='Add Data' onClick={() => this.setState({modalOpen : true})} />
               {/* MODAL START */}
                    <Modal isOpen={this.state.modalOpen} toggle={this.closeModal}>
                        <ModalHeader>

                        </ModalHeader>
                        <ModalBody>
                            <input ref='title' type='text' className='form-control mt-2'  placeholder='Title'/>
                            <input ref='sutradara' type='text' className='form-control mt-2' placeholder='Sutradara'/>
                            <input ref='genre' type='text' className='form-control mt-2' placeholder='Genre'/>
                            <input ref='img' type='text' className='form-control mt-2' placeholder='Image'/>
                            <div >
                            <FormGroup check inline>
                                <Label>
                                Playing At:
                                </Label>
                            </FormGroup>
                            <FormGroup check inline>
                                    <Label check>
                                        <Input innerRef='radio1Inner' ref='radio1' type='radio' value = "09"/>09.00
                                    </Label>
                            </FormGroup>
                            <FormGroup check inline>
                                    <Label check>
                                        <Input innerRef='radio2Inner' ref='radio2' type='radio'/>14.00
                                    </Label>
                            </FormGroup>
                            <FormGroup check inline>
                                    <Label check>
                                        <Input innerRef='radio3Inner' ref='radio3' type='radio'/>16.00
                                    </Label>
                            </FormGroup>
                            <FormGroup check inline>
                                    <Label check>
                                        <Input innerRef='radio4Inner' ref='radio4' type='radio'/>20.00
                                    </Label>
                            </FormGroup>
                            <FormGroup check inline>
                                    <Label check>
                                        <Input innerRef='radio5Inner' ref='radio5' type='radio'/>22.00
                                    </Label>
                            </FormGroup>
                            </div>
                            <input ref='duration' type='number' className='form-control mt-2' placeholder='Duration'/>
                            <textarea ref='sinopsis' placeholder='Synopsis' className='form-control mt-2'/> 

                        </ModalBody>
                        <ModalFooter>
                        <input type='button' value='Save' className='btn btn-success' onClick={this.onButtonSave} />
                        <input type='button' value='cancel' className='btn btn-danger'onClick={this.closeModal}  />
                        </ModalFooter>
                    </Modal>
               {/* MODAL END */}
               <Paper>
                   <Table>
                       <TableHead>
                        <TableCell> NO </TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Sutradara</TableCell>
                        <TableCell>Image</TableCell>
                        <TableCell>Genre</TableCell>
                        <TableCell>PlayingAt</TableCell>                        
                        <TableCell>Duration</TableCell>
                        <TableCell>Sinopsis</TableCell>
                        <TableCell>Action</TableCell>
                        
                       </TableHead>
                       <TableBody>
                            {this.onPrintList()}    
                       </TableBody>
                   </Table>
               </   Paper>
           </Container>
        )
    }
}
}



export default ManageMovie