import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import Profile from "./Profile.jsx";
import Main from  './Main.jsx';
import Login from  './Login.jsx';
import Signup from  './Signup.jsx';
import PrivateRoute from  './PrivateRoute.jsx';
import {auth} from "../firebase";


import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { CircularProgress } from 'material-ui/Progress';
import Button from 'material-ui/Button';


const theme = createMuiTheme();

class App extends Component{

    constructor(props){
        super(props);
        this.state = {
            loading : true,
            authenticated : false,
            currentUser : null
        }

    }

    componentWillMount(){
        auth.onAuthStateChanged( user => {
            //User will not be null if we are login
            if(user){
                this.setState({
                    authenticated : true,
                    currentUser : user,
                    loading : false
                },
                    () => {
                    this.props.history.push('/')
                    })
            }
            else{
                this.setState({
                    authenticated : false,
                    currentUser : null,
                    loading : false
                })

            }
        })
    }

    render(){
        const {authenticated, loading} = this.state;
        const content = loading ?(
            <p>Loading..</p>
        ) : (
            <div>

                {authenticated
                }

                <PrivateRoute
                exact path="/"
                component = {Main}
                authenticated = {authenticated}/>

                <Route exact path="/login" component={Login}/>
                <Route exact path="/signup" component={Signup}/>
                <Route exact path="/profile" component={Profile}/>
            </div>
        )
        return(
            <MuiThemeProvider theme={theme}>
                <div>
                    <AppBar position="static" color="default">
                        <Toolbar>
                            <Typography variant="title" color="inherit">
                                Simple Note
                            </Typography>
                            { authenticated &&
                            <Button variant="raised" color="default" onClick={() => auth.signOut()}>Log out</Button>
                            }

                            {authenticated
                            && <Button variant="raised" color="default" onClick={() => {this.props.history.push('/profile')}}> Profile </Button>}

                        </Toolbar>
                    </AppBar>
                    { content }
                </div>
            </MuiThemeProvider>
        );
    }
}



export default withRouter(App);