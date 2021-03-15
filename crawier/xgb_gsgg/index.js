const querystring = require('querystring');
const axios = require('axios');
const { path, basePath, name } = require('./config');
const analyze = require('./analyze');


function check (limit = 20, cb) {
    axios.get(path + limit).then(res => {
        analyze(res.data, cb);
    }).catch(error => {
        cb({
            code: 500,
            msg: '链接失败，请联系管理员',
            data: error
        })
    });
}

module.exports = check;