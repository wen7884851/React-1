import React, { Component } from 'react';
import {Menu,Button} from 'semantic-ui-react';
import axios from 'axios';
import TablePage from '../../components/TableList/table'

class PointUserStoreList extends Component{
   
render(){
    const {userStoreList,columns,pageIndex=1,pageSize,totleCount,queryHandle=(pageIndex)=>{}}=this.props;
    return (  <TablePage dataSource={userStoreList} columns={columns} pageIndex={pageIndex}
        pagelimit={pageSize} totleCount={totleCount} 
        pageChange={(val) => {queryHandle(val);}}/>)
}



   
}
export default PointUserStoreList