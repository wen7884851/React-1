import React from 'react';

const LimitText=(value,limitNum=10)=>{
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

const getProjectTableColumns=()=>([
{
    title: '项目名称',
    dataIndex: 'ProjectName',
    render:(value,item)=>{
        return <a href={`/project/projectmanager/ProjectProfile?projectId=${item.Id}`}>{LimitText(value,20)}</a>
    }
},
{
    title: '项目负责人',
    dataIndex: 'LeaderName',
    render:(value,item)=>{
        return <a href={`${item.ProjectLeader}/userprofile`}>{value}</a>
    }
},
{
    title: '项目内容',
    dataIndex: 'Content',
    render:(value,item)=>{
        return LimitText(value,30)
    }
},
{
    title: '项目地址',
    dataIndex: 'Address',
    render:(value,item)=>{
        return LimitText(value,30)
    }
},
{
    title: '项目联系人',
    dataIndex: 'LinkPerson',
    render:(value,item)=>{
        return value
    }
},
{
    title: '联系电话',
    dataIndex: 'LinkPhoneNo',
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
}
]);

export default getProjectTableColumns;