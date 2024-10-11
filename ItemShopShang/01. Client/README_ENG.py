### interfaceModule.py ###

# 1) Search for: import uiScriptLocale
# 2) Make a new line and under paste this:

import uiItemShop

# 1) Search for:
"""
		self.dlgShop = uiShop.ShopDialog()
		self.dlgShop.LoadDialog()
		self.dlgShop.Hide()
"""
# on def __MakeDialogs(self):
# 2) Make a new line and under paste this:

		self.wndItemShop = uiItemShop.ItemShopWindow()
		self.wndItemShop.Hide()
		
# 1) Search for:
"""
		if self.dlgShop:
			self.dlgShop.Destroy()
"""
# on def Close(self):
# 2) Make a new line and under paste this:

		if self.wndItemShop:
			self.wndItemShop.Destroy()
			
# 1) Search for: del self.wndItemSelect
# 2) Make a new line and under paste this:

		del self.wndItemShop
		
############################
############################

### constInfo.py ###

# 1) Search for: isItemDropQuestionDialog = 0
# 2) Make a new line and under paste this:

ItemShop = {
	'QID' : 0,
	'QCMD' : '',
	'ITEMS' : {
		'itemshop' : {},
		'drs_shop' : {},
		'3rd_shop' : {},
		'mostBought' : [],
		'hotOffers' : [],
	},
	'LOGS' : [],
	'WOD' : [[],[]]
}

############################
############################
### game.py ###

# 1) Search for en el def __ServerCommand_Build
"""
			"mall"					: self.__InGameShop_Show,
"""
# 2) Make a new line and under paste this:

			"ITEMSHOP"				: self.ManagerItemshop,
			
# 1) Search for:
"""
	def __InGameShop_Show(self, url):
		if constInfo.IN_GAME_SHOP_ENABLE:
			self.interface.OpenWebWindow(url)
"""
# 2) Make a new line and under paste this:

	def ManagerItemshop(self, cmd):
		cmd = cmd.split('#')
		if cmd[0] == 'QID':
			constInfo.ItemShop['QID'] = int(cmd[1])
		elif cmd[0] == 'INPUT':
			constInfo.INPUT_IGNORE = int(cmd[1])
		elif cmd[0] == 'SEND':
			net.SendQuestInputStringPacket(str(constInfo.ItemShop['QCMD']))
			constInfo.ItemShop['QCMD'] = ''
		elif cmd[0] == 'CREATE_CATEGORY':
			constInfo.ItemShop['ITEMS'][cmd[1]][int(cmd[2])] = []
		elif cmd[0] == 'SET_ITEM':
			constInfo.ItemShop['ITEMS'][cmd[1]][int(cmd[2])].append([int(cmd[3]), int(cmd[4]), int(cmd[5]), [(int(cmd[6]), int(cmd[7])), (int(cmd[8]), int(cmd[9])), (int(cmd[10]), int(cmd[11])), (int(cmd[12]), int(cmd[13])), (int(cmd[14]), int(cmd[15])), (int(cmd[16]), int(cmd[17])), (int(cmd[18]), int(cmd[19]))], [int(cmd[20]), int(cmd[21]), int(cmd[22])], int(cmd[23]), int(cmd[24]), int(cmd[25])])
		elif cmd[0] == 'CLEAR_CONTENT':
			constInfo.ItemShop['ITEMS']['mostBought'] = []
			constInfo.ItemShop['ITEMS']['hotOffers'] = []
		elif cmd[0] == 'SET_ITEM_MOSTBOUGHT':
			constInfo.ItemShop['ITEMS']['mostBought'].append([int(cmd[1]), int(cmd[2]), int(cmd[3]), [(int(cmd[4]), int(cmd[5])), (int(cmd[6]), int(cmd[7])), (int(cmd[8]), int(cmd[9])), (int(cmd[10]), int(cmd[11])), (int(cmd[12]), int(cmd[13])), (int(cmd[14]), int(cmd[15])), (int(cmd[16]), int(cmd[17]))], [int(cmd[17]), int(cmd[19]), int(cmd[20])], int(cmd[21]), int(cmd[22]), int(cmd[23])])
		elif cmd[0] == 'SET_ITEM_HOTOFFERS':
			constInfo.ItemShop['ITEMS']['hotOffers'].append([int(cmd[1]), int(cmd[2]), int(cmd[3]), [(int(cmd[4]), int(cmd[5])), (int(cmd[6]), int(cmd[7])), (int(cmd[8]), int(cmd[9])), (int(cmd[10]), int(cmd[11])), (int(cmd[12]), int(cmd[13])), (int(cmd[14]), int(cmd[15])), (int(cmd[16]), int(cmd[17]))], [int(cmd[17]), int(cmd[19]), int(cmd[20])], int(cmd[21]), int(cmd[22]), int(cmd[23])])
		elif cmd[0] == 'SET_LOG':
			constInfo.ItemShop['LOGS'].append([int(cmd[1]), int(cmd[2]), int(cmd[3]), cmd[4], [(int(cmd[5]), int(cmd[6])), (int(cmd[7]), int(cmd[8])), (int(cmd[9]), int(cmd[10])), (int(cmd[11]), int(cmd[12])), (int(cmd[13]), int(cmd[14])), (int(cmd[15]), int(cmd[16])), (int(cmd[17]), int(cmd[18]))], [int(cmd[19]), int(cmd[20]), int(cmd[21])]])
		elif cmd[0] == 'SEND_COINS':
			constInfo.COINS_DRS = [int(cmd[1]), int(cmd[2])]
		elif cmd[0] == 'SEND_3RD_SHOP_COIN':
			self.interface.wndItemShop.Set3rdCoins(int(cmd[1]))
		elif cmd[0] == 'ALLOW_SPIN_WHEEL':
			self.interface.wndItemShop.SpinWheel()
		elif cmd[0] == 'CLEAR_WHEEL_CONTENT':
			constInfo.ItemShop['WOD'] = [[], []]
		elif cmd[0] == 'SET_WHEEL_PRIZE':
			prize = cmd[2].split(',')
			if cmd[1] == 'G':
				for i in xrange(len(prize)-1):
					constInfo.ItemShop['WOD'][1].append(int(prize[i]))
			elif cmd[1] == 'B':
				for i in xrange(len(prize)-1):
					constInfo.ItemShop['WOD'][0].append(int(prize[i]))
		elif cmd[0] == 'OPEN':
			self.interface.wndItemShop.Open(int(cmd[1]))
		elif cmd[0] == 'REFRESH_CONTENT':
			self.interface.wndItemShop.RefreshWindow()

