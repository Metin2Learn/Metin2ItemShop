				<div class="card">
                    <div class="card__header">
                        <h2><?php print $lang_shop['players-history']; ?></h2>
                    </div>
                    <div class="card__body">
						<form action="" method="POST">
							<div class="row">
								<div class="col-sm-4">
									<div class="input-group">
										<span class="input-group-addon"><i class="zmdi zmdi-search"></i></span>
										<div class="form-group form-group--float">
											<input type="text" name="search" class="form-control input-lg">
											<label><?php print $lang_shop['account'].' / '.$lang_shop['item-name']; ?></label>
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
                                    <th><?php print $lang_shop['item-name']; ?></th>
                                    <th><?php print $lang_shop['price_object']; ?></th>
                                    <th><?php print $lang_shop['in-game']; ?></th>
                                    <th><?php print $lang_shop['item-type']; ?></th>
                                    <th><?php print $lang_shop['date']; ?></th>
                                </tr>
                                </thead>
                                <tbody>
									<?php
										$accounts = array_column($transactions, 'account');
										$names = $account->getMultipleAccounts($accounts);
										
										foreach($transactions as $item) {
											$i = $shop->getItemShop($item['item']);
											$item_name = $shop->getName($i['vnum']);
											if($i['type']==3)
												$item_name = $account_bonuses[$i['vnum']];
											
											if($i['book']>0)
											{
												$skill_name = $shop->getSkill($i['book']);
												$item_name.=' - '.$skill_name;
											} else if($i['book_type']!='FIX') {
												if($i['book_type']=='RANDOM_ALL_CHARS')
													$skill_name = $lang_shop['random-skill'];
												else
													$skill_name = $shop->getLocaleGameByType($i['book_type']);
												$item_name.=' - '.$skill_name;
											} else if($i['polymorph']>0)
											{
												$mob_name = $shop->getMob($i['polymorph']);
												$item_name.=' - '.$mob_name;
											}
											if($item['to_player'])
												$item_name.= ' ['.$lang_shop['sent-to'].' '.$account->getAccountData('login', $player->getPlayerData('account_id', $item['to_player'])).']';
											
									?>
									<tr>
										<td>#<?php print $item['id']; ?></td>
										<td><?php print $names[$item['account']]; ?></td>
										<td><?php print $item_name; ?></td>
										<td>
											<?php if($item['pay_type']==1) { ?>
											<img class="ttip" src="<?php print $shop_url."images/this/coins.png"; ?>" tooltip-content="<?php print $lang_shop['coins']; ?>" />
											<?php } else if($item['pay_type']==2){ ?>
											<img class="ttip" src="<?php print $shop_url."images/this/jcoins.png"; ?>" tooltip-content="<?php print $lang_shop['jcoins']; ?>" />
											<?php } ?>	
											<span class="end-price"><?php print number_format($item['coins'], 0, '', '.'); ?></span>
										</td>
										<td><?php if($item['taken']) print $lang_shop['yes']; else print $lang_shop['no']; ?></td>
										<td><?php if($item['type']==1) print $lang_shop['normal']; else print $lang_shop['wheel-of-destiny']; ?></td>
										<td><?php print date("d-m-Y H:i:s", strtotime($item['date'])); ?></td>
									</tr>
									<?php } ?>
                                </tbody>
                            </table>
                        </div>
						<?php
							if($show_pagination)
							{
								print '<div class="text-center p-30">';
								print $shop->createLinksPagination($shop_url.'admin/history/', $page_number, $transactions_count, 'pagination', $search);
								print '</div>';
							}
						?>
                    </div>
				</div>