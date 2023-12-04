const express = require("express");
const app = express();
const port = 4000; // <- 3000에서 다른 숫자로 변경
const cors = require("cors");
const bodyParser = require("body-parser");
const mainRoute = require("./mainRoute")

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());
app.use("/main", mainRoute);


app.listen(port, () => {
    console.log(`서버가 포트 ${port}에서 실행 중입니다.`);
});

// CORS 관련 설정 : 어떻게 허용해야하는지 몰라 일단 주석 처리
// let corsOptions = {
//     origin: "*", // 출처 허용 옵션
//     credential: true, // 사용자 인증이 필요한 리소스(쿠키 ..등) 접근
// };
//
// app.use(cors(corsOptions));