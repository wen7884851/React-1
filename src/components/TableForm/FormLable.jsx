import React, { Component } from 'react';
import {Form} from 'semantic-ui-react';

class FormLable extends Component{

    render(){
        const{labelName,value}=this.props;
        return(
            <Form.Field>
            <label>{labelName+':'}</label>
            <label>{value}</label>
            </Form.Field>
            );
         }
    }
    
    export default FormLable