import * as jose from 'jose'

const JWT_SECRET = new TextEncoder().encode(Bun.env.JWT_SECRET || 'secret')
const JWT_EXPIRE = Bun.env.JWT_EXPIRE || '7d'

type JWT = {
  data: jose.JWTPayload
}

export const sign = async ({ data }: JWT) =>
  await new jose.SignJWT(data)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRE)
    .sign(JWT_SECRET)

export const verify = async (jwt: string) =>
  (await jose.jwtVerify(jwt, JWT_SECRET)).payload

export const jwt = {
  sign,
  verify,
}
