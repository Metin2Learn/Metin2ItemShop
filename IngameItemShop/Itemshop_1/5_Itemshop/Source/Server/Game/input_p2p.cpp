//1.1 Search:
#include "threeway_war.h"


//1.2 Add after:
#ifdef ENABLE_INGAME_ITEMSHOP
#include "ItemShopNewManager.h"
#endif



//2.1 Search:
		case HEADER_GG_CHECK_AWAKENESS:
			IamAwake(d, c_pData);
			break;


//2.2 Add after:
#ifdef ENABLE_INGAME_ITEMSHOP
		case HEADER_GG_ITEMSHOP:
			if ((iExtraLen = ItemShopNewManager::Instance().ProcessP2P(c_pData, m_iBufferLeft)) < 0)
				return -1;
			break;

#endif


