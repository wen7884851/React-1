import React, { Component } from 'react';
import {Form} from 'semantic-ui-react';

class FormTextArea extends Component{

    render(){
        const{labelName,placeholder,valueChange,name,disabled="",value,defaultValue=''}=this.props;
        return(
            <Form.TextArea label={labelName} 
            placeholder={placeholder} 
            value={value}
            onChange={valueChange.bind(null,name)} disabled={disabled}
            defaultValue={defaultValue}></Form.TextArea>
            );
         }
    }
    
    export default FormTextArea