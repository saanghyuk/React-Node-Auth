import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../actions';


class Header extends Component{

    handleClick(){
        this.props.signoutUser();
    }


    renderLinks(){
        if(this.props.authenticated){
            return (
                <li className="nav-item">
                    <Link onClick={this.handleClick.bind(this)} className="nav-link" to="/">Sign Out</Link>
                </li>
                )
        }else if(!this.props.authenticated){
            //show a link to sign in or sign up
            return (
                <li className="nav-item" key="">
                    <Link className="nav-link" to="/signup">Sign Up</Link>
                </li>

            )
        }
    }
    renderLogo(){
        if(this.props.authenticated){
           return (
               <Link to="/feature" className="navbar-brand">Livle</Link>
           )
        }else{
            return (
               <Link to="/" className="navbar-brand">Livle</Link>
            )
        }
    }
    render(){
        return(
            <nav className="navbar navbar-light">

                    {this.renderLogo()}
                <ul className="nav navbar-nav">
                    {this.renderLinks()}
                </ul>
            </nav>
        )
    }

}



function mapStateToProps(state){
    return {
        authenticated: state.auth.authenticated
    }
}
export default connect(mapStateToProps, actions)(Header);