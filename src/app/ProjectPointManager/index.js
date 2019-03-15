import React, { Component } from 'react';
import {Header} from 'semantic-ui-react';
import ProjectProfile from './ProjectProfile';
import TablePage from '../../components/TableList/table';
import MessageModal from '../../components/modal/messageModal';
import ChoiceModalForm from '../../components/modal/choiceModalForm';
import getProjectPointTableColumns from './config';
import axios from 'axios';

class ProjectPointManager extends Component{

    constructor(props){
        super(props);
        this.handClickEdit=this.handClickEdit.bind(this);
    }

    componentDidMount(){
        this.init();   
    }

    state={
        project:[],
        projectColumns:[],
        projectPointColumns:[],
        projectPointdataSource:[],
        userList: [],
        showMessage:true,
        messagecontent:'',
        isNotEdit:true,
        pageIndex:1,
        pageSize:20,
        totleCount:0,
        projectId:'',
        saveModalVisble:false,
        isDeleteModle:false
    }

    init(){
        axios.get('/Common/Account/GetUserList').then(data=>{
            this.setState({userList:data.data});
        });
         this.setState({projectId:this.getParam("projectId"),projectPointColumns:getProjectPointTableColumns()});
         this.GetProjectProfile(); 
         this.handProjectPointQuery();
     }
 
    GetProjectProfile(){
        let projectId=this.getParam("projectId");
        axios.post('/Project/projectmanager/ProjectList',{query:{ProjectId:projectId}}).then(data=>{
        if(data.data){
            this.setState({projectColumns:this.getProjectFormColumns(this.state.userList),project:data.data.Items[0]});
        }
        else
        {
            window.location.href="/project/projectmanager/index";
        }
    });}

    handProjectPointQuery=()=>{
        let projectId=this.getParam("projectId");
        axios.post('/Project/projectmanager/GetProjectPonitList',{queryModel:{ProjectId:projectId
            ,PageIndex:this.state.pageIndex,PageSize:this.state.pageSize}}).then(data=>{
            if(data.data){
                    this.setState({projectPointdataSource:data.data,totleCount:data.data.TotalItemsCount})
            }
    });}

    handClickcreatPoint=()=>{
        window.location.href='/project/projectmanager/ProjectProfile?projectId='+this.state.projectId;
    }

     handClickEdit=()=>{
        this.setState({isNotEdit:false});
     }

     saveHandClick=()=>{
        let projectModel={
            Id:this.state.projectId?this.state.projectId:this.state.project.projectId,
            ProjectName:this.state.ProjectName?this.state.ProjectName:this.state.project.ProjectName,
            ProjectLeader:this.state.ProjectLeader?this.state.ProjectLeader:this.state.project.ProjectLeader,
            LinkPerson:this.state.LinkPerson?this.state.LinkPerson:this.state.project.LinkPerson,
            LinkPhoneNo:this.state.LinkPhoneNo?this.state.LinkPhoneNo:this.state.project.LinkPhoneNo,
            Address:this.state.Address?this.state.Address:this.state.project.Address,
            Content:this.state.Content?this.state.Content:this.state.project.Content};
                axios.post('/Project/projectmanager/UpdateProject',projectModel).then(data=>{
                    if(data.data.IsSuccess){
                        this.setState({isNotEdit:true,saveModalVisble:true,saveMessageHeader:'保存成功',saveMessageContent:'项目修改成功！'});
                    }
                    else {
                    this.setState({saveModalVisble:true,saveMessageHeader:'保存失败',saveMessageContent:data.data.Result});
                    }
            });
     }

     creatHandClick=()=>{
        window.location.href='/project/projectmanager/EditProjectPonit?projectId='+this.state.projectId;
     }

     editHandClick=(pointId)=>{
        window.location.href='/project/projectmanager/EditProjectPonit?projectId='+this.state.projectId+'&pointId'+pointId;
     }

     deleteProject=()=>{
        let projectId=this.getParam('projectId');
        axios.post("/Project/ProjectManager/DeleteProject",{projectId:projectId}).then(data=>{
            window.location.href="/project/projectmanager/index";
        });
    }


    render(){
        if(this.state.project){
        return(
            <div style={{width:'100%',padding:'10px'}}>
                <Header as='h2' icon='protect' content={this.state.project['ProjectName']}/>
                <div style={{background:'#FFFFFF',marginTop:'20px'
                ,border:'3px solid #FCFCFC',overflow:'hidden',zoom:'1px'}}>
                <ProjectProfile projectColumns={this.state.projectColumns} messagecontent={this.state.messagecontent} showMessage={this.state.showMessage}
                 isNotEdit={this.state.isNotEdit} project={this.state.project} editHandClick={this.handClickEdit} creatHandClick={this.creatHandClick}
                 saveHandClick={this.saveHandClick} deleteProjectModle={()=>this.setState({isDeleteModle:true})}/>
                </div>
                <Header as='h2' icon='database' content='项目细项列表'/>
                <TablePage dataSource={this.state.projectPointdataSource} columns={this.state.projectPointColumns} pageIndex={this.state.pageIndex}
                 pagelimit={this.state.pageSize} totleCount={this.state.totleCount} pageChange={(val) => {this.setState({pageIndex:val});this.handProjectPointQuery();}}/>
                 <MessageModal header={this.state.saveMessageHeader} content={this.state.saveMessageContent} visble={this.state.saveModalVisble} size='mini' Ok={()=>{this.setState({saveModalVisble:false})}}/>
                 <ChoiceModalForm header='删除项目' content='请再次确认是否删除该项目，删除后将会把项目关联的所有内容均删除' size='mini' cancle={()=>this.setState({isDeleteModle:false})}
                 submit={this.deleteProject} visble={this.state.isDeleteModle}/>
            </div>
        );
        }
        return <div></div>;
    }

    getProjectFormColumns=(options)=>([
        {row:[{
                labelName:"项目名称",
                name:'ProjectName',
                placeholder:"名称...",
                valueChange:this.inputChage,
                type:1
            },{
                labelName:"项目负责人",
                name:'ProjectLeader',
                placeholder:"负责人...",
                options:options,
                valueChange:this.selectChage,
                type:2
            },{
                labelName:"项目联系人",
                name:"LinkPerson",
                placeholder:"联系人...",
                valueChange:this.inputChage,
                type:1
            },{
                labelName:"项目电话",
                name:"LinkPhoneNo",
                placeholder:"电话...",
                valueChange:this.inputChage,
                type:1
            }]},
            {
                row:[{
                    labelName:"项目地址",
                    name:"Address",
                    placeholder:"地址...",
                    valueChange:this.inputChage,
                    type:1
                }]
            },
            {
                row:[{
                    labelName:"项目介绍",
                    name:"Content",
                    placeholder:"介绍...",
                    valueChange:this.inputChage,
                    type:3
                }]
            }
        ]);

        inputChage=(name,e)=>{
            this.setState({[name]: e.target.value});
        }
    
        selectChage= (e, { name, value }) => 
        {
            this.setState({ [name]: value })}

        apiUrl(){
            return {
                getUser: () => { return [{key: 1, text: 'admin', value: '1'},
                {key: 2, text: 'aaaaaa', value: '2'}] }
            }
        };

    getParam(paramName){
        let reg = new RegExp("(^|&)"+ paramName +"=([^&]*)(&|$)");
        let r = window.location.search.substr(1).match(reg);//search,查询？后面的参数，并匹配正则
        if(r!=null)return  unescape(r[2]); return null;
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
}
export default ProjectPointManager
