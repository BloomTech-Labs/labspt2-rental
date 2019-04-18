import React, { Component } from 'react'
import { Button, Form, Divider, Segment, Header } from 'semantic-ui-react'
import { FlexColumn, FlexRow } from 'custom-components'
import { Link } from "react-router-dom";

class RegistrationPage extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    passwordCheck: '',
    firstName: '',
    lastName: ''
  }

  handleInputChange = (event) => {
    const { target: { name, value } } = event
    this.setState({ [name]: value })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { registerUser } = this.props
    const user = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      role: 'owner'
    }

    event.preventDefault()

    registerUser(user)
  }

  render () {
    return (
      <FlexColumn width="full" alignCenter justifyCenter style={{backgroundColor: '#1a1b1c', height: '100vh'}}>
        <Segment className="sm-container">
          <Header size='large'>Registration</Header>

          <Divider/>

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
              <label htmlFor="first-name-input">First Name</label>
              <input
                id="firstName-input"
                placeholder='First Name'
                name="firstName"
                type="text"
                value={this.state.firstName}
                onChange={this.handleInputChange}
              />
            </Form.Field>
            <Form.Field>
              <label htmlFor="last-name-input">Last Name</label>
              <input
                id="lastName-input"
                placeholder='Last Name'
                name="lastName"
                type="text"
                value={this.state.lastName}
                onChange={this.handleInputChange}
              />
            </Form.Field>

            <Divider style={{margin: 'auto', marginTop: '2em', marginBottom: '2em', width: '80%'}}/>

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
            <Form.Field>
              <label htmlFor="input-password-again">Verify Password</label>
              <input
                id="second-password-input"
                placeholder='Verify Password'
                name="passwordCheck"
                type="password"
                value={this.state.passwordCheck}
                onChange={this.handleInputChange}
              />
            </Form.Field>

            <br/>

            <FlexRow width="full" alignEnd justifyBetween>
              <FlexColumn alignStart justifyBetween>
                <p style={{color: '#1a1b1c', marginLeft: '5px'}}>Already registered?</p>
                <Link to="/login">
                  <Button>Login</Button >
                </Link>
              </FlexColumn>

              <Button color="green" type='submit'>Submit</Button>
            </FlexRow>
          </Form>
        </Segment>
      </FlexColumn>
    )
  }
}

export default RegistrationPage