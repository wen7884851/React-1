import React, { Component } from 'react'
import { Message } from 'semantic-ui-react'

class LoginMessage extends Component 
{
    state = { visible: true }

    render() {
        const{header,content,show = false,size='large',handleDismiss}=this.props
        return <Message error onDismiss={handleDismiss} size={size} style={{ display: show ? 'block' : 'none' }}>
        <Message.Header style={{ display: header!=='' ? 'block' : 'none' }}>{header}</Message.Header>
        <p>{content}</p>
        </Message>
    }
}

export default LoginMessage;