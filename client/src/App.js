import React, {Component} from 'react';
import './App.css';
import Customer from './components/Customer';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import {withStyles} from '@material-ui/core/styles';

/*
  root 클래스를 넓이 100%, 위쪽여백을 3의 가중치만큼 오버플로우X축으로 auto를 준다.
  table은 무조건 1080이상 출력할수 있도록 하면 화면에 크기가 줄어들었을때도 
  전체의 1080만큼 테이블을 차지하므로 가로 스크롤이 생긴다.
*/
const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  table: {
    minWidth: 1080
  }
})

class App extends Component{

  // customers를 state에 넣어주기 때문에 밑에 this.state.customers로 바꿔준다.
  state = {
    customers: ""
  }

  // callApi를 키 customers, 값 res로 해준다. 혹시모를 err도 잡아준다.
  componentDidMount(){
    this.callApi()
      .then(res => this.setState({customers: res}))
      .catch(err => console.log(err))
  }

  /* 
    로컬 api/customers async 비동식으로 받아와 response에 넣어주고 response를 json형식으로 body를 받아 return해준다.
  */
  callApi = async () => {
    const response = await fetch('api/customers');
    const body = await response.json();
    return body;
  }

  render(){
    const {classes} = this.props;

    return(
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>이미지</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>생년월일</TableCell>
              <TableCell>성별</TableCell>
              <TableCell>직업</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {
            this.state.customers ? this.state.customers.map(c => {
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
            }): ""
          }
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(App);
