import React, { Component } from 'react';
import SerchItem from '../../components/TableList/serchItem'
import TablePage from '../../components/TableList/table'
import {Button,Header} from 'semantic-ui-react';
import axios from 'axios';
import getProjectTableColumns from './config';
import CreateProject from '../CreateProject/index';

class ProjectTableList extends Component{

    constructor(props){
        super(props);
        this.handQuery=this.handQuery.bind(this)
    }

    state={
        columns:[],
        dataSource:[],
        totleCount:0,
        projectName:"",
        pageIndex:1,
        pageSize:20,
        orderBy:"createTime",
        asc:true,
        openCreateModal:false
    }

    componentDidMount(){
        const columns = getProjectTableColumns();
        this.setState({columns:columns});
        this.handQuery();
    }

    async handQuery(event){
        this.setState({dataSource:[],totleCount:0});
        await axios.post('/Project/projectmanager/ProjectList',{query:{
            projectName:this.state.projectName,
            pageIndex:this.state.pageIndex,
            pageSize:this.state.pageSize,
            orderBy:this.state.orderBy,
            asc:this.state.asc}}).then(
            data=>{
                if(data.data.ResultType&&data.data.ResultType===8)
                {
                    window.location.href=data.data.AppendData;
                }
                else
                {
                     this.setState({dataSource:data.data,totleCount:data.data.TotalItemsCount});
                }
            }
        )
    }

    openCreateProject=()=>{
        this.setState({modalOpen:true});
    }

    render(){
        return(<div style={{width:'100%',padding:'10px'}}>
            <Header as='h2' icon='protect' content='项目管理'/>
            <div style={{background:'#FFFFFF',marginTop:'20px'
            ,border:'3px solid #FCFCFC',overflow:'hidden',zoom:'1px'}}>
            <SerchItem lableName='项目名称：' placeholder='输入查询内容..' 
            serchValue={this.state.projectName} onEnter={this.handQuery} onChange={(val) => { this.setState({ projectName: val })}}/>
            <div style={{float:'right',paddingRight:'50px',paddingTop:'15px'}}>
            <Button primary content='查  询' onClick={this.handQuery}/>
            </div>
            <div style={{float:'right',paddingRight:'50px',paddingTop:'15px'}}>
            <CreateProject modalOpen={this.state.modalOpen} openCreateProject={this.openCreateProject} TableQuery={this.handQuery}/>
            </div>
            </div>
            <div style={{clear:"both"}}></div>
            <div style={{background:'#FFFFFF',marginTop:'20px'
            ,border:'3px solid #FCFCFC'}}>
            <TablePage dataSource={this.state.dataSource} columns={this.state.columns} pageIndex={this.state.pageIndex}
            pagelimit={this.state.pageSize} totleCount={this.state.totleCount}/>
            </div>
            </div>

            
        );
    }
}
export default ProjectTableList;