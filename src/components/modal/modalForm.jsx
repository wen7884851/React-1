import React, { Component } from 'react';
import {Modal,Button} from 'semantic-ui-react';
import TableForm from '../TableForm/TableForm';

class ModalForm extends Component {

    buildAction(buttonItem){
        if(buttonItem.length>0){
            return(
                <Modal.Actions>
                    {buttonItem.map(item=>
                        {return this.getButtontype(item);}
                        )}
                        <div style={{clear:'both'}}></div> 
                </Modal.Actions>
            )
        }
    }

    getButtontype(item){
        switch(item.type){
            case 'positive':
            return <div style={{float:'left',paddingLeft:'50px'}}><Button positive onClick={item.handClick}>{item.title}</Button></div>;
            case 'negative':
            return <div style={{float:'right',paddingRight:'80px'}}><Button negative onClick={item.handClick}>{item.title}</Button></div>;
            default:
            return <Button onClick={item.handClick}>{item.title}</Button>;
        }
    }



    render(){
        const{modalName,modalHeader,formColumns,buttonItems,showMessage,messagecontent,openModal=false,handleOpenModal=()=>{}}=this.props;
        return (
            <Modal trigger={<Button primary onClick={handleOpenModal}>{modalName}</Button>} open={openModal}>
            <Modal.Header>{modalHeader}</Modal.Header>
                <Modal.Content>
                   <TableForm formColumns={formColumns} messagecontent={messagecontent} showMessage={showMessage}/>
                </Modal.Content>
                {this.buildAction(buttonItems)}
            </Modal>
        )
    }
}
export default ModalForm