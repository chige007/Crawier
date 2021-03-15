// 选股宝信息

var express = require('express');
var router = express.Router();

var check_gsgg = require('../crawier/xgb_gsgg');
var check_gng = require('../crawier/xgb_gng');
var check_zbxx = require('../crawier/xgb_zbxx');

/* 选股宝-公司公告 */
router.get('/gsgg', function(req, res, next) {
    let limit = req.query.limit;
    check_gsgg(limit, data => {
        res.render('xgb_gsgg', { title: '选股宝-公司公告', data: data.data });
    });
});

/* 选股宝-概念股 */
router.get('/gng', function(req, res, next) {
    let code = req.query.code;
    check_gng(code, data => {
        res.render('xgb_gng', { title: '选股宝-主题概念', data: data.data });
    });
});

/* 选股宝-重磅消息 */
router.get('/zbxx', function(req, res, next) {
    let limit = req.query.limit;
    check_zbxx(limit, data => {
        res.render('xgb_zbxx', { title: '选股宝-重磅消息', data: data.data });
    });
});

module.exports = router;
