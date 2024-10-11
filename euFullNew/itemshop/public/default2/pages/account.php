<div class="page">
	<div class="itemlistbg" style="display: block;">
		<div class="sidemenu">
			<div class="category active" id="cat_transaction_history">
				<span>
					<div class="categoryiconbox"><span class="categoryicon">c</span></div>
					<?=l(79);?>
				</span>
			</div>
		</div>
		<div class="items">
			<div id="transaction_history"  style="width:100%">
				<?php Requests::Transactions('transactions',User::Username($_SESSION['id'])); ?>
			</div>
		</div>
	</div>
</div>