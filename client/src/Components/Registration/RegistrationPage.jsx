import React, { Component } from 'react'
import { Button, Form, Divider, Segment, Header } from 'semantic-ui-react'
import { FlexColumn, FlexRow } from 'custom-components'

class RegistrationPage extends Component {
  state = {
    username: '',
    email: '',
    password: ''
  }

  handleInputChange = (event) => {
    const { target: { name, value } } = event
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
    }

    event.preventDefault()

    registerUser(user)
  }

  render () {
    return (
      <FlexColumn width="full" alignCenter justifyCenter>
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

            <br/>

            <FlexRow width="full" alignCenter justifyBetween>
              <Button>Login</Button>

              <Button color="green" type='submit'>Submit</Button>
            </FlexRow>
          </Form>
        </Segment>
      </FlexColumn>
    )
  }
}

export default RegistrationPage