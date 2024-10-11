<?php
	session_start();
	
	header('Cache-control: private');
	include 'config.php';
	include 'include/functions/items.php';
	include 'include/functions/language.php';
	
	$login = isset($_GET['login']) ? $_GET['login'] : null;
	if($login==null)
		die();
	
	require_once("include/classes/Medoo.php");
	require_once("include/classes/Shop.php");
	
	use Medoo\Medoo;
	
	$shop_db = new Medoo([
		'database_type' => 'mysql',
		'database_name' => $shop_mysql['database'],
		'server' => $shop_mysql['host'],
		'username' => $shop_mysql['user'],
		'password' => $shop_mysql['password']
	]);
	
	$shop = new Shop($shop_db);
	$settingsDB = $shop->getSettings();
	$paypal_email = $settingsDB['paypal']['value'];
	$epayouts_uid = $settingsDB['epayouts_uid']['value'];
	$epayouts_mid = $settingsDB['epayouts_mid']['value'];
	$happy_hour_discount = $settingsDB['discount']['value'];
	$happy_hour_expire = strtotime($settingsDB['discount']['date'])-$shop->currentTime();
	if($happy_hour_discount && $happy_hour_expire<0)
	{
		$happy_hour_discount = 0;
		$shop->stopHappyHour();
	}
	//$paypal_link = 'https://www.sandbox.paypal.com/cgi-bin/webscr';
	$paypal_link = 'https://www.paypal.com/cgi-bin/webscr';
	$paypal_link .= "?business=".urlencode($paypal_email)."&amp;";
	$paypal_link .= "cmd=".urlencode(stripslashes("_xclick"))."&amp;";
	$paypal_link .= "no_note=".urlencode(stripslashes("1"))."&amp;";
	$paypal_link .= "currency_code=".urlencode(stripslashes("EUR"))."&amp;";
	$paypal_link .= "bn=".urlencode(stripslashes("PP-BuyNowBF:btn_buynow_LG.gif:NonHostedGuest"))."&amp;";
	$paypal_link .= "first_name=".urlencode(stripslashes($login))."&amp;";
	$paypal_link .= "return=".urlencode(stripslashes($shop_url))."&amp;";
	$paypal_link .= "cancel_return=".urlencode(stripslashes($shop_url))."&amp;";
	$paypal_link .= "notify_url=".urlencode($shop_url."?p=paypal")."&amp;";
	$paypal_link .= "custom=".urlencode($login)."&amp;";

	print '<?xml version="1.0" encoding="utf-8"?>';
?>
<formresult xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <version>3</version>
  <context>  
    <settings>    
      <frontend_type>frontend3</frontend_type>
      <gamename><?php print $shop_title; ?></gamename>
      <productname><?php print $lang_shop['coins']; ?></productname>
      <language>en_GB</language>
      <page_direction>ltr</page_direction>
      <single_line_badge>true</single_line_badge>
      <preselection_targetgroup>no_preselection</preselection_targetgroup>
      <appt_category>default</appt_category>
      <appt_design>1</appt_design>
      <normal_categories_scrollbars>1</normal_categories_scrollbars>
      <normal_categories_startposition>0</normal_categories_startposition>
      <iovation_activated>0</iovation_activated>
    </settings>
    <categories>
