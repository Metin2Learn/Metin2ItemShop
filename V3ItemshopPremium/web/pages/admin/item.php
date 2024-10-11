				<div class="card">
                    <div class="card__header">
                        <h2><?php print $lang_shop['is_add_items']; if($type==2) print ' - '.$lang_shop['bonus_selection']; ?></h2>
                    </div>

                    <div class="card__body">
					<?php
						if($id!=null && $type && $type!=3)
						{
							if($shop->chekItemProto($id))
							{
								$name = $shop->getName($id);
								
								$item_plus = explode('+', $name);
								if(isset($item_plus[1]))
								{
									$item_plus=intval($item_plus[1]);
									if($item_plus==9)
										$item_plus = 'collection-item-9-plus';
									else if($item_plus==0)
										$item_plus = 'zero';
									else $item_plus = 'collection-item-'.$item_plus;
								}
								else $item_plus = 'zero';
							
							if(isset($_POST['item']) && $type==2 && $error)
							{
					?>
                        <div class="alert alert-danger alert-dismissible">
                            <button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span></button>
                            <?php print $lang_shop['too-few-bonuses']; ?>
                        </div>
						<?php } ?>
						<form action="" method="POST">
							<div class="row">
								<div class="col-sm-2">
									<center><img src="<?php print $shop_url.'images/'.$shop->getIcon($id); ?>"></center>
								</div>
								<div class="col-sm-2">
									<p>VNUM - <?php print $shop->getName($id); ?></p>
									<div class="input-group">
										<div class="form-group">
											<input type="number" name="vnum" class="form-control" value="<?php print $id; ?>" disabled>
										</div>
										<span class="input-group-addon"><i class="zmdi zmdi-<?php print $item_plus; ?>"></i></span>
									</div>
								</div>
								<div class="col-sm-3">
									<p><?php print $lang_shop['category']; ?></p>
									<div class="form-group">
										<select class="select2" name="category" required>
											<?php if(!$wheel_level)
												foreach($categoriesbyid as $key => $cat)
													print '<option value="'.$key.'">'.$cat['name'].'</option>';
												else print '<option value="0">['.$lang_shop['wheel-of-destiny'].'] '.$lang_shop['the-level'].' '.$wheel_level.'</option>';
											?>
										</select>
									</div>
								</div>
								<div class="col-sm-2">
									<p><?php print $lang_shop['objects_number']; ?></p>
									<div class="form-group">
										<input type="number" name="count" class="form-control" value="1" min="1" max="200" required>
									</div>
								</div>
								<div class="col-sm-3"<?php if($wheel_level) print ' style="display: none;"'; ?>>
									<p><?php print $lang_shop['price_object']; ?></p>
									<div class="row">
										<div class="col-sm-7">
											<div class="form-group">
												<select class="select2" name="method" required>
													<option value="1">[coins] <?php print $lang_shop['coins']; ?></option>
													<option value="2">[jcoins] <?php print $lang_shop['jcoins']; ?></option>
												</select>
											</div>
										</div>
										<div class="col-sm-5">
											<div class="form-group">
												<input type="number" name="price" class="form-control" value="1" min="0" required>
											</div>
										</div>
									</div>
								</div>
								<?php if(!$wheel_level) { ?>
								<div class="col-sm-12">
									<div class="form-group">
										<div class="checkbox">
											<label>
												<input type="checkbox" name="friend" value="1">
												<i class="input-helper"></i>
												<?php print $lang_shop['buy-for-friend']; ?>
											</label>
										</div>
										<i class="form-group__bar"></i>
									</div>
								</div>
								<?php } ?>
								<div class="col-sm-12">
									<p><?php print $lang_shop['description']; ?></p>
									<div class="form-group">
										<?php $placeholder = $shop->getDesc($id); ?>
										<textarea id="summernote" name="description"></textarea>
										<i class="form-group__bar"></i>
									</div>
								</div>
								<div class="col-sm-12">
									<div class="tab">
										<ul class="tab-nav tab-nav--justified">
											<?php if(!$item_skillbook && !$item_polymorph) { ?><li class="active"><a href="#tab-bonuses" data-toggle="tab"><?php print $lang_shop['bonuses']; ?></a></li><?php } ?>
											<li<?php if($item_skillbook || $item_polymorph) print ' class="active"'; ?>><a href="#tab-sockets" data-toggle="tab"><?php if($item_polymorph) print 'Mob'; else if($item_time) print $lang_shop['time_left']; else if($item_skillbook) print $skills_translation; else if($item_sash) print sprintf($absorption_translation, 18); else print 'Sockets'; ?></a></li>
											<?php if(!$wheel_level) { ?>
											<li><a href="#tab-limit" data-toggle="tab"><?php print $lang_shop['purchase_limit']; ?></a></li>
											<li><a href="#tab-expire" data-toggle="tab"><?php print $lang_shop['expire']; ?></a></li>
											<?php } ?>
										</ul>
										<div class="tab-content">
											<div class="tab-pane<?php if(!$item_skillbook && !$item_polymorph) print ' active'; ?>" id="tab-bonuses">
												<?php if($type!=2) for($i=0;$i<=6;$i++) { ?>
												<div class="form-group">
													<div class="row">
														<div class="col-sm-9">
															<select class="select2" name="attrtype<?php print $i; ?>">
																<option value="0" selected>NONE</option>
																<?php print $bonuses; ?>
															</select>
														</div>
														<div class="col-sm-3">
															<input class="form-control" name="attrvalue<?php print $i; ?>" type="number" value="0" required>
														</div>
													</div>
												</div>
												<?php } else { ?>
												<div class="form-group">
													<label class="control-label" for="price">
														<?php print $lang_shop['bonuses']; ?>
													</label>

													<select class="select2" name="count_bonuses">
													<?php for($i=1;$i<=7;$i++) {
															print '<option value="'.$i.'"';
															if($i==4)
																print ' selected';
															if($i==1)
																print '>'.$i.' '.$lang_shop['bonus'].'</option>';
															else
																print '>'.$i.' '.$lang_shop['bonuses'].'</option>';
													} ?>
													</select>
												</div>
												<div class="form-group">
													<div class="row">
														<div class="col-sm-6">
															<div class="form-check form-control">
															  <label class="form-check-label">
																	<?php print $lang_shop['bonus']; ?>
															  </label>
															</div>
														</div>
														<div class="col-sm-4">
															<div class="form-check form-control">
															  <label class="form-check-label">
																	<?php print $lang_shop['value']; ?>
															  </label>
															</div>
														</div>
														<div class="col-sm-2">
															<label class="form-check-label">
															<div class="form-check form-control">
															  <label class="form-check-label">
																	<?php print $lang_shop['compulsory']; ?>?
															  </label>
															</div>
															</label>
														</div>
													</div>
												</div>
												<?php foreach($DBbonuses as $row) if($row['bonus']<306) { ?>
												<div class="form-group">
													<div class="row">
														<div class="col-sm-6">
															<div class="form-check form-control">
															  <label class="form-check-label">
																<div class="checkbox">
																	<label>
																		<input type="checkbox" name="bonus_<?php print $row['bonus']; ?>">
																		<i class="input-helper"></i>
																		<?php print str_replace("%d", 'XXX', str_replace("%d%%", 'XXX%', $row['name'])); ?>
																	</label>
																</div>
															  </label>
															</div>
														</div>
														<div class="col-sm-4">
															<input class="form-control" name="bonus_value_<?php print $row['bonus']; ?>" type="number" value="0">
														</div>
														<div class="col-sm-2">
															<label class="form-check-label">
																<div class="checkbox">
																	<label>
																		<input type="checkbox" name="required_<?php print $row['bonus']; ?>">
																		<i class="input-helper"></i>
																		<?php print $lang_shop['compulsory']; ?>
																	</label>
																</div>
															</label>
														</div>
													</div>
												</div>
												<?php } } ?>
											</div>
											<div class="tab-pane<?php if($item_skillbook || $item_polymorph) print ' active'; ?>" id="tab-sockets">
												<?php
												if($item_polymorph)
												{
												?>
												<div class="form-group">
													<label class="col-sm-3 control-label">Mob</label>
													<div class="col-sm-9">
														<select class="select2" name="mob">
															<?php foreach($mobs as $mob) { ?>
															<option value="<?php print $mob['vnum']; ?>"><?php print '['.$mob['vnum'].'] '.$mob['name']; ?></option>
															<?php } ?>
														</select>
													</div>
												</div>
												<?php
												}
												else if($item_time)
												{
												?>
												<div class="row">
													<div class="col-lg-3">
														<label for="months"><?php print ucfirst($lang_shop['months']); ?> (30 <?php print $lang_shop['days']; ?>)</label>
														<input class="form-control" type="number" value="0" id="time_months" name="time_months" min="0" required>
													</div>
													<div class="col-lg-3">
														<label for="days"><?php print ucfirst($lang_shop['days']); ?></label>
														<input class="form-control" type="number" value="0" id="time_days" name="time_days" min="0" required>
													</div>
													<div class="col-lg-3">
														<label for="hours"><?php print ucfirst($lang_shop['hours']); ?></label>
														<input class="form-control" type="number" value="0" id="time_hours" name="time_hours" min="0" required>
													</div>
													<div class="col-lg-3">
														<label for="reason"><?php print ucfirst($lang_shop['minutes']); ?></label>
														<input class="form-control" type="number" value="0" id="time_minutes" name="time_minutes" min="0" required>
													</div>
												</div>
												<?php
												} else if($item_skillbook) {
												?>
												<div class="form-group">
													<label class="col-sm-3 control-label"><?php print $skills_translation; ?></label>
													<div class="col-sm-9">
														<select class="select2" name="skill">
															<option value="RANDOM_ALL_CHARS">RANDOM_ALL_CHARS</option>
															<?php
																foreach($shop->getLocaleGameJobs() as $r)
																	if($r['type']!='JOB_WOLFMAN')
																		print '<option value="'.$r['type'].'">[RANDOM] '.$r['name'].'</option>';
																	else if($wolfman_character) print '<option value="'.$r['type'].'">[RANDOM] '.$r['name'].'</option>';
																foreach($skills as $skill) { ?>
																<option value="<?php print $skill['vnum']; ?>"><?php print '['.$skill['vnum'].'] '.$skill['name']; ?></option>
															<?php } ?>
														</select>
													</div>
												</div>
												<?php
												} else if($item_sash) { ?>
												<div class="row">
													<?php for($i=0;$i<$itemSockets;$i++) { ?>
													<div class="col-sm-2">
														<?php if($i == $server_item['ESashInfo']['SASH_ABSORPTION_SOCKET'])
																print '<p>'.sprintf($absorption_translation, 18).'<p>';
																else print '<p>Socket'.$i.'</p>'; ?>
														<input class="form-control" type="number" value="<?php if($i == $server_item['ESashInfo']['SASH_ABSORPTION_SOCKET']) print 18; else print 0; ?>" id="socket<?php print $i; ?>" name="socket<?php print $i; ?>" min="0" required>
													</div>
													<?php } ?>
												</div>
												<?php } else {
												?>
												<div class="row">
													<?php for($i=0;$i<$itemSockets;$i++) { ?>
													<div class="col-sm-2">
														<p>Socket<?php print $i; ?></p>
														<div class="form-group">
															<select class="select2" name="socket<?php print $i; ?>">
																<option value="0" selected>NONE</option>
																<?php print $sockets; ?>
															</select>
														</div>
													</div>
													<?php } ?>
												</div>
												<?php } ?>
											</div>
											<div class="tab-pane" id="tab-limit">
												<div class="form-group row">
													<label class="col-sm-3 control-label"><?php print $lang_shop['objects_number'].' (0 = '.$lang_shop['unlimited'].')'; ?></label>
													<div class="col-sm-9">
														<input type="number" name="limit" class="form-control" value="0" min="0" placeholder="<?php print '0 = '.$lang_shop['unlimited']; ?>" required>
													</div>
												</div>
												<div class="form-group row">
													<label class="col-sm-3 control-label"><?php print $lang_shop['objects_number'].' / '.$lang_shop['account'].'(0 = '.$lang_shop['unlimited'].')'; ?></label>
													<div class="col-sm-9">
														<input type="number" name="limit_account" class="form-control" value="0" min="0" placeholder="<?php print '0 = '.$lang_shop['unlimited']; ?>" required>
													</div>
												</div>
											</div>
											<div class="tab-pane" id="tab-expire">
												<div class="row">
													<div class="col-lg-3">
														<label for="months"><?php print ucfirst($lang_shop['months']); ?> (30 <?php print $lang_shop['days']; ?>)</label>
														<input class="form-control" type="number" value="0" id="expire_months" name="expire_months" min="0" required>
													</div>
													<div class="col-lg-3">
														<label for="days"><?php print ucfirst($lang_shop['days']); ?></label>
														<input class="form-control" type="number" value="0" id="expire_days" name="expire_days" min="0" required>
													</div>
													<div class="col-lg-3">
														<label for="hours"><?php print ucfirst($lang_shop['hours']); ?></label>
														<input class="form-control" type="number" value="0" id="expire_hours" name="expire_hours" min="0" required>
													</div>
													<div class="col-lg-3">
														<label for="reason"><?php print ucfirst($lang_shop['minutes']); ?></label>
														<input class="form-control" type="number" value="0" id="expire_minutes" name="expire_minutes" min="0" required>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<br><br>
							<?php if($type==1) { ?>
							<button name="item" type="submit" class="btn btn-primary"><?php print $lang_shop['is_add_items']; ?></button>
							<?php } else { ?>
							<button name="item" type="submit" class="btn btn-danger"><?php print $lang_shop['is_add_items'].' - '.$lang_shop['bonus_selection'].''; ?></button>
							<?php } ?>
						</form>
					<?php
							} else if($id!=0 && $type!=3) {
								$id=$type=null;
					?>
					<a href="<?php print $shop_url; ?>admin/itemproto">
						<div class="alert alert-danger">
							<?php print $lang_shop['no-item-in-itemproto']; ?>
						</div>
					</a>
					<?php
							}
						}
						if($id==null || $type==null)
						{
					?>
					<form class="card__body form-horizontal" action="" method="POST">
                        <div class="form-group">
                            <label class="col-sm-2 control-label">VNUM</label>
                            <div class="col-sm-10">
                                <input type="number" name="vnum" class="form-control" placeholder="19">
                            </div>
                        </div>
						
                        <div class="form-group">
                            <div class="col-sm-offset-2 col-sm-10">
                                <button name="item" type="submit" class="btn btn-primary"><?php print $lang_shop['is_add_items']; ?></button>
                                <button name="bonus" type="submit" class="btn btn-danger"><?php print $lang_shop['is_add_items'].' - '.$lang_shop['bonus_selection']; ?></button>
                            </div>
                        </div>
                    </form>
					<hr>
					<form class="card__body form-horizontal" action="" method="POST">
                        <div class="form-group">
                            <label class="col-sm-2 control-label"><?php print $lang_shop['bonuses']; ?></label>
                            <div class="col-sm-10">
								<select class="select2" name="vnum">
									<?php foreach($account_bonuses as $key=>$bonus) { ?>
									<option value="<?php print $key; ?>"><?php print $bonus; ?></option>
									<?php } ?>
								</select>
                            </div>
                        </div>
						
                        <div class="form-group">
                            <div class="col-sm-offset-2 col-sm-10">
                                <button name="bonuses" type="submit" class="btn btn-info"><?php print $lang_shop['bonuses'].' - '.$lang_shop['account']; ?></button>
                            </div>
                        </div>
                    </form>
					<?php } else if($id!=null && $type!=null && $type==3) {
						$bonus = $server_item['buff'][$id];
					?>
						<form action="" method="POST">
							<input type="hidden" name="count" value="1">
							<div class="row">
								<div class="col-sm-2">
									<center><img src="<?php print $shop_url.'images/icons/bonuses/'.$bonus[0]; ?>.png"></center>
								</div>
								<div class="col-sm-3">
									<p><?php print $lang_shop['category']; ?></p>
									<div class="form-group">
										<select class="select2" name="category" required>
											<?php if(!$wheel_level)
												foreach($categoriesbyid as $key => $cat)
													print '<option value="'.$key.'">'.$cat['name'].'</option>';
												else print '<option value="0">['.$lang_shop['wheel-of-destiny'].'] '.$lang_shop['the-level'].' '.$wheel_level.'</option>';
											?>
										</select>
									</div>
								</div>
								<div class="col-sm-7"<?php if($wheel_level) print ' style="display: none;"'; ?>>
									<p><?php print $lang_shop['price_object']; ?></p>
									<div class="row">
										<div class="col-sm-8">
											<div class="form-group">
												<select class="select2" name="method" required>
													<option value="1">[coins] <?php print $lang_shop['coins']; ?></option>
													<option value="2">[jcoins] <?php print $lang_shop['jcoins']; ?></option>
												</select>
											</div>
										</div>
										<div class="col-sm-4">
											<div class="form-group">
												<input type="number" name="price" class="form-control" value="1" min="0" required>
											</div>
										</div>
									</div>
								</div>
								<?php if(!$wheel_level) { ?>
								<div class="col-sm-12">
									<div class="form-group">
										<div class="checkbox">
											<label>
												<input type="checkbox" name="friend" value="1">
												<i class="input-helper"></i>
												<?php print $lang_shop['buy-for-friend']; ?>
											</label>
										</div>
										<i class="form-group__bar"></i>
									</div>
								</div>
								<?php } ?>
								<div class="col-sm-12">
									<p><?php print $lang_shop['description']; ?></p>

									<div class="form-group">
										<?php $placeholder = $account_bonuses[$id]; ?>
										<textarea id="summernote" name="description"></textarea>
										<i class="form-group__bar"></i>
									</div>
								</div>
								<div class="col-sm-12">
									<div class="tab">
										<ul class="tab-nav tab-nav--justified">
											<li class="active"><a href="#tab-sockets" data-toggle="tab"><?php print $lang_shop['time_left']; ?></a></li>
											<?php if(!$wheel_level) { ?>
											<li><a href="#tab-limit" data-toggle="tab"><?php print $lang_shop['purchase_limit']; ?></a></li>
											<li><a href="#tab-expire" data-toggle="tab"><?php print $lang_shop['expire']; ?></a></li>
											<?php } ?>
										</ul>
										<div class="tab-content">
											<div class="tab-pane active" id="tab-sockets">
												<div class="row">
													<div class="col-lg-3">
														<label for="months"><?php print ucfirst($lang_shop['months']); ?> (30 <?php print $lang_shop['days']; ?>)</label>
														<input class="form-control" type="number" value="0" id="time_months" name="time_months" min="0" required>
													</div>
													<div class="col-lg-3">
														<label for="days"><?php print ucfirst($lang_shop['days']); ?></label>
														<input class="form-control" type="number" value="0" id="time_days" name="time_days" min="0" required>
													</div>
													<div class="col-lg-3">
														<label for="hours"><?php print ucfirst($lang_shop['hours']); ?></label>
														<input class="form-control" type="number" value="0" id="time_hours" name="time_hours" min="0" required>
													</div>
													<div class="col-lg-3">
														<label for="reason"><?php print ucfirst($lang_shop['minutes']); ?></label>
														<input class="form-control" type="number" value="0" id="time_minutes" name="time_minutes" min="0" required>
													</div>
												</div>
											</div>
											<div class="tab-pane" id="tab-limit">
												<div class="form-group row">
													<label class="col-sm-3 control-label"><?php print $lang_shop['objects_number'].' (0 = '.$lang_shop['unlimited'].')'; ?></label>
													<div class="col-sm-9">
														<input type="number" name="limit" class="form-control" value="0" min="0" placeholder="<?php print '0 = '.$lang_shop['unlimited']; ?>" required>
													</div>
												</div>
												<div class="form-group row">
													<label class="col-sm-3 control-label"><?php print $lang_shop['objects_number'].' / '.$lang_shop['account'].'(0 = '.$lang_shop['unlimited'].')'; ?></label>
													<div class="col-sm-9">
														<input type="number" name="limit_account" class="form-control" value="0" min="0" placeholder="<?php print '0 = '.$lang_shop['unlimited']; ?>" required>
													</div>
												</div>
											</div>
											<div class="tab-pane" id="tab-expire">
												<div class="row">
													<div class="col-lg-3">
														<label for="months"><?php print ucfirst($lang_shop['months']); ?> (30 <?php print $lang_shop['days']; ?>)</label>
														<input class="form-control" type="number" value="0" id="expire_months" name="expire_months" min="0" required>
													</div>
													<div class="col-lg-3">
														<label for="days"><?php print ucfirst($lang_shop['days']); ?></label>
														<input class="form-control" type="number" value="0" id="expire_days" name="expire_days" min="0" required>
													</div>
													<div class="col-lg-3">
														<label for="hours"><?php print ucfirst($lang_shop['hours']); ?></label>
														<input class="form-control" type="number" value="0" id="expire_hours" name="expire_hours" min="0" required>
													</div>
													<div class="col-lg-3">
														<label for="reason"><?php print ucfirst($lang_shop['minutes']); ?></label>
														<input class="form-control" type="number" value="0" id="expire_minutes" name="expire_minutes" min="0" required>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<br><br>
							<button name="item" type="submit" class="btn btn-info"><?php print $lang_shop['is_add_items']; ?></button>
						</form>
					<?php } ?>
					</div>
                </div>