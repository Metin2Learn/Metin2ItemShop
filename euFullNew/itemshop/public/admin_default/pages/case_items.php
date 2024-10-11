<?php
	if(isset($_POST['vnum'], $_POST['chance'], $_POST['category']))
		CaseOpener::AddItem($_POST['category'], $_POST['vnum'], $_POST['chance']);
	if(isset($_POST['itemidremove']))
		CaseOpener::RemoveItem($_POST['itemidremove']);
?>

<div class="row mb-4">
	<div class="col-lg-6 col-md-6 mb-md-0 mb-4">
		<div class="card card-secondary">
			<div class="card-header pb-0">
				<h4 class="card-title"><i class="fa fa-gear"></i> Insert items in chest</h4>
				<br>
				<h6 style="float:right;"></h6>
			</div>
			<div class="card-body">
				<form action="" method="post" class="form-horizontal">
					<div class="row">
							<div class="col-md-4">
								<div class="form-group">
									<label class="control-label" for="vnum">Item vNum</label>
									<input class="form-control" name="vnum" onkeyup="GetDesc();" id="vnum" type="number" placeholder="19" required>
								</div>
							</div>
							<div class="col-md-4">
								<div class="form-group">
									<label class="control-label" for="count">
										Chance
									</label>
									<input class="form-control" name="chance" id="count" type="number" value="100" max="100" required>
								</div>
							</div>
							<div class="col-md-4">
								<div class="form-group">
									<label class="control-label" for="vnum">Category</label>
									<select name="category" class="form-control">
										<?php
											$caseslist = array();
											$caseslist = CaseOpener::Get();
											foreach ($caseslist as $s)
											{
												print '<option value="'.$s['id'].'">'.CaseOpener::Language($s['name']).'</option>';
											}
										?>
									</select>
								</div>
							</div>
						</div>
					<button type="submit" style="float:right;" class="btn btn-dark btn-sm"><i class="fa fa-plus"></i> Add to case</button>
				</form>
			</div>
		</div>
	</div>
	<div class="col-lg-6 col-md-6 mb-md-0 mb-4">
		<div class="card card-secondary">
			<div class="card-header pb-0">
				<h4 class="card-title"><i class="fa fa-gear"></i> Tree editor</h4>
				<br>
				<h6 style="float:right;"></h6>
			</div>
			<div class="card-body">
				<table class="table table-bordered">
					<tbody>
						
								<tr>
									<th scope="col" style="text-transform:uppercase;width:30%;">
										<center>Categories</center>
									</th>
									<th scope="col" style="text-transform:uppercase;">
										<center>Items</center>
									</th>
								</tr>
								<?php
								foreach ($caseslist as $tra) {
									?>
									<tr>
										<td>
											<?=$tra['id'];?> &bull; <?= Categories::Translation($tra['name'], $language_code); ?> &bull; <?=$tra['price'];?>MD
										</td>
										<td>
											<ul class="list-group">
											<?php
											$items_list = array();
											$items_list = Roll::GetOrderAdmin($tra['id']);

											foreach ($items_list as $isa) 
											{
												
												print '<li class="list-group-item d-flex align-items-center justify-content-between"><div class="d-inline">[ '.$isa['chance'].'% ]&nbsp;&bull;&nbsp;'.Item::Name($isa['item_vnum']).'</div><form method="post" class="d-inline"><input type="hidden" name="itemidremove" value="'.$isa['id'].'"><button type="submit" class="btn btn-danger btn-sm"><i class="fa fa-trash"></i></button></form></li>';

											}
											?>
											</ul>
										</td>
									</tr>
								<?php
								}
							
							?>

					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>