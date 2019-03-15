import React, { Component } from 'react';
import {Menu} from 'semantic-ui-react'
import MenuItem from '../../components/Menu/menuItem';

class MenuList extends Component{

state=[
    {menuName:'home',menuContent:'首页',url:'aaa',icon:'desktop'},
    {menuName:'attendance',menuContent:'考勤管理',url:'aaa',icon:'calendar check outline'},
    {menuName:'project',menuContent:'项目管理',url:'/project/projectmanager/index',icon:'protect'},
    {menuName:'supplies',menuContent:'物资管理',url:'aaa',icon:'warehouse'},
    {menuName:'financial',menuContent:'财务管理',url:'aaa',icon:'yen'},
    {menuName:'staff',menuContent:'人员管理',url:'aaa',icon:'sitemap'}
]

    render(){
        return  (<div style={{float:'left',height:'100%',paddingTop:'40%'}}> 
        <Menu inverted pointing vertical icon='labeled'>
            {this.state.map(item=>
                <MenuItem menuName={item.menuName} menuContent={item.menuContent}
                url={item.url} icon={item.icon}> </MenuItem>
            )
            }
        </Menu></div>)
        }
    }


export default MenuList;