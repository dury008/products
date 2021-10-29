const exp = require('constants');
const express = require('express');
const app = express();
const session = require('express-session');
const fs = require('fs');


app.use(session({
    secret: 'secret code',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 //쿠키 유효시간
    }
}));

app.use(express.json({
    limit: '50mb'
})); //request로 json을 받게함


const server = app.listen(3000, () => {
    console.log('Server started. port 3000');
});

let sql = require('./sql.js');

fs.watchFile(__dirname + '/sql.js', (curr, prev) => {
    console.log('sql변경시 재시작없이 바로시작');
    delete require.cache[require.resolve('./sql.js')];
    sql = require('./sql.js');
}); 


const db = {
    database: "dev",
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "wlsgur1020"
};

const dbPool = require('mysql').createPool(db);


app.post('/api/login', async (request, res) => {
    request.session['email'] = "dury008@naver.com";
    console.log(request.session);
    res.send('ok');
});

app.post('/api/logout', async (request, res) => {
    request.session.destroy();
    res.send('ok');
});


app.post('/api/:alias', async (request, res) => {
    // if(!request.session.email){
    //     return res.status(401).send({error:'you need to login'});
    // }

    try {
        res.send(await req.db(request.params.alias, request.body.param))
    } catch(err) {
        res.status(500).send({
            error: err
        })
    }
});

const req = {
    async db(alias, param = [], where = '') {
      return new Promise((resolve, reject) => dbPool.query(sql[alias].query + where, param, (error, rows) => {
        if (error) {
          if (error.code != 'ER_DUP_ENTRY')
            console.log(error);
          resolve({
            error
          });
        } else resolve(rows);
      }));
    }
  };