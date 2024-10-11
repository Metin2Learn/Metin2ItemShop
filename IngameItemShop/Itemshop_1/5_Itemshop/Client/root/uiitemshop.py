import ui
import dbg
import app
import item
import localeInfo
from uiitemshop_comp import Component
import uitooltip
import wndMgr
import chr
import itemshopnew
import math
import uicommon

IMG_PATH = "itemshop/"
COINS_URL = "https://www.google.de"

#needs 
#https://metin2.dev/board/topic/19831-c-bold-texts-are-reversed/

def SecondToDHM(time):
	if time < 0:
		return localeInfo.ITEMSHOP_EXPIRED
	second = int(time % 60)
	minute = int((time / 60) % 60)
	hour = int((time / 60) / 60) % 24
	day = int(int((time / 60) / 60) / 24)

	text = ""

	if day > 0:
		text += str(day) + "D"
		text += " "

	if hour > 0:
		text += str(hour) + "h"
		text += " "

	if minute > 0:
		text += str(minute) + "m"

	if day <= 0 and second >= 0:
		text += " "
		text += str(second) + "s"
	
	if text == "":
		text = localeInfo.ITEMSHOP_EXPIRED
		
	return text


class PopUpWindow(ui.BoardWithTitleBar):
	itm = None
	childItem = None
	isStackAble = False
	currentCount = 1
	def __init__(self, itm):
		ui.BoardWithTitleBar.__init__(self)
		self.SetSize(417, 230)
		self.SetCenterPosition()
		self.AddFlag('movable')
		self.AddFlag('float')
		self.SetTitleName(localeInfo.ITEMSHOP_PURCHASE)
		self.SetCloseEvent(self.Close)
		self.Show()
		
		self.itm = itm
		item.SelectItem(itm[1])
		
		if item.IsAntiFlag(item.ITEM_ANTIFLAG_STACK) == False and item.GetItemType() != item.ITEM_TYPE_ARMOR and item.GetItemType() != item.ITEM_TYPE_WEAPON and item.GetItemType() != item.ITEM_TYPE_COSTUME:
			self.isStackAble = True
			
		self.childItem = PopUpItem(self, itm)
		self.childItem.SetPosition(self.GetWidth()/2-self.childItem.GetWidth()/2, 41)
		
		self.footerbg = Component.ExpandedImage(self , 0, 0, IMG_PATH+"popupfooter.png")
		self.footerbg.SetPosition(5, self.GetHeight()-self.footerbg.GetHeight()-8)
		self.buyBtn = Component.NewButton(self, 241, 198, self.buy_func, IMG_PATH+'buy_item_01.png', IMG_PATH+'buy_item_02.png')
		self.buyBtn.text.SetFontName("Tahoma:13b")
		self.buyBtn.SetText('|cffffffff'+localeInfo.ITEMSHOP_PURCHASE)	
		
		self.coinTxt = Component.TextLine(self, '', 35, 203, None)
		self.coinTxt.SetFontName("Tahoma:13b")
		self.coinTxt.SetText('|cffc9a63d'+str(itm[3]))
		self.coinTxt.SetOutline(TRUE)
		
		self.coinSTxt = Component.TextLine(self, '', 35+self.coinTxt.GetTextWidth()+5, 203, None)
		self.coinSTxt.SetFontName("Tahoma:13b")
		self.coinSTxt.SetText('|cffffffff'+localeInfo.ITEMSHOP_DRAGONCOINS)
		self.coinSTxt.SetOutline(TRUE)
		
		
		maincat = itemshopnew.GetMainByCategory(itm[4])
		coinimg = "coin_real.png"
		if maincat == 1:
			self.coinTxt.SetText('|cff3f8da9'+str(itm[3]))
			self.coinSTxt.SetText('|cffffffff'+localeInfo.ITEMSHOP_VOTECOINS)
			coinimg = "coin_vote.png"
		
		self.coinIcon = Component.ExpandedImage(self , 10, 198, IMG_PATH+coinimg)
		
		self.currentCountTxt = Component.TextLine(self, '', 232, 203, None)
		self.currentCountTxt.SetFontName("Tahoma:12")
		self.currentCountTxt.SetText('|cffffffff1')
		self.currentCountTxt.SetHorizontalAlignCenter()
		
		self.countBtnUp = Component.NewButton(self, 225, 198, self.countBtnUp_func, IMG_PATH+'popup_up_01.png', IMG_PATH+'popup_up_02.png')
		self.countBtnDown = Component.NewButton(self, 225, 216, self.countBtnDown_func, IMG_PATH+'popup_down_01.png', IMG_PATH+'popup_down_02.png')
		if self.isStackAble == False:
			self.countBtnUp.Disable()
			self.countBtnDown.Disable()
		
	def __del__(self):
		ui.BoardWithTitleBar.__del__(self)
		itm = None	
	
	def buy_func(self):
		itemshopnew.SendBuy(self.itm[0], self.currentCount)
		if self.itm[7] > 0:
			itemshopnew.RequestNewCount(self.itm[0])
		self.Close()
	
	def UpdatePrice(self):
		self.currentCountTxt.SetText('|cffffffff'+str(self.currentCount))
		self.coinTxt.SetText('|cffc9a63d'+str(self.itm[3]*self.currentCount))
		self.coinSTxt.SetPosition(35+self.coinTxt.GetTextWidth()+5, 203)
	
	def countBtnUp_func(self):
		if self.isStackAble == False:
			return
		if self.currentCount >= 200:
			return
		self.currentCount += 1
		self.UpdatePrice()
		
	def countBtnDown_func(self):
		if self.isStackAble == False:
			return
		if self.currentCount <= 1:
			return
		self.currentCount -= 1
		self.UpdatePrice()
	
	def OpenWindow(self):
		if self.IsShow():
			self.Hide()
		else:
			self.Show()
	
	def Close(self):
		self.Hide()
	
	def OnUpdate(self):
		if self.childItem != None:
			self.childItem.OnUpdate()

