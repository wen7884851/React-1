import React, { Component } from 'react';
import {Form,Message} from 'semantic-ui-react';
import FormInput from './FormInput';
import FormSelect from './FormSelect';
import FormTextArea from './FormTextArea';
import FormLable from './FormLable';

class TableForm extends Component{

    getItem(row){
        let defaultValue=this.props.default;
        let disabled=this.props.disabled;
        if(defaultValue){
           let value=(defaultValue[row.name]&&defaultValue[row.name]!=='')?defaultValue[row.name]:'';
            switch(row.type){
                case 1:
                return <FormInput labelName={row.labelName} placeholder={row.placeholder} name={row.name} defaultValue={value}
                valueChange={row.valueChange} disabled={disabled}></FormInput>;
                case 2:
                return <FormSelect labelName={row.labelName} placeholder={row.placeholder} name={row.name} defaultValue={value}
                valueChange={row.valueChange} disabled={disabled} options={row.options} ></FormSelect>;
                case 3:
                return <FormTextArea labelName={row.labelName} placeholder={row.placeholder} name={row.name} defaultValue={value}
                valueChange={row.valueChange} disabled={disabled}></FormTextArea>;
                default:
                return <FormLable labelName={row.labelName} value={row.value}></FormLable>;
        }
    }
    switch(row.type){
        case 1:
        return <FormInput labelName={row.labelName} placeholder={row.placeholder} name={row.name}
        valueChange={row.valueChange} disabled={disabled}></FormInput>;
        case 2:
        return <FormSelect labelName={row.labelName} placeholder={row.placeholder} name={row.name}
        valueChange={row.valueChange} disabled={disabled} options={row.options} ></FormSelect>;
        case 3:
        return <FormTextArea labelName={row.labelName} placeholder={row.placeholder} name={row.name}
        valueChange={row.valueChange} disabled={disabled}></FormTextArea>;
        default:
        return <FormLable labelName={row.labelName} value={row.value}></FormLable>;
    }
}

    buildForm(formColumns)
    {
        if(formColumns&&formColumns.length>0){
        return( <Form>
            {formColumns.map(col=>
             <Form.Group widths='equal'>
                {col.row.map(row=>{return this.getItem(row)})}
             </Form.Group>
             )}
            </Form>)
        }
    }

    render(){
        return(<div style={this.props.tableStyle}>
             {this.buildForm(this.props.formColumns)}
                <Message error  content={this.props.messagecontent} hidden={this.props.showMessage}/>
        </div>);
    }
}

export default TableForm;