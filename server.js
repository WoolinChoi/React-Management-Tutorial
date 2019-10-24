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

// 프로필 사진을 위해 multer 설치
const multer = require('multer');
const upload = multer({dest: './upload'})

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

// image경로로 접근하여 express.static으로 업로드한 이미지를 공유
app.use('/image', express.static('./upload'));

app.post('/api/customers', upload.single('image'), (req, res) => {
  let sql = "INSERT INTO CUSTOMER VALUES (null, ?, ?, ?, ?, ?)";
  let image = '/image/' + req.file.filename; 
  let name = req.body.name;
  let birthday = req.body.birthday;
  let gender = req.body.gender;
  let job = req.body.job;
  // 디버깅 소스코드
  // console.log(name);
  // console.log(image);
  // console.log(birthday);
  // console.log(gender);
  // console.log(job);
  let params = [image, name, birthday, gender, job];
  connection.query(sql, params, 
    (err, rows, fields) => {
      res.send(rows);
      // console.log(err);
      // console.log(rows);
    }
  );
});

app.listen(port, () => console.log(`Listening on port ${port}`));