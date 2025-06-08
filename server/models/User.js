const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');


const userSchema = mongoose.Schema({
    name:  {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1 // 1= true
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

userSchema.pre('save', function( next ) {

    var user = this;

    //비밀번호를 암호화 시킨다.
    bcrypt.genSalt(saltRounds, function(err, salt) {
        if(err) return next (err);

        if(user.isModified('password')) {
            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next (err);
                user.password = hash;
                next();    
            });
        } else {
            next();
        }
    });
})

// cb는 callback을 의미한다.
userSchema.methods.comparePassword = function(plainPw, cb) {
    // decrypt를 할 수 없어서 plainPw를 다시 암호화해서 비교한다.
    bcrypt.compare(plainPw, this.password, function(err, isMatch) {
        if(err) return cb(err)
            cb(null, isMatch)
    })
}

userSchema.methods.generateToken = async function(cb) {
    try {
        const user = this;
        const token = jwt.sign(user._id.toHexString(), 'secretToken');
        user.token = token;
        const saveUser = await user.save();
        cb(null, saveUser);
    } catch (error) {
        cb(error);
    }
}

userSchema.statics.findByToken = async function(token, cb) {
    const userModel = this;

    try {
        const decoded = jwt.verify(token, 'secretToken');
        // 토큰을 decode

        console.log('2222 : ' + decoded);
        console.log('3333: ' + token);
        
        // 유저아이디를 이용해서 유저를 찾은 다음에 
        // 클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인한다.
        const user = await userModel.findOne({ _id: decoded, token: token });

        if (!user) {
            console.warn("사용자 찾을 수 없음 (토큰 불일치)");
            return cb(null, null);
        } else {
            console.log("사용자 찾음:", user);
            return cb(null, user)
        }
            
    } catch (error) {
        console.error("오류 발생:", error);
        return cb(error);
    }
}

const User = mongoose.model('User', userSchema)

module.exports = {User}