############################
############################

### ui.py ###

# 1) Search for:
"""
class NumberLine(window):
	...
"""
# after all the class
# 2) Make a new line and under paste this:

class ResizableTextValue(Window):

	BACKGROUND_COLOR = grp.GenerateColor(0.0, 0.0, 0.0, 1.0)
	LINE_COLOR = grp.GenerateColor(0.4, 0.4, 0.4, 1.0)
	
	def __init__(self, layer = "UI"):
		Window.__init__(self, layer)
		
		self.isBackground = TRUE
		self.LineText = None
		self.ToolTipText = None
		
		self.width = 0
		self.height = 0
		self.lines = []
		
	def __del__(self):
		Window.__del__(self)
		
	def SetSize(self, width, height):
		Window.SetSize(self, width, height)
		self.width = width
		self.height = height
		
	def SetToolTipText(self, tooltiptext, x = 0, y = 0):
		if not self.ToolTipText:		
			toolTip=createToolTipWindowDict["TEXT"]()
			toolTip.SetParent(self)
			toolTip.SetSize(0, 0)
			toolTip.SetHorizontalAlignCenter()
			toolTip.SetOutline()
			toolTip.Hide()
			toolTip.SetPosition(x + self.GetWidth()/2, y-20)
			self.ToolTipText=toolTip

		self.ToolTipText.SetText(tooltiptext)
		
	def SetText(self, text):
		if not self.LineText:
			textLine = TextLine()
			textLine.SetParent(self)
			textLine.SetPosition(self.GetWidth()/2, (self.GetHeight()/2)-1)
			textLine.SetVerticalAlignCenter()
			textLine.SetHorizontalAlignCenter()
			textLine.SetOutline()
			textLine.Show()
			self.LineText = textLine

		self.LineText.SetText(text)
		
	def SetTextColor(self, color):
		if not self.LineText:
			return
		self.LineText.SetPackedFontColor(color)
		
	def GetText(self):
		if not self.LineText:
			return
		return self.LineText.GetText()
		
	def SetLineColor(self, color):
		self.LINE_COLOR = color
		
	def SetLine(self, line_value):
		self.lines.append(line_value)
		
	def SetBackgroundColor(self, color):
		self.BACKGROUND_COLOR = color
		
	def SetNoBackground(self):
		self.isBackground = FALSE
	
	def OnRender(self):
		xRender, yRender = self.GetGlobalPosition()
		
		widthRender = self.width
		heightRender = self.height
		if self.isBackground:
			grp.SetColor(self.BACKGROUND_COLOR)
			grp.RenderBar(xRender, yRender, widthRender, heightRender)
		grp.SetColor(self.LINE_COLOR)
		if 'top' in self.lines:
			grp.RenderLine(xRender, yRender, widthRender, 0)
		if 'left' in self.lines:
			grp.RenderLine(xRender, yRender, 0, heightRender)
		if 'bottom' in self.lines:
			grp.RenderLine(xRender, yRender+heightRender, widthRender+1, 0)
		if 'right' in self.lines:	
			grp.RenderLine(xRender+widthRender, yRender, 0, heightRender)

