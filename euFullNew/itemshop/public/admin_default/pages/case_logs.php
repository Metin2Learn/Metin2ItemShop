<div class="row mb-4">
    <div class="col-lg-12 col-md-12 mb-md-0 mb-4">
        <div class="card card-secondary">
            <div class="card-header pb-0">
                <h4 class="card-title"><i class="fa fa-history"></i> Case logs</h4>
                <br>
                <h6 style="float:right;"></h6>
            </div>
            <div class="card-body">
                <input type="text" placeholder="Search by player username" class="form-control" onkeyup="callingtocaselogs(this.value)"><br>
                <div id="caselogs"></div>
            </div>
        </div>
    </div>
</div>

<script>
    let currentPage = 1;
    let itemsPerPage = 10;
    caselogs('null', currentPage, itemsPerPage);

    function callingtocaselogs(val) {
        if (val === '')
            caselogs('null', currentPage, itemsPerPage);
        else
            caselogs(val, currentPage, itemsPerPage);
    }

    function caselogs(search, page, perPage) {
        fetch("<?php print Basic::URL(); ?>?module=case_logs&search=" + encodeURIComponent(search) + "&page=" + page + "&per_page=" + perPage)
            .then(function(response) {
                return response.text();
            })
            .then(function(description) {
                var div = document.getElementById('caselogs');
                div.innerHTML = description;
            })
            .catch(function(error) {
                console.error("Error:", error);
            });
    }
</script>