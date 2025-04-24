import AuthProvider from '../providers/auth.provide.js';

class VerifyMiddleware{
    async checkAuth(req, res, next){
        try{
            const header = req.headers.authorization;
            if(!header){
                throw new Error('Not login yet');
            }
            const token = header.split(' ')[1];
            const data = await AuthProvider.decodeToken(token)
            req.user = data.id;
            next();
        }catch(err){
            next(err);
        }
    }
};
export default new VerifyMiddleware();