<div class="row mb-4">
	<div class="col-lg-6 col-md-6 mb-md-0 mb-4">
		<div class="card card-secondary">
			<div class="card-header pb-0">
				<h4 class="card-title"><i class="fa fa-gear"></i> General Settings</h4>
				<br>
				<h6 style="float:right;"></h6>
			</div>
			<div class="card-body">
				<form method="POST">
					<?php
						if(isset($_POST['base'], $_POST['settings_3'], $_POST['settings_4'], $_POST['settings_5']))
						{
							Settings::Update(3, $_POST['settings_3']);
							Settings::Update(4, $_POST['settings_4']);
							Settings::Update(5, $_POST['settings_5']);
						}
					?>
					<ul class="list-group">
						<li class="list-group-item d-flex align-items-center justify-content-between" style="height: auto;">
							<div>
								Server Name
							</div>
							<label style="margin-top:10px;width:300px;">
								<input type="text" class="form-control" name="settings_3" value="<?=Settings::Get(3);?>" placeholder="Server Name" required="">
							</label>
						</li>
						<li class="list-group-item d-flex align-items-center justify-content-between" style="height: auto;">
							<div>
								SEO Description
							</div>
							<label style="margin-top:10px;width:300px;">
								<textarea type="text" class="form-control" name="settings_4" placeholder="SEO Description" required=""><?=Settings::Get(4);?></textarea>
							</label>
						</li>
						<li class="list-group-item d-flex align-items-center justify-content-between" style="height: auto;">
							<div>
								SEO Facebook image
							</div>
							<label style="margin-top:10px;width:300px;">
								<input type="text" class="form-control" name="settings_5" value="<?=Settings::Get(5);?>" placeholder="SEO Facebook image" required="">
							</label>
						</li>
					</ul>
					<br>
					<button style="float:right;" type="submit" name="base" class="btn btn-dark btn-sm"><i class="fa fa-save"></i></button>
				</form>
			</div>
		</div>
	</div>
	<div class="col-lg-6 col-md-6 mb-md-0 mb-4">
		<div class="card card-secondary">
			<div class="card-header pb-0">
				<h4 class="card-title"><i class="fa fa-brush"></i> Design details</h4>
				<br>
				<h6 style="float:right;"></h6>
			</div>
			<div class="card-body">
				<?php 
					if(isset($_POST['img'])) {
						$targetDir = "style/universal/logo/";
						$extension = strtolower(pathinfo($_FILES["logo_image"]["name"], PATHINFO_EXTENSION));
						$targetFile =  $targetDir . time() . '.' . $extension;
						$uploadOk = 1;
						
						$validImageTypes = array("jpg", "jpeg", "png", "gif");
						if(!in_array($extension, $validImageTypes)) {
							E("Invalid image format. Only JPG, JPEG, PNG, and GIF files are allowed.");
							$uploadOk = 0;
						}
						
						if (file_exists($targetFile)) {
							unset($targetFile);
							$uploadOk = 0;
						}
						
						if ($uploadOk == 0) {
							E("Sorry, your file was not uploaded.");
						} else {
							if (move_uploaded_file($_FILES["logo_image"]["tmp_name"], $targetFile)) {
								Settings::Update(6,Basic::URL().$targetFile);
								S("The file " . basename($_FILES["logo_image"]["name"]) . " has been uploaded and saved.");
							} else {
								E("Sorry, there was an error uploading your file.");
							}
						}
					}
				?>

				<form method="POST" enctype="multipart/form-data">
					<ul class="list-group">
						<li class="list-group-item d-flex align-items-center justify-content-between" style="height: auto;">
							<div>
								Current Logo
							</div>
							<img height="50" src="<?=Settings::Get(6);?>">
						</li>
						<li class="list-group-item d-flex align-items-center justify-content-between" style="height: auto;">
							<div>
								Upload logo
							</div>
							<label style="margin-top:10px;width:300px;">
								<div class="custom-file">
									<input type="file" class="custom-file-input" name="logo_image" id="fileToUpload">
									<label class="custom-file-label" for="fileToUpload">Choose file</label>
								</div>
							</label>
						</li>
					</ul><br>
					<button style="float:right;" type="submit" name="img" class="btn btn-dark btn-sm"><i class="fa fa-save"></i></button>
				</form>
				<script>
					document.querySelector('.custom-file-input').addEventListener('change', function(e) {
						var fileName = document.getElementById("fileToUpload").files[0].name;
						var nextSibling = e.target.nextElementSibling;
						nextSibling.innerText = fileName;
					});
				</script>
			</div>
		</div>
		
	</div>
</div>