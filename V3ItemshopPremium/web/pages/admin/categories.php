				<div class="card">
                    <div class="card__header">
                        <h2><?php print $lang_shop['add']; ?></h2>
                    </div>
                    <div class="card__body">
						<form action="" method="POST" id="add">
							<div class="row">
								<?php foreach($languages as $key => $lang) { ?>
								<div class="col-sm-2">
									<p><?php print '['.$key.'] '.$lang; ?></p>
									<div class="form-group">
										<input type="text" name="<?php print $key; ?>" class="form-control" value="">
									</div>
								</div>
								<?php } ?>
								<div class="col-sm-1">
									<p>Icon</p>
									<input type="hidden" name="icon" id="icon" value="far fa-star">
									<div class="form-group">
										<div class="btn-group">
											<button type="button" class="btn btn-primary iconpicker-component"><i
													class="far fa-star"></i></button>
											<button type="button" class="icp icp-dd btn btn-primary dropdown-toggle"
													data-selected="fa-car" data-toggle="dropdown">
												<span class="caret"></span>
												<span class="sr-only">Toggle Dropdown</span>
											</button>
											<div class="dropdown-menu"></div>
										</div>
									</div>
								</div>
								<div class="col-sm-2">
									<p><?php print $lang_shop['add']; ?></p>
									<button name="add" type="submit" class="btn btn-primary"><?php print $lang_shop['add']; ?></button>
								</div>
							</div>
						</form>
					</div>
                </div>
				
				<div class="card">
                    <div class="card__header">
                        <h2><?php print $lang_shop['administration-categories']; ?></h2>
                    </div>
                    <div class="card__body">
						<div class="tab">
                            <ul class="tab-nav tab-nav--justified">
								<?php foreach($categories as $category)
										print '<li class=""><a href="#tab-'.$category['id'].'" data-toggle="tab" aria-expanded="false"><i class="'.$category['icon'].'"></i> '.$categoriesbyid[$category['id']]['name'].'</a></li>'; ?>
                            </ul>
                            <div class="tab-content">
								<?php foreach($categories as $category) { ?>
                                <div class="tab-pane" id="tab-<?php print $category['id']; ?>">
									<form action="" method="POST" id="form-<?php print $category['id']; ?>">
										<input type="hidden" name="id" value="<?php print $category['id']; ?>">
										<div class="row">
											<?php foreach($languages as $key => $lang) { ?>
											<div class="col-sm-2">
												<p><?php print '['.$key.'] '.$lang; ?></p>
												<div class="form-group">
													<input type="text" name="<?php print $key; ?>" class="form-control" value="<?php print $category[$key]; ?>">
												</div>
											</div>
											<?php } ?>
											<div class="col-sm-1">
												<p>Icon</p>
												<input type="hidden" name="icon-<?php print $category['id']; ?>" id="icon-<?php print $category['id']; ?>" value="<?php print $category['icon']; ?>">
												<div class="form-group">
													<div class="btn-group">
														<button type="button" class="btn btn-primary iconpicker-component"><i
																class="<?php print $category['icon']; ?>"></i></button>
														<button type="button" class="icp-<?php print $category['id']; ?> icp-dd btn btn-primary dropdown-toggle"
																data-selected="<?php print $category['icon']; ?>" data-toggle="dropdown">
															<span class="caret"></span>
															<span class="sr-only">Toggle Dropdown</span>
														</button>
														<div class="dropdown-menu"></div>
													</div>
												</div>
											</div>
											<div class="col-sm-1">
												<p><?php print $lang_shop['edit']; ?></p>
												<button name="save" type="submit" class="btn btn-primary"><?php print $lang_shop['save']; ?></button>
											</div>
											<div class="col-sm-2">
												<p><?php print $lang_shop['delete']; ?></p>
												<button class="btn btn-danger" type="button" data-toggle="collapse" data-target="#delete-<?php print $category['id']; ?>" aria-expanded="true"><?php print $lang_shop['delete']; ?></button>
											</div>
										</div>
										<div class="collapse" id="delete-<?php print $category['id']; ?>">
											<div class="panel-group" id="accordion">
												<div class="panel panel-collapse">
													<div class="panel-heading">
														<h4 class="panel-title">
															<a data-toggle="collapse" data-parent="#accordion" href="#opton-delete-<?php print $category['id']; ?>-1">
																<?php print $lang_shop['delete-category-and-all-objects']; ?>
															</a>
														</h4>
													</div>
													<div id="opton-delete-<?php print $category['id']; ?>-1" class="collapse in">
														<div class="panel-body">
															<form action="" method="POST" id="form-delete-<?php print $category['id']; ?>-1">
																<input type="hidden" name="delete" value="1">
																<input type="hidden" name="id" value="<?php print $category['id']; ?>">
																<button type="submit" class="btn btn-danger btn-block"><?php print $lang_shop['delete-category-and-all-objects']; ?></button>
															</form>
														</div>
													</div>
												</div>
												<div class="panel panel-collapse">
													<div class="panel-heading">
														<h4 class="panel-title">
															<a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#opton-delete-<?php print $category['id']; ?>-2">
																<?php print $lang_shop['delete-category-and-move-objects']; ?>
															</a>
														</h4>
													</div>
													<div id="opton-delete-<?php print $category['id']; ?>-2" class="collapse">
														<div class="panel-body">
															<form action="" method="POST" id="form-delete-<?php print $category['id']; ?>-2>
																<input type="hidden" name="delete" value="2">
																<input type="hidden" name="id" value="<?php print $category['id']; ?>">
																<div class="row">
																	<div class="col-sm-2"></div>
																	<div class="col-sm-4">
																		<p><?php print $lang_shop['category']; ?></p>
																		<div class="form-group">
																			<select class="select2" name="new_category" required>
																				<?php foreach($categoriesbyid as $key=>$cat) if($key!=$category['id']) print '<option value="'.$cat['id'].'">'.$cat['name'].'</option>'; ?> ?>
																			</select>
																		</div>
																	</div>
																	<div class="col-sm-5">
																		<p><?php print $lang_shop['delete']; ?></p>
																		<button type="submit" class="btn btn-danger btn-block"><?php print $lang_shop['delete-category-and-move-objects']; ?></button>
																	</div>
																</div>
															</form>
														</div>
													</div>
												</div>
											</div>
										</div>
									</form>
                                </div>
								<?php } ?>
                            </div>
                        </div>
					</div>
                </div>