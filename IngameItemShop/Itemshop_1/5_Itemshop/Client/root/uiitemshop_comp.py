

import ui
import dbg
import app
import grp

class NewButton(ui.ExpandedImageBox):
	hiddenWindow = None
	normalImage = ""
	hoverImage = ""
	tmpImage = ""
	textPositionX = -1
	textPositionY = -1
	
	def __init__(self):
		ui.ExpandedImageBox.__init__(self)
		self.hiddenWindow = ui.Window()
		self.hiddenWindow.Show()
		
		self.color = (1.0, 1.0, 1.0)
		
		self.hiddenWindow.SetOverInEvent(self.OverIn)
		self.hiddenWindow.SetOverOutEvent(self.OverOut)

		self.text = ui.TextLine()
		self.text.SetParent(self)
		self.text.Show()
	
	def __del__(self):
		ui.ExpandedImageBox.__del__(self)
	
	def SetParent(self, arg):
		ui.ExpandedImageBox.SetParent(self, arg)
		self.hiddenWindow.SetParent(arg)
	
	def SetPosition(self, x, y):
		ui.ExpandedImageBox.SetPosition(self, x, y)
		self.hiddenWindow.SetPosition(x, y)
		self.hiddenWindow.SetTop()

	def SetNormalImage(self, img):
		self.normalImage = img
		self.LoadImage(img)
		
	def SetHoverImage(self, img):
		self.hoverImage = img	
	
	def SetText(self, text):
		self.text.SetText(text)
		self.text.SetPosition((self.GetWidth()/2-self.text.GetTextWidth()/2), (self.GetHeight()/2-self.text.GetTextHeight()/2))
	
	def Disable(self):
		self.tmpImage = self.normalImage
		self.normalImage = self.hoverImage
		self.LoadImage(self.normalImage)
		
	def Enable(self):
		self.normalImage = self.tmpImage
		self.tmpImage = ""
		self.LoadImage(self.normalImage)
	
	def OverIn(self):
		self.LoadImage(self.hoverImage)
	
	def OverOut(self):
		self.LoadImage(self.normalImage)
	
	def SetMouseLeftButtonDownEvent(self, event):
		self.hiddenWindow.SetMouseLeftButtonDownEvent(event)
	
	def LoadImage(self, img):
		ui.ExpandedImageBox.LoadImage(self, img)
		x = self.GetWidth()
		y = self.GetHeight()
		self.hiddenWindow.SetSize(x, y)
		if self.textPositionX == -1 and self.textPositionY == -1:
			self.text.SetPosition((self.GetWidth()/2-self.text.GetTextWidth()/2),  (self.GetHeight()/2-self.text.GetTextHeight()/2))
		else:
			self.text.SetPosition(self.textPositionX, self.textPositionY)
		r,g,b = self.color
		self.SetDiffuseColor(r,g,b)
	
	def SetDiffuseColor(self, r, g, b):
		ui.ExpandedImageBox.SetDiffuseColor(self, r, g, b)
		self.color = (r,g,b)
	
	def SetTextPosition(self, x,y):
		self.textPositionX = x
		self.textPositionY = y
		self.text.SetPosition(x, y)

class ClickableTextLine(ui.TextLine):
	hiddenWindow = None
	def __init__(self):
		ui.TextLine.__init__(self)
		self.hiddenWindow = ui.Window()
		self.hiddenWindow.Show()
	
	def __del__(self):
		ui.TextLine.__del__(self)
	
	def HideHiddenWindow(self):
		self.hiddenWindow.Hide()
	
	def ShowHiddenWindow(self):
		self.hiddenWindow.Show()
	
	def SetParent(self, arg):
		ui.TextLine.SetParent(self, arg)
		self.hiddenWindow.SetParent(arg)
	
	def SetPosition(self, x, y):
		ui.TextLine.SetPosition(self, x, y)
		self.hiddenWindow.SetPosition(x, y)
		self.hiddenWindow.SetTop()
		
	def SetMouseLeftButtonDownEvent(self, event, *args):
		self.hiddenWindow.SetMouseLeftButtonDownEvent(event, args)
		
	def SetMouseRightButtonDownEvent(self, event, *args):
		self.hiddenWindow.SetMouseRightButtonDownEvent(event, args)
		
	def SetOverInEvent(self, event, *args):
		self.hiddenWindow.SetOverInEvent(event, args)
		
	def SetOverOutEvent(self, event, *args):
		self.hiddenWindow.SetOverOutEvent(event, args)
	
	def SetHorizontalAlignRight(self):
		ui.TextLine.SetHorizontalAlignRight(self)
		x, y = self.GetLocalPosition()
		self.hiddenWindow.SetPosition(x-5, y)
	
	def SetText(self, text):
		ui.TextLine.SetText(self, text)
		(x, y) = self.GetTextSize()
		self.hiddenWindow.SetSize(x, y)

