const axios = require('axios');
const cheerio = require('cheerio');
const analyze_zz = require('./analyze_zz');

function analyze (path, webName, html, cb) {
    let $ = cheerio.load(html);
    let error_cb = {
        code: 500,
        msg: '查询失败',
        data: null
    };
    let keyName = {
        companyNum: '企业编号',
        companyName: '企业名称',
        creditBookNum: '诚信手册编号',
        baseScore: '基础分值',
        creditScore: '信用总分值',
        creditLevel: '信用等级',
        blackList: '黑名单',
        dataOutOfDate: '资料过期',
        publishDate: '发布日期',
        searchCode: '详情查询标识'
    };
    let rows = [];
    let tr = $('table.cssTableInfo1 tr').eq(1);
    let searchCode = $(tr).find('td').eq(1).find('a').attr('href').split('EnterNum=')[1];
    if (!searchCode) {
        cb(error_cb);
        return;
    }
    console.log(`${searchCode}`);
    axios.get(`http://chengxin.zsjs.gov.cn:8082/App/PublicPage/CompanyTabsList.aspx?nav=divAptitude&EnterNum=${searchCode}`).then(res => {
        analyze_zz(path, webName, res.data, cb);
    }).catch(error => {
        console.log(error);
        cb({
            code: 500,
            msg: '链接失败，请联系管理员',
            data: error
        })
    });
};

module.exports = analyze;