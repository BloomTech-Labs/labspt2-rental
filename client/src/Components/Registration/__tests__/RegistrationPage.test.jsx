import React from 'react'
import { render, cleanup, fireEvent } from 'react-testing-library'
import RegistrationPage from '../RegistrationPage'

afterEach(cleanup)

const registerUser = jest.fn()

describe('RegistrationPage', () => {

  test('calls onSubmit with username, email and password when submitted', () => {
    const fakeUser = {
      username: 'centaur',
      email: 'centaur@centaurs.net',
      password: 'halfhorsehalfman'
    }
  
    const { getByLabelText, getByText } = render(<RegistrationPage registerUser={registerUser} />)
    const usernameNode = getByLabelText('Username')
    const emailNode = getByLabelText('Email')
    const passwordNode = getByLabelText('Password')
    const submitButtonNode = getByText('Submit')
  
    fireEvent.change(usernameNode, { target: { value: fakeUser.username}})
    fireEvent.change(emailNode, { target: { value: fakeUser.email}})
    fireEvent.change(passwordNode, { target: { value: fakeUser.password}})
  
    fireEvent.click(submitButtonNode)
  
    expect(registerUser).toHaveBeenCalledTimes(1)
    expect(registerUser).toHaveBeenCalledWith(fakeUser)
  })
  
  test('snapshot', () => {
    const { container } = render(<RegistrationPage registerUser={registerUser} />)
    expect(container.firstChild).toMatchSnapshot()
  })
  
})
