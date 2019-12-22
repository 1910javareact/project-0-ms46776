import {Request} from 'express'

export function corsLocal(req: Request, res, next){
    res.header('Access-Control-Allow-Origin', `${req.headers.origin}`);
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept,');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Expose-Headers', 'token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH');
    if (req.method === 'OPTIONS'){
        res.status(200).send();
    } else {
        next();
    }
}