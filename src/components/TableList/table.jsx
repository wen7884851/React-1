import React from 'react';
import {Table,Pagination,Icon,Advertisement} from 'semantic-ui-react';

class TablePage extends React.Component{

    formatCol = (item, col) => {
        let content = col.render ? col.render(item[col.dataIndex]?item[col.dataIndex]:"", item) : item[col.dataIndex];
        if (col.render) {
          return <Table.Cell>{content}</Table.Cell>;
        }
    
        let value = item[col.dataIndex]?item[col.dataIndex]:"";
        return <Table.Cell>{value}</Table.Cell>;
      }

    render(){
        const{
            dataSource=[],
            columns=[],
            pageindex=1,
            pagelimit=10,
            totleCount=0,
            pageChange = ()=>{}
        }=this.props;
        let totlePageCount=Math.ceil(totleCount/pagelimit);
        let firstIndex=1+(pageindex-1)*pagelimit;
        let lastIndex=(pageindex===totlePageCount)?totleCount:(pageindex*pagelimit);
        if(typeof(dataSource.Items) !== "undefined"&&totleCount>0){
            return( <Table celled padded>
                <Table.Header>
                    <Table.Row>
                    {columns.map(item=> <Table.HeaderCell>{item.title}</Table.HeaderCell>)}
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {dataSource.Items.map(item=><Table.Row>
                    {columns.map(col => this.formatCol(item, col))}
                    </Table.Row>)}
                </Table.Body>
                <Table.Footer>
                    <Table.Row>
                    <Table.HeaderCell colSpan={columns.length}>
                    <div style={{float:'left',padding:'10px'}}>当前显示:{firstIndex}-
                    {lastIndex}</div>
                    <div style={{float:'right',paddingRight:'30px'}}>
                    <Pagination defaultActivePage={pageindex} totalPages={totlePageCount}   
                    ellipsisItem={{ content: <Icon name='ellipsis horizontal' />, icon: true }}
                    firstItem={{ content: <Icon name='angle double left' />, icon: true }}
                    lastItem={{ content: <Icon name='angle double right' />, icon: true }}
                    prevItem={{ content: <Icon name='angle left' />, icon: true }}
                    nextItem={{ content: <Icon name='angle right' />, icon: true }}
                    onPageChange={(e) => {pageChange(e.target.value)}}/></div>
                    </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>)
        }
        else
        {
            return( <Table celled>
                <Table.Header>
                    <Table.Row>
                    {columns.map(item=> <Table.HeaderCell>{item.title}</Table.HeaderCell>)}
                    </Table.Row>
                </Table.Header>
                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan={columns.length}>
                        <div style={{width:'100%'}}>
                        <Advertisement unit='top banner' test='No Result' style={{width:'100%'}}/></div>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>)
        }

    }
}

export default TablePage