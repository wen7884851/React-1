import React, { Component } from 'react';
import {Menu,Icon} from 'semantic-ui-react'

class MenuItem extends Component{
    state = { activeItem: 'home' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render(){
        const { activeItem } = this.state
        const{menuName,menuContent,url,icon}=this.props
        return <div style={{borderBottom:'1px solid #F0FFF0'}}>
        <Menu.Item name={menuName} active={activeItem === {menuName}} href={url} onClick={this.handleItemClick} > 
        <Icon name={icon} />
        {menuContent}
        </Menu.Item></div>
        
    }
}
export default MenuItem;