class CoolButton(Window):
	
	BACKGROUND_COLOR = grp.GenerateColor(0.0, 0.0, 0.0, 1.0)
	DARK_COLOR = grp.GenerateColor(0.4, 0.4, 0.4, 1.0)
	
	WHITE_COLOR = grp.GenerateColor(1.0, 1.0, 1.0, 0.3)
	HALF_WHITE_COLOR = grp.GenerateColor(1.0, 1.0, 1.0, 0.2)
	
	def __init__(self, layer = "UI"):
		Window.__init__(self, layer)

		self.eventFunc = None
		self.eventArgs = None

		self.ButtonText = None
		self.ToolTipText = None
		
		self.EdgeColor = None
		self.isOver = FALSE
		self.isSelected = FALSE
		
		self.width = 0
		self.height = 0		

	def __del__(self):
		Window.__del__(self)

		self.eventFunc = None
		self.eventArgs = None

	def SetSize(self, width, height):
		Window.SetSize(self, width, height)
		self.width = width
		self.height = height
		
	def SetEvent(self, func, *args):
		self.eventFunc = func
		self.eventArgs = args

	def SetTextColor(self, color):
		if not self.ButtonText:
			return
		self.ButtonText.SetPackedFontColor(color)
		
	def SetEdgeColor(self, color):
		self.EdgeColor = color

	def SetText(self, text):
		if not self.ButtonText:
			textLine = TextLine()
			textLine.SetParent(self)
			textLine.SetPosition(self.GetWidth()/2, self.GetHeight()/2)
			textLine.SetVerticalAlignCenter()
			textLine.SetHorizontalAlignCenter()
			textLine.SetOutline()
			textLine.Show()
			self.ButtonText = textLine

		self.ButtonText.SetText(text)

	def SetToolTipText(self, text, x=0, y = -19):
		if not self.ToolTipText:		
			toolTip=createToolTipWindowDict["TEXT"]()
			toolTip.SetParent(self)
			toolTip.SetSize(0, 0)
			toolTip.SetHorizontalAlignCenter()
			toolTip.SetOutline()
			toolTip.Hide()
			toolTip.SetPosition(x + self.GetWidth()/2, y)
			self.ToolTipText=toolTip

		self.ToolTipText.SetText(text)

	def ShowToolTip(self):
		if self.ToolTipText:
			self.ToolTipText.Show()

	def HideToolTip(self):
		if self.ToolTipText:
			self.ToolTipText.Hide()
			
	def SetTextPosition(self, width):
		self.ButtonText.SetPosition(width, self.GetHeight()/2)
		self.ButtonText.SetHorizontalAlignLeft()
		
	def Enable(self):
		wndMgr.Enable(self.hWnd)

	def Disable(self):
		wndMgr.Disable(self.hWnd)
		
	def OnMouseLeftButtonDown(self):
		self.isSelected = TRUE
		
	def OnMouseLeftButtonUp(self):
		self.isSelected = FALSE
		if self.eventFunc:
			apply(self.eventFunc, self.eventArgs)

	def OnUpdate(self):
		if self.IsIn():
			self.isOver = TRUE
			self.ShowToolTip()
		else:
			self.isOver = FALSE
			self.HideToolTip()

	def OnRender(self):
		xRender, yRender = self.GetGlobalPosition()
		
		widthRender = self.width
		heightRender = self.height
		grp.SetColor(self.BACKGROUND_COLOR)
		grp.RenderBar(xRender, yRender, widthRender, heightRender)
		if self.EdgeColor:
			grp.SetColor(self.EdgeColor)
		else:
			grp.SetColor(self.DARK_COLOR)
		grp.RenderLine(xRender, yRender, widthRender, 0)
		grp.RenderLine(xRender, yRender, 0, heightRender)
		grp.RenderLine(xRender, yRender+heightRender, widthRender, 0)
		grp.RenderLine(xRender+widthRender, yRender, 0, heightRender)

		if self.isOver:
			grp.SetColor(self.HALF_WHITE_COLOR)
			grp.RenderBar(xRender + 2, yRender + 2, self.width - 3, heightRender - 3)

			if self.isSelected:
				grp.SetColor(self.WHITE_COLOR)
				grp.RenderBar(xRender + 2, yRender + 2, self.width - 3, heightRender - 3)
			
