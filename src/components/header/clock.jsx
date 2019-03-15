import React, { Component } from 'react';
import {Menu,Header} from 'semantic-ui-react'

class Clock extends Component {
    constructor() {
        super()
        this.state = {time:''}
    }

    clockChange=()=>{
        let date = new Date().toLocaleString();
        this.setState({
            time:date}
            );
    }

    componentWillMount() {
        this.clockChange();
        this.timer = setInterval(() => { this.clockChange() }, 1000);
    }

    render(){
        const{userName='aaa'}=this.props;
    return  <div style={{marginBottom:'0',width:'300px',paddingTop:'10px'}}>
     <Menu.Item >
     <div style={{paddingRight:'10px'}}>
        <Header as='h4' inverted >{this.state.time}</Header>
        </div>
        <div style={{paddingRight:'10px'}}>
        <Header as='h4' inverted >
            {userName},您好！
        </Header>
        </div>
    </Menu.Item></div>
    }
}

export default Clock