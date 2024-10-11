				<div class="card">
                    <div class="card__header">
                        <h2>Item Proto</h2>
                    </div>

                    <div class="card__body">
						<div class="row">
                            <div class="col-sm-4">
                                <p>item_proto.txt - <?php print $last_update['item_proto']; ?></p>
								<form id="item1" action="" method="POST" enctype="multipart/form-data">
									<div class="fileinput fileinput-new" data-provides="fileinput">
										<span class="btn btn-default btn-file">
											<span class="fileinput-new">Select file</span>
											<span class="fileinput-exists">Change</span>
											<input type="hidden" value="" name="..."><input type="file" name="file" id="file" required>
										</span>
										<span class="fileinput-filename"></span>
										<a href="#" class="fileinput__close fileinput-exists" data-dismiss="fileinput">
											<i class="zmdi zmdi-close-circle"></i>
										</a>
									</div>
									<input type="hidden" name="upload" value="ok">
									<button class="btn btn-primary" type="submit" name="item_proto">Upload</button>
								</form>
                            </div>
                            <div class="col-sm-4">
                                <p>blend.txt - <?php print $last_update['blend']; ?></p>
								<form id="item2" action="" method="POST" enctype="multipart/form-data">
									<div class="fileinput fileinput-new" data-provides="fileinput">
										<span class="btn btn-default btn-file">
											<span class="fileinput-new">Select file</span>
											<span class="fileinput-exists">Change</span>
											<input type="hidden" value="" name="..."><input type="file" name="file" id="file" required>
										</span>
										<span class="fileinput-filename"></span>
										<a href="#" class="fileinput__close fileinput-exists" data-dismiss="fileinput">
											<i class="zmdi zmdi-close-circle"></i>
										</a>
									</div>
									<input type="hidden" name="upload" value="ok">
									<button class="btn btn-primary" type="submit" name="blend">Upload</button>
								</form>
                            </div>
                            <div class="col-sm-4">
                                <p>item_list.txt - <?php print $last_update['item_list']; ?></p>
								<form id="item2" action="" method="POST" enctype="multipart/form-data">
									<div class="fileinput fileinput-new" data-provides="fileinput">
										<span class="btn btn-default btn-file">
											<span class="fileinput-new">Select file</span>
											<span class="fileinput-exists">Change</span>
											<input type="hidden" value="" name="..."><input type="file" name="file" id="file" required>
										</span>
										<span class="fileinput-filename"></span>
										<a href="#" class="fileinput__close fileinput-exists" data-dismiss="fileinput">
											<i class="zmdi zmdi-close-circle"></i>
										</a>
									</div>
									<input type="hidden" name="upload" value="ok">
									<button class="btn btn-primary" type="submit" name="item_list">Upload</button>
								</form>
                            </div>
						</div>
						<hr>
						<div class="row">
                            <div class="col-sm-4">
                                <p>item_names.txt - <?php print $last_update['item_names']; ?></p>
								<form id="item2" action="" method="POST" enctype="multipart/form-data">

									<div class="form-group">
										<select class="select2" name="lang">
											<?php foreach($languages as $lang => $name) { ?>
											<option value="<?php print $lang; ?>"<?php if($lang=="en") print ' selected'; ?>>[<?php print $lang.'] '.$name; ?></option>
											<?php } ?>
										</select>
									</div>

									<div class="fileinput fileinput-new" data-provides="fileinput">
										<span class="btn btn-default btn-file">
											<span class="fileinput-new">Select file</span>
											<span class="fileinput-exists">Change</span>
											<input type="hidden" value="" name="..."><input type="file" name="file" id="file" required>
										</span>
										<span class="fileinput-filename"></span>
										<a href="#" class="fileinput__close fileinput-exists" data-dismiss="fileinput">
											<i class="zmdi zmdi-close-circle"></i>
										</a>
									</div>
									<input type="hidden" name="upload" value="ok">
									<button class="btn btn-primary" type="submit" name="item_names">Upload</button>
								</form>
                            </div>
                            <div class="col-sm-4">
                                <p>itemdesc.txt - <?php print $last_update['itemdesc']; ?></p>
								<form id="item2" action="" method="POST" enctype="multipart/form-data">

									<div class="form-group">
										<select class="select2" name="lang">
											<?php foreach($languages as $lang => $name) { ?>
											<option value="<?php print $lang; ?>"<?php if($lang=="en") print ' selected'; ?>>[<?php print $lang.'] '.$name; ?></option>
											<?php } ?>
										</select>
									</div>

									<div class="fileinput fileinput-new" data-provides="fileinput">
										<span class="btn btn-default btn-file">
											<span class="fileinput-new">Select file</span>
											<span class="fileinput-exists">Change</span>
											<input type="hidden" value="" name="..."><input type="file" name="file" id="file" required>
										</span>
										<span class="fileinput-filename"></span>
										<a href="#" class="fileinput__close fileinput-exists" data-dismiss="fileinput">
											<i class="zmdi zmdi-close-circle"></i>
										</a>
									</div>
									<input type="hidden" name="upload" value="ok">
									<button class="btn btn-primary" type="submit" name="itemdesc">Upload</button>
								</form>
                            </div>
                            <div class="col-sm-4">
                                <p>locale_game.txt - <?php print $last_update['locale_game']; ?></p>
								<form id="item2" action="" method="POST" enctype="multipart/form-data">

									<div class="form-group">
										<select class="select2" name="lang">
											<?php foreach($languages as $lang => $name) { ?>
											<option value="<?php print $lang; ?>"<?php if($lang=="en") print ' selected'; ?>>[<?php print $lang.'] '.$name; ?></option>
											<?php } ?>
										</select>
									</div>

									<div class="fileinput fileinput-new" data-provides="fileinput">
										<span class="btn btn-default btn-file">
											<span class="fileinput-new">Select file</span>
											<span class="fileinput-exists">Change</span>
											<input type="hidden" value="" name="..."><input type="file" name="file" id="file" required>
										</span>
										<span class="fileinput-filename"></span>
										<a href="#" class="fileinput__close fileinput-exists" data-dismiss="fileinput">
											<i class="zmdi zmdi-close-circle"></i>
										</a>
									</div>
									<input type="hidden" name="upload" value="ok">
									<button class="btn btn-primary" type="submit" name="locale_game">Upload</button>
								</form>
                            </div>
                        </div>
						<hr>
						<div class="row">
                            <div class="col-sm-4">
                                <p>mob_names.txt - <?php print $last_update['mob_names']; ?></p>
								<form id="item2" action="" method="POST" enctype="multipart/form-data">
									<div class="form-group">
										<select class="select2" name="lang">
											<?php foreach($languages as $lang => $name) { ?>
											<option value="<?php print $lang; ?>"<?php if($lang=="en") print ' selected'; ?>>[<?php print $lang.'] '.$name; ?></option>
											<?php } ?>
										</select>
									</div>

									<div class="fileinput fileinput-new" data-provides="fileinput">
										<span class="btn btn-default btn-file">
											<span class="fileinput-new">Select file</span>
											<span class="fileinput-exists">Change</span>
											<input type="hidden" value="" name="..."><input type="file" name="file" id="file" required>
										</span>
										<span class="fileinput-filename"></span>
										<a href="#" class="fileinput__close fileinput-exists" data-dismiss="fileinput">
											<i class="zmdi zmdi-close-circle"></i>
										</a>
									</div>
									<input type="hidden" name="upload" value="ok">
									<button class="btn btn-primary" type="submit" name="mob_names">Upload</button>
								</form>
                            </div>
							<?php if(false) { ?>
                            <div class="col-sm-4">
                                <p>skilldesc.txt</p>
								<form id="item2" action="" method="POST" enctype="multipart/form-data">
									<div class="form-group">
										<select class="select2" name="lang">
											<?php foreach($languages as $lang => $name) { ?>
											<option value="<?php print $lang; ?>"<?php if($lang=="en") print ' selected'; ?>>[<?php print $lang.'] '.$name; ?></option>
											<?php } ?>
										</select>
									</div>

									<div class="fileinput fileinput-new" data-provides="fileinput">
										<span class="btn btn-default btn-file">
											<span class="fileinput-new">Select file</span>
											<span class="fileinput-exists">Change</span>
											<input type="hidden" value="" name="..."><input type="file" name="file" id="file" required>
										</span>
										<span class="fileinput-filename"></span>
										<a href="#" class="fileinput__close fileinput-exists" data-dismiss="fileinput">
											<i class="zmdi zmdi-close-circle"></i>
										</a>
									</div>
									<input type="hidden" name="upload" value="ok">
									<button class="btn btn-primary" type="submit" name="skilldesc">Upload</button>
								</form>
                            </div>
							<?php } ?>
                        </div>
                    </div>
                </div>