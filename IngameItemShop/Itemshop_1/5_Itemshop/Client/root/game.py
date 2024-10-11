#1.1 Search:
import uiTarget

#1.2 Add after:

if hasattr(app, "ENABLE_INGAME_ITEMSHOP"):
	import uiitemshop


#2.1 Search:
self.__ProcessPreservedServerCommand()

#2.2 Add after:
		if hasattr(app, "ENABLE_INGAME_ITEMSHOP"):
			self.itemshop = uiitemshop.Itemshop()
			self.itemshop.Hide()


#3.1 Search:
		onPressKeyDict[app.DIK_F4]	= lambda : self.__PressQuickSlot(7)

#3.2 Add after:
		if hasattr(app, "ENABLE_INGAME_ITEMSHOP"):
			onPressKeyDict[app.DIK_F7]	= lambda : self.__toggleIS()


#4.1 Add to end of file
	if hasattr(app, "ENABLE_INGAME_ITEMSHOP"):
		def __toggleIS(self):
			net.SendChatPacket("/open_is")
		
		def BINARY_ITEMSHOPNEW_OPEN(self):
			self.itemshop.OpenWindow()
		
		def BINARY_ITEMSHOPNEW_LIMITED_COUNT(self, _id, _count):
			self.itemshop.RECV_LIMITED_ITEM_COUNT(_id, _count)