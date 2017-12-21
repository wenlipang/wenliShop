var express=require('express');
var router=express.Router();

var Goods=require('../models/goods').productModel;

// 后台接口 实现分页功能
router.get('/',function(req,res,next) {
	//分页的参数 
	let page=parseInt(req.param('page'));
	// 一页多少条数据 param 拿到的都是字符串
	let pageSize=parseInt(req.param('pageSize'));
	// 获取前端传来的参数 排序
	let sort=req.param('sort');
	// mongodb 中的skip :默认跳过几条数据  分页公式

	let skip=(page-1)*pageSize;

	let params={};
	let goodsModel=Goods.find(params).skip(skip).limit(pageSize);
	goodsModel.sort({'productPrice':sort});//1是升序 -1是降序

	goodsModel.exec(function(err,doc){
		if(err){
			res.json({
				status:'1',
				msg:err.message
			});
		}else{
			res.json({
				status:'0',
				msg:'',
				result:{
					count:doc.length,
					list:doc
				}
			})
		}
	})
	// res.send('hellp,goods list.')
     // res.render("index");
})

//导出
module.exports=router;