import React, { Component } from 'react';
import {Form,Button,Header,Input, Message} from 'semantic-ui-react';
import axios from 'axios';

class EditPoint extends Component{

    state={
        ProjectType:[],
        ProfessionalType:[],
        UserList:[],
        Commission:"0  元",
        errorMessageVisble:'true',
        PointName:'',
        ProjectTypeId:0,
        ProfessionalTypeId:0,
        PointLeader:'',
        PonitContent:'',
        PointProportion:0,
        ManagementProportion:0,
        AuditProportion:0,
        JudgementProportion:0,
        PointFund:0
    }

    handleChange = ( e, {name,value}) => {
        this.setState({ [name]: value })}

    handleNumCheckChange= ( e, {name,value}) => {
        value=this.clearNoNum(value);
        this.setState({[name]:value});
    }

    CalculateCommission=()=>{
        if(this.checkCalculate()){
            axios.post('/Project/ProjectCalculation/CalculationProjectCommission',{ProjectTypeId:this.state.ProjectTypeId,
                ProfessionalTypeId:this.state.ProjectTypeId,PointFund:this.state.PointFund}).then(data=>{
                 if(data.data&&data.data>0){
                    this.setState({Commission:data.data+'  元',errorMessageVisble:'true'})
                 }
                 else{
                    this.setState({errorMessageContent:'计算错误:'+data.data,errorMessageVisble:''});
                 }});
        }
        
    }

    CreatePoint=()=>{
        if(this.checkCreate()){
            let projectId=this.getParam('projectId');
            let point={ProjectId:projectId,ProjectTypeId:this.state.ProjectTypeId,
                ProfessionalType:this.state.ProfessionalTypeId,PointName:this.state.PointName,
                PointFund:this.state.PointFund,PonitContent:this.state.PonitContent,PointLeader:this.state.PointLeader,
                ManagementProportion:this.state.ManagementProportion,AuditProportion:this.state.AuditProportion,
                JudgementProportion:this.state.JudgementProportion,PointProportion:this.state.PointProportion};
            this.props.submit(point);
        }
    }

    UpdatePoint=()=>{
        if(this.checkCreate()){
            let pointId=this.getParam('ponitId');
            let point={Id:pointId,ProjectTypeId:this.state.ProjectTypeId,
                ProfessionalType:this.state.ProfessionalTypeId,PointName:this.state.PointName,
                PointFund:this.state.PointFund,PonitContent:this.state.PonitContent,PointLeader:this.state.PointLeader,
                ManagementProportion:this.state.ManagementProportion,AuditProportion:this.state.AuditProportion,
                JudgementProportion:this.state.JudgementProportion,PointProportion:this.state.PointProportion};
            this.props.submit(point);  
        }
    }

    

    checkCreate(){
        let isChecked=true;
        let errorMessage='';
        if(typeof(this.state.PointName) === "undefined"||this.state.PointName===''){
            isChecked=false;
            errorMessage+='  请填写细项名称!';
        }
        if(typeof(this.state.ProjectTypeId) === "undefined"||this.state.ProjectTypeId<1){
            isChecked=false;
            errorMessage+='  请选择项目类别!';
        }
        if(typeof(this.state.ProfessionalTypeId) === "undefined"||this.state.ProfessionalTypeId<1){
            isChecked=false;
            errorMessage+='  请选择专业类别!';
        }
        if(typeof(this.state.PointLeader) === "undefined"||this.state.PointLeader<1){
            isChecked=false;
            errorMessage+='  请选择细项负责人!';
        }
        if(typeof(this.state.PointFund) === "undefined"||this.state.PointFund<=0){
            isChecked=false;
            errorMessage+='  请输入项目总造价!';
        }
        if(typeof(this.state.PointProportion) === "undefined"||this.state.PointProportion<=0||this.state.PointProportion>100){
            isChecked=false;
            errorMessage+='  专业系数输入有误!';
        }
        if(typeof(this.state.ManagementProportion) === "undefined"||this.state.ManagementProportion<=0||this.state.ManagementProportion>100){
            isChecked=false;
            errorMessage+='  管理系数输入有误!';
        }
        if(typeof(this.state.AuditProportion) === "undefined"||this.state.AuditProportion<=0||this.state.AuditProportion>100){
            isChecked=false;
            errorMessage+='  审核系数输入有误!';
        }
        if(typeof(this.state.JudgementProportion) === "undefined"||this.state.JudgementProportion<=0||this.state.JudgementProportion>100){
            isChecked=false;
            errorMessage+='  审定系数输入有误!';
        }
        if(!isChecked){
            this.setState({errorMessageContent:errorMessage,errorMessageVisble:''});
        }
        return isChecked;
    }

