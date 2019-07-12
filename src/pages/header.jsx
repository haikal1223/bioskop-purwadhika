import React from 'react';
import {Link} from 'react-router-dom'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
  import {connect} from 'react-redux'
  import {onLogOut} from './../redux/Action'
  import {Redirect} from 'react-router-dom'
class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
// state = {
//     isOpen = false
// }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  OnBtnLogoutClick= () =>{
  this.props.onLogOut()
  localStorage.removeItem('terserah')
  }

  render() {
    
    return (
      <div>
        <Navbar color="danger" style={{backgroundImage :'linear-gradient(to left, red,orange)',border:'1px solid black'}} dark expand="md">
        {this.props.name !== '' ?  
          <Link to='/movie-list'>
          <NavbarBrand style={{color : 'white'}}><img height='20px' src='http://pngimg.com/uploads/popcorn/popcorn_PNG69.png'/>1/2 Premiere</NavbarBrand>
          </Link>:
            <Link to='/'>
          <NavbarBrand style={{color : 'white'}}><img height='20px' src='http://pngimg.com/uploads/popcorn/popcorn_PNG69.png'/>1/2 Premiere</NavbarBrand>
          </Link>}
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
             
              </NavItem>
              
             {this.props.name !== ""
              ? 
             <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                {this.props.name}
                </DropdownToggle>
                <DropdownMenu right>
                { this.props.name !== '' ?
                    <DropdownItem >
                    <Link to='/cart'>
                    <NavLink style={{color : 'black', textDecoration: 'none'}}>
                   Cart
                    </NavLink>
                    </Link>
                  </DropdownItem> : alert('Silahkan Login')
                }
                  <DropdownItem>
                    <Link to='/transaction'>
                    <NavLink style={{color : 'black'}}>
                   Transaction

                    </NavLink>
                    </Link>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                  {this.props.code === "admin"?
                  <Link to='/manage-movie'>
                <NavLink style={{color : 'black'}}>Manage Movie</NavLink>
                </Link>
                :  null
                }
                  </DropdownItem>
                  <DropdownItem onClick={this.OnBtnLogoutClick}>
                  LogOut
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            :
            <NavItem>
            <Link to='/register'><NavLink>Join Now!</NavLink></Link>
          </NavItem>
             }
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = (state) =>{
  return{
    name : state.user.username,
    code : state.user.code
    
  }
}

export default connect(mapStateToProps,{onLogOut})(Header)