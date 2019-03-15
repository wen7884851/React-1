import React, { Component } from 'react';
import TableForm from '../../components/TableForm/TableForm'
import {Button} from 'semantic-ui-react';


class ProjectProfile extends Component{


    cancle=()=>{
        window.location.href="/project/projectmanager/index";
    }



    render(){
        const{editHandClick=()=>{},creatHandClick=()=>{},saveHandClick=()=>{},deleteProjectModle=()=>{}}=this.props;
        let isNotEdit=this.props.isNotEdit;
            if(isNotEdit){
                return(
                    <div style={{background:'#FFFFFF',marginTop:'20px'
                    ,border:'3px solid #FCFCFC',overflow:'hidden',zoom:'1px'}}>
                    <TableForm formColumns={this.props.projectColumns} messagecontent={this.props.messagecontent} showMessage={this.props.showMessage} default={this.props.project}
                    disabled={this.props.isNotEdit}/>
                    <div style={{float:'right',paddingRight:'100px'}}>
                        <Button color='red' onClick={deleteProjectModle}>删除项目</Button></div>
                     <div style={{float:'right',paddingRight:'100px'}}>
                        <Button color='red' onClick={this.cancle}>返回</Button></div>
                    <div style={{float:'right',paddingRight:'100px'}}>
                        <Button primary onClick={creatHandClick}>新增细项</Button></div>
                    <div style={{float:'right',paddingRight:'50px'}}>
                        <Button primary onClick={editHandClick}>编辑</Button></div>
                    </div>)
            }
            else{
                return(
                    <div style={{background:'#FFFFFF',marginTop:'20px'
                    ,border:'3px solid #FCFCFC',overflow:'hidden',zoom:'1px'}}>
                    <TableForm formColumns={this.props.projectColumns} messagecontent={this.props.messagecontent} showMessage={this.props.showMessage} default={this.props.project}
                    disabled={this.props.isNotEdit}/>
                     <div style={{float:'right',paddingRight:'100px'}}>
                        <Button color='red' onClick={deleteProjectModle}>删除项目</Button></div>
                     <div style={{float:'right',paddingRight:'100px'}}>
                      <Button color='red' onClick={this.cancle}>返回</Button></div>
                    <div style={{float:'right',paddingRight:'100px'}}>
                        <Button primary onClick={creatHandClick}>新增细项</Button></div>
                    <div style={{float:'right',paddingRight:'50px'}}>
                        <Button primary onClick={saveHandClick}>保存</Button></div>
                    </div>)
            }
        
    }
}
export default ProjectProfile