const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// 데이터베이스 가져오기
const data = fs.readFileSync('./database.json');

// 데이터 파싱
const conf = JSON.parse(data);

// mysql 불러오기
const mysql = require('mysql');

// mysql 연결
const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database
});
connection.connect();

// 사용자가 customers 경로에 접속한 경우 데이터베이스에 접근해서 쿼리를 날릴 수 있도록 설정
app.get('/api/customers', (req, res) => {
    connection.query(
      // 고객데이터 조회
      "SELECT * FROM CUSTOMER",
      (err, rows, fields) => {
        res.send(rows);
      }
    )
});

app.listen(port, () => console.log(`Listening on port ${port}`));