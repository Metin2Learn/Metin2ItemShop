<?php
	@ob_start();
	require_once("include/functions/header.php");
	require_once("include/functions/admin.php");
?>
<!DOCTYPE html>
<html lang="<?php print $language_code; ?>"<?php if($language_code=="ar") print ' dir="rtl"'; ?>>
<!--[if IE 9 ]><html class="ie9"><![endif]-->
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title><?php print $lang_shop['administration']; ?></title>
	
	<link rel="shortcut icon" href="<?php print $shop_url; ?>images/favicon.ico?v=" />
	
	<link href="<?php print $shop_url; ?>vendors/bower_components/animate.css/animate.min.css" rel="stylesheet">
	<link href="<?php print $shop_url; ?>vendors/bower_components/material-design-iconic-font/dist/css/material-design-iconic-font.min.css" rel="stylesheet">
	<link href="<?php print $shop_url; ?>vendors/bower_components/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.min.css" rel="stylesheet">
	<link href="<?php print $shop_url; ?>vendors/bower_components/fullcalendar/dist/fullcalendar.min.css" rel="stylesheet">
	<link href="<?php print $shop_url; ?>vendors/bower_components/summernote/dist/summernote-bs4.css "rel="stylesheet">
	<link href="<?php print $shop_url; ?>css/fontawesome/css/all.css" rel="stylesheet">
	<link href="<?php print $shop_url; ?>css/fontawesome-iconpicker.min.css" rel="stylesheet">

	<!-- Select 2 -->
	<link href="<?php print $shop_url; ?>vendors/bower_components/select2/dist/css/select2.min.css" rel="stylesheet">
	
	<link href="<?php print $shop_url; ?>css/app-1.min.css" rel="stylesheet">
	<script src="<?php print $shop_url; ?>js/page-loader.min.js"></script>