class PreviewToolTip(ui.ThinBoard):
	def __init__(self):
		ui.ThinBoard.__init__(self, "TOP_MOST")

		self.SetSize(190+10, 210+10)
		self.AddFlag("not_pick")
		self.AddFlag("float")

		self.followFlag = TRUE

		self.xPos = -1
		self.yPos = -1

	def __del__(self):
		ui.ThinBoard.__del__(self)

	def SetFollow(self, flag):
		self.followFlag = flag

	def ShowToolTip(self, vnum):
		self.SetTop()
		self.Show()

		item.SelectItem(vnum)
		self.ModelPreview = ui.RenderTarget()
		self.ModelPreview.SetParent(self)
		self.ModelPreview.SetSize(190, 210)
		self.ModelPreview.SetPosition(5, 5)
			
		
		self.RaceMode = -1
		self.isMaleMode = False
		self.isFemaleMode = False
		
		if item.GetItemType() != item.ITEM_TYPE_WEAPON:
			self.ModelPreview.SetRenderTarget(250)
			self.ModelPreview.SetBackground("d:/ymir work/ui/game/myshop_deco/model_view_bg.sub")
			self.ModelPreview.SetThingMode(False)
			self.ModelPreview.SetVisibility(True)
			if item.IsAntiFlag(item.ITEM_ANTIFLAG_WARRIOR) == False and (self.RaceMode == 0 or self.RaceMode == -1):
				if item.IsAntiFlag(item.ITEM_ANTIFLAG_MALE) == False and (self.isMaleMode or (self.isMaleMode == False and self.isFemaleMode == False)):
					self.ModelPreview.SelectModel(0)
				else:
					self.ModelPreview.SelectModel(4)
			elif item.IsAntiFlag(item.ITEM_ANTIFLAG_ASSASSIN) == False and (self.RaceMode == 1 or self.RaceMode == -1):
				if item.IsAntiFlag(item.ITEM_ANTIFLAG_FEMALE) == False and (self.isFemaleMode or (self.isMaleMode == False and self.isFemaleMode == False)):
					self.ModelPreview.SelectModel(1)
				else:
					self.ModelPreview.SelectModel(5)
			elif item.IsAntiFlag(item.ITEM_ANTIFLAG_SURA) == False and (self.RaceMode == 2 or self.RaceMode == -1):
				if item.IsAntiFlag(item.ITEM_ANTIFLAG_MALE) == False and (self.isMaleMode or (self.isMaleMode == False and self.isFemaleMode == False)):
					self.ModelPreview.SelectModel(2)
				else:
					self.ModelPreview.SelectModel(6)
			elif item.IsAntiFlag(item.ITEM_ANTIFLAG_SHAMAN) == False and (self.RaceMode == 3 or self.RaceMode == -1):
				if item.IsAntiFlag(item.ITEM_ANTIFLAG_FEMALE) == False and (self.isFemaleMode or (self.isMaleMode == False and self.isFemaleMode == False)):
					self.ModelPreview.SelectModel(3)
				else:
					self.ModelPreview.SelectModel(7)
			#elif item.IsAntiFlag(item.ITEM_ANTIFLAG_WOLFMAN) == False and (self.RaceMode == 4 or self.RaceMode == -1):
			#	self.ModelPreview.SelectModel(8)
			
			if item.GetItemType() == item.ITEM_TYPE_ARMOR:
				self.ModelPreview.SetArmor(vnum)
				self.ModelPreview.SetMotion(chr.MOTION_MODE_GENERAL, chr.MOTION_INTRO_WAIT)
			elif item.GetItemType() == item.ITEM_TYPE_WEAPON:
				self.ModelPreview.SetWeapon(vnum)
			elif item.GetItemType() == item.ITEM_TYPE_COSTUME:
				if item.GetItemSubType() == item.COSTUME_TYPE_BODY:
					self.ModelPreview.SetArmor(vnum)
					self.ModelPreview.SetMotion(chr.MOTION_MODE_GENERAL, chr.MOTION_INTRO_WAIT)
				elif item.GetItemSubType() == item.COSTUME_TYPE_HAIR:
					self.ModelPreview.SetHair(item.GetValue(3))
				#elif item.GetItemSubType() == item.COSTUME_TYPE_ACCE:
				#	self.ModelPreview.SetSash(vnum)
				elif item.GetItemSubType() == item.COSTUME_TYPE_WEAPON:
					self.ModelPreview.SetWeapon(vnum)
		else:
			self.ModelPreview.SetRenderTarget(251)
			self.ModelPreview.SetBackground("d:/ymir work/ui/game/myshop_deco/model_view_bg.sub")
			self.ModelPreview.SetThingMode(True)
			self.ModelPreview.SetVisibility(True)
			self.ModelPreview.SelectModel(vnum)
			
		
		self.ModelPreview.Show()

		self.OnUpdate()

	def HideToolTip(self):
		self.ModelPreview.SetVisibility(False)
		self.Hide()

	def OnUpdate(self):

		if not self.followFlag:
			return

		x = 0
		y = 0
		width = self.GetWidth()
		height = self.GetHeight()

		if -1 == self.xPos and -1 == self.yPos:

			(mouseX, mouseY) = wndMgr.GetMousePosition()

			if mouseY < wndMgr.GetScreenHeight() - 300:
				y = mouseY + 30
			else:
				y = mouseY - height - 20

			x = mouseX - width/2				

		else:

			x = self.xPos - width/2
			y = self.yPos - height

		x = max(x, 0)
		y = max(y, 0)
		x = min(x + width/2, wndMgr.GetScreenWidth() - width/2) - width/2
		y = min(y + self.GetHeight(), wndMgr.GetScreenHeight()) - self.GetHeight()

		parentWindow = self.GetParentProxy()
		if parentWindow:
			(gx, gy) = parentWindow.GetGlobalPosition()
			x -= gx
			y -= gy

		self.SetPosition(x, y)

