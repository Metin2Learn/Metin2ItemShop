<?php
	#AUTOLOGIN SCRIPT GAME
	if(isset($_GET['pid'], $_GET['sid'], $_GET['sas']))
	{
		$player_id = $_GET['pid'];
		$server_id = $_GET['sid'];
		$sas_keyge = $_GET['sas'];
		
		$auto_login = $database->Player("SELECT account_id FROM player WHERE id=?");
		$auto_login->bindParam(1, $player_id, PDO::PARAM_INT);
		$auto_login->execute();
		$auto_login_result = $auto_login->fetch(PDO::FETCH_ASSOC);
		if (isset($auto_login_result['account_id']))
		{
			$sas_encrypt = md5($player_id.$auto_login_result['account_id'].SQLITE_PASSWORD);
			if($sas_encrypt == $sas_keyge)
			{
				$_SESSION['id']				= $auto_login_result['account_id'];
				$_SESSION['usern']			= User::Data($auto_login_result['account_id'], 'login');
				$_SESSION['fingerprint']	= md5($_SERVER['HTTP_USER_AGENT'] . 'x' . $_SERVER['REMOTE_ADDR']);
				
			}
		}
	}
	#AUTOLOGIN SCRIPT GAME
	function l($var)
	{
		global $language_code, $database;

		$stmt = $database->Language("SELECT * FROM shop_languages WHERE id='$var'");
		$stmt->execute();
		$result = $stmt->fetch(PDO::FETCH_ASSOC);
		if (isset($result[$language_code]))
		{
			return $result[$language_code];
		}
	}

	function S($var)
	{
		print '<script>Success("' . $var . '");</script>';
	}

	function E($var)
	{
		print '<script>Error("' . $var . '");</script>';
	}

	function I($var)
	{
		print '<script>Info("' . $var . '");</script>';
	}

	function Logged()
	{
		if (isset($_SESSION['id'])) return true;
		else return false;
	}

	function isAdmin()
	{
		global $database;
		if (isset($_SESSION['id']) && $_SESSION['id']!='')
		{
			$stmt = $database->Account('SELECT * FROM account WHERE id=:ids');
			$stmt->execute(array(':ids'=> $_SESSION['id']));
			$result = $stmt->fetch(PDO::FETCH_ASSOC);

			if (isset($result['web_admin']) && $result['web_admin'] == 99) return true;
			else return false;
		}
		else return false;
	}

	function ClassicHash($password)
	{
		$hash = sha1(sha1($password, true));
		return '*' . strtoupper($hash);
	}

	function doLogin($u, $p)
	{
		global $database;

		$p    = ClassicHash($p);
		$stmt = $database->Account("SELECT id, status, password,login FROM account WHERE login=:login AND password=:password");
		$stmt->execute(array(
			':login'         => $u,
			':password'         => $p
		));

		$userRow = $stmt->fetch(PDO::FETCH_ASSOC);
		if ($stmt->rowCount() == 1)
		{
			if ($userRow['status'] == 'OK')
			{
				$_SESSION['id']         = $userRow['id'];
				$_SESSION['usern']         = $userRow['login'];
				$_SESSION['fingerprint']         = md5($_SERVER['HTTP_USER_AGENT'] . 'x' . $_SERVER['REMOTE_ADDR']);
				return "<script>goto('home');</script>";
			}
			else E(l(55));
		}
		else E(l(56));
	}

	function Array_Counter($input)
	{
		if (count($input) > 0) return true;
		else print '<tr><div class="alert alert-info">' . l(11) . '</div></tr>';
	}

	function GetDirectorySize($path)
	{
		$bytestotal = 0;
		$path       = realpath($path);
		if ($path !== false && $path != '' && file_exists($path))
		{
			foreach (new RecursiveIteratorIterator(new RecursiveDirectoryIterator($path, FilesystemIterator::SKIP_DOTS)) as $object)
			{
				$bytestotal += $object->getSize() / 1024;
			}
		}
		return round($bytestotal);
	}

	class Basic
	{
		public static function URL()
		{
			$get_url = URL;

			if (substr($get_url, -1) != '/') $get_url .= '/';

			return $get_url;
		}

		public static function AURL()
		{
			return Basic::URL() . 'admin/';
		}
	}

	class Theme
	{
		public static function Get($id)
		{
			global $database;

			$stmt = $database->Sqlite('SELECT * FROM settings WHERE id=:ids');
			$stmt->execute(array(
				':ids'        => $id
			));
			$result = $stmt->fetch(PDO::FETCH_ASSOC);

			if (isset($result['value'])) return $result['value'];
		}

		public static function StylePath()
		{
			$get_url = URL;

			if (substr($get_url, -1) != '/') $get_url .= '/';

			$get_url .= 'style/';
			$get_url .= Theme::Get(1);
			$get_url .= '/';
			return $get_url;
		}

		public static function AdminStylePath()
		{
			$get_url = URL;

			if (substr($get_url, -1) != '/') $get_url .= '/';

			$get_url .= 'style/admin_';
			$get_url .= Theme::Get(2);
			$get_url .= '/';
			return $get_url;
		}

		public static function APA($cp)
		{
			global $pagea;

			if (isset($pagea) && $pagea == $cp) return 'active';
		}

		public static function MakePrimary($value)
		{
			global $database;

			$stmt = $database->Sqlite("UPDATE settings SET value=:value WHERE id='1'");
			$stmt->execute(array(
				':value' => $value
			));
		}

	}

	class Categories
	{
		public static function Get()
		{
			global $database;

			$stmt = $database->Sqlite('SELECT * FROM categories ORDER BY id ASC');
			$stmt->execute();

			return $stmt->fetchAll();
		}

		public static function Create()
		{
			global $database;

			$stmt = $database->Language("SELECT MAX(id) as maxid FROM shop_languages");
			$stmt->execute();
			$lastId = $stmt->fetch(PDO::FETCH_ASSOC);

			$newId  = $lastId['maxid'] + 1;
			$stmt   = $database->Language("INSERT INTO shop_languages (id) VALUES (:newId)");
			$stmt->bindparam(":newId", $newId);
			$stmt->execute();

			$stmt = $database->Sqlite("INSERT INTO categories (name) VALUES (:newId)");
			$stmt->bindparam(":newId", $newId);
			if ($stmt->execute()) S(l(57));
			else E(l(58));
		}

		public static function Del($id, $name)
		{
			global $database;

			$stmt = $database->Sqlite("DELETE FROM categories WHERE id=:input");
			$stmt->bindparam(":input", $id);

			$stmu = $database->Language("DELETE FROM shop_languages WHERE id=:input");
			$stmu->bindparam(":input", $name);

			$stmp = $database->Sqlite("DELETE FROM items_for_sell WHERE category=:input");
			$stmp->bindparam(":input", $id);

			if ($stmt->execute() && $stmu->execute() && $stmp->execute()) S(l(59));
			else E(l(58));
		}

		public static function Language($variable)
		{
			global $database, $language_code;

			$stmt = $database->Language("SELECT * FROM shop_languages WHERE id='$variable'");
			$stmt->execute();

			$result = $stmt->fetch(PDO::FETCH_ASSOC);
			if (isset($result[$language_code])) return $result[$language_code];
			elseif (isset($result['en'])) return $result['en'];
			else return '...';
		}

		public static function Translation($variable, $output)
		{
			global $database, $language_code;

			$stmt = $database->Language("SELECT * FROM shop_languages WHERE id='$variable'");
			$stmt->execute();

			$result = $stmt->fetch(PDO::FETCH_ASSOC);
			if (isset($result[$output])) return $result[$output];
			else return '...';
		}

		public static function NameID($variable)
		{
			global $database;

			$stmt = $database->Sqlite("SELECT * FROM categories WHERE id=?");
			$stmt->bindParam(1, $variable, PDO::PARAM_STR);
			$stmt->execute();
			$result = $stmt->fetch(PDO::FETCH_ASSOC);
			if (isset($result['name'])) return $result['name'];
			else return '...';
		}

		public static function EditTranslate($en, $ro, $ar, $de, $fr, $tr, $hu, $es, $pl, $it, $el, $ru, $id)
		{
			global $database;

			$stmt = $database->Language("UPDATE shop_languages SET en = ?, ro = ?, ar = ?, de = ?, fr = ?,tr = ?, hu = ?, es = ?, pl = ?, it = ?, el = ?, ru = ? WHERE id=?");
			$stmt->bindParam(1, $en, PDO::PARAM_STR);
			$stmt->bindParam(2, $ro, PDO::PARAM_STR);
			$stmt->bindParam(3, $ar, PDO::PARAM_STR);
			$stmt->bindParam(4, $de, PDO::PARAM_STR);
			$stmt->bindParam(5, $fr, PDO::PARAM_STR);
			$stmt->bindParam(6, $tr, PDO::PARAM_STR);
			$stmt->bindParam(7, $hu, PDO::PARAM_STR);
			$stmt->bindParam(8, $es, PDO::PARAM_STR);
			$stmt->bindParam(9, $pl, PDO::PARAM_STR);
			$stmt->bindParam(10, $it, PDO::PARAM_STR);
			$stmt->bindParam(11, $el, PDO::PARAM_STR);
			$stmt->bindParam(12, $ru, PDO::PARAM_STR);
			$stmt->bindParam(13, $id, PDO::PARAM_INT);
			if ($stmt->execute()) S(l(60));
			else E(l(58));
		}
	}

	class Item
	{
		public static function Price($id)
		{
			global $database;

			$stmt = $database->Sqlite("SELECT * FROM items_for_sell WHERE id=?");
			$stmt->bindParam(1, $id, PDO::PARAM_INT);
			$stmt->execute();
			$r                = $stmt->fetch(PDO::FETCH_ASSOC);

			if (isset($r['discount']) && $r['discount'] > 0)
			{
				$price            = $r['coins'];
				$discount_percent = $r['discount'];
				$discounted_price = $price - (($discount_percent / 100) * $price);

				print $discounted_price;
			}
			else print $r['coins'];

		}

		public static function DelACP($id)
		{
			global $database;

			$stmt = $database->Sqlite("DELETE FROM items_for_sell WHERE id=:input");
			$stmt->bindparam(":input", $id);
			if ($stmt->execute()) S(l(61));
			else E(l(58));
		}

		public static function Verify()
		{
			global $language_code;

			$item_names = 'system/txts/item_names_' . $language_code . '.txt';
			$itemdesc   = 'system/txts/itemdesc_' . $language_code . '.txt';
			$itemproto  = 'system/txts/item_proto.txt';
			if (!file_exists($item_names))
			{
				print '<div class="alert alert-warning">' . l(62) . ' <b>item_names_' . $language_code . '.txt</b> ' . l(63) . '<a style="float:right;" href="' . Basic::AURL() . 'proto-uploader"><i class="fa fa-external-link"></i></a></div>';
			}
			if (!file_exists($itemdesc))
			{
				print '<div class="alert alert-warning">' . l(62) . ' <b>itemdesc_' . $language_code . '.txt</b> ' . l(63) . ' <a style="float:right;" href="' . Basic::AURL() . 'proto-uploader"><i class="fa fa-external-link"></i></a></div>';
			}
			if (!file_exists($itemproto))
			{
				print '<div class="alert alert-warning">' . l(62) . ' <b>item_proto.txt</b> ' . l(63) . '<a style="float:right;" href="' . Basic::AURL() . 'proto-uploader"><i class="fa fa-external-link"></i></a></div>';
			}
		}

		public static function Language_Reader()
		{
			global $database;

			$stmt = $database->Language("PRAGMA table_info(shop_languages)");
			$stmt->execute();
			$excludedColumns = ['id', 'const'];
			$columns         = [];

			while ($row             = $stmt->fetch(PDO::FETCH_ASSOC))
			{
				$columnName      = $row['name'];
				if (!in_array($columnName, $excludedColumns))
				{
					$columns[]                 = $columnName;
				}
			}

			return $columns;
		}

		public static function Name($vnum)
		{
			global $language_code;

			$filename = 'system/txts/item_names_' . $language_code . '.txt';
			if (file_exists($filename))
			{
				$handle   = fopen($filename, 'r');
				if ($vnum != '')
				{
					while (!feof($handle))
					{
						$line     = fgets($handle);
						$data     = explode("\t", $line);
						if ($data[0] == $vnum)
						{
							fclose($handle);
							if (isset($data[1])) return $data[1];
						}
					}

					fclose($handle);
					return 'Not found';
				}
				else return '-';
			}
			else print '...';
		}

		public static function Description($vnum)
		{
			global $language_code;

			$filename = 'system/txts/itemdesc_' . $language_code . '.txt';
			if (file_exists($filename))
			{
				$handle   = fopen($filename, 'r');
				if ($vnum != '')
				{
					while (!feof($handle))
					{
						$line     = fgets($handle);
						$data     = explode("\t", $line);

						if ($data[0] == $vnum)
						{
							fclose($handle);
							if (isset($data[2])) return $data[2];
						}
					}

					fclose($handle);
					return l(64);
				}
				else return '-';
			}
			else return '...';
		}

		public static function Size($vnum, $columnName    = 'Size')
		{
			$filename      = 'system/txts/item_proto.txt';
			if (file_exists($filename))
			{
				$handle        = fopen($filename, 'r');
				if ($vnum != '')
				{
					$headerLine    = fgets($handle); // Read the header line to get column names
					$headerColumns = explode("\t", trim($headerLine));

					$sizeIndex     = array_search($columnName, $headerColumns);
					if ($sizeIndex === false)
					{
						fclose($handle);
						return 'Error: Column not found.';
					}

					while (!feof($handle))
					{
						$line = fgets($handle);
						$data = explode("\t", $line);

						if ($data[0] == $vnum)
						{
							fclose($handle);
							if (isset($data[$sizeIndex]))
							{
								return $data[$sizeIndex];
							}
						}
					}

					fclose($handle);
					return 'Error: Vnum not found.';
				}
				else
				{
					return 0;
				}
			}
			else
			{
				return 0;
			}
		}

		public static function Race_Can_Use($vnum)
		{
			$filename       = 'system/txts/item_proto.txt';
			if (file_exists($filename))
			{
				$handle         = fopen($filename, 'r');
				if ($vnum != '')
				{
					$headerLine     = fgets($handle);
					$headerColumns  = explode("\t", trim($headerLine));

					$antiFlagsIndex = array_search('AntiFlags', $headerColumns);
					if ($antiFlagsIndex === false)
					{
						fclose($handle);
						return 'Error: Column not found.';
					}

					while (!feof($handle))
					{
						$line = fgets($handle);
						$data = explode("\t", $line);

						if ($data[0] == $vnum)
						{
							fclose($handle);
							if (isset($data[$antiFlagsIndex]))
							{
								return $data[$antiFlagsIndex];
							}
						}
					}

					fclose($handle);
					return 'Error: Vnum not found.';
				}
				else
				{
					return false;
				}
			}
			else
			{
				return false;
			}
		}

		public static function Type($vnum)
		{
			$filename      = 'system/txts/item_proto.txt';
			if (file_exists($filename))
			{
				$handle        = fopen($filename, 'r');
				if ($vnum != '')
				{
					$headerLine    = fgets($handle); // Read the header line to get column names
					$headerColumns = explode("\t", trim($headerLine));

					$sizeIndex     = array_search('Type', $headerColumns);
					if ($sizeIndex === false)
					{
						fclose($handle);
						return 'Error: Column not found.';
					}

					while (!feof($handle))
					{
						$line = fgets($handle);
						$data = explode("\t", $line);

						if ($data[0] == $vnum)
						{
							fclose($handle);
							if (isset($data[$sizeIndex]))
							{
								return $data[$sizeIndex];
							}
						}
					}

					fclose($handle);
					return 'Error: Vnum not found.';
				}
				else
				{
					return 0;
				}
			}
			else
			{
				return 0;
			}
		}

		public static function SType($vnum)
		{
			$filename      = 'system/txts/item_proto.txt';
			if (file_exists($filename))
			{
				$handle        = fopen($filename, 'r');
				if ($vnum != '')
				{
					$headerLine    = fgets($handle); // Read the header line to get column names
					$headerColumns = explode("\t", trim($headerLine));

					$sizeIndex     = array_search('SubType', $headerColumns);
					if ($sizeIndex === false)
					{
						fclose($handle);
						return 'Error: Column not found.';
					}

					while (!feof($handle))
					{
						$line = fgets($handle);
						$data = explode("\t", $line);

						if ($data[0] == $vnum)
						{
							fclose($handle);
							if (isset($data[$sizeIndex]))
							{
								return $data[$sizeIndex];
							}
						}
					}

					fclose($handle);
					return 'Error: Vnum not found.';
				}
				else
				{
					return 0;
				}
			}
			else
			{
				return 0;
			}
		}

		public static function Level($vnum)
		{
			$filename      = 'system/txts/item_proto.txt';
			if (file_exists($filename))
			{
				$handle        = fopen($filename, 'r');
				if ($vnum != '')
				{
					$headerLine    = fgets($handle); // Read the header line to get column names
					$headerColumns = explode("\t", trim($headerLine));

					$sizeIndex     = array_search('LimitValue0', $headerColumns);
					if ($sizeIndex === false)
					{
						fclose($handle);
						return 'Error: Column not found.';
					}

					while (!feof($handle))
					{
						$line = fgets($handle);
						$data = explode("\t", $line);

						if ($data[0] == $vnum)
						{
							fclose($handle);
							if (isset($data[$sizeIndex]))
							{
								return $data[$sizeIndex];
							}
						}
					}

					fclose($handle);
					return 'Error: Vnum not found.';
				}
				else
				{
					return 0;
				}
			}
			else
			{
				return 0;
			}
		}

		public static function Proto($vnum, $tbl)
		{
			$filename      = 'system/txts/item_proto.txt';
			if (file_exists($filename))
			{
				$handle        = fopen($filename, 'r');
				if ($vnum != '')
				{
					$headerLine    = fgets($handle); // Read the header line to get column names
					$headerColumns = explode("\t", trim($headerLine));

					$sizeIndex     = array_search($tbl, $headerColumns);
					if ($sizeIndex === false)
					{
						fclose($handle);
						return 'Error: Column not found.';
					}

					while (!feof($handle))
					{
						$line = fgets($handle);
						$data = explode("\t", $line);

						if ($data[0] == $vnum)
						{
							fclose($handle);
							if (isset($data[$sizeIndex]))
							{
								return $data[$sizeIndex];
							}
						}
					}

					fclose($handle);
					return 'Error: Vnum not found.';
				}
				else
				{
					return 0;
				}
			}
			else
			{
				return 0;
			}
		}

		public static function Stone_Bonus($vnum)
		{
			$filename      = 'system/txts/item_proto.txt';
			if (file_exists($filename))
			{
				$handle        = fopen($filename, 'r');
				if ($vnum != '')
				{
					$headerLine    = fgets($handle); // Read the header line to get column names
					$headerColumns = explode("\t", trim($headerLine));

					$sizeIndex     = array_search('ApplyType0', $headerColumns);
					if ($sizeIndex === false)
					{
						fclose($handle);
						return 'Error: Column not found.';
					}

					while (!feof($handle))
					{
						$line = fgets($handle);
						$data = explode("\t", $line);

						if ($data[0] == $vnum)
						{
							fclose($handle);
							if (isset($data[$sizeIndex]))
							{
								return $data[$sizeIndex];
							}
						}
					}

					fclose($handle);
					return 'Error: Vnum not found.';
				}
				else
				{
					return 0;
				}
			}
			else
			{
				return 0;
			}
		}

		public static function Stone_Bonus_Value($vnum)
		{
			$filename      = 'system/txts/item_proto.txt';
			if (file_exists($filename))
			{
				$handle        = fopen($filename, 'r');
				if ($vnum != '')
				{
					$headerLine    = fgets($handle); // Read the header line to get column names
					$headerColumns = explode("\t", trim($headerLine));

					$sizeIndex     = array_search('ApplyValue0', $headerColumns);
					if ($sizeIndex === false)
					{
						fclose($handle);
						return 'Error: Column not found.';
					}

					while (!feof($handle))
					{
						$line = fgets($handle);
						$data = explode("\t", $line);

						if ($data[0] == $vnum)
						{
							fclose($handle);
							if (isset($data[$sizeIndex]))
							{
								return $data[$sizeIndex];
							}
						}
					}

					fclose($handle);
					return 'Error: Vnum not found.';
				}
				else
				{
					return 0;
				}
			}
			else
			{
				return 0;
			}
		}

		public static function GetTime($id)
		{
			switch ($id)
			{
				case 1:
					return 0;
				break;
				case 2:
					return 0;
				break;
				case 3:
					return 1;
				break;
				default:
					return null;
				break;
			}
		}

		public static function Column($name)
		{
			global $database;

			$sth = $database->Player("DESCRIBE item");
			$sth->execute();
			$columns = $sth->fetchAll(PDO::FETCH_COLUMN);

			if (in_array($name, $columns)) return true;
			else return false;
		}

		public static function Sash($id)
		{
			if ($id > 85000 && $id < 90000) return true;
			else return false;
		}

		public static function Stone($id)
		{
			if ($id >= 28000 && $id <= 28960) return true;
			else return false;
		}

		public static function BonusList()
		{
			global $database;
			global $language_code;

			$sth = $database->Language('SELECT ' . $language_code . ', id
					FROM bonus_list');
			$sth->execute();
			$result = $sth->fetchAll();

			foreach ($result as $row)
			{
				print '<option value=' . $row['id'] . '>' . str_replace("[n]", 'XXX', $row[$language_code]) . '</option>';
			}
		}

		public static function Image($vnum)
		{
			$filename = 'system/txts/item_list.txt';
			if (file_exists($filename))
			{
				$handle   = fopen($filename, 'r');

				while (!feof($handle))
				{
					$line     = fgets($handle);
					$data     = explode("\t", $line);

					if ($data[0] == $vnum)
					{
						fclose($handle);
						if (isset($data[2]))
						{
							$str1 = str_replace(".tga", ".png", $data[2]);
							return $str2 = str_replace("icon/", "", $str1);
						}
						else return '404.png';
					}
				}
				fclose($handle);
				return '404.png';
			}
			else return '404.png';
		}

		public static function Bonus_Show($id, $value)
		{
			global $database;
			global $language_code;

			$sth = $database->Language('SELECT ' . $language_code . ', id FROM bonus_list WHERE id = ? LIMIT 1');
			$sth->bindParam(1, $id, PDO::PARAM_INT);
			$sth->execute();
			$result = $sth->fetchAll();
			if (isset($result[0][$language_code]))
			{
				$ger    = str_replace("+[n]", '<div>+' . $value . '</div>', $result[0][$language_code]);
				return $ger;
			}
			else return l(65);
		}

		public static function Stone_Bonus_Name($id, $value)
		{
			global $database;
			global $language_code;
			if ($id != 'APPLY_NONE')
			{
				$str = str_replace("APPLY", 'TOOLTIP', $id);
				$sth = $database->Language('SELECT ' . $language_code . ' FROM bonus_list WHERE name LIKE ? LIMIT 1');
				$sth->bindParam(1, $str, PDO::PARAM_STR);
				$sth->execute();
				$result = $sth->fetchAll();
				if (isset($result[0][$language_code]))
				{
					$ger    = str_replace("[n]", $value, $result[0][$language_code]);
					return $ger;
				}
				else
				{
					$sth = $database->Language('SELECT ' . $language_code . ' FROM bonus_list WHERE name LIKE ? LIMIT 1');
					$sth->bindParam(1, $id, PDO::PARAM_STR);
					$sth->execute();
					$result = $sth->fetchAll();
					if (isset($result[0][$language_code]))
					{
						$ger    = str_replace("[n]", $value, $result[0][$language_code]);
						return $ger;
					}
				}
			}
		}

		public static function Bonus_Name_Only($id, $value)
		{
			global $database;
			global $language_code;

			$sth = $database->Language('SELECT ' . $language_code . ', id FROM bonus_list WHERE id = ? LIMIT 1');
			$sth->bindParam(1, $id, PDO::PARAM_INT);
			$sth->execute();
			$result = $sth->fetchAll();
			if (isset($result[0][$language_code]))
			{
				$ger    = str_replace("[n]", $value, $result[0][$language_code]);
				return $ger;
			}
		}

		public static function Bonus_Name_Basic($id, $value)
		{
			global $database;
			global $language_code;

			$sth = $database->Language('SELECT ' . $language_code . ', id FROM bonus_list WHERE id = ? LIMIT 1');
			$sth->bindParam(1, $id, PDO::PARAM_INT);
			$sth->execute();
			$result = $sth->fetchAll();
			if (isset($result[0][$language_code]))
			{
				$ger    = str_replace("+[n]", $value, $result[0][$language_code]);
				return $ger;
			}
		}

		public static function Bonus($id)
		{
			global $database;

			$sth = $database->Sqlite('SELECT attrtype0, attrvalue0, attrtype1, attrvalue1,
					attrtype2, attrvalue2, attrtype3, attrvalue3, attrtype4, attrvalue4,
					attrtype5, attrvalue5, attrtype6, attrvalue6
					FROM items_for_sell
					WHERE id = ?');
			$sth->bindParam(1, $id, PDO::PARAM_INT);
			$sth->execute();
			$result = $sth->fetchAll();

			for ($i      = 0;$i <= 6;$i++)
			{
				if (isset($result[0]['attrtype' . $i]) && $result[0]['attrtype' . $i] > 0)
				{
					print Item::Bonus_Name_Only($result[0]['attrtype' . $i], $result[0]['attrvalue' . $i]);
					print '<br>';
				}
			}
		}

		public static function Discount($id, $percent, $expire)
		{
			global $database;
			$exp = date("Y-m-d H:i:s", strtotime($expire));
			$sth = $database->Sqlite('UPDATE items_for_sell SET discount=?, discount_expire=? WHERE id = ?');
			$sth->bindParam(1, $percent, PDO::PARAM_INT);
			$sth->bindParam(2, $exp, PDO::PARAM_STR);
			$sth->bindParam(3, $id, PDO::PARAM_INT);
			if ($sth->execute()) S(l(66));

		}
	}

	class Payments
	{
		public static function Settings_Update($public, $secret, $uid)
		{
			global $database;

			$sth = $database->Sqlite("UPDATE payments SET public=?, secret=?, uid=? WHERE id='1'");
			$sth->bindParam(1, $public, PDO::PARAM_STR);
			$sth->bindParam(2, $secret, PDO::PARAM_STR);
			$sth->bindParam(3, $uid, PDO::PARAM_INT);
			$sth->execute();
		}

		public static function Settings_Get($val)
		{
			global $database;

			$sth = $database->Sqlite("SELECT " . $val . " FROM payments WHERE id = '1'");
			$sth->execute();
			$res = $sth->fetch(PDO::FETCH_ASSOC);

			if (isset($res[$val])) return $res[$val];
		}

		public static function Account($val)
		{
			global $database;

			$sth = $database->Account("SELECT " . $val . " FROM account WHERE id= ?");
			$sth->bindParam(1, $_SESSION['id'], PDO::PARAM_INT);
			$sth->execute();
			$res = $sth->fetch(PDO::FETCH_ASSOC);

			if (isset($res[$val])) return $res[$val];
		}

		public static function AddCoins($username, $email, $val)
		{
			global $database;

			$sth = $database->Account("UPDATE account SET coins=coins+:val WHERE login=:login AND email=:email");
			$sth->bindParam(':val', $val, PDO::PARAM_INT);
			$sth->bindParam(':login', $username, PDO::PARAM_STR);
			$sth->bindParam(':email', $email, PDO::PARAM_STR);
			$sth->execute();
		}

		public static function GetLink()
		{
			define("API_ENCRYPTION", "encrypt.php?key="); //Dont edit
			$api_pub = file_get_contents(API_CALL . API_ENCRYPTION . Payments::Settings_Get('public'));
			$api_sec = file_get_contents(API_CALL . API_ENCRYPTION . Payments::Settings_Get('secret'));
			$api_gid = file_get_contents(API_CALL . API_ENCRYPTION . Payments::Settings_Get('uid'));

			if ($api_pub !== false && $api_sec !== false && $api_gid !== false)
			{
				$call    = '?call=1&public=' . urlencode($api_pub);
				$call .= '&secret=' . urlencode($api_sec);
				$call .= '&gid=' . urlencode($api_gid);
				$call .= '&uid=' . urlencode(Payments::Account('login'));
				$call .= '&uem=' . urlencode(Payments::Account('email'));
				$call = API_CALL . "client/" . base64_encode($call);
				print '<script>window.location.replace("' . $call . '")</script>';
			}
			else die();
		}
	}

	class User_Shop
	{
		public static function ItemsCategories($val)
		{
			global $database;

			if ($val == 0) $sth = $database->Sqlite("SELECT * FROM items_for_sell");
			else
			{
				$sth = $database->Sqlite("SELECT * FROM items_for_sell WHERE category=?");
				$sth->bindParam(1, $val, PDO::PARAM_INT);
			}
			$sth->execute();
			$res = $sth->fetchAll();

			return $res;
		}

		public static function Expire()
		{
			global $database;

			$sth = $database->Sqlite("SELECT * FROM items_for_sell WHERE discount_expire!='0' OR expire!='0'");
			$sth->execute();
			$res         = $sth->fetch(PDO::FETCH_ASSOC);

			if (isset($res['discount']) && $res['discount'] > 0)
			{
				$currentDate = new DateTime();
				$targetDate  = new DateTime($res['discount_expire']);
				if ($currentDate > $targetDate)
				{
					$sth         = $database->Sqlite("UPDATE items_for_sell SET discount='0', discount_expire = '0' WHERE id=?");
					$sth->bindParam(1, $res['id'], PDO::PARAM_INT);
					$sth->execute();
				}
			}
			if (isset($res['discount']) && $res['expire'] > 0)
			{
				$crt_time = time();
				$db_time  = $res['expire'];
				if ($crt_time > $db_time)
				{
					$sth      = $database->Sqlite("DELETE FROM items_for_sell WHERE id=?");
					$sth->bindParam(1, $res['id'], PDO::PARAM_INT);
					$sth->execute();
				}
			}

		}

		public static function Item($val, $show)
		{
			global $database;

			$sth = $database->Sqlite("SELECT * FROM items_for_sell WHERE id=?");
			$sth->bindParam(1, $val, PDO::PARAM_INT);
			$sth->execute();
			$res = $sth->fetch(PDO::FETCH_ASSOC);

			if (isset($res[$show])) return $res[$show];
		}

		public static function Offers()
		{
			global $database;

			$sth = $database->Sqlite("SELECT * FROM offers");
			$sth->execute();
			$res = $sth->fetchAll();

			$var = array();
			$var = $res;
			return $var;
		}

		public static function BuyLimit($id)
		{
			global $database;

			$sth = $database->Sqlite("SELECT * FROM items_for_sell WHERE id=?");
			$sth->bindParam(1, $id, PDO::PARAM_INT);
			$sth->execute();
			$res = $sth->fetch(PDO::FETCH_ASSOC);
			if (isset($res['item_unique']))
			{
				if ($res['item_unique'] == 0) return true;
				else
				{
					$stmt = $database->Sqlite("SELECT count(*) as total FROM shopping_logs WHERE status='Success' AND pkg=? AND user_id=?");
					$stmt->bindParam(1, $id, PDO::PARAM_INT);
					$stmt->bindParam(2, $_SESSION['id'], PDO::PARAM_INT);
					$stmt->execute();
					$logs = $stmt->fetch(PDO::FETCH_ASSOC);
					if ($logs['total'] >= $res['item_unique']) return false;
					else return true;
				}
			}
		}

		public static function BuyLimitCount($id)
		{
			global $database;

			$stmt = $database->Sqlite("SELECT count(*) as total FROM shopping_logs WHERE status='Success' AND pkg=? AND user_id=?");
			$stmt->bindParam(1, $id, PDO::PARAM_INT);
			$stmt->bindParam(2, $_SESSION['id'], PDO::PARAM_INT);
			$stmt->execute();
			$logs = $stmt->fetch(PDO::FETCH_ASSOC);

			return $logs['total'];
		}
	}

	class User
	{
		public static function Account($show)
		{
			global $database;

			$sth = $database->Account("SELECT * FROM account WHERE id=?");
			$sth->bindParam(1, $_SESSION['id'], PDO::PARAM_INT);
			$sth->execute();
			$res = $sth->fetch(PDO::FETCH_ASSOC);

			if (isset($res[$show])) return $res[$show];
		}
		
		public static function Data($id, $show)
		{
			global $database;

			$sth = $database->Account("SELECT * FROM account WHERE id=?");
			$sth->bindParam(1, $id, PDO::PARAM_INT);
			$sth->execute();
			$res = $sth->fetch(PDO::FETCH_ASSOC);

			if (isset($res[$show])) return $res[$show];
		}

		public static function Username($show)
		{
			global $database;

			$sth = $database->Account("SELECT * FROM account WHERE id=?");
			$sth->bindParam(1, $show, PDO::PARAM_INT);
			$sth->execute();
			$res = $sth->fetch(PDO::FETCH_ASSOC);

			if (isset($res['login'])) return $res['login'];
		}

		public static function ItemPosition($item)
		{
			global $database;

			$sth = $database->Player('SELECT pos, vnum FROM item WHERE owner_id=? AND window="MALL" ORDER by pos ASC');
			$sth->bindParam(1, $_SESSION['id'], PDO::PARAM_INT);
			$sth->execute();
			$result     = $sth->fetchAll();

			$used       = $items_used = $used_check = array();

			foreach ($result as $row)
			{
				$used_check[]            = $row['pos'];
				$used[$row['pos']]            = 1;
				$items_used[$row['pos']]            = $row['vnum'];
			}
			$used_check = array_unique($used_check);

			$free       = - 1;

			for ($i          = 0;$i < 45;$i++)
			{
				if (!in_array($i, $used_check))
				{
					$ok = true;

					if ($i > 4 && $i < 10)
					{
						if (array_key_exists($i - 5, $used) && Item::Size($items_used[$i - 5]) > 1) $ok = false;
					}
					else if ($i > 9 && $i < 40)
					{
						if (array_key_exists($i - 5, $used) && Item::Size($items_used[$i - 5]) > 1) $ok = false;

						if (array_key_exists($i - 10, $used) && Item::Size($items_used[$i - 10]) > 2) $ok = false;
					}
					else if ($i > 39 && $i < 45 && Item::Size($item) > 1) $ok = false;

					if ($ok) return $i;
				}
			}

			return $free;
		}

		public static function SaveLogs($status, $item_id)
		{
			global $database;

			switch ($status)
			{
				case '1':
					$message = l(67);
				break;

				case '2':
					$message = l(68);
				break;

				case '3':
					$message = l(69);
				break;

				case '4':
					$message = l(70);
				break;

				default:
					$message   = '404';
			}
			$item_vnum = User_Shop::Item($item_id, 'vnum');
			$item_coin = User_Shop::Item($item_id, 'coins');
			$item_cout = User_Shop::Item($item_id, 'count');
			$my_coins  = User::Account('coins');
			$date      = date('Y-m-d H:i:s');
			$sth       = $database->Sqlite('INSERT INTO shopping_logs (user_id, vnum, coins, count, date, status, pkg) VALUES (?,?,?,?,?,?,?)');
			$sth->bindParam(1, $_SESSION['id'], PDO::PARAM_INT);
			$sth->bindParam(2, $item_vnum, PDO::PARAM_INT);
			$sth->bindParam(3, $item_coin, PDO::PARAM_INT);
			$sth->bindParam(4, $item_cout, PDO::PARAM_INT);
			$sth->bindParam(5, $date, PDO::PARAM_STR);
			$sth->bindParam(6, $message, PDO::PARAM_STR);
			$sth->bindParam(7, $item_id, PDO::PARAM_INT);
			$sth->execute();
		}

		public static function BuyItem($item_id)
		{
			global $database;
			if (User_Shop::Item($item_id, 'discount') > 0)
			{
				$item_coin = User_Shop::Item($item_id, 'coins') - ((User_Shop::Item($item_id, 'discount') / 100) * User_Shop::Item($item_id, 'coins'));
			}
			else $item_coin = User_Shop::Item($item_id, 'coins');
			$my_coins  = User::Account('coins');

			if ($item_coin <= $my_coins)
			{
				$sth       = $database->Account('UPDATE account SET coins=coins-? WHERE id = ?');
				$sth->bindParam(1, $item_coin, PDO::PARAM_INT);
				$sth->bindParam(2, $_SESSION['id'], PDO::PARAM_INT);
				if ($sth->execute())
				{
					if (User::GetItem($item_id))
					{
						print '<script>Success("' . l(71) . '");var coinsheaderstatus = document.getElementById("coinsheaderstatus");coinsheaderstatus.disabled = true;coinsheaderstatus.innerHTML = ' . $my_coins - $item_coin . ';</script>';
						User::SaveLogs(1, $item_id);
						User::UpdateBuyersCount($item_id);
					}
					else
					{
						print '<script>Error("' . l(58) . '");</script>';
						User::SaveLogs(2, $item_id);
					}
				}
				else
				{
					print '<script>Error("' . l(72) . '");</script>';
					User::SaveLogs(3, $item_id);
				}
			}
			else
			{
				print '<script>Error("' . l(15) . '");</script>';
				User::SaveLogs(4, $item_id);
			}
		}

		public static function UpdateBuyersCount($id)
		{
			global $database;

			$sth = $database->Sqlite('UPDATE items_for_sell SET bought_count=bought_count+1 WHERE id = ?');
			$sth->bindParam(1, $id, PDO::PARAM_INT);
			$sth->execute();
		}

		public static function GetItem($id)
		{
			global $database;

			$sth = $database->Sqlite('SELECT * FROM items_for_sell WHERE id = ?');
			$sth->bindParam(1, $id, PDO::PARAM_INT);
			$sth->execute();
			$result        = $sth->fetchAll();

			$item_position = User::ItemPosition($result[0]['vnum']);

			if ($item_position == - 1) return false;

			if (Item::Column("applytype0"))
			{
				if ($result[0]['type'] == 1)
				{
					$time_costume = time() + 60 * intval($result[0]['socket0']);
					$stmt         = $database->Player('INSERT INTO item (owner_id, window, pos, count, vnum, socket0, socket1, socket2, attrtype0, attrvalue0, attrtype1 , attrvalue1, attrtype2, attrvalue2, attrtype3, attrvalue3, attrtype4, attrvalue4, attrtype5, attrvalue5, attrtype6, attrvalue6, applytype0, applyvalue0, applytype1, applyvalue1, applytype2, applyvalue2, applytype3, applyvalue3, applytype4, applyvalue4, applytype5, applyvalue5, applytype6, applyvalue6, applytype7, applyvalue7) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)');
					if ($stmt->execute(array(
						$_SESSION['id'],
						"MALL",
						$item_position,
						$result[0]['count'],
						$result[0]['vnum'],
						$time_costume,
						$result[0]['socket1'],
						$result[0]['socket2'],
						$result[0]['attrtype0'],
						$result[0]['attrvalue0'],
						$result[0]['attrtype1'],
						$result[0]['attrvalue1'],
						$result[0]['attrtype2'],
						$result[0]['attrvalue2'],
						$result[0]['attrtype3'],
						$result[0]['attrvalue3'],
						$result[0]['attrtype4'],
						$result[0]['attrvalue4'],
						$result[0]['attrtype5'],
						$result[0]['attrvalue5'],
						$result[0]['attrtype6'],
						$result[0]['attrvalue6'],
						$result[0]['applytype0'],
						$result[0]['applyvalue0'],
						$result[0]['applytype1'],
						$result[0]['applyvalue1'],
						$result[0]['applytype2'],
						$result[0]['applyvalue2'],
						$result[0]['applytype3'],
						$result[0]['applyvalue3'],
						$result[0]['applytype4'],
						$result[0]['applyvalue4'],
						$result[0]['applytype5'],
						$result[0]['applyvalue5'],
						$result[0]['applytype6'],
						$result[0]['applyvalue6'],
						$result[0]['applytype7'],
						$result[0]['applyvalue7']
					))) return true;
				}
				else
				{
					$stmt = $database->Player('INSERT INTO item (owner_id, window, pos, count, vnum, socket0, socket1, socket2, attrtype0, attrvalue0, attrtype1 , attrvalue1, attrtype2, attrvalue2, attrtype3, attrvalue3, attrtype4, attrvalue4, attrtype5, attrvalue5, attrtype6, attrvalue6, applytype0, applyvalue0, applytype1, applyvalue1, applytype2, applyvalue2, applytype3, applyvalue3, applytype4, applyvalue4, applytype5, applyvalue5, applytype6, applyvalue6, applytype7, applyvalue7) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)');
					if ($stmt->execute(array(
						$_SESSION['id'],
						"MALL",
						$item_position,
						$result[0]['count'],
						$result[0]['vnum'],
						$result[0]['socket0'],
						$result[0]['socket1'],
						$result[0]['socket2'],
						$result[0]['attrtype0'],
						$result[0]['attrvalue0'],
						$result[0]['attrtype1'],
						$result[0]['attrvalue1'],
						$result[0]['attrtype2'],
						$result[0]['attrvalue2'],
						$result[0]['attrtype3'],
						$result[0]['attrvalue3'],
						$result[0]['attrtype4'],
						$result[0]['attrvalue4'],
						$result[0]['attrtype5'],
						$result[0]['attrvalue5'],
						$result[0]['attrtype6'],
						$result[0]['attrvalue6'],
						$result[0]['applytype0'],
						$result[0]['applyvalue0'],
						$result[0]['applytype1'],
						$result[0]['applyvalue1'],
						$result[0]['applytype2'],
						$result[0]['applyvalue2'],
						$result[0]['applytype3'],
						$result[0]['applyvalue3'],
						$result[0]['applytype4'],
						$result[0]['applyvalue4'],
						$result[0]['applytype5'],
						$result[0]['applyvalue5'],
						$result[0]['applytype6'],
						$result[0]['applyvalue6'],
						$result[0]['applytype7'],
						$result[0]['applyvalue7']
					))) return true;
				}
			}
			else
			{
				if ($result[0]['type'] == 1)
				{
					$time_costume = time() + 60 * intval($result[0]['socket0']);
					$stmt         = $database->Player('INSERT INTO item (owner_id, window, pos, count, vnum, socket0, socket1, socket2, attrtype0, attrvalue0, attrtype1 , attrvalue1, attrtype2, attrvalue2, attrtype3, attrvalue3, attrtype4, attrvalue4, attrtype5, attrvalue5, attrtype6, attrvalue6) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)');
					if ($stmt->execute(array(
						$_SESSION['id'],
						"MALL",
						$item_position,
						$result[0]['count'],
						$result[0]['vnum'],
						$time_costume,
						$result[0]['socket1'],
						$result[0]['socket2'],
						$result[0]['attrtype0'],
						$result[0]['attrvalue0'],
						$result[0]['attrtype1'],
						$result[0]['attrvalue1'],
						$result[0]['attrtype2'],
						$result[0]['attrvalue2'],
						$result[0]['attrtype3'],
						$result[0]['attrvalue3'],
						$result[0]['attrtype4'],
						$result[0]['attrvalue4'],
						$result[0]['attrtype5'],
						$result[0]['attrvalue5'],
						$result[0]['attrtype6'],
						$result[0]['attrvalue6']
					))) return true;
				}
				else
				{
					$stmt = $database->Player('INSERT INTO item (owner_id, window, pos, count, vnum, socket0, socket1, socket2, attrtype0, attrvalue0, attrtype1 , attrvalue1, attrtype2, attrvalue2, attrtype3, attrvalue3, attrtype4, attrvalue4, attrtype5, attrvalue5, attrtype6, attrvalue6) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)');
					if ($stmt->execute(array(
						$_SESSION['id'],
						"MALL",
						$item_position,
						$result[0]['count'],
						$result[0]['vnum'],
						$result[0]['socket0'],
						$result[0]['socket1'],
						$result[0]['socket2'],
						$result[0]['attrtype0'],
						$result[0]['attrvalue0'],
						$result[0]['attrtype1'],
						$result[0]['attrvalue1'],
						$result[0]['attrtype2'],
						$result[0]['attrvalue2'],
						$result[0]['attrtype3'],
						$result[0]['attrvalue3'],
						$result[0]['attrtype4'],
						$result[0]['attrvalue4'],
						$result[0]['attrtype5'],
						$result[0]['attrvalue5'],
						$result[0]['attrtype6'],
						$result[0]['attrvalue6']
					))) return true;
				}
			}
			return false;
		}

		public static function TakeCoins($coins)
		{
			global $database;

			$sth = $database->Account('UPDATE account SET coins=coins-? WHERE id = ?');
			$sth->bindParam(1, $coins, PDO::PARAM_INT);
			$sth->bindParam(2, $_SESSION['id'], PDO::PARAM_INT);
			if ($sth->execute()) return true;
			else return false;
		}

		public static function GiveBackCoins($coins)
		{
			global $database;

			$sth = $database->Account('UPDATE account SET coins=coins+? WHERE id = ?');
			$sth->bindParam(1, $coins, PDO::PARAM_INT);
			$sth->bindParam(2, $_SESSION['id'], PDO::PARAM_INT);
			if ($sth->execute()) return true;
			else return false;
		}
	}

	class Roll
	{
		public static function Get($id)
		{
			global $database;

			$sth = $database->Sqlite('SELECT * FROM case_items WHERE case_id=? ORDER BY id ASC');
			$sth->bindParam(1, $id, PDO::PARAM_INT);
			$sth->execute();
			return $result = $sth->fetchAll();
		}

		public static function GetOrder($id)
		{
			global $database;

			$sth = $database->Sqlite('SELECT * FROM case_items WHERE case_id=? ORDER BY chance ASC');
			$sth->bindParam(1, $id, PDO::PARAM_INT);
			$sth->execute();
			return $result = $sth->fetchAll();
		}

		public static function GetOrderAdmin($id)
		{
			global $database;

			$sth = $database->Sqlite('SELECT * FROM case_items WHERE case_id=? ORDER BY chance DESC');
			$sth->bindParam(1, $id, PDO::PARAM_INT);
			$sth->execute();
			return $result = $sth->fetchAll();
		}

		public static function WinRate($percent)
		{
			if ($percent <= 10) print '<span style="color:#EB4B4B;"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></span>';
			elseif ($percent >= 11 && $percent <= 30) print '<span style="color:#D32CE6;"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></span>';
			elseif ($percent >= 31 && $percent <= 50) print '<span style="color:#8847FF;"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></span>';
			elseif ($percent >= 51 && $percent <= 70) print '<span style="color:#4B69FF;"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></span>';
			elseif ($percent >= 71 && $percent <= 100) print '<span style="color:#B0C3D9;"><i class="fa-solid fa-star"></i></span>';
		}

		public static function Color($percent)
		{
			if ($percent <= 10) return '5';
			elseif ($percent >= 11 && $percent <= 30) return '4';
			elseif ($percent >= 31 && $percent <= 50) return '3';
			elseif ($percent >= 51 && $percent <= 70) return '2';
			elseif ($percent >= 71 && $percent <= 100) return '1';
		}

		public static function Logs($who, $when, $case, $vnum, $chance)
		{
			global $database;

			$stmt = $database->Sqlite("INSERT INTO case_logs (who, time, case_id, win_item, chance) VALUES (?,?,?,?,?)");
			$stmt->bindParam(1, $who, PDO::PARAM_STR);
			$stmt->bindParam(2, $when, PDO::PARAM_STR);
			$stmt->bindParam(3, $case, PDO::PARAM_STR);
			$stmt->bindParam(4, $vnum, PDO::PARAM_STR);
			$stmt->bindParam(5, $chance, PDO::PARAM_STR);
			$stmt->execute();
		}

		public static function Price($variable)
		{
			global $database;

			$stmt = $database->Sqlite("SELECT * FROM case_category WHERE id='$variable'");
			$stmt->execute();

			$result = $stmt->fetch(PDO::FETCH_ASSOC);
			if (isset($result['price'])) return $result['price'];
		}

		public static function GetPrize($vnum)
		{
			global $database;

			$item_position = User::ItemPosition($vnum);
			if ($item_position > - 1)
			{
				$stmt          = $database->Player('INSERT INTO item (owner_id, window, pos, count, vnum) VALUES (?,?,?,?,?)');
				if ($stmt->execute(array(
					$_SESSION['id'],
					"MALL",
					$item_position,
					'1',
					$vnum
				))) return true;
				else return false;
			}
		}
	}

	class CaseOpener
	{
		public static function Get()
		{
			global $database;

			$stmt = $database->Sqlite('SELECT * FROM case_category ORDER BY id ASC');
			$stmt->execute();

			return $stmt->fetchAll();
		}

		public static function GetItems($id)
		{
			global $database;

			$stmt = $database->Sqlite("SELECT * FROM case_items WHERE case_id=?");
			$stmt->bindParam(1, $id, PDO::PARAM_INT);
			$stmt->execute();

			return $stmt->fetchAll();
		}

		public static function Create($price)
		{
			global $database;

			$stmt = $database->Language("SELECT MAX(id) as maxid FROM shop_languages");
			$stmt->execute();
			$lastId = $stmt->fetch(PDO::FETCH_ASSOC);

			$newId  = $lastId['maxid'] + 1;
			$stmt   = $database->Language("INSERT INTO shop_languages (id) VALUES (:newId)");
			$stmt->bindparam(":newId", $newId);
			$stmt->execute();

			$stmt = $database->Sqlite("INSERT INTO case_category (name, price) VALUES (:newId, :price)");
			$stmt->bindparam(":newId", $newId);
			$stmt->bindparam(":price", $price);
			if ($stmt->execute()) S(l(57));
			else E(l(58));
		}

		public static function AddItem($case, $vnum, $chance)
		{
			global $database;

			$stmt = $database->Sqlite("INSERT INTO case_items (case_id, item_vnum, chance) VALUES (?,?,?)");
			$stmt->bindParam(1, $case, PDO::PARAM_STR);
			$stmt->bindParam(2, $vnum, PDO::PARAM_STR);
			$stmt->bindParam(3, $chance, PDO::PARAM_STR);
			if ($stmt->execute()) S(l(59));
			else E(l(58));
		}

		public static function RemoveItem($id)
		{
			global $database;

			$stmt = $database->Sqlite("DELETE FROM case_items WHERE id=:input");
			$stmt->bindparam(":input", $id);
			$stmt->execute();
		}

		public static function Del($id, $name)
		{
			global $database;

			$stmt = $database->Sqlite("DELETE FROM case_category WHERE id=:input");
			$stmt->bindparam(":input", $id);

			$stmu = $database->Language("DELETE FROM shop_languages WHERE id=:input");
			$stmu->bindparam(":input", $name);

			if ($stmt->execute() && $stmu->execute()) S(l(61));
			else E(l(58));
		}

		public static function Language($variable)
		{
			global $database, $language_code;

			$stmt = $database->Language("SELECT * FROM shop_languages WHERE id='$variable'");
			$stmt->execute();

			$result = $stmt->fetch(PDO::FETCH_ASSOC);
			if (isset($result[$language_code])) return $result[$language_code];
			elseif (isset($result['en'])) return $result['en'];
			else return '...';
		}

		public static function Translation($variable, $output)
		{
			global $database, $language_code;

			$stmt = $database->Language("SELECT * FROM shop_languages WHERE id='$variable'");
			$stmt->execute();

			$result = $stmt->fetch(PDO::FETCH_ASSOC);
			if (isset($result[$output])) return $result[$output];
			else return '...';
		}

		public static function NameID($variable)
		{
			global $database;

			$stmt = $database->Sqlite("SELECT * FROM case_category WHERE id='$variable'");
			$stmt->execute();

			$result = $stmt->fetch(PDO::FETCH_ASSOC);
			if (isset($result['name'])) return $result['name'];
			else return '...';
		}

		public static function EditTranslate($en, $ro, $ar, $de, $fr, $tr, $hu, $es, $pl, $it, $el, $ru, $id)
		{
			global $database;

			$stmt = $database->Language("UPDATE shop_languages SET en = ?, ro = ?, ar = ?, de = ?, fr = ?,tr = ?, hu = ?, es = ?, pl = ?, it = ?, el = ?, ru = ? WHERE id=?");
			$stmt->bindParam(1, $en, PDO::PARAM_STR);
			$stmt->bindParam(2, $ro, PDO::PARAM_STR);
			$stmt->bindParam(3, $ar, PDO::PARAM_STR);
			$stmt->bindParam(4, $de, PDO::PARAM_STR);
			$stmt->bindParam(5, $fr, PDO::PARAM_STR);
			$stmt->bindParam(6, $tr, PDO::PARAM_STR);
			$stmt->bindParam(7, $hu, PDO::PARAM_STR);
			$stmt->bindParam(8, $es, PDO::PARAM_STR);
			$stmt->bindParam(9, $pl, PDO::PARAM_STR);
			$stmt->bindParam(10, $it, PDO::PARAM_STR);
			$stmt->bindParam(11, $el, PDO::PARAM_STR);
			$stmt->bindParam(12, $ru, PDO::PARAM_STR);
			$stmt->bindParam(13, $id, PDO::PARAM_INT);
			if ($stmt->execute()) S(l(60));
			else E(l(58));
		}

		public static function History()
		{
			global $database;

			$stmt = $database->Sqlite("SELECT * FROM case_logs WHERE who=? ORDER BY time DESC LIMIT 40");
			$stmt->bindParam(1, $_SESSION['usern'], PDO::PARAM_STR);
			$stmt->execute();

			return $stmt->fetchAll();
		}
	}

	class Settings
	{
		public static function Get($id)
		{
			global $database;

			$stmt = $database->Sqlite('SELECT * FROM settings WHERE id=:ids');
			$stmt->execute(array(
				':ids'        => $id
			));
			$result = $stmt->fetch(PDO::FETCH_ASSOC);

			if (isset($result['value'])) return $result['value'];
		}

		public static function Update($id, $val)
		{
			global $database;

			$stmt = $database->Sqlite('UPDATE settings SET value=? WHERE id=?');
			$stmt->bindParam(1, $val, PDO::PARAM_STR);
			$stmt->bindParam(2, $id, PDO::PARAM_INT);
			if ($stmt->execute()) S(l(73));
			else E(l(58));
		}
	}

	class Requests
	{
		public static function Get($url, $timeout = 10)
		{
			$context = stream_context_create(['http'         => ['timeout'         => $timeout, ], ]);

			$content = @file_get_contents($url, false, $context);

			if ($content === false)
			{
				echo "Failed to fetch content or request timed out.";
				return null;
			}

			return $content;
		}

		public static function Encode($x)
		{
			$prepare = urlencode($x);
			return Requests::Get(API_CALL . 'encrypt.php?key=' . $prepare, 5);
		}

		public static function Dashboard($x)
		{
			$api_pub = Requests::Encode(Payments::Settings_Get('public'));
			$api_sec = Requests::Encode(Payments::Settings_Get('secret'));
			$api_gid = Requests::Encode(Payments::Settings_Get('uid'));

			if ($api_pub !== false && $api_sec !== false && $api_gid !== false)
			{
				$call    = '?call=1&w=' . $x . '&public=' . urlencode($api_pub);
				$call .= '&secret=' . urlencode($api_sec);
				$call .= '&gid=' . urlencode($api_gid);
				$call = API_CALL . "info/" . base64_encode($call);
			}

			print Requests::Get($call);
		}
		
		public static function Transactions($x,$a)
		{
			$api_pub = Requests::Encode(Payments::Settings_Get('public'));
			$api_sec = Requests::Encode(Payments::Settings_Get('secret'));
			$api_gid = Requests::Encode(Payments::Settings_Get('uid'));

			if ($api_pub !== false && $api_sec !== false && $api_gid !== false)
			{
				$call    = '?call=1&w=' . $x . '&public=' . urlencode($api_pub);
				$call .= '&secret=' . urlencode($api_sec);
				$call .= '&gid=' . urlencode($api_gid);
				$call .= '&acc=' . urlencode($a);
				$call = API_CALL . "info/" . base64_encode($call);
			}

			print Requests::Get($call);
		}
	}

	class Ads
	{
		public static function Get($id, $table)
		{
			global $database;

			$stmt = $database->Sqlite('SELECT * FROM offers WHERE offer=?');
			$stmt->bindParam(1, $id, PDO::PARAM_INT);
			$stmt->execute();
			$result = $stmt->fetch(PDO::FETCH_ASSOC);

			if (isset($result[$table])) return $result[$table];
			else return false;
		}

		public static function Exist($id)
		{
			global $database;

			$stmt = $database->Sqlite('SELECT count(*) as count FROM offers WHERE offer=?');
			$stmt->bindParam(1, $id, PDO::PARAM_INT);
			$stmt->execute();
			$result = $stmt->fetch(PDO::FETCH_ASSOC);
			if ($result['count']) return false;
			else return true;
		}

		public static function Add($id, $title, $desc, $offer, $img)
		{
			global $database;

			$stmt = $database->Sqlite('INSERT INTO offers (title, desc, offer, image) VALUES (?,?,?,?)');
			$stmt->bindParam(1, $title, PDO::PARAM_STR);
			$stmt->bindParam(2, $desc, PDO::PARAM_STR);
			$stmt->bindParam(3, $offer, PDO::PARAM_INT);
			$stmt->bindParam(4, $img, PDO::PARAM_STR);
			if ($stmt->execute()) S(l(74));
		}

		public static function Remove($id)
		{
			global $database;

			$stmt = $database->Sqlite('DELETE FROM offers WHERE id=:id');
			$stmt->bindParam(1, $id, PDO::PARAM_INT);
			if ($stmt->execute()) S(l(75));
		}

		public static function Edit($id, $title, $desc, $img)
		{
			global $database;

			$stmt = $database->Sqlite('UPDATE offers SET title=?, desc=?, image=? WHERE id=?');
			$stmt->bindParam(1, $title, PDO::PARAM_STR);
			$stmt->bindParam(2, $desc, PDO::PARAM_STR);
			$stmt->bindParam(3, $img, PDO::PARAM_STR);
			$stmt->bindParam(4, $id, PDO::PARAM_INT);
			if ($stmt->execute()) S(l(76));
		}
	}

	class Language
	{
		public static function All()
		{
			global $database, $language_code;

			$stmt = $database->Language('SELECT * FROM shop_languages_status WHERE status="1" AND code!=?');
			$stmt->bindParam(1, $language_code, PDO::PARAM_STR);
			$stmt->execute();
			$result = $stmt->fetchAll();

			return $result;
		}
	}

	class Lang
	{
		public static function Change($var)
		{
			$redir = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]";
			$redir .= '?lang=' . $var;

			return $redir;
		}

		public static function Update($langcode, $upload, $id)
		{
			global $database;

			$stmt = $database->Language("UPDATE shop_languages SET $langcode=:value WHERE const=:id");
			$stmt->execute(array(
				':id' => $id,
				':value' => $upload
			));
		}

		public static function Add($langcode)
		{
			global $database;

			$stmt = $database->Language("ALTER TABLE shop_languages ADD $langcode VARCHAR;");
			if ($stmt->execute()) return true;
			else return false;
		}

		public static function GetStatus($langcode)
		{
			global $database;

			$stmt = $database->Language("SELECT * FROM shop_languages_status WHERE code=:code");
			$stmt->execute(array(
				'code'        => $langcode
			));
			$result = $stmt->fetch(PDO::FETCH_ASSOC);
			if ($result['status'] == 1) return true;
			else return false;
		}

		public static function StatusVF($langcode)
		{
			global $database;

			$stmt = $database->Language("SELECT * FROM shop_languages_status WHERE code=:code");
			$stmt->execute(array(
				'code'        => $langcode
			));
			$result = $stmt->fetch(PDO::FETCH_ASSOC);
			if (isset($result['status'])) return $result['status'];
		}

		public static function ChangeStatus($langcode)
		{
			global $database;

			$stmt = $database->Language("SELECT * FROM shop_languages_status WHERE code=:code");
			$stmt->execute(array(
				'code'          => $langcode
			));
			$result   = $stmt->fetch(PDO::FETCH_ASSOC);
			if ($result['status'] == 1)
			{
				$new_code = $result['code'];
				$stmt     = $database->Language("UPDATE shop_languages_status SET status='0' WHERE code=:ncode");
				if ($stmt->execute(array(
					'ncode'          => $new_code
				))) return true;
			}
			else
			{
				$new_code = $result['code'];
				$stmt     = $database->Language("UPDATE shop_languages_status SET status='1' WHERE code=:ncode");
				if ($stmt->execute(array(
					'ncode' => $new_code
				))) return true;
			}
		}

		public static function AddVar()
		{
			global $database;

			$stmt = $database->Language("SELECT MAX(id) as maxid FROM shop_languages");
			$stmt->execute();
			$lastId = $stmt->fetch(PDO::FETCH_ASSOC);

			$newId  = $lastId['maxid'] + 1;
			$const  = 'translation_' . $newId;
			$stmt   = $database->Language("INSERT INTO shop_languages (id, const) VALUES (:newId, :const)");
			$stmt->bindparam(":newId", $newId);
			$stmt->bindparam(":const", $const);
			$stmt->execute();
		}
	}


		function Update($v)
		{
			$new_version_response = @file_get_contents('https://licensesoftware.mt2-services.eu/v3_update/version.php');
			if($v==1)
			{
				if ($new_version_response !== false) {
					$new_version = trim($new_version_response);
					return version_compare(SHOP_VERSION, $new_version);
				} else {
					return -2;
				}
			}
			else
				return $new_version_response;
		}
	?>
