// const cheerio = require('cheerio');

function analyze (res, cb) {
    let error_cb = {
        code: 500,
        msg: '查询失败',
        data: null
    };

    let data = [];

    const fillZero = (n) => {
        return n = n * 1 < 10 ? '0' + n : n;
    }

    if (res.code === 20000) {
        let messages = res.data.messages;
        for (let i = 0 ; i < messages.length; i++) {
            let {title, summary, created_at} = messages[i];
            let date = new Date(created_at * 1000);
            let month = fillZero(date.getMonth() + 1);
            let day = fillZero(date.getDate());
            let hour = fillZero(date.getHours());
            let minute = fillZero(date.getMinutes());
            let dateStr = `${hour}:${minute}`;
            data.push({
                title,
                summary,
                date: dateStr
            });
        }
    }

    cb({
        code: 200,
        msg: '查询成功',
        data
    });
};

module.exports = analyze;