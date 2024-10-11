				<?php if($error) { ?>
				<div class="alert alert-danger"><?php print $lang_shop['admin-wheel-error']; ?></div>
				<?php } ?>
				<div class="card">
                    <div class="card__header">
                        <h2><?php print $lang_shop['is_add_items']; ?></h2>
                    </div>
					<div class="card__body">
						<form action="" method="POST">
							<div classs="row">
								<div class="col-sm-offset-2 col-sm-4">
									<p><?php print $lang_shop['the-level']; ?>?</p>
									<div class="form-group">
										<select class="select2" name="wheel_level" required>
											<option value="1"><?php print $lang_shop['the-level']; ?> 1</option>
											<option value="2"><?php print $lang_shop['the-level']; ?> 2</option>
											<option value="3"><?php print $lang_shop['the-level']; ?> 3</option>
										</select>
									</div>
								</div>
								<div class="col-sm-4">
									<p>VNUM</p>
									<div class="form-group">
										<input type="number" name="vnum" class="form-control" placeholder="19">
									</div>
								</div>
							</div><br>
							<button name="item" type="submit" class="btn btn-primary"><?php print $lang_shop['is_add_items']; ?></button>
						</form><br><br>
						<hr>
						<form action="" method="POST">
							<div classs="row">
								<div class="col-sm-offset-2 col-sm-4">
									<p><?php print $lang_shop['the-level']; ?>?</p>
									<div class="form-group">
										<select class="select2" name="wheel_level" required>
											<option value="1"><?php print $lang_shop['the-level']; ?> 1</option>
											<option value="2"><?php print $lang_shop['the-level']; ?> 2</option>
											<option value="3"><?php print $lang_shop['the-level']; ?> 3</option>
										</select>
									</div>
								</div>
								<div class="col-sm-4">
									<p><?php print $lang_shop['bonuses']; ?></p>
									<div class="form-group">
										<select class="select2" name="vnum">
											<?php foreach($account_bonuses as $key=>$bonus) { ?>
											<option value="<?php print $key; ?>"><?php print $bonus; ?></option>
											<?php } ?>
										</select>
									</div>
								</div>
							</div><br>
							<button name="bonuses" type="submit" class="btn btn-info"><?php print $lang_shop['bonuses'].' - '.$lang_shop['account']; ?></button>
						</form>
					</div>
				</div>
				<div class="card">
                    <div class="card__header">
                        <h2><?php print $lang_shop['managing-objects'].' - '.$lang_shop['wheel-of-destiny']; ?></h2>
                    </div>
                    <div class="card__body">
						<div class="tab">
                            <ul class="tab-nav tab-nav--justified">
								<?php
									for($i=1;$i<=3;$i++)
										print '<li class=""><a href="#tab-'.$i.'" data-toggle="tab" aria-expanded="false">'.$lang_shop['the-level'].' '.$i.'</a></li>';
								?>
                            </ul>
                            <div class="tab-content">
								<?php for($i=1;$i<=3;$i++) { ?>
                                <div class="tab-pane<?php if($i==1) print ' active'; ?>" id="tab-<?php print $i; ?>">
									<div class="table-responsive">
										<table class="table table-hover">
											<thead>
												<tr>
													<th>#</th>
													<th>ID</th>
													<th>Icon</th>
													<th><?php print $lang_shop['name']; ?></th>
													<th><?php print $lang_shop['last-edit']; ?></th>
													<th><?php print $lang_shop['managing-objects']; ?></th>
													<th>Testează</th>
													<th>Jackpot</th>
												</tr>
											</thead>
											<tbody>
												<?php
												$count=1;
												foreach($wheel_items as $item)
													if($item['wheel_level']==$i)
													{
														$item_name = $names[$item['vnum']];
														if($item['type']==3)
															$item_name = $account_bonuses[$item['vnum']];
														if($item['book']>0)
														{
															$skill_name = $shop->getSkill($item['book']);
															$item_name.=' - '.$skill_name;
														} else if($item['book_type']!='FIX') {
															if($item['book_type']=='RANDOM_ALL_CHARS')
																$skill_name = $lang_shop['random-skill'];
															else
																$skill_name = $shop->getLocaleGameByType($item['book_type']);
															$item_name.=' - '.$skill_name;
														} else if($item['polymorph']>0)
														{
															$mob_name = $shop->getMob($item['polymorph']);
															$item_name.=' - '.$mob_name;
														}
												?>
												<tr>
													<td><?php print $count++; ?></td>
													<td>#<?php print $item['id']; ?></td>
													<td><img src="<?php if($item['type']!=3) print $shop_url.'images/'.$icons[$item['vnum']]['src']; else print $shop_url.'images/icons/bonuses/'.$server_item['buff'][$item['vnum']][0].'.png'; ?>"></td>
													<td><?php print $item_name; ?></td>
													<td><?php print $item['date']; ?></td>
													<td>
														<a href="<?php print $shop_url.'admin/items/edit/'.$item['id']; ?>" type="button" class="btn btn-info btn-sm"><?php print $lang_shop['edit']; ?></a>
														<a href="<?php print $shop_url.'admin/wheel/items/'.$item['id'].'/'.$i; ?>" type="button" onclick="return confirm('<?php print $lang_shop['check-delete']; ?>')" class="btn btn-danger btn-sm"><?php print $lang_shop['delete']; ?></a>
													</td>
													<td>
														<form action="" method="post">
															<input type="hidden" name="test" value="1">
															<input type="hidden" name="id" value="<?php print $item['id']; ?>">
															<input type="hidden" name="wheel_level" value="<?php print $item['wheel_level']; ?>">
															
															<div class="form-group">
																<button name="item" type="submit" class="btn btn-warning" onclick="return confirm('Vei primi obiectul în joc.');">Testează</button>
															</div>
														</form>
													</td>
													<td>
														<form action="" method="post">
															<input type="hidden" name="id" value="<?php print $item['id']; ?>">
															<input type="hidden" name="status" value="<?php print $item['jackpot']; ?>">
															<input type="hidden" name="wheel_level" value="<?php print $item['wheel_level']; ?>">
															
															<div class="form-group">
																<div class="toggle-switch">
																	<input type="checkbox" onChange="this.form.submit()" class="toggle-switch__checkbox"<?php if($item['jackpot']) print ' checked'; ?>>
																	<i class="toggle-switch__helper"></i>
																</div>
															</div>
														</form>
													</td>
												</tr>
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