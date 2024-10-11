//1.1 Search:

#ifdef ENABLE_COSTUME_SYSTEM
	PyModule_AddIntConstant(poModule, "ENABLE_COSTUME_SYSTEM", 1);
#else
	PyModule_AddIntConstant(poModule, "ENABLE_COSTUME_SYSTEM", 0);
#endif

//1.2 Add after:

#ifdef ENABLE_INGAME_ITEMSHOP
	PyModule_AddIntConstant(poModule, "ENABLE_INGAME_ITEMSHOP", 1);
#else
	PyModule_AddIntConstant(poModule, "ENABLE_INGAME_ITEMSHOP", 0);
#endif