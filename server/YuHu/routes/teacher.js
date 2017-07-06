var express = require('express');
var router = express.Router();
var teacherDao = require('../dao/teacherDao');

// 增加用户
router.get('/checkTel', function(req, res, next) {
	teacherDao.queryByTel(req, res, next);
});
router.get('/add', function(req, res, next) {
	teacherDao.addTeacher(req, res, next);
});
router.get('/login', function(req, res, next) {
	teacherDao.login(req, res, next);
});
router.get('/creatRoom', function(req, res, next) {
	teacherDao.creatRoom(req, res, next);
});
router.get('/queryRoom', function(req, res, next) {
	teacherDao.queryRoom(req, res, next);
});
router.post('/publishTask', function(req, res, next) {
	teacherDao.publishTask(req, res, next);
});
router.get('/queryRoomIdByTid', function(req, res, next) {
	teacherDao.queryRoomIdByTid(req, res, next);
});
router.get('/queryTask', function(req, res, next) {
	teacherDao.queryTask(req, res, next);
});
router.get('/queryTaskByDate', function(req, res, next) {
	teacherDao.queryTaskByDate(req, res, next);
});
router.get('/queryTaskByTno', function(req, res, next) {
	teacherDao.queryTaskByTno(req, res, next);
});
router.get('/queryRankingList', function(req, res, next) {
	teacherDao.queryRankingList(req, res, next);
});
router.post('/updatePersonInfo', function(req, res, next) {
	teacherDao.updatePersonInfo(req, res, next);
});
router.get('/queryAllStudents', function(req, res, next) {
	teacherDao.queryAllStudents(req, res, next);
});
// router.get('/deleteteacher', function(req, res, next) {
// 	teacherDao.delete(req, res, next);
// });
// router.get('/updateteacher', function(req, res, next) {
// 	teacherDao.update(req, res, next);
// });
// router.get('/queryById', function(req, res, next) {
// 	teacherDao.queryById(req, res, next);
// });
// router.get('/queryAll', function(req, res, next) {
// 	teacherDao.queryAll(req, res, next);
// });
module.exports = router;
