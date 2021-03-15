const cheerio = require('cheerio');

function analyze (path, webName, html, cb) {
    let $ = cheerio.load(html);
    let error_cb = {
        code: 500,
        msg: '查询失败',
        data: null
    };
    let keyName = {
        index: '序号',
        companyName: '企业名称',
        companyCode: '统一社会信用代码（或组织机构代码）',
        companyAddress: '企业地址',
        illegalSituation: '严重违法失信行为的具体情形',
        punishmentResult: '处罚结果',
        punishmentBasis: '处罚依据',
        punishmentDate: '处罚日期',
        publishDate: '公布日期',
        enforcementUnit: '执法单位'
    };
    let keys = Object.keys(keyName);
    let rows = [];
    let tr = $('#tableInfo .trShow');
    if (!tr) cb(error_cb);
    let total = tr.length;
    tr.each((i_tr, elem_tr) => {
        let dataObj = {};
        let tds = $(elem_tr).find('td');
        tds.each((i_td, elem_td) => {
            let text = $(elem_td).text();
            text = text.replace(/\n/g, '').replace(/\s/g, '');
            dataObj[keys[i_td]] = text;
        });
        rows.push(dataObj);
    });
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