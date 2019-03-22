import React, { Component } from 'react';
import {Button, Modal,Form, Input, Message} from 'semantic-ui-react';
import axios from 'axios';

class EditUserStore extends Component{

    constructor(){
        super();
        this.handleProportionChange.bind();
        this.checkFund.bind();
    }

    state={userList:[],
        surplusFund:0,
        surplusProportion:0,
        StoreFund:0,
        Proportion:0,
        ErrorMessage:'',
        ErrorShow:'false',
        StoreContent:'',
        UserId:0,
        modalOpen:false,
        currentStoreId:0
    }


    init=()=>{
        if(this.props.userStoreId){
            this.UpdateInit(this.props.userStoreId);
            this.getPointSurplusFund(); 
        }
        else {
            this.GetExceptPointUser();
            this.getPointSurplusFund(); 
            this.setState({Proportion:0,StoreFund:0});
        }
    }

    UpdateInit=(userStoreId)=>{
        axios.post('/Project/ProjectUserStore/GetUserStoreById',{storeId:userStoreId}).then(data=>{
            if(data.data){
                let userStore=data.data;
                this.setState({UserId:userStore.UserId,
                    UserName:userStore.UserName,
                    StoreFund:userStore.StoreFund,
                    Proportion:userStore.ProjectPointProportion,
                    StoreContent:userStore.StoreContent,currentStoreId:userStoreId});
            }
            else{
                this.setState({ErrorMessage:'获取数据失败',ErrorShow:''});
            }
            
        });
    }

    GetExceptPointUser=()=>{
        let pointId=this.props.pointId;
        axios.post('/Project/ProjectPointManager/GetUserIdAndExceptPointUser',{pointId:pointId}).then(data=>{
            this.setState({userList:data.data});
        });
    }

    getPointSurplusFund=()=>{
        let pointId=this.props.pointId;
        axios.post('/Project/ProjectPointManager/GetPointSurplusFund',{pointId:pointId}).then(data=>{
            let surplusFund=data.data;
            let surplusProportion=surplusFund/this.props.ponitFund*100;
            this.setState({surplusFund:surplusFund,surplusProportion:surplusProportion});
        });
    }

    handleFundChange=(e,{value})=>{
        value=this.clearNoNum(value);
    }

    handleProportionChange=(e,{value})=>{
        value=this.clearNoNum(value);
        let storeFund=this.props.ponitFund/100*value;
        this.setState({Proportion:value,StoreFund:storeFund})
    }

    checkFund=()=>{
        let isChecked=true;
        if(this.state.surplusProportion&&this.state.surplusProportion<this.state.Proportion){
            this.setState({ErrorMessage:'填写比例大于项目剩余范围（'+this.state.surplusFund+'万元）',ErrorShow:''});
            isChecked=false
        }
        else{this.setState({ErrorMessage:'',ErrorShow:'false'});}
        return isChecked;
    }
    
    create=()=>{
        if(this.checkFund()){
            let pointId=this.props.pointId;
            let store={ProjectPointId:pointId,UserId:this.state.UserId,StoreContent:this.state.StoreContent,
                StoreFund:this.state.StoreFund,ProjectPointProportion:this.state.Proportion};
            axios.post('/Project/ProjectUserStore/CreateUserStore',store).then(data=>{
                if(data.data&&data.data>0){
                    this.closeModal();
                    this.props.queryHandle();
                }
                else{
                    this.setState({ErrorMessage:'创建失败：'+data.data.Message.substr(0,100),ErrorShow:''});
                }
            })
        }
    }

    Update=()=>{
        if(this.checkFund()){
            let store={Id:this.state.currentStoreId,StoreContent:this.state.StoreContent,
                StoreFund:this.state.StoreFund,ProjectPointProportion:this.state.Proportion};
            axios.post('/Project/ProjectUserStore/UpdateUserStore',{store:store}).then(data=>{
                if(data.data&&data.data.IsSuccess){
                    this.closeModal();
                    this.props.queryHandle();
                }
                else{ 
                    this.setState({ErrorMessage:'修改失败:'+data.data.Result,ErrorShow:''});
                }
            })
        }
    }

    handleChange=(e)=>{
        this.setState({StoreContent: e.target.value});
    }