<?php
	$i=0;
	$prices = $shop->getAllDonatePrices();
	$check_payments = array_fill(0, count($payment_names), false);
	foreach($prices as $key => $row) {
		$i++;
		$first_item = reset($row);
		$price = $first_item['amount'];
		$coins = $first_item['value'];
		if($happy_hour_discount)
			$coins = $coins + round($coins*$happy_hour_discount/100);
	?>
      <category
       type="normal"
       default="false"
       locked="false"
      >      
        <slot_id><?php print $i; ?></slot_id>
        <realprice><?php print $price; ?></realprice>
        <realcurrency>€</realcurrency>
        <smallprice/>
		<?php if($happy_hour_discount) { ?>
        <smallcurrency/><badge type="percent">+<?php print $happy_hour_discount; ?></badge>
		<?php } ?>
        <tariffs>
		<?php
			foreach($row as $item) {
				$check_payments[$item['type']] = true;
				if($item['type']==0)
				{
					$paypal_link_add = "item_name=".urlencode($item['value'].' '.$lang_shop['coins'])."&amp;";
					$paypal_link_add .= "amount=".urlencode($item['amount'])."&amp;";
					$paypal_link_add .= "item_number=".urlencode($item['id']);
				}
		?>
          <tariff methodid="<?php print $item['type']+1; ?>" default="false">          
            <tariff_id><?php print $key.($item['type']+1); ?></tariff_id>
            <realprice><?php print $price; ?></realprice>
            <realcurrency>€</realcurrency>
            <realamount><?php print $coins; ?></realamount>
            <amount><?php print $coins; ?></amount>
            <smallprice/>
            <smallcurrency/>
            <orderlink target="<?php if($item['type']==0) print 'popup'; else print 'iframe'; ?>"><?php if($item['type']==0) print $paypal_link.$paypal_link_add; else print 'https://paymentbox.e-payouts.com?uid='.$epayouts_uid.'&amp;mid='.$epayouts_mid.'&amp;ucode='.$login.'&amp;title='.$shop_title.'&amp;pm='.$payment_names[$item['type']][0].'&amp;price='.$price; ?></orderlink>
            <realprice_presentation>%%price%% %%currency%%</realprice_presentation>
            <smallprice_presentation/>
            <tariffbonus>0</tariffbonus>
            <tariff_information/>
          </tariff>
		<?php } ?>
        </tariffs>
        <amount><?php print $coins; ?></amount>
        <oldamount>0</oldamount>
        <realprice_presentation>%%price%% %%currency%%</realprice_presentation>
        <smallprice_presentation/>
      </category>
<?php } ?>
    </categories>
    <methods>
	<?php foreach($payment_names as $key => $item)
			if($check_payments[$key]) {
	?>
      <method type="" locked="false">      
        <method_id><?php print $key+1; ?></method_id>
        <methodname><?php print $item[1]; ?></methodname>
        <spritepos><?php print $item[2]; ?></spritepos>
        <methodslot_id>1</methodslot_id>
      </method>
	<?php } ?>
    </methods>
    <footer>    
      <footerlink type="normal">      
        <text><?php print $lang_shop['site_title']; ?></text>
        <title><?php print $lang_shop['site_title']; ?></title>
        <link><?php print $shop_url; ?></link>
      </footerlink>
    </footer>
    <loca_keys>    
      <text forkey="frontend#text:company"><?php print $shop_title; ?>. All rights reserved</text>
      <text forkey="frontend#text:accept_terms"><?php print $lang_shop['accept_terms']; ?></text>
      <text forkey="frontend#text:activateSpecialMethods">Click here if you want to pay %%paymethod%%.</text>
      <text forkey="frontend#text:amount_per_currency">%%product_price%% %%product_currency%%</text>
      <text forkey="frontend#text:back"><?php print $lang_shop['back']; ?></text>
      <text forkey="frontend#text:back_to_shop">Back to offers</text>
      <text forkey="frontend#text:badge_tooltip">%%percent%%% <?php print $lang_shop['coins']; ?> per 1 %%currency%% in comparison to the lowest alternative offer.</text>
      <text forkey="frontend#text:badge_tooltip_dynamic_campaign">+%%percent%%% more <?php print $lang_shop['coins']; ?></text>
      <text forkey="frontend#text:badge_tooltip_tg5">%%percent%%% <?php print $lang_shop['coins']; ?> per 1 %%currency%% in comparison to the lowest alternative offer.</text>
      <text forkey="frontend#text:bonus">Bonus</text>
      <text forkey="frontend#text:bonus_uppercase"/>
      <text forkey="frontend#text:cart_contentbox_headline">Contents</text>
      <text forkey="frontend#text:categorylocked">This tariff is not available right now.</text>
      <text forkey="frontend#text:categorylocked_description">Your previous payment failed. As the result of a problem, this tariff is no longer available for use. Please do not hesitate to contact Support if you require more assistance.</text>
      <text forkey="frontend#text:chooseMethod"><?php print $lang_shop['chooseMethod']; ?></text>
      <text forkey="frontend#text:chooseSpecialMethod">Select a %%paymethod%% offer!</text>
      <text forkey="frontend#text:chooseTariff"><?php print $lang_shop['chooseTariff']; ?></text>
      <text forkey="frontend#text:combine">Find the best combination of offer and payment method.</text>
      <text forkey="frontend#text:counter">time left</text>
      <text forkey="frontend#text:country">Country:</text>
      <text forkey="frontend#text:couponenter">Enter code</text>
      <text forkey="frontend#text:couponpartner">Partner:</text>
      <text forkey="frontend#text:couponsubmit">Redeem coupon</text>
      <text forkey="frontend#text:coupontitle">Redeem coupon</text>
      <text forkey="frontend#text:coupon_button">Offer as a gift</text>
      <text forkey="frontend#text:deactivatedDirectOrderTile_coupon">Redeem coupon</text>
      <text forkey="frontend#text:deactivatedDirectOrderTile_sponsored">Earn <?php print $lang_shop['coins']; ?></text>
      <text forkey="frontend#text:footer_copyright">© %%year%% %%company%%</text>
      <text forkey="frontend#text:footer_imprint_text">Legal</text>
      <text forkey="frontend#text:footer_imprint_title">Legal</text>
      <text forkey="frontend#text:footer_privacy_text">Privacy</text>
      <text forkey="frontend#text:footer_privacy_title">Privacy</text>
      <text forkey="frontend#text:footer_support_text">Support</text>
      <text forkey="frontend#text:footer_support_title">Support</text>
      <text forkey="frontend#text:footer_tos_text">T&amp;Cs and Right of Cancellation</text>
      <text forkey="frontend#text:footer_tos_title">T&amp;Cs and Right of Cancellation</text>
      <text forkey="frontend#text:for"><?php print $lang_shop['for']; ?></text>
      <text forkey="frontend#text:free">free</text>
      <text forkey="frontend#text:free_uppercase"/>
      <text forkey="frontend#text:from">starting at</text>
      <text forkey="frontend#text:information_checkout">On 13th June 2014 there was a change in the law which allows customers to claim back their money for digital goods or services although they had already been made use of or used up. This has led to a major increase in abuse relating to the purchase of digital goods. As a result, we must unfortunately request that you waive your right to cancellation when making purchases in our store, so as to avoid financial ramifications for ourselves and our customers. Without these measures it would soon be necessary for us to increase our prices, which is in the interests of neither ourselves nor our customers.
