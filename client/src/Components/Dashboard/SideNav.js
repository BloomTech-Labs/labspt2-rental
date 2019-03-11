import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import { Button, Form, Divider, Segment, Header, List, Icon, Menu } from 'semantic-ui-react'
import { FlexColumn } from 'custom-components'

export default props => (
  <div style={{ width: '200px' }}>
    <Menu fluid vertical tabular>
      {props.children.map((el) => {
        const link = el.props;
          return (
            <Menu.Item name={link.children} active={props.active === 'bio'}/>
          )
        }
      )}
    </Menu>
  </div>
)