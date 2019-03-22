import React, { Component } from 'react';
import ChoiceModalForm from '../../components/modal/choiceModalForm';

class DeleteUserStore extends Component{

    render(){
        const{closeModal,deleteUserStore}=this.props;
        return(<ChoiceModalForm header='删除成员对象' content='确认是否删除该成员对象' size='mini' cancle={closeModal}
        submit={deleteUserStore}  visble={this.props.visble}/>);
    }
}

export default DeleteUserStore;