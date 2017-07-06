// CRUD SQL语句
var student = {
	queryByTel:'SELECT student.* FROM student WHERE tel = ?;',
	addStudent:'INSERT INTO student(tel, pass,nickname) VALUES(?,?,?);',
	login: 'SELECT COUNT(*) result FROM student WHERE tel =? AND pass=?;',
	queryRoom:'SELECT COUNT(*) result FROM stu_room WHERE sid=?',
	addRoom:'INSERT INTO stu_room(sid,rno) VALUES(?,?);',
	queryRoomById:'SELECT COUNT(*) result FROM room WHERE room.rno=?',
	queryTaskBySidAndMonth:'SELECT DISTINCT task.begin_time FROM task,stu_room WHERE stu_room.`sid`=? AND stu_room.`rno`=task.`rno` AND task.begin_time LIKE ? ORDER BY begin_time DESC LIMIT 0,10',
	queryTaskBySid:'SELECT task.begin_time,task.tno FROM task,stu_room WHERE stu_room.`sid`=? AND stu_room.`rno`=task.`rno` ORDER BY begin_time DESC LIMIT 0,10',
	// queryTaskByDate:'SELECT DISTINCT task.* FROM task,stu_room WHERE stu_room.`sid`=? AND stu_room.`rno`=task.`rno` AND begin_time=?',
	queryTaskByDate:'SELECT t.name,t.end_time,t.tno,stu_task.score FROM stu_task RIGHT JOIN (SELECT task.* FROM  task INNER JOIN stu_room ON stu_room.`rno`=task.`rno` AND stu_room.`sid`=? AND task.`begin_time`=?) AS t ON stu_task.`tno`= t.`tno` AND stu_task.`sid`=?',
	queryTaskByTno:'SELECT t.name,t.tno,t.end_time,stu_task.score FROM stu_task RIGHT JOIN (SELECT task.* FROM task WHERE task.`tno`=?) AS t ON stu_task.tno=t.tno AND stu_task.`sid`=?',
	queryTaskContentByTno:'SELECT task.content content FROM task WHERE tno=?',
	addStuTask:'INSERT INTO stu_task(sid, tno, score ,detail) VALUES(?,?,?,?);',
	queryCommentsByTno:'SELECT stu_task.`comment` comments FROM stu_task WHERE stu_task.`tno`=?',
	postComments:'UPDATE stu_task SET stu_task.`comment`=? WHERE stu_task.`tno`=? AND stu_task.`sid`=?;',
	queryDetailBySid:'SELECT stu_task.`detail` content FROM stu_task WHERE stu_task.sid=? LIMIT 0,6',
	queryAllDetailBySid:'SELECT stu_task.`detail` FROM stu_task WHERE stu_task.sid=? LIMIT 0,6',
	// queryRankingDailyList:'SELECT student.*,sum(stu_task.`score`) FROM student,stu_task,stu_room,task where stu_room.`sid`=? and stu_room.`rno`= task.`rno` and task.`tno`=stu_task.`tno` and student.`id`=stu_task.`sid` GROUP BY student.`id`',
	// queryRankingWeeklyList:'SELECT student.*,SUM(stu_task.`score`) FROM student,stu_task,stu_room,task WHERE stu_room.`sid`=8 AND stu_room.`rno`= task.`rno` AND task.`tno`=stu_task.`tno` AND student.`id`=stu_task.`sid` AND task.`begin_time`> ? GROUP BY student.`id`',
	// queryRankingMonthlyList:'SELECT student.*,SUM(stu_task.`score`) FROM student,stu_task,stu_room,task WHERE stu_room.`sid`=8 AND stu_room.`rno`= task.`rno` AND task.`tno`=stu_task.`tno` AND student.`id`=stu_task.`sid` AND task.`begin_time`> ? GROUP BY student.`id`',
	queryRankingList:'SELECT r.id,r.nickname,r.avater,SUM(t.score) score FROM (SELECT stu_task.* FROM stu_task,task WHERE stu_task.`tno`=task.`tno` AND task.`begin_time`>=?) AS t RIGHT JOIN (SELECT student.* FROM student,stu_room WHERE student.`id`=stu_room.`sid` AND stu_room.`rno` IN (SELECT stu_room.`rno` rno FROM stu_room WHERE stu_room.`sid`=?))AS r ON t.sid=r.id GROUP BY r.id ORDER BY score DESC',
	updatePersonInfo:'UPDATE student SET student.`nickname`=? , student.`tel`=? , student.`pass`=? WHERE student.`id`=?',
	queryAllStudents:'SELECT student.nickname FROM student,stu_room WHERE student.`id`=stu_room.`sid` AND stu_room.`rno` IN (SELECT stu_room.`rno` FROM stu_room WHERE stu_room.`sid`=?)'
	
};
module.exports = student;



/*
queryRankingList
版本1：没有日期控制
SELECT r.nickname NAME,r.avater,SUM(stu_task.`score`) score FROM stu_task RIGHT JOIN
(SELECT student.* FROM student,stu_room WHERE student.`id`=stu_room.`sid` AND stu_room.`rno` IN
(SELECT stu_room.`rno` rno FROM stu_room WHERE stu_room.`sid`='8'))AS r ON
stu_task.`sid`=r.id GROUP BY r.id
版本2：加上日期控制
SELECT r.id,r.nickname NAME,r.avater,SUM(t.score) score FROM 
(SELECT stu_task.* FROM stu_task,task WHERE stu_task.`tno`=task.`tno` AND task.`begin_time`>=?) 
AS t
RIGHT JOIN
(SELECT student.* FROM student,stu_room WHERE student.`id`=stu_room.`sid` AND stu_room.`rno` IN
(SELECT stu_room.`rno` rno FROM stu_room WHERE stu_room.`sid`=?))AS r ON
t.sid=r.id GROUP BY r.id ORDER BY score DESC
*/