<?php
	if(isset($_POST['public'], $_POST['secret'], $_POST['uid']))
	{
		Payments::Settings_Update($_POST['public'], $_POST['secret'], $_POST['uid']);
	}
?>

<div class="row mb-4">
	<div class="col-lg-6 col-md-6 mb-md-0 mb-4">
		<div class="card card-secondary">
			<div class="card-header pb-0">
				<h4 class="card-title"><i class="fa fa-credit-card"></i> Payments Settings</h4>
				<br>
				<h6 style="float:right;"></h6>
			</div>
			<div class="card-body">
				<form method="POST">
					<div class="form-group">
						<label class="control-label" for="public">Public Key</label>
						<input class="form-control" id="public" name="public" type="text" placeholder="public_xxxxxxxxx" value="<?= Payments::Settings_Get('public'); ?>" required="">
					</div>
					
					<div class="form-group">
						<label class="control-label" for="secret">Secret Key</label>
						<input class="form-control" id="secret" name="secret" type="password" placeholder="secret_xxxxxxxxx" value="<?= Payments::Settings_Get('secret'); ?>" required="">
					</div>
					
					<div class="form-group">
						<label class="control-label" for="uid">User ID</label>
						<input class="form-control" id="uid" name="uid" type="number" required="" value="<?= Payments::Settings_Get('uid'); ?>" placeholder="XXXX">
					</div>
					<button type="submit" class="btn btn-dark" style="float:right;"><i class="fa fa-save"></i> Save</button>
				</form>
			</div>
		</div>
	</div>
	
	<div class="col-lg-6 col-md-6 mb-md-0 mb-4">
		<div class="card card-secondary">
			<div class="card-header pb-0">
				<h4 class="card-title"><i class="fa fa-info-circle"></i> Gateway Information</h4>
				<br>
				<h6 style="float:right;"></h6>
			</div>
			<div class="card-body">
				<label class="control-label" for="cburl">Callback URL</label>
				<input type="text" class="form-control" value="<?= Basic::URL();?>payments-callback/" id="cburl" disabled>
			<br>
				<label class="control-label" for="cburl">Server IP</label>
				<input type="text" class="form-control" value="<?= gethostbyname(gethostname()); ?>" id="cburl" disabled>
			<br>
				<div class="alert alert-info"><h4>🤑 Mt2Services Gateway</h4>
    <p>
        🌐 The Mt2Services Gateway offers a comprehensive solution for seamlessly integrating payment functionality into your website.<br>
        🌐 With this user-friendly interface, we aim to simplify the process of accepting payments and provide a convenient and secure payment experience for your customers.
    </p>
    <p>
        💻 Our gateway eliminates the need for complex on-site payment systems by enabling you to manage transactions remotely.
        <br>🔒 This means that all payment-related tasks, including processing and verification, are handled through our platform, allowing you to focus on other aspects of your business.
    </p>
    <p>
       🌟 By leveraging the Mt2Services Gateway, you gain access to a range of powerful features and benefits.
        <br>🔒 Our robust infrastructure ensures reliable and secure payment processing, safeguarding sensitive customer data and protecting against fraud.
    </p>
    <p>
       💪 The integration process is designed to be hassle-free and user-friendly.
        <br>💳 Accept various payment methods, including credit cards, digital wallets, and more, to accommodate a wide range of customer preferences.
    </p>
	
	<center><a target="_blank" href="https://payments.mt2-services.eu/"><button class="btn btn-dark">Register now and get creditentials</button></a></center>
    </div>
			</div>
		</div>
	</div>
	
</div>