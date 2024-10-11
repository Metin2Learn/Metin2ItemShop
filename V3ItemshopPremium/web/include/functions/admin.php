<?php
	$admin_page = isset($_GET['a']) ? $_GET['a'] : null;
	
	if(!$account->is_loggedin() && $admin_page!="login")
	{
		header("Location: ".$shop_url.'admin/login');
		die();
	} else if($account->is_loggedin() && $account->getAccountData('web_admin', $_SESSION['id'])<9)
	{
		header("Location: ".$shop_url);
		die();
	} else {
		if($admin_page=="logout")
			unset($_SESSION['admin']);
		
		if(!$account->is_loggedin())
		{
			$error = false;
			if(isset($_POST['login']) && isset($_POST['password']))
				$error = $account->doLogin($_POST['login'], $_POST['password'], true);
		} else if(!$account->is_loggedin_admin() && $admin_page!='verify')
		{
			header("Location: ".$shop_url.'admin/verify');
			die();
		} else if($admin_page=='verify') {
			$error = false;
			$adminAvatar = $player->getAdminAvatar($_SESSION['id']); 
			if(isset($_POST['password']))
			{
				if($account->checkPassword($_SESSION['id'], $_POST['password']))
				{
					$_SESSION['admin'] = $adminAvatar[0];
					$_SESSION['welcome'] = $adminAvatar[1];
					header("Location: ".$shop_url.'admin');
					die();
				}
				$error = true;
			}
		} else if($admin_page=="itemproto")
		{			
			if(isset($_POST['upload']) && isset($_FILES["file"]) && !empty($_FILES["file"]))
			{
				if(isset($_POST['item_proto']))
					$shop->updateItemProto($_FILES['file']['tmp_name']);
				else if(isset($_POST['blend']))
					$shop->updateBlendJson($_FILES['file']['tmp_name']);
				else if(isset($_POST['item_list']))
					$shop->updateItemList($_FILES['file']['tmp_name']);
				else if(isset($_POST['item_names']))
					$shop->updateItemNames($_FILES['file']['tmp_name'], $_POST['lang']);
				else if(isset($_POST['itemdesc']))
					$shop->updateItemDesc($_FILES['file']['tmp_name'], $_POST['lang']);
				else if(isset($_POST['mob_names']))
					$shop->updateMobNames($_FILES['file']['tmp_name'], $_POST['lang']);
				else if(isset($_POST['skilldesc']))
					$shop->updateSkills($_FILES['file']['tmp_name'], $_POST['lang']);
				else if(isset($_POST['locale_game']))
				{
					$bonuses = [];
					foreach($server_item['EApplyTypes'] as $key=>$b)
						if(isset($server_item['AFFECT_DICT'][$b]))
							$bonuses[$key]=$server_item['AFFECT_DICT'][$b];
					$bonuses[306]='TOOLTIP_APPLY_ACCEDRAIN_RATE';
					$bonuses[307]='CATEGORY_SKILL';
					$key = 308;
					foreach($server_item['buff'] as $bonus)
					{
						$bonuses[$key]=$bonus[1];
						$key++;
					}
					foreach($server_item['jobs'] as $bonus)
					{
						$bonuses[$key]=$bonus;
						$key++;
					}
					$shop->updateLocaleGame($_FILES['file']['tmp_name'], $_POST['lang'], $bonuses);

				}
				header("Location: ".$shop_url.'admin/itemproto');
				die();
			}

			$last_update = file_get_contents('include/db/last_update.json');
			$last_update = json_decode($last_update, true);
		} else if($admin_page=='item')
		{
			$id = isset($_GET['id']) ? $_GET['id'] : null;
			$type = isset($_GET['type']) ? $_GET['type'] : null;
			$wheel_level = isset($_GET['wheel_level']) ? $_GET['wheel_level'] : null;
			if($wheel_level && $wheel_level>3)
			{
				header("Location: ".$shop_url.'admin/wheel/items');
				die();
			}
			
			$account_bonuses=[];
			foreach($server_item['buff'] as $key => $bonus)
				$account_bonuses[$key]=$bonus[1];
			
			$account_bonuses = $shop->getAccountBonuses($account_bonuses);
			
			if($id>=0 && $type)
			{
				$item_proto = $shop->getItem($id);
				$itemType = $player->GetType($item_proto);
				$item_time = $player->checkLimitTime($item_proto, $itemType);
				
				$item_polymorph = $item_skillbook = $item_sash = false;
				if($itemType == 'ITEM_POLYMORPH')
				{
					$item_polymorph = true;
					$mobs = $shop->getMobs();
				} else if($itemType=='ITEM_SKILLBOOK')
					$item_skillbook = true;
				$bonuses = $sockets = '';
				$itemSockets = $player->checkItemColumnSockets();
				
				if($itemType=='ITEM_COSTUME' && ($item_proto['sub_type']=='COSTUME_ACCE' || $item_proto['sub_type']=='COSTUME_SASH'))
				{
					$item_sash = true;
					$absorption_translation = $shop->getLocaleGame(306);
				}
				if(!$item_polymorph && !$item_time && !$item_skillbook)
				{
					$DBsockets = $shop->getAllSockets();
					
					foreach($DBsockets as $key => $name)
						$sockets.='<option value="'.$key.'">['.$key.'] '.$name.'</option>';
				}
				if(!$item_skillbook)
				{
					$DBbonuses = $shop->getBonuses();
					foreach($DBbonuses as $row)
						if($type!=2)
							$bonuses.='<option value="'.$row['bonus'].'">'.str_replace("%d", 'XXX', str_replace("%d%%", 'XXX%', $row['name'])).'</option>';
				}
				
				if($item_skillbook)
				{
					$skills_translation = $shop->getLocaleGame(307);
					$skills = $shop->getSkills();
				}
				
				if(isset($_POST['item']))
				{
					$error = false;
					if($type==2)
					{
						$new_bonuses = '';
						$count_bonuses = $count_bonuses_required = 0;
						for($i=1; $i<=103; $i++)
						{
							if(isset($_POST['bonus_'.$i]))
							{
								$new_bonuses.=$i.':'.$_POST['bonus_value_'.$i].':';
								
								if(isset($_POST['required_'.$i]))
								{
									$new_bonuses.=1;
									$count_bonuses_required++;
								}
								else
									$new_bonuses.=0;
								$new_bonuses.=';';
								
								$count_bonuses++;
							}
						}
						
						if($count_bonuses_required>$_POST['count_bonuses'])
							$error = true;
						
						$new_bonuses=rtrim($new_bonuses,";");
					}
					
					$new_item = [
						'vnum' => $id,
						'type' => $type,
						'category' => $_POST['category'],
						'count' => $_POST['count'],
						'description' => $_POST['description'],
						'pay_type' => $_POST['method'],
						'coins' => $_POST['price']
					];
					if(isset($_POST['friend']))
						$new_item['friend'] = 1;
					if($wheel_level)
					{
						$new_item['wheel_level'] = $wheel_level;
						$new_item['available'] = 0;
						$new_item['category'] = 0;
						$new_item['coins'] = 0;
						$new_item['friend'] = 0;
						$new_item['limit_all'] = 0;
						$new_item['limit_account'] = 0;
					}
					if($type==1)
						for($i=0;$i<=6;$i++)
						{
							$new_item['attrtype'.$i] = $_POST['attrtype'.$i];
							$new_item['attrvalue'.$i] = $_POST['attrvalue'.$i];
						}
					else if($type==2) {
						$new_item['bonuses'] = $new_bonuses;
						$new_item['bonuses_count'] = $_POST['count_bonuses'];
					}
					if($type!=3 && !$item_skillbook && !$item_polymorph && !$item_time)
						for($i=0;$i<$itemSockets;$i++)
							$new_item['socket'.$i] = $_POST['socket'.$i];
					
					if($item_polymorph)
						$new_item['polymorph'] = $_POST['mob'];
					else if($item_time || $type==3)
						$new_item['time'] = $_POST['time_minutes'] + $_POST['time_hours']*60 + $_POST['time_days']*24*60 + $_POST['time_months']*30*24*60;
					else if($item_skillbook)
					{
						if(in_array($_POST['skill'], array('RANDOM_ALL_CHARS','RANDOM_WARRIOR','RANDOM_ASSASSIN','RANDOM_SURA','RANDOM_SHAMAN','RANDOM_WOLFMAN')))
							$new_item['book_type'] = $_POST['skill'];
						else {
							$new_item['book_type'] = 'FIX';
							$new_item['book'] = $_POST['skill'];
						}
					}
					
					$now = $shop->currentTime();
					$expire = $_POST['expire_months']*30*24*60*60 + $_POST['expire_days']*24*60*60 + $_POST['expire_hours']*60*60 + $_POST['expire_minutes']*60;
					if($expire>0)
						$new_item['expire'] = date('Y-m-d H:i:s', $now + $expire);
					
					if($_POST['limit']>0)
						$new_item['limit_all'] = $_POST['limit'];
					
					if($_POST['limit_account']>0)
						$new_item['limit_account'] = $_POST['limit_account'];
					
					if($type==2 && $count_bonuses<$_POST['count_bonuses'])
						$error = true;
					
					if(!$error)
					{
						$shop->addItem($new_item);
						if($wheel_level)
							header("Location: ".$shop_url.'admin/wheel/items/#tab-'.$wheel_level);
						else
							header("Location: ".$shop_url.'admin/items');
						die();
					}
				}
			}
				
			if(isset($_POST['vnum']) && (isset($_POST['item']) || isset($_POST['bonus']) || isset($_POST['bonuses'])))
			{
				if(isset($_POST['item']))
					$type = 1;
				else if(isset($_POST['bonus']))
					$type = 2;
				else $type = 3;
				
				header("Location: ".$shop_url.'admin/add/item/'.$_POST['vnum'].'/'.$type.'/');
				die();
			}
		} else if($admin_page=='categories') {
			
			if(isset($_POST['add']))
			{
				$name = array();
				foreach($languages as $key => $lang)
					if(isset($_POST[$key]) && $_POST[$key]!='')
						$name[$key] = $_POST[$key];
				$name['icon'] = $_POST['icon'];
				$shop->addCategory($name);
			}
			else if(isset($_POST['save']))
			{
				$name = array();
				foreach($languages as $key => $lang)
					if(isset($_POST[$key]) && $_POST[$key]!='')
						$name[$key] = $_POST[$key];
				$name['icon'] = $_POST['icon-'.$_POST['id']];
				$shop->editCategory($_POST['id'], $name);
			}
			else if(isset($_POST['delete']) && $_POST['delete']==1) {
				$shop->deleteCategory($_POST['id']);
				$shop->deleteCategoryItems($_POST['id']);
			} else if(isset($_POST['delete']) && $_POST['delete']==2) {
				$shop->deleteCategory($_POST['id']);
				$shop->changeCategoryItems($_POST['id'], $_POST['new_category']);
			}
			
			$categories = $shop->getAllCategories();
			
			if(isset($_POST['add']) || isset($_POST['save']))
			{
				foreach($categories as $category)
				{
					$categoriesbyid[$category['id']]['icon'] = $category['icon'];
					
					if($category[$_SESSION['lang']]!=null && $category[$_SESSION['lang']]!='')
						$categoriesbyid[$category['id']]['name'] = $category[$_SESSION['lang']];
					else if($category['en']!=null && $category['en']!='')
						$categoriesbyid[$category['id']]['name'] = $category['en'];
					else if($category['ro']!=null && $category['ro']!='')
						$categoriesbyid[$category['id']]['name'] = $category['ro'];
					else
					{
						foreach($languages as $key => $lang)
							if(!in_array($key, [$_SESSION['lang'], 'ro', 'en']) && $category[$key]!=null && $category[$key]!='')
								$categoriesbyid[$category['id']]['name'] = $category[$key];
					}
					if(!isset($categoriesbyid[$category['id']]['name']))
						$categoriesbyid[$category['id']]['name'] = 'CAT '.$id;
				}
			}
		} else if($admin_page=='items') {
			$remove = isset($_GET['remove']) ? $_GET['remove'] : null;
			$redeem = isset($_GET['redeem']) ? $_GET['redeem'] : null;
			
			if($remove)
			{
				$shop->deleteItem($remove);
				header("Location: ".$shop_url.'admin/items');
				die();
			} else if($redeem) {
				$_SESSION['redeem'] = $shop->addRedeemCode(3, $redeem);
				header("Location: ".$shop_url.'admin/items');
				die();
			} else if(isset($_POST['item']) && isset($_POST['select']) && is_array($_POST['select']) && count($_POST['select'])) {
				$items_id = $_POST['select'];
				$wheel_level = $_POST['wheel_level'];
				$items = $shop->getShopByID($items_id);
				
				foreach($items as $key=>$new_item)
					if($new_item['type']!=2)
					{
						unset($items[$key]['id']);
						unset($items[$key]['date']);
						
						$items[$key]['wheel_level'] = $wheel_level;
						$items[$key]['coins'] = 0;
						$items[$key]['friend'] = 0;
						$items[$key]['category'] = 0;
						$items[$key]['limit_account'] = 0;
						$items[$key]['limit_all'] = 0;
						$items[$key]['available'] = 0;
					}
				$shop->addItem($items);
				header("Location: ".$shop_url.'admin/wheel/items');
				die();
			} else if(isset($_POST['delete']) && isset($_POST['select']) && is_array($_POST['select']) && count($_POST['select'])) {
				$items_id = $_POST['select'];
				
				$shop->deleteItem($items_id);
				
				header("Location: ".$shop_url.'admin/items');
				die();
			}
		} else if($admin_page=='coins') {
			if(isset($_POST['name']))
			{
				$_SESSION['added_coins'] = 0;

				if($_POST['account']==2)
					$login_account = $player->getPlayerAccount($_POST['name']);
				else
					$login_account = $account->getAccountDataByLogin('id', $_POST['name']);
				
				if($login_account && $login_account!=null)
				{
					$_SESSION['added_coins'] = 1;
					if(is_numeric($_POST['coins']) && $_POST['coins']>0)
					{
						$account->addCoinsByID($_POST['type'], $_POST['coins'], $login_account);
						$shop->addTransactionAdmin($_SESSION['id'], $login_account, $_POST['type'], $_POST['coins']);
					}
				}
				
				header("Location: ".$shop_url.'admin/coins');
				die();
			} else if(isset($_POST['coins'])) {
				$_SESSION['redeem'] = $shop->addRedeemCode($_POST['type'], $_POST['coins']);
				header("Location: ".$shop_url.'admin/coins');
				die();
			}
			$page_number = isset($_GET['n']) ? $_GET['n'] : 1;
			$transactions_count = $shop->countTransactionAdmin();
			$show_pagination = false;
			
			if(!is_numeric($page_number) || $page_number<1)
				$page_number = 1;
			else if(ceil($transactions_count/$pagination)<$page_number)
				$page_number = 1;
			if($transactions_count>$pagination)
				$show_pagination = true;
			
			$transactions = $shop->getTransactionAdmin($page_number);
		} else if($admin_page=='edit') {
			$id = isset($_GET['id']) ? $_GET['id'] : 0;

			if(!$shop->checkItemShop($id))
			{
				header("Location: ".$shop_url.'admin/items');
				die();
			}
			
			$item = $shop->getItemShop($id);
			$item_proto = $shop->getItem($item['vnum']);
			$itemType = $player->GetType($item_proto);
			$item_time = $player->checkLimitTime($item_proto, $itemType);
			
			$item_polymorph = $item_skillbook = $item_sash = false;
			if($itemType == 'ITEM_POLYMORPH')
			{
				$item_polymorph = true;
				$mobs = $shop->getMobs();
			} else if($itemType=='ITEM_SKILLBOOK')
				$item_skillbook = true;
			$bonuses = $sockets = '';
			$itemSockets = $player->checkItemColumnSockets();
			
			if($itemType=='ITEM_COSTUME' && ($item_proto['sub_type']=='COSTUME_ACCE' || $item_proto['sub_type']=='COSTUME_SASH'))
			{
				$item_sash = true;
				$absorption_translation = $shop->getLocaleGame(306);
			}
			if(!$item_polymorph && !$item_time && !$item_skillbook)
				$DBsockets = $shop->getAllSockets();

			if(!$item_skillbook)
				$DBbonuses = $shop->getBonuses();
				
			if($item_skillbook)
			{
				$skills_translation = $shop->getLocaleGame(307);
				$skills = $shop->getSkills();
			}
			
			if(isset($_POST['item']))
			{
				$type = $item['type'];
				$error = false;
				
				if($type==2)
				{
					$new_bonuses = '';
					$count_bonuses = $count_bonuses_required = 0;
					for($i=1; $i<=103; $i++)
					{
						if(isset($_POST['bonus_'.$i]))
						{
							$new_bonuses.=$i.':'.$_POST['bonus_value_'.$i].':';
							
							if(isset($_POST['required_'.$i]))
							{
								$new_bonuses.=1;
								$count_bonuses_required++;
							}
							else
								$new_bonuses.=0;
							$new_bonuses.=';';
							
							$count_bonuses++;
						}
					}
					
					if($count_bonuses_required>$_POST['count_bonuses'])
						$error = true;
					
					$new_bonuses=rtrim($new_bonuses,";");
				}
				
				$new_item = [
					'category' => $_POST['category'],
					'count' => $_POST['count'],
					'description' => $_POST['description'],
					'pay_type' => $_POST['method'],
					'coins' => $_POST['price']
				];

				$new_item['friend'] = 0;
				if(isset($_POST['friend']))
					$new_item['friend'] = 1;

				if($type==1)
					for($i=0;$i<=6;$i++)
					{
						$new_item['attrtype'.$i] = $_POST['attrtype'.$i];
						$new_item['attrvalue'.$i] = $_POST['attrvalue'.$i];
					}
				else if($type==2) {
					$new_item['bonuses'] = $new_bonuses;
					$new_item['bonuses_count'] = $_POST['count_bonuses'];
				}
				if($type!=3 && !$item_skillbook && !$item_polymorph && !$item_time)
					for($i=0;$i<$itemSockets;$i++)
						$new_item['socket'.$i] = $_POST['socket'.$i];
				
				if($item_polymorph)
					$new_item['polymorph'] = $_POST['mob'];
				else if($item_time || $type==3)
					$new_item['time'] = $_POST['time_minutes'] + $_POST['time_hours']*60 + $_POST['time_days']*24*60 + $_POST['time_months']*30*24*60;
				else if($item_skillbook)
				{
					if(in_array($_POST['skill'], array('RANDOM_ALL_CHARS','RANDOM_WARRIOR','RANDOM_ASSASSIN','RANDOM_SURA','RANDOM_SHAMAN','RANDOM_WOLFMAN')))
						$new_item['book_type'] = $_POST['skill'];
					else {
						$new_item['book_type'] = 'FIX';
						$new_item['book'] = $_POST['skill'];
					}
				}
				
				$now = $shop->currentTime();
				$expire = $_POST['expire_months']*30*24*60*60 + $_POST['expire_days']*24*60*60 + $_POST['expire_hours']*60*60 + $_POST['expire_minutes']*60;
				$discount = $_POST['discount_months']*30*24*60*60 + $_POST['discount_days']*24*60*60 + $_POST['discount_hours']*60*60 + $_POST['discount_minutes']*60;
				
				if($expire>0)
					$new_item['expire'] = date('Y-m-d H:i:s', $now + $expire);
				
				if($_POST['discount']>0)
				{
					$new_item['discount'] = $_POST['discount'];
					$new_item['discount_expire'] = date('Y-m-d H:i:s', $now + $discount);
				}
				
				if($_POST['limit']>0)
					$new_item['limit_all'] = $_POST['limit'];
				
				if($_POST['limit_account']>0)
					$new_item['limit_account'] = $_POST['limit_account'];
				
				if($type==2 && $count_bonuses<$_POST['count_bonuses'])
					$error = true;

				if(!$error)
				{
					$shop->editItem($id, $new_item);
					header("Location: ".$shop_url.'admin/items/edit/'.$id);
					die();
				}
			}
			
			$account_bonuses=[];
			foreach($server_item['buff'] as $key => $bonus)
				$account_bonuses[$key]=$bonus[1];
			
			$account_bonuses = $shop->getAccountBonuses($account_bonuses);
		} else if($admin_page=='payments') {
			$id = isset($_GET['id']) ? $_GET['id'] : 0;

			if(isset($_POST['id']))
			{
				if(isset($_POST['save']))
					$shop->editPrice($_POST['id'], ["amount" => $_POST['amount'], "value" => $_POST['value']]);
				else if(isset($_POST['delete']))
					$shop->deletePrice($_POST['id']);
				else
					$shop->addPrice(["type" => $_POST['id'], "amount" => $_POST['amount'], "value" => $_POST['value']]);
				
				header("Location: ".$shop_url.'admin/payments/settings#tab-'.$_POST['id']);
				die();
			}
		} else if($admin_page=='list') {
			if(isset($_POST['search']))
			{
				header("Location: ".$shop_url.'admin/payments/list/1/'.$_POST['search']);
				die();
			}
			$page_number = isset($_GET['n']) ? $_GET['n'] : 1;
			$search = isset($_GET['s']) ? $_GET['s'] : null;
			
			$accounts_like = [];
			
			if($search)
				$accounts_like = $account->getAccountsLike($search);
			
			$transactions_count = $shop->countTransactionList($accounts_like, $search);
			$show_pagination = false;
			
			if(!is_numeric($page_number) || $page_number<1)
				$page_number = 1;
			else if(ceil($transactions_count/$pagination)<$page_number)
				$page_number = 1;
			if($transactions_count>$pagination)
				$show_pagination = true;
			
			$transactions = $shop->getTransactionList($page_number, $accounts_like, $search);
		} else if($admin_page=='history') {
			if(isset($_POST['search']))
			{
				header("Location: ".$shop_url.'admin/history/1/'.$_POST['search']);
				die();
			}
			
			$page_number = isset($_GET['n']) ? $_GET['n'] : 1;
			$search = isset($_GET['s']) ? $_GET['s'] : null;
			
			$accounts_like = $vnums = [];
			
			if($search)
			{
				$accounts_like = $account->getAccountsLike($search);
				$vnums = $shop->getSearchHistoryItems($search);
			}
			
			$transactions_count = $shop->countHistoryList($accounts_like, $vnums, $search);
			$show_pagination = false;
			
			if(!is_numeric($page_number) || $page_number<1)
				$page_number = 1;
			else if(ceil($transactions_count/$pagination)<$page_number)
				$page_number = 1;
			if($transactions_count>$pagination)
				$show_pagination = true;
			
			$transactions = $shop->getHistoryList($page_number, $accounts_like, $vnums, $search);
		} else if($admin_page=='settings') {
			if(isset($_POST['save']))
			{
				if($paypal_email!=$_POST['paypal'])
					$shop->updateSettings('paypal', $_POST['paypal']);
				if($pagination!=$_POST['pagination'])
					$shop->updateSettings('pagination', $_POST['pagination']);
				if($add_type!=$_POST['add_type'])
					$shop->updateSettings('add_type', $_POST['add_type']);
				if($wolfman_character!=$_POST['wolfman_character'])
					$shop->updateSettings('wolfman_character', $_POST['wolfman_character']);
				if($jcoins_back!=$_POST['jcoins_back'])
					$shop->updateSettings('jcoins_back', $_POST['jcoins_back']);
				if($epayouts_ip!=$_POST['epayouts_ip'])
					$shop->updateSettings('epayouts_ip', $_POST['epayouts_ip']);
				if($epayouts_uid!=$_POST['epayouts_uid'])
					$shop->updateSettings('epayouts_uid', $_POST['epayouts_uid']);
				if($epayouts_mid!=$_POST['epayouts_mid'])
					$shop->updateSettings('epayouts_mid', $_POST['epayouts_mid']);
				
				header("Location: ".$shop_url.'admin/settings/');
				die();
			} else if(isset($_POST['edit']))
			{
				$shop->updateSlide($_POST['id'], ["img" => $_POST['img'], "link" => $_POST['link'], "title" => $_POST['title'], "text" => $_POST['text']]);
				
				header("Location: ".$shop_url.'admin/settings/');
				die();
			} else if(isset($_POST['delete']))
			{
				$shop->deleteSlide($_POST['id']);
				
				header("Location: ".$shop_url.'admin/settings/');
				die();
			} else if(isset($_POST['add']))
			{
				$shop->addSlide(["img" => $_POST['img'], "link" => $_POST['link'], "title" => $_POST['title'], "text" => $_POST['text']]);
				
				header("Location: ".$shop_url.'admin/settings/');
				die();
			} else if(isset($_POST['stop_discount']))
			{
				$shop->stopHappyHour();
				
				header("Location: ".$shop_url.'admin/settings/');
				die();
			} else if(isset($_POST['update_discount']))
			{
				$now = $shop->currentTime();
				
				$discount = $_POST['discount_months']*30*24*60*60 + $_POST['discount_days']*24*60*60 + $_POST['discount_hours']*60*60 + $_POST['discount_minutes']*60;
				
				if($_POST['discount']>0)
					$shop->startHappyHour($_POST['discount'], date('Y-m-d H:i:s', $now + $discount));
				
				header("Location: ".$shop_url.'admin/settings/');
				die();
			}
		} else if($admin_page=='w_settings') {
			if(isset($_POST['save']))
			{
				if($wheel_status!=$_POST['wheel_status'])
				{
					$shop->updateSettings('wheel_status', $_POST['wheel_status']);
					if($_POST['wheel_status']==0)
						$shop->deleteWheelStages();
				}
				if($wheel_levels!=$_POST['wheel_levels'])
					$shop->updateSettings('wheel_levels', $_POST['wheel_levels']);
				if($wheel_web!=$_POST['wheel_web'])
					$shop->updateSettings('wheel_web', $_POST['wheel_web']);
				if($wheel_prices[0]!=$_POST['wheel_lv1'])
					$shop->updateSettings('wheel_lv1', $_POST['wheel_lv1']);
				if($wheel_prices[1]!=$_POST['wheel_lv2'])
					$shop->updateSettings('wheel_lv2', $_POST['wheel_lv2']);
				if($wheel_prices[2]!=$_POST['wheel_lv3'])
					$shop->updateSettings('wheel_lv3', $_POST['wheel_lv3']);
				if($wheel_lv2_time!=$_POST['wheel_lv2_time'])
					$shop->updateSettings('wheel_lv2_time', $_POST['wheel_lv2_time']);
				if($wheel_lv3_time!=$_POST['wheel_lv3_time'])
					$shop->updateSettings('wheel_lv3_time', $_POST['wheel_lv3_time']);
				
				header("Location: ".$shop_url.'admin/wheel/settings/');
				die();
			}
		} else if($admin_page=='w_items') {
			$remove = isset($_GET['remove']) ? $_GET['remove'] : null;
			$tab = isset($_GET['tab']) ? $_GET['tab'] : '';
			if($remove)
			{
				$shop->deleteWheelItem($remove);
				header("Location: ".$shop_url.'admin/wheel/items#tab-'.$tab);
				die();
			} else if(isset($_POST['test']))
			{
				$item = $shop->getItemShop($_POST['id']);
				
				$item_proto = $shop->getItem($item['vnum']);
				
				if($item['time']<=0)
					$item['time'] = $player->getItemProtoDuration($item_proto);
	
				if(($item['type']!=3 && $player->CreateItem($item, $_SESSION['id'], $add_type, [])) || ($item['type']==3 && $account->addBuff($item, $_SESSION['id'])))
					$ok = true;

				header("Location: ".$shop_url.'admin/wheel/items#tab-'.$_POST['wheel_level']);
				die();
			} else if(isset($_POST['item']))
			{
				header("Location: ".$shop_url.'admin/add/item/'.$_POST['vnum'].'/1/'.$_POST['wheel_level']);
				die();
			} else if(isset($_POST['bonuses']))
			{
				header("Location: ".$shop_url.'admin/add/item/'.$_POST['vnum'].'/3/'.$_POST['wheel_level']);
				die();
			} else if(isset($_POST['id']))
			{
				$jackpot = 0;
				if(!$_POST['status'])
					$jackpot = 1;
				$shop->updateJackpotItem($_POST['id'], $jackpot);
				header("Location: ".$shop_url.'admin/wheel/items#tab-'.$_POST['wheel_level']);
				die();
			}
			$wheel_items = $shop->getAllWheelItems();
			$error = false;
			
			for($i=1;$i<=$wheel_levels;$i++)
				if($shop->countWheelItems($i)<16)
					$error = true;
			
			$vnums = array_column($wheel_items, 'vnum');
			$names = $shop->getMultipleNames($vnums);
			$icons = $shop->getMultipleIcon($vnums);
		} else if(!$admin_page || $admin_page=='home') {
			$discount = isset($_GET['discount']) ? $_GET['discount'] : null;
			if($discount)
			{
				$shop->updateExpireDate($discount);
				header("Location: ".$shop_url.'admin/');
				die();
			}
		}
	}