    selectChage= (e, {value}) =>{this.setState({ UserId: value });} 

    closeModal=()=>{
        this.setState({modalOpen:false});
    }

    openModal=()=>{
        this.init();
        this.setState({modalOpen:true})
    }

    createUserStore=()=>{
        return(<Modal size='small' open={this.state.modalOpen} trigger={<Button primary onClick={this.openModal}>添加项目成员</Button>}>
        <Modal.Header>添加项目成员</Modal.Header>
        <Modal.Content>
            <Form>
                <Form.Group widths='equal'>
                <Form.Select label='成员名称' placeholder='成员名称...' options={this.state.userList} onChange={this.selectChage.bind()}></Form.Select>
                <Form.Field >
                    <label>负责项目比例</label>
                    <Input label={{ basic: true, content: '%' }} labelPosition='right'
                     placeholder='负责项目比例...' onChange={this.handleProportionChange}
                     value={this.state.Proportion}
                    />
                </Form.Field>
                <Form.Field >
                    <label>负责项目资金</label>
                    <Input disabled label={{ basic: true, content: '万' }} labelPosition='right'
                     placeholder='负责项目资金...' value={this.state.StoreFund}
                    />
                </Form.Field>
                </Form.Group>
                <Form.Group>
                    <Form.TextArea label='工作内容' onChange={this.handleChange.bind()} width={15}/>
                </Form.Group>
                <Message hidden={this.state.ErrorShow} content={this.state.ErrorMessage} color='red' />
            </Form>
        </Modal.Content>
        <Modal.Actions>
            <Button negative onClick={this.closeModal}>取消</Button>
            <Button positive icon='checkmark' labelPosition='right' content='创建' onClick={this.create}/>
        </Modal.Actions>
    </Modal>);
    }

    editUserStore=()=>{
        let proportionPlaceholder='负责项目比例'+this.state.surplusProportion+ '...';
        return(<Modal size='small' open={this.state.modalOpen} trigger={<a href='javascript:void(0)' onClick={this.openModal}>{this.props.modalName}</a>} >
        <Modal.Header>编辑项目成员</Modal.Header>
        <Modal.Content>
            <Form>
                <Form.Group widths='equal'>
                <Form.Input disabled label='成员名称'  value={this.state.UserName}></Form.Input>
                <Form.Field >
                    <label>负责项目比例</label>
                    <Input label={{ basic: true, content: '%' }} labelPosition='right'
                     placeholder={proportionPlaceholder} onChange={this.handleProportionChange.bind()}
                     value={this.state.Proportion}/>
                </Form.Field>
                <Form.Field >
                    <label>负责项目资金</label>
                    <Input disabled label={{ basic: true, content: '万' }} labelPosition='right'
                     placeholder='负责项目资金...' value={this.state.StoreFund}
                    />
                </Form.Field>
                </Form.Group>
                <Form.Group>
                    <Form.TextArea label='工作内容' onChange={this.handleChange.bind()}  value={this.state.StoreContent} width={15}/>
                </Form.Group>
                <Message hidden={this.state.ErrorShow} content={this.state.ErrorMessage} color='red' />
            </Form>
        </Modal.Content>
        <Modal.Actions>
            <Button negative onClick={this.closeModal}>取消</Button>
            <Button positive icon='checkmark' labelPosition='right' content='保存' onClick={this.Update}/>
        </Modal.Actions>
        </Modal>);
    }

    render(){
        if(this.props.userStoreId&&this.props.userStoreId>0){
            return this.editUserStore();
        }
        return this.createUserStore();
    }

    getParam=(paramName)=>{
        let reg = new RegExp("(^|&)"+ paramName +"=([^&]*)(&|$)");
        let r = window.location.search.substr(1).match(reg);//search,查询？后面的参数，并匹配正则
        if(r!=null)return  unescape(r[2]); return null;
    }

    clearNoNum=(obj)=>{ 
        obj = obj.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符  
        obj = obj.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的  
        obj = obj.replace(".","$#$").replace(/\./g,"").replace("$#$",".");  
        if(obj.indexOf(".")< 0 && obj !==""){//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额 
            obj= parseFloat(obj);
        } 
        if(obj>100){
            obj=0;
        }
        return obj;
    } 
}
export default EditUserStore