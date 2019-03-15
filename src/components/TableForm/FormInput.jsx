import React, { Component } from 'react';
import {Form} from 'semantic-ui-react';

class FormInput extends Component{

render(){
    const{labelName,placeholder,value,valueChange,name,disabled='',defaultValue='',inline=false}=this.props;
    return(
        <Form.Input label={labelName} 
        placeholder={placeholder} 
        value={value}
        onChange={valueChange.bind(null,name)}
        disabled={disabled}
        defaultValue={defaultValue}></Form.Input>
        );
     }
}

export default FormInput