class HoverableExpandedImage(ui.ExpandedImageBox):
	hiddenWindow = None
	def __init__(self):
		ui.ExpandedImageBox.__init__(self)
		self.hiddenWindow = ui.Window()
		self.hiddenWindow.Show()
	
	def __del__(self):
		ui.ExpandedImageBox.__del__(self)
	
	def SetParent(self, arg):
		ui.ExpandedImageBox.SetParent(self, arg)
		self.hiddenWindow.SetParent(arg)
	
	def SetPosition(self, x, y):
		ui.ExpandedImageBox.SetPosition(self, x, y)
		self.hiddenWindow.SetPosition(x, y)
		self.hiddenWindow.SetTop()
		
	
	def SetMouseLeftButtonDownEvent(self, event, *args):
		self.hiddenWindow.SetMouseLeftButtonDownEvent(event, args)
		
	def SetOverInEvent(self, event, *args):
		self.hiddenWindow.SetOverInEvent(event, args)
		
	def SetOverOutEvent(self, event, *args):
		self.hiddenWindow.SetOverOutEvent(event, args)
	
	def SetWindowVerticalAlignCenter(self):
		self.hiddenWindow.SetWindowVerticalAlignCenter()
		ui.ExpandedImageBox.SetWindowVerticalAlignCenter(self)
	
	def LoadImage(self, img):
		ui.ExpandedImageBox.LoadImage(self, img)
		x = self.GetWidth()
		y = self.GetHeight()
		self.hiddenWindow.SetSize(x, y)

class CustomEditLine2(ui.EditLine):
	def __init__(self,parent,text,x,y,width,height,number=FALSE,slot=2,max = 12):
		ui.EditLine.__init__(self)
		self.imageSlot=ui.MakeImageBox(parent, "itemshop/searchbar.png", x,y)
		self.SetText(text)
		self.main = text
		self.SetEscapeEvent(self.OnPressEscapeKey)
		self.SetMax(max)
		self.SetUserMax(max)
		self.SetParent(self.imageSlot)
		if number:
			self.SetNumberMode()
		
		self.SetSize(width,height)
		self.SetPosition(5,8)
		self.Show()
		
	def OnPressEscapeKey(self):
		pass
	
	def __del__(self):
		ui.EditLine.__del__(self)

class DropDown2(ui.Window):
	dropped  = 0
	dropstat = 0
	width = 0
	height = 0
	maxh = 30
	OnChange = None
	class Item(ui.Window):
		TEMPORARY_PLACE = 0
		width = 0
		height = 0
		def __init__(self,parent, text,vnum=0,type=0):
			ui.Window.__init__(self)
			self.textBox=ui.MakeTextLine(self)
			self.textBox.SetText(text)
			self.vnum = int(vnum)
			self.type = type

		def __del__(self):
			ui.Window.__del__(self)

		def SetParent(self, parent):
			ui.Window.SetParent(self, parent)
			self.parent=parent

		def OnMouseLeftButtonDown(self):
			self.parent.SelectItem(self)

		def SetSize(self,w,h):
			ui.Window.SetSize(self,w,h)
			self.width = w
			self.height = h
		def OnUpdate(self):	
			if self.IsIn():
				self.isOver = True
			else:
				self.isOver = False
		def OnRender(self):
			xRender, yRender = self.GetGlobalPosition()
			yRender -= self.TEMPORARY_PLACE
			widthRender = self.width
			heightRender = self.height + self.TEMPORARY_PLACE*2
			grp.SetColor(ui.BACKGROUND_COLOR)
			grp.RenderBar(xRender, yRender, widthRender, heightRender)
			grp.SetColor(ui.DARK_COLOR)
			grp.RenderLine(xRender, yRender, widthRender, 0)
			grp.RenderLine(xRender, yRender, 0, heightRender)
			grp.SetColor(ui.BRIGHT_COLOR)
			grp.RenderLine(xRender, yRender+heightRender, widthRender, 0)
			grp.RenderLine(xRender+widthRender, yRender, 0, heightRender)

			if self.isOver:
				grp.SetColor(ui.HALF_WHITE_COLOR)
				grp.RenderBar(xRender + 2, yRender + 3, self.width - 3, heightRender - 5)

	
	def __init__(self,parent):
		ui.Window.__init__(self,"TOP_MOST")
		self.down = 1
		self.parent=parent
	
		
		self.DropList = ui.ListBoxEx()
		self.DropList.SetParent(self)
		self.DropList.itemHeight = 20
		self.DropList.itemWidth = 196
		self.DropList.itemStep = 18
		self.DropList.SetPosition(0,0)
		self.DropList.SetSize(196,2) 
		self.DropList.SetSelectEvent(self.SetTitle)
		self.DropList.SetViewItemCount(0)
		self.DropList.Show()
		self.selected = self.DropList.GetSelectedItem()
		
		self.SetSize(196,95)
	
	def __del__(self): 
		ui.Window.__del__(self)
		
	def AppendItem(self,text,vnum=0,type=0):  
		self.DropList.AppendItem(self.Item(self,text,vnum,type))
	
	def OnPressEscapeKey(self):		
		self.Hide()
		self.Clear()
				
	def SetTitle(self,item):
		self.dropped = 0
		self.selected = item
		if self.OnChange:
			self.OnChange()
		self.Clear()		
		
	def SetSize(self,w,h):
		ui.Window.SetSize(self,w,h+10)
		self.width = w
		self.height = h
		self.DropList.SetSize(w,h)

	def Clear(self):
		for x in self.DropList.itemList:
			x.Hide()
		self.DropList.RemoveAllItems()

	def ExpandMe(self):
		if self.dropped == 1:
			self.dropped = 0
		else:
			self.dropped = 1
	
	def SetTop(self):
		ui.Window.SetTop(self)
		self.DropList.SetTop()
		for x in self.DropList.itemList:
			x.SetTop()
	
	def OnUpdate(self):
		(w,h) = self.parent.GetLocalPosition()
		self.maxh =self.DropList.itemStep*len(self.DropList.itemList)
		if self.dropped == 0 or not self.parent.IsShow() or len(self.DropList.itemList)==0:
			self.SetSize(self.GetWidth(),0)
			self.DropList.SetViewItemCount(0)
			self.Hide()
		elif self.dropped == 1:
			self.Show()
			self.SetTop()
			height = self.maxh+5 if int(self.maxh/self.DropList.itemStep) <2 else self.maxh
			self.SetSize(self.GetWidth(),height)
			self.DropList.SetViewItemCount(self.maxh/self.DropList.itemStep)



