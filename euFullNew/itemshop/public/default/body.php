<body style="max-width: 1000px;margin: auto;">
	<div class="itemshow" id="modal_item" style="display:block;"></div>
	<div class="itemshop-holder-pixarts">
		<div class="inside">
			<div class="header-top">
				<div class="h-left">
					<a href="<?php print Basic::URL(); ?>" class="logo"></a>
					<?php 
					if(Logged()) 
					{
						?>
						<div class="username">
							<div class="user-icon"></div>
							<span>
							<a class="open_server_selector" style="color: white; font-weight:bold;"><?=User::Account('login'); ?></a>
							</span>
							&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:red;" onclick="goto('logout');"><i class="fa fa-sign-out"></i></span>
						</div>
					<?php } if($page=='all_items'){ ?>
					<input class="tinput" onkeyup="search(this.value)"  style="height:25px;width:200px" placeholder="<?=l(5); ?>"/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<?php } ?>
					
					
					<div class="dropdown" style="margin-right:20px;">
						<button class="" type="button" id="dropdown_language" data-bs-toggle="dropdown" aria-expanded="false">
						<img style="height:20px;" src="<?=Theme::StylePath(); ?>img/flags/en.png">
						</button>
						<ul class="dropdown-menu" aria-labelledby="dropdown_language">
							<li><a class="dropdown-item" href="<?php print Basic::URL(); ?>?lang=ro"><img style="height:20px;vertical-align:middle;" src="<?=Theme::StylePath(); ?>img/flags/ro.png">Romana</a></li>
						</ul>
					</div>
				</div>
				<?php 
					if(Logged()) 
					{
						?>
						<div class="h-right">
							<div class="coins">
								<div class="icon"></div>
								<div class="data">
									<strong id="coins"><?=number_format(User::Account('coins'), 0, ".", " "); ?></strong>
									<span style="width:70px;">DC</span>
								</div>
							</div>
							<a class="buycoins btn1 paywall_btn" onclick="goto('buy');" data-close="no"><b>Get coins</b></a>
						</div>
					<?php } else include 'pages/login.php'; ?>
			</div>
			<div class="simplebar-content-wrapper" tabindex="7" role="region" aria-label="scrollable content" style="height: auto;width:auto; overflow: hidden scroll;display: block;">
				<div class="content-holder">
					<div class="sidebar-holder">
						<div class="inner" style="position: absolute;width: 97%;">
							<div class="cat-item ajax_cat" style="height:43px;">
								<a onclick="goto('home');" style="font-size: 11px;color: #fff9e6;line-height: 1.455;display: block;text-align: center;font-weight: 400;margin-bottom: 10px;cursor: pointer;"><?=l(4); ?></a>
							</div>
							<?php
							
							if($page!='all_items' && $page!='case') 
							{ 
								?>
								<div class="cat-item ajax_cat" style="height:43px;">
									<a onclick="goto('items');" style="font-size: 11px;color: #fff9e6;line-height: 1.455;display: block;text-align: center;font-weight: 400;margin-bottom: 10px;cursor: pointer;"><?=l(2); ?></a>
								</div>
								<?php 
								if(Logged()) 
								{
									?>
									<div class="cat-item ajax_cat" style="height:43px;">
										<a onclick="goto('case');" style="font-size: 11px;color: #fff9e6;line-height: 1.455;display: block;text-align: center;font-weight: 400;margin-bottom: 10px;cursor: pointer;"><?=l(3); ?></a>
									</div>
									<div class="cat-item ajax_cat" style="height:43px;">
										<a onclick="goto('account');" style="font-size: 11px;color: #fff9e6;line-height: 1.455;display: block;text-align: center;font-weight: 400;margin-bottom: 10px;cursor: pointer;"><?=l(77); ?></a>
									</div>
									<?php 
									if(isAdmin())
									{
										?>
										<div class="cat-item ajax_cat" style="height:43px;">
											<a onclick="goto('admin');" style="font-size: 11px;color: #fff9e6;line-height: 1.455;display: block;text-align: center;font-weight: 400;margin-bottom: 10px;cursor: pointer;">Admin Panel</a>
										</div>
										<?php
									}
								}
							} 
							elseif($page!='case')
							{
								$categories = array();
								$categories = Categories::Get();
								foreach($categories as $c)
								{
									?>
									
									<div class="cat-item ajax_cat" onclick="changecategory(<?=$c['id']?>);" style="height:43px;">
										<a onclick="changecategory(<?=$c['id']?>);" style="font-size: 11px;color: #fff9e6;line-height: 1.455;display: block;text-align: center;font-weight: 400;margin-bottom: 10px;cursor: pointer;"><?=Categories::Language($c['name']); ?></a>
									</div>
									<?php
								}
							}
							elseif($page=='case')
							{
								?>
									<div class="cat-item ajax_cat" onclick="goto('case');" style="height:43px;">
										<a onclick="goto('case');" style="font-size: 11px;color: #fff9e6;line-height: 1.455;display: block;text-align: center;font-weight: 400;margin-bottom: 10px;cursor: pointer;"><?=l(12); ?></small></a>
									</div>
								<?php
								$categories = array();
								$categories = CaseOpener::Get();
								$i=0;
								foreach($categories as $c)
								{
									?>
									<div class="cat-item ajax_cat" onclick="goto('case/<?=$c['id']?>');" style="height:43px;">
										<a onclick="goto('case/<?=$c['id']?>');" style="font-size: 11px;color: #fff9e6;line-height: 1.455;display: block;text-align: center;font-weight: 400;margin-bottom: 10px;cursor: pointer;"><?=CaseOpener::Language($c['name']); ?> &bull; <?=$c['price']?> <small><?=l(13); ?></small></a>
									</div>
									<?php
								}
							}
							?>
							
						</div>
					</div>
					<div class="content-inside">
						<div class="inner">
							<?php
								if($page=='home')
								{
									?>
									<div class="banner_wrapper">
										<div class="banners">
											<a class="first-ban">
											<img src="<?=Theme::StylePath(); ?>upload/banner.jpg" alt="Battlepass">
											</a>
										</div>
										<div class="title-p">
											<span></span>
											<div class="lane-da"></div>
										</div>
									</div>
									<?php
								}
								include 'pages/'.$page.'.php';
							?>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<script>var _cat_id = 1;</script>
	<script src="<?=Theme::StylePath(); ?>js/main.js"></script>
</body>
</html>

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
	//var clockElement = document.getElementById("clock");
	//var clockInterval = setInterval(function() {
	//	var currentTime = new Date();
	//	var hours = currentTime.getHours().toString().padStart(2, "0");
	//	var minutes = currentTime.getMinutes().toString().padStart(2, "0");
	//	var seconds = currentTime.getSeconds().toString().padStart(2, "0");
	//	clockElement.innerHTML = hours + ":" + minutes + ":" + seconds;
	//}, 1000);
	
	
	 function showlangselector() {
		var dropdown = document.getElementById("langSelectorDropdown");
		if (dropdown.style.display === "none") {
		  dropdown.style.display = "block";
		} else {
		  dropdown.style.display = "none";
		}
	  }
</script>
<?php
	if(isset($_POST['item_id'], $_POST['buy_item']))
	{
		print User::BuyItem($_POST['item_id']);
	}
?>