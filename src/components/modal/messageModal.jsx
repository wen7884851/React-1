import React, { Component } from 'react'
import { Button, Modal } from 'semantic-ui-react'

class MessageModal extends Component{
    render(){
        const {header,content,visble,size,Ok=()=>{}}=this.props;
        return(<Modal size={size} open={visble} >
            <Modal.Header>{header}</Modal.Header>
            <Modal.Content>
              <p>{content}</p>
            </Modal.Content>
            <Modal.Actions>
              <Button positive icon='checkmark' labelPosition='right' content='确定' onClick={Ok} />
            </Modal.Actions>
          </Modal>)
    }
}

export default MessageModal