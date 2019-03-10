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