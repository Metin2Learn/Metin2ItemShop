
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">



<?php if(Logged()) 
{
	if(isset($_GET['caseids']))
	{
		$boxid=$_GET['caseids'];
		?>
		<div class="items" style="display:block;">
			<center>
				<div class="raffle-roller">
					<div class="raffle-roller-holder">
						<div class="raffle-roller-container" style="margin-left: 0px;"></div>
					</div>
				</div>
				<center>
					<?php if(Roll::Price($boxid) <= User::Account('coins')) { ?>
					<button class="btn btn-dark" id="rollingbtn" onclick="generate(0);"><i class="fa fa-box-open"></i> <?=l(14); ?></button>&nbsp;&nbsp;
					<?php } else { ?>
					<button class="btn btn-dark" id="rollingbtn" disabled><i class="fa fa-piggy-bank"></i> <?=l(15); ?></button>&nbsp;&nbsp;
					<?php } ?>
					<button class="btn btn-danger" onclick="generate(1);"><i class="fa fa-box"></i> <?=l(16); ?></button>
				</center>
			</center>
			<hr>
			<div class="products">
			<?php
				$spin = array();
				$spin = Roll::GetOrder($boxid);
				foreach ($spin as $item) {
					?>
					
					
					<div class="single-product-m">
						<div class="p-inner">
							<div class="p-data">
								<div class="p-img"><img class="item_icon467" src="<?= Basic::URL() . 'style/universal/' . Item::Image($item['item_vnum']); ?>" alt="<?= Item::Name($item['item_vnum']); ?>"></div>
								<div class="data-area"><a class="strong item_name"><?= Item::Name($item['item_vnum']); ?></a><span></span>
								<br>
								Drop chance: <?php print $item['chance']; ?>%
								
								</div>
							</div>
						</div>
						<br>
						<center><?php print Roll::WinRate($item['chance']);?></center>
					</div>
			<?php
				}
				?>
		</div>
		
<script>
    var items = {};
<?php
	$itemList = array();
	$itemList = Roll::Get($boxid);
    foreach ($itemList as $item) {
        echo 'items[' . $item['id'] . '] = {';
		echo 'chance: "' . trim($item['chance']) . '",';
		echo 'color: "' . trim(Roll::Color($item['chance'])) . '",';
        echo 'img: "' . trim(Basic::URL()) . 'style/universal/' . trim(Item::Image($item['item_vnum'])) . '"';
        echo '};';
    }
?>
let boxprice = '<?=Roll::Price($boxid); ?>';
function generate(ng) {
  confirmOpenCase(function (confirmed) {
    if (confirmed) {
      $('.raffle-roller-container').css({
        transition: "sdf",
        "margin-left": "0px"
      }, 10).html('');

      var itemKeys = Object.keys(items);
      for (var i = 0; i < 101; i++) {
        var randomKeyIndex = randomInt(0, itemKeys.length);
        var randomKey = itemKeys[randomKeyIndex];
        var item = items[randomKey];
        if (item && item.img) {
          var element = '<div id="CardNumber' + i + '" class="item class_' + item.color + '_item" style=""><div class="item-image" style="background-image: url(' + item.img + ');"></div></div>';
          $(element).appendTo('.raffle-roller-container');
        }
      }

      setTimeout(function () {
        if (ng === 0) {
          goRoll(0);
        } else {
          goRoll(1);
        }
      }, 500);
    }
  });
}

function confirmOpenCase(callback) {
  Swal.fire({
    title: "<?=l(17); ?>",
    text: "<?=l(18); ?>",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "<?=l(19); ?>",
    cancelButtonText: "<?=l(20); ?>",
  }).then(function (result) {
    callback(result.isConfirmed);
  });
}

function goRoll(demo) {
  $('.raffle-roller-container').css({
    transition: "all 8s cubic-bezier(.08,.6,0,1)"
  });
  var url = '<?= Basic::URL(); ?>?module=spinning&case_id=<?=$boxid; ?>';
  if (demo === 1) {
    url += '&demo=1';
  }

  $.ajax({
    url: url,
    method: 'GET',
    dataType: 'json',
    success: function (response) {
      var winningItemCode = response.itemCode;
      var winningItemName = response.itemName;
      var winningItemVnum = response.itemVnum;
      var winningItemImg = response.img;
	  var accountballance = response.newballance;
      var winningItem = items[winningItemCode];
      if (winningItem && winningItemImg) {
        var newItemRarity = '<div id="CardNumber78" class="item class_'+ winningItem.color + '_item"><div class="item-image" style="background-image: url(' + winningItemImg + ');"></div></div>';
        $('#CardNumber78').replaceWith(newItemRarity);
        setTimeout(function () 
		{
			if (demo === 0) 
			{
				var coinsheaderstatus = document.getElementById("coinsheaderstatus");
				coinsheaderstatus.disabled = true;
				coinsheaderstatus.innerHTML = accountballance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
				if(boxprice > accountballance)
				{
					var rollingBtn = document.getElementById("rollingbtn");
					rollingBtn.disabled = true;
					rollingBtn.innerHTML = '<i class="fa fa-piggy-bank"></i> Not enough coins';
				}
			}
          Success('<?=l(21); ?> <br><b>' + winningItemName.trim() + '</b>');
        }, 8500);
      } else {
        console.log('Winning item not found or has no image.');
      }
      $('.raffle-roller-container').css('margin-left', '-6770px');
    },
    error: function () {
      Error('<?=l(22); ?><br><b><?=l(23); ?></b>');
    }
  });
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


</script>


<style>
.item-image {
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  height: 100%;
  width: 100%;
}
.raffle-roller {
    	height: 100px;
    	position: relative;
    	margin: 60px auto 30px auto;
    	width: 593px;
}
.raffle-roller-holder {
    	position: absolute;
    	top: 0;
    	left: 0;
    	right: 0;
    	bottom: 0;
    	height: 100px;
    	width: 100%;
}
.raffle-roller-holder {
    	overflow: hidden;
    	border-radius: 40px;
		border: 1px solid #662d12;
}
.raffle-roller-holder {
    	position: absolute;
    	top: 0;
    	left: 0;
    	right: 0;
    	bottom: 0;
    	height: 100px;
    	width: 100%;
}
.raffle-roller-container {
    	width: 9999999999999999999px;
    	max-width: 999999999999999999px;
    	height: 130px;
    	margin-left: 0;
    	transition: all 8s cubic-bezier(.08,.6,0,1);
}
.raffle-roller-holder:before {
	content: "";
	position: absolute;
	border: none;
	z-index: 12222225;
	left: 49%;
	width: 0px;
	height: 0px;
	border-left: 8px solid transparent;
	border-right: 8px solid transparent;
	border-top: 12px solid #662d12;
}
.item {
	display: inline-block;
	float: left;
	margin: 4px 0px 0.5px 5px;
    	width: 85px;
	height: 88px;
    	float: left;
	border: 1px solid #70677c;
	background: url(<?=Theme::StylePath(); ?>/img/itembg.png);
}
.class_5_item {
	border-bottom: 4px solid #EB4B4B;
}
.class_4_item {
	border-bottom: 4px solid #D32CE6;
}
.class_3_item {
	border-bottom: 4px solid #8847FF;
}
.class_2_item {
	border-bottom: 4px solid #4B69FF;
}
.class_1_item {
	border-bottom: 4px solid #B0C3D9;
}
img {
	border: 0;
	vertical-align: middle;
}
.winning-item {
	border: 2px solid #66b233;
	position: relative;
	top: -1px;
    	border-bottom: 4px solid #66b233;
}
.inventory {
	margin: 0 auto;
	width: 960px;
	max-width: 953px;
	padding: 10px 15px 6px;
	height: auto;
	border: 2px solid #1c3344;
	background: #0e1a23;
}
.inventory > .item {
	float: none;
	cursor: pointer;
	margin: 4px 2px 0.5px 2px;
}
.inventory > .item:hover {
	background-size: 90%;
	background-color: #182a38;
}
.inventory > .item:active {
	height: 83px;
	width: 80px;
	position: relative;
	top: -2px;
	border: 2px solid #356d27;
	border-bottom: 4px solid #356d27;
}
</style>
		<?php } else { ?>
			<div class="items" style="display:block;">
			<div class="products">
				<?php
					$history = array();
					$history = CaseOpener::History();
					if(Array_Counter($history))
					{
						foreach($history as $h)
						{
							?>
						
							
							<?php 
								$dateTime = DateTime::createFromFormat("Y-m-d H:i:s", $h['time']);
								$formattedDate = $dateTime->format("d/m/Y H:i");
							?>
							<div class="single-product-m">
								<div class="p-inner">
									<div class="p-data">
										<div class="p-img"><img class="item_icon467" src="<?= Basic::URL() . 'style/universal/' . Item::Image($h['win_item']); ?>" alt="<?=Item::Name($h['win_item']);?>"></div>
										<div class="data-area"><a class="strong item_name"><?=Item::Name($h['win_item']);?></a><span></span>
										<br>
										<small>
										<b>Drop chance:</b> <?php print $h['chance']; ?>%<br>
										<center><?=$formattedDate;?></center>
										</small>
										</div>
									</div>
								</div>
								<br>
								<center><?php print Roll::WinRate($h['chance']);?></center>
							</div>
							<?php
						}
					}
				?>
				
			</div>
		<?php } ?>
	</div>
</div>
<?php } ?>