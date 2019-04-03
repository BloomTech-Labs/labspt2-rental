import React, { Component } from 'react';
import { Form, Input, Button } from 'semantic-ui-react';
import PasswordModal from './passwordModal';

export default class AccountForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            firstName: this.props.user.firstName,
            lastName: this.props.user.lastName,
            email: this.props.user.email,
            phone: 'null',
            disabled: true
        }
    }

    componentDidUpdate = (prevProps) =>{
        // use state loading to set a spinner if we use one
        if(this.props !== prevProps){
            this.setState({
                firstName: this.props.user.firstName,
                lastName: this.props.user.lastName,
                email: this.props.user.email
            })
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            disabled: false
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // send axios call
    }

    render () {
        console.log('passed props', this.props.user)
        const { firstName, lastName, email, phone, disabled } = this.state;
        let button;
        if (disabled) {
            button = <Button disabled>Save</Button>
        } else {
            button = <Button basic color="blue" active>Save</Button>
        }

        return (
            <Form>
                {/* Not rendering value in input boxes from state */}
            <Form.Group inline>
              <Form.Field>
                <label>First Name</label>
                <Input
                name='firstName' 
                value={firstName || ''}
                type='text'
                onChange={this.handleChange} />
              </Form.Field>

              <Form.Field>
                <label>Last Name</label>
                <Input 
                name='lastName'
                value={lastName || ''}
                type='text'
                onChange={this.handleChange} />
              </Form.Field>
            </Form.Group>

            <Form.Group inline>
                <Form.Field>
                    <label>Email Address</label>
                    <Input 
                    name='email'
                    value={email || ''}
                    type='email'
                    onChange={this.handleChange} />
                </Form.Field>
            </Form.Group>

            <Form.Group inline>
                <Form.Field>
                    <label>Phone</label>
                    <Input 
                    name='phone'
                    value={phone || ''}
                    type='tel'
                    onChange={this.handleChange} />
                </Form.Field>
            </Form.Group>

            <Form.Group inline>
                {button}
                <PasswordModal/>
            </Form.Group>

          </Form>
        )
    }
}