class Page(ui.Window):
	def __init__(self, parent):
		ui.Window.__init__(self)
		self.SetParent(parent)
		self.SetSize(910, 640)
		self.Show()
		self.SetPosition(13, 99)

	def __del__(self):
		self.Hide()
		ui.Window.__del__(self)

class Item(ui.ExpandedImageBox):
	parent = None
	vnum = 0
	item_id = 0
	desc = []
	itemToolTip = None
	previewToolTip = None
	isStackAble = False
	itemNameStr = ""
	limitedTime = 0
	limitedCount = 0
	isLimited = 0
	itm = None
	lastUpdate = 0
	def __init__(self, parent, itm):
		ui.ExpandedImageBox.__init__(self)
		self.lastUpdate = app.GetGlobalTimeStamp()
		self.parent = parent
		self.itm = itm
		self.vnum = itm[1]
		self.item_id = itm[0]
		self.SetParent(parent)
		self.LoadImage(IMG_PATH+"itembg.png")
		
		self.isLimited = itm[5]
		self.limitedTime = itm[6]
		self.limitedCount = itm[7]
		maincat = itemshopnew.GetMainByCategory(itm[4])
		
		item.SelectItem(self.vnum)
		self.itemNameStr = item.GetItemName()
		
		if item.IsAntiFlag(item.ITEM_ANTIFLAG_STACK) == False and item.GetItemType() != item.ITEM_TYPE_ARMOR and item.GetItemType() != item.ITEM_TYPE_WEAPON and item.GetItemType() != item.ITEM_TYPE_COSTUME:
			self.isStackAble = True
		self.imgIcon = Component.HoverableExpandedImage(self , 87, -27, item.GetIconImageFileName())
		
		if self.imgIcon.GetHeight() == 96:
			self.imgIcon.SetScale(89.0/96.0, 89.0/96.0)
		
		self.imgIcon.SetPosition(self.GetWidth()/2-self.imgIcon.GetWidth()/2+2, self.GetHeight()/2-self.imgIcon.GetHeight()/2-52)
		
		self.imgIcon.SetOverInEvent(self.OverInItem)
		self.imgIcon.SetOverOutEvent(self.OverOutItem)
		
		self.itemName = Component.TextLine(self, '', 103, 20, None)
		self.itemName.SetFontName("Tahoma:16")
		self.itemName.SetText('|cffc9a63d'+item.GetItemName())
		if maincat == 1:
			self.itemName.SetText('|cff3f8da9'+item.GetItemName())

		self.itemName.SetPosition((self.GetWidth()/2-self.itemName.GetTextWidth()/2)+2, 10)
		
		self.coinTxt = Component.TextLine(self, '', 35, 145+65, None)
		self.coinTxt.SetFontName("Tahoma:13b")
		self.coinTxt.SetText('|cffc9a63d'+str(itm[3]))
		self.coinTxt.SetOutline(TRUE)
		
		self.coinSTxt = Component.TextLine(self, '', 35+self.coinTxt.GetTextWidth()+5, 145+65, None)
		self.coinSTxt.SetFontName("Tahoma:13b")
		self.coinSTxt.SetText('|cffffffff'+localeInfo.ITEMSHOP_DRAGONCOINS)
		self.coinSTxt.SetOutline(TRUE)
		
		if maincat == 1:
			self.coinTxt.SetText('|cff3f8da9'+str(itm[3]))
			self.coinSTxt.SetText('|cffffffff'+localeInfo.ITEMSHOP_VOTECOINS)
		
		
		self.limitedTxt = Component.TextLine(self, '', 10, 145+39, None)
		self.limitedTxt.SetFontName("Tahoma:13b")
		self.limitedTxt.SetText('|cffc22c2c'+localeInfo.ITEMSHOP_LIMITED_ITEM+' |cffffffff3h:39min:3s')
		self.limitedTxt.SetOutline(TRUE)
		
		self.limitedTxt.SetPosition((self.GetWidth()/2-self.limitedTxt.GetTextWidth()/2)+2, 145+39)
		
			
		self.imgLimited = Component.ExpandedImage(self , 4, 4, IMG_PATH+"limitedbadge.png")
		if itm[5] == 0:
			self.imgLimited.Hide()
			self.limitedTxt.Hide()

		
		bonuses = self.GetBonuses()
		
		if len(bonuses) == 0:
			lines = uitooltip.SplitDescription(item.GetItemDescription(), 35)
			
			addY = 0
			if len(lines) == 1:
				addY = 16
			if len(lines) == 2:
				addY = 16/2
			
			for i in xrange(min(3, len(lines))):
				line = Component.TextLine(self, "|cffffffff"+lines[i], 103, 135+i*16+addY, None)
				line.SetPosition(self.GetWidth()/2-line.GetTextWidth()/2, 135+i*16+addY)
				self.desc.append(line)
		else:
			addY = 0
			if len(bonuses) == 1:
				addY = 16
			if len(bonuses) == 2:
				addY = 16/2
			for i in xrange(min(3, len(bonuses))):
				line = Component.TextLine(self, "|cffffffff"+bonuses[i], 103, 135+i*14+addY, None)
				line.SetPosition(self.GetWidth()/2-line.GetTextWidth()/2+2, 135+i*14+addY)
				self.desc.append(line)
		
		self.zoomIcon = Component.HoverableExpandedImage(self , 110, 38, IMG_PATH+"zoombtn.png")
		self.zoomIcon.Hide()
		
		if (item.GetItemType() == item.ITEM_TYPE_ARMOR and item.GetItemSubType() == 0) or (item.GetItemType() == item.ITEM_TYPE_COSTUME) or (item.GetItemType() == item.ITEM_TYPE_WEAPON):
			self.zoomIcon.Show()
			self.zoomIcon.SetOverInEvent(self.OverInZoom)
			self.zoomIcon.SetOverOutEvent(self.OverOutZoom)

		coinimg = ""
		
			
		
		if maincat == 0:
			coinimg = "coin_real.png"
		elif maincat == 1:
			coinimg = "coin_vote.png"
		self.coinIcon = Component.ExpandedImage(self , 10, 147+58, IMG_PATH+coinimg)
		self.buyBtn = Component.NewButton(self, 8, 230, self.buy_func, IMG_PATH+'buy_item_01.png', IMG_PATH+'buy_item_02.png')
		self.buyBtn.text.SetFontName("Tahoma:13b")
		self.buyBtn.SetText('|cffffffff'+localeInfo.ITEMSHOP_PURCHASE)
		
		self.Show()

	def __del__(self):
		self.desc = []
		self.Hide()
		ui.ExpandedImageBox.__del__(self)
	
	def GetBonuses(self):
		bonuses = []
		if item.GetItemType() == 1:
			minPower = item.GetValue(3)
			maxPower = item.GetValue(4)
			addPower = item.GetValue(5)
			if maxPower > minPower:
				bonuses.append(localeInfo.TOOLTIP_ITEM_ATT_POWER % (minPower+addPower, maxPower+addPower))
			else:
				bonuses.append(localeInfo.TOOLTIP_ITEM_ATT_POWER_ONE_ARG % (minPower+addPower))
				
			minMagicAttackPower = item.GetValue(1)
			maxMagicAttackPower = item.GetValue(2)
			addPower = item.GetValue(5)
	
			if minMagicAttackPower > 0 or maxMagicAttackPower > 0:
				if maxMagicAttackPower > minMagicAttackPower:
					bonuses.append(localeInfo.TOOLTIP_ITEM_MAGIC_ATT_POWER % (minMagicAttackPower+addPower, maxMagicAttackPower+addPower))
				else:
					bonuses.append(localeInfo.TOOLTIP_ITEM_MAGIC_ATT_POWER_ONE_ARG % (minMagicAttackPower+addPower))
		
		if item.GetItemType() == 2:
			defGrade = item.GetValue(1)
			defBonus = item.GetValue(5)*2
			if defGrade > 0:
				bonuses.append(localeInfo.TOOLTIP_ITEM_DEF_GRADE % (defGrade+defBonus))

			magicDefencePower = item.GetValue(0)

			if magicDefencePower > 0:
				bonuses.append(localeInfo.TOOLTIP_ITEM_MAGIC_DEF_POWER % magicDefencePower)
		
		for i in xrange(item.ITEM_APPLY_MAX_NUM):
			(affectType, affectValue) = item.GetAffect(i)
			if affectType > 0 and affectValue != 0:
				affectString = uitooltip.ItemToolTip.AFFECT_DICT[affectType](affectValue)
				bonuses.append(affectString)
		
		return bonuses
	
	def RECV_LIMITED_ITEM_COUNT(self, count):
		self.limitedCount = count
	
	def OverOutItem(self, a):
		if self.itemToolTip:
			self.itemToolTip.Hide()
			self.itemToolTip = None
	
	def OverInItem(self, a):
		self.itemToolTip = uitooltip.ItemToolTip()
		self.itemToolTip.Show()
		self.itemToolTip.SetCannotUseItemForceSetDisableColor(False)
		self.itemToolTip.SetItemShopToolTip(self.vnum, [app.GetGlobalTimeStamp() + self.itm[2][0] if self.itm[2][0] > 0 else 0, app.GetGlobalTimeStamp() + self.itm[2][1] if self.itm[2][1] > 0 else 0, app.GetGlobalTimeStamp() + self.itm[2][2] if self.itm[2][2] > 0 else 0])
		
	def OverOutZoom(self, a):
		if self.previewToolTip:
			self.previewToolTip.Hide()
			self.previewToolTip = None
	
	def OverInZoom(self, a):
		self.previewToolTip = PreviewToolTip()
		self.previewToolTip.ShowToolTip(self.vnum)
	
	def buy_func(self):
		self.buyDialog = PopUpWindow(self.itm)
		self.buyDialog.Show()
	
	def OnUpdate(self):
		if self.IsShow() == False:
			return
		if self.previewToolTip:
			self.previewToolTip.OnUpdate()

		if self.isLimited == 1:
			if self.limitedCount > 0 and self.lastUpdate+20 < app.GetGlobalTimeStamp():
				self.lastUpdate = app.GetGlobalTimeStamp()
				itemshopnew.RequestNewCount(self.item_id)
				
			if self.limitedCount == 0:
				self.limitedTxt.SetText('|cffc22c2c'+localeInfo.ITEMSHOP_LIMITED_ITEM+' |cffffffff'+SecondToDHM(self.limitedTime-app.GetGlobalTimeStamp()))
			else:
				self.limitedTxt.SetText('|cffc22c2c'+localeInfo.ITEMSHOP_LIMITED_COUNT+' |cffffffff'+str(self.limitedCount))
							
			self.limitedTxt.SetPosition((self.GetWidth()/2-self.limitedTxt.GetTextWidth()/2)+2, 145+39)
			
			if self.limitedCount <= 0 and self.limitedTime-app.GetGlobalTimeStamp() <= 0:
				self.buyBtn.SetHoverImage(IMG_PATH+'buy_item_01_expired.png')
				self.buyBtn.Disable()
				self.buyBtn.SetMouseLeftButtonDownEvent(None)
				self.buyBtn.SetText('|cffffffff'+localeInfo.ITEMSHOP_EXPIRED)
				self.limitedTxt.SetText('')
				self.LoadImage(IMG_PATH+"itembg_expired.png")
				self.isLimited = 0
				

