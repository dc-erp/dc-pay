import pool from '../../../config/pool'
import { v4 as uuid } from 'uuid'
import { compare } from '../../../utils/encrypt'



export const create = async (newUser: any): Promise<any> => {
    const id = uuid()
    const {
        firstName,
        lastName,
        email,
        roleId,
        organizationId,
        password
    } = newUser
    const query = `
    INSERT INTO user_accounts (
        id, 
        first_name, 
        last_name, 
        email, 
        organization_id, 
        password
    )
    VALUES (
        $1, 
        $2,
        $3,
        $4,
        $5,
        $6
    ) RETURNING id;
    `
    const res = await pool.query(query, [
        id,
        firstName,
        lastName,
        email,
        organizationId,
        password])
    const userId = res.rows[0].id
    await createUserRole({ userId, roleId })
    return userId
}

export const createUserRole = async (newUser: any): Promise<string> => {
    const id = uuid()
    const {
        userId,
        roleId
    } = newUser
    const query = `
    INSERT INTO role_user (
        id, 
        user_id,
        role_id
    )
    VALUES (
        $1, 
        $2,
        $3
    ) RETURNING id;
    `
    const res = await pool.query(query, [
        id,
        userId,
        roleId])
    const userAccountId = res.rows[0].id
    return userAccountId
}


export const getAll = async () => {
    const { rows: users } = await pool.query(`
    SELECT 
    a.id,
    a.first_name,
    a.last_name,
    a.email,
    r.role_name as role 
    FROM user_accounts a
    INNER JOIN user_roles r
    ON a.role_id = r.id`)
    return users
}

export const getUserRights = async (userId: string) => {
    const { rows: users } = await pool.query(`
    SELECT rr.right_read, rr.right_edit, ur.right_name, ur.route_name
    FROM user_accounts ua
    INNER JOIN user_roles ur ON ua.role_id = ur.id
    INNER JOIN roles_rights rr ON ur.id = rr.roles_id
    INNER JOIN user_rights ur ON rr.rights_id = ur.id
    WHERE ua.id = $1`,
        [userId])
    return users
}


export const getAllFromOrganization = async (organizationId: string): Promise<any> => {
    const res = await pool.query(`
    SELECT 
    ua.id, 
    ua.first_name, 
    ua.last_name, 
    ua.email, 
    ru.role_id, 
    ur.role_name
    FROM user_accounts ua
    JOIN role_user ru ON ua.id = ru.user_id
    JOIN user_roles ur ON ru.role_id = ur.id
    WHERE ua.organization_id = $1`,
        [organizationId])
    return res.rows
}


export const getInfo = async (userId: string): Promise<any> => {
    const res = await pool.query(`
    SELECT 
    ua.id, 
    ua.first_name, 
    ua.last_name, 
    ua.email, 
    ru.role_id, 
    ur.role_name
    FROM user_accounts ua
    JOIN role_user ru ON ua.id = ru.user_id
    JOIN user_roles ur ON ru.role_id = ur.id
    WHERE ua.id = $1`,
        [userId])
    return res.rows[0]
}



export const getUserByUserName = async (userName: string) => {
    const userRes = await pool.query('SELECT * FROM tbl_user WHERE user_name=$1', [userName])
    const user = userRes.rows[0]
    delete user.password
    return user
}

export const getUserPeriod = async (branchId: string) => {
    try {
        const getFiscalYears = await pool.query('SELECT id, year FROM tbl_fiscal_year WHERE branch_id=$1', [branchId])
        return getFiscalYears.rows
    }
    catch (err) {
        console.error(err)
    }

}

export const getDateRange = async (periodId: string) => {
    try {
        const getDateRangeResponse = await pool.query('SELECT start_date, end_date FROM tbl_tranperiod WHERE fiscal_year_code=$1 AND current_period_flag=$2', [periodId, true])
        const { start_date, end_date } = getDateRangeResponse.rows[0]
        const dateRange = { startDate: start_date, endDate: end_date }
        return dateRange
    }
    catch (err) {
        console.error(err)
    }

}

export const getUserGroup = async (userName: string) => {
    const userRes = await pool.query('SELECT user_group_id FROM tbl_user WHERE user_name=$1', [userName])
    const { user_group_id } = userRes.rows[0]
    return user_group_id
}

