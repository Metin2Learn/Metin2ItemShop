				<div class="card">
                    <div class="card__header">
                        <h2><?php print $lang_shop['administration-payments']; ?></h2>
                    </div>
                    <div class="card__body">
						<div class="tab">
                            <ul class="tab-nav tab-nav--justified">
								<?php
									foreach($payment_names as $key => $item)
										print '<li class=""><a href="#tab-'.$key.'" data-toggle="tab" aria-expanded="false">'.$item[1].'</a></li>';
								?>
                            </ul>
                            <div class="tab-content">
								<?php foreach($payment_names as $key => $item) { ?>
                                <div class="tab-pane<?php if($key==0) print ' active'; ?>" id="tab-<?php print $key; ?>">
									<div class="table-responsive">
										<table class="table table-hover">
											<thead>
												<tr>
													<th>ID</th>
													<th><?php print $lang_shop['price_object']; ?></th>
													<th><?php print $lang_shop['coins']; ?></th>
													<th><?php print $lang_shop['edit']; ?></th>
												</tr>
											</thead>
											<tbody>
												<form action="" method="POST">
													<input type="hidden" name="id" value="<?php print $key; ?>">
													<tr>
														<td></td>
														<td>
															<div class="input-group">
																<div class="form-group">
																	<input type="number" name="amount" class="form-control" value="5" min="1">
																</div>
																<span class="input-group-addon">&euro;</span>
															</div>
														</td>
														<td>
															<div class="input-group">
																<div class="form-group">
																	<input type="number" name="value" class="form-control" value="25" min="1">
																</div>
																<span class="input-group-addon"><?php print $lang_shop['coins']; ?></span>
															</div>
														</td>
														<td>
															<button name="add" type="submit" class="btn btn-success"><?php print $lang_shop['add']; ?></button> 
														</td>
													</tr>
												</form>
												<?php
													$prices = $shop->getDonatePrices($key);
													foreach($prices as $item) {
												?>
												<form action="" method="POST">
													<input type="hidden" name="id" value="<?php print $item['id']; ?>">
													<tr>
														<td>#<?php print $item['id']; ?></td>
														<td>
															<div class="input-group">
																<div class="form-group">
																	<input type="number" name="amount" class="form-control" value="<?php print $item['amount']; ?>" min="1">
																</div>
																<span class="input-group-addon">&euro;</span>
															</div>
														</td>
														<td>
															<div class="input-group">
																<div class="form-group">
																	<input type="number" name="value" class="form-control" value="<?php print $item['value']; ?>" min="1">
																</div>
																<span class="input-group-addon"><?php print $lang_shop['coins']; ?></span>
															</div>
														</td>
														<td>
															<button name="save" type="submit" class="btn btn-primary"><?php print $lang_shop['save']; ?></button> 
															<button name="delete" type="submit" onclick="return confirm('<?php print $lang_shop['check-delete']; ?>')" class="btn btn-danger"><?php print $lang_shop['delete']; ?></button>
														</td>
													</tr>
												</form>
												<?php } ?>
											</tbody>
										</table>
									</div>
                                </div>
								<?php } ?>
                            </div>
                        </div>
					</div>
                </div>