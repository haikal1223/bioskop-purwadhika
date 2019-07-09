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
          <Link to='/'>
          <NavbarBrand style={{color : 'white'}}><img height='20px' src='http://pngimg.com/uploads/popcorn/popcorn_PNG69.png'/>1/2 Premiere</NavbarBrand>
          </Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link to='/manage-movie'>
                <NavLink>Manage Movie</NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <Link to='/register'><NavLink>Join Now!</NavLink></Link>
              </NavItem>
             {this.props.name !== ""
              ? 
             <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                {this.props.name  }
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Option 1
                  </DropdownItem>
                  <DropdownItem>
                    Option 2
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={this.OnBtnLogoutClick}>
                    LogOut
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            :null  
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
    name : state.user.username
  }
}

export default connect(mapStateToProps,{onLogOut})(Header)