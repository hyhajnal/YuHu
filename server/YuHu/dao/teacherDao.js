// 实现与MySQL交互
var mysql = require('mysql');
var $conf = require('../config/db');
var $sql = require('./teacherSqlMapping');
var util = require('../util/util');

// 使用连接池，提升性能
var pool = mysql.createPool($conf.mysql);
// var connection = mysql.createConnection({multipleStatements:true});
global.rno = '';

// 向前台返回JSON方法的简单封装
var jsonWrite = function(res, ret) {
	console.log(ret);
	if (typeof ret === 'undefined') {
		res.json({
			code: '1',
			msg: '操作失败'
		});
	} else {
		res.json(ret);
	}
};

var queryRoomIdByTid = function(tid) {	
	pool.getConnection(function(err, connection) {		
		// 根据教师Id得到教室号
		connection.query($sql.queryRoomIdByTid, [tid], function(err, result) {			
			if(result[0]!=null){
				global.rno = result[0].rno;
			}
			connection.release();
			console.log('rno1 '+global.rno);				
		});		
	});	
};

module.exports = {
	queryByTel: function(req, res, next) {
		var tel = req.query.tel || req.params.tel;
		pool.getConnection(function(err, connection) {
			connection.query($sql.queryByTel, tel, function(err, result) {
				if (result) {
					result = {
						code: 200,
						msg: '查询成功',
						data: result
					};
				}
				jsonWrite(res, result);
				connection.release();
			});
		});
	},
	addTeacher: function(req, res, next) {
			pool.getConnection(function(err, connection) {
				// 获取前台页面传过来的参数
				var param = req.query || req.params;
				var nickname = util.nicknameGenerator();

				// 建立连接，向表中插入值
				connection.query($sql.addTeacher, [param.tel, param.pass, nickname], function(err, result) {
					if (result) {
						result = {
							code: 200,
							msg: '增加成功'
						};
					}

					// 以json形式，把操作结果返回给前台页面
					jsonWrite(res, result);

					// 释放连接 
					connection.release();
				});
			});
		},
		login: function(req, res, next) {
			var param = req.query || req.params;
			pool.getConnection(function(err, connection) {
				connection.query($sql.login, [param.tel, param.pass], function(err, result) {
					if (result) {
						result = {
							code: 200,
							msg: '查询成功',
							data: result
						};
					}
					jsonWrite(res, result);
					connection.release();
				});
			});
		},
		creatRoom: function(req, res, next) {
			var param = req.query || req.params;
			pool.getConnection(function(err, connection) {
				var roomId = util.roomIdGenerator();
				var date = util.getDate();
				connection.query($sql.creatRoom, [roomId, param.tid, param.name, param.capacity, param.capacity, date], function(err, result) {
					if (result) {
						result = {
							code: 200,
							msg: '创建成功',
							data: result
						};
					}
					jsonWrite(res, result);
					connection.release();
				});
			});
		},
		queryRoom: function(req, res, next) {
			var param = req.query || req.params;
			pool.getConnection(function(err, connection) {
				connection.query($sql.queryRoom, [param.tid], function(err, result) {
					if (result) {
						result = {
							code: 200,
							msg: '查询成功',
							data: result
						};
					}
					jsonWrite(res, result);
					connection.release();
				});
			});
		},
		publishTask: function(req, res, next) {
			var param =req.body;
			pool.getConnection(function(err, connection) {
				var rno = '';
				connection.query($sql.queryRoomIdByTid, [param.tid], function(err, result) {		
					if(result[0]!=null){
						rno = result[0].rno;
						console.log('rno1 '+rno);						
						var tno = util.roomIdGenerator(); 	//任务编号
						var begin_time = util.getDate();
						var type = 'dictation';

						console.log(param.name+'  '+param.endtime);
					    connection.query($sql.addTask, [rno,tno,param.name,type,param.content,begin_time,param.endtime], function(err, result) {
							if(err){
								throw err;
							}else{
								if (result) {
									result = {
										code: 200,
										msg: '添加成功'
									};
								}
								jsonWrite(res, result);
								connection.release();
							}
						});
					}else{
						jsonWrite(res,{
							code: 1,
							msg: '请先创建教室!'
						});
						connection.release();
					}				
				});	


				// queryRoomIdByTid(param.tid);
				// var timer=setTimeout(function(){
				// 	console.log('rno2 '+global.rno);
				// 	if(global.rno==''){
				// 		jsonWrite(res, {
				// 			code: 1,
				// 			msg: '请先创建教室!'
				// 		});
				// 		connection.release();
				// 	}else{
				// 		var tno = util.roomIdGenerator(); 	//任务编号
				// 		var begin_time = util.getDate();
				// 		var type = 'dictation';

				// 	    connection.query($sql.addTask, [parseInt(global.rno),parseInt(tno),param.name,type,param.content,parseInt(param.score),begin_time,param.endtime], function(err, result) {
				// 			if (result) {
				// 				result = {
				// 					code: 200,
				// 					msg: '添加成功'
				// 				};
				// 			}
				// 			jsonWrite(res, result);
				// 			connection.release();
				// 			clearInterval(timer);
				// 		});

				// 	}

				// },500);
				
			});
		},
		queryRoomIdByTid: function(req,res,next) {	
			var param = req.query || req.params;
			pool.getConnection(function(err, connection) {		
				// 根据教师Id得到教室号
				connection.query($sql.queryRoomIdByTid, [param.tid], function(err, result) {			
					// if(result!=null&&result[0].rno!=null){
					// 	global.rno = result[0].rno;
					// }
					if (result) {
						result = {
							code: 200,
							msg: '查询成功',
							data: result
						};
					}
					jsonWrite(res, result);
					connection.release();			
				});		
			});	
	 	},
		queryTask: function(req,res,next) {	
			var param = req.query || req.params;
			pool.getConnection(function(err, connection) {	
			 	if(param.mon=='undefined'){
			 		connection.query($sql.queryTaskByTid, [param.tid], function(err, result) {		
			 			console.log('tid '+param.tid);
			 			if(err){
			 				throw err;
			 			}else{
			 				if (result) {
			 					result = {
			 						code: 200,
			 						msg: '查询成功',
			 						data: result
			 					};
			 				}
			 				jsonWrite(res, result);
			 				connection.release();
			 			}		

			 		});	
			 	}else{
			 		var mon = parseInt(param.mon);
			 		if(mon<10){
			 			mon='0'+mon;
			 		}
			 		mon='%/'+mon+'/%';
			 		connection.query($sql.queryTaskByTidAndMonth, [param.tid,mon], function(err, result) {		
			 			console.log('tid '+param.tid);
			 			if(err){
			 				throw err;
			 			}else{
			 				if (result) {
			 					result = {
			 						code: 200,
			 						msg: '查询成功',
			 						data: result
			 					};
			 				}
			 				jsonWrite(res, result);
			 				connection.release();
			 			}		

			 		});	
			 	}
				

			});	
	 	},
		queryTaskByDate: function(req, res, next) {
			var param = req.query || req.params;
			pool.getConnection(function(err, connection) {
				connection.query($sql.queryTaskByDate, [param.date], function(err, result) {
					if (result) {
						result = {
							code: 200,
							msg: '查询成功',
							data: result
						};
					}
					jsonWrite(res, result);
					connection.release();
				});
			});
		},
		queryTaskByTno: function(req, res, next) {
			var param = req.query || req.params;
			pool.getConnection(function(err, connection) {
				connection.query($sql.queryTaskByTno, [param.tno], function(err, result) {
					if (result) {
						result = {
							code: 200,
							msg: '查询成功',
							data: result
						};
					}
					jsonWrite(res, result);
					connection.release();
				});
			});
		},
		queryRankingList: function(req, res, next) {
			var param = req.query || req.params;

			var begin_time=util.getDate();
			if(param.type==1){
				console.log('day');
				console.log(begin_time);					
			}else if(param.type==2){
				console.log('week');
				begin_time= begin_time.split("/");
				begin_time[0]=parseInt(begin_time[0]);
				begin_time[1]=parseInt(begin_time[1]);
				begin_time[2]=parseInt(begin_time[2]);

				if(begin_time[2]>=8){
					begin_time[2]-=8;
				}else{
					if(begin_time[1]==1){							
						begin_time[0]-=1;
						begin_time[1]=12;
					}else{
						begin_time[1]-=1;
					}
					begin_time[2]=22;
				}
				begin_time=begin_time[0]+'/'+begin_time[1]+'/'+begin_time[2];

			}else if(param.type==3){
				console.log('month');
				
				begin_time= begin_time.split("/");
				begin_time[0]=parseInt(begin_time[0]);
				begin_time[1]=parseInt(begin_time[1]);

				if(begin_time[1]==1){
					begin_time[0]-=1;
					begin_time[1]=12;
				}else{
					begin_time[1]-=1;
				}					
				begin_time=begin_time[0]+'/'+begin_time[1]+'/'+begin_time[2];					
			}
			console.log(begin_time);

			pool.getConnection(function(err, connection) {
				connection.query($sql.queryRankingList, [begin_time ,param.tid], function(err, result) {
					if (result) {
						result = {
							code: 200,
							msg: '查询成功',
							data: result
						};
					}
					jsonWrite(res, result);
					connection.release();
				});

			});               
		},
		updatePersonInfo: function(req, res, next) {
			var param = req.body;
			pool.getConnection(function(err, connection) {
				connection.query($sql.updatePersonInfo, [param.nickname, param.tel, param.pass, param.sid], function(err, result) {
					if (result) {
						result = {
							code: 200,
							msg: '添加成功'
						};
					}
					jsonWrite(res, result);
					connection.release();
				});
			});               
		},
		queryAllStudents: function(req, res, next) {
			var param = req.query || req.params;
			pool.getConnection(function(err, connection) {
				connection.query($sql.queryAllStudents, [param.tid], function(err, result) {
					if (result) {
						result = {
							code: 200,
							msg: '查询成功',
							data: result
						};
					}
					jsonWrite(res, result);
					connection.release();
				});
			});               
		}
		

		// delete: function (req, res, next) {
		// 	// delete by Id
		// 	pool.getConnection(function(err, connection) {
		// 		var id = +req.query.id;
		// 		connection.query($sql.delete, id, function(err, result) {
		// 			if(result.affectedRows > 0) {
		// 				result = {
		// 					code: 200,
		// 					msg:'删除成功'
		// 				};
		// 			} else {
		// 				result = void 0;
		// 			}
		// 			jsonWrite(res, result);
		// 			connection.release();
		// 		});
		// 	});
		// },
		// update: function (req, res, next) {
		// 	// update by id
		// 	// 为了简单，要求同时传name和age两个参数
		// 	var param = req.body;
		// 	if(param.name == null || param.age == null || param.id == null) {
		// 		jsonWrite(res, undefined);
		// 		return;
		// 	}

	// 	pool.getConnection(function(err, connection) {
	// 		connection.query($sql.update, [param.name, param.age, +param.id], function(err, result) {
	// 			// 使用页面进行跳转提示
	// 			if(result.affectedRows > 0) {
	// 				res.render('suc', {
	// 					result: result
	// 				}); // 第二个参数可以直接在jade中使用
	// 			} else {
	// 				res.render('fail',  {
	// 					result: result
	// 				});
	// 			}

	// 			connection.release();
	// 		});
	// 	});

	// },
	// queryAll: function (req, res, next) {
	// 	pool.getConnection(function(err, connection) {
	// 		connection.query($sql.queryAll, function(err, result) {
	// 			jsonWrite(res, result);
	// 			connection.release();
	// 		});
	// 	});
	// }
};