Thank you for your understanding.</text>
      <text forkey="frontend#text:infoXml_technicalError">A technical error occurred. Please try again later.</text>
      <text forkey="frontend#text:infoXml_technicalError_deleted"/>
      <text forkey="frontend#text:infoXml_title_information">Information</text>
      <text forkey="frontend#text:methodhelp">Information about %%paymethod%%</text>
      <text forkey="frontend#text:methodlocked"><?php print $lang_shop['methodlocked']; ?></text>
      <text forkey="frontend#text:methodlocked_description">Your previous payment using this payment method failed. As the result of a problem, this payment method is no longer available for use. Please do not hesitate to contact Support if you require more assistance.</text>
      <text forkey="frontend#text:methodnotsupported"><?php print $lang_shop['methodnotsupported']; ?> %%paymethod%%.</text>
      <text forkey="frontend#text:more">more</text>
      <text forkey="frontend#text:notice_currency_dollar">Unfortunately you cannot pay in your native currency with the selected payment method. Therefore you will find the price of your purchase below in US Dollars.</text>
      <text forkey="frontend#text:notice_currency_euro">Unfortunately you cannot pay in your native currency with the selected payment method. Therefore you will find the price of your purchase below in Euros.</text>
      <text forkey="frontend#text:notice_currency_local">With the selected payment method you can pay in your national currency. The cost of your purchase will thus be displayed in your currency.
As a result of fluctuating exchange rates, the actual price may differ from the amount displayed above.</text>
      <text forkey="frontend#text:notice_error">Unfortunately the payment method you selected is currently unavailable. Please try again later.</text>
      <text forkey="frontend#text:notice_phone">Simply pay using your mobile or home telephone – the amount will be deducted from your next bill or your prepaid balance.</text>
      <text forkey="frontend#text:notice_sms">Simply pay using your mobile – the amount will be deducted from your next bill or your prepaid balance.</text>
      <text forkey="frontend#text:order">Order</text>
      <text forkey="frontend#text:order_btn_error">Unfortunately the payment method you selected is currently unavailable. Please try again later.</text>
      <text forkey="frontend#text:order_btn_title"><?php print $lang_shop['buy-now']; ?></text>
      <text forkey="frontend#text:payment_method_type:lastschrift">Direct debit</text>
      <text forkey="frontend#text:paymethod">Payment method</text>
      <text forkey="frontend#text:paysafecard_shopfinder">Get the best premium payout via paysafecard. Available in your city!</text>
      <text forkey="frontend#text:per">via</text>
      <text forkey="frontend#text:per_coupon">via coupon</text>
      <text forkey="frontend#text:per_internetplus">via Internet+</text>
      <text forkey="frontend#text:per_offer">Get yours!</text>
      <text forkey="frontend#text:per_prepaid">via prepaid service</text>
      <text forkey="frontend#text:per_sms">via SMS</text>
      <text forkey="frontend#text:per_sms-BE">Pay by mobile</text>
      <text forkey="frontend#text:per_sms-US">Pay by mobile</text>
      <text forkey="frontend#text:per_telephone">via telephone</text>
      <text forkey="frontend#text:pprt_infotooltip">&lt;span id=&quot;pprt_tooltip_headline&quot;&gt;PayPal QuickPay&lt;/span&gt;
