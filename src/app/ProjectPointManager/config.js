import React from 'react';

const LimitText=(value,limitNum=10)=>{
    if(limitNum<10)
    {
        limitNum=10;
    }
    let result=String(value);
    if(result.length<=limitNum)
    {
        return result;
    }
    return result.substring(0,limitNum)+'...';
}

const statusType={
    0:'进行中',
    1:'已完成',
    2:'已回款'
}

const getProjectPointTableColumns=()=>([
{
    title: '项目细项',
    dataIndex: 'PointName',
    render:(value,item)=>{
        return <a href={`/project/projectmanager/EditProjectPoint?projectId=${item.ProjectId}&pointId=${item.Id}`}>{LimitText(value,30)}</a>
    }
},
{
    title: '状态',
    dataIndex: 'Status',
    render:(value,item)=>{
        return '进行中';
    }
},
{
    title: '细项内容',
    dataIndex: 'PonitContent',
    render:(value,item)=>{
        return LimitText(value,30)
    }
},
{
    title: '细项金额(万元)',
    dataIndex: 'PointFund',
    render:(value,item)=>{
        return LimitText(value,30)
    }
},
{
    title: '细项负责人',
    dataIndex: 'LeaderName',
    render:(value,item)=>{
        return value
    }
},
{
    title: '提成(元)',
    dataIndex: 'Commission',
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

export default getProjectPointTableColumns;