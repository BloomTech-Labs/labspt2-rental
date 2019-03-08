import React, { Component } from 'react'
import { Button, Form } from 'semantic-ui-react'

class LoginPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    inputHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        console.log(this.state.email, this.state.password)
    }

    submitHandler = (e) => {
        e.preventDefault();
        const credentials = {
            email: this.state.email,
            password: this.state.password
        };

        this.props.login(credentials);
        //use auth for login for now
        this.props.history.push('/dashboard');
    }

    render() {
        return (
            <Form>
            <Form.Field>
              <label>Email address</label>
              <input name= "email" type="email" placeholder='hello@gmail.com' />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input name="password" type="password" placeholder='Password' />
            </Form.Field>
            <Button type='submit'>Login</Button>
          </Form>
        )
    }
}

export default LoginPage;