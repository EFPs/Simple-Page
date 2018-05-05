import React, {Component} from 'react';
import { auth, db } from '../firebase';



const styles = theme =>{

}

class Profile extends Component{



    constructor(prop){
        super(prop);
        this.state= {
            user : auth.currentUser,
            email: auth.currentUser.email,
            userName : auth.currentUser.displayName,
            newPassword : "",
            passBox : false,
            };
        console.log("User In Profile", this.state.user);
    }

    componentDidMo

    deleteAccount(user){
        console.log("User Delete",user);

        const a = window.confirm("Are you sure you want to delete the account?");
            if (a) {
                // const userPassword = window.prompt("Please insert your password.");
                // console.log("pass",userPassword);
                // var credential =
                //     auth.EmailAuthProvider.credential(
                //     user.email,
                //     userPassword);
                // console.log("Credential",credential);
                // user.reauthenticateWithCredential(credential).then(
                //     this.props.history.push('/login')
                //         .then(user.delete().then(alert("User deleted")))
                this.props.history.push('/login');
                user.delete().then(alert("User deleted")

                ).catch( error => {
                    alert(error.message)
                })

            }
    }

    changePassword(user,nPass){

        console.log("User reset Password", user);
        // const newPassword = window.prompt("Insert your new password.");
        user.updatePassword(nPass)
            .then(() => window.alert("Password changed."))
            .catch((error) => window.alert(error));
    }






    render(){
        const dbRef =  db.ref("data/"+this.state.user.uid);
        // const pass = dbRef.on("value", snapShot => {
        //         let pass =  {password : snapShot.val()};
        //             this.setState({password: pass})});
        // console.log("password Hey",this.state.password);
        const {user} = this.state;
        let {email,userName,newPassword} = this.state;
        if (user){
        return(

                <div>
                    <h1>Profile</h1>
                    <p>Email : {email}</p>
                    <p>Name : {userName}</p>
                    {/*{console.log(passBox)}*/}
                    <button onClick={() => {this.setState({passBox: true}) }}> Reset Password </button>
                    {this.state.passBox &&
                    <input type="password" name="newPass" onChange={this.setState({newPassword: newPass}) onSubmit={user => newPassword => this.changePassword(user,newPassword)}>Insert new password</input>}
                    {/*<p>Password : {this.state.password}</p>*/}
                    <button onClick={() => this.deleteAccount(this.state.user)}> DELETE USER </button>
                </div>




        )
        }else{
            this.props.history.push('/');
        }

    }


}

export default Profile;