import React, { Component } from 'react'
import { Form,Segment} from 'semantic-ui-react'
import LoginButton from './loginButton';

class LoginForm extends Component {

    render(){
        const{signIn,userNameChange= ()=>{},passwordChange= ()=>{},userName,password,enable}=this.props;
        return <Form size='large' onSubmit={signIn} onKeyUp={(e) => {if(e.keyCode === 13){ signIn(); }}}>
        <Segment stacked>
          <Form.Input value={userName} fluid icon='user' iconPosition='left' placeholder='用户名..' type='text' onChange={(e) => userNameChange(e.target.value)}/>
          <Form.Input value={password} fluid icon='lock' iconPosition='left' placeholder='密  码..' type='password' onChange={(e) => passwordChange(e.target.value)}
          onKeyUp={(e) => {if(e.keyCode === 13){ signIn(); }}}/>
          <LoginButton enable={enable}/>
        </Segment>
      </Form>
        
    }
}

export default LoginForm;