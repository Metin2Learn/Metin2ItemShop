//1.1 Search:
ACMD (do_clear_affect);


//1.2 Add after:
#ifdef ENABLE_INGAME_ITEMSHOP
ACMD(do_open_is);
ACMD(do_refresh_is);
#endif



//2.1 Search:
	{ "geteventflag",	do_get_event_flag,	0,			POS_DEAD,	GM_LOW_WIZARD	},


//2.2 Add after:
#ifdef ENABLE_INGAME_ITEMSHOP
	{ "open_is", do_open_is, 0, POS_DEAD, GM_PLAYER },
	{ "refresh_is", do_refresh_is, 0, POS_DEAD, GM_IMPLEMENTOR },
#endif


