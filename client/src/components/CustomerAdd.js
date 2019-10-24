import React, {Component} from 'react';
import {post} from 'axios';

class CustomerAdd extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: ''
        }
    }

    // submit버튼이 눌려졌을 때 addCustomer함수를 호출한다.
    handleFormSubmit = (e) => {
        e.preventDefault()
        this.addCustomer()
            .then((response) => {
                console.log(response.data);
                // 고객을 추가한 이후에 서버로부터 응답을 받고나서 고객목록을 다시 불러오도록 설정해준다.
                this.props.stateRefresh();
            })
        this.setState({
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: ''
        })
    }

    // 파일 값이 변경되었을 때
    handleFileChange = (e) => {
        this.setState({
            // e.taget은 그 이벤트가 발생한 input값 자체인데 file중에서 첫번째 값을 file 값으로 지정해준다. target의 value은 이름이다. 
            file: e.target.files[0],
            fileName: e.target.value

        })
    }

    // 입력값이 변경되었을 때
    handleValueChange = (e) => {
        let nextState = {};
        
        // 이름값을 변경했을때 userName이 name이기때문에 userName이라는 실제 state에 반영한다.  
        nextState[e.target.name] = e.target.value;
        
        // nextState를 이용해서 현재 state값을 갱신해준다.
        this.setState(nextState);
    }

    // 추가할 생성자 
    addCustomer = () => {
        const url = '/api/customers';
        const formData = new FormData();

        formData.append('image', this.state.file);
        formData.append('name', this.state.userName);
        formData.append('birthday', this.state.birthday);
        formData.append('gender', this.state.gender);
        formData.append('job', this.state.job);

        const config = {
            headers: {
                'content-type': 'multipart/form-data'

            }
        }
        return post(url, formData, config);
    }

    render(){
        return(
            <form onSubmit={this.handleFormSubmit}>
                <h1>고객 추가</h1>
                프로필 이미지: <input type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/><br/>
                이름: <input type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange}/><br/>
                생년월일: <input type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange}/><br/>
                성별: <input type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange}/><br/>
                직업: <input type="text" name="job" value={this.state.job} onChange={this.handleValueChange}/><br/>
                <button type="submit">추가하기</button>
            </form>
        )
    }
}

export default CustomerAdd;