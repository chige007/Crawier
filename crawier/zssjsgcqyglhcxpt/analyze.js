const cheerio = require('cheerio');

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
    let keys = Object.keys(keyName);
    let rows = [];
    let tr = $('table.cssTableInfo1 tr');
    if (!tr) cb(error_cb);
    let total = tr.length - 1;
    for (let i = 1 ; i < tr.length ; i++) {
        let elem_tr = tr[i];
        let dataObj = {};
        let tds = $(elem_tr).find('td');
        tds.each((i_td, elem_td) => {
            if (keys[i_td] && keys[i_td] !== 'searchCode') {
                let text = $(elem_td).text();
                text = text.replace(/\n/g, '').replace(/\s/g, '');
                dataObj[keys[i_td]] = text;
            }
        });
        dataObj['searchCode'] = $(tds).eq(1).find('a').attr('href').split('EnterNum=')[1];
        rows.push(dataObj);
    }
    cb({
        code: 200,
        msg: '查询成功',
        data: {
            total,
            rows,
            path,
            webName,
            keyName,
            time: new Date().getTime()
        }
    });
};

module.exports = analyze;