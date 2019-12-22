import { Request } from 'express';

export function corsFilter(req: Request, res, next) {
    res.header('Access-Control-Allow-Origin', `${req.headers.origin}`);
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    //headers.putSingle("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS, DELETE, PATCH");
    res.header('Access-Control-Allow-Methods', 'POST, GET, PATCH');
    res.header('Access-Control-Allow-Credentials', 'true');
    if (req.method === 'OPTIONS') {
        res.status(200).send();
    } else {
        next();
    }
}