const cheerio = require('cheerio');

function analyze (path, webName, html, cb) {
    let $ = cheerio.load(html);
    let error_cb = {
        code: 500,
        msg: '查询失败',
        data: null
    };
    let rows = [];
    let tr = $('table.cssTableInfo1 tr');
    for (let i = 1 ; i < tr.length ; i++) {
        let td_zz = $(tr).eq(i).find('td').eq(1);
        let text_zz = $(td_zz).text();
        text_zz = text_zz.replace(/\n/g, '').replace(/\s/g, '');
        rows.push(text_zz);
    }
    cb({
        code: 200,
        msg: '查询成功',
        data: {
            total: rows.length,
            rows,
            path,
            webName,
            time: new Date().getTime()
        }
    });
};

module.exports = analyze;