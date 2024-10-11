 <script src="https://cdn.ckeditor.com/ckeditor5/29.2.0/classic/ckeditor.js"></script>
<?php
if(isset($_POST['add']))
{
	$get_category = $_POST['category'];
	$time = $time2 = 0;
	if($_POST['count']<=0)
		$_POST['count']=1;
	
	for($i=0;$i<=6;$i++) 
		if($_POST['attrtype'.$i]==0)
			$_POST['attrvalue'.$i]=0;
		
	if(Item::Column("applytype0"))
		for($i=0;$i<=7;$i++) 
			if($_POST['applytype'.$i]==0)
				$_POST['applyvalue'.$i]=0;
			
	if($_POST['socket0']!="")
		$socket0 = $_POST['socket0'];
	else
		$socket0 = 0;
	if($_POST['socket1']!="")
		$socket1 = $_POST['socket1'];
	else
		$socket1 = 0;
	if($_POST['socket2']!="")
		$socket2 = $_POST['socket2'];
	else
		$socket2 = 0;
		
	$item_unique = $_POST['purchase_limit'];
				
	$expire = 0;
	if($_POST['promotion_months']>0 || $_POST['promotion_days']>0 || $_POST['promotion_hours']>0 || $_POST['promotion_minutes']>0)
		$expire = strtotime("now +".intval($_POST['promotion_months'])." month +".intval($_POST['promotion_days'])." day +".intval($_POST['promotion_hours'])." hours +".intval($_POST['promotion_minutes'])." minute - 1 hour UTC");
	
	if($_POST['time_months']>0 || $_POST['time_days']>0 || $_POST['time_hours']>0 || $_POST['time_minutes']>0)
	{
		$time = $_POST['time_minutes'] + $_POST['time_hours']*60 + $_POST['time_days']*24*60 + $_POST['time_months']*30*24*60;
	}
	
	if($_POST['time2_months']>0 || $_POST['time2_days']>0 || $_POST['time2_hours']>0 || $_POST['time2_minutes']>0)
	{
		$time2 = $_POST['time2_minutes'] + ($_POST['time2_hours']*60) + ($_POST['time2_days']*24*60) + ($_POST['time2_months']*30*24*60);
	}
		
	if(Item::Column("applytype0") && Item::Sash($_POST['vnum']) && $time2==0)
	{
		$added = true;
		$stmt = $database->Sqlite('INSERT INTO items_for_sell (category, description, pay_type, coins, count, vnum, socket'.Item::GetTime(3).', socket'.Item::GetTime(1).', attrtype0, attrvalue0, attrtype1 , attrvalue1, attrtype2, attrvalue2, attrtype3, attrvalue3, attrtype4, attrvalue4, attrtype5, attrvalue5, attrtype6, attrvalue6, applytype0, applyvalue0, applytype1, applyvalue1, applytype2, applyvalue2, applytype3, applyvalue3, applytype4, applyvalue4, applytype5, applyvalue5, applytype6, applyvalue6, applytype7, applyvalue7, expire, item_unique) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)');
		$stmt->execute(array($get_category, $_POST['description'], $_POST['method_pay'], $_POST['coins'], $_POST['count'], $_POST['vnum'], $_POST['absorption'], $time,
							$_POST['attrtype0'], $_POST['attrvalue0'], $_POST['attrtype1'], $_POST['attrvalue1'], $_POST['attrtype2'], $_POST['attrvalue2'], 
							$_POST['attrtype3'], $_POST['attrvalue3'], $_POST['attrtype4'], $_POST['attrvalue4'], $_POST['attrtype5'], $_POST['attrvalue5'], 
							$_POST['attrtype6'], $_POST['attrvalue6'], 
							$_POST['applytype0'], $_POST['applyvalue0'], $_POST['applytype1'], $_POST['applyvalue1'], $_POST['applytype2'], $_POST['applyvalue2'], 
							$_POST['applytype3'], $_POST['applyvalue3'], $_POST['applytype4'], $_POST['applyvalue4'], $_POST['applytype5'], $_POST['applyvalue5'], 
							$_POST['applytype6'], $_POST['applyvalue6'], $_POST['applytype7'], $_POST['applyvalue7'], $expire, $item_unique));
	}
	else if(Item::Column("applytype0") && Item::Sash($_POST['vnum']) && $time2)
	{
		$added = true;
		$type = 1;
		$stmt = $database->Sqlite('INSERT INTO items_for_sell (category, description, pay_type, coins, count, vnum, socket'.Item::GetTime(3).', socket'.Item::GetTime(2).', attrtype0, attrvalue0, attrtype1 , attrvalue1, attrtype2, attrvalue2, attrtype3, attrvalue3, attrtype4, attrvalue4, attrtype5, attrvalue5, attrtype6, attrvalue6, applytype0, applyvalue0, applytype1, applyvalue1, applytype2, applyvalue2, applytype3, applyvalue3, applytype4, applyvalue4, applytype5, applyvalue5, applytype6, applyvalue6, applytype7, applyvalue7, type, expire, item_unique) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)');
		$stmt->execute(array($get_category, $_POST['description'], $_POST['method_pay'], $_POST['coins'], $_POST['count'], $_POST['vnum'], $_POST['absorption'], $time2,
							$_POST['attrtype0'], $_POST['attrvalue0'], $_POST['attrtype1'], $_POST['attrvalue1'], $_POST['attrtype2'], $_POST['attrvalue2'], 
							$_POST['attrtype3'], $_POST['attrvalue3'], $_POST['attrtype4'], $_POST['attrvalue4'], $_POST['attrtype5'], $_POST['attrvalue5'], 
							$_POST['attrtype6'], $_POST['attrvalue6'], 
							$_POST['applytype0'], $_POST['applyvalue0'], $_POST['applytype1'], $_POST['applyvalue1'], $_POST['applytype2'], $_POST['applyvalue2'], 
							$_POST['applytype3'], $_POST['applyvalue3'], $_POST['applytype4'], $_POST['applyvalue4'], $_POST['applytype5'], $_POST['applyvalue5'], 
							$_POST['applytype6'], $_POST['applyvalue6'], $_POST['applytype7'], $_POST['applyvalue7'], $type, $expire, $item_unique));
	}
	else if(Item::Column("applytype0") && Item::Sash($_POST['vnum']))
	{
		$added = true;
		$type = 1;
		$stmt = $database->Sqlite('INSERT INTO items_for_sell (category, description, pay_type, coins, count, vnum, socket'.Item::GetTime(3).', socket'.Item::GetTime(1).', attrtype0, attrvalue0, attrtype1 , attrvalue1, attrtype2, attrvalue2, attrtype3, attrvalue3, attrtype4, attrvalue4, attrtype5, attrvalue5, attrtype6, attrvalue6, applytype0, applyvalue0, applytype1, applyvalue1, applytype2, applyvalue2, applytype3, applyvalue3, applytype4, applyvalue4, applytype5, applyvalue5, applytype6, applyvalue6, applytype7, applyvalue7, type, expire, item_unique) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)');
		$stmt->execute(array($get_category, $_POST['description'], $_POST['method_pay'], $_POST['coins'], $_POST['count'], $_POST['vnum'], $_POST['absorption'], $time,
							$_POST['attrtype0'], $_POST['attrvalue0'], $_POST['attrtype1'], $_POST['attrvalue1'], $_POST['attrtype2'], $_POST['attrvalue2'], 
							$_POST['attrtype3'], $_POST['attrvalue3'], $_POST['attrtype4'], $_POST['attrvalue4'], $_POST['attrtype5'], $_POST['attrvalue5'], 
							$_POST['attrtype6'], $_POST['attrvalue6'], 
							$_POST['applytype0'], $_POST['applyvalue0'], $_POST['applytype1'], $_POST['applyvalue1'], $_POST['applytype2'], $_POST['applyvalue2'], 
							$_POST['applytype3'], $_POST['applyvalue3'], $_POST['applytype4'], $_POST['applyvalue4'], $_POST['applytype5'], $_POST['applyvalue5'], 
							$_POST['applytype6'], $_POST['applyvalue6'], $_POST['applytype7'], $_POST['applyvalue7'], $type, $expire, $item_unique));
	}
	else if(Item::Column("applytype0") && ($socket0 || $socket1 || $socket2))//pietre
	{
		$added = true;
		$type = 2;
		$stmt = $database->Sqlite('INSERT INTO items_for_sell (category, description, pay_type, coins, count, vnum, socket0, socket1, socket2, attrtype0, attrvalue0, attrtype1 , attrvalue1, attrtype2, attrvalue2, attrtype3, attrvalue3, attrtype4, attrvalue4, attrtype5, attrvalue5, attrtype6, attrvalue6, applytype0, applyvalue0, applytype1, applyvalue1, applytype2, applyvalue2, applytype3, applyvalue3, applytype4, applyvalue4, applytype5, applyvalue5, applytype6, applyvalue6, applytype7, applyvalue7, type, expire, item_unique) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)');
		$stmt->execute(array($get_category, $_POST['description'], $_POST['method_pay'], $_POST['coins'], $_POST['count'], $_POST['vnum'], $socket0, $socket1, $socket2,
							$_POST['attrtype0'], $_POST['attrvalue0'], $_POST['attrtype1'], $_POST['attrvalue1'], $_POST['attrtype2'], $_POST['attrvalue2'], 
							$_POST['attrtype3'], $_POST['attrvalue3'], $_POST['attrtype4'], $_POST['attrvalue4'], $_POST['attrtype5'], $_POST['attrvalue5'], 
							$_POST['attrtype6'], $_POST['attrvalue6'], 
							$_POST['applytype0'], $_POST['applyvalue0'], $_POST['applytype1'], $_POST['applyvalue1'], $_POST['applytype2'], $_POST['applyvalue2'], 
							$_POST['applytype3'], $_POST['applyvalue3'], $_POST['applytype4'], $_POST['applyvalue4'], $_POST['applytype5'], $_POST['applyvalue5'], 
							$_POST['applytype6'], $_POST['applyvalue6'], $_POST['applytype7'], $_POST['applyvalue7'], $type, $expire, $item_unique));
	}
	else if($socket0 || $socket1 || $socket2)
	{
		$added = true;
		$stmt = $database->Sqlite('INSERT INTO items_for_sell (category, description, pay_type, coins, count, vnum, socket0, socket1, socket2, attrtype0, attrvalue0, attrtype1 , attrvalue1, attrtype2, attrvalue2, attrtype3, attrvalue3, attrtype4, attrvalue4, attrtype5, attrvalue5, attrtype6, attrvalue6, expire, item_unique) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)');
		$stmt->execute(array($get_category, $_POST['description'], $_POST['method_pay'], $_POST['coins'], $_POST['count'], $_POST['vnum'], $socket0, $socket1, $socket2,
							$_POST['attrtype0'], $_POST['attrvalue0'], $_POST['attrtype1'], $_POST['attrvalue1'], $_POST['attrtype2'], $_POST['attrvalue2'], 
							$_POST['attrtype3'], $_POST['attrvalue3'], $_POST['attrtype4'], $_POST['attrvalue4'], $_POST['attrtype5'], $_POST['attrvalue5'], 
							$_POST['attrtype6'], $_POST['attrvalue6'], $expire, $item_unique));
	}
	else if($time2==0)
	{
		$added = true;
		$type = 2;
		$stmt = $database->Sqlite('INSERT INTO items_for_sell (category, description, pay_type, coins, count, vnum, socket2, attrtype0, attrvalue'.Item::GetTime(1).', attrtype1 , attrvalue1, attrtype2, attrvalue2, attrtype3, attrvalue3, attrtype4, attrvalue4, attrtype5, attrvalue5, attrtype6, attrvalue6, type, expire, item_unique) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)');
		$stmt->execute(array($get_category, $_POST['description'], $_POST['method_pay'], $_POST['coins'], $_POST['count'], $_POST['vnum'], $time,
							$_POST['attrtype0'], $_POST['attrvalue0'], $_POST['attrtype1'], $_POST['attrvalue1'], $_POST['attrtype2'], $_POST['attrvalue2'], 
							$_POST['attrtype3'], $_POST['attrvalue3'], $_POST['attrtype4'], $_POST['attrvalue4'], $_POST['attrtype5'], $_POST['attrvalue5'], 
							$_POST['attrtype6'], $_POST['attrvalue6'], $type, $expire, $item_unique));
	} else {
		$added = true;
		$type = 1;
		$stmt = $database->Sqlite('INSERT INTO items_for_sell (category, description, pay_type, coins, count, vnum, socket'.Item::GetTime(2).', attrtype0, attrvalue0, attrtype1 , attrvalue1, attrtype2, attrvalue2, attrtype3, attrvalue3, attrtype4, attrvalue4, attrtype5, attrvalue5, attrtype6, attrvalue6, type, expire, item_unique) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)');
		$stmt->execute(array($get_category, $_POST['description'], $_POST['method_pay'], $_POST['coins'], $_POST['count'], $_POST['vnum'], $time2,
							$_POST['attrtype0'], $_POST['attrvalue0'], $_POST['attrtype1'], $_POST['attrvalue1'], $_POST['attrtype2'], $_POST['attrvalue2'], 
							$_POST['attrtype3'], $_POST['attrvalue3'], $_POST['attrtype4'], $_POST['attrvalue4'], $_POST['attrtype5'], $_POST['attrvalue5'], 
							$_POST['attrtype6'], $_POST['attrvalue6'], $type, $expire, $item_unique));
	}
	
	if($added)
		S('Item added!');
}
?>


