<?php
	if(isset($_POST['id_item_d']))
	{
		Item::DelACP($_POST['id_item_d']);
	}
	if(isset($_POST['save_discount'],$_POST['id_item_discount'],$_POST['percentdisc'], $_POST['discount_expire']))
	{
		Item::Discount($_POST['id_item_discount'], $_POST['percentdisc'], $_POST['discount_expire']);
	}
	if(isset($_POST['promote_id'],$_POST['promote_title'],$_POST['promote_desc'], $_POST['promote_img'], $_POST['promote_offer']) && (isset($_POST['gopromote']) ||  isset($_POST['stopromote'])))
	{
		if(isset($_POST['stopromote']))
			Ads::Remove($_POST['promote_id']);
		elseif(Ads::Exist($_POST['promote_offer']))
			Ads::Add($_POST['promote_id'],$_POST['promote_title'],$_POST['promote_desc'], $_POST['promote_offer'], $_POST['promote_img']);
		else
			Ads::Edit($_POST['promote_id'],$_POST['promote_title'],$_POST['promote_desc'], $_POST['promote_img']);
	}
?>
<div class="row mb-4">
	<div class="col-lg-12 col-md-12 mb-md-0 mb-4">
		<div class="card card-secondary">
			<div class="card-header pb-0">
				<h4 class="card-title"><i class="fa fa-list"></i> Shop items</h4>
				<br>
				<h6 style="float:right;"></h6>
			</div>
			<div class="card-body">
				<input type="text" placeholder="Serch by vNum" class="form-control" onkeyup="callingtoitemlist(this.value)"><br>
				<div id="shop-items"></div>
			</div>
		</div>
	</div>
</div>

<script>
	let currentPage = 1;
	let itemsPerPage = 50;
	itemlist('null', currentPage, itemsPerPage);
	function callingtoitemlist(val)
	{
		if (val === '')
			itemlist('null', currentPage, itemsPerPage);
		else
			itemlist(val, currentPage, itemsPerPage);
	}
	function itemlist(search, page, perPage) {
		fetch("<?php print Basic::URL(); ?>?module=shop_items&search=" + encodeURIComponent(search) + "&page=" + page + "&per_page=" + perPage)
			.then(function(response) {
				return response.text();
			})
			.then(function(description) {
				var div = document.getElementById('shop-items');
				div.innerHTML = description;
			})
			.catch(function(error) {
				console.error("Error:", error);
			});
	}
</script>