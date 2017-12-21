

// nodejs 连接mongdb 数据库
// mongoose 操作mongodb的步骤

// 引入模块
var mongoose=require('mongoose');

//引入数据
var goodsList=require('../../mock/test.json');

// 连接数据库
mongoose.connect('mongodb://localhost:27017/dumall')

// 得到数据库连接句柄
var db=mongoose.connection;

//通过 数据库连接句柄，监听mongoose数据库成功的事件
db.on('open',function(err){
	if(err){
		console.log('数据库连接失败');
		throw err;
	}
	console.log('数据库连接成功')
})

//定义表数据结构

var productModel=new mongoose.Schema({
	"productId":String,
	"productName":String,
	"productPrice":Number,
	"productImg":String
},
{
	versionKey:false //去除： - -v
})

// 将表的数据结构和表关联起来
// var productModel=mongoose.model('anyname',表的数据结构，表名)
var productModel=mongoose.model("goodsList",productModel,"goodsList");




// 添加数据
// productModel.insertMany(goodsList,function(err,result){
// 	if(err){
// 		console.log("数据添加失败");
// 		throw err;
// 	}
// 	console.log("数据添加成功:",result);
// })

// 删除数据
// productModel.remove({},function(err){
// 	if(err){
// 		console.log('删除数据失败');
// 		throw err;
// 	}
// 	console.log("删除数据成功");
// })

//导出数据
module.exports={
	productModel:productModel
}

