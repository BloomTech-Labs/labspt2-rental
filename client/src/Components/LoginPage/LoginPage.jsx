import React, { Component } from 'react'
import { Container, Button, Form } from 'semantic-ui-react'

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
    }

    submitHandler = (e) => {
        e.preventDefault();
        const credentials = {
            email: this.state.email,
            password: this.state.password
        };

        this.props.loginUser(credentials);
        this.props.history.push('/dashboard');
    }

    render() {
        return (
            <Container>

                <Form onSubmit={this.submitHandler}>
                    <Form.Field>
                    <label>Email address</label>
                    <input name="email" type="email" placeholder='hello@gmail.com' value={this.state.email} onChange={this.inputHandler} />
                    </Form.Field>

                    <Form.Field>
                    <label>Password</label>
                    <input name="password" type="password" placeholder='Password' value={this.state.password} onChange={this.inputHandler} />
                    </Form.Field>

                    <Button type='submit'>Login</Button>
                </Form>

            </Container>

        )
    }
}

export default LoginPage;