import React, {Component} from 'react';
import './App.css';
import Customer from './components/Customer'

const customers = [{
  'id': 1,
  'image': 'https://placeimg.com/64/64/1',
  'name': '홍길동',
  'birthday': '961222',
  'gender': '남자',
  'job': '대학생'
},
{
  'id': 2,
  'image': 'https://placeimg.com/64/64/2',
  'name': '홍길순',
  'birthday': '961222',
  'gender': '여자',
  'job': '프로그래머'
},
{
  'id': 3,
  'image': 'https://placeimg.com/64/64/3',
  'name': '이순신',
  'birthday': '961222',
  'gender': '남자',
  'job': '디자이너'
}]

class App extends Component{
  render(){
    return(
      <div>
        {/* 3번 반복해서 써야할것을 map함수를 쓴다. 이때 map함수는 key값이 필요하므로 겹치지않는 id를 key값으로 준다.*/}
        {
          customers.map(c => {
            return(
              <Customer
                key={c.id}
                id={c.id}
                image={c.image}
                name={c.name}
                birthday={c.birthday}
                gender={c.gender}
                job={c.job}
              />
            );
          })
        }
      </div>
    );
  }
}

export default App;
