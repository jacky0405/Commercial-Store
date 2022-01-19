const jsonServer = require('json-server')
const jwt = require('jsonwebtoken')
const fs = require('fs');
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults({
    static: "./build"
})
const port = process.env.PORT || 5000;
server.use(jsonServer.bodyParser)
server.use(middlewares)
server.use(
    jsonServer.rewriter({
        "/api/*": "/$1"
    })
)

const getUsersDb = () => {
    return JSON.parse(fs.readFileSync('./users.json', 'utf-8'));
}

const isAuthenticated = (email, password) => {
   return (getUsersDb().users.findIndex(user => user.email === email && user.password === password) !== -1);
   
}

const isEmailExist = (email) => {
    return (getUsersDb().users.findIndex(user => user.email === email) !== -1);
    
 }

const secret = 'hello_jacky';
const createToken = payload => {
    return jwt.sign(payload, secret, {expiresIn: '1h'} );
}

server.post('/auth/login', (req, res) => {
    const {email, password} = req.body;
    if(isAuthenticated(email,password)){
        const user = getUsersDb().users.find(u => u.email === email && u.password === password);
        const {nickname, type} = user;
        const jwtToken = createToken({nickname, type, email});
        return res.status(200).json(jwtToken);
    } else {
        return res.status(401).json('Incorrect verification');
    }
    
});

server.post('/auth/register', (req, res) => {
    const {nickname, email, password, type} = req.body;
    console.log(req.body);

    if(isEmailExist(email)){
        return res.status(401).json('User already exists')
    }

    fs.readFile('users.json', (err, _data) => {
        if(err){
            return res.status(401).json("Read users DB failed")
        }

        const data = JSON.parse(_data.toString());
        const lastId = data.users[data.users.length - 1].id;
        data.users.push({id: lastId+1, email, password, nickname, type});

        fs.writeFile('users.json', JSON.stringify(data), (err, result) => {
            if(err){
                return res.status(401).json('write user failed');
            }
        })
    })
    const jwtToken = createToken({nickname, email, password});
    return res.status(200).json(jwtToken)
});

server.use('/carts', (req, res, next) => {
    console.log(req.headers)
    if(req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer' ){
        return res.status(401).json('Error authentocation format')
    }

    try{
        const tokenResult = verifyToken(req.headers.authorization.split(' ')[1]);
        if(tokenResult instanceof Error){
            return res.status(401).json('Access token not provided');
        }
        next();
    } catch {
        return res.status(401).json('Error token');
    }
})

const verifyToken = (token) => {
    return jwt.verify(token, secret, (err, decode) => {
        decode !== undefined ? decode: err
    });
}

server.use(router)
server.listen(port, () => {
    console.log('JSON Server is running')
})