    checkCalculate(){
        
        let isChecked=true;
        let errorMessage='';
        if(typeof(this.state.ProjectTypeId) === "undefined"||this.state.ProjectTypeId<1){
            isChecked=false;
            errorMessage+='  请选择项目类别!';
        }
        if(typeof(this.state.ProfessionalTypeId) === "undefined"||this.state.ProfessionalTypeId<1){
            isChecked=false;
            errorMessage+='  请选择专业类别!';
        }
        if(typeof(this.state.PointFund) === "undefined"||this.state.PointFund<=0){
            isChecked=false;
            errorMessage+='  请输入项目总造价!';
        }
        if(!isChecked){
            this.setState({errorMessageContent:errorMessage,errorMessageVisble:''});
        }
        return isChecked;
    }

    selectChage= (e, {name,value}) => {
        this.setState({ [name]: value }
            )}

    componentDidMount(){
        this.init();
    }

    init(){
        this.getUserList();
        this.getProjectType();
        this.setState({ProfessionalType:this.getProfessionalType()});
        let pointId=this.getParam('ponitId');
        if(pointId){
            this.getProjectPointInfo(pointId);
        }
    }

    getProjectPointInfo(pointId){
        axios.post("/Project/ProjectManager/GetProjectPonitById",{pointId:pointId}).then(data=>{
            let point=data.data;
            console.log(point);
            this.setState({
                PointName:point.PointName,
                ProjectTypeId:point.ProjectTypeId,
                ProfessionalTypeId:point.ProfessionalType,
                PointLeader:point.PointLeader,
                PonitContent:point.PonitContent,
                PointProportion:point.PointProportion,
                ManagementProportion:point.ManagementProportion,
                AuditProportion:point.AuditProportion,
                JudgementProportion:point.JudgementProportion,
                PointFund:point.PointFund,
                Commission:point.Commission+'  元'
            });
        });
    }

