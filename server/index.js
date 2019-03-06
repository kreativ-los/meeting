import express, {Router} from 'express';
import bodyParser from 'body-parser';

import socket from './socket/socket';

// import routes
import meetingsRouter from './api/routes/meetingsRouter';
import participatorRouter from './api/routes/participatorRouter';

const app = express();
const router = Router();
const port = process.env.PORT || 5000;

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.use('/meetings', meetingsRouter);
router.use('/participator', participatorRouter);

app.use('/api/v1', router)

const server = app.listen(port);
console.log('server runnung under: http://localhost:' +  + port);

socket.attach(server);

if (process.env.NODE_ENV === 'production') app.use(express.static('../client/dist'));
