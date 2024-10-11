<?php
	if(isset($_GET['edit']))
		$language_code_received = $_GET['edit'];
	else
		$language_code_received = 'en';
	
	if(isset($_GET['search']))
		$search_value = $_GET['search'];
	else
		$search_value = null;
	
	if(isset($_POST['addlangvar']))
	{
		Lang::AddVar();
	}
?>

<div class="container-fluid py-4">
	<div class="row mb-4">
		<div class="col-lg-12 col-md-12 mb-md-0 mb-4">
			<div class="card card-secondary">
				<div class="card-header pb-0">
					<h4 class="card-title">Translate manager</h4>
					
					<h6 style="float:right;">
						<form class="form-inline" method="POST">
						
						
							<button type="submit" class="btn btn-dark btn-sm" name="addlangvar">Add variable</button>&nbsp;&nbsp;&nbsp;
							<input type="text" placeholder="Search..." style="width:300px;" id="searchkey" onkeyup="loadtable()" class="form-control form-control-sm">&nbsp;&nbsp;&nbsp;
							<?php if(count($json_languages['languages'])>1) { ?>
								<select class="form-control form-control-sm" style="width:200px;" onchange="if (this.value) window.location.href=this.value">
								<?php
									foreach($json_languages['languages'] as $key => $value)
									{
											print '<option value="'.Basic::URL().'admin/language/'. $key.'/"';
											if($key==$language_code_received)
												print ' selected';
											print '>'.$value.'</option>';
									}
								?>
								</select>
						</form>
						<?php } ?>
					</h6>
				</div>
				<div class="card-body">
				<div id="callback_response" style="display:none;"></div>
					<div id="callback_responsetable"></div>
				</div>
			</div>
		</div>
	</div>
</div>
<script src="<?=Theme::StylePath(); ?>js/jquery.js"></script>
<script>
loadtable();
function loadtable() {
	var default_value = 'defaultvalue';
	default_value = document.getElementById("searchkey").value;
		$("#callback_responsetable").load("<?= Basic::URL(); ?>?module=language_editor&langcode=<?=$language_code_received;?>&search=" + default_value);
}
function OnFocus(varvd) {
	document.getElementById(varvd).classList.remove("is-valid")
}
function UploadLang(newcontent, key, lang) {
	document.getElementById(newcontent).classList.add("is-valid");
	var newcontent = document.getElementById(newcontent).value;
	var delnbsp = newcontent.replace(/&.*;/g,' ');
	$("#callback_response").load("<?= Basic::URL(); ?>?module=language_update&rkey=" + key + "&language=" + encodeURI(lang) + "&newv=" + encodeURI(delnbsp)), Success(delnbsp)
}
</script>