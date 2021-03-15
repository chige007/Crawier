const querystring = require('querystring');
const axios = require('axios');
const { path, basePath, name } = require('./config');
const analyze = require('./analyze');


function check (code, cb) {
    if (!code) {
        cb({
            code: 100,
            msg: '请传主题板块代码',
            data: null
        });
    } else {
        axios.get(path + code).then(res => {
            analyze(res.data, cb);
        }).catch(error => {
            cb({
                code: 500,
                msg: '链接失败，请联系管理员',
                data: error
            });
        });
    }
}

module.exports = check;