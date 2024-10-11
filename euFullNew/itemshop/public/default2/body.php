<body>
	<div class="main">
		<div class="header">
			<a class="<?=Basic::URL();?>" style="background: url('<?=Settings::Get(6);?>') 0 50%/contain no-repeat;height: 50px;margin: -4px 0 0;opacity: .9;width: 115px"></a>
			<?php if(Logged()) { ?>
			<ac></ac>
			<div class="usericon">R<span><?=User::Account('login'); ?> <span style="color:red;" onclick="goto('logout');"><i class="fa fa-sign-out"></i></span></span></div>
			<?php } ?>
			<div class="datetime">P<span id="clock"><?= date('H:i:s'); ?></span></div>
			
			<div style="margin-top:-25px;margin-left:250px;" onclick="showlangselector();">
				<img style="height:23px;margin-top:-25px;" src="<?=Basic::URL().'style/universal/flags/'.$language_code.'.svg'; ?>">
			</div>
			<?php 
				if(Logged()) 
				{
					if(isAdmin()) 
					{
						?>
						<div class="redeemticket" onclick="goto('admin');">
							<div class="ico">D</div>
							<div class="textua"><?=l(26); ?></div>
						</div>
						<?php 
					} 
					?>
					<div class="coinbuynew" onclick="goto('buy');">
						<div class="ico">Q</div>
						<div class="textua"><?=l(25); ?></div>
					</div>
					
					<span class="coins" onclick="goto('buy');" id="coinsheaderstatus"><?=number_format(User::Account('coins'), 0, ".", " "); ?></span>
					<span class="coins2" style="text-transform:uppercase;" onclick="goto('buy');"><?=l(24); ?></span>
				<?php 
				} 
				else include 'pages/login.php';
				?>
		</div>
		<div class="bluroverlay">
			<nav class="navbar navbar-expand-lg">
				<div class="collapse navbar-collapse" id="navbarColor01">
					<ul class="navbar-nav mr-auto" style="flex-direction: row">
						<li class="nav-item <?php if($page=='home') print 'active'; ?>" onclick="goto('home');">
							S<span><?=l(4); ?></span>
						</li>
						<li class="nav-item <?php if($page=='all_items') print 'active'; ?>" onclick="goto('items');">
							T<span><?=l(2); ?></span>
						</li>
						<?php if(Logged()) { ?>
						<li class="nav-item <?php if($page=='case') print 'active'; ?>" onclick="goto('case');">
							w<span><?=l(3); ?></span>
						</li>
						<?php } ?>
					</ul>
					<?php if(Logged()) { ?>
					<ul class="navbar-nav" style="float:right;">
						<li class="nav-item <?php if($page=='account') print 'active'; ?>" style="" onclick="goto('account');"><span><i class="fa fa-user"></i> <?=l(77);?></span></li>
					</ul>
					<?php } if($page=='all_items'){ ?>
					<input class="searchbar" onkeyup="search(this.value)" placeholder="<?=l(5); ?>"/>
					<?php } ?>
					
					
				</div>
			</nav>
			<div class="page">
				<?php
					include 'pages/'.$page.'.php';
				?>
			</div>
		</div>
		
	</div>
</body>
<?php
	if(isset($_POST['item_id'], $_POST['buy_item']))
	{
		print User::BuyItem($_POST['item_id']);
	}
?>
<div class="itemshow" id="modal_item" style="display:block;"></div>
<div id="langSelectorDropdown" style="display: none; position: absolute; top: 50%; left: 50%;">
	<div class="bgover">
		<div class="langsel">
			<div class="topstrip" style="width:100%;">
			<span style="float:left;"><?=l(6); ?></span>
			<span class="close-icon" onclick="showlangselector()">
				<i style="color:red;" class="fa fa-close"></i>
			  </span>
			</div>
			<div style="margin-top:50px;height: 87.5%;overflow-y: scroll;">
				<ul class="list-group">
					<?php
						$_languagelist = array();
						$_languagelist = Language::All();
						foreach($_languagelist as $lg)
						{
							print '<li class="list-group-item" style="background-color:transparent;font-size:13px;"><a href="'.Basic::URL().'?lang='.$lg['code'].'" style="margin-left:10px;color:#f2e69f;"><img style="height:25px;" src="'.Basic::URL().'style/universal/flags/'.$lg['code'].'.svg"> '.$lg['entire'].' </a></li>';
						}
					?>
				</ul>
			</div>
		</div>
	</div>
</div>

<script>
	function iwanttobuy(shoplistid) 
	{
		fetch("<?php print Basic::URL(); ?>?module=modal_item&itemid=" + shoplistid)
			.then(function(response) {
			  return response.text();
			})
			.then(function(result) {
			  var div = document.getElementById('modal_item');
			  div.innerHTML = result;
			})
			.catch(function(error) {
			  console.error("Error:", error);
			});
	}
	document.addEventListener("keydown", function(event) {
		var itemshow = document.getElementById("closepanel");
		var del = document.getElementById("itemtooltip");
		
	  if (event.key === "Escape" && itemshow.style.display === "block") {
		itemshow.style.display = "none";
		del.style.display = "none";
	}
	});
	<?php if($page=='all_items') { ?>
	changecategory(0);
	function changecategory(categoryid)
	{
		var categories = document.getElementsByClassName("category");
		for (var i = 0; i < categories.length; i++) {
			categories[i].classList.remove('active');
		}
		document.getElementById("category_id_" + categoryid).classList.add('active');
		fetch("<?php print Basic::URL(); ?>?module=itemspercategories&catid=" + categoryid)
			.then(function(response) {
				return response.text();
			})
			.then(function(result) {
				var div = document.getElementById('showitems');
				div.innerHTML = result;
			})
			.catch(function(error) {
				console.error("Error:", error);
			});
	}
	function search(word)
	{
		fetch("<?php print Basic::URL(); ?>?module=itemspercategories&word=" + word)
			.then(function(response) {
				return response.text();
			})
			.then(function(result) {
				var div = document.getElementById('showitems');
				div.innerHTML = result;
			})
			.catch(function(error) {
				console.error("Error:", error);
			});
	}
	<?php } ?>
	var clockElement = document.getElementById("clock");
	var clockInterval = setInterval(function() {
		var currentTime = new Date();
		var hours = currentTime.getHours().toString().padStart(2, "0");
		var minutes = currentTime.getMinutes().toString().padStart(2, "0");
		var seconds = currentTime.getSeconds().toString().padStart(2, "0");
		clockElement.innerHTML = hours + ":" + minutes + ":" + seconds;
	}, 1000);
	
	
	 function showlangselector() {
		var dropdown = document.getElementById("langSelectorDropdown");
		if (dropdown.style.display === "none") {
		  dropdown.style.display = "block";
		} else {
		  dropdown.style.display = "none";
		}
	  }
</script>
