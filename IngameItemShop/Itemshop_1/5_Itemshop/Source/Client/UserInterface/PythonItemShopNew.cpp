#include "StdAfx.h"
#include "PythonApplication.h"
#include "PythonNetworkStream.h"
#include "PythonItemShopNew.h"

#define Recv(pack) (CPythonNetworkStream::Instance().Recv(sizeof(pack), &pack))
#define Send(pack) (CPythonNetworkStream::Instance().Send(sizeof(pack) , &pack))

CPythonItemShopNew* CPythonItemShopNew::currentInstance = nullptr;

CPythonItemShopNew::CPythonItemShopNew()
{
	m_Gold = 0;
	m_Silver = 0;
}

CPythonItemShopNew::~CPythonItemShopNew()
{
}

void CPythonItemShopNew::Init()
{

}

CPythonItemShopNew* CPythonItemShopNew::Instance()
{
	if (!currentInstance)
		currentInstance = new CPythonItemShopNew();
	return currentInstance;
}

void CPythonItemShopNew::RecvPacket()
{
	TPacketGCItemShop packet;
	if (!Recv(packet))
	{
		TraceError("!Recv ItemshopNew RecvPacket");
		return;
	}

	switch (packet.subHeader)
	{
	case IS_GC_SUB_ITEMS:
		RecvItems();
		break;
	case IS_GC_SUB_CATEGORIES:
		RecvCategories();
		break;
	case IS_GC_SUB_COINS:
		RecvCoins();
		break;
	case IS_GC_SUB_OPEN:
		RecvOpen();
		break;
	case IS_GC_SUB_COUNT:
		RecvItemCount();
		break;
	default:
		TraceError("Unkown subheader for CPythonItemShopNew!");
		break;
	}
}

void CPythonItemShopNew::RecvItems()
{
	TPacketItemShopItems pack;
	if (!Recv(pack))
	{
		TraceError("!Recv RecvItems");
		return;
	}
	
	if (pack.clear)
		m_Items.clear();
	
	for (uint16_t i = 0; i < pack.item_count; i++)
	{
		TItemShopItem item;
		if (!Recv(item))
		{
			return;
		}


		auto new_item = std::make_shared<TItemShopItem>();
		memcpy(new_item.get(), &item, sizeof(TItemShopItem));
		m_Items.emplace_back(std::make_pair(new_item->id, std::move(new_item)));
	}
}


void CPythonItemShopNew::RecvCategories()
{
	TPacketItemShopCategories pack;
	if (!Recv(pack))
	{
		TraceError("!Recv RecvCategories");
		return;
	}

	m_Categories.clear();

	for (uint16_t i = 0; i < pack.cat_count; i++)
	{
		TItemShopCategory cat;
		if (!Recv(cat))
		{
			TraceError("!Recv RecvItems Item %d", i);
			return;
		}

		auto new_item = std::make_shared<TItemShopCategory>();
		memcpy(new_item.get(), &cat, sizeof(TItemShopCategory));
		m_Categories.insert(std::make_pair(new_item->id, std::move(new_item)));
	}
}

void CPythonItemShopNew::RecvCoins()
{
	TPacketItemShopCoins pack;
	if (!Recv(pack))
	{
		TraceError("!Recv RecvCoins");
		return;
	}
	
	m_Gold = pack.gold;
	m_Silver = pack.silver;

}

void CPythonItemShopNew::RecvOpen()
{
	PyCallClassMemberFunc(CPythonNetworkStream::Instance().GetPhaseWindow(5), "BINARY_ITEMSHOPNEW_OPEN", Py_BuildValue("()"));
}

void CPythonItemShopNew::RecvItemCount()
{
	TPacketItemShopLimitedItem pack;
	if (!Recv(pack))
	{
		TraceError("!Recv RecvItemCount");
		return;
	}
	PyCallClassMemberFunc(CPythonNetworkStream::Instance().GetPhaseWindow(5), "BINARY_ITEMSHOPNEW_LIMITED_COUNT", Py_BuildValue("(ii)", pack.id, pack.count));
}


bool CPythonItemShopNew::SendBuy(uint16_t id, uint16_t count)
{
	TPacketCGItemShop pack;
	pack.header = HEADER_CG_ITEMSHOP_NEW;
	pack.size = sizeof(pack) + sizeof(TPacketCGItemShopBuy);
	pack.subHeader = IS_CG_SUB_BUY;

	TPacketCGItemShopBuy subpack;
	subpack.id = id;
	subpack.count = count;
	
	if (!Send(pack))
	{
		TraceError("!SendBuy pack");
		return false;
	}

	if (!Send(subpack))
	{
		TraceError("!SendBuy subpack");
		return false;
	}

	return true;
}


void CPythonItemShopNew::RequestNewCount(uint16_t id)
{
	TPacketCGItemShop pack;
	pack.header = HEADER_CG_ITEMSHOP_NEW;
	pack.size = sizeof(pack) + sizeof(TPacketCGItemShopRequestCount);
	pack.subHeader = IS_CG_SUB_REQUEST_COUNT;

	TPacketCGItemShopRequestCount subpack;
	subpack.id = id;

	if (!Send(pack))
	{
		TraceError("!SendBuy pack");
		return;
	}

	if (!Send(subpack))
	{
		TraceError("!SendBuy subpack");
		return;
	}
}