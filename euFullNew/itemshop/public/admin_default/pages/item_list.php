<div class="row mb-4">
    <div class="col-lg-12 col-md-12 mb-md-0 mb-4">
        <div class="card card-secondary">
            <div class="card-header pb-0">
                <h4 class="card-title"><i class="fa fa-list"></i> Item list</h4>
                <br>
                <h6 style="float:right;"></h6>
            </div>
            <div class="card-body">
				<input type="text" placeholder="Serch by vNum" class="form-control" onkeyup="callingtoitemlist(this.value)"><br>
				<div id="item_list"></div>
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
        fetch("<?php print Basic::URL(); ?>?module=item_list&search=" + encodeURIComponent(search) + "&page=" + page + "&per_page=" + perPage)
            .then(function(response) {
                return response.text();
            })
            .then(function(description) {
                var div = document.getElementById('item_list');
                div.innerHTML = description;
            })
            .catch(function(error) {
                console.error("Error:", error);
            });
    }
</script>
