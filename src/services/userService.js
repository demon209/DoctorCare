import db from "../models/index";
import bcrypt from "bcryptjs";

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExits = await checkUserEmail(email); // Kiểm tra email
            if (isExits) {
                // Tìm user trong DB
                let user = await db.User.findOne({
                    where: { email: email },
                    attributes:['email','roleId','password'],
                    raw : true
                });
                if (user) {
                    // So sánh mật khẩu
                    let check = await bcrypt.compare(password, user.password);
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = "OK";
                        delete user.password;
                        userData.user = user; // Thêm thông tin người dùng
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = "Wrong password";
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = `User not found`;
                }
            } else {
                userData.errCode = 1;
                userData.errMessage = `Your email doesn't exist. Please try another email.`;
            }
            resolve(userData); // Kết thúc Promise
        } catch (e) {
            reject(e); // Bắt lỗi
        }
    });
};

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail },
            });
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    handleUserLogin: handleUserLogin,
    checkUserEmail: checkUserEmail,
};
