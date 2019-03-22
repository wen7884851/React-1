import React, { Component } from 'react'
import { Button, Modal } from 'semantic-ui-react'

class ChoiceModalForm extends Component{
    render(){
        const {header,content,visble,size,cancle=()=>{},submit=()=>{},loading=false}=this.props;
        return(<Modal size={size} open={visble} >
            <Modal.Header>{header}</Modal.Header>
            <Modal.Content>
              <p>{content}</p>
            </Modal.Content>
            <Modal.Actions>
              <Button negative onClick={cancle} >取消</Button>
              <Button positive icon='checkmark' labelPosition='right' content='确定' onClick={submit} loading={loading}/>
            </Modal.Actions>
          </Modal>)
    }
}

export default ChoiceModalForm