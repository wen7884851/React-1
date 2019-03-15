import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import {  Grid, Header,Image } from 'semantic-ui-react'
import LoginForm from '../../components/login/loginForm';
import LoginMessage from '../../components/login/loginMessage';
import axios from 'axios';
var forge = require('node-forge');

class LoginContent extends Component{

    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this)
    }

    state={
      userName:'',
      password:'',
      showMessage:false,
      isCanSign:true,
      messageHeader:'',
      messagecontent:''
    }

    messageHandleDismiss = () => {
      this.setState({ showMessage: false })
  }

    handleSubmit(event){
        if(this.state.userName.trim()==='')
        {
          this.setState({
            showMessage:true,
            messagecontent:'用户名为空，请重新输入！'
          });
          this.Clear();
          return;
        }
        if(this.state.password.trim()==='')
        {
          this.setState({
            showMessage:true,
            messagecontent:'密码为空，请重新输入！'
          });
          this.Clear();
          return;
        }
        this.setState({
          isCanSign:false
        });
        var md = forge.md.md5.create();
        md.update(this.state.password)
        axios.post('/Common/Account/CheckLogin',{LoginName:this.state.userName,LoginPwd:md.digest().toHex()}).then(
          e=>{
            this.setState({
              isCanSign:true
            });
            if(e.data.IsSuccess)
            {
              window.location.href=e.data.Result;
              return;
            }
            this.setState({
              showMessage:true,
              messagecontent:e.data.Result,
              userName:'',
              password:''
            });
            if(e.data.message)
            {
              this.setState({
              messagecontent:e.data.message
            });
            }
          }
        )
    }

    render(){
        return(
            <div className='login-form' style={{background:'linear-gradient(rgb(188, 228, 179), rgb(248, 243, 255))'}}>
            <style>{`
              body > div,
              body > div > div,
              body > div > div > div.login-form {
                height: 100%;
              }
            `}</style>
              <Grid textAlign='center' style={{ height: '100%'}} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                  <Header as='h2' color='teal' textAlign='center'>
                  <Image src='/Resource/img/logo.png' />   Sign in to your account
                  </Header>
                <LoginForm userName={this.state.userName} password={this.state.password} userNameChange={(val) => { this.setState({ userName: val })}}
                passwordChange={(val) => { this.setState({ password: val }) }} signIn={this.handleSubmit} enable={this.state.isCanSign}/>
                <LoginMessage show={this.state.showMessage} header={this.state.messageHeader} content={this.state.messagecontent} handleDismiss={this.messageHandleDismiss}/>
                </Grid.Column>
              </Grid>
            </div>
        );
    }; 

    Clear(){
      this.setState({
        userName:'',
        password:''
      });
    }
}

export default LoginContent;