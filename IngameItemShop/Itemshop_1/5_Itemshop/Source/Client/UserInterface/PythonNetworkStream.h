//1.1 Search:
#include "packet.h"


//1.2 Add after:
#ifdef ENABLE_INGAME_ITEMSHOP
#include <cstdint>
#endif



//2.1 Search:
		void __SetGuildID(DWORD id);


//2.2 Add after:
#ifdef ENABLE_INGAME_ITEMSHOP
	public:
		PyObject* GetPhaseWindow(uint8_t num) { return m_apoPhaseWnd[num]; }
#endif


