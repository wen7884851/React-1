import React, { Component } from 'react';
import {Menu,Input} from 'semantic-ui-react'

class Seach extends Component {
    render(){
    return  <Menu.Item>
    <Input icon='search' placeholder='Search...' />
  </Menu.Item>
    }
}

export default Seach