import * as jwt from 'jsonwebtoken';

class JWTAuth {

    createToken = (data: any) => {
        const key = process.env.API_KEY;
        const token = jwt.sign(data, key, {
            expiresIn: 60 * 60 * 24,
            algorithm: "HS256"
        });
        return { token };
    }

    readToken: any = (token: any) => {

        const key = process.env.API_KEY;
        const data = jwt.verify(token, key);

        return data;
    }
}
export default new JWTAuth();