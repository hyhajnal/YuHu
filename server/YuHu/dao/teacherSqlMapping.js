// CRUD SQL语句
var teacher = {
	queryByTel:'SELECT teacher.* FROM teacher WHERE tel = ?;',
	addTeacher:'INSERT INTO teacher(tel, pass ,nickname) VALUES(?,?,?);',
	login: 'SELECT COUNT(*) result FROM teacher WHERE tel =? AND pass=?;',
	creatRoom:'INSERT INTO room SET rno = ?, tid = ? ,NAME = ? ,capacity=? ,margin=? ,create_time=?',
	queryRoom: 'SELECT COUNT(*) result FROM room WHERE tid = ?',
	addTask:'INSERT INTO task(rno,tno,NAME,TYPE,content,begin_time,end_time) VALUES(?,?,?,?,?,?,?)',
	queryRoomIdByTid:'SELECT room.rno rno FROM room WHERE room.tid=?',
	queryTaskByTidAndMonth:'SELECT DISTINCT task.begin_time FROM task,teacher,room WHERE teacher.`id`=room.`tid` AND room.`rno`=task.`rno` AND teacher.`id`=? AND begin_time LIKE ? ORDER BY begin_time DESC LIMIT 0,10',
	queryTaskByTid:'SELECT task.begin_time,task.tno FROM task,teacher,room WHERE teacher.`id`=room.`tid` AND room.`rno`=task.`rno` AND teacher.`id`=? ORDER BY begin_time DESC LIMIT 0,10',
	queryTaskByTno:'SELECT t.name,t.end_time,t.totalnum,COUNT(*) num FROM stu_task INNER JOIN (SELECT task.*,COUNT(*) totalnum FROM task INNER JOIN stu_room WHERE task.`tno`=? AND task.`rno`=stu_room.`rno`) AS t ON stu_task.`tno`=t.`tno`',
	queryTaskByDate:'SELECT t.name,t.end_time,t.totalnum,COUNT(stu_task.`sid`) num FROM stu_task RIGHT JOIN (SELECT task.*,COUNT(*) totalnum FROM task INNER JOIN stu_room WHERE task.`begin_time`=? AND task.`rno`=stu_room.`rno` GROUP BY task.`tno`) AS t ON stu_task.`tno`=t.`tno` GROUP BY t.`tno`',
	queryRankingList:'SELECT r.id,r.nickname,r.avater,SUM(t.score) score FROM (SELECT stu_task.* FROM stu_task,task WHERE stu_task.`tno`=task.`tno` AND task.`begin_time`>=?) AS t RIGHT JOIN (SELECT student.* FROM student,stu_room WHERE student.`id`=stu_room.`sid` AND stu_room.`rno` IN (SELECT stu_room.`rno` rno FROM room WHERE room.`tid`=?))AS r ON t.sid=r.id GROUP BY r.id ORDER BY score DESC',
	updatePersonInfo:'UPDATE teacher SET teacher.`nickname`=?  , teacher.`tel`=?  , teacher.`pass`=?   WHERE teacher.`id`=?',
	queryAllStudents:'SELECT student.nickname FROM student,stu_room WHERE student.`id`=stu_room.`sid` AND stu_room.`rno` IN (SELECT room.`rno` FROM room WHERE room.`tid`=?)'
};
module.exports = teacher;

/*SELECT t.name,t.end_time,t.totalnum,COUNT(*) num FROM stu_task INNER JOIN
(SELECT task.*,COUNT(*) totalnum FROM task,stu_room WHERE task.`tno`=? AND task.`rno`=stu_room.`rno`)
AS t ON stu_task.`tno`=t.`tno`

SELECT t.name,t.end_time,t.totalnum,COUNT(stu_task.`sid`) num FROM stu_task RIGHT JOIN
(SELECT task.*,COUNT(*) totalnum FROM task,stu_room WHERE task.`begin_time`='2016/11/18' AND task.`rno`=stu_room.`rno`
GROUP BY task.`tno`)
AS t ON stu_task.`tno`=t.`tno` GROUP BY t.`tno`
*/
