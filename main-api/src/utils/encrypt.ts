import bcrypt from 'bcryptjs'

export const encrypt = async (password: string) => {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    return hash
}

export const compare = async (plainPass: string, hashword: string) => await bcrypt.compare(plainPass, hashword)