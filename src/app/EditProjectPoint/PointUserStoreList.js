import React, { Component } from 'react';
import TablePage from '../../components/TableList/table'

class PointUserStoreList extends Component{
   
render(){
    const {userStoreList,columns,pageIndex=1,pageSize=20,totleCount,queryHandle=(pageIndex)=>{}}=this.props;
    console.log(this.props);
    return (  <TablePage dataSource={userStoreList} columns={columns} pageIndex={pageIndex}
        pagelimit={pageSize} totleCount={totleCount} 
        pageChange={(val) => {queryHandle(val);}}/>)
}
   
}
export default PointUserStoreList