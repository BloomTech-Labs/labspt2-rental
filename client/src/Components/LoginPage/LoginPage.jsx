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

    inputHandler = ({ target: { name, value } }) => {
        this.setState({
            [name]: value
        })
    }

    submitHandler = (e) => {
        e.preventDefault();
        const { email, password } = this.state;
        const { loginUser, history: { push }} = this.props;
        const credentials = {
            email,
            password
        };
        if (email && password) {
            loginUser(credentials);
            push('/dashboard');
        }

        return;
    }

    render() {
        return (
            <Container>

                <Form id="login-form" onSubmit={this.submitHandler}>
                    <Form.Field>
                    <label>Email address</label>
                    <input id="email-input" name="email" type="email" placeholder='hello@gmail.com' value={this.state.email} onChange={this.inputHandler} />
                    </Form.Field>

                    <Form.Field>
                    <label>Password</label>
                    <input id="password-input" name="password" type="password" placeholder='Password' value={this.state.password} onChange={this.inputHandler} />
                    </Form.Field>

                    <Button id="login-button" type='submit'>Login</Button>
                </Form>

            </Container>

        )
    }
}

export default LoginPage;