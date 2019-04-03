import React from 'react';
import { mount } from 'enzyme';
import LoginPage from '../LoginPage';


describe('<LoginPage />', () => {
    it('should render without exploding', () => {
        const loginUserMock = jest.fn();
        const historyMock = {
            push: jest.fn(),
        }

        const wrapper = mount(
                <LoginPage 
                    loginUser={loginUserMock} 
                    history={historyMock} 
                />
        )
        expect(wrapper.exists()).toBeTruthy()
        wrapper.unmount();
    });

    it('should call loginUser when login button is pressed', () => {
        const loginUserMock = jest.fn();
        const historyMock = {
            push: jest.fn(),
        }
        const wrapper = mount(
                    <LoginPage 
                        loginUser={loginUserMock} 
                        history={historyMock} 
                    />
            );
        const loginForm = wrapper.find('#login-form').at(1)

        loginForm.simulate('submit')
        expect(loginUserMock).toHaveBeenCalledTimes(1);
        expect(loginUserMock).toHaveBeenCalledWith({email: '', password: ''})
        wrapper.unmount()
    });

    it('should navigate the user to the dashboard after form submitted', () => {
        const loginUserMock = jest.fn();
        const historyMock = {
            push: jest.fn(),
        }        
        const wrapper = mount(
            <LoginPage 
                loginUser={loginUserMock} 
                history={historyMock} 
            />
    );
        const loginForm = wrapper.find('#login-form').at(1)

        loginForm.simulate('submit')
        expect(historyMock.push).toHaveBeenCalledTimes(1);
        expect(historyMock.push).toHaveBeenCalledWith('/dashboard')
    });
})