//1.1 Search:
	HEADER_CG_ITEM_GIVE				= 83,

//1.2 Add after:
#ifdef ENABLE_INGAME_ITEMSHOP
	HEADER_CG_ITEMSHOP_NEW = 87,
#endif



//2.1 Search:
	HEADER_GC_MAIN_CHARACTER4_BGM_VOL	= 138,

//2.2 Add after:
#ifdef ENABLE_INGAME_ITEMSHOP
	HEADER_GC_NEW_ITEMSHOP = 142,
#endif



//3.1 Search:
	HEADER_GG_CHECK_AWAKENESS		= 29,

//3.2 Add after:
#ifdef ENABLE_INGAME_ITEMSHOP
	HEADER_GG_ITEMSHOP = 35,
#endif



//4.1 Search:
} TPacketGCItemDel;

//4.2 Add after:
#ifdef ENABLE_INGAME_ITEMSHOP
typedef struct packet_TPacketCGItemShop
{
	uint8_t header;
	uint16_t size;
	uint8_t subHeader;
} TPacketCGItemShop;

typedef struct packet_TPacketCGItemShopBuy
{
	uint16_t id;
	uint16_t count;
} TPacketCGItemShopBuy;

typedef struct packet_TPacketCGItemShopRequestCount
{
	uint16_t id;
} TPacketCGItemShopRequestCount;

enum
{
	IS_GC_SUB_CATEGORIES = 0,
	IS_GC_SUB_ITEMS,
	IS_GC_SUB_COINS,
	IS_GC_SUB_OPEN,
	IS_GC_SUB_COUNT,

	IS_CG_SUB_BUY = 0,
	IS_CG_SUB_REQUEST_COUNT,

	IS_GG_RELOAD = 0,
	IS_GG_BUY_LIMITED,
};

typedef struct packet_itemshop_item
{
	uint16_t id;
	uint32_t vnum;
	uint8_t category;
	uint32_t coins;
	long	sockets[ITEM_SOCKET_MAX_NUM];
	bool limited;
	long limitedTime;
	uint32_t limitedCount;
} TItemShopItem;

typedef struct packet_itemshop_category
{
	uint8_t id;
	char name[40 + 1];
	uint8_t main_category;
	uint8_t color_id;
} TItemShopCategory;

typedef struct
{
	uint8_t header;
	uint16_t size;
	uint8_t subHeader;
} TPacketGCItemShop;

typedef struct
{
	uint16_t cat_count;
} TPacketItemShopCategories;

typedef struct
{
	bool clear;
	uint16_t item_count;
} TPacketItemShopItems;

typedef struct
{
	uint32_t gold;
	uint32_t silver;
} TPacketItemShopCoins;

typedef struct
{
	uint8_t header;
	uint8_t subheader;
} TPacketItemShopGG;

typedef struct
{
	uint16_t id;
	uint16_t count;
} TPacketItemShopLimitedItem;
#endif