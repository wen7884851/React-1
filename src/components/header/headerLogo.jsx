import React, { Component } from 'react';
import {Menu,Image,Header} from 'semantic-ui-react'

class HeaderLogo extends Component{
    render(){
        return (
            <Menu.Item style={{Height:'30px'}}>
            <div style={{marginBottom:'0',Height:'25px'}}>
            <Image src='/Resource/img/logo.png' size='mini' style={{Height:'25px'}}/>
            </div>
            <div style={{marginBottom:'0',Height:'25px',paddingLeft:'5px'}}>
            <Header as='h3' inverted >智慧办公服务平台</Header>
            </div>
            </Menu.Item>)
    }
}

export default HeaderLogo;