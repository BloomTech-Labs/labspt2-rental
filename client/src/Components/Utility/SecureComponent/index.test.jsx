import React from 'react';
import { mount } from 'enzyme'
import renderer from 'react-test-renderer'
import SecuredComponent from './index';


const fakeUser = {
    username: 'Grape Ape',
    permissions: {
        read: true,
        write: false,
    }
}

describe('<SecuredComponent />', () => {
    it('should render with appropriate props', () => {
        const securedComponent = mount(
            <SecuredComponent permission="read" user={fakeUser}>
                <div>It must have children</div>
            </SecuredComponent>
        );
        expect(securedComponent.exists()).toBeTruthy()
        securedComponent.unmount()
    })
    it('should render children if permission matches', () => {
        const securedComponent = mount(
            <SecuredComponent permission="read" user={fakeUser}>
                <div>child1</div>
                <div>child2</div>
                <div>child3</div>
            </SecuredComponent>
        );
        expect(securedComponent.find('div').length).toBe(3)
        securedComponent.unmount()
    });

    it('should have null if permission is incorrect', () => {
        const securedComponent = mount(
            <SecuredComponent permission="write" user={fakeUser}>
                <div>child1</div>
                <div>child2</div>
                <div>child3</div>
            </SecuredComponent>
        );
        expect(securedComponent.find('div').length).toBe(0)
        securedComponent.unmount()
    })

    it('snapshot', () => {
        const securedComponentSnapshot = renderer.create(
            <SecuredComponent permission="read" user={fakeUser}>
                <div>It must have children</div>
            </SecuredComponent>
        );
        expect(securedComponentSnapshot.toJSON()).toMatchSnapshot()
    })
})