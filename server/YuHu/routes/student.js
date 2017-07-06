var express = require('express');
var router = express.Router();
var studentDao = require('../dao/studentDao');

// 增加用户
router.get('/checkTel', function(req, res, next) {
	studentDao.queryByTel(req, res, next);
});
router.get('/add', function(req, res, next) {
	studentDao.addStudent(req, res, next);
});
router.get('/login', function(req, res, next) {
	studentDao.login(req, res, next);
});
router.get('/queryRoom', function(req, res, next) {
	studentDao.queryRoom(req, res, next);
});
router.get('/addRoom', function(req, res, next) {
	studentDao.addRoom(req, res, next);
});
router.get('/queryRoomById', function(req, res, next) {
	studentDao.queryRoomById(req, res, next);
});
router.get('/queryTask', function(req, res, next) {
	studentDao.queryTask(req, res, next);
});
router.get('/queryTaskByDate', function(req, res, next) {
	studentDao.queryTaskByDate(req, res, next);
});
router.get('/queryTaskByTno', function(req, res, next) {
	studentDao.queryTaskByTno(req, res, next);
});
router.get('/queryTaskContentByTno', function(req, res, next) {
	studentDao.queryTaskContentByTno(req, res, next);
});
router.post('/addStuTask', function(req, res, next) {
	studentDao.addStuTask(req, res, next);
});
router.get('/queryRankingList', function(req, res, next) {
	studentDao.queryRankingList(req, res, next);
});
router.get('/queryComments', function(req, res, next) {
	studentDao.queryCommentsByTno(req, res, next);
});
router.post('/postComments', function(req, res, next) {
	studentDao.postComments(req, res, next);
});
router.get('/review', function(req, res, next) {
	studentDao.review(req, res, next);
});
router.get('/queryAllDetails', function(req, res, next) {
	studentDao.queryAllDetails(req, res, next);
});
router.get('/queryError', function(req, res, next) {
	studentDao.queryError(req, res, next);
});
router.post('/updatePersonInfo', function(req, res, next) {
	studentDao.updatePersonInfo(req, res, next);
});
router.get('/queryAllStudents', function(req, res, next) {
	studentDao.queryAllStudents(req, res, next);
});
// router.get('/deleteStudent', function(req, res, next) {
// 	studentDao.delete(req, res, next);
// });
// router.get('/updateStudent', function(req, res, next) {
// 	studentDao.update(req, res, next);
// });
// router.get('/queryById', function(req, res, next) {
// 	studentDao.queryById(req, res, next);
// });
// router.get('/queryAll', function(req, res, next) {
// 	studentDao.queryAll(req, res, next);
// });
module.exports = router;