class PopUpItem(Item):
	def __init__(self, parent, itm):
		ui.ExpandedImageBox.__init__(self)
		self.parent = parent
		self.itm = itm
		self.vnum = itm[1]
		self.item_id = itm[0]
		self.SetParent(parent)
		self.LoadImage(IMG_PATH+"popupitembg.png")
		
		maincat = itemshopnew.GetMainByCategory(itm[4])

		item.SelectItem(self.vnum)
		self.itemNameStr = item.GetItemName()
		
		if item.IsAntiFlag(item.ITEM_ANTIFLAG_STACK) == False and item.GetItemType() != item.ITEM_TYPE_ARMOR and item.GetItemType() != item.ITEM_TYPE_WEAPON and item.GetItemType() != item.ITEM_TYPE_COSTUME:
			self.isStackAble = True
		self.imgIcon = Component.HoverableExpandedImage(self , 87, -27, item.GetIconImageFileName())
		
		if self.imgIcon.GetHeight() == 96:
			self.imgIcon.SetScale(89.0/96.0, 89.0/96.0)
		
		self.imgIcon.SetPosition(self.GetWidth()/2-self.imgIcon.GetWidth()/2+2, self.GetHeight()/2-self.imgIcon.GetHeight()/2-39)
		
		self.imgIcon.SetOverInEvent(self.OverInItem)
		self.imgIcon.SetOverOutEvent(self.OverOutItem)
		
		self.itemName = Component.TextLine(self, '', 103, 20, None)
		self.itemName.SetText('|cffffffff'+localeInfo.ITEMSHOP_BUYING+' |cffc9a63d'+item.GetItemName())
		if maincat == 1:
			self.itemName.SetText('|cffffffff'+localeInfo.ITEMSHOP_BUYING+' |cff3f8da9'+item.GetItemName())

		self.itemName.SetPosition((self.GetWidth()/2-self.itemName.GetTextWidth()/2)+2, -8)
			
		bonuses = self.GetBonuses()
		
		if len(bonuses) == 0:
			lines = uitooltip.SplitDescription(item.GetItemDescription(), 35)
			
			addY = 0
			if len(lines) == 1:
				addY = 16
			if len(lines) == 2:
				addY = 16/2
			
			for i in xrange(min(3, len(lines))):
				line = Component.TextLine(self, "|cffffffff"+lines[i], 103, 105+i*16+addY, None)
				line.SetPosition(self.GetWidth()/2-line.GetTextWidth()/2, 105+i*16+addY)
				self.desc.append(line)
		else:
			addY = 0
			if len(bonuses) == 1:
				addY = 16
			if len(bonuses) == 2:
				addY = 16/2
			for i in xrange(min(3, len(bonuses))):
				line = Component.TextLine(self, "|cffffffff"+bonuses[i], 103, 105+i*14+addY, None)
				line.SetPosition(self.GetWidth()/2-line.GetTextWidth()/2+1, 105+i*14+addY)
				self.desc.append(line)
		
		self.zoomIcon = Component.HoverableExpandedImage(self , 165, 14, IMG_PATH+"zoombtn.png")
		self.zoomIcon.Hide()
		
		if (item.GetItemType() == item.ITEM_TYPE_ARMOR and item.GetItemSubType() == 0) or (item.GetItemType() == item.ITEM_TYPE_COSTUME) or (item.GetItemType() == item.ITEM_TYPE_WEAPON):
			self.zoomIcon.Show()
			self.zoomIcon.SetOverInEvent(self.OverInZoom)
			self.zoomIcon.SetOverOutEvent(self.OverOutZoom)

		self.Show()

	def __del__(self):
		self.desc = []
		self.Hide()
		ui.ExpandedImageBox.__del__(self)

