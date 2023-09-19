const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const path = require('path');



const staticDir =
  process.env.NODE_ENV === 'production' ? '../src/public' : './public';
const PORT = 4000;

// 기존 미들웨어
app.use(bodyParser.json());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, staticDir)));



// 새로운 라우터 불러오기
//const dataRoutes = require('.user/routes/dataRoutes');
const userRoutes = require('./routes/user/userRoutes');

// 기존 라우터
const routes = require('./routes');

// MySQL 연결
const connection = require('./database/models/index');

// 기존 라우터 사용
app.use('/', routes);

// 새로운 라우터 사용
//app.use('/data', dataRoutes);
//app.use('/auth', authRoutes);
app.use('/login', userRoutes);

// 서버 실행
// connection.connect(err => {
//   if (err) {
//     console.error('An error occurred connecting to MySQL: ', err);
//     process.exit(1);
//   } else {
//     console.log('Connected to MySQL');
//     app.listen(port, () => {
//       console.log(`Server running at http://192.168.219.107:${port}/`);
//     });
//   }
// });
app.listen(port, () => {
  console.log(`Server running at http://192.168.219.107:${port}/`);
});