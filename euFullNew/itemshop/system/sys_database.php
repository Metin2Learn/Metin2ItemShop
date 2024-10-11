<?php
	class online_connection
	{
		public $verificator;
		
		public function __Connect($ip, $db, $user, $pass, $sqlite=null)
		{
			$this->verificator = null;
			try
			{
				if($sqlite==NULL)
					$this->verificator = new PDO("mysql:host=".$ip.";dbname=".$db, $user, $pass);
				else
				{
					$this->verificator = new PDO("sqlite:system/database/shop_storage.db");
					$this->verificator->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
				}
			}
			catch(PDOException $exception)
			{
				global $server_status;
				$server_status = 1;
			}
			return $this->verificator;
		}
		
		public function Language()
		{
			$this->lang = null;
			try
			{
				$this->lang = new PDO("sqlite:system/database/shop_languages.db");
				$this->lang->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			}
			catch(PDOException $exception)
			{
				print 'Language db error';
			}
			return $this->lang;
		}
		
		public function Plugins()
		{
			$this->lang = null;
			try
			{
				$this->plugins = new PDO("sqlite:system/database/shop_plugins.db");
				$this->plugins->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			}
			catch(PDOException $exception)
			{
				print 'Plugins db error';
			}
			return $this->plugins;
		}
	}
	if($server_status!=1)
	{
		class Connection
		{
			private $account;
			private $player;
			private $sqlite;
			private $verificator;
			private $language;
			private $plugins;
			
			public function __construct($ip, $user, $pass)
			{
				$online_connection = new online_connection();
				
				$account = $online_connection->__Connect($ip, "account", $user, $pass);
				$this->account = $account;
				
				$player = $online_connection->__Connect($ip, "player", $user, $pass);
				$this->player = $player;
				
				$sqlite = $online_connection->__Connect("", "", "", "", "yes");
				$this->sqlite = $sqlite;
				
				$lang = $online_connection->Language();
				$this->lang = $lang;
				
				$plugins = $online_connection->Plugins();
				$this->plugins = $plugins;
			}
			
			public function Account($sql)
			{
				$stmt = $this->account->prepare($sql);
				return $stmt;
			}
			
			public function Player($sql)
			{
				$stmt = $this->player->prepare($sql);
				return $stmt;
			}
			
			public function Sqlite($sql)
			{
				$stmt = $this->sqlite->prepare($sql);
				return $stmt;
			}
			
			public function execSqlite($sql)
			{
				$stmt = $this->sqlite->exec($sql);
				return $stmt;
			}
			
			public function Language($sql)
			{
				$stmt = $this->lang->prepare($sql);
				return $stmt;
			}
			
			public function Plugins($sql)
			{
				$stmt = $this->lang->prepare($sql);
				return $stmt;
			}
		}
	}
	
?>