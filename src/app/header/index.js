import React, { Component } from 'react';
import {Menu,Button} from 'semantic-ui-react'
import HeaderLogo from '../../components/header/headerLogo';
import Clock from '../../components/header/clock';
import Seach from '../../components/header/seach';
import MessageCenter from '../../components/header/messageCenter';

class HeaderMenu extends Component{

    state={
        serchcontent:'',
        userName:''
    };

    componentWillMount(){
       let cookick=this.getCookie('pubser_loginuserkey')
        if(cookick){
            this.setState({userName:this.getCookieValue('LoginName',cookick)});
        }
        /*window.location.href='/common/account/index';*/
    }

    getCookie(sName)
    {
        let aCookie = document.cookie.split("; ");
        for (let i=0; i < aCookie.length; i++)
        {
        let aCrumb = aCookie[i].split("=");
        if (sName === aCrumb[0])
        return unescape(aCrumb[1]);
        }
        return null;
    }

    getCookieValue(sName,json){
    if(json.match(sName)){
        return json[sName];
    }
    return null;
    }

    render(){
        return (<div style={{zIndex:'1'}}>
        <Menu inverted color='teal'>
            <HeaderLogo />
        <Menu.Menu position='right'>
        <Clock />
        <MessageCenter />
        <Seach />
        </Menu.Menu>
        <Menu.Item>
         <Button color='teal'>退  出</Button>
        </Menu.Item>
        </Menu></div>)
    }
}

export default HeaderMenu;