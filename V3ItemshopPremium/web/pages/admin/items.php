<div class="card">
    <div class="card__header">
        <h2><?php print $lang_shop['managing-objects']; ?></h2>
    </div>
    <div class="card__body">
		<?php 
			if(isset($_SESSION['redeem']))
			{
		?>
		<div class="alert alert--dark alert-dismissible fade in" role="alert">
			<button type="button" class="close" data-dismiss="alert" aria-label="Close">
				<span aria-hidden="true">&times;</span>
			</button>
			<span><?php print $lang_shop['code-created']; ?></span>
			<hr>
			<form>
				<div class="input-group">
					<input type="text" class="form-control" value="<?php print $_SESSION['redeem']; ?>" id="share" readonly="readonly">
					<span class="input-group-btn">
						<button class="btn btn-default" type="button" id="copyButton" data-placement="button">
							<i class="fa fa-clipboard" aria-hidden="true"></i>
						</button>
					</span>
				</div>
			</form>
		</div>
		<?php } ?>
		<form action="" method="post">
			<table id="data-table-command" class="table table-striped table--vmiddle">
				<thead>
					<tr>
						<th data-column-id="id" data-type="numeric" data-identifier="true">ID</th>
						<th data-column-id="type" data-type="numeric" data-identifier="false" data-visible="false">TYPE</th>
						<th data-column-id="icon" data-formatter="icons" data-sortable="false">Icon</th>
						<th data-column-id="name"><?php print $lang_shop['name']; ?></th>
						<th data-column-id="price"><?php print $lang_shop['price_object']; ?></th>
						<th data-column-id="category"><?php print $lang_shop['category']; ?></th>
						<th data-column-id="date" data-order="desc"><?php print $lang_shop['last-edit']; ?></th>
						<th data-column-id="commands" data-formatter="commands" data-sortable="false"><?php print $lang_shop['managing-objects']; ?></th>
					</tr>
				</thead>
				<tbody>
					<?php
						$items = $shop->getAdminItems();
						
						$vnums = array_column($items, 'vnum');
						$names = $shop->getMultipleNames($vnums);
						$icons = $shop->getMultipleIcon($vnums);
						
						foreach($items as $item) {
							$item_name = $names[$item['vnum']];
							if($item['type']==3)
								$item_name = $account_bonuses[$item['vnum']];
							if($item['book']>0)
							{
								$skill_name = $shop->getSkill($item['book']);
								$item_name.=' - '.$skill_name;
							} else if($item['book_type']!='FIX') {
								if($item['book_type']=='RANDOM_ALL_CHARS')
									$skill_name = $lang_shop['random-skill'];
								else
									$skill_name = $shop->getLocaleGameByType($item['book_type']);
								$item_name.=' - '.$skill_name;
							} else if($item['polymorph']>0)
							{
								$mob_name = $shop->getMob($item['polymorph']);
								$item_name.=' - '.$mob_name;
							}
					?>
					<tr>
						<td><?php print $item['id']; ?></td>
						<td><?php print $item['type']; ?></td>
						<td><?php if($item['type']!=3) print $shop_url.'images/'.$icons[$item['vnum']]['src']; else print $shop_url.'images/icons/bonuses/'.$server_item['buff'][$item['vnum']][0].'.png'; ?></td>
						<td><?php print $item_name; ?></td>
						<td><?php print $item['coins'].' ';
								if($item['pay_type']==1)
									print $lang_shop['coins'];
								else print $lang_shop['jcoins']; 
						?>
						</td>
						<td><?php print $categoriesbyid[$item['category']]['name']; ?></td>
						<td><?php print $item['date']; ?></td>
					</tr>
					<?php } ?>
				</tbody>
			</table><br>

			<div class="row">
				<div class="col-sm-3">
					<div class="form-group">
						<select class="select2" name="wheel_level" required>
							<option value="1">[<?php print $lang_shop['wheel-of-destiny'].'] '.$lang_shop['the-level']; ?> 1</option>
							<option value="2">[<?php print $lang_shop['wheel-of-destiny'].'] '.$lang_shop['the-level']; ?> 2</option>
							<option value="3">[<?php print $lang_shop['wheel-of-destiny'].'] '.$lang_shop['the-level']; ?> 3</option>
						</select>
					</div>
				</div>
				<div class="col-sm-2">
					<div class="form-group">
						<button name="item" type="submit" class="btn btn-primary"><?php print $lang_shop['add'].' ['.$lang_shop['wheel-of-destiny'].']'; ?></button>
					</div>
				</div>
				<div class="col-sm-3">
					<div class="form-group">
						<button name="delete" type="submit" class="btn btn-danger" onclick="return confirm('<?php print $lang_shop['check-delete']; ?>')"><?php print $lang_shop['delete']; ?></button>
					</div>
				</div>
			</div>
		</form>
    </div>
</div>