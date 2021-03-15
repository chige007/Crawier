const querystring = require('querystring');
const axios = require('axios');
const { path, query, name } = require('./config');
const analyze = require('./analyze');


function check (company, cb) {
    if (!company) return false;
    let params = query(company);
    axios.post(path, querystring.stringify(params)).then(res => {
        analyze(path, name, res.data, cb);
    }).catch(error => {
        cb({
            code: 500,
            msg: '链接失败，请联系管理员',
            data: null
        })
    });
}

module.exports = check;