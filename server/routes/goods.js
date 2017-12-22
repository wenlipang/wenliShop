var express=require('express');
var router=express.Router();

var Goods=require('../models/goods').productModel;
var User=require('../models/user').userModel;

// 后台接口 实现分页功能 查询商品列表
router.get('/',function(req,res,next) {
	//分页的参数 
	let page=parseInt(req.param('page'));
	// 一页多少条数据 param 拿到的都是字符串
	let pageSize=parseInt(req.param('pageSize'));
	// 价格等级
	let priceLevel=req.param('priceLevel');
	console.log("价格等级参数",priceLevel);
	// 获取前端传来的参数 排序
	let sort=req.param('sort');
	// mongodb 中的skip :默认跳过几条数据  分页公式
	let skip=(page-1)*pageSize;
	let params={};
	var priceGt='',priceLte='';
	if(priceLevel!='all'){
		switch(priceLevel){
			case '0':priceGt=0;priceLte=100;break;
			case '1':priceGt=100;priceLte=500;break;
			case '2':priceGt=500;priceLte=1000;break;
			case '3':priceGt=1000;priceLte=5000;break;
		}
		params={
			productPrice:{
				$gt:priceGt,
				$lte:priceLte
			}
		}
	}
	
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
	
})

// 加入购物车
router.post('/addCart',function(req,res,next){
	var userId="100000077",productId=req.body.productId;

	User.findOne({userId:userId},function(err,userDoc){
		if(err){
			res.json({
				status:"1",
				msg:err.message
			})
		}else{
			console.log("userDoc:"+userDoc);
			if(userDoc){
				let goodsItem="";
				userDoc.cartList.forEach(function(item){
					if(item.productId==productId){
						goodsItem=item;
						item.productNum++;
					}
				});
				// 如果商品信息已经有了则直接进行数量加加，否则加入购物车
				if(goodsItem){
					userDoc.save(function(err2,doc2){
						if(err2){
							res.json({
								status:"1",
								msg:err2.message
							})
						}else{
							res.json({
								status:"0",
								msg:"",
								result:"suc"
							})
						}
					})
				}else{
					Goods.findOne({productId:productId},function(err1,doc){
						if(err1){
							res.json({
								status:"1",
								msg:err1.message
							})
						}else{
								if(doc){
									newobj = {//新创建一个对象，实现转换mongoose不能直接增加属性的坑
			                                 productNum: 1,
			                                 checked: 1,
			                                 productId: doc.productId,
			                                 producName: doc.producName,
			                                 salePrice: doc.productPrice,
			                                 productImage: doc.productImage
			                             }
								
									userDoc.cartList.push(newobj);
									userDoc.save(function(err2,doc2){
										if(err2){
											res.json({
												status:"1",
												msg:err2.message
											})
										}else{
											res.json({
												status:"0",
												msg:"",
												result:"suc"
											})
										}
									})
								}
							}
					})
				}
			
			}
		}
	})

})


//导出
module.exports=router;