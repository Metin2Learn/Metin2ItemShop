<?php
	switch ($site_page) 
	{
		case 'category':
			$page = 'category';
			$title = l(1);
		break;
		
		case 'all_items':
			$page = 'all_items';
			$title = l(2);
		break;
		
		case 'admin':
			$page = 'admin';
			$title = 'admin';
		break;
		
		case 'account':
			$page = 'account';
			$title = l(78);
		break;
		
		case 'case':
			$page = 'case';
			$title = l(3);
		break;
		
		default:
			$page = 'home';
			$title = l(4);
	}
	
	if(isset($_GET['action']))
	{
		$action_access = $_GET['action'];
		
		switch ($action_access) 
		{
			case 'logout':
				session_destroy();
				print '<script>window.location.replace("home");</script>';
			break;
			
			case 'buy':
				Payments::GetLink();
			break;
		}
	}
	
?>