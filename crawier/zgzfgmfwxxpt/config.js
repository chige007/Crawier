const path = 'http://www.ccgp.gov.cn/cr/list';
const name = '中国政府购买服务信息平台';
const query = (company) => {
    return {
        orgName: company
    }
}

module.exports.path = path;
module.exports.name = name;
module.exports.query = query;