&lt;br/&gt;&lt;br/&gt;
PayPal QuickPay makes payments even easier.
&lt;br/&gt;&lt;br/&gt;
If you decide to use PayPal QuickPay, you will only need to log into PayPal as usual during your next purchase. After that, you'll be able to make PayPal payments in our shop without having to log in again.
&lt;br/&gt;&lt;br/&gt;&lt;br/&gt;
- You can cancel your PayPal QuickPay consent here in the shop or in your PayPal account at any time&lt;br/&gt;
- Your PayPal login credentials will &lt;u&gt;not&lt;/u&gt; be saved on our system</text>
      <text forkey="frontend#text:pprt_method_name">PayPal QuickPay Activated</text>
      <text forkey="frontend#text:pprt_method_name_inactive">Activate PayPal QuickPay</text>
      <text forkey="frontend#text:pprt_method_title">PayPal – Now Even Easier</text>
      <text forkey="frontend#text:price">Price</text>
      <text forkey="frontend#text:product">Offer</text>
      <text forkey="frontend#text:redirect1"><?php print $lang_shop['redirect1']; ?> %%paymethod%%.</text>
      <text forkey="frontend#text:redirect2">Caution!</text>
      <text forkey="frontend#text:redirect3"><?php print $lang_shop['redirect3']; ?></text>
      <text forkey="frontend#text:redirect4Button"><?php print $lang_shop['redirect4Button']; ?> %%paymethod%%</text>
      <text forkey="frontend#text:rightofwithdrawal_information">
		I agree to the immediate contractual execution through <?php print $shop_title; ?> and know that in doing so, I waive all claim to my right of cancellation.
      </text>
      <text forkey="frontend#text:showPosibities">Click on this payment method to see all supported offers.</text>
      <text forkey="frontend#text:specialmethod">special method</text>
      <text forkey="frontend#text:sponsor_payments_offer">Earn <?php print $lang_shop['coins']; ?></text>
      <text forkey="frontend#text:step1"><?php print $lang_shop['step1']; ?></text>
      <text forkey="frontend#text:step2"><?php print $lang_shop['step2']; ?></text>
      <text forkey="frontend#text:step3"><?php print $lang_shop['step3']; ?></text>
      <text forkey="frontend#text:tariffnotsupported"><?php print $lang_shop['tariffnotsupported']; ?></text>
      <text forkey="frontend#text:tariff_information_cc">We work together with a European credit card company when processing credit card payments. As a result, your bank may charge you 1-3% fees for a transaction. For this reason, we are granting you a 3% discount to help cover possible fees.</text>
      <text forkey="frontend#text:tax">All prices listed include VAT</text>
      <text forkey="frontend#text:terms_information">By clicking on 'Buy now' I consent to the immediate implementation of the contract by <?php print $shop_title; ?> and know that I hereby lose my right of cancellation.</text>
      <text forkey="frontend#text:title">Welcome to <?php print $shop_title; ?>-Shop</text>
      <text forkey="frontend#text:TitleBig"><?php print $lang_shop['coins']; ?></text>
      <text forkey="frontend#text:TitleSmall">simple and secure shopping</text>
      <text forkey="frontend#text:topmethods"><?php print $lang_shop['topmethods']; ?></text>
      <text forkey="frontend#text:total">Total amount</text>
      <text forkey="frontend#text:twopaytitle">2 Pay payment methods</text>
      <text forkey="frontend#text:type_any_phone">Mobile and landline</text>
      <text forkey="frontend#text:type_coupon">Coupon</text>
      <text forkey="frontend#text:type_internetplus">Internet+</text>
      <text forkey="frontend#text:type_landline_telephone">Landline phone</text>
      <text forkey="frontend#text:type_mobile_phone">Mobile phone</text>
      <text forkey="frontend#text:type_prepaid">Prepaid</text>
      <text forkey="frontend#text:type_sms">SMS</text>
      <text forkey="frontend#text:type_sms-BE">Mobile</text>
      <text forkey="frontend#text:type_sms-US">Mobile</text>
      <text forkey="frontend#text:type_telephone">Telephone</text>
      <text forkey="frontend#text:upto">up to</text>
      <text forkey="frontend#text:uptoforfree">Top payment methods (%%amount%% <?php print $lang_shop['coins']; ?> free)</text>
      <text forkey="frontend#text:with_partner">with %%paymentPartner%%</text>
      <text forkey="frontend#text:sponsor_payments_offer">Earn <?php print $lang_shop['coins']; ?></text>
      <text forkey="frontend#text:with_partner">with %%paymentPartner%%</text>
    </loca_keys>
    <banner>    
      <infobanner/>
      <campaignbanner/>
    </banner>
  </context>
</formresult>