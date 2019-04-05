import React, { Component } from 'react'
import { Container, Button, Form, Message } from 'semantic-ui-react'

class LoginPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
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
        const { loginUser } = this.props;
        const credentials = {
            email,
            password
        };
        if (email && password) {
            loginUser(credentials);
        }

        return;
    }

    componentDidUpdate() {
        if (this.props.auth){
            if (this.props.auth.token){
                this.props.history.push('/dashboard')
            }
        }
    }

    render() {
        const { error } = this.props.auth;
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
                {error && (
                    <Message warning>
                        <Message.Header>{error}</Message.Header>
                    </Message>
                )}
            </Container>
        )
    }
}

export default LoginPage;