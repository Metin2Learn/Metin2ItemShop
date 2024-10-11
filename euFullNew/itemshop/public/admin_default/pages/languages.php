<?php
	if(isset($_POST['keys'], $_POST['make_primary']))
	{
		$makeprimary = false;
		$json_languages['settings']['default'] = $_POST['keys'];
		$makeprimary = true;
		if($makeprimary)
		{
			$json_new = json_encode($json_languages);
			file_put_contents('system/database/db_languages.json', $json_new);
		}
	}
	if(isset($_POST['keys'], $_POST['turnlang']))
	{
		if(Lang::ChangeStatus($_POST['keys']))
			print '<script>alertSuccess("language status changed");</script>';
	}
?>

<div class="container-fluid py-4">
	<div class="row mb-4">
		<div class="col-lg-12 col-md-12 mb-md-0 mb-4">
			<div class="card card-secondary">
				<div class="card-header pb-0">
					<h4 class="card-title">Languages</h4><br>
					<h6 style="float:right;"></h6>
				</div>
				<div class="card-body">
					<table class="table table-bordered">
						<thead class="thead-dark">
							<tr>
								<th>Namae</th>
								<th>Const</th>
								<th style="width:40%;">Actions </th>
							</tr>
						</thead>
						<tbody>
						<?php
							if(count($json_languages['languages'])>1) 
							{
								foreach($json_languages['languages'] as $key => $value)
								{
									?>
									<tr>
										<td><?= $value;?></td>
										<td><?= $key;?></td>
										<td>
											<center>
												<form method="POST">
													<input type="hidden" value="<?= $key;?>" name="keys">
													<button type="submit" alt="<?=l(235);?>" title="<?=l(235);?>" name="make_primary" class="btn btn-secondary btn-sm" <?php if($json_languages['settings']['default']==$key) print 'disabled'; ?>>
														<i class="fa-solid fa-key"></i>
													</button>
													&nbsp;
													<?php if(Lang::StatusVF($key)) { ?>
													<button type="submit" class="btn btn-success btn-sm" name="turnlang">
														<i class="fa fa-toggle-on" aria-hidden="true"></i>
													</button>
													<?php } else { ?>
													<button type="submit" class="btn btn-danger btn-sm" name="turnlang">
														<i class="fa fa-toggle-off" aria-hidden="true"></i>
													</button>
													<?php } ?>
													&nbsp;
														<a class="btn btn-warning btn-sm" onclick="window.location.replace('<?=Basic::URL(); ?>admin/language/<?= $key;?>');">
															<i class="fa fa-pencil"></i>
														</a>
												</form>
											</center>
										</td>
									</tr>
									<?php
								}
							
							}
						?>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>