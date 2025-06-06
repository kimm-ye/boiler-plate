const express = require('express')
const app = express()
const port = 5000

// bodyparser 세팅
const bodyParser = require('body-parser');
const { User } = require('./models/User');

const config = require('./config/key');

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// application/json 타입으로 된 것을 분석해서 가져오기 위함
app.use(bodyParser.json())

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI)
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!!!!')
})

app.post('/register', async (req, res) => {
    // 회원가입할때 필요한 정보들을 client 에서 가져오면 그것들을 데이터베이스에 넣어준다.

    // req.body안에는 json 형식으로 데이터 들어가 있음
    try {
        const user = new User(req.body);
        await user.save(); // 저장 성공시 다음 줄로 지행
        return res.status(200).json({ success: true });
    } catch (error) {
        return res.status(400).json({ success: false, error: error.message });
    }
    
    

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
