SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for itemshop_items
-- ----------------------------
DROP TABLE IF EXISTS `itemshop_items`;
CREATE TABLE `itemshop_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category` int(11) NOT NULL,
  `vnum` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `attrtype0` tinyint(4) NOT NULL DEFAULT '0',
  `attrvalue0` smallint(6) NOT NULL DEFAULT '0',
  `attrtype1` tinyint(4) NOT NULL DEFAULT '0',
  `attrvalue1` smallint(6) NOT NULL DEFAULT '0',
  `attrtype2` tinyint(4) NOT NULL DEFAULT '0',
  `attrvalue2` smallint(6) NOT NULL DEFAULT '0',
  `attrtype3` tinyint(4) NOT NULL DEFAULT '0',
  `attrvalue3` smallint(6) NOT NULL DEFAULT '0',
  `attrtype4` tinyint(4) NOT NULL DEFAULT '0',
  `attrvalue4` smallint(6) NOT NULL DEFAULT '0',
  `attrtype5` tinyint(4) NOT NULL DEFAULT '0',
  `attrvalue5` smallint(6) NOT NULL DEFAULT '0',
  `attrtype6` tinyint(4) NOT NULL DEFAULT '0',
  `attrvalue6` smallint(6) NOT NULL DEFAULT '0',
  `socket0` int(5) NOT NULL DEFAULT '1',
  `socket1` int(5) NOT NULL DEFAULT '1',
  `socket2` int(5) NOT NULL DEFAULT '1',
  `time` int(11) NOT NULL DEFAULT '0',
  `percent` int(3) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=248 DEFAULT CHARSET=latin1;
