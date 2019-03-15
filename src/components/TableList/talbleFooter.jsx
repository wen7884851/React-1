import React from 'react';
import {Table,Menu,Icon} from 'semantic-ui-react';

class TableFooter extends React.Component{


    pagebuild = (pageindex,totlePageCount)=>{
        let str= [];
        if(totlePageCount<6){
            for(let i=1 ; i<=totlePageCount;i++){
                str.push(i);
            }
            return str.map(item=><Menu floated='right' pagination><Menu.Item name={item} active={item === pageindex}>{item}</Menu.Item></Menu>)
        } else{
            return (<Menu floated='right' pagination>
            <Menu.Item as='a' icon disabled={pageindex===1} >
            <Icon name='chevron left' /></Menu.Item>
            <Menu.Item as='a' active={pageindex===1}>{(pageindex===1)?1:'...'}</Menu.Item>
            <Menu.Item as='a' active={pageindex!==1&&pageindex!==totlePageCount-1}>{(pageindex===1)?2:pageindex}</Menu.Item>
            <Menu.Item as='a' active={pageindex===totlePageCount-1}>{(pageindex===1)?3:pageindex+1}</Menu.Item>
            <Menu.Item as='a' >{(pageindex===totlePageCount)?totlePageCount:'...'}</Menu.Item>
            <Menu.Item as='a' icon disabled={pageindex===totlePageCount}>
                <Icon name='chevron right' />
            </Menu.Item>
            </Menu>)
        }
    }

    render(){
        const{totleCount,pagelimit,pageindex,columnLength}=this.props;
        let totlePageCount=Math.ceil(totleCount/pagelimit);
        let firstIndex=1+(pageindex-1)*pagelimit;
        let lastIndex=(pageindex===totlePageCount)?totleCount:(pageindex*pagelimit);

        return( <Table.Footer>
            <Table.Row>
            <Table.HeaderCell colSpan={columnLength}>
                <div style={{float:'left',padding:'10px'}}>当前显示:{firstIndex}-
                    {lastIndex}</div>
                    <div style={{float:'right',paddingRight:'30px'}}>
                <Menu pagination>
                  {this.pagebuild(pageindex,totlePageCount)}
                </Menu></div>
                </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>);
    }
}

export default TableFooter;