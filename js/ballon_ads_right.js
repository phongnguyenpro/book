$(document).ready(function() {
	var AD_WIDTH = 300;
	var AD_HEIGHT = 250;
	var AD_MIN_HEIGHT = 25;
	
	var AD_BUTTON = 'http://cohet.tv/ajs/button.png'; 
	var AD_IMG = 'http://thichdoctruyen.com/images/w88.gif';
	var AD_LINK = 'https://www.w88wap.com/Promotions.aspx?affiliateid=2410#NEW_MEMBER';

	var balloon = '<div class="ballon_wapper_1" style="position: fixed; bottom: 0px; right: 0px; z-index: 999; width:'+AD_WIDTH+'px; height:'+AD_MIN_HEIGHT+'px">';
	balloon += '<a target="_blank" href="'+ AD_LINK +'"><img src="'+ AD_IMG +'"/></a>';
	balloon += AD_IMG;
	balloon += '<div class="marquee_ads_1" style="display:none; position: absolute; top:0px;width:'+AD_WIDTH+'px;height:25px;z-index: 998; background:#333;"><marquee style="margin: 5px;margin-right: 30px;font-family: arial;color: #fff;font-size: 12px;" scrollamount="3" behavior="scroll" direction="left">Ads by Thichdoctruyen</marquee></div>';
	balloon += '<span class="close_ads_1" state="open" style="position: absolute; top:3px; z-index: 999; padding: 10px; cursor:pointer; right:0px; background-image: url('+AD_BUTTON+'); background-repeat: no-repeat; overflow: hidden; background-position: 0 0;"></span>';
	balloon += '</div>';
	$('body').append(balloon);
	$('.ballon_wapper_1').animate({height:250},500);
	// END ADS ///
	$(document).on('click', '.close_ads_1', function() {
		if($('.close_ads_1').attr('state')=='open'){
			$('.close_ads_1').css('background-position', '0px -22px');
			$('.marquee_ads_1').css('display', 'block');
			$('.close_ads_1').attr('state', 'close');
			$('.ballon_wapper_1').animate({height:25});
		}
		else
		{
			$('.close_ads_1').css('background-position', '0px 0px');
			$('.close_ads_1').attr('state', 'open');
			$('.ballon_wapper_1').animate({height:250});
			$('.marquee_ads_1').css('display', 'none');
		}
	});
	// END CLOSE EVENT //
	var myVar = setInterval(function(){myTimer()},1000);
	t1 = 30;
	function myTimer()
	{
		t1 = parseInt(t1 - 1);
		if(t1==0)
		{
			$('.close_ads_1').css('background-position', '0px -22px');
			$('.close_ads_1').attr('state', 'close');
			$('.marquee_ads_1').css('display', 'block');
			$('.ballon_wapper_1').animate({height:25});
		}
	}
});
