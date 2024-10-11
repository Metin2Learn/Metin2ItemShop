#1.1 Search in class Board(Window):
	def __init__(self):
		Window.__init__(self)

#1.2 replace with:
	def __init__(self, layer="UI"):
		Window.__init__(self, layer)


#2.1 search:
	def GetTextSize(self):
		return wndMgr.GetTextSize(self.hWnd)

#2.2 Add after:
	def GetTextWidth(self):
		w, h = self.GetTextSize()
		return w

	def GetTextHeight(self):
		w, h = self.GetTextSize()
		return h
