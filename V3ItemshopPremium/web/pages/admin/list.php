				<div class="card">
                    <div class="card__header">
                        <h2><?php print $lang_shop['payments-list']; ?></h2>
                    </div>
                    <div class="card__body">
						<form action="" method="POST">
							<div class="row">
								<div class="col-sm-4">
									<div class="input-group">
										<span class="input-group-addon"><i class="zmdi zmdi-search"></i></span>
										<div class="form-group form-group--float">
											<input type="text" name="search" class="form-control input-lg">
											<label><?php print $lang_shop['account'].' / '.$lang_shop['code'].' / Email'; ?></label>
											<i class="form-group__bar"></i>
										</div>
									</div>
								</div>
								<div class="col-sm-2">
									<button name="submit" type="submit" class="btn btn-primary"><?php print $lang_shop['search']; ?></button> 
								</div>
							</div>
						</form>
						
                        <div class="table-responsive">
                            <table class="table table-hover">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th><?php print $lang_shop['account']; ?></th>
                                    <th><?php print $lang_shop['price_object']; ?></th>
                                    <th><?php print $lang_shop['coins']; ?></th>
                                    <th><?php print $lang_shop['method']; ?></th>
                                    <th>Email</th>
                                    <th><?php print $lang_shop['code']; ?></th>
                                    <th><?php print $lang_shop['date']; ?></th>
                                </tr>
                                </thead>
                                <tbody>
									<?php
										$accounts = array_column($transactions, 'account');
										$names = $account->getMultipleAccounts($accounts);
										
										foreach($transactions as $item) {
									?>
									<tr>
										<td>#<?php print $item['id']; ?></td>
										<td><?php print $names[$item['account']]; ?></td>
										<td><?php print $item['amount']; ?> &euro;</td>
										<td><?php print $item['value'].' '.$lang_shop['coins']; ?></td>
										<td><?php print $payment_names[$item['type']][1]; ?></td>
										<td><?php print $item['email']; ?></td>
										<td><?php print $item['code']; ?></td>
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
								print $shop->createLinksPagination($shop_url.'admin/payments/list/', $page_number, $transactions_count, 'pagination', $search);
								print '</div>';
							}
						?>
                    </div>
				</div>