import React, { Component } from 'react';
import {Menu,Icon,Label} from 'semantic-ui-react';

class MessageCenter extends Component{
    render(){
        const{messageCount=0}=this.props;
        return <div style={{marginBottom:'0',width:'100px',paddingTop:'10px'}}>
         <Menu.Item as='a'>
        <Icon name='mail' /> 消息
        <Label color='red' floating>
          {messageCount}
        </Label>
      </Menu.Item>
      </div>;
    }
}

export default MessageCenter;