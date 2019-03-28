import React, { Component } from 'react'
import { Button, Modal, Form } from 'semantic-ui-react'

export default class PasswordModal extends Component {
    state = { 
        open: false,
        oldPassword: '',
        newPassword: '',
        checkPassword: '',
     }

    close = () => this.setState({ open: false })

    show = () => this.setState({ open: true })

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // send axios call
    }

    // Add logic to check that both New password fields match

    render () {
        const { open, oldPassword, newPassword, checkPassword } = this.state;

        return (
            <div>
                <Button basic color="blue" onClick={this.show}>Change Password</Button>

                <Modal size='mini' open={open} onClose={this.close}>
                <Modal.Header>Update Password</Modal.Header>

                    {/* Inline isn't working? */}
                    <Modal.Content>
                        <Form>
                            <Form.Group inline>
                                <Form.Field required>
                                    <label>Old Password</label>
                                    <Form.Input 
                                        name='oldPassword'
                                        value={oldPassword}
                                        type='password'
                                        onChange={this.handleChange} />
                                </Form.Field>
                            </Form.Group>

                            <Form.Group inline>
                                <Form.Field required>
                                    <label>New Password</label>
                                    <Form.Input 
                                        name='newPassword'
                                        value={newPassword}
                                        type='password'
                                        onChange={this.handleChange} />
                                </Form.Field>
                            </Form.Group>

                            <Form.Group inline>
                                <Form.Field required>
                                    <label>New Password</label>
                                    <Form.Input 
                                        name='checkPassword'
                                        value={checkPassword}
                                        type='password'
                                        onChange={this.handleChange} />
                                </Form.Field>
                            </Form.Group>
                        </Form>
                        
                    </Modal.Content>

                    <Modal.Actions>
                        <Button negative onClick={this.close} >Cancel</Button>
                        <Button onClick={this.handleSubmit} positive content='Update' />
                    </Modal.Actions>
            </Modal>
            </div>
        )
    }
};
