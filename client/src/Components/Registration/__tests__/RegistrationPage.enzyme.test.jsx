import React from 'react'
import { mount } from 'enzyme'
import RegistrationPage from '../RegistrationPage'

const registerUser = jest.fn()
const wrapper = mount(<RegistrationPage registerUser={registerUser}/>)

describe('RegistrationPage with Enzyme', () => {
    it('Renders correctly with props', () => {
        expect(wrapper.exists()).toBeTruthy()
    })

    it('calls onSubmit with username, email and password when submitted', () => {
        const fakeUser = {
            username: 'centaur',
            email: 'centaurs@centaurs.net',
            password: 'halfhorsehalfman'
        }
        const usernameNode = wrapper.find('#username-input')
        const emailNode = wrapper.find('#email-input')
        const passwordNode = wrapper.find('#password-input')
        const formNode = wrapper.find('Form')
        const component = wrapper.instance()

        usernameNode.simulate('change', { target: { name: 'username', value: fakeUser.username }})
        expect(component.state.username).toEqual(fakeUser.username)
        emailNode.simulate('change', { target: { name: 'email', value: fakeUser.email }})
        expect(component.state.email).toEqual(fakeUser.email)
        passwordNode.simulate('change', { target: { name: 'password', value: fakeUser.password }})
        expect(component.state.password).toEqual(fakeUser.password)

        formNode.simulate('submit')

        expect(registerUser).toHaveBeenCalledTimes(1)
        expect(registerUser).toHaveBeenCalledWith(fakeUser)
    })
})