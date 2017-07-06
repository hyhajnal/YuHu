/*
SQLyog v10.2 
MySQL - 5.7.3-m13-log : Database - yuhu
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`yuhu` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `yuhu`;

/*Table structure for table `room` */

DROP TABLE IF EXISTS `room`;

CREATE TABLE `room` (
  `rno` int(8) NOT NULL AUTO_INCREMENT,
  `tid` int(8) NOT NULL,
  `name` varchar(40) NOT NULL,
  `capacity` int(3) NOT NULL,
  `margin` int(3) NOT NULL,
  `create_time` varchar(10) NOT NULL,
  PRIMARY KEY (`rno`),
  KEY `FK_TID` (`tid`),
  CONSTRAINT `FK_TID` FOREIGN KEY (`tid`) REFERENCES `teacher` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=67561406 DEFAULT CHARSET=utf8;

/*Data for the table `room` */

insert  into `room`(`rno`,`tid`,`name`,`capacity`,`margin`,`create_time`) values (5390658,22,'chen的教室',54,54,'2016/11/22'),(7094581,21,'huang的教室',54,54,'2016/11/22'),(37285485,24,'我的教室',40,40,'2016/11/24'),(52471866,20,'容么么的教室',59,59,'2016/11/22');

/*Table structure for table `stu_room` */

DROP TABLE IF EXISTS `stu_room`;

CREATE TABLE `stu_room` (
  `sid` int(8) NOT NULL,
  `rno` int(8) NOT NULL,
  PRIMARY KEY (`sid`,`rno`),
  KEY `FK_RNO` (`rno`),
  CONSTRAINT `FK_RNO` FOREIGN KEY (`rno`) REFERENCES `room` (`rno`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_SID` FOREIGN KEY (`sid`) REFERENCES `student` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `stu_room` */

insert  into `stu_room`(`sid`,`rno`) values (17,5390658),(19,37285485),(12,52471866),(13,52471866),(16,52471866);

/*Table structure for table `stu_task` */

DROP TABLE IF EXISTS `stu_task`;

CREATE TABLE `stu_task` (
  `sid` int(8) NOT NULL COMMENT '学生ID',
  `tno` int(8) NOT NULL COMMENT '任务编号',
  `score` int(3) NOT NULL,
  `detail` text COMMENT '错误',
  `comment` text COMMENT '评论',
  PRIMARY KEY (`sid`,`tno`),
  KEY `FK_TNO` (`tno`),
  CONSTRAINT `FK_SID_1` FOREIGN KEY (`sid`) REFERENCES `student` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_TNO` FOREIGN KEY (`tno`) REFERENCES `task` (`tno`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `stu_task` */

insert  into `stu_task`(`sid`,`tno`,`score`,`detail`,`comment`) values (19,28528645,10,'坑死你:描述,词语听写:描述7',NULL),(19,35192549,0,'同步:。。',NULL),(19,59378531,5,'',NULL),(19,68360582,0,'ly:hj',NULL),(19,74434508,5,'卢浮宫:gghj,陈国华和:vv黑镜舅舅家',NULL),(19,91576903,15,'',NULL);

/*Table structure for table `student` */

DROP TABLE IF EXISTS `student`;

CREATE TABLE `student` (
  `id` int(8) NOT NULL AUTO_INCREMENT COMMENT '无实际含义',
  `tel` varchar(11) NOT NULL COMMENT '账号',
  `pass` varchar(16) NOT NULL,
  `email` varchar(40) DEFAULT NULL COMMENT '不可重复',
  `nickname` varchar(40) DEFAULT NULL COMMENT '不可重复',
  `avater` varchar(40) DEFAULT NULL,
  `sex` varchar(2) DEFAULT NULL,
  `locate` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

/*Data for the table `student` */

insert  into `student`(`id`,`tel`,`pass`,`email`,`nickname`,`avater`,`sex`,`locate`) values (12,'15757405466','1',NULL,'bm8mbfb2',NULL,NULL,NULL),(13,'13454678901','xs1',NULL,'8blf6fda',NULL,NULL,NULL),(16,'17826858536','1',NULL,'bemnmmna',NULL,NULL,NULL),(17,'15858122993','1',NULL,'l7kbckbc',NULL,NULL,NULL),(19,'13606611050','1',NULL,'7d494k76',NULL,NULL,NULL);

/*Table structure for table `task` */

DROP TABLE IF EXISTS `task`;

CREATE TABLE `task` (
  `rno` int(8) NOT NULL COMMENT '教室编号',
  `tno` int(8) NOT NULL COMMENT '任务编号',
  `name` varchar(100) NOT NULL,
  `type` varchar(10) NOT NULL,
  `content` text NOT NULL,
  `score` int(3) DEFAULT NULL,
  `begin_time` varchar(10) NOT NULL,
  `end_time` varchar(10) NOT NULL,
  PRIMARY KEY (`tno`),
  KEY `FK_RNO_1` (`rno`),
  CONSTRAINT `FK_RNO_1` FOREIGN KEY (`rno`) REFERENCES `room` (`rno`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `task` */

insert  into `task`(`rno`,`tno`,`name`,`type`,`content`,`score`,`begin_time`,`end_time`) values (37285485,17073444,'测试','dictation','肯空:回家后 看图:与',NULL,'2016/11/24','2016/11/11'),(37285485,28528645,'听写','dictation','语文:描述 英语:描述2 坑死你:描述 词语听写:描述7',NULL,'2016/11/24','2016/12/5'),(37285485,35192549,'仅供测试','dictation','同步:。。',NULL,'2016/11/24','2016/11/30'),(37285485,59378531,'听写任务','dictation','你好:提示',NULL,'2016/11/24','2016/12/1'),(37285485,68360582,'测试','dictation','ly:hj',NULL,'2016/11/24','2016/12/11'),(37285485,74434508,'发给混合','dictation','卢浮宫:gghj 陈国华和:vv黑镜舅舅家 谷歌混合:根本不那就',NULL,'2016/11/24','2016/12/3'),(37285485,91576903,'听写3','dictation','语文:描述1 高等数学:描述2 金灿灿:描述3',NULL,'2016/11/24','2016/12/5');

/*Table structure for table `teacher` */

DROP TABLE IF EXISTS `teacher`;

CREATE TABLE `teacher` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `tel` varchar(11) NOT NULL COMMENT '账号',
  `pass` varchar(16) NOT NULL,
  `email` varchar(40) DEFAULT NULL,
  `nickname` varchar(40) DEFAULT NULL,
  `avater` varchar(40) DEFAULT NULL,
  `sex` varchar(2) DEFAULT NULL,
  `locate` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;

/*Data for the table `teacher` */

insert  into `teacher`(`id`,`tel`,`pass`,`email`,`nickname`,`avater`,`sex`,`locate`) values (20,'15858117922','xue',NULL,'e2l26bec',NULL,NULL,NULL),(21,'15858122993','huang',NULL,'dml2kd47',NULL,NULL,NULL),(22,'17826856341','chen',NULL,'4dm2fabb',NULL,NULL,NULL),(24,'13606611050','1',NULL,'fcbd8796',NULL,NULL,NULL);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
