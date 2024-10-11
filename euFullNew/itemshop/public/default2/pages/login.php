<?php
	if(isset($_POST['username'], $_POST['password'], $_POST['logintabble']))
	{
		print doLogin($_POST['username'], $_POST['password']);
	}
?>
<div class="login">
	<form method="POST">
		<input type="text" class="searchbar" name="username" placeholder="<?=l(7); ?>">
		<input type="password" class="searchbar" name="password" placeholder="<?=l(8); ?>">
		<button type="submit" name="logintabble" style="color: #f2e69f;text-align: center;height: 26px;background-color: transparent;font-weight: 500;font-size: 12px;cursor: pointer;text-transform: uppercase;border-radius: 3px;border: 1px solid #f2e69f;"><i class="fa fa-sign-in"></i> <?=l(9); ?></button>
	</form>
</div>