class MainCategoryPage(Page):
	parent = None
	items = []
	catId = -1
	selectedSubId = 0
	SEARCH_ITEMS = []
	categoryBtns = []
	page = 1
	pageBtns = []	
	gold = -1
	silver = -1
	def __init__(self, parent, _id):
		Page.__init__(self, parent)
		self.catId = _id
		self.SetPosition(8, 31)
		self.parent = parent
		
		self.bg = Component.ExpandedImage(self , 0, 0, IMG_PATH+"bg.png")
		self.logo = Component.ExpandedImage(self , 20, 15, IMG_PATH+"logo.png")
		
		self.goldCoinTxt = Component.TextLine(self, '', 434-20, 10, None)
		self.goldCoinTxt.SetFontName("Tahoma:17b")
		self.goldCoinTxt.SetText('|cffc9a63d10.000')
		
		self.goldCoinSTxt = Component.TextLine(self, '', 435-20, 27, None)
		self.goldCoinSTxt.SetFontName("Tahoma:12")
		self.goldCoinSTxt.SetText('|cffffffff'+localeInfo.ITEMSHOP_DRAGONCOINS)
		
		self.silverCoinTxt = Component.TextLine(self, '', 631-20, 10, None)
		self.silverCoinTxt.SetFontName("Tahoma:17b")
		self.silverCoinTxt.SetText('|cff3f8da910.000')
		
		self.silverCoinSTxt = Component.TextLine(self, '', 632-20, 27, None)
		self.silverCoinSTxt.SetFontName("Tahoma:12")
		self.silverCoinSTxt.SetText('|cffffffff'+localeInfo.ITEMSHOP_VOTECOINS)
		
		
		if _id == 0:
			self.goldCoinsBtn = Component.NewButton(self, 512, 10, lambda arg = 0: self.parent.OpenMainCategoryPage(arg), IMG_PATH+"checked.png", IMG_PATH+"unchecked.png")
			self.silverCoinsBtn = Component.NewButton(self, 707, 10, lambda arg = 1: self.parent.OpenMainCategoryPage(arg), IMG_PATH+"unchecked.png", IMG_PATH+"checked.png")
		else:
			self.goldCoinsBtn = Component.NewButton(self, 512, 10, lambda arg = 0: self.parent.OpenMainCategoryPage(arg), IMG_PATH+"unchecked.png", IMG_PATH+"checked.png")
			self.silverCoinsBtn = Component.NewButton(self, 707, 10, lambda arg = 1: self.parent.OpenMainCategoryPage(arg), IMG_PATH+"checked.png", IMG_PATH+"unchecked.png")
		
		self.goldCoinSeTxt = Component.TextLine(self.goldCoinsBtn, '',9, 20, None)
		self.goldCoinSeTxt.SetFontName("Tahoma:12")
		self.goldCoinSeTxt.SetHorizontalAlignCenter()
		
		self.silverCoinSeTxt = Component.TextLine(self.silverCoinsBtn, '',9, 20, None)
		self.silverCoinSeTxt.SetFontName("Tahoma:12")
		self.silverCoinSeTxt.SetHorizontalAlignCenter()
		
		
		if _id == 0:
			self.goldCoinSeTxt.SetText('|cffffffff'+localeInfo.ITEMSHOP_SELECTED)
			self.silverCoinSeTxt.SetText('|cffffffff'+localeInfo.ITEMSHOP_SELECT)
		else:
			self.silverCoinSeTxt.SetText('|cffffffff'+localeInfo.ITEMSHOP_SELECTED)
			self.goldCoinSeTxt.SetText('|cffffffff'+localeInfo.ITEMSHOP_SELECT)
		
		
		self.txt01 = Component.TextLine(self, '', 165, 8, None)
		self.txt01.SetFontName("Tahoma:18")
		self.txt01.SetText('|cffc9a63d'+localeInfo.ITEMSHOP_BALANCE)
		self.txt02 = Component.TextLine(self, '', 166, 28, None)
		self.txt02.SetFontName("Tahoma:12")
		self.txt02.SetText('|cfffffffF'+localeInfo.ITEMSHOP_CHANGE_CURRENCY)
		
		self.backPageBtn = Component.NewButton(self, 491, 597, self.backPage, IMG_PATH+"back_page_01.png", IMG_PATH+"back_page_02.png")
		self.nextPageBtn = Component.NewButton(self, 655, 597, self.nextPage, IMG_PATH+"next_page_01.png", IMG_PATH+"next_page_02.png")
		self.currentPageTxt = Component.TextLine(self, '', 582, 599, None)
		self.currentPageTxt.SetFontName("Tahoma:13b")
		self.currentPageTxt.SetText('|cffffffff1')
		self.currentPageTxt.SetHorizontalAlignCenter()
		
		
		self.searchBar = Component.CustomEditLine(self, localeInfo.ITEMSHOP_SEARCH,9,60,196,25,FALSE,6,12)
		self.searchBar.OnMouseLeftButtonDown = ui.__mem_func__(self.__OnSetFocus)
		self.searchBar.OnIMEUpdate = ui.__mem_func__(self.__OnValueUpdate)
		self.searchBar.SetReturnEvent(ui.__mem_func__(self.__OnHideList))
		self.searchBar.SetEscapeEvent(ui.__mem_func__(self.__OnHideList))
		self.dropDown = Component.DropDown(self)
		self.dropDown.SetParent(parent)
		self.dropDown.OnChange=self.OnChange
		self.dropDown.Hide()

		self.categoryBtns = []
		self.SEARCH_ITEMS = []
		self.items = []
		for itm in itemshopnew.GetItems():
			if itemshopnew.GetMainByCategory(itm[4]) == _id:
				item.SelectItem(itm[1])
				add = [item.GetItemName(), itm[0], itm[4]]
				self.SEARCH_ITEMS.append(add)
		
				
		firstId = -1
		i = 0
		for itm in itemshopnew.GetCategoriesByMain(_id):
			color = ""
			if itm[2] == 1:
				color = "red"
			elif itm[2] == 2:
				color = "green"
			elif itm[2] == 3:
				color = "yellow"
			name = itm[1]
			try:
				name = eval("localeInfo.ITEMSHOP_CATEGORY_"+str(itm[0]))
			except:
				dbg.TraceError("WARN! localeInfo.ITEMSHOP_CATEGORY_"+str(itm[0])+" not defined!")
			btn = Component.Button(self, name, '',  7, 90+i*32, lambda arg = itm[0]: self.categorybtn_func(arg), IMG_PATH+"cat_btn_01_"+color+".png", IMG_PATH+"cat_btn_02_"+color+".png", IMG_PATH+"cat_btn_02_"+color+".png")
			btn.colorName = color
			self.categoryBtns.append([itm[0], btn])
			if firstId == -1:
				firstId = itm[0]
			i += 1
		
		self.category_func(firstId)
		
		
	def __del__(self):
		Page.__del__(self)
	
	def Open(self):
		self.RefreshItems()
		self.Show()
	
	def Close(self):
		self.DeleteItems()
		self.Hide()
	
	def RECV_LIMITED_ITEM_COUNT(self, _id, _count):
		for itm in self.items:
			if itm.item_id == _id:
				itm.RECV_LIMITED_ITEM_COUNT(_count)

	def DeleteItems(self):
		for itm in self.items:
			itm.Hide()
			itm = None
		
		self.items = []

	def nextPage(self):
		if self.page == self.pagecount:
			return
		
		self.page += 1
		self.currentPageTxt.SetText('|cffffffff'+str(self.page))
		self.RefreshItems()
		
	def backPage(self):
		if self.page == 1:
			return
		
		self.page -= 1
		self.currentPageTxt.SetText('|cffffffff'+str(self.page))
		self.RefreshItems()
		

	def categorybtn_func(self, i):
		self.parent.OpenMainCategoryPageWithCatID(self.catId, i)
	
	def category_func(self, i):
		self.selectedSubId = i
		self.page = 1
		for btn in self.categoryBtns:
			btn[1].SetUpVisual(IMG_PATH+"cat_btn_01_"+btn[1].colorName+".png")
			if btn[0] == i:
				btn[1].SetUpVisual(IMG_PATH+"cat_btn_02_"+btn[1].colorName+".png")
		self.RefreshItems()
	
	def RefreshItems(self):
		self.DeleteItems()
		
		for btn in self.pageBtns:
			btn.Hide()
			del btn
		
		self.pageBtns = []
		
		x = 0
		coord_x = 216
		coord_y = 54
		catItems = itemshopnew.GetItemsByCategory(self.selectedSubId)
		for itm in catItems:
			if x >= (self.page-1)*8:
				itemTest = Item(self, itm)
				itemTest.SetPosition(coord_x, coord_y)
				self.items.append(itemTest)
				coord_x += 183
				if coord_x >= 216+183*4:
					coord_x = 216
					coord_y += 265
			x += 1
			if x >= (self.page-1)*8+8:
				break
		
		self.pagecount = int(math.ceil(float(len(catItems))/float(8.0)))
		
		if self.pagecount > 1:
			btnIdx = range(max(0, self.page-3), min(self.pagecount, self.page+2))
			minIdx = 440
			maxIdx = 0
			for i in btnIdx:
				minIdx = min(minIdx, i)
				maxIdx = max(maxIdx, i)
				if i != self.page-1:
					btn = Component.ClickableTextLine(self, '', 582+((20)*(i-(self.page-1)))+(-5 if i < self.page-1 else 5 ), 599, None)
					btn.SetFontName("Tahoma:13b")
					btn.SetText('|cffffffff'+str(i+1))
					btn.SetMouseLeftButtonDownEvent(self.OpenPage, i+1)
					if (i < self.page-1):
						btn.SetHorizontalAlignRight()
					self.pageBtns.append(btn)
			
			if minIdx <= self.page-1:
				#dbg.LogBox(str(self.page-minIdx))
				self.backPageBtn.Show()
				self.backPageBtn.SetPosition(491+65+(-20*(self.page-minIdx)), 597)
				if self.page-minIdx == 1:
					self.backPageBtn.Hide()
			if maxIdx >= self.page-1:
				self.nextPageBtn.Show()
				self.nextPageBtn.SetPosition(655-25+(20*(maxIdx-(self.page))), 597)
				if maxIdx-self.page == -1:
					self.nextPageBtn.Hide()
		else:
			self.backPageBtn.Hide()
			self.nextPageBtn.Hide()
	
	
	def OpenPage(self, p):
		self.page = p[0]
		self.currentPageTxt.SetText('|cffffffff'+str(self.page))
		self.RefreshItems()

	def __OnHideList(self):
		self.dropDown.dropped=0
		self.dropDown.Clear()
		self.dropDown.Hide()
	
	def __OnSetFocus(self):
		if self.searchBar.GetText() == localeInfo.ITEMSHOP_SEARCH:
			self.searchBar.SetText("")
		self.searchBar.SetFocus()
		return True
	
	def __OnValueUpdate(self):
		ui.EditLine.OnIMEUpdate(self.searchBar)
		val=self.searchBar.GetText()
    
		if len(val) > 0:
			self.dropDown.Clear()
			self.dropDown.SetPosition(16,112)
			self.dropDown.SetTop()
			resultCount = 0
			added = []
			for searchItem in self.SEARCH_ITEMS:
				vnum = searchItem[1]
				name = searchItem[0]
				cat = searchItem[2]
				if resultCount == 25:
					break
				if len(name)>=len(val) and name[:len(val)].lower() == val.lower(): # Begins with
					self.dropDown.AppendItem(name,vnum,cat)
					added.append(name)
					resultCount+=1
			if resultCount < 25:
				for searchItem in self.SEARCH_ITEMS:
					vnum = searchItem[1]
					name = searchItem[0]
					cat = searchItem[2]
					if name in added:
						continue
					if resultCount == 25:
						break
					if len(name)>=len(val) and name.lower().find(val.lower()) != -1: # Contains
						self.dropDown.AppendItem(name,vnum,cat)
						resultCount+=1
			if resultCount>0:
				if self.dropDown.dropped==0:
					self.dropDown.Clear()
					self.dropDown.ExpandMe()
				self.dropDown.Show()
				self.dropDown.SetPosition(16,112)
				self.dropDown.SetTop()
				return
		self.__OnHideList()
	
	def OnChange(self):
		_id = self.dropDown.DropList.GetSelectedItem().vnum
		_cat = self.dropDown.DropList.GetSelectedItem().type
		
		self.dropDown.Clear()
		self.dropDown.Hide()
		
		self.searchBar.KillFocus()
		self.searchBar.SetText(localeInfo.ITEMSHOP_SEARCH)
		
		self.parent.OpenMainCategoryPageWithItemID(self.catId, _cat, _id)
	
	def GotoItem(self, _cat, _id):
		self.category_func(_cat)
		idx = 0
		allItems = itemshopnew.GetItemsByCategory(self.selectedSubId)
		for itm in allItems:
			idx += 1
			if itm[0] == _id:
				break
		
		count = int(math.ceil(float(idx)/float(8)))
		for i in xrange(count-1):
			self.nextPage()
	
	def GotoCat(self, _cat):
		self.category_func(_cat)
	
	def OnUpdate(self):
		if self.gold != itemshopnew.GetGoldCoins():
			self.gold = itemshopnew.GetGoldCoins()
			self.goldCoinTxt.SetText('|cffc9a63d'+str(self.gold))
		
		if self.silver != itemshopnew.GetSilverCoins():
			self.silver = itemshopnew.GetSilverCoins()
			self.silverCoinTxt.SetText('|cff3f8da9'+str(self.silver))
		
		for itm in self.items:
			itm.OnUpdate()

