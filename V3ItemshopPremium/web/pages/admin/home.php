				<?php if(!$shop->itemProtoCount()) { ?>
				<a href="<?php print $shop_url; ?>admin/itemproto">
					<div class="alert alert-danger">
						<?php print $lang_shop['no-itemproto']; ?>
					</div>
				</a>
				<?php } ?>
                <div id="content__grid" data-columns>
                    <div class="card widget-analytic">
                        <div class="card__header">
                            <h2><?php print $lang_shop['objects-bought']; ?></h2>
                        </div>
                        <div class="card__body">
                            <div class="widget-analytic__info">
                                <i class="zmdi zmdi-mall"></i>
                                <h2><?php print number_format($shop->countItemsBought(), 0, '', '.'); ?></h2>
                            </div>
                        </div>
                    </div>

                    <div class="card widget-analytic">
                        <div class="card__header">
                            <h2><?php print $lang_shop['valid-donations']; ?></h2>
                        </div>
                        <div class="card__body">
                            <div class="widget-analytic__info">
                                <i class="zmdi zmdi-assignment-check"></i>
                                <h2>
									<?php print number_format($shop->countTransactions(), 0, '', '.'); ?>
									<span class="pull-right"><?php print number_format($shop->getSumTransactions(), 0, '', '.'); ?>&euro; <strike>fees</strike></span>
								</h2>
                            </div>
                        </div>
                    </div>

                    <div class="card widget-analytic">
                        <div class="card__header">
                            <h2><?php print $lang_shop['coins-spent']; ?></h2>
                        </div>
                        <div class="card__body">
                            <div class="widget-analytic__info">
                                <i class="zmdi zmdi-money-off"></i>
                                <h2><?php print number_format($shop->countPaidCoins(), 0, '', '.'); ?></h2>
                            </div>
                        </div>
                    </div>

                    <div class="card widget-pie-grid">
                        <a href="<?php print $shop_url; ?>admin/categories" class="col-xs-4 col-sm-6 col-md-4 widget-pie-grid__item">
                            <h1><i class="zmdi zmdi-view-list"></i></h1>
                            <div class="widget-pie-grid__title"><?php print $lang_shop['administration-categories']; ?></div>
                        </a>
                        <a href="<?php print $shop_url; ?>admin/add/item" class="col-xs-4 col-sm-6 col-md-4 widget-pie-grid__item">
                            <h1><i class="zmdi zmdi-playlist-plus"></i></h1>
                            <div class="widget-pie-grid__title"><?php print $lang_shop['is_add_items']; ?></div>
                        </a>
                        <a href="<?php print $shop_url; ?>admin/items" class="col-xs-4 col-sm-6 col-md-4 widget-pie-grid__item">
                            <h1><i class="zmdi zmdi-store"></i></h1>
                            <div class="widget-pie-grid__title"><?php print $lang_shop['managing-objects']; ?></div>
                        </a>
                        <a href="<?php print $shop_url; ?>admin/payments/list/" class="col-xs-4 col-sm-6 col-md-4 widget-pie-grid__item">
                            <h1><i class="zmdi zmdi-paypal"></i></h1>
                            <div class="widget-pie-grid__title"><?php print $lang_shop['administration-payments']; ?></div>
                        </a>
                        <a href="<?php print $shop_url; ?>admin/coins" class="col-xs-4 col-sm-6 col-md-4 widget-pie-grid__item">
                            <h1><i class="zmdi zmdi-accounts-add"></i></h1>
                            <div class="widget-pie-grid__title"><?php print $lang_shop['add-coins']; ?></div>
                        </a>
                        <a href="<?php print $shop_url; ?>admin/settings" class="col-xs-4 col-sm-6 col-md-4 widget-pie-grid__item">
                            <h1><i class="zmdi zmdi-settings"></i></h1>
                            <div class="widget-pie-grid__title"><?php print $lang_shop['settings']; ?></div>
                        </a>
                    </div>
					<?php
						$last_payments = $shop->getLastPayments();
						if($last_payments && count($last_payments)) {
					?>
                    <div class="card">
                        <div class="card__header">
                            <h2><?php print $lang_shop['last-payments']; ?></h2>
                        </div>
                        <div class="list-group">
							<?php foreach($last_payments as $item) { ?>
                            <a href="#" class="list-group-item media">
                                <div class="pull-left">
                                    <small class="list-group__text"><?php print $item['amount']; ?> &euro;</small>
                                </div>
                                <div class="media-body pull-right">
                                    <div class="list-group__heading"><?php print $account->getAccountData('login', $item['account']); ?></div>
                                    <small class="list-group__text"><?php print $payment_names[$item['type']][1]; ?></small>
                                </div>
                            </a>
							<?php } ?>

                            <a href="<?php print $shop_url; ?>admin/payments/list" class="view-more">
                                <i class="zmdi zmdi-long-arrow-right"></i> <?php print $lang_shop['view-all']; ?>
                            </a>
                        </div>
                    </div>
					<?php } ?>
					
                    <div class="card widget-past-days">
                        <div class="card__header">
                            <h2><?php print $lang_shop['statistics']; ?></h2>
                        </div>

                        <div class="list-group list-group--striped">
                            <div class="list-group-item">
                                <div class="widget-past-days__chart hidden-sm">
                                    <div class="chart-sparkline-bar"><?php print $shop->getStatObjectsPurchasedLastMonth(); ?></div>
                                </div>

                                <div class="widget-past-days__info">
                                    <small><?php print $lang_shop['objects-bought']; ?></small>
                                    <h3><?php print number_format($shop->getStatObjectsPurchasedLastMonthCount(), 0, '', '.'); ?></h3>
                                </div>
                            </div>

                            <div class="list-group-item">
                                <div class="widget-past-days__chart hidden-sm">
                                    <div class="chart-sparkline-bar"><?php print $shop->getStatDonationsLastMonth(); ?></div>
                                </div>

                                <div class="widget-past-days__info">
                                    <small><?php print $lang_shop['donations']; ?></small>
                                    <h3><?php print number_format($shop->getStatDonationsLastMonthCount(), 0, '', '.'); ?></h3>
                                </div>
                            </div>

                            <div class="list-group-item">
                                <div class="widget-past-days__chart hidden-sm">
                                    <div class="chart-sparkline-bar"><?php print $shop->getStatCoinsLastMonth(); ?></div>
                                </div>

                                <div class="widget-past-days__info">
                                    <small><?php print $lang_shop['coins-spent']; ?></small>
                                    <h3><?php print number_format($shop->getStatCoinsLastMonthCount(), 0, '', '.'); ?></h3>
                                </div>
                            </div>

                            <div class="list-group-item">
                                <div class="widget-past-days__chart hidden-sm">
                                    <div class="chart-sparkline-bar"><?php print $shop->getStatItemsAddedLastMonth(); ?></div>
                                </div>

                                <div class="widget-past-days__info">
                                    <small><?php print $lang_shop['recently-added']; ?></small>
                                    <h3><?php print number_format($shop->getStatItemsAddedLastMonthCount(), 0, '', '.'); ?></h3>
                                </div>
                            </div>
                        </div>
                    </div>
					<?php
						$discount = $shop->getDiscountItems();
						if($discount && count($discount)) {
					?>
                    <div class="card widget-todo-lists">
                        <div class="card__header card__header--highlight">
                            <h2><?php print $lang_shop['discounts-in-progress']; ?> </h2>
                        </div>
						<?php foreach($discount as $item) {
								$item_name = $shop->getName($item['vnum']);

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
                        <div class="list-group">
                            <div class="list-group-item">
                                <div class="pull-left" style="padding-right: 10px;">
									<img src="<?php if($item['type']!=3) print $shop_url.'images/'.$shop->getIcon($item['vnum']); else print $shop_url.'images/icons/bonuses/'.$server_item['buff'][$item['vnum']][0].'.png'; ?>">
                                </div>

                                <div class="media-body">
                                    <div class="list-group__heading"><?php print $item_name; ?></div>
                                    <small class="list-group__text"><?php print date("d-m-Y H:i", strtotime($item['discount_expire'])); ?></small>
                                    <span class="list-group__attrs">
                                        <span>-<?php print $item['discount']; ?>%</span>
                                    </span>
								</div>

                                <div class="actions list-group__actions">
                                    <div class="dropdown">
                                        <a href="#" data-toggle="dropdown"><i class="zmdi zmdi-more-vert"></i></a>

                                        <ul class="dropdown-menu pull-right">
                                            <li><a href="<?php print $shop_url; ?>admin/&discount=<?php print $item['id']; ?>" data-demo-action="delete-listing"><?php print $lang_shop['stop']; ?></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
						<?php } ?>
                    </div>
					<?php } ?>
                </div>