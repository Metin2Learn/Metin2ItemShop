<style>
	.file-upload-btn {
	display: inline-block;
	background-color: #6c757d;
	border: none;
	color: white;
	padding: 10px 15px;
	border-radius: 5px;
	cursor: pointer;
	transition: background-color 0.3s ease;
	}
	.file-upload-btn:hover {
	background-color: #555555;
	}
	.file-upload-icon {
	margin-right: 10px;
	font-size: 18px;
	}
	.file-upload-text {
	vertical-align: middle;
	}
	.file-upload-container {
	display: flex;
	align-items: center;
	}
	.file-upload-input {
	display: none;
	}
	.file-upload-label {
	margin-left: 10px;
	cursor: pointer;
	}
</style>
				<div class="row mb-4">
					<div class="col-lg-6 col-md-6 mb-md-0 mb-4">
						<div class="card card-secondary">
							<div class="card-header pb-0">
								<h4 class="card-title"><span class="fa fa-upload"></span> Upload item_names</h4>
								<br>
								<h6 style="float:right;"></h6>
							</div>
							<div class="card-body">
							
										<ul class="list-group">
											<b>item_names.txt</b>
											<li class="list-group-item d-flex align-items-center justify-content-between" style="height: auto;">
												<div>
												<form method="POST" enctype="multipart/form-data">
													<select name="lang" id="lang" class="form-control" style="width:100%;">
														<option value="en">Choose language</option>
														<?php
															$languages_list = Item::Language_Reader();
															if (count($languages_list) > 0) {
																foreach ($languages_list as $column) {
																	$file_known = 'system/txts/item_names_'.$column.'.txt';
																	if(file_exists($file_known))
																	{
																		$lastModified = filemtime($file_known);
																		echo '<option value="'.$column.'">'.$column.'&nbsp;&nbsp;(Updated: ' . date('d/m/Y H:i', $lastModified).')</option>';
																	}
																	else
																		echo '<option value="'.$column.'">'.$column.'</option>';
																}
															}
															?>
													</select>
												</div>
													<label style="margin-top:10px;width:300px;">
														<div class="custom-file">
															<input class="custom-file-input" id="fileToUpload" type="file" name="item_names">
															<label class="custom-file-label" for="fileToUpload">Choose file</label>
														</div>
													</label>
													&nbsp;<button class="btn btn-dark" type="submit" name="item_namesubmit" style="margin-top:3px;"><span class='fa fa-upload'></span> Upload</button>
												</form>
											</li>
											
											<br>
											
											<b>itemdesc.txt</b>
											<li class="list-group-item d-flex align-items-center justify-content-between" style="height: auto;">
												<div>
												<form method="POST" enctype="multipart/form-data">
												<select name="lang_itemdesc" id="lang" class="form-control" style="width:100%;">
													<option value="en">Choose language</option>
													<?php
														$languages_list = Item::Language_Reader();
														if (count($languages_list) > 0) {
															foreach ($languages_list as $column) {
																$file_known = 'system/txts/itemdesc_'.$column.'.txt';
																if(file_exists($file_known))
																{
																	$lastModified = filemtime($file_known);
																	echo '<option value="'.$column.'">'.$column.'&nbsp;&nbsp;(Updated: ' . date('d/m/Y H:i', $lastModified).')</option>';
																}
																else
																	echo '<option value="'.$column.'">'.$column.'</option>';
															}
														}
														?>
												</select></div>
													<label style="margin-top:10px;width:300px;">
														<div class="custom-file">
															<input class="custom-file-input" id="fileToUpload" type="file" name="itemdesc">
															<label class="custom-file-label" for="fileToUpload">Choose file</label>
														</div>
													</label>
													&nbsp;<button class="btn btn-dark" type="submit" name="itemdescsubmit" style="margin-top:3px;"><span class='fa fa-upload'></span> Upload</button>
												</form>
											</li>
										</ul>
							
							
								
							</div>
						</div>
					</div>
					<div class="col-lg-6 col-md-6 mb-md-0 mb-4">
						<div class="card card-secondary">
							<div class="card-header pb-0">
								<h4 class="card-title"><span class="fa fa-upload"></span> Others</h4>
								<br>
								<h6 style="float:right;"></h6>
							</div>
							<div class="card-body">
								<div class="row">
									<div class="col-md-12">
									
										<ul class="list-group">
											<li class="list-group-item d-flex align-items-center justify-content-between" style="height: auto;">
												<div>item_proto.txt</div>
												<form method="POST" enctype="multipart/form-data">
													<label style="margin-top:10px;width:300px;">
														<div class="custom-file">
															<input class="custom-file-input" id="fileToUpload" type="file" name="itemproto">
															<label class="custom-file-label" for="fileToUpload">Choose file</label>
														</div>
													</label>
													&nbsp;<button class="btn btn-dark" type="submit" name="item_protosubmit" style="margin-top:3px;"><span class='fa fa-upload'></span> Upload</button>
													<br><small><?php
														$lastModified = filemtime('system/txts/item_proto.txt');
														print '<b>Last updated:</b> ' . date('d/m/Y H:i', $lastModified);
													?></small>
												</form>
											</li>
											
											
											<li class="list-group-item d-flex align-items-center justify-content-between" style="height: auto;">
												<div>item_list.txt</div>
												<form method="POST" enctype="multipart/form-data">
													<label style="margin-top:10px;width:300px;">
														<div class="custom-file">
															<input class="custom-file-input" id="fileToUpload" type="file" name="itemlist">
															<label class="custom-file-label" for="fileToUpload">Choose file</label>
														</div>
													</label>
													&nbsp;<button class="btn btn-dark" type="submit" name="item_listsubmit" style="margin-top:3px;"><span class='fa fa-upload'></span> Upload</button>
													<br><small><?php
														$lastModified = filemtime('system/txts/item_list.txt');
														print '<b>Last updated:</b> ' . date('d/m/Y H:i', $lastModified);
													?></small>
												</form>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
