const querystring = require('querystring');
const axios = require('axios');
const { path, basePath, name } = require('./config');
const analyze = require('./analyze');


function check (company, cb) {
    if (!company) return false;
    company = encodeURI(company);
    axios.get(path + company).then(res => {
        analyze(basePath, name, res.data, cb);
    }).catch(error => {
        cb({
            code: 500,
            msg: '链接失败，请联系管理员',
            data: error
        })
    });
}

module.exports = check;