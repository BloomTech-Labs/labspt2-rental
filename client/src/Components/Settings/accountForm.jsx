import React, { Component } from 'react';
import { Form, Input, Button } from 'semantic-ui-react';
import PasswordModal from './passwordModal';

export default class AccountForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            disabled: 'disabled'
        }
    }

    componentDidMount = () => {
        this.setState({
            firstName: this.props.firstName,
            lastName: this.props.lastName,
            email: this.props.email,
            phone: this.props.phone
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            disabled: 'active'
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // send axios call
    }

    render () {
        const { firstName, lastName, email, phone, disabled } = this.state;

        return (
            <Form>
            <Form.Group inline>
              <Form.Field>
                <label>First Name</label>
                <Input
                name='firstName' 
                value={firstName}
                type='text'
                onChange={this.handleChange} />
              </Form.Field>

              <Form.Field>
                <label>Last Name</label>
                <Input 
                name='lastName'
                value={lastName}
                type='text'
                onChange={this.handleChange} />
              </Form.Field>
            </Form.Group>

            <Form.Group inline>
                <Form.Field>
                    <label>Email Address</label>
                    <Input 
                    name='email'
                    placeholder={email}
                    type='email'
                    onChange={this.handleChange} />
                </Form.Field>
            </Form.Group>

            <Form.Group inline>
                <Form.Field>
                    <label>Phone</label>
                    <Input 
                    name='phone'
                    placeholder={phone}
                    type='tel'
                    onChange={this.handleChange} />
                </Form.Field>
            </Form.Group>
            <Form.Group inline>
                <Button basic>Save</Button>
                {/* { disabled === 'true' : <Button disabled>Save</Button> ? <Button active>Save</Button> } */}

                <PasswordModal/>
            </Form.Group>

          </Form>
        )
    }
}