</head>

    <body<?php if($admin_page!='verify' && $admin_page!='login') print ' class="logged"'; ?>>
        <!-- Page Loader -->
        <div id="page-loader">
            <div class="preloader preloader--xl preloader--light">
                <svg viewBox="25 25 50 50">
                    <circle cx="50" cy="50" r="20" />
                </svg>
            </div>
        </div>
		<?php if($admin_page=='login') { ?>
        <div class="login">
            <div class="login__block toggled" id="l-login">
                <div class="login__block__header">
                    <i class="zmdi zmdi-account-circle"></i>
                    <?php print $lang_shop['login']; ?>
                </div>

                <div class="login__block__body">
					<?php if($error && $error==1) { ?>
					<div class="alert alert-danger alert-dismissible">
						<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">×</span></button>
						<?php print $lang_shop['incorrect-password']; ?>
					</div>
					<?php } else if($error && $error==2) { ?>
					<div class="alert alert-danger alert-dismissible">
						<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">×</span></button>
						<?php print $lang_shop['blocked_account']; ?>
					</div>
					<?php } ?>
					<form action="" method="POST">
						<div class="form-group form-group--float form-group--centered">
							<input type="text" name="login" class="form-control" autocomplete="new-password">
							<label><?php print $lang_shop['name_login']; ?></label>
							<i class="form-group__bar"></i>
						</div>
						
						<div class="form-group form-group--float form-group--centered">
							<input type="password" name="password" class="form-control" autocomplete="new-password">
							<label><?php print $lang_shop['password']; ?></label>
							<i class="form-group__bar"></i>
						</div>

						<button type="submit" class="btn btn--light btn--icon m-t-15"><i class="zmdi zmdi-long-arrow-right"></i></button>
					</form>
                </div>
            </div>
        </div>
		<?php } else if($admin_page=='verify') { ?>
        <div class="login">
            <div class="login__block toggled" id="l-lockscreen">
                <div class="login__block__header">
                    <img src="<?php print $shop_url; ?>images/job/<?php print $adminAvatar[0]; ?>.png" alt="">
                    Hi <?php print $adminAvatar[1]; ?>!
                </div>

                <div class="login__block__body">
					<?php if($error) { ?>
					<div class="alert alert-danger alert-dismissible">
						<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">×</span></button>
						<?php print $lang_shop['incorrect-password']; ?>
					</div>
					<?php } ?>
					<form action="" method="POST">
						<div class="form-group form-group--float form-group--centered">
							<input type="password" name="password" class="form-control" autocomplete="new-password">
							<label><?php print $lang_shop['password']; ?></label>
							<i class="form-group__bar"></i>
						</div>

						<button type="submit" class="btn btn--light btn--icon m-t-15"><i class="zmdi zmdi-long-arrow-right"></i></button>
					</form>
                </div>
            </div>
        </div>
		<?php } else { ?>
        <!-- Header -->
        <header id="header">
            <div class="logo">
                <a href="<?php print $shop_url; ?>admin" class="hidden-xs">
                    Item-Shop
                    <small><?php print $lang_shop['administration']; ?></small>
                </a>
                <i class="logo__trigger zmdi zmdi-menu" data-mae-action="block-open" data-mae-target="#navigation"></i>
            </div>

            <ul class="top-menu">
                <li class="top-menu__trigger hidden-lg hidden-md">
                    <a href="<?php print $shop_url; ?>#"><i class="zmdi zmdi-search"></i></a>
                </li>

                <li class="dropdown hidden-xs">
                    <a data-toggle="dropdown" href="<?php print $shop_url; ?>#"><i class="zmdi zmdi-more-vert"></i></a>
                    <ul class="dropdown-menu dropdown-menu--icon pull-right">
                        <li class="hidden-xs">
                            <a data-mae-action="fullscreen" href="#"><i class="zmdi zmdi-fullscreen"></i> Toggle Fullscreen</a>
                        </li>
                        <li>
                            <a href="<?php print $shop_url; ?>admin/settings"><i class="zmdi zmdi-settings"></i> <?php print $lang_shop['settings']; ?></a>
                        </li>
                    </ul>
                </li>
                <li class="top-menu__profile dropdown">
                    <a data-toggle="dropdown" href="<?php print $shop_url; ?>#">
                        <img src="<?php print $shop_url; ?>images/job/<?php print $_SESSION['admin']; ?>.png" alt="">
                    </a>

                    <ul class="dropdown-menu pull-right dropdown-menu--icon">
                        <li>
                            <a href="<?php print $shop_url; ?>user/deposit/"><i class="zmdi zmdi-account"></i> <?php print $lang_shop['objects-bought']; ?></a>
                        </li>
                        <li>
                            <a href="<?php print $shop_url; ?>admin/logout"><i class="zmdi zmdi-time-restore"></i> <?php print $lang_shop['logout']; ?></a>
                        </li>
                    </ul>
                </li>
            </ul>

            <form class="top-search" action="<?php print $shop_url; ?>admin/items/" method="POST">
                <input type="text" class="top-search__input" placeholder="<?php print $lang_shop['search-by-object']; ?>" name="search">
                <i class="zmdi zmdi-search top-search__reset"></i>
            </form>
        </header>

        <section id="main">
            <aside id="navigation">
                <div class="navigation__header">
                    <i class="zmdi zmdi-long-arrow-left" data-mae-action="block-close"></i>
                </div>

                <div class="navigation__toggles">
                    <a href="<?php print $shop_url; ?>admin/items">
                        <i class="zmdi zmdi-store"></i>
                    </a>
                    <a href="<?php print $shop_url; ?>admin/payments/list">
                        <i class="zmdi zmdi-money"></i>
                    </a>
                    <a href="<?php print $shop_url; ?>admin/settings">
                        <i class="zmdi zmdi-settings"></i>
                    </a>
                </div>

                <div class="navigation__menu c-overflow">
                    <ul>
                        <li class="navigation__active">
                            <a href="<?php print $shop_url; ?>admin"><i class="zmdi zmdi-home"></i> <?php print $lang_shop['home']; ?></a>
                        </li>
						
                        <li><a href="<?php print $shop_url; ?>admin/categories"><i class="zmdi zmdi-view-list"></i> <?php print $lang_shop['administration-categories']; ?></a></li>
	
                        <li class="navigation__sub">
                            <a href="#" data-mae-action="submenu-toggle"><i class="zmdi zmdi-playlist-plus"></i> <?php print $lang_shop['administration-items']; ?></a>

                            <ul>
                                <li><a href="<?php print $shop_url; ?>admin/add/item"><?php print $lang_shop['is_add_items']; ?></a></li>
                                <li><a href="<?php print $shop_url; ?>admin/items"><?php print $lang_shop['managing-objects']; ?></a></li>
                                <li><a href="<?php print $shop_url; ?>admin/history"><?php print $lang_shop['players-history']; ?></a></li>
                            </ul>
                        </li>
                        <li class="navigation__sub">
                            <a href="#" data-mae-action="submenu-toggle"><i class="zmdi zmdi-paypal"></i> <?php print $lang_shop['administration-payments']; ?></a>

                            <ul>
                                <li><a href="<?php print $shop_url; ?>admin/payments/settings"><?php print $lang_shop['settings']; ?></a></li>
                                <li><a href="<?php print $shop_url; ?>admin/payments/list"><?php print $lang_shop['payments-list']; ?></a></li>
                            </ul>
                        </li>
                        <li><a href="<?php print $shop_url; ?>admin/coins"><i class="zmdi zmdi-accounts-add"></i> <?php print $lang_shop['add-coins']; ?></a></li>
						
                        <li class="navigation__sub">
                            <a href="#" data-mae-action="submenu-toggle"><i class="zmdi zmdi-toys"></i> <?php print $lang_shop['wheel-of-destiny']; ?></a>

                            <ul>
                                <li><a href="<?php print $shop_url; ?>admin/wheel/settings"><?php print $lang_shop['settings']; ?></a></li>
                                <li><a href="<?php print $shop_url; ?>admin/wheel/items"><?php print $lang_shop['managing-objects']; ?></a></li>
                            </ul>
                        </li>
						
                        <li><a href="<?php print $shop_url; ?>admin/itemproto"><i class="zmdi zmdi-inbox"></i> Item Proto</a></li>
                        <li><a href="<?php print $shop_url; ?>admin/settings"><i class="zmdi zmdi-settings"></i> <?php print $lang_shop['settings']; ?></a></li>

                    </ul>
                </div>
            </aside>

            <section id="content">
			<?php
				switch ($admin_page) {
					case 'home':
						include 'pages/admin/home.php';
						break;
					case 'itemproto':
						include 'pages/admin/itemproto.php';
						break;
					case 'item':
						include 'pages/admin/item.php';
						break;
					case 'items':
						include 'pages/admin/items.php';
						break;
					case 'categories':
						include 'pages/admin/categories.php';
						break;
					case 'coins':
						include 'pages/admin/coins.php';
						break;
					case 'edit':
						include 'pages/admin/edit.php';
						break;
					case 'payments':
						include 'pages/admin/payments.php';
						break;
					case 'list':
						include 'pages/admin/list.php';
						break;
					case 'settings':
						include 'pages/admin/settings.php';
						break;
					case 'history':
						include 'pages/admin/history.php';
						break;
					case 'w_settings':
						include 'pages/admin/w_settings.php';
						break;
					case 'w_items':
						include 'pages/admin/w_items.php';
						break;
					default:
						include 'pages/admin/home.php';
				}
			?>
            </section>

        </section>
		<?php } ?>

		<footer id="footer">
			Copyright &copy; 2019 <a href="https://metin2cms.cf/">Metin2CMS</a>
		</footer>
        <!-- Older IE Warning -->
        <!--[if lt IE 9]>
            <div class="ie-warning">
                <h1>Warning!!</h1>
                <p>You are using an outdated version of Internet Explorer, please upgrade <br/>to any of the following web browsers to access this website.</p>
                <div class="ie-warning__container">
                    <ul class="ie-warning__download">
                        <li>
                            <a href="http://www.google.com/chrome/">
                                <img src="<?php print $shop_url; ?>images/browsers/chrome.png" alt="">
                                <div>Chrome</div>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.mozilla.org/en-US/firefox/new/">
                                <img src="<?php print $shop_url; ?>images/browsers/firefox.png" alt="">
                                <div>Firefox</div>
                            </a>
                        </li>
                        <li>
                            <a href="http://www.opera.com">
                                <img src="<?php print $shop_url; ?>images/browsers/opera.png" alt="">
                                <div>Opera</div>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.apple.com/safari/">
                                <img src="<?php print $shop_url; ?>images/browsers/safari.png" alt="">
                                <div>Safari</div>
                            </a>
                        </li>
                        <li>
                            <a href="http://windows.microsoft.com/en-us/internet-explorer/download-ie">
                                <img src="<?php print $shop_url; ?>images/browsers/ie.png" alt="">
                                <div>IE (New)</div>
                            </a>
                        </li>
                    </ul>
                </div>
                <p>Sorry for the inconvenience!</p>
            </div>
        <![endif]-->


        <!-- Javascript Libraries -->

        <!-- jQuery -->
        <script src="<?php print $shop_url; ?>vendors/bower_components/jquery/dist/jquery.min.js"></script>

        <!-- Bootstrap -->
        <script src="<?php print $shop_url; ?>vendors/bower_components/bootstrap/dist/js/bootstrap.min.js"></script>

        <!-- Malihu ScrollBar -->
        <script src="<?php print $shop_url; ?>vendors/bower_components/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js"></script>

        <!-- Bootstrap Notify -->
        <script src="<?php print $shop_url; ?>vendors/bower_components/remarkable-bootstrap-notify/dist/bootstrap-notify.min.js"></script>

        <!-- Moment -->
        <script src="<?php print $shop_url; ?>vendors/bower_components/moment/min/moment.min.js"></script>

        <!-- FullCalendar -->
        <script src="<?php print $shop_url; ?>vendors/bower_components/fullcalendar/dist/fullcalendar.min.js"></script>

        <!-- Salvattore -->
        <script src="<?php print $shop_url; ?>vendors/bower_components/salvattore/dist/salvattore.min.js"></script>


        <!-- Sparkline Charts -->
        <script src="<?php print $shop_url; ?>vendors/jquery.sparkline/jquery.sparkline.min.js"></script>

        <!--[if IE 9 ]>
            <script src="<?php print $shop_url; ?>vendors/bower_components/jquery-placeholder/jquery.placeholder.min.js"></script>
        <![endif]-->

        <script src="<?php print $shop_url; ?>js/misc.js"></script>
        <script src="<?php print $shop_url; ?>js/sparkline-charts.js"></script>
        <script src="<?php print $shop_url; ?>js/calendar.js"></script>

        <script src="<?php print $shop_url; ?>js/app.min.js"></script>
		
		<script src="<?php print $shop_url; ?>vendors/fileinput/fileinput.min.js"></script>

        <!-- Select 2 -->
        <script src="<?php print $shop_url; ?>vendors/bower_components/select2/dist/js/select2.full.min.js"></script>
		
        <script src="<?php print $shop_url; ?>js/fontawesome-iconpicker.min.js"></script>
		
		<script type="text/javascript" src="<?php print $shop_url; ?>vendors/bower_components/summernote/dist/summernote-bs4.js"></script>
		
		<?php if(isset($_SESSION['welcome'])) { ?>
		<script>
			$(window).load(function(){
				//Welcome Message (not for login page)
				function notify(message, type){
					$.notify({
						message: message
					},{
						type: type,
						allow_dismiss: false,
						label: 'Cancel',
						className: 'btn-xs btn-default',
						placement: {
							from: 'bottom',
							align: 'left'
						},
						delay: 2500,
						animate: {
								enter: 'animated fadeInUp',
								exit: 'animated fadeOutDown'
						},
						offset: {
							x: 30,
							y: 30
						}
					});
				}

				if (!$('.login, .four-zero')[0]) {
					notify('Welcome back <?php print $_SESSION['welcome']; ?>', '-light');
				}
			});
		</script>
		<?php unset($_SESSION['welcome']); } ?>
		<?php if($admin_page=='categories') { ?>
		<script>
			$('.icp-dd').iconpicker();
			
			$('.icp').on('iconpickerSelected', function (e) {
				$('#icon').val(e.iconpickerValue);
			});
			<?php foreach($categories as $category) { ?>
			$('.icp-<?php print $category['id']; ?>').on('iconpickerSelected', function (e) {
				$('#icon-<?php print $category['id']; ?>').val(e.iconpickerValue);
			});
			<?php } ?>
		</script>
		<?php } else if($admin_page=='items') { ?>
		<script>
			var admin_url = "<?php print $shop_url; ?>";
			var check_delete = "<?php print $lang_shop['check-delete']; ?>";
			var search = "<?php print $lang_shop['search']; ?>";
			var delete_txt = "<?php print $lang_shop['delete']; ?>";
			var edit_txt = "<?php print $lang_shop['edit']; ?>";
			var delete_url = "<?php print $shop_url; ?>admin/items&remove=";
			var edit_url = "<?php print $shop_url; ?>admin/items/edit/";
			var create_code = "<?php print $lang_shop['create-code']; ?>";
		</script>
		<script src="<?php print $shop_url; ?>vendors/bower_components/jquery.bootgrid/dist/jquery.bootgrid.min.js"></script>
		<script src="<?php print $shop_url; ?>js/data-table.js"></script>
		<?php if(isset($_POST['search'])) { ?>
		<script>
		$( document ).ready(function() {
			$("#data-table-command").bootgrid("search", "<?php print $_POST['search']; ?>");
		});
		</script>
		<?php } } else if($admin_page=='payments' || $admin_page=='w_items') { ?>
		<script>
			$( document ).ready(function() {
				var url = document.location.toString();
				if (url.match('#'))
					$('a[href="#' + url.split('#')[1] + '"]').trigger('click');
			});
		</script>
		<?php } else if(($admin_page=='item' && $type) || $admin_page=='edit') { ?>
		<script type="text/javascript">
			$(document).ready(function() {
				$('#summernote').summernote({
					tabsize: 4,
					height: 100,
					placeholder: '<?php print $placeholder; ?>'
				});
			});
		</script>
		<?php } if(isset($_SESSION['redeem'])) { ?>
		<script>
			document.getElementById("copyButton").addEventListener("click", function() {
				copyToClipboard(document.getElementById("share"));
			});

			function copyToClipboard(elem) {
				var targetId = "_hiddenCopyText_";
				var isInput = elem.tagName === "INPUT" || elem.tagName === "TEXTAREA";
				var origSelectionStart, origSelectionEnd;
				if (isInput) {
					target = elem;
					origSelectionStart = elem.selectionStart;
					origSelectionEnd = elem.selectionEnd;
				} else {
					target = document.getElementById(targetId);
					if (!target) {
						var target = document.createElement("textarea");
						target.style.position = "absolute";
						target.style.left = "-9999px";
						target.style.top = "0";
						target.id = targetId;
						document.body.appendChild(target);
					}
					target.textContent = elem.textContent;
				}
				var currentFocus = document.activeElement;
				target.focus();
				target.setSelectionRange(0, target.value.length);
				
				var succeed;
				try {
					  succeed = document.execCommand("copy");
				} catch(e) {
					succeed = false;
				}
				if (currentFocus && typeof currentFocus.focus === "function") {
					currentFocus.focus();
				}
				
				if (isInput) {
					elem.setSelectionRange(origSelectionStart, origSelectionEnd);
				} else {
					target.textContent = "";
				}
				return succeed;
			}
		</script>
		<?php unset($_SESSION['redeem']); } ?>
    </body>
</html>