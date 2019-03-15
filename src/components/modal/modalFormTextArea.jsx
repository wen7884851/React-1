import React, { Component } from 'react';
import {Form} from 'semantic-ui-react';

class ModalFormTextArea extends Component{

    render(){
        const{rowTextArea}=this.props;
        return(
            <Form.TextArea fluid label={rowTextArea.labelName} 
            placeholder={rowTextArea.placeholder} 
            onChange={rowTextArea.valueChange.bind(null,rowTextArea.name)}></Form.TextArea>
            );
         }
    }
    
    export default ModalFormTextArea