class Component:
	@staticmethod
	def CustomEditLine(parent,text,x,y,width,height,number=FALSE,slot=2,max = 12):
		cEditLine = CustomEditLine2(parent,text,x,y,width,height,number,slot,max)
		return cEditLine
	
	@staticmethod
	def DropDown(parent):
		dropdown = DropDown2(parent)
		return dropdown
	
	@staticmethod
	def SlotWindow( parent, x, y, slotsize=32):
		slotWindow = ui.SlotWindow()
		if parent != None:
			slotWindow.SetParent(parent)
		slotWindow.SetPosition(x, y)
		slotWindow.SetSize(32, slotsize)
		slotWindow.AppendSlot(0,0,0,32, slotsize)
		slotWindow.Show()
		return slotWindow
	
	@staticmethod
	def GridSlotWindow( parent, x, y, xSlots, ySlots):
		slotWindow = ui.GridSlotWindow()
		if parent != None:
			slotWindow.SetParent(parent)
		slotWindow.SetPosition(x, y)
		slotWindow.SetSize(32*xSlots, 32*ySlots)
		slotWindow.ArrangeSlot(0, xSlots, ySlots, 32, 32, 0, 0)
		slotWindow.Show()
		return slotWindow
	
	@staticmethod
	def NewButton( parent, x, y, func, UpVisual, OverVisual, text = None):
		button = NewButton()
		if parent != None:
			button.SetParent(parent)
		button.SetPosition(x, y)
		button.SetNormalImage(UpVisual)
		button.SetHoverImage(OverVisual)
		if text != None:
			button.SetText(text)
		button.Show()
		button.SetMouseLeftButtonDownEvent(func)
		return button	
		
	@staticmethod
	def Button( parent, buttonName, tooltipText, x, y, func, UpVisual, OverVisual, DownVisual):
		button = ui.Button()
		if parent != None:
			button.SetParent(parent)
		button.SetPosition(x, y)
		button.SetUpVisual(UpVisual)
		button.SetOverVisual(OverVisual)
		button.SetDownVisual(DownVisual)
		button.SetText(buttonName)
		button.SetToolTipText(tooltipText)
		button.Show()
		button.SetEvent(func)
		return button

	@staticmethod
	def ToggleButton( parent, buttonName, tooltipText, x, y, funcUp, funcDown, UpVisual, OverVisual, DownVisual):
		button = ui.ToggleButton()
		if parent != None:
			button.SetParent(parent)
		button.SetPosition(x, y)
		button.SetUpVisual(UpVisual)
		button.SetOverVisual(OverVisual)
		button.SetDownVisual(DownVisual)
		button.SetText(buttonName)
		button.SetToolTipText(tooltipText)
		button.Show()
		button.SetToggleUpEvent(funcUp)
		button.SetToggleDownEvent(funcDown)
		return button

	@staticmethod
	def EditLine( parent, editlineText, x, y, width, heigh, max):
		SlotBar = ui.SlotBar()
		if parent != None:
			SlotBar.SetParent(parent)
		SlotBar.SetSize(width, heigh)
		SlotBar.SetPosition(x, y)
		SlotBar.Show()
		Value = ui.EditLine()
		Value.SetParent(SlotBar)
		Value.SetSize(width, heigh)
		Value.SetPosition(1, 1)
		Value.SetMax(max)
		Value.SetLimitWidth(width)
		Value.SetMultiLine()
		Value.SetText(editlineText)
		Value.Show()
		return SlotBar, Value

	@staticmethod
	def TextLine( parent, textlineText, x, y, color):
		textline = ui.TextLine()
		if parent != None:
			textline.SetParent(parent)
		textline.SetPosition(x, y)
		if color != None:
			textline.SetFontColor(color[0], color[1], color[2])
		textline.SetText(textlineText)
		textline.Show()
		return textline
		
	@staticmethod
	def ClickableTextLine( parent, textlineText, x, y, color):
		textline = ClickableTextLine()
		if parent != None:
			textline.SetParent(parent)
		textline.SetPosition(x, y)
		if color != None:
			textline.SetFontColor(color[0], color[1], color[2])
		textline.SetText(textlineText)
		textline.Show()
		return textline

	@staticmethod
	def RGB( r, g, b):
		return (r*255, g*255, b*255)

	@staticmethod
	def SliderBar( parent, sliderPos, func, x, y):
		Slider = ui.SliderBar()
		if parent != None:
			Slider.SetParent(parent)
		Slider.SetPosition(x, y)
		Slider.SetSliderPos(sliderPos / 100)
		Slider.Show()
		Slider.SetEvent(func)
		return Slider

	@staticmethod
	def ExpandedImage( parent, x, y, img):
		image = ui.ExpandedImageBox()
		if parent != None:
			image.SetParent(parent)
		image.SetPosition(x, y)
		image.LoadImage(img)
		image.Show()
		return image

	@staticmethod
	def HoverableExpandedImage( parent, x, y, img):
		image = HoverableExpandedImage()
		if parent != None:
			image.SetParent(parent)
		image.SetPosition(x, y)
		image.LoadImage(img)
		image.Show()
		return image

	@staticmethod
	def ComboBox( parent, text, x, y, width):
		combo = ui.ComboBox()
		if parent != None:
			combo.SetParent(parent)
		combo.SetPosition(x, y)
		combo.SetSize(width, 15)
		combo.SetCurrentItem(text)
		combo.Show()
		return combo

	@staticmethod
	def ThinBoard( parent, moveable, x, y, width, heigh, center):
		thin = ui.ThinBoard()
		if parent != None:
			thin.SetParent(parent)
		if moveable == TRUE:
			thin.AddFlag('movable')
			thin.AddFlag('float')
		thin.SetSize(width, heigh)
		thin.SetPosition(x, y)
		if center == TRUE:
			thin.SetCenterPosition()
		thin.Show()
		return thin

	@staticmethod
	def ThinBoardCircle( parent, x, y, width, heigh):
		thin = ui.ThinBoardCircle()
		if parent != None:
			thin.SetParent(parent)
		thin.SetSize(width, heigh)
		thin.SetPosition(x, y)
		thin.Show()
		return thin

	@staticmethod
	def Gauge( parent, width, color, x, y):
		gauge = ui.Gauge()
		if parent != None:
			gauge.SetParent(parent)
		gauge.SetPosition(x, y)
		gauge.MakeGauge(width, color)
		gauge.Show()
		return gauge
	
	@staticmethod
	def ThinScrollBar( parent, x, y, size):
		scroll = ui.ThinScrollBar()
		if parent != None:
			scroll.SetParent(parent)
		scroll.SetPosition(x, y)
		scroll.SetScrollBarSize(size)
		scroll.Show()
		return scroll
		
	@staticmethod
	def ScrollBar( parent, x, y, size):
		scroll = ui.ScrollBar()
		if parent != None:
			scroll.SetParent(parent)
		scroll.SetPosition(x, y)
		scroll.SetScrollBarSize(size)
		scroll.Show()
		return scroll

	@staticmethod
	def ListBoxEx( parent, x, y, width, heigh):
		bar = ui.Bar()
		if parent != None:
			bar.SetParent(parent)
		bar.SetPosition(x, y)
		bar.SetSize(width, heigh)
		bar.SetColor(0x77000000)
		bar.Show()
		ListBox=ui.ListBoxEx()
		ListBox.SetParent(bar)
		ListBox.SetPosition(0, 0)
		ListBox.SetSize(width, heigh)
		ListBox.Show()
		scroll = ui.ScrollBar()
		scroll.SetParent(ListBox)
		scroll.SetPosition(width-15, 0)
		scroll.SetScrollBarSize(heigh)
		scroll.Show()
		ListBox.SetScrollBar(scroll)
		return bar, ListBox

