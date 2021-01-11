<?php
	include "connectdb.php";

	$sql = mysqli_query($link, 'SELECT * FROM `products`');
	while ($result = mysqli_fetch_array($sql)) {
		echo "
		<div class='tov tov-{$result['id']}'>
			<a href='#' class='buket-name-link buket-info' rel='289'>{$result['title']}
				<span class='page_t_h1'><span></span></span>
			</a>
			<div class='tov_relative'>      
				<div class='tov-img' rel='0'>
					<a href='#' class='buket-info' rel='289'>
						<img class='active lazy' src='' data-src='{$result['img1']}' alt=''>
						<img class='lazy' src='' data-src='{$result['img2']}' alt=''>
					</a>
				</div>
				<div class='tov-price disc'>
					<span>Цена</span>
					<div class='price-curr'>{$result['price']} Р</div>
				</div>
				<div class='tov-size'>
					<div class='tov-size-w'>{$result['width']} см </div>
					<div class='tov-size-h'>{$result['height']} см</div>
				</div>
				<a class='btn-cov fast-order-button is_monobuket_0' rel='289'><span class='btn btn-red'>заказать<img class='lazy' src='' data-src='/svg/basket.svg?ver1.0' alt=''></span></a>
				<a href='#' class='fav ' rel='289'>в избранное</a>
				<div class='labl labl2'>{$result['labl']}</div>
			</div>
		</div>";
	}
?>