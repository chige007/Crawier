// const cheerio = require('cheerio');
const axios = require('axios');

function analyze (res, cb) {
    let error_cb = {
        code: 500,
        msg: '查询失败',
        data: null
    };

    let data = [];
    let stockNums = [];

    if (res.code === 20000) {
        let stocks = res.data.stocks;
        for (let i = 0 ; i < stocks.length; i++) {
            let {symbol, desc, desc_url} = stocks[i];
            stockNums.push(symbol);
            data.push({symbol, desc, desc_url});
        }
    }
    console.log(stockNums.join(','));
    axios.get('https://flash-api.xuangubao.cn/api/stock/data?&fields=symbol,stock_chi_name,change_percent,price,turnover_ratio,non_restricted_capital,total_capital,per,limit_up_days,last_limit_up,limit_status,nearly_new_acc_pcp&strict=true&symbols=' + stockNums.join(',')).then(res => {
        if (res.data.code === 20000) {
            let stockMap = res.data.data;
            data.map(item => {
                item.name = stockMap[item.symbol]['stock_chi_name'];
                item.non_restricted_capital = stockMap[item.symbol]['non_restricted_capital'];
                item.total_capital = stockMap[item.symbol]['total_capital'];
                item.per = stockMap[item.symbol]['per'];
                return item;
            });

            data.sort((a, b) => {
                return b.total_capital - a.total_capital;
            });

            cb({
                code: 200,
                msg: '查询成功',
                data
            });
        }
    });
};

module.exports = analyze;