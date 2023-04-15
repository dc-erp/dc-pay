
import { Request  } from 'express'
import userDao from './dao'
import { encrypt } from '../../../utils/encrypt'

const create = async (req: Request, userAuthInfo: any): Promise<string> => {
    const { organization_id: organizationId } = userAuthInfo
    const newUser = req.body.data
    newUser.password = await encrypt(newUser.password)
    newUser.organizationId = organizationId
    const userId = await userDao.create({ ...newUser })
    return userId
}

const getAll = async (): Promise<any[]> => {
    const users = await userDao.getAll()
    return users
}



const getAllFromOrganization = async (userAuthInfo: any): Promise<any[]> => {
    const { organization_id: organizationId } = userAuthInfo
    const users = await userDao.getAllFromOrganization(organizationId)
    return users
}

const getUserRights = async (userId: any): Promise<any[]> => await userDao.getAllFromOrganization(userId)

const getUserAuthorizationInfo = async (userId: any): Promise<any> => await userDao.getUserAuthorizationInfo(userId)


const getInfo = async (userAccountId: string): Promise<any> => {
    const userAccount = await userDao.getInfo(userAccountId)
    delete userAccount.password
    return userAccount
}

const getPeriodInfoById = async (periodId: string): Promise<any> => {
    const periodInfo = await userDao.getPeriodInfoById(periodId)
    return periodInfo
}

const deleteUser = async (userId: string): Promise<any> => {
    await userDao.deleteUserRoleByUserId(userId)
    return await userDao.deleteUser(userId)
}


const updateUser = async (userData: any): Promise<any> => {
    const updatedUser = await userDao.updateUser(userData)
    return updatedUser
}


export default {
    create,
    deleteUser,
    getInfo,
    getAll,
    getAllFromOrganization,
    getUserAuthorizationInfo,
    getUserRights,
    getPeriodInfoById,
    updateUser
}