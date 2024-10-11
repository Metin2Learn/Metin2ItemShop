<?php
	if ($_SERVER["REQUEST_METHOD"] == "POST") 
	{
		$uploadDir = 'style/universal/item/';
		if (!file_exists($uploadDir)) {
			mkdir($uploadDir, 0777, true);
		}
		$targetFile = $uploadDir.'upload.zip';
		$fileType = pathinfo($targetFile, PATHINFO_EXTENSION);
		if ($fileType == "zip") 
		{
			if (move_uploaded_file($_FILES["zipFile"]["tmp_name"], $targetFile)) 
			{
				require_once('system/sys_unzipper.php');
				$archive = new PclZip($targetFile);
				
				if ($archive->extract($uploadDir) == 0)
					E($archive->errorInfo(true));
				else 
				{
					if(file_exists($targetFile)) 
					{
						unlink($targetFile);
					}
					
					S("The file " . htmlspecialchars(basename($_FILES["zipFile"]["name"])) . " has been uploaded and unzipped!");
				}
			} 
			else 
			{
				E("Sorry, there was an error uploading your file.");
			}
		} 
		else 
		{
			I("Please upload a ZIP file.");
		}
	}
?>
<div class="row mb-4">
	<div class="col-lg-12 col-md-12 mb-md-0 mb-4">
		<div class="card card-secondary">
			<div class="card-header pb-0">
				<h4 class="card-title"><i class="fa fa-exchange"></i> TGA to PNG Converter</h4>
				<br>
				<h6 style="float:right;"></h6>
			</div>
			<div class="card-body">
				<div class="alert alert-info">
					After using converter program upload "upload.zip" file!<br><br><button onclick="window.location.replace('https://licensesoftware.mt2-services.eu/tga_to_png.zip');" class="btn btn-warning">Download Converter</button>
				</div>
				<center>
					 <form method="POST" enctype="multipart/form-data">
						<div class="form-group">
							<input type="file" style="width:30%;" class="form-control-file" name="zipFile" accept=".zip" required>
						</div>
						<button type="submit" class="btn btn-dark">Upload icon archive</button>
					</form>
				</center>
			</div>
		</div>
	</div>
</div>
