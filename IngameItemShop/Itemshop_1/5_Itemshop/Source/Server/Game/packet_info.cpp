//1.1 Search:
	Set(HEADER_CG_SAFEBOX_ITEM_MOVE, sizeof(TPacketCGItemMove), "SafeboxItemMove", true);


//1.2 Add after:
#ifdef ENABLE_INGAME_ITEMSHOP
	Set(HEADER_CG_ITEMSHOP_NEW, sizeof(TPacketCGItemShopBuy), "ItemShopBuyNew", false);
#endif



//2.1 Search:
	Set(HEADER_GG_NOTICE,		sizeof(TPacketGGNotice),	"Notice", false);

//2.2 Add after:
#ifdef ENABLE_INGAME_ITEMSHOP
	Set(HEADER_GG_ITEMSHOP, sizeof(TPacketItemShopGG), "ItemShop", false);
#endif
