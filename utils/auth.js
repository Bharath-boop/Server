import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const SALT = 10

const CREATEHASH = async (data) => {
    let salt = await bcrypt.genSalt(SALT)
    let hash = await bcrypt.hash(data, salt)
    return hash
}
const HASHCOMPARE=async(data,hash)=>{
    return bcrypt.compare(data,hash)
}

const GENTOKEN=async(payload)=>{
    let token=await jwt.sign(payload,process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRY
    })
    return token
}

export default {
    CREATEHASH,
    HASHCOMPARE,
    GENTOKEN
}