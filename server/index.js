const express = require('express')
const app = express()
// bodyparser 세팅
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { auth } = require('./middleware/auth');
const { User } = require('./models/User');
const config = require('./config/key');

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser());

// application/json 타입으로 된 것을 분석해서 가져오기 위함
app.use(bodyParser.json())

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI)
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!!!!')
})

app.get('/api/hello', (req, res) => {
  res.send('안녕하세요')
})

app.post('/api/users/register', async (req, res) => {
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

app.post('/api/users/login', async (req, res) => {
  try {
    
    const userInfo = await User.findOne({ email: req.body.email });

    // 요청된 이메일을 데이터베이스에서 찾고
    if(!userInfo) {
      return res.json({
        loginSuccess : false, 
        message : "제공된 이메일에 해당하는 유저가 없습니다."
      })
    }

    // 요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인
    userInfo.comparePassword(req.body.password, async (err, isMatch) => {
      if(!isMatch) 
        return res.json({ 
          loginSuccess: false, 
          message : "비밀번호가 틀렸습니다."
        })

      // 맞으면 토큰 생성
      userInfo.generateToken((err, userInfo) => {
        if(err) return res.status(400).send(err);

        // 토큰을 쿠키, 로컬스토리지 등에 저장할 수 있다.
        res.cookie("x_auth", userInfo.token)
        .status(200)
        .json({
          loginSuccess: true,
          userId : userInfo._id
        })
      })
    })
    
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
})

// role 0 -> 일반유저, 아니면 관리자
app.get('/api/users/auth', auth, (req, res) => {

  // 여기까지 미들웨어를 통과해 왔다는 이야기는 Authentication이 true라는 말
  res.status(200).json({
    _id : req.user._id,
    isAdmin: req.user.role === 0? false : true,
    isAuth : true,
    email : req.user.email,
    name: req.user.lastname,
    lastname : req.user.lastname,
    role : req.user.role,
    image : req.user.image
  })
})

app.get('/api/users/logout', auth, async (req, res) => {
  try {
    console.log('55555');
    
    await User.findOneAndUpdate({ _id : req.user._id}, {token : ""});
    console.log('666666');
    return res.status(200).json ({
      success : true
    })
  } catch (error) {
    return res.json ({
      success : false, 
      message : err
    });
  }
})

const port = 5000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
