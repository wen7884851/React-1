import React, { Component } from 'react';
import ChoiceModalForm from '../../components/modal/choiceModalForm';

class DeleteProjectPoint extends Component{

    state={
        loading:''
    }

    deleteProjectPoint(){
        //删除 
        //this.props.ponitId
        // window.location.href="/project/projectmanager/"+{this.props.projectId};
    }

    render(){
        return(<ChoiceModalForm header='删除项目细项' content='确认是否删除该项目细项' size='mini' cancle={this.props.closeModal}
        submit={this.deleteProjectPoint} loading={this.state.loading} visble={this.props.visble}/>);
    }
}

export default DeleteProjectPoint;