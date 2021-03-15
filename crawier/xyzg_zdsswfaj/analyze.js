// const cheerio = require('cheerio');

function analyze (path, webName, html, cb) {
    let error_cb = {
        code: 500,
        msg: '查询失败',
        data: null
    };
    console.log(html.status);
    if (html.status !== 1) {
        cb(error_cb);
        return;
    };
    let keyName = {
        nsrmc: '纳税人名称',
        fddbrhzfzrmc: '法定代表人或负责人姓名',
        tyshxydm: '统一社会信用代码',
        zzjgdm: '组织机构代码',
        nsrsbh: '纳税人识别号',
        ajsbq: '案件上报期',
        zcdz: '注册地址',
        fyzjzrdcwfzrxm: '负有直接责任的财务负责人姓名',
        fyzjzrdzjjgxxjqcyryxx: '负有直接责任的中介机构信息及其从业人员信息',
        ajxz: '案件性质',
        zywfss: '主要违法事实', 
        xgflyjj_swclcfqk: '相关法律依据及税务处理处罚情况', 
        dataSource: '数据来源'
    };
    let total = html.data.total;
    let rows = html.data.list;
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