import express from 'express';
import * as admin from 'firebase-admin';
import credentials from '../credentials.json';

admin.initializeApp({
    credential: admin.credential.cert(credentials),
});

const users = {
    'nEo7GIh2F3SjvLpnV4uqOhJgdyA3': {
        name: 'Tomas De Andrade',
        bio: 'I like to code',
    },
    'qtJBThk69hbJ8m0MSNmxpCmjd2u2': {
        name: 'Tommy Dos',
        bio: 'tommys shadow',
    }
}

const app = express();
app.use(express.json());

app.use('/users/:userId', async (req, res, next) => {
    const { authtoken } = req.headers;
    const { userId } = req.params;

    try { 
        const authUser = await admin.auth().verifyIdToken(authtoken);
        if (authUser.uid !== userId) {
            return res.sendStatus(403);
        }
    } catch (e) {
        return res.sendStatus(401);
    }

    next();

});

app.use('/users/:userId', async (req, res, next) => {
    const { userId } = req.params;
    const user = users[userId];
    
    if (!user) {
        return res.sendStatus(404);
    } else {
        req.user = user;
        next();
    }
});

app.get('/users/:userId', async (req, res) => {
    res.json(req.user);
   
});

app.post('/users', async (req, res) => {
    const { email, password, userInfo } = req.body;

    try { 
        const authUser = await admin.auth().createUser({
            email,
            password,
        });
        users[authUser.uid] = userInfo;
        res.sendStatus(200);
    } catch (e) {
        res.sendStatus(401);
    }
});

app.put('/users/:userId', async (req, res) => {
    const { userId } = req.params;
    const { updates } = req.body;

    const updatedUser = {
        ...req.user,
        ...updates,
    };

    users[userId] = updatedUser;
    res.json(updatedUser);
});

app.delete('/users/:userId', async (req, res) => {
    const { userId } = req.params;
    delete users[userId];
    await admin.auth().deleteUser(userId);
    res.json(req.user);

});

app.listen(8080, () => {
    console.log('Server is listening on port 8080');
});