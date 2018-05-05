import React, {Component} from 'react';
import {auth,db} from '../firebase';

class Signup extends Component{

    constructor(props){
        super(props);
        this.state = {
            email : "",
            password : "",
            userName: ""
            // firstName : "",
            // lastName : "",
            // nickName : ""
        };

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
        const {email, password, userName} = this.state;
        auth.createUserWithEmailAndPassword(email,password)
            .then(authUser => {
                console.log(authUser);
                authUser.updateProfile({displayName: this.state.userName})
                // const userId = auth.currentUser().getUid();
                db.ref("data/"+authUser.uid).set({"password" : this.state.password})


            })
            .catch(authError => {
                alert(authError)
            });

        // db.ref("firstName/"+ userId).push(firstName);
        // db.ref("lastName/"+ userId).push(lastName);
        // db.ref("nickName/"+ userId).push(nickName);

    }



    render(){
        return(
            <div>
                <h1>Register</h1>
                <form onSubmit={this.onSubmit}>

                    <input onChange={this.handelChange("userName")}
                           value ={this.state.userName}
                           type="text"
                           placeholder={"Name"}/>

                    <input onChange={this.handelChange("email")}
                           value ={this.state.email}
                           type="text"
                           placeholder={"Email"}/>

                    <input onChange={this.handelChange("password")}
                           value ={this.state.password}
                           type="password"
                           placeholder={"Password"}/>

                    {/*<input onChange={this.handelChange("firstName")}*/}
                           {/*value ={this.state.firstName}*/}
                           {/*type="text"*/}
                           {/*placeholder={"First Name"}/>*/}

                    {/*<input onChange={this.handelChange("lastName")}*/}
                           {/*value ={this.state.lastName}*/}
                           {/*type="text"*/}
                           {/*placeholder={"Last Name"}/>*/}

                    {/*<input onChange={this.handelChange("nickName")}*/}
                           {/*value ={this.state.nickName}*/}
                           {/*type="text"*/}
                           {/*placeholder={"Nickname"}/>*/}

                    <button type={"submit"}> Register</button>
                </form>
            </div>
        )
    }


}



export default Signup;