<div class="row mb-4">
	<div class="col-lg-6 col-md-6 mb-md-0 mb-4">
		<div class="card card-secondary">
			<div class="card-header pb-0">
				<h4 class="card-title"><i class="fa fa-gear"></i> Item Configuration</h4>
				<br>
				<h6 style="float:right;"></h6>
			</div>
			<div class="card-body">
				<form action="" method="post" class="form-horizontal">
					
					
					<div class="row">
							<div class="col-md-4">
								<div class="form-group">
									<label class="control-label" for="vnum">vNum</label>
									<input class="form-control" name="vnum" onkeyup="GetDesc();GetImage(this.value)" id="vnum" type="number" required>
								</div>
							</div>
							<div class="col-md-4">
								<div class="form-group">
									<label class="control-label" for="count">
										Object count
									</label>
									<input class="form-control" name="count" id="count" type="number" value="1" required>
								</div>
							</div>
							<div class="col-md-4">
								<div class="form-group">
									<label class="control-label" for="vnum">Category</label>
									<select name="category" class="form-control">
										<?php
											$category_list = array();
											$category_list = Categories::Get();
											foreach ($category_list as $s)
											{
												print '<option value="'.$s['id'].'">'.Categories::Language($s['name']).'</option>';
											}
										?>
									</select>
								</div>
							</div>
						</div>
					<div class="form-group">
						<small>Allow players to buy just an amount from this item (0 - Unlimited)</small>
						<div class="input-group mb-4">
							<input class="form-control" value="Purchase limit" disabled="">
							<input type="number" class="form-control" value="0" name="purchase_limit">
						</div>
					
						<label class="control-label" for="coins">
							Price
						</label>

						<div class="row">
							<div class="col-md-9">
								<select class="form-control" name="method_pay">
									<option value="1">MD</option>
									<option value="2">JD</option>
								</select>
							</div>
							<div class="col-md-3">
								<input class="form-control" name="coins" id="coins" type="number" value="10" required>
							</div>
						</div>
					</div>

					<div class="form-group">
						<label class="control-label" for="description">
							Description
						</label>
						<textarea class="form-control" rows="3" name="description" id="description"></textarea>
					</div>

					<div class="form-group">
						<label class="control-label">
							Bonuses
						</label>
					</div>

					<?php for($i=0;$i<=6;$i++) { ?>
					<div class="form-group">
						<div class="row">
							<div class="col-md-9">
								<select class="form-control" name="attrtype<?php print $i; ?>">
									<option value="0">No</option>
									<?php Item::BonusList(); ?>
								</select>
							</div>
							<div class="col-md-3">
								<input class="form-control" name="attrvalue<?php print $i; ?>" type="number" value="0" required>
							</div>
						</div>
					</div>
					<?php } ?>
					<?php if(Item::Column("applytype0")) { ?>
					<br><br>
					<div class="form-group">
						<a class="btn btn-dark" role="button" data-toggle="collapse" href="#sash" aria-expanded="false" aria-controls="sash">
							More bonus
						</a>
						<div class="collapse" id="sash">
						<br>
							<div class="form-group">
								<label class="control-label" for="absorption">
									Absorption
								</label>
								<input class="form-control" name="absorption" id="absorption" type="number" value="18">
							</div>
							<div class="form-group">
								<label class="control-label">
									Bonus
								</label>
							</div>
							<?php for($i=0;$i<=7;$i++) { ?>
							<div class="form-group">
								<div class="row">
									<div class="col-md-9">
										<select class="form-control" name="applytype<?php print $i; ?>">
											<option value="0">No</option>
											<?php Item::BonusList(); ?>
										</select>
									</div>
									<div class="col-md-3">
										<input class="form-control" name="applyvalue<?php print $i; ?>" type="number" value="0" required>
									</div>
								</div>
							</div>
							<?php } ?>
						</div>
					</div>

					<?php } ?>
				
			</div>
		</div>
	</div>
	<div class="col-lg-6 col-md-6 mb-md-0 mb-4">
		<div class="row">
				<div class="col-md-6">
					<div class="form-group">
						<div class="card card-secondary">
							<div class="card-header pb-0">
								<h4 class="card-title"><i class="fa fa-info-circle"></i> Item details</h4>
								<br>
								<h6 style="float:right;"></h6>
							</div>
							<div class="card-body">
								<div id="itemimage"><div class="alert alert-info"><i class="fa fa-info-circle"></i> Insert vnum to show image</div></div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<div class="card card-secondary">
							<div class="card-header pb-0">
								<h4 class="card-title"><i class="fa fa-gem"></i> Sockets</h4>
								<br>
								<h6 style="float:right;"></h6>
							</div>
							<div class="card-body">
								<div class="form-group">
									<label class="control-label" for="socket0">Socket (1)</label>
									<input class="form-control" name="socket0" id="socket0" type="number" value="0" required>
								</div>
								<div class="form-group">
									<label class="control-label" for="socket1">Socket (2)</label>
									<input class="form-control" name="socket1" id="socket1" type="number" value="0" required>
								</div>
								<div class="form-group">
									<label class="control-label" for="socket2">Socket (3)</label>
									<input class="form-control" name="socket2" id="socket2" type="number" value="0" required>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<div class="card card-secondary">
							<div class="card-header pb-0">
								<h4 class="card-title"><i class="fa fa-percent"></i> Item availability</h4>
								<br>
								<h6 style="float:right;"></h6>
							</div>
							<div class="card-body">
								<div class="form-group">
									<div class="row">
										<div class="col-lg-3">
											<label for="promotion_months">Months</label>
											<input class="form-control" type="number" value="0" id="promotion_months" name="promotion_months" min="0" required>
										</div>
										<div class="col-lg-3">
											<label for="promotion_days">Days</label>
											<input class="form-control" type="number" value="0" id="promotion_days" name="promotion_days" min="0" required>
										</div>
										<div class="col-lg-3">
											<label for="promotion_hours">Hours</label>
											<input class="form-control" type="number" value="0" id="promotion_hours" name="promotion_hours" min="0" required>
										</div>
										<div class="col-lg-3">
											<label for="promotion_minutes">Minutes</label>
											<input class="form-control" type="number" value="0" id="promotion_minutes" name="promotion_minutes" min="0" required>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<div class="card card-secondary">
							<div class="card-header pb-0">
								<h4 class="card-title"><i class="fa fa-clock"></i> Item Time &bull; Costumes</h4>
								<br>
								<h6 style="float:right;"></h6>
							</div>
							<div class="card-body">
						
								<div class="form-group">
									<div class="row">
										<div class="col-lg-3">
											<label for="time2_months">Months</label>
											<input class="form-control" type="number" value="0" id="time2_months" name="time2_months" min="0" required>
										</div>
										<div class="col-lg-3">
											<label for="time2_days">Days</label>
											<input class="form-control" type="number" value="0" id="time2_days" name="time2_days" min="0" required>
										</div>
										<div class="col-lg-3">
											<label for="time2_hours">Hours</label>
											<input class="form-control" type="number" value="0" id="time2_hours" name="time2_hours" min="0" required>
										</div>
										<div class="col-lg-3">
											<label for="time2_minutes">Minutes</label>
											<input class="form-control" type="number" value="0" id="time2_minutes" name="time2_minutes" min="0" required>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				
				
				<div class="col-md-12">
					<div class="form-group">
						<div class="card card-secondary">
							<div class="card-header pb-0">
								<h4 class="card-title"><i class="fa fa-clock"></i> Item time &bull; Objects</h4>
								<br>
								<h6 style="float:right;"></h6>
							</div>
							<div class="card-body">
								<div class="form-group">
									<div class="row">
										<div class="col-lg-3">
											<label for="time_months">Months</label>
											<input class="form-control" type="number" value="0" id="time_months" name="time_months" min="0" required>
										</div>
										<div class="col-lg-3">
											<label for="time_days">Days</label>
											<input class="form-control" type="number" value="0" id="time_days" name="time_days" min="0" required>
										</div>
										<div class="col-lg-3">
											<label for="time_hours">Hours</label>
											<input class="form-control" type="number" value="0" id="time_hours" name="time_hours" min="0" required>
										</div>
										<div class="col-lg-3">
											<label for="time_minutes">Minutes</label>
											<input class="form-control" type="number" value="0" id="time_minutes" name="time_minutes" min="0" required>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="form-group">
				<button class="btn btn-dark btn-block btn-lg" name="add" type="submit"><i class="fa fa-plus"></i> Create item</button>
			</div>
		</form>
	</div>
</div>
<script>
    var editor;
    function GetDesc() {
      var vnumInput = document.getElementById("vnum").value;
      fetch("<?php print Basic::URL(); ?>?module=vnum&vnum=" + encodeURIComponent(vnumInput))
        .then(function (response) {
          return response.text();
        })
        .then(function (descriptionData) {
          if (editor) {
            editor.setData(descriptionData);
          } else {
            ClassicEditor
              .create(document.querySelector('#description'), {
                data: descriptionData
              })
              .then(createdEditor => {
                editor = createdEditor;
              })
              .catch(error => {
                console.error('Error initializing CKEditor:', error);
              });
          }
        })
        .catch(function (error) {
          console.error("Error:", error);
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
      GetDesc();
    });

function GetImage(vnum)
	{
		fetch("<?php print Basic::URL(); ?>?module=image&vnum=" + encodeURIComponent(vnum))
			.then(function(response) {
				return response.text(); 
			})
			.then(function(description) {
				var div = document.getElementById('itemimage');
				div.innerHTML = description;
			})
			.catch(function(error) {
				console.error("Error:", error);
			});
	}
	</script>