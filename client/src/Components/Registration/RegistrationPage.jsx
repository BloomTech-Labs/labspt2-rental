import React, { Component } from 'react';
import { Button, Form, Container } from 'semantic-ui-react'


class RegistrationPage extends Component {
  state = {
    username: '',
    email: '',
    password: ''
  }

  handleInputChange = (event) => {
    const {target: { name, value } } = event;
    this.setState({ [name]: value })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { registerUser } = this.props
    console.log('logging')
    const user = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password
    };
    
    registerUser(user);
  }
  render() {
    return   (
      <Container>
        <Form onSubmit={this.handleSubmit}>
        <Form.Field>
          <label htmlFor="username-input">Username</label>
          <input
            id="username-input" 
            placeholder='Username'
            name="username"
            value={this.state.username}
            onChange={this.handleInputChange}
          />
        </Form.Field>
        <Form.Field>
          <label htmlFor="email-input">Email</label>
          <input
            id="email-input" 
            placeholder='Email'
            name="email"
            value={this.state.email}
            onChange={this.handleInputChange}
          />
        </Form.Field>
        <Form.Field>
          <label htmlFor="password-input">Password</label>
          <input
            id="password-input" 
            placeholder='Password'
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.handleInputChange}
          />
        </Form.Field>
        <Button type='submit'>Submit</Button>
      </Form>
    </Container>
  )}
}

export default RegistrationPage;