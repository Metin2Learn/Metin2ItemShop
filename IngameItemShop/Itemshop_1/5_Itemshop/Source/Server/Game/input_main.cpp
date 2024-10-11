//1.1 Search:
#include "DragonSoul.h"


//1.2 Add after:
#ifdef ENABLE_INGAME_ITEMSHOP
#include "ItemShopNewManager.h"
#endif



//2.1 Search:
		case HEADER_CG_ITEM_GIVE:


//2.2 Add ABOVE:
#ifdef ENABLE_INGAME_ITEMSHOP
		case HEADER_CG_ITEMSHOP_NEW:
			if ((iExtraLen = ItemShopNewManager::Instance().ProcessClientPackets(c_pData, ch, m_iBufferLeft))< 0)
				return -1;
			break;
#endif


