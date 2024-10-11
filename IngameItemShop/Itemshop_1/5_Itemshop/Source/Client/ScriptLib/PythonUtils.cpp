//1.1 Search:

bool PyTuple_GetInteger(PyObject* poArgs, int pos, WORD* ret)

//1.2 Add above:

bool PyTuple_GetInteger(PyObject* poArgs, int pos, DWORD* ret)
{
	int val;
	bool result = PyTuple_GetInteger(poArgs, pos, &val);
	*ret = DWORD(val);
	return result;
}
