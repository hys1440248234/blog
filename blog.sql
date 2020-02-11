/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 50645
 Source Host           : localhost:3306
 Source Schema         : blog

 Target Server Type    : MySQL
 Target Server Version : 50645
 File Encoding         : 65001

 Date: 29/01/2020 13:11:17
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for blog_article
-- ----------------------------
DROP TABLE IF EXISTS `blog_article`;
CREATE TABLE `blog_article`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '文章id',
  `title` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '文章标题',
  `summary` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '文章摘要',
  `content_text` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '文章内容 纯文本',
  `content` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '文章内容 html',
  `image_url` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '文章内容 html',
  `view` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '文章查看次数',
  `like` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '文章喜欢次数',
  `create_time` datetime(0) NOT NULL COMMENT '文章创建时间',
  `update_time` datetime(0) NOT NULL COMMENT '文章更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '文章表' ROW_FORMAT = Compact;

-- ----------------------------
-- Records of blog_article
-- ----------------------------
INSERT INTO `blog_article` VALUES (1, '更新后的标题2', '近在写毕业设计，使用 Vue、Mysql、Egg 搭建一个 PWA 化的个人博客, 记录一下遇到的问题以及解决方案', '文章内容...', '<p>文章内容 html...</p>', 'https://static001.infoq.cn/resource/image/ba/3a/baf44b0adb3d6b693ff29b5ba253203a.jpg?x-oss-process=image/crop,y_125,w_6719,h_3778/resize,w_416,h_234', 1, 0, '2019-11-17 05:18:40', '2020-01-29 12:56:33');
INSERT INTO `blog_article` VALUES (2, '日常学习计划', '记录自己的生活和学习的规划', '规划内容...', '<p>规划内容 html...</p>', 'https://static001.infoq.cn/resource/image/ba/3a/baf44b0adb3d6b693ff29b5ba253203a.jpg?x-oss-process=image/crop,y_125,w_6719,h_3778/resize,w_416,h_234', 3, 2, '2019-11-17 16:11:11', '2020-01-29 12:57:06');

-- ----------------------------
-- Table structure for blog_article_tag
-- ----------------------------
DROP TABLE IF EXISTS `blog_article_tag`;
CREATE TABLE `blog_article_tag`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'id',
  `tag_id` int(10) UNSIGNED NOT NULL COMMENT '标签id',
  `article_id` int(10) UNSIGNED NOT NULL COMMENT '文章id',
  `create_time` datetime(0) NOT NULL COMMENT '创建时间',
  `update_time` datetime(0) NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_map_article_id`(`article_id`) USING BTREE,
  INDEX `fk_map_tag_id`(`tag_id`) USING BTREE,
  CONSTRAINT `fk_map_article_id` FOREIGN KEY (`article_id`) REFERENCES `blog_article` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_map_tag_id` FOREIGN KEY (`tag_id`) REFERENCES `blog_tag` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '文章标签映射表' ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for blog_tag
-- ----------------------------
DROP TABLE IF EXISTS `blog_tag`;
CREATE TABLE `blog_tag`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '标签id',
  `name` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '标签名',
  `alias` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '别名',
  `create_time` datetime(0) NOT NULL COMMENT '标签创建时间',
  `update_time` datetime(0) NOT NULL COMMENT '标签更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `name`(`name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '标签表' ROW_FORMAT = Compact;

-- ----------------------------
-- Records of blog_tag
-- ----------------------------
INSERT INTO `blog_tag` VALUES (1, 'java', 'Java', '2019-11-17 05:18:40', '2019-11-21 19:54:52');
INSERT INTO `blog_tag` VALUES (2, 'Android', 'Android', '2019-11-17 05:18:40', '2019-11-17 05:18:40');
INSERT INTO `blog_tag` VALUES (3, 'Golang', 'Golang', '2019-11-17 05:18:40', '2019-11-17 05:18:40');
INSERT INTO `blog_tag` VALUES (4, 'Python', 'Python', '2019-11-17 05:18:40', '2019-11-17 05:18:40');
INSERT INTO `blog_tag` VALUES (5, 'DevOps', 'DevOps', '2019-11-17 05:18:40', '2019-11-17 05:18:40');
INSERT INTO `blog_tag` VALUES (6, '人工智能', 'AI', '2019-11-17 05:18:40', '2019-11-17 05:18:40');
INSERT INTO `blog_tag` VALUES (7, '前端', 'frontend', '2019-11-17 05:18:40', '2019-11-17 05:18:40');
INSERT INTO `blog_tag` VALUES (8, '数据库', 'database', '2019-11-17 05:18:40', '2019-11-17 05:18:40');
INSERT INTO `blog_tag` VALUES (9, '区块链', 'blockchain', '2019-11-17 05:18:40', '2019-11-17 05:18:40');
INSERT INTO `blog_tag` VALUES (10, '云原生', 'CloudNative', '2019-11-17 05:18:40', '2019-11-17 05:18:40');
INSERT INTO `blog_tag` VALUES (11, '运维', 'operation', '2019-11-17 05:18:40', '2019-11-17 05:18:40');
INSERT INTO `blog_tag` VALUES (12, '安全', 'security', '2019-11-17 05:18:40', '2019-11-17 05:18:40');
INSERT INTO `blog_tag` VALUES (13, '数学', 'mathematics', '2019-11-17 05:18:40', '2019-11-17 05:18:40');
INSERT INTO `blog_tag` VALUES (14, '容器', 'vessel', '2019-11-17 05:18:40', '2019-11-17 05:18:40');
INSERT INTO `blog_tag` VALUES (15, '大数据', 'BigData', '2019-11-21 19:42:16', '2019-11-21 19:42:19');

-- ----------------------------
-- Table structure for blog_user
-- ----------------------------
DROP TABLE IF EXISTS `blog_user`;
CREATE TABLE `blog_user`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '用户 id',
  `username` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '昵称',
  `age` int(10) UNSIGNED NULL DEFAULT NULL COMMENT '年龄',
  `password` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '密码',
  `roles` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'admin' COMMENT '权限',
  `avatar` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif' COMMENT '用户头像url',
  `create_time` datetime(0) NOT NULL COMMENT '用户创建时间',
  `update_time` datetime(0) NOT NULL COMMENT '用户更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '用户表' ROW_FORMAT = Compact;

-- ----------------------------
-- Records of blog_user
-- ----------------------------
INSERT INTO `blog_user` VALUES (1, 'admin', 12, 'admin', 'admin', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif', '2019-11-17 05:18:40', '2019-11-17 05:18:40');

SET FOREIGN_KEY_CHECKS = 1;
