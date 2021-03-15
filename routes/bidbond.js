// 公司电子投标保函系统

var express = require('express');
var router = express.Router();

var check_zgzfgmfwxxpt = require('./../crawier/zgzfgmfwxxpt/');
var check_zssjsgcqyglhcxpt = require('./../crawier/zssjsgcqyglhcxpt/');
var check_zssjsgcqyglhcxpt_zz = require('./../crawier/zssjsgcqyglhcxpt_zz/');
var check_xyzg_zdsswfaj = require('./../crawier/xyzg_zdsswfaj/');

/* 中国政府购买服务信息平台 */
router.get('/zgzfgmfwxxpt', function(req, res, next) {
    let company = req.query.company;
    if (!company) {
        res.json({
            code: 400,
            msg: '请传递企业名称',
            data: null
        })
    } else {
        check_zgzfgmfwxxpt(company, data => {
            res.json(data);
        });
    }
});
/* 中山市建设工程企业管理和诚信平台 */
router.get('/zssjsgcqyglhcxpt', function(req, res, next) {
    let company = req.query.company;
    if (!company) {
        res.json({
            code: 400,
            msg: '请传递企业名称',
            data: null
        })
    } else {
        check_zssjsgcqyglhcxpt(company, data => {
            res.json(data);
        });
    }
});
/* 中山市建设工程企业管理和诚信平台 */
router.get('/zssjsgcqyglhcxpt_zz', function(req, res, next) {
    let company = req.query.company;
    if (!company) {
        res.json({
            code: 400,
            msg: '请传递企业名称',
            data: null
        })
    } else {
        check_zssjsgcqyglhcxpt_zz(company, data => {
            res.json(data);
        });
    }
});
/* 信用中国-重大税收违法案件当事人名单 */
router.get('/xyzg_zdsswfaj', function(req, res, next) {
    let company = req.query.company;
    if (!company) {
        res.json({
            code: 400,
            msg: '请传递企业名称',
            data: null
        })
    } else {
        check_xyzg_zdsswfaj(company, data => {
            res.json(data);
        });
    }
});

module.exports = router;
