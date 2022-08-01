import jwt from 'jsonwebtoken';

export const secret = 'nethz'

export const createJWToken = ( user: any ): string => {
    return jwt.sign({ user }, secret, {
        expiresIn: '1d'
    })
}