<div class="products">
		<?php
			$show = array();
			$show = User_Shop::ItemsCategories(0);
			$limit = 6;
			$start = 0;
			if(count($show)<1) 
				print '<div class="alert alert-info" style="width:100%;">'.l(11).'</div>';
			else
			{
				foreach($show as $item)
				{ 
					
					?>
						<div class="single-product-m">
							<div class="p-inner">
								<div class="p-data">
									<div class="p-img">
										<img class="item_icon467" src="<?=Basic::URL().'style/universal/'.Item::Image($item['vnum']);?>" alt="<?=Item::Name($item['vnum']);?>">
									</div>
									<div class="data-area">
										<a class="strong item_name"><?=Item::Name($item['vnum']);?></a>
										<span>
											<?=Item::Description($item['vnum']);?>
										</span>
									</div>
								</div>
							</div>
							<br>
							<a style="text-decoration: inherit;color: inherit;" onclick="iwanttobuy(<?=$item['id'];?>);">
								<div class="buttons-section-m">
									<div class="buy-small">
										<div class="ins-bs"><b class="pricetag467"><?= Item::Price($item['id']); ?></b></div>
									</div>
								</div>
							</a>
						</div>
					<?php 
					$start++;
					if($start == $limit) break;
				}
			}
			?>
	