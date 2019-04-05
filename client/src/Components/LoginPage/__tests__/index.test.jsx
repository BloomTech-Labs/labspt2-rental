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

    it('should NOT loginUser when login is submitted without credentials', () => {
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
        const loginForm = wrapper.find('#login-form').at(1);


        loginForm.simulate('submit')
        expect(loginUserMock).toHaveBeenCalledTimes(0);
        wrapper.unmount()
    });
})