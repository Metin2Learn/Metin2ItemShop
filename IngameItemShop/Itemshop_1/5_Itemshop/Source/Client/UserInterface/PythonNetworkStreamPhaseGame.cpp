//1.1 Search:
#include "ProcessCRC.h"


//1.2 Add after:
#ifdef ENABLE_INGAME_ITEMSHOP
#include "PythonItemshopNew.h"
#endif



//2.1 Search:
			default:
				ret = RecvDefaultPacket(header);
				break;


//2.2 Add ABOVE:
#ifdef ENABLE_INGAME_ITEMSHOP
			case HEADER_GC_NEW_ITEMSHOP:
				CPythonItemShopNew::Instance()->RecvPacket();
				ret = true;
				break;
#endif


