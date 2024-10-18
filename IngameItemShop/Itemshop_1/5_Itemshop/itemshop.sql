/*
Navicat MySQL Data Transfer

Source Server         : DEV
Source Server Version : 50649
Source Host           : 89.163.131.81:3306
Source Database       : player

Target Server Type    : MYSQL
Target Server Version : 50649
File Encoding         : 65001

Date: 2020-12-05 22:21:20
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `itemshop`
-- ----------------------------
DROP TABLE IF EXISTS `itemshop`;
CREATE TABLE `itemshop` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `vnum` int(255) NOT NULL,
  `socket0` int(255) NOT NULL,
  `socket1` int(255) NOT NULL,
  `socket2` int(255) NOT NULL,
  `socket3` int(255) DEFAULT NULL,
  `coins` int(255) NOT NULL,
  `category` int(255) NOT NULL,
  `limited` int(1) NOT NULL DEFAULT '0',
  `limitedTime` datetime NOT NULL DEFAULT '2050-09-26 14:28:42',
  `limitedCount` int(255) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=95 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of itemshop
-- ----------------------------
INSERT INTO `itemshop` VALUES ('1', '19', '0', '0', '0', '0', '1', '1', '1', '2020-09-12 14:43:27', '0');
INSERT INTO `itemshop` VALUES ('2', '27001', '0', '0', '0', '0', '100', '14', '1', '2050-09-26 14:28:42', '0');
INSERT INTO `itemshop` VALUES ('3', '11219', '0', '0', '0', '0', '1000', '2', '0', '2050-09-26 14:28:42', '0');
INSERT INTO `itemshop` VALUES ('4', '11229', '0', '0', '0', '0', '100', '2', '0', '2050-09-26 14:28:42', '0');
INSERT INTO `itemshop` VALUES ('5', '11239', '0', '0', '0', '0', '100', '1', '1', '2020-09-26 14:28:42', '0');
INSERT INTO `itemshop` VALUES ('7', '11249', '0', '0', '0', '0', '100', '1', '0', '2050-09-26 14:28:42', '0');
INSERT INTO `itemshop` VALUES ('8', '11259', '0', '0', '0', '0', '1010', '1', '0', '2050-09-26 14:28:42', '0');
INSERT INTO `itemshop` VALUES ('9', '11269', '0', '0', '0', '0', '1000', '1', '0', '2050-09-26 14:28:42', '0');
INSERT INTO `itemshop` VALUES ('10', '11279', '0', '0', '0', '0', '100', '1', '0', '2050-09-26 14:28:42', '0');
INSERT INTO `itemshop` VALUES ('11', '11289', '0', '0', '0', '0', '100', '1', '0', '2050-09-26 14:28:42', '0');
INSERT INTO `itemshop` VALUES ('13', '1500', '0', '0', '0', '0', '1000', '1', '0', '2050-09-26 14:28:42', '0');
INSERT INTO `itemshop` VALUES ('14', '19', '0', '0', '0', null, '1000', '1', '0', '2050-09-26 14:28:42', '0');
INSERT INTO `itemshop` VALUES ('15', '19', '0', '0', '0', null, '1000', '1', '0', '2050-09-26 14:28:42', '0');
INSERT INTO `itemshop` VALUES ('16', '19', '0', '0', '0', null, '1000', '1', '0', '2050-09-26 14:28:42', '0');
INSERT INTO `itemshop` VALUES ('17', '19', '0', '0', '0', null, '1000', '1', '0', '2050-09-26 14:28:42', '0');
INSERT INTO `itemshop` VALUES ('18', '19', '0', '0', '0', null, '1000', '1', '0', '2050-09-26 14:28:42', '0');
INSERT INTO `itemshop` VALUES ('19', '19', '0', '0', '0', null, '1000', '1', '0', '2050-09-26 14:28:42', '0');
INSERT INTO `itemshop` VALUES ('20', '19', '0', '0', '0', null, '1000', '1', '0', '2050-09-26 14:28:42', '0');
INSERT INTO `itemshop` VALUES ('21', '19', '0', '0', '0', null, '1000', '1', '0', '2050-09-26 14:28:42', '0');
INSERT INTO `itemshop` VALUES ('22', '19', '0', '0', '0', null, '1000', '1', '0', '2050-09-26 14:28:42', '0');
INSERT INTO `itemshop` VALUES ('23', '19', '0', '0', '0', null, '1000', '1', '0', '2050-09-26 14:28:42', '0');
INSERT INTO `itemshop` VALUES ('24', '19', '0', '0', '0', null, '1000', '1', '0', '2050-09-26 14:28:42', '0');
INSERT INTO `itemshop` VALUES ('25', '19', '0', '0', '0', null, '1000', '1', '0', '2050-09-26 14:28:42', '0');
INSERT INTO `itemshop` VALUES ('26', '19', '0', '0', '0', null, '1000', '1', '0', '2050-09-26 14:28:42', '0');
INSERT INTO `itemshop` VALUES ('27', '19', '0', '0', '0', null, '1000', '1', '0', '2050-09-26 14:28:42', '0');
INSERT INTO `itemshop` VALUES ('28', '19', '0', '0', '0', null, '1000', '1', '0', '2050-09-26 14:28:42', '0');
INSERT INTO `itemshop` VALUES ('29', '19', '0', '0', '0', null, '1000', '1', '0', '2050-09-26 14:28:42', '0');
INSERT INTO `itemshop` VALUES ('30', '19', '0', '0', '0', null, '1000', '1', '0', '2050-09-26 14:28:42', '0');
INSERT INTO `itemshop` VALUES ('31', '19', '0', '0', '0', null, '1000', '1', '0', '2050-09-26 14:28:42', '0');
INSERT INTO `itemshop` VALUES ('32', '19', '0', '0', '0', null, '1000', '1', '0', '2050-09-26 14:28:42', '0');
INSERT INTO `itemshop` VALUES ('33', '19', '0', '0', '0', null, '1000', '1', '0', '2050-09-26 14:28:42', '0');
INSERT INTO `itemshop` VALUES ('34', '19', '0', '0', '0', null, '1000', '1', '0', '2050-09-26 14:28:42', '0');
INSERT INTO `itemshop` VALUES ('35', '19', '0', '0', '0', null, '1000', '1', '0', '2050-09-26 14:28:42', '0');
INSERT INTO `itemshop` VALUES ('36', '19', '0', '0', '0', null, '1000', '1', '0', '2050-09-26 14:28:42', '0');
INSERT INTO `itemshop` VALUES ('37', '19', '0', '0', '0', null, '1000', '1', '0', '2050-09-26 14:28:42', '0');
INSERT INTO `itemshop` VALUES ('38', '19', '0', '0', '0', null, '1000', '1', '0', '2050-09-26 14:28:42', '0');
INSERT INTO `itemshop` VALUES ('39', '19', '0', '0', '0', null, '1000', '1', '0', '2050-09-26 14:28:42', '0');
INSERT INTO `itemshop` VALUES ('40', '19', '0', '0', '0', null, '1000', '1', '0', '2050-09-26 14:28:42', '0');
INSERT INTO `itemshop` VALUES ('41', '19', '0', '0', '0', null, '1000', '1', '0', '2050-09-26 14:28:42', '0');
INSERT INTO `itemshop` VALUES ('42', '19', '0', '0', '0', null, '1000', '1', '0', '2050-09-26 14:28:42', '0');
INSERT INTO `itemshop` VALUES ('43', '19', '0', '0', '0', null, '1000', '1', '0', '2050-09-26 14:28:42', '0');
INSERT INTO `itemshop` VALUES ('44', '19', '0', '0', '0', null, '1000', '1', '0', '2050-09-26 14:28:42', '0');
INSERT INTO `itemshop` VALUES ('45', '19', '0', '0', '0', null, '1000', '1', '0', '2050-09-26 14:28:42', '0');
INSERT INTO `itemshop` VALUES ('46', '19', '0', '0', '0', null, '1000', '1', '0', '2050-09-26 14:28:42', '0');
INSERT INTO `itemshop` VALUES ('47', '19', '0', '0', '0', null, '1000', '1', '0', '2050-09-26 14:28:42', '0');
INSERT INTO `itemshop` VALUES ('48', '19', '0', '0', '0', null, '1000', '1', '0', '2050-09-26 14:28:42', '0');
INSERT INTO `itemshop` VALUES ('49', '19', '0', '0', '0', null, '1000', '1', '0', '2050-09-26 14:28:42', '0');
INSERT INTO `itemshop` VALUES ('50', '19', '0', '0', '0', null, '1000', '1', '0', '2050-09-26 14:28:42', '0');
INSERT INTO `itemshop` VALUES ('51', '19', '0', '0', '0', null, '1000', '1', '0', '2050-09-26 14:28:42', '0');
INSERT INTO `itemshop` VALUES ('52', '19', '0', '0', '0', null, '1000', '1', '0', '2050-09-26 14:28:42', '0');
INSERT INTO `itemshop` VALUES ('53', '19', '0', '0', '0', null, '1000', '1', '0', '2050-09-26 14:28:42', '0');
INSERT INTO `itemshop` VALUES ('54', '19', '0', '0', '0', null, '1000', '1', '0', '2050-09-26 14:28:42', '0');
INSERT INTO `itemshop` VALUES ('55', '19', '0', '0', '0', null, '1000', '1', '0', '2050-09-26 14:28:42', '0');
INSERT INTO `itemshop` VALUES ('56', '19', '0', '0', '0', null, '1000', '1', '0', '2050-09-26 14:28:42', '0');
INSERT INTO `itemshop` VALUES ('57', '29', '0', '0', '0', null, '1000', '1', '0', '2050-09-26 14:28:42', '0');
INSERT INTO `itemshop` VALUES ('58', '19', '0', '0', '0', null, '1000', '1', '0', '2050-09-26 14:28:42', '0');
INSERT INTO `itemshop` VALUES ('59', '19', '0', '0', '0', null, '1000', '1', '0', '2050-09-26 14:28:42', '0');
INSERT INTO `itemshop` VALUES ('60', '19', '0', '0', '0', null, '1000', '1', '0', '2050-09-26 14:28:42', '0');
INSERT INTO `itemshop` VALUES ('61', '19', '0', '0', '0', null, '1000', '1', '0', '2050-09-26 14:28:42', '0');
INSERT INTO `itemshop` VALUES ('62', '19', '0', '0', '0', null, '1000', '1', '0', '2050-09-26 14:28:42', '0');
INSERT INTO `itemshop` VALUES ('63', '19', '0', '0', '0', null, '1000', '1', '0', '2050-09-26 14:28:42', '0');
INSERT INTO `itemshop` VALUES ('64', '19', '0', '0', '0', null, '1000', '1', '0', '2050-09-26 14:28:42', '0');
INSERT INTO `itemshop` VALUES ('65', '19', '0', '0', '0', null, '1000', '1', '0', '2050-09-26 14:28:42', '0');
INSERT INTO `itemshop` VALUES ('66', '19', '0', '0', '0', null, '1000', '1', '0', '2050-09-26 14:28:42', '0');
INSERT INTO `itemshop` VALUES ('67', '19', '0', '0', '0', null, '1000', '1', '0', '2050-09-26 14:28:42', '0');
INSERT INTO `itemshop` VALUES ('68', '19', '0', '0', '0', null, '1000', '1', '0', '2050-09-26 14:28:42', '0');
INSERT INTO `itemshop` VALUES ('69', '19', '0', '0', '0', null, '1000', '1', '0', '2050-09-26 14:28:42', '0');
INSERT INTO `itemshop` VALUES ('70', '19', '0', '0', '0', null, '1000', '1', '0', '2050-09-26 14:28:42', '0');
INSERT INTO `itemshop` VALUES ('71', '19', '0', '0', '0', null, '1000', '1', '0', '2050-09-26 14:28:42', '0');
INSERT INTO `itemshop` VALUES ('72', '19', '0', '0', '0', null, '1000', '1', '0', '2050-09-26 14:28:42', '0');
INSERT INTO `itemshop` VALUES ('73', '19', '0', '0', '0', null, '1000', '1', '0', '2050-09-26 14:28:42', '0');
INSERT INTO `itemshop` VALUES ('74', '19', '0', '0', '0', null, '1000', '1', '0', '2050-09-26 14:28:42', '0');
INSERT INTO `itemshop` VALUES ('75', '19', '0', '0', '0', null, '1000', '1', '0', '2050-09-26 14:28:42', '0');
INSERT INTO `itemshop` VALUES ('76', '19', '0', '0', '0', null, '1000', '1', '0', '2050-09-26 14:28:42', '0');
INSERT INTO `itemshop` VALUES ('77', '19', '0', '0', '0', null, '1000', '1', '0', '2050-09-26 14:28:42', '0');
INSERT INTO `itemshop` VALUES ('78', '19', '0', '0', '0', null, '1000', '1', '0', '2050-09-26 14:28:42', '0');
INSERT INTO `itemshop` VALUES ('79', '19', '0', '0', '0', null, '1000', '1', '0', '2050-09-26 14:28:42', '0');
INSERT INTO `itemshop` VALUES ('80', '19', '0', '0', '0', null, '1000', '1', '0', '2050-09-26 14:28:42', '0');
INSERT INTO `itemshop` VALUES ('81', '19', '0', '0', '0', null, '1000', '1', '0', '2050-09-26 14:28:42', '0');
INSERT INTO `itemshop` VALUES ('82', '19', '0', '0', '0', null, '1000', '1', '0', '2050-09-26 14:28:42', '0');
INSERT INTO `itemshop` VALUES ('83', '19', '0', '0', '0', null, '1000', '1', '0', '2050-09-26 14:28:42', '0');
INSERT INTO `itemshop` VALUES ('84', '19', '0', '0', '0', null, '1000', '1', '0', '2050-09-26 14:28:42', '0');
INSERT INTO `itemshop` VALUES ('85', '19', '0', '0', '0', null, '1000', '1', '0', '2050-09-26 14:28:42', '0');
INSERT INTO `itemshop` VALUES ('86', '19', '0', '0', '0', null, '1000', '1', '0', '2050-09-26 14:28:42', '0');
INSERT INTO `itemshop` VALUES ('87', '19', '0', '0', '0', null, '1000', '1', '0', '2050-09-26 14:28:42', '0');
INSERT INTO `itemshop` VALUES ('88', '19', '0', '0', '0', null, '1000', '1', '0', '2050-09-26 14:28:42', '0');
INSERT INTO `itemshop` VALUES ('89', '19', '0', '0', '0', null, '1000', '1', '0', '2050-09-26 14:28:42', '0');
INSERT INTO `itemshop` VALUES ('90', '71135', '2592000', '2592000', '2592000', null, '1000', '1', '1', '2020-09-13 17:51:55', '0');
INSERT INTO `itemshop` VALUES ('94', '11299', '0', '0', '0', '0', '1000', '1', '0', '2050-09-26 14:28:42', '0');

-- ----------------------------
-- Table structure for `itemshop_categories`
-- ----------------------------
DROP TABLE IF EXISTS `itemshop_categories`;
CREATE TABLE `itemshop_categories` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `name` varchar(40) NOT NULL,
  `main_category` int(10) NOT NULL,
  `color` int(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of itemshop_categories
-- ----------------------------
INSERT INTO `itemshop_categories` VALUES ('1', 'Hallo', '0', '1');
INSERT INTO `itemshop_categories` VALUES ('2', 'Hallo2', '1', '1');
INSERT INTO `itemshop_categories` VALUES ('3', 'Halli3', '0', '2');
INSERT INTO `itemshop_categories` VALUES ('4', '4', '0', '2');
INSERT INTO `itemshop_categories` VALUES ('5', '5', '0', '3');
INSERT INTO `itemshop_categories` VALUES ('6', '6', '0', '3');
INSERT INTO `itemshop_categories` VALUES ('7', '7', '0', '0');
INSERT INTO `itemshop_categories` VALUES ('8', '8', '0', '0');
INSERT INTO `itemshop_categories` VALUES ('9', '9', '0', '0');
INSERT INTO `itemshop_categories` VALUES ('10', '10', '0', '0');
INSERT INTO `itemshop_categories` VALUES ('11', '11', '0', '0');
INSERT INTO `itemshop_categories` VALUES ('12', '12', '0', '0');
INSERT INTO `itemshop_categories` VALUES ('13', '13', '0', '0');
INSERT INTO `itemshop_categories` VALUES ('14', '14', '0', '0');
