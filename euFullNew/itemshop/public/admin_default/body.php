<body class="sidebar-mini layout-fixed" style="height: auto;">
	<div class="wrapper">
		<div class="preloader flex-column justify-content-center align-items-center" style="height: 0px;">
			<img class="animation__shake" src="<?php print Theme::AdminStylePath(); ?>dist/img/AdminLTELogo.png" alt="AdminLTELogo" height="60" width="60" style="display: none;" />
		</div>
		<nav class="main-header navbar navbar-expand navbar-white navbar-light">
			<ul class="navbar-nav">
				<li class="nav-item">
					<a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
				</li>
				
			
				
				<li class="nav-item d-none d-sm-inline-block">
					<a href="<?php print Basic::AURL(); ?>templates" class="nav-link">
						<button class="btn btn-dark btn-sm"><i class="fas fa-palette"></i> Templates</button>
					</a>
				</li>
				<li class="nav-item d-none d-sm-inline-block">
					<a href="<?php print Basic::AURL(); ?>source" class="nav-link">
						<button class="btn btn-dark btn-sm"><i class="fas fa-code"></i> Source Script</button>
					</a>
				</li>
				
			</ul>
		</nav>
		<aside class="main-sidebar sidebar-dark-primary elevation-4">
			<a href="index3.html" class="brand-link">
				<img src="<?php print Theme::AdminStylePath(); ?>dist/img/AdminLTELogo.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3" style="opacity: 0.8;" />
				<span class="brand-text font-weight-light">Mt2Services - Panel</span>
			</a>
			<div class="sidebar os-host os-theme-light os-host-overflow os-host-overflow-y os-host-resize-disabled os-host-scrollbar-horizontal-hidden os-host-transition os-host-foreign">
				<div class="os-resize-observer-host observed">
					<div class="os-resize-observer" style="left: 0px; right: auto;"></div>
					<div class="os-resize-observer"></div>
				</div>
				<div class="os-size-auto-observer observed" style="height: calc(100% + 1px); float: left;">
					<div class="os-resize-observer"></div>
				</div>
				<div class="os-content-glue" style="margin: 0px -8px; width: 249px; height: 903px;"></div>
				<div class="os-size-auto-observer observed" style="height: calc(100% + 1px); float: left;">
					<div class="os-resize-observer"></div>
				</div>
				<div class="os-content-glue" style="margin: 0px -8px; width: 249px; height: 807px;"></div>
				<div class="os-padding">
					<div class="os-viewport os-viewport-native-scrollbars-invisible" style="overflow-y: scroll;">
						<div class="os-content" style="padding: 0px 8px; height: 100%; width: 100%;">
							<nav class="mt-2">
								<ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
									<li class="nav-header">Home Pages</li>
									<li class="nav-item">
										<a href="<?php print Basic::URL(); ?>admin" class="nav-link <?=Theme::APA('home'); ?>">
											<i class="nav-icon fa fa-dashboard"></i>
											<p>Dashboard</p>
										</a>
									</li>
									<li class="nav-item">
										<a target="_blank" href="<?php print Basic::URL(); ?>" class="nav-link">
											<i class="nav-icon fa fa-window-maximize"></i>
											<p>Preview</p>
										</a>
									</li>
									<hr />
									<li class="nav-header">Categories & Items</li>
									<li class="nav-item">
										<a href="<?php print Basic::AURL(); ?>categories" class="nav-link <?=Theme::APA('categories'); ?>">
											<i class="nav-icon fas fa-code-fork"></i>
											<p>Items categories</p>
										</a>
									</li>
									<li class="nav-item">
										<a href="<?php print Basic::AURL(); ?>new-item" class="nav-link <?=Theme::APA('new_item'); ?>">
											<i class="nav-icon fas fa-hammer"></i>
											<p>Create item</p>
										</a>
									</li>
									<li class="nav-item">
										<a href="<?php print Basic::AURL(); ?>shop-items" class="nav-link <?=Theme::APA('shop_items'); ?>">
											<i class="nav-icon fas fa-shopping-cart"></i>
											<p>Shop items</p>
										</a>
									</li>
									<li class="nav-header">Case Opening</li>
									<li class="nav-item">
										<a href="<?php print Basic::AURL(); ?>case-categories" class="nav-link <?=Theme::APA('case_categories'); ?>">
											<i class="nav-icon fas fa-code-fork"></i>
											<p>Case categories</p>
										</a>
									</li>
									<li class="nav-item">
										<a href="<?php print Basic::AURL(); ?>case-items" class="nav-link <?=Theme::APA('case_items'); ?>">
											<i class="nav-icon fas fa-hammer"></i>
											<p>Create chest</p>
										</a>
									</li>
									<li class="nav-item">
										<a href="<?php print Basic::AURL(); ?>case-logs" class="nav-link <?=Theme::APA('case_logs'); ?>">
											<i class="nav-icon fas fa-history"></i>
											<p>Case Logs</p>
										</a>
									</li>
									
									
									<hr>
									<li class="nav-header">Settings</li>
									<li class="nav-item">
										<a href="<?php print Basic::AURL(); ?>settings" class="nav-link <?=Theme::APA('settings'); ?>">
											<i class='nav-icon fa fa-gear'></i>
											<p>General Settings</p>
										</a>
									</li>
									<li class="nav-item">
										<a href="<?php print Basic::AURL(); ?>language" class="nav-link <?=Theme::APA('languages'); ?>">
											<i class='nav-icon fa fa-language'></i>
											<p>Languages Settings</p>
										</a>
									</li>
									<li class="nav-item">
										<a href="<?php print Basic::AURL(); ?>payments-settings" class="nav-link <?=Theme::APA('payments_settings'); ?>">
											<i class='nav-icon fa fa-credit-card'></i>
											<p>Payments Settings</p>
										</a>
									</li>
									<li class="nav-item">
										<a href="<?php print Basic::AURL(); ?>proto-uploader" class="nav-link <?=Theme::APA('proto_uploader'); ?>">
											<i class='nav-icon fa fa-upload'></i>
											<p>Proto uploader</p>
										</a>
									</li>
									<li class="nav-item">
										<a href="<?php print Basic::AURL(); ?>item-list" class="nav-link <?=Theme::APA('item_list'); ?>">
											<i class="nav-icon fas fa-list"></i>
											<p>Item list</p>
										</a>
									</li>
									<li class="nav-item">
										<a href="<?php print Basic::AURL(); ?>tga-converter" class="nav-link <?=Theme::APA('tga_converter'); ?>">
											<i class='nav-icon fa fa-image'></i>
											<p>TGA Converter</p>
										</a>
									</li>
									<li class="nav-item">
										<a href="<?php print Basic::AURL(); ?>database" class="nav-link <?=Theme::APA('database'); ?>">
											<i class='nav-icon fa fa-database'></i>
											<p>Database</p>
										</a>
									</li>
									<li class="nav-item">
										<a href="<?php print Basic::AURL(); ?>update" class="nav-link <?=Theme::APA('update'); ?>">
											<i class='nav-icon fa fa-arrow-up'></i>
											<p>Update <?php  if (Update(1) === -1) { ?> <span style="float:right;" class="badge badge-warning">1</span><?php } ?></p>
										</a>
									</li>
								</ul>
							</nav>
						</div>
					</div>
				</div>
				<div class="os-scrollbar os-scrollbar-horizontal os-scrollbar-unusable os-scrollbar-auto-hidden">
					<div class="os-scrollbar-track">
						<div class="os-scrollbar-handle" style="width: 100%; transform: translate(0px, 0px);"></div>
					</div>
				</div>
				<div class="os-scrollbar os-scrollbar-vertical os-scrollbar-auto-hidden">
					<div class="os-scrollbar-track">
						<div class="os-scrollbar-handle" style="height: 86.2327%; transform: translate(0px, 0px);"></div>
					</div>
				</div>
				<div class="os-scrollbar-corner"></div>
			</div>
		</aside>
		<div class="content-wrapper" style="height: auto; min-height: 1166px;">
			<section class="content">
				<div class="container-fluid">
					<div class="container-fluid py-4">
						<?php include 'pages/'.$pagea.'.php';?>
					</div>
				</div>
			</section>
		</div>
		<footer class="main-footer">
			<strong>Copyright © 2023 <a href="https://mt2-services.eu">Mt2Services</a>.</strong>All rights reserved.
			<div class="float-right d-none d-sm-inline-block">Version <b>1.0.0</b></div>
		</footer>
		<aside class="control-sidebar control-sidebar-dark"></aside>
		<div id="sidebar-overlay"></div>
	</div>
	<script src="<?php print Theme::AdminStylePath(); ?>plugins/jquery/jquery.min.js"></script>
	<script src="<?php print Theme::AdminStylePath(); ?>plugins/jquery-ui/jquery-ui.min.js"></script>
	<script src="<?php print Theme::AdminStylePath(); ?>plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
</body>
