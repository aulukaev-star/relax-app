import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET!

export function signToken(user: any) {
  return jwt.sign(
    {
      id: user.id,
      role: user.role,
      email: user.email
    },
    SECRET,
    { expiresIn: '7d' }
  )
}

export function verifyToken(token: string) {
  return jwt.verify(token, SECRET)
}
