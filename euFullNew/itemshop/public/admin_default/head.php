<?php include 'system/database/sys_version.php'; ?>
<!DOCTYPE html>
		<html>
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1">
				<title><?=Settings::Get(3); ?> &bull; Item Shop &bull; <?php print $atitle; ?></title>
				<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
				<!-- Ionicons -->
				<link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
				<!-- Tempusdominus Bootstrap 4 -->
				<link rel="stylesheet" href="<?php print Theme::AdminStylePath(); ?>plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css">
				<!-- iCheck -->
				<link rel="stylesheet" href="<?php print Theme::AdminStylePath(); ?>plugins/icheck-bootstrap/icheck-bootstrap.min.css">
				<!-- Theme style -->
				<link rel="stylesheet" href="<?php print Theme::AdminStylePath(); ?>dist/css/adminlte.min.css">
				<!-- overlayScrollbars -->
				<link rel="stylesheet" href="<?php print Theme::AdminStylePath(); ?>plugins/overlayScrollbars/css/OverlayScrollbars.min.css">
				<!-- Daterange picker -->
				<link rel="stylesheet" href="<?php print Theme::AdminStylePath(); ?>plugins/daterangepicker/daterangepicker.css">
				<!-- summernote -->
				<link rel="stylesheet" href="<?php print Theme::AdminStylePath(); ?>plugins/summernote/summernote-bs4.min.css">
				<link rel="stylesheet" href="<?php print Theme::AdminStylePath(); ?>fontawesome/css/all.min.css">
				<link rel="stylesheet" href="<?php print Theme::AdminStylePath(); ?>toastr/toastr.min.css">
				<link rel="stylesheet" href="<?php print Theme::AdminStylePath(); ?>toastr/css.css">
				<script src="<?php print Theme::AdminStylePath(); ?>toastr/toastr.min.js"></script>
				<script src="<?php print Theme::AdminStylePath(); ?>sweetalert"></script>
				<link href='https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css' rel='stylesheet'>
			</head>
			
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