class Itemshop(ui.BoardWithTitleBar):
	currentPage = None
	buyBtn = None
	def __init__(self):
		ui.BoardWithTitleBar.__init__(self)
		self.SetSize(966, 670)
		self.SetCenterPosition()
		self.AddFlag('movable')
		self.AddFlag('float')
		self.SetTitleName(localeInfo.ITEMSHOP_TITLE)
		self.SetCloseEvent(self.Close)
		self.Show()
		
		self.OpenMainCategoryPage(0)
		
	def __del__(self):
		ui.BoardWithTitleBar.__del__(self)
		currentPage = None	
	
	def buy_func(self):
		import subprocess
		subprocess.Popen('start '+COINS_URL, shell=True)

	def RECV_LIMITED_ITEM_COUNT(self, _id, _count):
		if self.currentPage != None:
			self.currentPage.RECV_LIMITED_ITEM_COUNT(_id, _count)
	
	def OpenMainCategoryPage(self, _id):
		self.SetPage(MainCategoryPage(self, _id))
	
	def OpenMainCategoryPageWithItemID(self, _id, _cat, _itemid):
		p = MainCategoryPage(self, _id)
		self.SetPage(p)
		p.GotoItem(_cat, _itemid)	
		
	def OpenMainCategoryPageWithCatID(self, _id, _cat):
		p = MainCategoryPage(self, _id)
		self.SetPage(p)
		p.category_func(_cat)
	
	def SetPage(self, page):
		if self.currentPage != None:
			self.currentPage.Close()
			del self.currentPage
		self.currentPage = page
		self.currentPage.Open()
		if self.buyBtn:
			del self.buyBtn
		self.buyBtn = Component.NewButton(self, 768, 41, self.buy_func, IMG_PATH+'buy_coins_01.png', IMG_PATH+'buy_coins_02.png', 'GIVE ME YOUR MONEY')
		self.buyBtn.text.SetFontName("Tahoma:13b")
		self.buyBtn.text.SetText('|cffffffff'+localeInfo.ITEMSHOP_PURCHASE_COINS)
		
		self.buyBtn.SetTextPosition(self.buyBtn.GetWidth()/2-self.buyBtn.text.GetTextWidth()/2,9)

	def OpenWindow(self):
		if self.IsShow():
			self.Hide()
		else:
			self.Show()
			self.OpenMainCategoryPage(0)
	
	def Close(self):
		self.Hide()
	
	def OnUpdate(self):
		if self.currentPage != None:
			self.currentPage.OnUpdate()

