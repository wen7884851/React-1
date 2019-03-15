import React, { Component } from 'react';
import ModalForm from '../../components/modal/modalForm';
import axios from 'axios';

class CreateProject extends Component{

    constructor(props){
        super(props);
        this.createProject=this.createProject.bind(this);
    }
    
    state={
        modalName:"新建项目",
        modalHeader:"新建项目",
        formColumns:[],
        buttonItems:[],
        hiddenMessage:'true',
        messagecontent:'',
        formLoading:'',
        userList: []
    }

    componentDidMount(){ 
        axios.get('/Common/Account/GetUserList').then(data=>{
            this.setState({userList:data.data});
            this.init();
          })          
        }


    init(){
        const button=[{title:"确  认",handClick:this.createProject,type:'positive'},
        {title:"取  消",handClick:this.handleCloseModal,type:'negative'}];
        this.setState({
            buttonItems:button,
            formColumns:this.getProjectFormColumns(this.state.userList),
        });
    }


    createProject=()=>{
        if(this.checkProjectResult())
        {
            this.setState({formLoading:'true'});
            axios.post("/Project/ProjectManager/CreateProject",{ProjectName:this.state.projectName,ProjectLeader:this.state.leader,
            LinkPerson:this.state.linkPerson,LinkPhoneNo:this.state.linkPhoneNo,
            Content:this.state.content,Address:this.state.address}).then(data=>{
                console.log(data);
                if(data.data&&data.data.IsSuccess)
                {
                    this.props.TableQuery();  
                    this.setState({openCreateModal:false});
                }
                else
                {
                    this.setState({hiddenMessage:'',
                    messagecontent:'创建失败:'+ data.data.result});
                }
                this.setState({formLoading:''});
            })}
    }

    checkProjectResult(){
        this.setState({hiddenMessage:'true'});
        let message='';
        if(typeof(this.state.projectName) == "undefined"||this.state.projectName==='')
        {
             message='项目名称不能为空;';
        }
        if(typeof(this.state.leader) == "undefined"||this.state.leader==='')
        {

             message+='负责人不能为空;';
        }
        if(message!=='')
        {
         this.setState({messagecontent:message,hiddenMessage:''});
         return false;
        }
        return true;
    }

    handleOpenModal=()=>
    {
        this.setState({openCreateModal:true});
    }

    handleCloseModal=()=>{
        this.props.TableQuery();
        this.setState({openCreateModal:false});
    }

    inputChage=(name,e)=>{
        this.setState({[name]: e.target.value});
    }

    render(){
        return(
            <ModalForm modalName={this.state.modalName} modalHeader={this.state.modalHeader}
            formColumns={this.state.formColumns} buttonItems={this.state.buttonItems}
            messagecontent={this.state.messagecontent} showMessage={this.state.hiddenMessage}
            openModal={this.state.openCreateModal} handleOpenModal={this.handleOpenModal}
            ></ModalForm>
        )
    }

     async getUser(){
     const _this=this; 
     await axios.get('/Common/Account/GetUserList').then(data=>{
        _this.setState({userList:data.data});
      })   
    }

    selectChage= (e, { name, value }) => this.setState({ [name]: value })

    getProjectFormColumns=(options)=>([
        {row:[{
                labelName:"项目名称",
                name:'projectName',
                placeholder:"名称...",
                valueChange:this.inputChage,
                type:1
            },{
                labelName:"项目负责人",
                name:'leader',
                placeholder:"负责人...",
                valueChange:this.selectChage,
                options:options,
                type:2
            }]},
            {
                row:[{
                    labelName:"项目联系人",
                    name:"linkPerson",
                    placeholder:"联系人...",
                    valueChange:this.inputChage,
                    type:1
                },{
                    labelName:"项目电话",
                    name:"linkPhoneNo",
                    placeholder:"电话...",
                    valueChange:this.inputChage,
                    type:1
                }]
            },
            {
                row:[{
                    labelName:"项目地址",
                    name:"address",
                    placeholder:"地址...",
                    valueChange:this.inputChage,
                    type:1
                }]
            },
            {
                row:[{
                    labelName:"项目介绍",
                    name:"content",
                    placeholder:"介绍...",
                    valueChange:this.inputChage,
                    type:3
                }]
            }
        ]);
}

export default CreateProject;