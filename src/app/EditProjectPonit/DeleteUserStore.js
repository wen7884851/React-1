import React, { Component } from 'react';
import ChoiceModalForm from '../../components/modal/choiceModalForm';

class DeleteUserStore extends Component{

    state={
        loading:''
    }

    deleteUserStore(){

    }

    render(){
        const{closeModal}=this.props;
        return(<ChoiceModalForm header='删除成员对象' content='确认是否删除该成员对象' size='mini' cancle={closeModal}
        submit={this.deleteUserStore} loading={this.state.loading} visble={this.props.visble}/>);
    }
}

export default DeleteUserStore;