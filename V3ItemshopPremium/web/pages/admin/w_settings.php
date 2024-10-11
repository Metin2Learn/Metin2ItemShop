				<div class="card">
                    <div class="card__header">
                        <h2><?php print $lang_shop['settings'].' - '.$lang_shop['wheel-of-destiny']; ?></h2>
                    </div>
                    <div class="card__body">
						<form action="" method="POST">
							<div class="row">
								<div class="col-sm-4">
									<p><?php print $lang_shop['activate']; ?>?</p>
									<div class="form-group">
										<select class="select2" name="wheel_status" required>
											<option value="1"<?php if($wheel_status) print ' selected'; ?>><?php print $lang_shop['yes']; ?></option>
											<option value="0"<?php if(!$wheel_status) print ' selected'; ?>><?php print $lang_shop['no']; ?></option>
										</select>
									</div>
								</div>
								<div class="col-sm-4">
									<p><?php print $lang_shop['levels']; ?>?</p>
									<div class="form-group">
										<select class="select2" name="wheel_levels" required>
											<option value="1"<?php if($wheel_levels==1) print ' selected'; ?>>1</option>
											<option value="2"<?php if($wheel_levels==2) print ' selected'; ?>>2</option>
											<option value="3"<?php if($wheel_levels==3) print ' selected'; ?>>3</option>
										</select>
									</div>
								</div>
								<div class="col-sm-4">
									<p><?php print $lang_shop['accessible-in-browser']; ?></p>
									<div class="form-group">
										<select class="select2" name="wheel_web" required>
											<option value="1"<?php if($wheel_web) print ' selected'; ?>><?php print $lang_shop['yes']; ?></option>
											<option value="0"<?php if(!$wheel_web) print ' selected'; ?>><?php print $lang_shop['no']; ?></option>
										</select>
									</div>
								</div>
								<div class="col-sm-4">
									<p><?php print $lang_shop['price'].' - '.$lang_shop['the-level']; ?> 1</p>
									<div class="input-group">
										<div class="form-group">
											<input type="number" name="wheel_lv1" class="form-control" value="<?php print $wheel_prices[0]; ?>">
										</div>
										<span class="input-group-addon"><?php print $lang_shop['coins']; ?></span>
									</div><br>
								</div>
								<div class="col-sm-4">
									<p><?php print $lang_shop['price'].' - '.$lang_shop['the-level']; ?> 2</p>
									<div class="input-group">
										<div class="form-group">
											<input type="number" name="wheel_lv2" class="form-control" value="<?php print $wheel_prices[1]; ?>">
										</div>
										<span class="input-group-addon"><?php print $lang_shop['coins']; ?></span>
									</div><br>
								</div>
								<div class="col-sm-4">
									<p><?php print $lang_shop['price'].' - '.$lang_shop['the-level']; ?> 3</p>
									<div class="input-group">
										<div class="form-group">
											<input type="number" name="wheel_lv3" class="form-control" value="<?php print $wheel_prices[2]; ?>">
										</div>
										<span class="input-group-addon"><?php print $lang_shop['coins']; ?></span>
									</div><br>
								</div>
								<div class="col-sm-4">
									<p><?php print $lang_shop['time'].' '.$lang_shop['the-level']; ?> 2</p>
									<div class="input-group">
										<div class="form-group">
											<input type="number" name="wheel_lv2_time" class="form-control" value="<?php print $wheel_lv2_time; ?>">
										</div>
										<span class="input-group-addon"><?php print $lang_shop['minutes']; ?></span>
									</div><br>
								</div>
								<div class="col-sm-4">
									<p><?php print $lang_shop['time'].' '.$lang_shop['the-level']; ?> 3</p>
									<div class="input-group">
										<div class="form-group">
											<input type="number" name="wheel_lv3_time" class="form-control" value="<?php print $wheel_lv3_time; ?>">
										</div>
										<span class="input-group-addon"><?php print $lang_shop['minutes']; ?></span>
									</div><br>
								</div>
							</div><br>
							<button name="save" type="submit" class="btn btn-info"><?php print $lang_shop['save']; ?></button>
						</form>
                    </div>
				</div>