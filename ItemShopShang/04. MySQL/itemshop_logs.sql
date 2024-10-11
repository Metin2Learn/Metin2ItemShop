SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for itemshop_logs
-- ----------------------------
DROP TABLE IF EXISTS `itemshop_logs`;
CREATE TABLE `itemshop_logs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pid` int(11) NOT NULL,
  `vnum` int(11) NOT NULL,
  `amount` int(11) NOT NULL DEFAULT '1',
  `item_id` int(11) NOT NULL,
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
  `price` int(11) NOT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
