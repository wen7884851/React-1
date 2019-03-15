import React, { Component } from 'react';
import {Form} from 'semantic-ui-react';

class ModalFormSelect extends Component{

    render(){
        const{labelName,options,placeholder,valueChange,name}=this.props;
        return(
            <Form.Select fluid label={labelName}
            placeholder={placeholder} options={options}
            onChange={valueChange.bind(null,name)}
            ></Form.Select>
            );
         }
    }
    
    export default ModalFormSelect