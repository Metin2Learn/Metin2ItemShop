//1.1 Search:
#include "../../common/VnumHelper.h"


//1.2 Add after:
#ifdef ENABLE_INGAME_ITEMSHOP
#include "ItemShopNewManager.h"
#endif



//2.1 Search:
ACMD(do_detaillog)


//2.2 Add ABOVE:
#ifdef ENABLE_INGAME_ITEMSHOP
ACMD(do_open_is)
{
	ItemShopNewManager::instance().Open(ch);
}

ACMD(do_refresh_is)
{
	sys_log(0, "%s[%d] Refreshing itemshop", ch->GetName(), ch->GetPlayerID());
	
	TPacketItemShopGG p;
	p.header = HEADER_GG_ITEMSHOP;
	p.subheader = IS_GG_RELOAD;

	TEMP_BUFFER buf;
	buf.write(&p, sizeof(p));

	P2P_MANAGER::instance().Send(buf.read_peek(), buf.size());

	ItemShopNewManager::instance().Initialize();
}

#endif


