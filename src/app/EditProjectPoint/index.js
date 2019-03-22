import React, { Component } from 'react';
import EditPoint from './EditPoint';
import {Button,Header} from 'semantic-ui-react';
import DeleteUserStore from './DeleteUserStore';
import DeleteProjectPoint from './DeleteProjectPoint';
import EditUserStore from './EditUserStore';
import ChoiceModalForm from '../../components/modal/choiceModalForm';
import MessageModal from '../../components/modal/MessageModal';
import TablePage from '../../components/TableList/table';
import axios from 'axios';

class EditProjectPoint extends Component{
    state={
        pointId:0,
        isEdit:false,
        editUserStoreModal:false,
        deleteUserStoreModal:false,
        deleteProjectPointModal:false,
        savePointModal:false,
        Commission:0,
        errorMessageHeader:'',
        errorMessageContent:'',
        errorMessageModal:false,
        submitLoading:false,
        totleCount:0,
        currentPageIndex:1
    }

    componentDidMount(){
        this.init();   
    }

      getProjectPointInfo(pointId){
        axios.post("/Project/ProjectManager/GetProjectPonitById",{pointId:pointId}).then(data=>{
           this.setState({point:data.data,projectId:data.data.projectId,pointId:pointId})
        });
    }


    init(){
        let pointId=this.getParam('pointId');
        let projectId=this.getParam('projectId');
        if(pointId){
            this.getProjectPointInfo(pointId);
            this.getUserStoreList();
            this.setState({isEdit:true,projectPointTableColumns:this.getUserStoreTableColumns()});
        }
        else{
            this.setState({userStoreList:this.getUserStoreList,projectId:projectId})
        }
    }

     getUserStoreList=()=>{
        let pointId=this.state.pointId;
        if(pointId || pointId === 0){
            pointId= this.getParam('pointId');
        }
        let pageIndex=this.state.currentPageIndex;
        console.log(this.state);
        if(pageIndex&&pageIndex<1)
        {
            pageIndex=1;
        }
        //查询
        axios.post("/Project/ProjectUserStore/GetUserStoreListByQuery",{query:{PointId:pointId,PageIndex:pageIndex}}).then(data=>{
            this.setState({userStoreList:data.data,totleCount:data.data.TotalItemsCount})
         });
    }

    editPointOpenModal=(point)=>{
        this.setState({point:point,savePointModal:true});
    }

    updatePoint=()=>{
        let point=this.state.point;
        this.setState({submitLoading:true});
        axios.post('/Project/ProjectPointManager/UpdateProjectPoint',point).then(data=>{
                if(data.data&&data.data.IsSuccess){
                    this.setState({savePointModal:false});
                }else{
                    this.setState({errorMessageHeader:'系统错误',errorMessageModal:true,errorMessageContent:data.data.Result,savePointModal:false});
                }
                this.setState({submitLoading:false});
            });
    }

    createPoint=()=>{
        let point=this.state.point;
        this.setState({submitLoading:true});
        axios.post('/Project/ProjectPointManager/CreateProjectPoint',point).then(data=>{
                if(data.data&&data.data.IsSuccess){
                    window.location.href='/project/projectmanager/EditProjectPonit?pointId='+data.data.Result;
                }
                else{
                    this.setState({errorMessageModal:true,errorMessageHeader:'系统错误',errorMessageContent:data.data.Result,savePointModal:false});
                }
                this.setState({submitLoading:false});
            });
    }

    deleteUserStore=()=>{
        axios.post('/Project/ProjectUserStore/DeleteUserStore',{storeId:this.state.currentStoreId}).then(data=>{
            if(data.data&&data.data.IsSuccess){
                this.getUserStoreList();
            }
            else{
                this.setState({errorMessageModal:true,errorMessageHeader:'系统错误',errorMessageContent:data.data.Result,savePointModal:false});
            }
        });
        this.setState({deleteUserStoreModal:false});
    }

    deleteUserStoreOpenModel=(e)=>{
        this.setState({deleteUserStoreModal:true,currentStoreId:parseInt(e.target.id)});
        console.log(e.target.id);
    }

    deleteProjectPoint=()=>{
        this.setState({deleteProjectPointModal:true});
    }

    render(){
        if(this.state.isEdit&&this.state.point){
            return (<div>
                <Header as='h2' icon='database' content={this.state.point.PointName} />
                <EditPoint IsEdit={true} submit={this.editPointOpenModal}/>
                    <div style={{float:'right',paddingTop:'10px',paddingBottom:'10px',paddingRight:'50px'}}>
                    <Button color='red' onClick={this.deleteProjectPoint}>删除项目细项</Button></div>
                    <div style={{float:'right',paddingTop:'10px',paddingBottom:'10px',paddingRight:'50px'}}>
                    <EditUserStore queryHandle={this.getUserStoreList} ponitFund={this.state.point.PointFund} pointId={this.state.pointId}/></div>
                <ChoiceModalForm header='修改项目点' content='请确认是否保存修改内容!' visble={this.state.savePointModal} 
                size='mini' submit={this.updatePoint} loading={this.state.submitLoading} cancle={()=>this.setState({savePointModal:false})}/>
                <TablePage dataSource={this.state.userStoreList} columns={this.state.projectPointTableColumns} pageIndex={this.state.currentPageIndex}
                 pagelimit={10} totleCount={this.state.totleCount} pageChange={(val) => {this.setState({currentPageIndex:val});this.getUserStoreList();}}/>
                <DeleteProjectPoint closeModal={()=>this.setState({deleteProjectPointModal:false})} 
                pointId={this.state.pointId} loading='' visble={this.state.deleteProjectPointModal}/>
                <DeleteUserStore closeModal={()=>this.setState({deleteUserStoreModal:false})}
                 visble={this.state.deleteUserStoreModal} deleteUserStore={this.deleteUserStore}/>
                <MessageModal header={this.state.errorMessageHeader} content={this.state.errorMessageContent} visble={this.state.errorMessageModal}
                size='mini' Ok={()=>{this.setState({errorMessageModal:false})}}/>
                </div>
            );
        }
        return(<div>
        <Header as='h2' icon='database' content='新增项目细项'/>
        <EditPoint IsEdit={false} CreatePoint={this.createPoint} submit={this.editPointOpenModal}/>
        <ChoiceModalForm header='修改项目点' content='请确认是否保存修改内容!' visble={this.state.savePointModal} 
        size='mini' submit={this.createPoint} loading={this.state.submitLoading} cancle={()=>this.setState({savePointModal:false})}/>
        <MessageModal header={this.state.errorMessageHeader} content={this.state.errorMessageContent} visble={this.state.errorMessageModal}
        size='mini' Ok={()=>{this.setState({errorMessageModal:false})}}/></div>);
        
    }

    getUserStoreTableColumns=()=>([
        {
            title: '项目成员',
            dataIndex: 'UserName',
            render:(value,item)=>{
                return <EditUserStore userStoreId={item.Id} queryHandle={this.getUserStoreList} 
                ponitFund={this.state.point.PointFund} modalName={value} pointId={this.state.pointId}/>
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
                    return <a href='#' id={item.Id} onClick={this.deleteUserStoreOpenModel.bind()}>删除</a>
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
export default EditProjectPoint