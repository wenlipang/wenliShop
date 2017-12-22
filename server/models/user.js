 var mongoose=require('mongoose');

// 引入数据
var userList=require('../../mock/user.json');

// 连接数据结构
mongoose.connect('mongodb://localhost:27017/dumall');


// 得到数据库连接句柄
var db=mongoose.connection;

// 通过数据库 连接句柄，监听mongoose数据库成功的事件
db.on('open',function(err){
	if(err){
		console.log('数据库连接失败');
		throw err;
	}
	console.log('数据库连接成功');

})
 // 定义表数据结构
 var userModel=new mongoose.Schema({
 		"userId":String,
 		"userName":String,
 		"userPwd":String,
 		"orderList":Array,
 		"cartList":[
	 		{
	 			"productId":String,
	 			"productName":String,
	 			"productPrice":Number,
	 			"productImage":String,
	 			"checked":Number,
	 			"productNum":Number
	 		}
 		],
 		
 		"addressList":Array
 },
 {
 	versionKey:false
 });

// 将表的数据结构和表关联起来
var userModel=mongoose.model('userList',userModel,'userList');
 



// 添加数据
userModel.insertMany(userList,function(err,result){
	if(err){
		console.log("数据添加失败");
		throw err;
	}
	console.log("数据添加成功:",result);
})

// 删除数据
// userModel.remove({},function(err){
// 	if(err){
// 		console.log('删除数据失败');
// 		throw err;
// 	}
// 	console.log("删除数据成功");
// })
// 导出数据
 module.exports={
 	userModel:userModel
 }