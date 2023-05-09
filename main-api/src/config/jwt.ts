// import { Request, Response, NextFunction } from 'express'
// import jwt from 'jsonwebtoken'
// import client from './redis'
// const createError = require('http-errors')


// const signAccessToken = (userData: any) => {
//     return new Promise((resolve, reject) => {
//         const payload = userData
//         const secret: any = process.env.NEXT_PUBLIC_JWT_SECRET
//         const options = {
//             expiresIn: process.env.NEXT_PUBLIC_JWT_EXPIREATION,
//             issuer: 'dcPayrollToken',
//             audience: userData.email
//         }

//         jwt.sign(payload, secret, options, (err: Error, token: any) => {
//             if (err) reject(createError.InternalServerError())
//             resolve(token)
//         })
//     })
// }


// const signRefreshToken = (userData: any) => {
//     return new Promise((resolve, reject) => {
//         const payload = userData
//         const secret: any = process.env.NEXT_PUBLIC_JWT_REFRESH_TOKEN
//         const options = {
//             expiresIn: process.env.NEXT_PUBLIC_JWT_EXPIREATION,
//             issuer: 'dcPayrollToken',
//             audience: userData.email
//         }
//         jwt.sign(payload, secret, options, (err: Error, token) => {
//             if (err) reject(createError.InternalServerError())
//             client.SET(userData.email, token, 'EX', 365 * 24 * 60 * 60, (err: Error) => {
//                 if (err) {
//                     reject(createError.InternalServerError())
//                 }
//             })
//             resolve(token)
            
//         })
// })
// }

// const verifyAccessToken = (req: Request, res: Response, next: NextFunction) => {
//     if (!req.headers['authorization']) return next(createError.Unauthorized())
//     const authHeader = req.headers['authorization']
//     const token = authHeader.split(' ')[1]
//     jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET, (err: Error, payload: any) => {
//         if (err) {
//             const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message
//             return next(createError.Unauthorized(message))
//         }
//         req.payload = payload
//         next()
//     })
// }

// export const verifyRefreshToken = async (refreshToken: any): Promise<any> => {
//     return new Promise((resolve, reject) => {
//         jwt.verify(refreshToken, process.env.NEXT_PUBLIC_JWT_REFRESH_TOKEN_SECRET, (err: Error, payload: any) => {
//             if (err) return reject(createError.Unauthorized())
//             const user = payload.aud
//             client.GET(user, (err: Error, result: any) => {
//                 if (err) {
//                     reject(createError.InternalServerError())
//                     resolve(false)
//                 }
//                 if (refreshToken === result) {
//                     resolve(user)
//                 }
//                 resolve(user)
//             })
//         })
//     })
// }



// export default {
//     signAccessToken,
//     signRefreshToken,
//     verifyAccessToken,
//     verifyRefreshToken
// }