const { User } = require("../models/User");

let auth = (req, res, next) => {

    // 클라이언트 쿠키에서 토큰을 가져온다.
    let token = req.cookies.x_auth;
    
    // 토큰을 복호화한다.
    User.findByToken(token, (err, user) => {
        if (err) return res.status(400).send(err);

        if(!user) return res.json({
            isAuth : false, 
            error : true
        });

        req.token = token;
        req.user = user;
        next(); //없으면 미들웨어에서 갇혀버림
    })

    // 유저 정보를 찾는다.

    // 유저가 있으면 인증 OK

    // 없으면 인증 NO
}

module.exports = { auth };