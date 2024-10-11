#pragma once

#include "Packet.h"

class CPythonItemShopNew {
public:
	CPythonItemShopNew();
	~CPythonItemShopNew();

	void Init();

	void RecvPacket();

	void RecvItems();
	void RecvCategories();
	void RecvCoins();
	void RecvOpen();
	void RecvItemCount();
	bool SendBuy(uint16_t id, uint16_t count);

	std::vector<std::pair<uint16_t, std::shared_ptr<TItemShopItem>>>* GetItemVector()
	{
		return &m_Items;
	}

	std::map<uint16_t, std::shared_ptr<TItemShopCategory>>* GetCategoryMap()
	{
		return &m_Categories;
	}

	uint32_t GetGoldCoins()
	{
		return m_Gold;
	}

	uint32_t GetSilverCoins()
	{
		return m_Silver;
	}

	void RequestNewCount(uint16_t id);

	//bool SendItemCheckoutRequest(uint16_t slot, TItemPos item_pos);

	static CPythonItemShopNew* Instance();
	
private:
	static CPythonItemShopNew * currentInstance;
	std::vector<std::pair<uint16_t, std::shared_ptr<TItemShopItem>>> m_Items;
	std::map<uint16_t, std::shared_ptr<TItemShopCategory>> m_Categories;
	uint32_t m_Gold;
	uint32_t m_Silver;
	
};

