<?php
	User_Shop::Expire();
	if($page!='admin' && !isset($_GET['module'])) 
	{ 
		?>
		<!DOCTYPE html>
		<html>
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=1018, initial-scale=0.35">
				<title><?=Settings::Get(3); ?> &bull; Item Shop &bull; <?php print $title; ?></title>
				<meta name="description" content="<?=Settings::Get(4); ?>">
				<link rel="canonical" href="<?=Basic::URL();?>">
				<meta name="robots" content="index, follow">
				<meta property="og:title" content="<?=Settings::Get(3); ?> &bull; Item Shop &bull; <?php if(isset($title)) print $title; else print $atitle; ?>">
				<meta property="og:description" content="<?=Settings::Get(4); ?>">
				<meta property="og:image" content="<?=Settings::Get(5); ?>">
				<?php include 'public/'.Theme::Get(1).'/head.php'; ?>
			</head>
			<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11.0.20/dist/sweetalert2.min.css">
			<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11.0.20/dist/sweetalert2.all.min.js"></script>
			<script>
				var Toast = Swal.mixin({
					toast: true,
					position: 'top-end',
					showConfirmButton: false,
					timer: 5000
				});
				function Success(text)
				{
					Toast.fire({
						icon: 'success',
						html: text
					})
				}
				function Error(text)
				{
					Toast.fire({
						icon: 'error',
						html: text
					})
				}
				function Warning(text)
				{
					Toast.fire({
						icon: 'warning',
						html: text
					})
				}
				function goto(func)
				{
					window.location.replace('<?=Basic::URL();?>' + func);
				}
				
				function gotowait(func) {
				  setTimeout(function() {
					window.location.replace('<?=Basic::URL();?>' + func);
				  }, 2000);
				}

			</script>
			<?php 
			include 'public/'.Theme::Get(1).'/body.php'; 
	}
	elseif($page=='admin' && isAdmin())
	{
		include 'public/admin_'.Theme::Get(2).'/head.php';
		include 'public/admin_'.Theme::Get(2).'/body.php';
		if(isset($sys_alert))
			print '<script>console.log("'.$sys_alert.'");</script>';
	}
	elseif(isset($_GET['module']))
	{
		include 'system/module/'.$_GET['module'];
		die();
		exit();
	}
	else
	{
		echo "<h1>404 Not Found</h1>";echo "<p>The requested address <strong>{$_SERVER['REQUEST_URI']}</strong> was not found.</p>";exit();
	}
?>