const express = require("express");
const app = express();
const port = 4000; // <- 3000에서 다른 숫자로 변경
const cors = require("cors");
const bodyParser = require("body-parser");
const mainRoute = require("./mainRoute");
const {connectDB} = require("./db");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());
app.use("/main", mainRoute);


app.post('/search', async (req, res) => {
    const {searchTerm, activeTab} = req.body;
    console.log(`검색어는 '${searchTerm}'입니다.`);
    console.log(`현재 탭은 '${activeTab}'입니다.`);

    if (!searchTerm){
        console.log('검색어를 입력해 주세요.');
        return res.status(400).json({ success: false, message: '검색어를 입력해 주세요.' });
    }
    const q = `select * from ${activeTab} where name LIKE '%${searchTerm}%'`
    console.log('쿼리는', q);

    try {
        await connectDB.query(q, (error, results, fields) => {
            if (error) {
                console.error('검색하는 도중 에러가 발생했습니다.', error.message);
                return res.status(500).json({ success: false, error: true, message: '검색하는 도중 에러가 발생했습니다.'});
            }
            console.log('검색을 성공했습니다.');
            res.json({ success: true, error: false, message: '검색 완료.', product: results});
            console.log(results);
        });
    } catch (error) {
        console.error('검색 실패.', error.message);
        return res.status(500).json({ success: false, error: true, message: '검색 실패.'});
    }

});
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log('아이디, 패스워드 정보를 얻었습니다.');

    if (!username || !password) {
        console.log('아이디와 비밀번호를 모두 입력해주세요.');
        return res.status(400).json({ success: false, message: '아이디와 비밀번호를 모두 입력해주세요.' });
    }
    const q = `select * from users where username = '${username}' and password = '${password}';`;
    console.log('쿼리는', q);

    try {
        await connectDB.query(q, (error, results, fields) => {
            if (error) {
                console.error('로그인 하는 도중 에러가 발생했습니다.', error.message);
                return res.status(500).json({ success: false, error: true, message: '로그인 하는 도중 에러가 발생했습니다.'});
            }
            if (results.length > 0){
                console.log('환영합니다.');
                res.json({ success: true, error: false, message: '환영합니다.', id: username });
            }
            else{
                console.error('회원 정보가 존재하지 않습니다.', error.message);
                return res.json({ success: true, error: true, message: '회원 정보가 존재하지 않습니다.'});
            }
        });
    } catch (error) {
        console.error('로그인 실패', error.message);
        return res.status(500).json({ success: false, error: true, message: '로그인 실패'});
    }
});

app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        console.log('아이디와 비밀번호를 모두 입력해주세요.');
        return res.status(400).json({ success: false, message: '아이디와 비밀번호를 모두 입력해주세요.' });
    }

    // 사용자를 데이터베이스에 삽입
    const q = `INSERT INTO users (username, password) VALUES ('${username}', '${password}')`;
    console.log('쿼리는', q);

    try {
        await connectDB.query(q, (error, results, fields) => {
            console.log('회원가입 성공');
            res.json({ success: true, message: '회원가입 성공' });

            if (error) {
                console.error('쿼리 에러?', error.message);
                return res.status(500).json({ success: false, message: '쿼리 에러?' });
            }
        });
    } catch (error) {
        console.error('회원가입 실패:', error.message);
        return res.status(500).json({ success: false, message: 'catch문' });
    }
});

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