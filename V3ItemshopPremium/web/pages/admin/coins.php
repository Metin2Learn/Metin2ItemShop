				<div class="card">
                    <div class="card__header">
                        <h2><?php print $lang_shop['add-coins']; ?></h2>
                    </div>
					<form action="" method="POST" class="card__body form-horizontal">
						<?php 
						if(isset($_SESSION['added_coins'])) {
							if($_SESSION['added_coins']) {
						?>
							<div class="alert alert-success alert-dismissible">
								<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span></button>
								<?php print $lang_shop['coins-added']; ?>
							</div>
						<?php } else { ?>
							<div class="alert alert-danger alert-dismissible">
								<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span></button>
								<?php print $lang_shop['account-not-exist']; ?>
							</div>
						<?php
							}
							unset($_SESSION['added_coins']);
						} ?>
						<div class="form-group row">
							<div class="col-sm-3">
								<select class="select2" name="account">
									<option value="1"><?php print $lang_shop['account']; ?></option>
									<option value="2"><?php print $lang_shop['char']; ?></option>
								</select>
							</div>
							<div class="col-sm-9">
								<input class="form-control" name="name" placeholder="<?php print $lang_shop['name']; ?>" type="text">
							</div>
						</div>
						<div class="form-group row">
							<div class="col-sm-6">
								<select class="select2" name="type">
									<option value="1">[coins] <?php print $lang_shop['coins']; ?></option>
									<option value="2">[jcoins] <?php print $lang_shop['jcoins']; ?></option>
								</select>
							</div>
							<div class="col-sm-6">
								<input class="form-control" name="coins" value="0" type="number" required>
							</div>
						</div>
						<div class="form-group">
							<button type="submit" name="submit" class="btn btn-primary"><?php print $lang_shop['add-coins']; ?></button>
						</div>
					</form>
				</div>
				<div class="card">
                    <div class="card__header">
                        <h2><?php print $lang_shop['create-code']; ?></h2>
                    </div>
					<div class="card__body form-horizontal">
						<?php 
							if(isset($_SESSION['redeem']))
							{
						?>
						<div class="alert alert--dark alert-dismissible fade in" role="alert">
							<button type="button" class="close" data-dismiss="alert" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
							<span><?php print $lang_shop['code-created']; ?></span>
							<hr>
							<form>
								<div class="input-group">
									<input type="text" class="form-control" value="<?php print $_SESSION['redeem']; ?>" id="share" readonly="readonly">
									<span class="input-group-btn">
										<button class="btn btn-default" type="button" id="copyButton" data-placement="button">
											<i class="fa fa-clipboard" aria-hidden="true"></i>
										</button>
									</span>
								</div>
							</form>
						</div>
						<?php } ?>
						<form action="" method="POST">
							<div class="form-group row">
								<div class="col-sm-6">
									<select class="select2" name="type">
										<option value="1">[coins] <?php print $lang_shop['coins']; ?></option>
										<option value="2">[jcoins] <?php print $lang_shop['jcoins']; ?></option>
									</select>
								</div>
								<div class="col-sm-6">
									<input class="form-control" name="coins" value="0" type="number" required>
								</div>
							</div>
							<div class="form-group">
								<button type="submit" name="submit" class="btn btn-primary"><?php print $lang_shop['create-code']; ?></button>
							</div>
						</form>
					</div>
				</div>
			
				<div class="card">
                    <div class="card__header">
                        <h2><?php print $lang_shop['history']; ?></h2>
                    </div>

                    <div class="card__body">
                        <div class="table-responsive">
                            <table class="table table-hover">
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>[ADMIN] <?php print $lang_shop['account']; ?></th>
                                    <th><?php print $lang_shop['account']; ?></th>
                                    <th><?php print $lang_shop['add-coins']; ?></th>
                                    <th><?php print $lang_shop['date']; ?></th>
                                </tr>
                                </thead>
                                <tbody>
									<?php
										$i = ($page_number-1)*$pagination;
										$accounts = array_merge(array_column($transactions, 'admin'), array_column($transactions, 'to_account'));
										$names = $account->getMultipleAccounts($accounts);
										
										foreach($transactions as $item) {
											$i++;
									?>
									<tr>
										<td><?php print $i; ?></td>
										<td><?php print $names[$item['admin']]; ?></td>
										<td><?php print $names[$item['to_account']]; ?></td>
										<td><?php print $item['value'].' ';
												if($item['type']==1)
													print $lang_shop['coins'];
												else print $lang_shop['jcoins']; 
										?>
										</td>
										<td><?php print date("d-m-Y H:i", strtotime($item['date'])); ?></td>
									</tr>
									<?php } ?>
                                </tbody>
                            </table>
                        </div>
						<?php
							if($show_pagination)
							{
								print '<div class="text-center p-30">';
								print $shop->createLinksPagination($shop_url.'admin/coins/', $page_number, $transactions_count, 'pagination');
								print '</div>';
							}
						?>
                    </div>
				</div>