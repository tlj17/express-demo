var express = require('express');
var router = express.Router();
//引入body-parser
const bodyParser = require('body-parser')

//引入lowdb存储数据
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
 
const adapter = new FileSync('db.json')
const db = low(adapter)

//初始化
db.defaults({ forms: []})
  .write()

let urlParser = bodyParser.urlencoded({extended:false})

router.post('/input',urlParser, function(req, res, next) {
    db.get('forms').push(req.body).write()
    res.send('input success')
});

router.get('/tablelist',urlParser,function(req,res,next){
    const tabledata = db.get('forms').value()
    res.json({
        code:200,
        message:'请求成功',
        data:tabledata
    })
})

//获取单条信息
router.get('/view/:employeeId',urlParser,function(req,res,next){
    let employeeId = req.params.employeeId
    const data = db.get('forms').find({employeeId:employeeId}).value()
    res.json({
        code:200,
        message:'请求成功',
        data:data
    })
})

//删除单条数据
router.get('/tablelist/:employeeId',urlParser,function(req,res,next){
    let employeeId = req.params.employeeId
    db.get('forms').remove({employeeId:employeeId}).write()
    res.json({
        code:'200',
        msg:'删除成功',
        data:{}
   })
})

//编辑单条信息
router.post('/input/:employeeId',urlParser,function(req,res,next){
    let form = req.body
    let employeeId= req.params.employeeId
    db.get('forms').find({employeeId:employeeId}).assign(form).write()
    res.json({
        code:'200',
        msg:"更新成功",
        data:{}
    })
})

module.exports = router;
