import React, { Component } from 'react';
import {Input,Header} from 'semantic-ui-react';

class SerchItem extends Component{

    render(){
        const {serchValue,lableName,placeholder,onChange = ()=>{},onEnter = () => {}}=this.props;
        return (<div style={{padding:'10px',float:'left'}}><Header size='medium' style={{float:'left',paddingTop:'10px'}}>{lableName}</Header>
        <div style={{float:'left',paddingLeft:'5px'}}>
        <Input placeholder={placeholder} value={serchValue}
        onKeyUp={(e) => {if(e.keyCode === 13){ onEnter(); }}}
        onChange={(e) => {onChange(e.target.value)}}/></div></div>
        );
        };
    }
    export default SerchItem;