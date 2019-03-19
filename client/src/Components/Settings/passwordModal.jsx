import React, { Component } from 'react'
import { Button, Input, Modal, Form } from 'semantic-ui-react'

export default class PasswordModal extends Component {
    state = { 
        open: false,
        oldPassword: '',
        newPassword: '',
        checkPassword: '',
     }

    close = () => this.setState({ open: false })
    show = () => this.setState({ open: true })

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    handleSubmit = () => {
        const { oldPassword, newPassword } = this.state
        this.setState({ oldPassword: oldPassword, newPassword: newPassword })
    }

    // Add logic to check that both New password fields match

    render () {
        const { open, oldPassword, newPassword, checkPassword } = this.state;

        return (
            <div>
                <Button onClick={this.show}>Change Password</Button>

                <Modal open={open} onClose={this.close}>
                <Modal.Header>Update Password</Modal.Header>
                    <Modal.Content>
                        <Form>
                            {/* Would like to make these inline */}
                        <Form.Field inline required>
                            <label>Old Password</label>
                            <Form.Input 
                                name='oldPassword'
                                value={oldPassword}
                                type='password'
                                onChange={this.handleChange} />
                        </Form.Field>
                        <Form.Field inline required>
                            <label>New Password</label>
                            <Form.Input 
                                name='newPassword'
                                value={newPassword}
                                type='password'
                                onChange={this.handleChange} />
                        </Form.Field>
                        <Form.Field inline required>
                            <label>New Password</label>
                            <Form.Input 
                                name='checkPassword'
                                value={checkPassword}
                                type='password'
                                onChange={this.handleChange} />
                        </Form.Field>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative onClick={this.close} >No</Button>
                        <Button onClick={this.handleSubmit} positive icon='checkmark' labelPosition='right' content='Yes' />
                    </Modal.Actions>
            </Modal>
            </div>
        )
    }
};
