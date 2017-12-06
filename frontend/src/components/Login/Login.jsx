import React, { Component } from 'react'
import { Button, Input, Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import axios from 'axios'

import styles from './Login.scss';


class Login extends Component {

  constructor() {
    super();

    this.state = {
      user: {
        password: '',
        email: ''
      },

      message: ''
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
  }

  onSubmit(e) {
    // let apiBaseUrl = 'http://localhost:8080/';
    // let self = this;
    // let payload = {
    //   "email": this.state.username,
    //   "password": this.state.password
    // }
    // axios.post(apiBaseUrl+'login', payload)
    //   .then(function (response) {
    //     console.log(response);
    //     if (response.data.code == 200) {
    //       console.log("PASS!");
    //     }
    //     else if (response.data.code == 204) {
    //       console.log("NO MATCH");
    //       alert("username password do not match");
    //     }
    //     else {
    //       console.log("NO EXIST");
    //       alert("username does not exist");
    //     }
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   })
  }

  onChangeEmail(e) {
    const user = this.state.user;
    user.email = e.target.value;
    this.setState({user})
  }

  onChangePassword(e) {
    const user = this.state.user;
    user.password = e.target.value;
    this.setState({user})
  }


  render() {
    return (
      <form className="Login" action="/" onSubmit={this.onSubmit}>
        <Card className="Login__content">
          <div>
            <h1>Login</h1>
            <Input label="Email" onChange={this.onChangeEmail} />
            <br/><br/>
            <Input label="Password" onChange={this.onChangePassword} />
            <br/><br/>

            <p>{this.state.message}</p>
            <Input type="submit" />
            <h4>No account? Sign up <Link to="/signup">here</Link></h4>

          </div>
        </Card>
      </form>
    )
  }
}

export default Login