class ResizableButtonWithImage(Window):
	
	BACKGROUND_COLOR = grp.GenerateColor(0.0, 0.0, 0.0, 1.0)
	DARK_COLOR = grp.GenerateColor(0.4, 0.4, 0.4, 1.0)
	
	WHITE_COLOR = grp.GenerateColor(1.0, 1.0, 1.0, 0.3)
	HALF_WHITE_COLOR = grp.GenerateColor(1.0, 1.0, 1.0, 0.2)
	
	def __init__(self, layer = "UI"):
		Window.__init__(self, layer)

		self.eventFunc = None
		self.eventArgs = None

		self.ButtonText = None
		self.ToolTipText = None
		self.ButtonImage = None
		
		self.isOver = FALSE
		self.isSelected = FALSE
		
		self.width = 0
		self.height = 0		

	def __del__(self):
		Window.__del__(self)

		self.eventFunc = None
		self.eventArgs = None

	def SetSize(self, width, height):
		Window.SetSize(self, width, height)
		self.width = width
		self.height = height
		
	def SetEvent(self, func, *args):
		self.eventFunc = func
		self.eventArgs = args

	def SetTextColor(self, color):
		if not self.ButtonText:
			return
		self.ButtonText.SetPackedFontColor(color)

	def SetText(self, text):
		if not self.ButtonText:
			textLine = TextLine()
			textLine.SetParent(self)
			textLine.SetPosition(12, self.GetHeight()/2)
			textLine.SetVerticalAlignCenter()
			textLine.SetHorizontalAlignCenter()
			textLine.SetWindowHorizontalAlignCenter()
			textLine.SetOutline()
			textLine.Show()
			self.ButtonText = textLine

		self.ButtonText.SetText(text)
		self.ButtonText.SetHorizontalAlignCenter()
		self.ButtonText.SetWindowHorizontalAlignCenter()

	def SetToolTipText(self, text, x=0, y = -19):
		if not self.ToolTipText:		
			toolTip=createToolTipWindowDict["TEXT"]()
			toolTip.SetParent(self)
			toolTip.SetSize(0, 0)
			toolTip.SetHorizontalAlignCenter()
			toolTip.SetOutline()
			toolTip.Hide()
			toolTip.SetPosition(x + self.GetWidth()/2, y)
			self.ToolTipText=toolTip

		self.ToolTipText.SetText(text)
		
	def SetImage(self, img):
		if not self.ButtonImage:
			image = ExpandedImageBox()
			image.SetParent(self)
			image.SetPosition(6, self.GetHeight()/2)
			image.Show()
			self.ButtonImage = image
		self.ButtonImage.LoadImage(img)
		self.ButtonImage.SetPosition(6, ((self.GetHeight() - self.ButtonImage.GetHeight())/2)+1)
		
	def SetTextPosition(self, x, y = 0, align = FALSE):
		if y == 0:
			self.ButtonText.SetPosition(x, self.GetHeight()/2)
		else:
			self.ButtonText.SetPosition(x, y)
		if align:
			self.ButtonText.SetWindowHorizontalAlignLeft()
			self.ButtonText.SetHorizontalAlignLeft()

	def ShowToolTip(self):
		if self.ToolTipText:
			self.ToolTipText.Show()

	def HideToolTip(self):
		if self.ToolTipText:
			self.ToolTipText.Hide()
		
	def OnMouseLeftButtonDown(self):
		self.isSelected = TRUE
		
	def OnMouseLeftButtonUp(self):
		self.isSelected = FALSE
		if self.eventFunc:
			apply(self.eventFunc, self.eventArgs)

	def OnUpdate(self):
		if self.IsIn():
			self.isOver = TRUE
			self.ShowToolTip()
		else:
			self.isOver = FALSE
			self.HideToolTip()

	def OnRender(self):
		xRender, yRender = self.GetGlobalPosition()
		
		widthRender = self.width
		heightRender = self.height
		grp.SetColor(self.BACKGROUND_COLOR)
		grp.RenderBar(xRender, yRender, widthRender, heightRender)
		grp.SetColor(self.DARK_COLOR)
		grp.RenderLine(xRender, yRender, widthRender, 0)
		grp.RenderLine(xRender, yRender, 0, heightRender)
		grp.RenderLine(xRender, yRender+heightRender, widthRender, 0)
		grp.RenderLine(xRender+widthRender, yRender, 0, heightRender)

		if self.isOver:
			grp.SetColor(self.HALF_WHITE_COLOR)
			grp.RenderBar(xRender + 2, yRender + 2, self.width - 3, heightRender - 3)

			if self.isSelected:
				grp.SetColor(self.WHITE_COLOR)
				grp.RenderBar(xRender + 2, yRender + 2, self.width - 3, heightRender - 3)
				
