import React, { Component } from 'react';
import EditPoint from './EditPoint';
import {Button,Header} from 'semantic-ui-react';
import PointUserStoreList from './PointUserStoreList';
import DeleteUserStore from './DeleteUserStore';
import DeleteProjectPoint from './DeleteProjectPoint';
import EditUserStore from './EditUserStore';
import axios from 'axios';

class EditProjectPonit extends Component{
    state={
        isEdit:false,
        editUserStoreModal:false,
        deleteUserStoreModal:false,
        deleteProjectPointModal:false,
        Commission:0,
    }

    componentDidMount(){
        this.init();   
    }

   async getProjectPointInfo(pointId){
        axios.post("/Project/ProjectManager/GetProjectPonitById",{pointId:pointId}).then(data=>{
           this.setState({point:data.data})
        });
    }


    init(){
        let ponitId=this.getParam('ponitId');
        let projectId=this.getParam('projectId');
        if(ponitId){
            this.getProjectPointInfo(ponitId);
            this.setState({ponitId:ponitId,projectId:projectId});
            this.getUserStoreList(1);
            this.setState({isEdit:true});
        }
        else{
            this.setState({userStoreList:this.getUserStoreList,projectId:projectId})
        }
    }

    getUserStoreList(pageIndex){
        var ponitId=this.state.ponitId;
        if(pageIndex&&pageIndex<1)
        {
            pageIndex=1;
        }
        //查询
        axios.post("/Project/ProjectUserStore/GetUserStoreListByQuery",{query:{PointId:ponitId,PageIndex:pageIndex}}).then(data=>{
            this.setState({userStoreList:data.data,totleCount:data.totleCount})
         });
    }

    createUserStore=()=>{
        this.setState({editUserStoreModal:true,currentStoreId:0});
    }

    editUserStore=(e)=>{
        this.setState({editUserStoreModal:true,currentStoreId:e.target.id});
    }

    deleteUserStore=(e)=>{
        this.setState({deleteUserStoreModal:true,currentStoreId:e.target.id});
    }

    deleteProjectPoint=()=>{
        this.setState({deleteProjectPointModal:true});
    }

    createPoint=()=>{
       var projectPoint={PointName:this.state.PointName,ProjectTypeId:this.state.ProjectTypeId,ProfessionalTypeId:this.state.ProfessionalTypeId,PointLeader:this.state.PointLeader,PonitContent:this.state.PonitContent,
        PointProportion:this.state.PointProportion,ManagementProportion:this.state.ManagementProportion,AuditProportion:this.state.AuditProportion,JudgementProportion:this.state.JudgementProportion,
        PointFund:this.state.PointFund,Commission:this.state.Commission};
        this.setState({projectPoint:projectPoint})
    }

    Cancle=()=>{
        window.location.href='/project/projectmanager/ProjectProfile?projectId='+this.state.projectId;
    }

    render(){
        if(this.state.isEdit&&this.state.point){
            return (<div>
                <Header as='h2' icon='database' content={this.state.point.PointName}/>
                <EditPoint IsEdit={true} Cancle={this.Cancle} point={this.state.point}/>
                    <div style={{float:'right',paddingTop:'10px',paddingBottom:'10px',paddingRight:'50px'}}>
                    <Button color='red' onClick={this.deleteProjectPoint}>删除项目细项</Button></div>
                    <div style={{float:'right',paddingTop:'10px',paddingBottom:'10px',paddingRight:'50px'}}>
                    <Button color='red' onClick={this.Cancle}>返回</Button></div>
                    <div style={{float:'right',paddingTop:'10px',paddingBottom:'10px',paddingRight:'50px'}}>
                    <Button color='green' onClick={this.CreatePoint}>保存</Button></div>
                    <div style={{float:'right',paddingTop:'10px',paddingBottom:'10px',paddingRight:'50px'}}>
                    <Button color='green' onClick={this.createUserStore}>添加项目成员</Button></div>
                <PointUserStoreList userStoreList={this.state.userStoreList} totleCount={this.state.totleCount} queryHandle={this.getUserStoreList}
                editUserStore={this.editUserStore} deleteUserStore={this.deleteUserStore} pagelimit={10} columns={this.getProjectTableColumns()}/>
                <DeleteProjectPoint closeModal={()=>this.setState({deleteProjectPointModal:false})} 
                ponitId={this.state.ponitId} loading='' visble={this.state.deleteProjectPointModal}/>
                <DeleteUserStore closeModal={()=>this.setState({deleteUserStoreModal:false})} queryHandle={()=>this.getUserStoreList(this.state.pageIndex)} 
                userStore={this.state.currentStoreId} visble={this.state.deleteUserStoreModal}/>
                <EditUserStore closeModal={()=>this.setState({editUserStoreModal:false})} queryHandle={this.getUserStoreList} 
                pointId={this.state.pointId} userStore={this.state.currentStoreId} visble={this.state.editUserStoreModal} ponitFund={this.state.point.PointFund}/>
                </div>
            );
        }
        return(<div>
        <Header as='h2' icon='database' content='新增项目细项'/>
        <EditPoint IsEdit={false} CreatePoint={this.createPoint} Cancle={this.Cancle} /></div>);
    }

    getProjectTableColumns=()=>([
        {
            title: '项目成员',
            dataIndex: 'UserName',
            render:(value,item)=>{
                return <a href='#' id={item.Id} onClick={this.editUserStore.bind()}>{value}</a>
            }
        },
        {
            title: '工作内容',
            dataIndex: 'StoreContent',
            render:(value,item)=>{
                return this.LimitText(value,30)
            }
        },
        {
            title: '负责项目预算资金(单位:万)',
            dataIndex: 'StoreFund',
            render:(value,item)=>{
                return value
            }
        },
        {
            title: '负责项目预算占比(单位:%)',
            dataIndex: 'ProjectPointProportion',
            render:(value,item)=>{
                return value
            }
        },
        {
            title: '创建时间',
            dataIndex: 'CreateTime',
            render:(value,item)=>{
                return value
            }
        },
        {
            title: '操作',
            dataIndex: 'DeleteItem',
            render:(value,item)=>{
                if(value)
                {
                    return <a href='#' id={item.Id} onClick={this.deleteUserStore.bind()}>删除</a>
                }
                return '无操作';
            }
        }
        ]);

        LimitText(value,limitNum=10){
            if(limitNum<10)
            {
                limitNum=10;
            }
            if(value.length<=limitNum)
            {
                return value;
            }
            return value.substring(0,limitNum)+'...';
        }

    getParam(paramName){
        let reg = new RegExp("(^|&)"+ paramName +"=([^&]*)(&|$)");
        let r = window.location.search.substr(1).match(reg);//search,查询？后面的参数，并匹配正则
        if(r!=null)return  unescape(r[2]); return null;
    }
}
export default EditProjectPonit