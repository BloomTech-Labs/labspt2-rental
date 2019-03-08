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
    const { registerUser } = this.props
    console.log('logging')
    const user = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password
    };
    
    event.preventDefault();
    registerUser(user);
  }
  render() {
    return   (
      <Container>
        <Form onSubmit={this.handleSubmit}>
        <Form.Field>
          <label>Username</label>
          <input 
            placeholder='Username'
            name="username"
            value={this.state.username}
            onChange={this.handleInputChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Email</label>
          <input 
            placeholder='Email'
            name="email"
            value={this.state.email}
            onChange={this.handleInputChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input 
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