export const userIdExists = async (userId: string): Promise<boolean> => {
    const res = await pool.query(
        'SELECT EXISTS(SELECT 1 FROM  tbl_user WHERE  id=$1)',
        [userId])
    return res.rows[0].exists
}


export const userExists = async (userName: string): Promise<boolean> => {
    const res = await pool.query(
        'SELECT EXISTS(SELECT * FROM  tbl_user WHERE  user_name=$1)',
        [userName])
    return res.rows[0].exists
}

export const comparePassword = async (email: string, password: string): Promise<boolean> => {
    const result = await pool.query('SELECT * FROM users WHERE email=$1', [email])
    const comparePassword = await compare(password, result.rows[0].password)
    return comparePassword
}


export const getReceiptNo = async () => {
    const receiptNoRes = await pool.query('SELECT MAX(receipt_code) FROM tbl_receipt_voucher',)
    const receiptNo = receiptNoRes.rows[0]
    return receiptNo
}

export const getContractNo = async () => {
    const LastcontractNo = await pool.query('SELECT MAX(Contract_no) FROM tbl_contract',)
    const contractNo = LastcontractNo.rows[0]
    return contractNo
}

export const getPeriodInfoById = async (periodId: string) => {
    try {
        const periodInfoQueryResponse = await pool.query(`SELECT 
        tbl_tranperiod.id,
        tbl_tranperiod, fiscal_year_code,
        tbl_tranperiod.fiscal_year_number,
        tbl_tranperiod.fiscal_year_year,
        tbl_tranperiod.month_no,
        tbl_tranperiod.start_date,
        tbl_tranperiod.end_date,
        tbl_tranperiod.paid_flag,
        tbl_tranperiod.current_period_flag,
        tbl_tranperiod.backup_flag,
        tbl_tranperiod.final_flag,
        tbl_tranperiod.report_flag,
        em1.name as eth_month_name
        FROM tbl_tranperiod
        INNER JOIN tbl_eth_month em1 ON em1.code = tbl_tranperiod.month_no WHERE tbl_tranperiod.fiscal_year_code = $1 and current_period_flag=true`, [periodId])
        const periodInfo = periodInfoQueryResponse.rows[0]
        return periodInfo
    } catch (err) {
        console.error(err)
    }

}

export const deleteUser = async (userId: string): Promise<any> => {
    await pool.query('DELETE FROM user_accounts WHERE id=$1', [userId])
}

export const deleteUserRoleByUserId = async (userId: string): Promise<any> => {
    await pool.query('DELETE FROM role_user WHERE user_id=$1', [userId])
}



export const updateUser = async (newUser: any): Promise<string> => {
    const {
        id,
        firstName: updatedFirstName,
        lastName: updatedLastName,
        email: updatedEmail,
    } = newUser
    const query = `
    UPDATE user_accounts
    SET first_name = $1, 
    last_name = $2,
    email = $3
    WHERE id=$4
    RETURNING *;
    `
    const res = await pool.query(query, [
        updatedFirstName,
        updatedLastName,
        updatedEmail,
        id])
    const userAccountId = res.rows[0]
    return userAccountId
}

const getUserAuthorizationInfo = async (userId: string) => {
    const { rows } = await pool.query(`
    SELECT 
    ru.role_id, 
    ur.role_name, 
    rb.branch_id,
    ua.organization_id
    FROM user_accounts ua
    JOIN role_user ru ON ua.id = ru.user_id
    JOIN user_roles ur ON ru.role_id = ur.id
    JOIN role_branch rb ON ru.role_id = rb.role_id
    WHERE ua.id  = $1;
  `, [userId])
    const userAuthInfo = rows[0]
    return userAuthInfo
}

export default {
    create,
    comparePassword,
    deleteUser,
    deleteUserRoleByUserId,
    userIdExists,
    userExists,
    getDateRange,
    getAll,
    getAllFromOrganization,
    getInfo,
    getReceiptNo,
    getContractNo,
    getUserRights,
    getUserPeriod,
    getUserGroup,
    getUserByUserName,
    getPeriodInfoById,
    getUserAuthorizationInfo,
    updateUser
}