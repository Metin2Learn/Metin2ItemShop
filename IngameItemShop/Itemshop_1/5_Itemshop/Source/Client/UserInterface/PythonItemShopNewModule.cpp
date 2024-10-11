#include "StdAfx.h"
#include "Packet.h"
#include "PythonApplication.h"
#include "PythonNetworkStream.h"
#include "PythonItemShopNew.h"

PyObject * itemshopnewGetItemsByCategory(PyObject* poSelf, PyObject* poArgs)
{
	uint8_t cat_id;
	if (!PyTuple_GetInteger(poArgs, 0, &cat_id))
		return Py_BuildException();

	PyObject* items = PyList_New(0);

	const auto& itemMap = CPythonItemShopNew::Instance()->GetItemVector();

	for (auto item = itemMap->begin(); item != itemMap->end(); item++)
	{
		/*if (item->second->limited && item->second->limitedTime - CPythonApplication::Instance().GetServerTimeStamp() < 0 && item->second->limitedCount <= 0)
			continue;*/
		if (item->second->category == cat_id)
		{
			PyObject* pyitem = PyList_New(8);
			
			PyList_SetItem(pyitem, 0, Py_BuildValue("i", item->second->id));
			PyList_SetItem(pyitem, 1, Py_BuildValue("i", item->second->vnum));
			PyObject* sockets = PyList_New(CItemData::ITEM_SOCKET_MAX_NUM);
			for (int x = 0; x < CItemData::ITEM_SOCKET_MAX_NUM; x++)
				PyList_SetItem(sockets, x, Py_BuildValue("i", item->second->sockets[x]));
			PyList_SetItem(pyitem, 2, sockets);
			PyList_SetItem(pyitem, 3, Py_BuildValue("i", item->second->coins));
			PyList_SetItem(pyitem, 4, Py_BuildValue("i", item->second->category));
			PyList_SetItem(pyitem, 5, Py_BuildValue("i", item->second->limited));
			PyList_SetItem(pyitem, 6, Py_BuildValue("i", item->second->limitedTime));
			PyList_SetItem(pyitem, 7, Py_BuildValue("i", item->second->limitedCount));

			PyList_Append(items, pyitem);
		}
	}

	return items;
}

PyObject * itemshopnewGetItems(PyObject* poSelf, PyObject* poArgs)
{
	PyObject* items = PyList_New(0);

	const auto& itemMap = CPythonItemShopNew::Instance()->GetItemVector();

	for (auto item = itemMap->begin(); item != itemMap->end(); item++)
	{
		/*if (item->second->limited && item->second->limitedTime - CPythonApplication::Instance().GetServerTimeStamp() < 0 && item->second->limitedCount <= 0)
			continue;*/
		PyObject* pyitem = PyList_New(8);

		PyList_SetItem(pyitem, 0, Py_BuildValue("i", item->second->id));
		PyList_SetItem(pyitem, 1, Py_BuildValue("i", item->second->vnum));
		PyObject* sockets = PyList_New(CItemData::ITEM_SOCKET_MAX_NUM);
		for (int x = 0; x < CItemData::ITEM_SOCKET_MAX_NUM; x++)
			PyList_SetItem(sockets, x, Py_BuildValue("i", item->second->sockets[x]));
		PyList_SetItem(pyitem, 2, sockets);
		PyList_SetItem(pyitem, 3, Py_BuildValue("i", item->second->coins));
		PyList_SetItem(pyitem, 4, Py_BuildValue("i", item->second->category));
		PyList_SetItem(pyitem, 5, Py_BuildValue("i", item->second->limited));
		PyList_SetItem(pyitem, 6, Py_BuildValue("i", item->second->limitedTime));
		PyList_SetItem(pyitem, 7, Py_BuildValue("i", item->second->limitedCount));

		PyList_Append(items, pyitem);
	}

	return items;
}


PyObject * itemshopnewGetCategoriesByMain(PyObject* poSelf, PyObject* poArgs)
{
	uint8_t cat_id;
	if (!PyTuple_GetInteger(poArgs, 0, &cat_id))
		return Py_BuildException();

	PyObject* items = PyList_New(0);

	auto itemMap = CPythonItemShopNew::Instance()->GetCategoryMap();

	for (auto item = itemMap->begin(); item != itemMap->end(); item++)
	{
		if (item->second->main_category == cat_id)
		{
			PyObject* pyitem = PyList_New(3);

			PyList_SetItem(pyitem, 0, Py_BuildValue("i", item->second->id));
			PyList_SetItem(pyitem, 1, Py_BuildValue("s", item->second->name));
			PyList_SetItem(pyitem, 2, Py_BuildValue("i", item->second->color_id));

			PyList_Append(items, pyitem);
		}
	}

	return items;
}

PyObject * itemshopnewGetMainByCategory(PyObject* poSelf, PyObject* poArgs)
{
	uint8_t cat_id;
	if (!PyTuple_GetInteger(poArgs, 0, &cat_id))
		return Py_BuildException();


	const auto cat = CPythonItemShopNew::Instance()->GetCategoryMap()->find(cat_id);

	if (cat == CPythonItemShopNew::Instance()->GetCategoryMap()->end())
		return Py_BuildValue("i", 0);
	
	return Py_BuildValue("i", cat->second->main_category);
}

PyObject * itemshopnewGetGoldCoins(PyObject* poSelf, PyObject* poArgs)
{
	return Py_BuildValue("i", CPythonItemShopNew::Instance()->GetGoldCoins());
}

PyObject * itemshopnewGetSilverCoins(PyObject* poSelf, PyObject* poArgs)
{
	return Py_BuildValue("i", CPythonItemShopNew::Instance()->GetSilverCoins());
}

PyObject * itemshopnewSendBuy(PyObject* poSelf, PyObject* poArgs)
{
	uint16_t id;
	if (!PyTuple_GetInteger(poArgs, 0, &id))
		return Py_BuildException();
	uint16_t count;
	if (!PyTuple_GetInteger(poArgs, 1, &count))
		return Py_BuildException();

	return Py_BuildValue("b", CPythonItemShopNew::Instance()->SendBuy(id, count));
}

PyObject * itemshopnewRequestNewCount(PyObject* poSelf, PyObject* poArgs)
{
	uint16_t id;
	if (!PyTuple_GetInteger(poArgs, 0, &id))
		return Py_BuildException();

	CPythonItemShopNew::Instance()->RequestNewCount(id);
	
	return Py_BuildValue("b", true);
}

void inititemshopnew() {
	static PyMethodDef s_methods[] =
	{
		{ "GetItems", itemshopnewGetItems, METH_VARARGS },
		{ "GetItemsByCategory", itemshopnewGetItemsByCategory, METH_VARARGS },
		{ "GetCategoriesByMain", itemshopnewGetCategoriesByMain, METH_VARARGS },


		{ "GetMainByCategory", itemshopnewGetMainByCategory, METH_VARARGS },

		{ "GetGoldCoins", itemshopnewGetGoldCoins, METH_VARARGS },
		{ "GetSilverCoins", itemshopnewGetSilverCoins, METH_VARARGS },
		
		{ "SendBuy", itemshopnewSendBuy, METH_VARARGS },
		{ "RequestNewCount", itemshopnewRequestNewCount, METH_VARARGS },
		
		{ NULL, NULL, NULL },
	};

	PyObject* poModule = Py_InitModule("itemshopnew", s_methods);

}
