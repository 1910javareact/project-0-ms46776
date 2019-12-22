import express  from 'express';
import bodyParser from 'body-parser';



import { reimbursementRouter } from './routers/reimbursement-router';
import { sessionMiddleware } from './middleware/session-middleware';
import { getUserByUsernameAndPassword } from './services/user-services';
import { userRouter } from './routers/user-router';
import { corsLocal } from './middleware/cors-middleware';
// import { loggingMiddleware } from './middleware/logging-middleware';


const app = express();


app.use(bodyParser.json());

app.use(corsLocal);


//app.use(loggingMiddleware);
app.use(sessionMiddleware);

app.use('/user', userRouter );
app.use('/reimbursements', reimbursementRouter);

app.post('/login', async (req, res) => {
    const {username, password} = req.body;
    // if (!username || !password ) {
    //     res.status(400).send('please have a username and password field');

    // } else {
    try {
        const user = await getUserByUsernameAndPassword(username, password);
        res.json(user);
    } catch (e) {
        res.status(e.status).send(e.message);

    }});


app.listen(9001, () => {
    console.log('app has started');



});
