import express  from 'express';
import bodyParser from 'body-parser';



import { reimbursementRouter } from './routers/reimbursement-router';
import { sessionMiddleware } from './middleware/session-middleware';
import { getUserByUsernameAndPassword } from './services/user-services';
import { userRouter } from './routers/user-router';


const app = express();


app.use(bodyParser.json());
app.use(sessionMiddleware);

app.use('/user', userRouter );
app.use('/reimbursements', reimbursementRouter);

app.post('/login', (req, res) => {
    const {username, password} = req.body;
    if (!username || !password ) {
        res.status(400).send('please have a username and password field');
    }
    try {
        const user = getUserByUsernameAndPassword(username, password);
        req.session.user = user;
        res.json(user); // its standard to send the logged in user info after the log in
    } catch (e) {
        res.status(e.status).send(e.message);
    }
});


app.listen(9001, () => {
    console.log('app has started');



});