# 1) Search for: class EditLine(TextLine):
#Inside of class EditLine(TextLine):
"""
	self.eventKillFocus = None
"""
# 2) Make a new line and paste this:

		self.CanClick = None

#WARNING! There are 2		
#Continue in class EditLine(TextLine)
# 1) Search for:
"""
	def SetTabEvent(self, event):
		self.eventTab = event
"""
# under this def
# 2) Make a new line and paste this:

	def CanEdit(self, flag):
		self.CanClick = flag

#Continue in class EditLine(TextLine)
# 1) Search for:
"""
	def OnMouseLeftButtonDown(self):
		...
"""
# Below this:
"""
		if FALSE == self.IsIn():
			return FALSE
"""
# 2) Make a new line and paste this:
		if FALSE == self.CanClick:
			return

# Should be this under it: self.SetFocus()
			
# 1) Search for:
"""
			elif Type == "listbox":
				parent.Children[Index] = ListBox()
				parent.Children[Index].SetParent(parent)
				self.LoadElementListBox(parent.Children[Index], ElementValue, parent)
"""
# 2) Make a new line and under paste this:

			elif Type == "resizable_text_value":
				parent.Children[Index] = ResizableTextValue()
				parent.Children[Index].SetParent(parent)
				self.LoadElementResizableTextValue(parent.Children[Index], ElementValue, parent)

			elif Type == "resizable_button_with_image":
				parent.Children[Index] = ResizableButtonWithImage()
				parent.Children[Index].SetParent(parent)
				self.LoadElementResizableButtonWithImage(parent.Children[Index], ElementValue, parent)
				
# 1) Search for:
"""
	def LoadElementButton(self):
		...
"""
# after all the function
# 2) Make a new line and under paste this:

	def LoadElementResizableTextValue(self, window, value, parentWindow):

		if value.has_key("width") and value.has_key("height"):
			window.SetSize(int(value["width"]), int(value["height"]))

		if TRUE == value.has_key("text"):
			window.SetText(value["text"])
			
		if value.has_key("line_color"):
			window.SetLineColor(value["line_color"])
			
		if value.has_key("color"):
			window.SetBackgroundColor(value["color"])
			
		if value.has_key("line_top"):
			window.SetLine('top')
		if value.has_key("line_bottom"):
			window.SetLine('bottom')
		if value.has_key("line_left"):
			window.SetLine('left')
		if value.has_key("line_right"):
			window.SetLine('right')
			
		if value.has_key('all_lines'):
			window.SetLine('top')
			window.SetLine('bottom')
			window.SetLine('left')
			window.SetLine('right')
			
		if value.has_key('without_background'):
			window.SetNoBackground()
			
		if value.has_key("text"):
			window.SetText(value["text"])

		self.LoadDefaultData(window, value, parentWindow)

		return TRUE
		
	def LoadElementResizableButtonWithImage(self, window, value, parentWindow):

		if value.has_key("width") and value.has_key("height"):
			window.SetSize(int(value["width"]), int(value["height"]))

		if TRUE == value.has_key("text"):
			window.SetText(value["text"])
			
		if TRUE == value.has_key("text_x") and value.has_key("text_y"):
			if value.has_key("text_align"):
				window.SetTextPosition(int(value["text_x"]), int(value["text_y"]), TRUE)
			else:
				window.SetTextPosition(int(value["text_x"]), int(value["text_y"]))

		if value.has_key("text_color"):
			window.SetTextColor(value["text_color"])

		if TRUE == value.has_key("tooltip_text"):
			window.SetToolTipText(value["tooltip_text"])
			
		if value.has_key("image"):
			window.SetImage(value["image"])

		self.LoadDefaultData(window, value, parentWindow)

############################
############################

# 1) To open the itemshop window use this function:

def OpenIShopWindow(self):
	constInfo.ItemShop['QCMD'] = 'OPEN_SHOP#'
	event.QuestButtonClick(constInfo.ItemShop['QID'])

