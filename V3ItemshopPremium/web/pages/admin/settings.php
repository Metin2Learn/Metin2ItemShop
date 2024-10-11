				<div class="card">
                    <div class="card__header">
                        <h2><?php print $lang_shop['settings']; ?></h2>
                    </div>
                    <div class="card__body">
						<form action="" method="POST">
							<div class="row">
								<div class="col-sm-4">
									<p><?php print $lang_shop['add_type']; ?></p>
									<div class="form-group">
										<select class="select2" name="add_type" required>
											<option value="item_award"<?php if($add_type=='item_award') print ' selected'; ?>>item_award</option>
											<option value="item"<?php if($add_type=='item') print ' selected'; ?>>item</option>
										</select>
									</div>
								</div>
								<div class="col-sm-4">
									<p><?php print $lang_shop['pagination']; ?></p>
									<div class="form-group">
										<input type="number" name="pagination" class="form-control" value="<?php print $pagination; ?>" min="1" required>
									</div>
								</div>
								<div class="col-sm-4">
									<p>PayPal Email</p>
									<div class="form-group">
										<input type="email" name="paypal" class="form-control" value="<?php print $paypal_email; ?>" required>
									</div>
								</div>
								<div class="col-sm-4">
									<p>Wolfman?</p>
									<div class="form-group">
										<select class="select2" name="wolfman_character" required>
											<option value="1"<?php if($wolfman_character) print ' selected'; ?>><?php print $lang_shop['yes']; ?></option>
											<option value="0"<?php if(!$wolfman_character) print ' selected'; ?>><?php print $lang_shop['no']; ?></option>
										</select>
									</div>
								</div>
								<div class="col-sm-4">
									<p><?php print $lang_shop['jcoins_back'].' ['.$lang_shop['jcoins'].']'; ?></p>
									<div class="input-group">
										<div class="form-group">
											<input type="number" name="jcoins_back" class="form-control" value="<?php print $jcoins_back; ?>" min="0" required>
										</div>
										<span class="input-group-addon">%</span>
									</div>
								</div>
								<div class="col-sm-4">
									<p>e-Payouts IP</p>
									<div class="form-group">
										<input type="text" name="epayouts_ip" class="form-control" value="<?php print $epayouts_ip; ?>" required>
									</div>
								</div>
								<div class="col-sm-4">
									<p>e-Payouts UID</p>
									<div class="form-group">
										<input type="number" name="epayouts_uid" class="form-control" value="<?php print $epayouts_uid; ?>" required>
									</div>
								</div>
								<div class="col-sm-4">
									<p>e-Payouts MID</p>
									<div class="form-group">
										<input type="number" name="epayouts_mid" class="form-control" value="<?php print $epayouts_mid; ?>" required>
									</div>
								</div>
							</div>
							<button name="save" type="submit" class="btn btn-info"><?php print $lang_shop['save']; ?></button>
						</form>
                    </div>
				</div>
				<div class="card">
                    <div class="card__header">
                        <h2>Happy Hour</h2>
                    </div>
                    <div class="card__body">
						<form action="" method="POST">
							<div class="row">
								<div class="col-sm-2">
									<label for="discount"><?php print $lang_shop['discount']; ?> (XXX%)</label>
									<div class="input-group">
										<div class="form-group">
											<input type="number" name="discount" class="form-control" value="<?php print $happy_hour_discount; ?>" min="0" required>
										</div>
										<span class="input-group-addon">%</span>
									</div>
								</div>
								<div class="col-sm-2">
									<label for="months"><?php print ucfirst($lang_shop['months']); ?> (30 <?php print $lang_shop['days']; ?>)</label>
									<input class="form-control" type="number" value="0" id="discount_months" name="discount_months" min="0" required>
								</div>
								<div class="col-sm-2">
									<label for="days"><?php print ucfirst($lang_shop['days']); ?></label>
									<input class="form-control" type="number" value="0" id="discount_days" name="discount_days" min="0" required>
								</div>
								<div class="col-sm-3">
									<label for="hours"><?php print ucfirst($lang_shop['hours']); ?></label>
									<input class="form-control" type="number" value="0" id="discount_hours" name="discount_hours" min="0" required>
								</div>
								<div class="col-sm-3">
									<label for="reason"><?php print ucfirst($lang_shop['minutes']); ?></label>
									<input class="form-control" type="number" value="0" id="discount_minutes" value="<?php print $item['time']; ?>" name="discount_minutes" min="0" required>
								</div>
							</div><br>
							<button name="update_discount" type="submit" class="btn btn-success"><?php print $lang_shop['save']; ?></button>
							<?php if($happy_hour_discount>0) { ?>
							<button name="stop_discount" type="submit" class="btn btn-danger"><?php print $lang_shop['stop']; ?></button>
							<?php } ?>
						</form>
                    </div>
				</div>
				<div class="card">
                    <div class="card__header">
                        <h2><?php print $lang_shop['edit-images']; ?></h2>
                    </div>
                    <div class="card__body">
						<div class="row">
							<div class="col-sm-6 col-md-5">
								<?php
									$slides = $shop->getFirstSlide();
									foreach($slides as $slide) {
								?>
								<div class="thumbnail" style="background-color: #1e2a31;">
									<img src="<?php if(substr($slide['img'], 0, 4) != "http") print $shop_url; print $slide['img']; ?>" alt="">
									<div class="caption">
										<form action="" method="post">
											<input name="id" type="hidden" value="<?php print $slide['id']; ?>">
											<p><?php print $lang_shop['img']; ?> (link):</p>
											<div class="form-group">
												<input type="text" name="img" class="form-control" value="<?php print $slide['img']; ?>" placeholder="<?php print $lang_shop['img']; ?>">
											</div>
											<p>Link:</p>
											<div class="form-group">
												<input type="text" name="link" class="form-control" value="<?php print $slide['link']; ?>" placeholder="Link">
											</div>
											<p><?php print $lang_shop['title']; ?>:</p>
											<div class="form-group">
												<input type="text" name="title" class="form-control" value="<?php print $slide['title']; ?>" placeholder="<?php print $lang_shop['title']; ?>">
											</div>
											<p><?php print $lang_shop['description']; ?>:</p>
											<div class="form-group">
												<textarea name="text" class="form-control" rows="3" placeholder="<?php print $lang_shop['description']; ?>"><?php print $slide['text']; ?></textarea>
											</div>

											<button name="edit" type="submit" class="btn btn-info"><?php print $lang_shop['save']; ?></button>
											<?php if(count($slides)>1) { ?>
											<span class="pull-right">
												<button name="delete" type="submit" onclick="return confirm('<?php print $lang_shop['check-delete']; ?>')" class="btn btn-danger"><?php print $lang_shop['delete']; ?></button>
											</span>
											<?php } ?>
										</form>
									</div>
								</div>
								<?php } ?>
							</div>
							<div class="col-sm-6 col-md-4">
								<div class="thumbnail" style="background-color: #1e2a31;">
									<div class="caption">
										<form action="" method="post">
											<p><?php print $lang_shop['img']; ?> (link):</p>
											<div class="form-group">
												<input type="text" name="img" class="form-control" value="" placeholder="<?php print $lang_shop['img']; ?>">
											</div>
											<p>Link:</p>
											<div class="form-group">
												<input type="text" name="link" class="form-control" value="" placeholder="Link">
											</div>
											<p><?php print $lang_shop['title']; ?>:</p>
											<div class="form-group">
												<input type="text" name="title" class="form-control" value="" placeholder="<?php print $lang_shop['title']; ?>">
											</div>
											<p><?php print $lang_shop['description']; ?>:</p>
											<div class="form-group">
												<textarea name="text" class="form-control" rows="3" placeholder="<?php print $lang_shop['description']; ?>"></textarea>
											</div>
											
											<button name="add" type="submit" class="btn btn-success"><?php print $lang_shop['add']; ?></button>
										</form>
									</div>
								</div>
							</div>
							<div class="col-sm-6 col-md-3">
								<?php $secondSlide = $shop->getSecondSlide(); ?>
								<div class="thumbnail" style="background-color: #1e2a31;">
									<img src="<?php if(substr($secondSlide['img'], 0, 4) != "http") print $shop_url; print $secondSlide['img']; ?>" alt="">
									<div class="caption">
										<form action="" method="post">
											<input name="id" type="hidden" value="<?php print $secondSlide['id']; ?>">
											<p><?php print $lang_shop['img']; ?> (link):</p>
											<div class="form-group">
												<input type="text" name="img" class="form-control" value="<?php print $secondSlide['img']; ?>" placeholder="<?php print $lang_shop['img']; ?>">
											</div>
											<p>Link:</p>
											<div class="form-group">
												<input type="text" name="link" class="form-control" value="<?php print $secondSlide['link']; ?>" placeholder="Link">
											</div>
											<p><?php print $lang_shop['title']; ?>:</p>
											<div class="form-group">
												<input type="text" name="title" class="form-control" value="<?php print $secondSlide['title']; ?>" placeholder="<?php print $lang_shop['title']; ?>">
											</div>
											<p><?php print $lang_shop['description']; ?>:</p>
											<div class="form-group">
												<textarea name="text" class="form-control" rows="3" placeholder="<?php print $lang_shop['description']; ?>"><?php print $secondSlide['text']; ?></textarea>
											</div>

											<button name="edit" type="submit" class="btn btn-info"><?php print $lang_shop['save']; ?></button>
											<?php if(count($slides)>1) { ?>
											<span class="pull-right">
												<button name="delete" type="submit" onclick="return confirm('<?php print $lang_shop['check-delete']; ?>')" class="btn btn-danger"><?php print $lang_shop['delete']; ?></button>
											</span>
											<?php } ?>
										</form>
									</div>
								</div>
							</div>
						</div>
                    </div>
				</div>