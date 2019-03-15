import React, { Component } from 'react';
import {Form} from 'semantic-ui-react';

class FormSelect extends Component{

    render(){
        const{labelName,options,placeholder,value,valueChange=()=>{},name,disabled='',defaultValue}=this.props;
        return(
            <Form.Select label={labelName}
            name={name}
            placeholder={placeholder} options={options}
            defaultValue={defaultValue}
            onChange={valueChange}
            disabled={disabled}
            value={value}
            ></Form.Select>
            );
         }
    }
    
    export default FormSelect