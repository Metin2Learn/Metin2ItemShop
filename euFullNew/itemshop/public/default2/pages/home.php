<div class="home">
	<div class="slideshow-container">
		<?php
			foreach(User_Shop::Offers() as $of)
			{
				?>
				<div class="mySlides fade">
					<img src="<?=$of['image'];?>" style="width:100%">
					<a onclick="iwanttobuy('<?=$of['offer'];?>');">
						<div class="coinbuynew">
							<div class="ico">s</div>
							<div class="textua"><?=l(10); ?></div>
						</div>
					</a>
					<div class="text">
						<?=$of['title'];?>
						<div class="text2"><?=$of['desc'];?></div>
					</div>
				</div>
				<?php
			}
		
		?>
		<a class="prev" onclick="plusSlides(-1)"><i style="margin-top:150px;" class="fa fa-arrow-left"></i></a>
		<a class="next" onclick="plusSlides(1)"><i style="margin-top:150px;" class="fa fa-arrow-right"></i></a>
		<div class="navigationdots">
			<?php $varsofsliders = 0; foreach(User_Shop::Offers() as $of) { $varsofsliders++; ?>
			<span class="dot" onclick="currentSlide(<?=$varsofsliders; ?>)"></span>
			<?php } ?>
		</div>
	</div>
	<div class="bottom">
		<div class="first">
			<div class="second"></div>
		</div>
		<div class="row items">
		<?php
			$show = array();
			$show = User_Shop::ItemsCategories(0);
			if(count($show)<1) 
				print '<div class="alert alert-info" style="width:100%;">'.l(11).'</div>';
			else
			{
				foreach($show as $item)
				{
					?>
					<div class="sellbox" data-item="<?=$item['vnum'];?>" data-category="<?=$item['category'];?>" data-keywords="<?=$item['vnum'];?><?=$item['category'];?>" onclick="iwanttobuy(<?=$item['id'];?>);">
						<div class="title"><?=Item::Name($item['vnum']);?></div>
						<div class="blackbox">
							<div class="row">
								<div class="col-sm first">
									<div class="coincost"><span class="coins"><?= Item::Price($item['id']); ?></span><img src="<?=Theme::StylePath(); ?>img/shadowed_coin.png"></div>
									<?php if($item['discount']>0) print '<span class="badge badge-danger" style="font-size:12px;margin-top:15px;margin-left:40px;position:absolute;">-'.$item['discount'].'%</span>';?>
								</div>
								<div class="col-sm second">
									
									<img onload="const width = this.naturalWidth;const height = this.naturalHeight;const widthas = this.naturalWidth-1;if (width === height || widthas === height) {this.style.width = width * 2 + 'px';this.style.height = height * 2 + 'px';this.style.marginTop = '20px';};this.style.marginLeft = '10px';" style="width:auto;" src="<?=Basic::URL().'style/universal/'.Item::Image($item['vnum']);?>">
								</div>
							</div>
						</div>
					</div>
					<?php 
				}
			}
			?>
			
		</div>
	</div>
</div>
<script>
	var slideIndex = 1;
	
	showSlides(slideIndex);
	
	function plusSlides(n) {
	  showSlides(slideIndex += n);
	}
	
	function currentSlide(n) {
	  showSlides(slideIndex = n);
	}
	
	function showSlides(n) {
	  var i;
	  var slides = document.getElementsByClassName("mySlides");
	  var dots = document.getElementsByClassName("dot");
	  if (n > slides.length) {slideIndex = 1}    
	  if (n < 1) {slideIndex = slides.length}
	  for (i = 0; i < slides.length; i++) {
		  slides[i].style.display = "none";  
	  }
	  for (i = 0; i < dots.length; i++) {
		  dots[i].className = dots[i].className.replace(" active", "");
	  }
	  if (slideIndex - 1 >= 0)
		slides[slideIndex-1].style.display = "block";
	  dots[slideIndex-1].className += " active";
	}
	
	if (sliderInterval)
		clearInterval(sliderInterval);
	
	var sliderInterval = setInterval(function() {
		plusSlides(1)
	}, 15000);
	
	$('.items').slick({
		infinite: true,
		autoplay: true,
		variableWidth: true,
		focusOnSelect: true,
		centerMode: true,
		centerPadding: '20px',
		slidesToShow: 5,
		slidesToScroll: 1,
		prevArrow: '<div class="rsArrow"><div class="rsArrowIcn left"></div></div>',
		nextArrow: '<div class="rsArrow rsRight"><div class="rsArrowIcn"></div></div>'
	});
</script>