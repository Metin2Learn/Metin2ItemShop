<div class="page">
	<div class="itemlistbg" style="display: block;">
		<div class="sidemenu">
			<div class="category active" id="category_id_0" onclick="changecategory(0);">
				<span>
					<div class="categoryiconbox"><span class="categoryicon">T</span></div>
					<?=l(2); ?>
				</span>
			</div>
			<?php 
				$categories = array();
				$categories = Categories::Get();
				foreach($categories as $c)
				{
					?>
			<div class="category" id="category_id_<?=$c['id']?>" onclick="changecategory(<?=$c['id']?>);">
				<span>
					<div class="categoryiconbox"><span class="categoryicon"><?=Categories::Language($c['name'])[0]; ?></span></div>
					<?=Categories::Language($c['name']); ?>
				</span>
			</div>
			<?php
				}
				
				?>
		</div>
		<div class="items">
			<div id="showitems"></div>
		</div>
	</div>
</div>