<?php

	if (isset($_POST['item_listsubmit'])) 
	{
	    if (isset($_FILES["itemlist"]) && $_FILES["itemlist"]["error"] == 0) {
	        $filename = $_FILES["itemlist"]["name"];
	        $filetype = $_FILES["itemlist"]["type"];
	        $filesize = $_FILES["itemlist"]["size"];
	        $ext = pathinfo($filename, PATHINFO_EXTENSION);
	        $maxsize = 5 * 1024 * 1024;
	        if ($filesize > $maxsize) {
	            I($lang['file-limit']);
	            exit;
	        }
	        $allowedTypes = array("text/plain");
	        if (!in_array($filetype, $allowedTypes)) {
				 E('Error: Accepted only text files.');
	            exit;
	        }
	        $newfilename = 'system/txts/item_list.txt';
	        if (file_exists($newfilename)) {
	            unlink($newfilename);
	        }
	        if (move_uploaded_file($_FILES["itemlist"]["tmp_name"], $newfilename)) {
	            S('<b>item_list</b> updated!');
	        } else {
	             E('Error uploading file.');
	        }
	    }
	}

	if (isset($_POST['item_protosubmit'])) 
	{
	    if (isset($_FILES["itemproto"]) && $_FILES["itemproto"]["error"] == 0) {
	        $filename = $_FILES["itemproto"]["name"];
	        $filetype = $_FILES["itemproto"]["type"];
	        $filesize = $_FILES["itemproto"]["size"];
	        $ext = pathinfo($filename, PATHINFO_EXTENSION);
	        $maxsize = 5 * 1024 * 1024;
	        if ($filesize > $maxsize) {
	            I($lang['file-limit']);
	            exit;
	        }
	        $allowedTypes = array("text/plain");
	        if (!in_array($filetype, $allowedTypes)) {
	            E('Error: Accepted only text files.');
	            exit;
	        }
	        $newfilename = 'system/txts/item_proto.txt';
	        if (file_exists($newfilename)) {
	            unlink($newfilename);
	        }
	        if (move_uploaded_file($_FILES["itemproto"]["tmp_name"], $newfilename)) {
				S('<b>item_proto</b> updated!');
	        } else {
	           E('Error uploading file.');
	        }
	    }
	}
	
	if (isset($_POST['item_namesubmit'])) 
	{
	    if (isset($_FILES["item_names"]) && $_FILES["item_names"]["error"] == 0) {
	        $filename = $_FILES["item_names"]["name"];
	        $filetype = $_FILES["item_names"]["type"];
	        $filesize = $_FILES["item_names"]["size"];
	        $ext = pathinfo($filename, PATHINFO_EXTENSION);
	        $maxsize = 5 * 1024 * 1024;
	        if ($filesize > $maxsize) {
	            I($lang['file-limit']);
	            exit;
	        }
	        $allowedTypes = array("text/plain");
	        if (!in_array($filetype, $allowedTypes)) {
	            E('Error: Accepted only text files.');
	            exit;
	        }
	        $newfilename = 'system/txts/item_names_'.$_POST['lang'].'.txt';
	        if (file_exists($newfilename)) {
	            unlink($newfilename);
	        }
	        if (move_uploaded_file($_FILES["item_names"]["tmp_name"], $newfilename)) {
				S('<b>item_name</b> for <b>'.$_POST['lang'].'</b> language updated!');
	        } else {
	             E('Error uploading file.');
	        }
	    }
	}
	
	if (isset($_POST['itemdescsubmit'])) 
	{
	    if (isset($_FILES["itemdesc"]) && $_FILES["itemdesc"]["error"] == 0) {
	        $filename = $_FILES["itemdesc"]["name"];
	        $filetype = $_FILES["itemdesc"]["type"];
	        $filesize = $_FILES["itemdesc"]["size"];
	        $ext = pathinfo($filename, PATHINFO_EXTENSION);
	        $maxsize = 5 * 1024 * 1024;
	        if ($filesize > $maxsize) {
	            I($lang['file-limit']);
	            exit;
	        }
	        $allowedTypes = array("text/plain");
	        if (!in_array($filetype, $allowedTypes)) {
	            E('Error: Accepted only text files.');
	            exit;
	        }
	        $newfilename = 'system/txts/itemdesc_'.$_POST['lang_itemdesc'].'.txt';
	        if (file_exists($newfilename)) {
	            unlink($newfilename);
	        }
	        if (move_uploaded_file($_FILES["itemdesc"]["tmp_name"], $newfilename)) {
				S('<b>itemdesc</b> for <b>'.$_POST['lang_itemdesc'].'</b> language updated!');
	        } else {
	            E('Error uploading file.');
	        }
	    }
	}
	?>
	
	<script>
		 var fileInputs = document.querySelectorAll('.custom-file-input');
  fileInputs.forEach(function(input) {
    input.addEventListener('change', function(e) {
      var fileName = e.target.value.split('\\').pop();
      var nextSibling = e.target.nextElementSibling;
      nextSibling.innerText = fileName;
    });
  });
	</script>