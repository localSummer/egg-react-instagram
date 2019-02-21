/*
 Navicat Premium Data Transfer

 Source Server         : egg-sequelize
 Source Server Type    : MySQL
 Source Server Version : 80013
 Source Host           : localhost:3306
 Source Schema         : learn

 Target Server Type    : MySQL
 Target Server Version : 80013
 File Encoding         : 65001

 Date: 21/02/2019 20:36:47
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for discuss
-- ----------------------------
DROP TABLE IF EXISTS `discuss`;
CREATE TABLE `discuss` (
  `discussId` int(10) NOT NULL AUTO_INCREMENT,
  `topicId` int(10) DEFAULT NULL,
  `userId` varchar(255) DEFAULT NULL,
  `replyName` varchar(1000) NOT NULL,
  `replyContent` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`discussId`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of discuss
-- ----------------------------
BEGIN;
INSERT INTO `discuss` VALUES (1, 1, 'd2abd65ded764da2b7708a2ac0ee61f5', 'test', '抢沙发！', '2019-02-15 07:05:58', '2019-02-15 07:05:58');
INSERT INTO `discuss` VALUES (2, 6, '0659892c1f7b43d6aee3b175ecdbf122', 'admin', 'test', '2019-02-19 03:36:32', '2019-02-19 03:36:32');
INSERT INTO `discuss` VALUES (3, 6, '0659892c1f7b43d6aee3b175ecdbf122', 'admin', 'test3', '2019-02-19 03:38:07', '2019-02-19 03:38:07');
INSERT INTO `discuss` VALUES (4, 6, '0659892c1f7b43d6aee3b175ecdbf122', 'admin', 'test4', '2019-02-19 03:38:13', '2019-02-19 03:38:13');
INSERT INTO `discuss` VALUES (5, 6, '0659892c1f7b43d6aee3b175ecdbf122', 'admin', 'test5', '2019-02-19 03:38:15', '2019-02-19 03:38:15');
INSERT INTO `discuss` VALUES (6, 6, '0659892c1f7b43d6aee3b175ecdbf122', 'admin', 'test6', '2019-02-19 06:09:07', '2019-02-19 06:09:07');
INSERT INTO `discuss` VALUES (7, 5, '0659892c1f7b43d6aee3b175ecdbf122', 'admin', 'test', '2019-02-19 09:14:10', '2019-02-19 09:14:10');
COMMIT;

-- ----------------------------
-- Table structure for follow
-- ----------------------------
DROP TABLE IF EXISTS `follow`;
CREATE TABLE `follow` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `userId` varchar(255) DEFAULT NULL,
  `followedId` varchar(255) DEFAULT NULL,
  `status` int(1) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of follow
-- ----------------------------
BEGIN;
INSERT INTO `follow` VALUES (1, 'd2abd65ded764da2b7708a2ac0ee61f5', '0659892c1f7b43d6aee3b175ecdbf122', 0, '2019-02-15 09:05:06', '2019-02-19 02:32:27');
COMMIT;

-- ----------------------------
-- Table structure for SequelizeMeta
-- ----------------------------
DROP TABLE IF EXISTS `SequelizeMeta`;
CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of SequelizeMeta
-- ----------------------------
BEGIN;
INSERT INTO `SequelizeMeta` VALUES ('20190209042538-create-users.js');
INSERT INTO `SequelizeMeta` VALUES ('20190214084335-create-follow.js');
INSERT INTO `SequelizeMeta` VALUES ('20190214090117-create-topic.js');
INSERT INTO `SequelizeMeta` VALUES ('20190214091011-create-topic-like.js');
INSERT INTO `SequelizeMeta` VALUES ('20190214091629-create-discuss.js');
INSERT INTO `SequelizeMeta` VALUES ('20190220063005-add-website-to-users.js');
INSERT INTO `SequelizeMeta` VALUES ('20190221031041-add-passport-github-to-users.js');
INSERT INTO `SequelizeMeta` VALUES ('20190221065120-add-third-password-update-status-to-users.js');
INSERT INTO `SequelizeMeta` VALUES ('20190221105125-create-topic-collect.js');
COMMIT;

-- ----------------------------
-- Table structure for topic
-- ----------------------------
DROP TABLE IF EXISTS `topic`;
CREATE TABLE `topic` (
  `topicId` int(10) NOT NULL AUTO_INCREMENT,
  `userId` varchar(255) DEFAULT NULL,
  `topicTitle` varchar(255) DEFAULT NULL,
  `topicImg` varchar(1000) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`topicId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of topic
-- ----------------------------
BEGIN;
INSERT INTO `topic` VALUES (1, 'd2abd65ded764da2b7708a2ac0ee61f5', '逃跑地球', '[\"https://upload-images.jianshu.io/upload_images/13627619-f5f2bc5b0ed46cd5?imageMogr2/auto-orient/strip|imageView2/1/w/360/h/240\",\"https://upload-images.jianshu.io/upload_images/4041783-9dbf100ecb27e40a.JPG?imageMogr2/auto-orient/strip|imageView2/1/w/360/h/240\"]', '北京', '2019-02-15 06:23:47', '2019-02-15 06:23:47');
INSERT INTO `topic` VALUES (2, 'd2abd65ded764da2b7708a2ac0ee61f5', '玩笑风声', '[\"https://upload-images.jianshu.io/upload_images/6126137-841565b309f3af40?imageMogr2/auto-orient/strip|imageView2/1/w/360/h/240\",\"https://upload-images.jianshu.io/upload_images/1439852-bd5693f4f0591331?imageMogr2/auto-orient/strip|imageView2/1/w/360/h/240\"]', NULL, '2019-02-15 06:24:55', '2019-02-15 06:24:55');
INSERT INTO `topic` VALUES (4, '0659892c1f7b43d6aee3b175ecdbf122', '变形记', '[\"https://upload-images.jianshu.io/upload_images/15161761-65631369e4a56826.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/500/format/webp\",\"https://upload-images.jianshu.io/upload_images/14713612-61ac5d084ddd02b3.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/750/format/webp\"]', '天津', '2019-02-18 07:44:59', '2019-02-18 07:44:59');
INSERT INTO `topic` VALUES (5, '0659892c1f7b43d6aee3b175ecdbf122', '上传头像', '[\"http://pn49pgf9r.bkt.clouddn.com/1550489813000-avator.jpeg\"]', NULL, '2019-02-18 11:37:24', '2019-02-18 11:37:24');
INSERT INTO `topic` VALUES (6, '0659892c1f7b43d6aee3b175ecdbf122', '上传网络图片', '[\"http://images.china.cn/attachement/jpg/site1000/20150120/001fd04ceb6416285d1f61.jpg\"]', NULL, '2019-02-18 11:41:40', '2019-02-18 11:41:40');
COMMIT;

-- ----------------------------
-- Table structure for topic-collect
-- ----------------------------
DROP TABLE IF EXISTS `topic-collect`;
CREATE TABLE `topic-collect` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `topicId` int(10) DEFAULT NULL,
  `userId` varchar(255) DEFAULT NULL,
  `status` int(1) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of topic-collect
-- ----------------------------
BEGIN;
INSERT INTO `topic-collect` VALUES (1, 6, '0659892c1f7b43d6aee3b175ecdbf122', 0, '2019-02-21 11:41:23', '2019-02-21 12:34:18');
INSERT INTO `topic-collect` VALUES (2, 5, '0659892c1f7b43d6aee3b175ecdbf122', 1, '2019-02-21 11:43:42', '2019-02-21 11:43:42');
COMMIT;

-- ----------------------------
-- Table structure for topic-like
-- ----------------------------
DROP TABLE IF EXISTS `topic-like`;
CREATE TABLE `topic-like` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `topicId` int(10) DEFAULT NULL,
  `userId` varchar(255) DEFAULT NULL,
  `status` int(1) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of topic-like
-- ----------------------------
BEGIN;
INSERT INTO `topic-like` VALUES (1, 1, 'd2abd65ded764da2b7708a2ac0ee61f5', 1, '2019-02-15 07:58:42', '2019-02-15 08:00:24');
INSERT INTO `topic-like` VALUES (3, 4, '0659892c1f7b43d6aee3b175ecdbf122', 0, '2019-02-19 02:24:15', '2019-02-19 02:24:20');
INSERT INTO `topic-like` VALUES (4, 6, '0659892c1f7b43d6aee3b175ecdbf122', 1, '2019-02-19 03:22:03', '2019-02-19 03:23:41');
INSERT INTO `topic-like` VALUES (5, 5, '0659892c1f7b43d6aee3b175ecdbf122', 1, '2019-02-19 03:24:08', '2019-02-19 09:14:03');
COMMIT;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `avatarUrl` varchar(255) DEFAULT NULL,
  `mobile` varchar(32) DEFAULT NULL,
  `prefix` varchar(32) DEFAULT NULL,
  `abstract` varchar(255) DEFAULT NULL,
  `sex` int(11) DEFAULT '0',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `provider` varchar(255) DEFAULT NULL,
  `uid` varchar(255) DEFAULT NULL,
  `thirdPassUpdateStatus` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of users
-- ----------------------------
BEGIN;
INSERT INTO `users` VALUES (2, 'd2abd65ded764da2b7708a2ac0ee61f5', 'test', 'test1234@qq.com', '81a2d0b3b504b2e3688641a64a083e1b50a6cf5919cd28f46fb2cc34e0417df0', 'https://s11.mogucdn.com/mlcdn/c45406/181105_60bdj928jdhjg9ehhg58hje1212ek_640x640.jpg', NULL, NULL, NULL, 0, '2019-02-10 01:57:00', '2019-02-16 08:04:13', NULL, NULL, NULL, NULL);
INSERT INTO `users` VALUES (3, '1d3ac38efad34201b100e9c60aefeedb', 'test1', '200@qq.com', '00a32a63ff410886c42358ad68f4ada498a45ee37f27bf08cf4e339a8b64d410', 'https://s11.mogucdn.com/mlcdn/c45406/181105_60bdj928jdhjg9ehhg58hje1212ek_640x640.jpg', NULL, NULL, NULL, 0, '2019-02-10 04:31:30', '2019-02-10 04:31:30', NULL, NULL, NULL, NULL);
INSERT INTO `users` VALUES (4, '3bf02a5dac384b2d939b0b1c3b03c665', 'test123', 'test123@qq.com', 'aa44e50b3c2dbc66bd1c5fd15da36dfc58f31531c8d62e7f311bd8b61b7b208c', 'https://s11.mogucdn.com/mlcdn/c45406/181105_60bdj928jdhjg9ehhg58hje1212ek_640x640.jpg', NULL, NULL, NULL, 0, '2019-02-11 05:09:52', '2019-02-11 05:09:52', NULL, NULL, NULL, NULL);
INSERT INTO `users` VALUES (5, 'ce29285056fa48bbb7765ed31fa2f5b8', 'test2', '123@qq.com', 'fbb17bc82d18e51308ecc8dcaef7271ad00dd0612c8d3af0fc559e21364962ac', 'https://s11.mogucdn.com/mlcdn/c45406/181105_60bdj928jdhjg9ehhg58hje1212ek_640x640.jpg', NULL, NULL, NULL, 0, '2019-02-11 08:29:21', '2019-02-11 08:29:21', NULL, NULL, NULL, NULL);
INSERT INTO `users` VALUES (6, '0659892c1f7b43d6aee3b175ecdbf122', 'admin', 'admin@qq.com', '81a2d0b3b504b2e3688641a64a083e1b50a6cf5919cd28f46fb2cc34e0417df0', 'http://pn49pgf9r.bkt.clouddn.com/1550646560016-avator.jpeg', '18502609090', '86', 'coding man...', 0, '2019-02-11 09:10:36', '2019-02-20 07:11:49', 'www.baidu.com', NULL, NULL, NULL);
INSERT INTO `users` VALUES (7, '9d12cc97a73f4ffe96f579c0ba8a2751', 'test3', 'test@qq.com', '1db65749a494b60fcaebcfd423f36061ccd3e12855f6f8b1a1b0a553a3f9e5ec', 'https://s11.mogucdn.com/mlcdn/c45406/181105_60bdj928jdhjg9ehhg58hje1212ek_640x640.jpg', NULL, NULL, NULL, 0, '2019-02-11 09:13:21', '2019-02-11 09:13:21', NULL, NULL, NULL, NULL);
INSERT INTO `users` VALUES (12, 'dea7750de34d4cabb00bee61363040da', 'localSummer', 'roamingcode@163.com', '8d2765c38d4ee2f79abc3225efc9d781fffc2e57e2b675c8a6b317ad8295e672', 'https://avatars3.githubusercontent.com/u/16829323?v=4', NULL, NULL, 'Learning and learning', 0, '2019-02-21 07:09:30', '2019-02-21 10:02:45', NULL, 'github', '16829323', 1);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