    render(){
        if(this.props.IsEdit){
            return (
            <div>
            <Form>
                <Form.Group widths='equal'>
                    <Form.Input label='细项名称' placeholder='细项名称...' name='PointName' onChange={this.handleChange} defaultValue={this.state.PointName}></Form.Input>
                    <Form.Select label='项目类别' placeholder='项目类别...' options={this.state.ProjectType} name='ProjectTypeId'  defaultValue={this.state.ProjectTypeId} onChange={this.selectChage}></Form.Select>
                    <Form.Select label='专业类别' placeholder='专业类别...' name='ProfessionalTypeId' options={this.state.ProfessionalType} defaultValue={this.state.ProfessionalTypeId} onChange={this.selectChage}></Form.Select>
                    <Form.Select label='负责人' placeholder='负责人...' name='PointLeader'  options={this.state.UserList} defaultValue={this.state.PointLeader} onChange={this.selectChage}></Form.Select>
                </Form.Group>
                <Form.TextArea label='项目内容介绍' placeholder='项目内容介绍...' name='PonitContent' onChange={this.handleChange} defaultValue={this.state.PonitContent}></Form.TextArea>
                <Form.Group widths='equal'>
                    <Form.Input label='专业系数' placeholder='专业系数...' name='PointProportion' onChange={this.handleNumCheckChange} defaultValue={this.state.PointProportion}></Form.Input>
                    <Form.Input label='管理系数' placeholder='管理系数...' name='ManagementProportion' onChange={this.handleNumCheckChange} defaultValue={this.state.ManagementProportion} ></Form.Input>
                    <Form.Input label='审核系数' placeholder='审核系数...' name='AuditProportion' onChange={this.handleNumCheckChange} defaultValue={this.state.AuditProportion} ></Form.Input>
                    <Form.Input label='审定系数' placeholder='审定系数...' name='JudgementProportion' onChange={this.handleNumCheckChange} defaultValue={this.state.JudgementProportion} ></Form.Input>
                </Form.Group>
                <Form.Group widths='20'>
                    <Form.Field width='5'>
                         <label >项目总造价</label>
                         <Input label={{ basic: true, content: '万元' }}
                         name='PointFund'
                         defaultValue={this.state.PointFund}
                         onChange={this.handleNumCheckChange}
                         labelPosition='right'
                         placeholder='项目总造价...'
                         />
                    </Form.Field>
                    <Form.Field width='3'>
                    <div style={{float:"left",paddingLeft:'30px',paddingRight:'10px',paddingTop:'30px',fontWeight:'bold'}}>
                        <label >提成金额:</label></div>
                        <div style={{float:"left",paddingLeft:'20px',paddingTop:'33px'}}>
                        <Header as='h4' color='red' content={this.state.Commission} /></div>
                    </Form.Field>
                    <Form.Field width='2'>
                    <div style={{paddingTop:'25px'}}>
                        <Button Positive onClick={this.CalculateCommission} widths={3}>计算提成</Button></div>
                    </Form.Field >
                    <Message negative content={this.state.errorMessageContent} hidden={this.state.errorMessageVisble}/>
                    <Form.Field width='10'>
                    <div style={{float:'right',paddingTop:'30px',paddingRight:'50px'}}>
                    <Button color='red' onClick={this.props.Cancle}>返回</Button></div>
                    <div style={{float:'right',paddingTop:'30px',paddingRight:'50px'}}>
                    <Button color='green' onClick={this.UpdatePoint}>修改保存</Button></div>
                   </Form.Field >
                </Form.Group>
            </Form>

            </div>);
        }
        return(<Form>
            <Form.Group widths='equal'>
                <Form.Input label='细项名称' placeholder='细项名称...' name='PointName' onChange={this.handleChange} ></Form.Input>
                <Form.Select label='项目类别' placeholder='项目类别...' options={this.state.ProjectType} name='ProjectTypeId' onChange={this.selectChage}></Form.Select>
                <Form.Select label='专业类别' placeholder='专业类别...' name='ProfessionalTypeId' options={this.state.ProfessionalType}  onChange={this.selectChage}></Form.Select>
                <Form.Select label='负责人' placeholder='负责人...' name='PointLeader'  options={this.state.UserList} onChange={this.selectChage}></Form.Select>
            </Form.Group>
            <Form.TextArea label='项目内容介绍' placeholder='项目内容介绍...' name='PonitContent' onChange={this.handleChange}></Form.TextArea>
            <Form.Group widths='equal'>
                <Form.Input label='专业系数' placeholder='专业系数...' name='PointProportion' onChange={this.handleNumCheckChange} ></Form.Input>
                <Form.Input label='管理系数' placeholder='管理系数...' name='ManagementProportion' onChange={this.handleNumCheckChange} ></Form.Input>
                <Form.Input label='审核系数' placeholder='审核系数...' name='AuditProportion' onChange={this.handleNumCheckChange} ></Form.Input>
                <Form.Input label='审定系数' placeholder='审定系数...' name='JudgementProportion' onChange={this.handleNumCheckChange} ></Form.Input>
            </Form.Group>
            <Form.Group widths='20'>
                <Form.Field width='5'>
                     <label >项目总造价</label>
                     <Input label={{ basic: true, content: '万元' }}
                     name='PointFund'
                     value={this.state.PointFund}
                     onChange={this.handleNumCheckChange}
                     labelPosition='right'
                     placeholder='项目总造价...'
                     />
                </Form.Field>
                <Form.Field width='3' >
                <div style={{float:"left",paddingLeft:'30px',paddingRight:'10px',paddingTop:'30px',fontWeight:'bold'}}>
                    <label >提成金额</label></div>
                    <div style={{float:"left",paddingRight:'10px',paddingTop:'30px'}}>
                    <Header as='h4' color='red' content={this.state.Commission} /></div>
                </Form.Field>
                <Form.Field width='2'>
                <div style={{paddingTop:'25px'}}>
                    <Button Positive onClick={this.CalculateCommission} widths={3}>计算提成</Button></div>
                </Form.Field >
                <Message negative content={this.state.errorMessageContent} hidden={this.state.errorMessageVisble}/>
                <Form.Field width='5'>
                <div style={{float:'right',paddingTop:'30px',paddingRight:'50px'}}>
                <Button color='red' onClick={this.props.Cancle}>返回</Button></div>
                <div style={{float:'right',paddingTop:'30px',paddingRight:'50px'}}>
                <Button color='green' onClick={this.CreatePoint}>创建</Button></div></Form.Field >
            </Form.Group>
        </Form>);
    }

    getProjectType(){
        axios.get('/Project/ProjectCalculation/GetProjectType').then(data=>{
            this.setState({ProjectType:data.data});
        });
    }

    getProfessionalType(){
        return [{key:1,text:'土建',value:1},{key:2,text:'安装',value:2}]
    }

    getUserList(){
        axios.get('/Common/Account/GetUserList').then(data=>{
            this.setState({UserList:data.data});
        });
    }

    clearNoNum(obj){ 
        obj = obj.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符  
        obj = obj.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的  
        obj = obj.replace(".","$#$").replace(/\./g,"").replace("$#$",".");  
        if(obj.indexOf(".")< 0 && obj !==""){//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额 
            obj= parseFloat(obj); 
        } 
        return obj;
    } 

    getParam(paramName){
        let reg = new RegExp("(^|&)"+ paramName +"=([^&]*)(&|$)");
        let r = window.location.search.substr(1).match(reg);//search,查询？后面的参数，并匹配正则
        if(r!=null)return  unescape(r[2]); return null;
    }
}
export default EditPoint