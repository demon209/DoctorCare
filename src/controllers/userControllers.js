import userSevice from "../services/userService";

let handleLogin = async (req,res) =>{
    let email = req.body.email
    let password = req.body.password
    //check email exist
    if(!email || !password){
        return res.status(500).json({
            errCode:1,
            message:"Missing inputs parameter!"
        })
    }

    let userData = await userSevice.handleUserLogin(email,password)
    //compare password
    //return userInfor
    //access_token:JWT
    return res.status(200).json({
        errCode:userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {},
    })
}
module.exports={
    handleLogin:handleLogin
}