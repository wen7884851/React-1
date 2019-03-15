import React, { Component } from 'react'
import { Button,Icon,Dimmer,Loader } from 'semantic-ui-react'

class LoginButton extends Component{
    render(){
            const{enable=true}=this.props;
            if(!enable){
                return <Button disabled fluid size='large'>登  录
                <div style={{paddingRight:'5px'}}>
                    <Dimmer active inverted >
                    <Loader inverted>Loading</Loader>
                    </Dimmer>
                </div></Button>
            }
            return  <Button animated color='teal' type='submit' fluid size='large'>
            <Button.Content visible >登  录
            </Button.Content>
            <Button.Content hidden>
              <Icon name='arrow right' />
            </Button.Content>
          </Button>
    }
}

export default LoginButton