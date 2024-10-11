<?php
	switch ($administrator_page) {
		case 'categories':
			$pagea = 'categories';
			$atitle = 'Category manager';
		break;
		
		case 'templates':
			$pagea = 'templates';
			$atitle = 'Templates';
		break;
		
		case 'new_item':
			$pagea = 'new_item';
			$atitle = 'Create a new item';
		break;
		
		case 'language':
			$pagea = 'languages';
			$atitle = 'Languages';
		break;
		
		case 'language_manager':
			$pagea = 'language_manager';
			$atitle = 'Languages Manager';
		break;
		
		case 'proto_uploader':
			$pagea = 'proto_uploader';
			$atitle = 'Proto upload';
		break;
		
		case 'tga_converter':
			$pagea = 'tga_converter';
			$atitle = 'TGA Converter';
		break;
		
		case 'item_list':
			$pagea = 'item_list';
			$atitle = 'Item List';
		break;
		
		case 'shop_items':
			$pagea = 'shop_items';
			$atitle = 'Shop Items';
		break;
		
		case 'payments_settings':
			$pagea = 'payments_settings';
			$atitle = 'Payments Settings';
		break;
		
		case 'case_categories':
			$pagea = 'case_categories';
			$atitle = 'Case Categories';
		break;
		
		case 'case_items':
			$pagea = 'case_items';
			$atitle = 'Case Items';
		break;
		
		case 'case_logs':
			$pagea = 'case_logs';
			$atitle = 'Case Logs';
		break;
		
		case 'update':
			$pagea = 'update';
			$atitle = 'Update';
		break;
		
		case 'settings':
			$pagea = 'settings';
			$atitle = 'Settings';
		break;
		
		case 'database':
			$pagea = 'database';
			$atitle = 'Database';
		break;
		
		case 'source':
			$pagea = 'source';
			$atitle = 'Server Source';
		break;
		
		default:
			$pagea = 'home';
			$atitle = 'Home';
	}
?>