<?php
	if(isset($_POST['makeprimary']))
	{
		Theme::MakePrimary($_POST['makeprimary']);
		print '<script>alertSuccess("Now use '.$_POST['makeprimary'].' template");</script>';
	}
?>
<div class="container-fluid py-4">
	<div class="row mb-4">
		<div class="col-lg-12 col-md-12 mb-md-0 mb-4">
			<div class="card card-secondary">
				<div class="card-header pb-0">
					<h4 class="card-title"><i class="fas fa-palette"></i> Template manager</h4><br>
					<h6 style="float:right;"></h6>
				</div>
				<div class="card-body">
					<table class="table table-bordered">
						<thead class="thead-dark">
							<tr>
								<th>Name</th>
								<th>Details</th>
								<th style="width:20%;">Actions</th>
							</tr>
						</thead>
						<tbody>
							<?php
							$dir = 'public/';
							$dirstyle = 'style/';
							if ($handle = opendir($dir)) 
							{
								$blacklist = array('.', '..', '.htaccess', 'loading.php','admin_');
								while (false !== ($file = readdir($handle))) 
								{
									if (!in_array($file, $blacklist) && !strstr($file, 'admin_')) 
									{
										if(file_exists($dir.$file.'/body.php') && file_exists($dir.$file.'/head.php') && file_exists($dir.$file.'/ownership.php'))
										{
											include $dir.$file.'/ownership.php';
											$file_name = $file;
											$totalsize = intval((GetDirectorySize($dir.$file)+GetDirectorySize($dirstyle.$file))/1000);
										?>
										<tr>
											<td style="vertical-align:middle;"><?= $file_name; ?><br><small>&copy;&nbsp;<?=$template_creator;?></small></td>
											<td style="vertical-align:middle;">
												<div class="row">
													<div class="col-md-6 my-auto align-self-center">
														<a target="blank" href="<?= $template_image; ?>" style=" position: relative;text-align: center;color: white;">
															<img style="width:130.55px;height:150px;opacity:0.3" src="<?= $template_image; ?>"/>
															<div style="position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);"><b style="color:black">PREVIEW</b></div>
														</a>
													</div>
													<div class="col-md-6 my-auto align-self-center">
														<div style="vertical-align:middle;">
														<b>Script Location:</b> <?=$dir.$file.'/';?><br>
														<b>Style Location:</b> <?=$dirstyle.$file.'/';?><br>
														<b>Size:</b> ~ <?=$totalsize; ?> MB <br>
														<b>Version:</b> <?=$template_version;?> <br>
														<br><?=$owner_message;?>
														</div>
													</div>
												</div>
											</td>
											<td style="vertical-align:middle;">
												<center>
													<form method="POST">
														<input type="hidden" value="<?= $file;?>" name="makeprimary">
														<button type="submit" alt="Make primary" title="Make primary" class="btn btn-secondary btn-sm" <?php if(Theme::Get(1)==$file) print 'disabled'; ?>>
															<i class="fa-solid fa-key"></i>
														</button>
													</form>
												</center>
											</td>
										</tr>
										<?php
										}
									}
								}
								closedir($handle);
							}
							?>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>