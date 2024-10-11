//1.1 Search:
#include "DragonSoul.h"


//1.2 Add after:
#ifdef ENABLE_INGAME_ITEMSHOP
#include "ItemShopNewManager.h"
#endif



//2.1 Search:
	ilInit(); // DevIL Initialize

//2.2 Add after:
#ifdef ENABLE_INGAME_ITEMSHOP
	ItemShopNewManager is_manager;
#endif



//3.1 Search:
	ani_init();

//3.2 Add after:
#ifdef ENABLE_INGAME_ITEMSHOP
	ItemShopNewManager::instance().Initialize();
#endif


