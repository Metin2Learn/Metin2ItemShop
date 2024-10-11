<?php
	if(isset($_POST['username'], $_POST['password'], $_POST['logintabble']))
	{
		print doLogin($_POST['username'], $_POST['password']);
	}
?>
<div style="margin-top:12px;">
	<form method="POST">
		<input type="text" class="tinput" name="username" placeholder="<?=l(7); ?>" style="height:25px;width:200px">&nbsp;&nbsp;
		<input type="password" class="tinput" name="password" placeholder="<?=l(8); ?>" style="height:25px;width:200px">&nbsp;&nbsp;
		<button type="submit" name="logintabble" class="btn btn-success btn-sm" style="height:25px;padding:1px;"><i class="fa fa-sign-in"></i> <?=l(9); ?></button>&nbsp;&nbsp;
	</form>
</div>