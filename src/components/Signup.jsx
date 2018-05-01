import React, {Component} from 'react';
import {auth} from '../firebase';

class Signup extends Component{

    constructor(props){
        super(props);
        this.state = {
            email : "",
            password : ""
        }

        this.handelChange = this.handelChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }



    handelChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    onSubmit(event){
        //Prevent the defult behavior of HTML. (Refesf the page when)
        event.preventDefault();
        const {email, password} = this.state;
        auth.createUserWithEmailAndPassword(email,password)
            .then(authUser => {
                console.log(authUser);

            })
            .catch(authError => {
                alert(authError)
            })

    }



    render(){
        return(
            <div>
                <h1>Register</h1>
                <form onSubmit={this.onSubmit}>
                    <input onChange={this.handelChange("email")}
                           value ={this.state.email}
                           type="text"
                           placeholder={"Email"}/>

                    <input onChange={this.handelChange("password")}
                           value ={this.state.password}
                           type="password"
                           placeholder={"Password"}/>

                    <button type={"submit"}> Register</button>
                </form>
            </div>
        )
    }


}



export default Signup;