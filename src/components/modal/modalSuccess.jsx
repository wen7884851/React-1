import React, { Component } from 'react';
import {Modal,Button,Icon} from 'semantic-ui-react';

class ModalSuccess extends Component{

    render(){
        const {title,content,open,close= ()=>{}}=this.props;
        return (
        <Modal open={open} size='mini' 
        trigger={ <Button primary icon>
            {title} <Icon name='right chevron' />
          </Button>}>
          <Modal.Header>创建成功</Modal.Header>
          <Modal.Content>
            <p>{content}</p>
          </Modal.Content>
          <Modal.Actions>
            <Button primary icon='check' content='确  认' onClick={close} />
          </Modal.Actions>
        </Modal>
        );
    }
}

export default ModalSuccess