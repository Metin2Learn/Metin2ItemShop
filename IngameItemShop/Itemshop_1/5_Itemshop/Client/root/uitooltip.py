#1.1 Search
	def SetItemToolTip(self, itemVnum):

#1.2 Add ABOVE:
	def SetItemShopToolTip(self, itemVnum, metinSlot):
		self.ClearToolTip()
		for i in xrange(player.METIN_SOCKET_MAX_NUM):
			metinSlot.append(0)
		attrSlot = []
		for i in xrange(player.ATTRIBUTE_SLOT_MAX_NUM):
			attrSlot.append((0, 0))

		self.AddItemData(itemVnum, metinSlot, attrSlot)
