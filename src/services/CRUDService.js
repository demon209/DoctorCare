import bcrypt from 'bcryptjs'
import db from '../models/index'
import { where } from 'sequelize'
const salt = bcrypt.genSaltSync(10)

let createNewUser = async (data) =>{
    return new Promise(async (resolve, reject) => {
        try{
            let hashPassordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                firstName: data.firstName,
                password: hashPassordFromBcrypt,
                lastName: data.lastname,
                email: data.email,
                address: data.address,
                gender: data.gender==='1' ? true:false,
                roleId: data.roleId,
                phonenumber: data.phonenumber,
            })
            resolve('Ok create new User succeed!')
        }catch(e){
            reject(e);
        }
    })
    
}

let hashUserPassword = (password) =>{
    return new Promise( async (resolve, reject) => {
        try{
            var hashPassord = await bcrypt.hashSync(password,salt);
            resolve(hashPassord);
        }catch(e){
            reject(e);
        }
    })
}
let getAllUsers = () =>{
    return new Promise(async(resovel,reject) =>{
        try{
            let users = db.User.findAll({raw: true});
            resovel(users);
        }catch(e){
            reject(e)
        }
    })
}
let getUserInforById = (userId) =>{
    return new Promise(async(resolve,reject) => {
        try{
            let user= await db.User.findOne({
                where: {id: userId},
                raw: true
            })
            if(user){
                resolve(user)
            }else{
                resolve({})
            }
        }catch(e){
            reject(e);
        }
    })
}
let updateUserData = (data) =>{
    return new Promise(async(resolve,reject) =>{
        try{
            let user= await db.User.findOne({
                where:{id:data.id}
            })
            if(user){
                user.firstName=data.firstName;
                user.lastName=data.lastName;
                user.address=data.address;
                await user.save();
                resolve();
            }else{
                resolve();
            }
        }catch(e){
            reject(e);
        }
    })
}
let deleteUserById = (userId) => {
    return new Promise(async(resolve,reject)=>{
        try{
            let user = await  db.User.findOne({
                where: {id : userId }
            })
             if(user){
                user.destroy();
             }
             resolve();
        }catch(e){
            reject(e);
        } 
    })

} 
module.exports = {
    createNewUser: createNewUser,
    getAllUsers: getAllUsers,
    getUserInforById:getUserInforById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById,
}