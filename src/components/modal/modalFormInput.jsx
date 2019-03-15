import React, { Component } from 'react';
import {Form} from 'semantic-ui-react';

class ModalFormInput extends Component{

render(){
    const{labelName,placeholder,valueChange,name}=this.props;
    return(
        <Form.Input fluid label={labelName} 
        placeholder={placeholder} 
        onChange={valueChange.bind(null,name)}></Form.Input>
        );
     }
}

export default ModalFormInput