import * as jose from 'jose'

const JWT_SECRET = new TextEncoder().encode(Bun.env.JWT_SECRET || 'secret')

type JWT = {
  data: jose.JWTPayload
}

export const sign = async ({ data, exp = '7d' }: JWT) =>
  await new jose.SignJWT(data)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(exp)
    .sign(JWT_SECRET)

export const verify = async (jwt: string) =>
  (await jose.jwtVerify(jwt, JWT_SECRET)).payload

export const jwt = {
  sign,
  verify,
}
