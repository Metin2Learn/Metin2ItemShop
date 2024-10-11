<?php
	if(isset($_POST['create_a_new_case'], $_POST['caseprice']))
		$sys_alert = CaseOpener::Create($_POST['caseprice']);
	if(isset($_POST['ctgid'], $_POST['cname']))
		$sys_alert = CaseOpener::Del($_POST['ctgid'], $_POST['cname']);
	if(isset($_POST['en'], $_POST['ro'], $_POST['ar'], $_POST['de'], $_POST['fr'], $_POST['tr'], $_POST['hu'], $_POST['es'], $_POST['pl'], $_POST['it'], $_POST['el'], $_POST['ru'], $_POST['salve_id']))
		$sys_alert = CaseOpener::EditTranslate($_POST['en'], $_POST['ro'], $_POST['ar'], $_POST['de'], $_POST['fr'], $_POST['tr'], $_POST['hu'], $_POST['es'], $_POST['pl'], $_POST['it'], $_POST['el'], $_POST['ru'], $_POST['salve_id']);
?>

	<div class="row mb-4">
		<div class="col-lg-6 col-md-6 mb-md-0 mb-4">
			<div class="card card-secondary">
				<div class="card-header pb-0">
					<h4 class="card-title"><i class="fa fa-plus"></i> Create a new case</h4>
					<br>
					<h6 style="float:right;"></h6>
				</div>
				<div class="card-body">
					<div class="alert alert-info">Press on "Create case" to add a new category and edit translation from right table.</div>
					<form method="POST">
						<div class="input-group mb-3">
						  <div class="input-group-prepend">
							<span class="input-group-text" id="basic-addon1">Dragon Coins</span>
						  </div>
						  <input type="number" class="form-control" placeholder="Case price" aria-label="Case price" name="caseprice">
						</div>
						<button type="submit" name="create_a_new_case" class="btn btn-dark" style="float:right;">Create case</button>
					</form>
				</div>
			</div>
		</div>
		<div class="col-lg-6 col-md-6 mb-md-0 mb-4">
			<div class="card card-secondary">
				<div class="card-header pb-0">
					<h4 class="card-title"><i class="fa fa-list"></i> List category</h4>
					<br>
					<h6 style="float:right;"></h6>
				</div>
				<div class="card-body">
					<table class="table table-bordered">
						<tbody>
							<?php
								$category_list = array();
								$category_list = CaseOpener::Get();
								if(Array_Counter($category_list))
								{
									?>
									<tr>
										<th scope="col" style="text-transform:uppercase;">
											<center>Translation</center>
										</th>
										<th scope="col" style="text-transform:uppercase;">
											<center>Price</center>
										</th>
										<th scope="col" style="text-transform:uppercase;">
											<center>Translations</center>
										</th>
										<th scope="col" style="text-transform:uppercase;">
											<center>Actions</center>
										</th>
									</tr>
									<?php
									foreach($category_list as $ctglist)
									{
										?>
										<tr>
											<td><center>[<?= CaseOpener::Translation($ctglist['name'], $language_code); ?>]</center></td>
											<td>
												<center><?= $ctglist['price']; ?> Dragon Coins</center>
											</td>
											<td>
												<center><button class="btn btn-sm btn-warning" data-toggle="modal" data-target="#open_modal_forid_<?=$ctglist['id'];?>"><i class="fa fa-pen"></i> Edit translations</button></center>
											</td>
											
											<td>
												<center>
													<form method="POST">
														<input type="hidden" value="<?=$ctglist['name'];?>" name="cname">
														<input type="hidden" value="<?=$ctglist['id'];?>" name="ctgid">
														<button type="submit" class="btn btn-sm btn-danger">
															<i class="fa fa-trash"></i>
														</button>
													</form>
												</center>
											</td>
										</tr>
										
										
										<div class="modal fade" id="open_modal_forid_<?=$ctglist['id'];?>" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
											<div class="modal-dialog modal-dialog-centered" role="document">
											<div class="modal-content">
												<div class="modal-header">
												<h5 class="modal-title" id="exampleModalLongTitle">Change translations</h5>
												<button type="button" class="close" data-dismiss="modal" aria-label="Close">
												  <span aria-hidden="true">&times;</span>
												</button>
												</div>
												<div class="modal-body">
													<form method="POST">
														<div class="row">
															<div class="col-md-6">
																<label>English:</label>
																<input type="text" name="en" value="<?= CaseOpener::Translation($ctglist['name'], 'en'); ?>" class="form-control">
																<br>
																<label>Romanian:</label>
																<input type="text" name="ro" value="<?= CaseOpener::Translation($ctglist['name'], 'ro'); ?>" class="form-control">
																<br>
																<label>Arabic:</label>
																<input type="text" name="ar" value="<?= CaseOpener::Translation($ctglist['name'], 'ar'); ?>" class="form-control">
																<br>
																<label>Deutsch:</label>
																<input type="text" name="de" value="<?= CaseOpener::Translation($ctglist['name'], 'de'); ?>" class="form-control">
																<br>
																<label>Francais:</label>
																<input type="text" name="fr" value="<?= CaseOpener::Translation($ctglist['name'], 'fr'); ?>" class="form-control">
																<br>
																<label>Turkish:</label>
																<input type="text" name="tr" value="<?= CaseOpener::Translation($ctglist['name'], 'tr'); ?>" class="form-control">
															</div>
															<div class="col-md-6">
																<label>Hungarian:</label>
																<input type="text" name="hu" value="<?= CaseOpener::Translation($ctglist['name'], 'hu'); ?>" class="form-control">
																<br>
																<label>Spanish:</label>
																<input type="text" name="es" value="<?= CaseOpener::Translation($ctglist['name'], 'es'); ?>" class="form-control">
																<br>
																<label>Polish:</label>
																<input type="text" name="pl" value="<?= CaseOpener::Translation($ctglist['name'], 'pl'); ?>" class="form-control">
																<br>
																<label>Italian:</label>
																<input type="text" name="it" value="<?= CaseOpener::Translation($ctglist['name'], 'it'); ?>" class="form-control">
																<br>
																<label>Greek:</label>
																<input type="text" name="el" value="<?= CaseOpener::Translation($ctglist['name'], 'el'); ?>" class="form-control">
																<br>
																<label>Russian:</label>
																<input type="text" name="ru" value="<?= CaseOpener::Translation($ctglist['name'], 'ru'); ?>" class="form-control">
															</div>
														</div>
														<br>
														<div class="modal-footer">
															<input type="hidden" name="salve_id" value="<?= $ctglist['name']; ?>">
															<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
															<button type="submit" class="btn btn-primary">Save changes</button>
														</div>
													</form>
												</div>
											</div>
										</div>
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
