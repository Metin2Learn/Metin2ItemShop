ACMD(do_in_game_mall)
{
	char buf[512+1];
	char sas[33];
	MD5_CTX ctx;
	const char sas_key[] = "GF9001";
	
	char language[3];
	strcpy(language, "en");//If you have multilanguage, update this
	
	snprintf(buf, sizeof(buf), "%u%u%s", ch->GetPlayerID(), ch->GetAID(), sas_key);

	MD5Init(&ctx);
	MD5Update(&ctx, (const unsigned char *) buf, strlen(buf));
#ifdef __FreeBSD__
	MD5End(&ctx, sas);
#else
	static const char hex[] = "0123456789abcdef";
	unsigned char digest[16];
	MD5Final(digest, &ctx);
	int i;
	for (i = 0; i < 16; ++i) {
		sas[i+i] = hex[digest[i] >> 4];
		sas[i+i+1] = hex[digest[i] & 0x0f];
	}
	sas[i+i] = '\0';
#endif

	snprintf(buf, sizeof(buf), "mall https://www.%s/shop?pid=%u&lang=%s&sid=%d&sas=%s",
			g_strWebMallURL.c_str(), ch->GetPlayerID(), language, g_server_id, sas);

	ch->ChatPacket(CHAT_TYPE_COMMAND, buf);
}