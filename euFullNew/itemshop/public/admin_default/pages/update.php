<div class="row mb-4">
  <div class="col-lg-12 col-md-12 mb-md-0 mb-4">
    <div class="card card-secondary">
      <div class="card-header pb-0">
        <h4 class="card-title"><i class="fa fa-info-circle"></i> Version info</h4>
        <br>
        <h6 style="float:right;"></h6>
      </div>
      <div class="card-body">
        <?php
        if (isset($_POST['update'])) 
		{
			$get_downloadversion_response = file_get_contents('https://licensesoftware.mt2-services.eu/v3_update/?serverip=' . urlencode(SERVER_IP));
			$file = 'updater.zip';
			file_put_contents($file, $get_downloadversion_response);
			if(file_exists($file)) 
			{
				require_once('system/sys_unzipper.php');
				
				$archive = new PclZip($file);
				if ($archive->extract('') == 0)
					E($archive->errorInfo(true));
				else 
				{
					if(file_exists($file)) 
					{
						unlink($file);
					}
					
					S("Update succesfully!");
					print '<script>window.location.replace("update");</script>';
				}
			}
        }

        if (Update(1) === -1) {
            print '<div class="alert alert-info">New version is available!</div>';
            ?>
            <form method='POST'>
                <center><button type="submit" name="update" class="btn btn-dark"> Update to <?=Update(0);?></button></center>
            </form>
            <?php
        } elseif (Update(1) === 0) {
            print '<div class="alert alert-success">You have the last version!</div>';
        } elseif (Update(1) === -2) {
            print '<div class="alert alert-danger">Failed to fetch new version info.</div>';
        }

        ?>
      </div>
    </div>
  </div>
</div>
