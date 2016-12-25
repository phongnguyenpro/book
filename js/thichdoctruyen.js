/*
 * Suggestions
 * Using jQuery, namespace $, required jquery.js, functions.js
 * @Author: quyennb
 */
 
function RegEventForFirst(){		
	var fontchu = 	$.cookie("fontchu");
	var cochu 	=	$.cookie("cochu");
	var maunen 	= 	$.cookie("maunen");
	console.log(fontchu +' - '+cochu+' - '+maunen);
	
	if(maunen != ''){
		//console.log("1");
		$('.boxview').css({'background-color' : maunen});
		//$('.wmainbox').css({'background-color' : maunen});	
	}	
	if(cochu != ''){		
		$('.boxview').css({'font-size' : cochu});
	}
	if(fontchu != ''){		
		$('.boxview').css({'font-family' : fontchu});
	}
}

 
function RegEventForFontChu(){
	
	$("#fontchu").change(function () {
		var fontstr = $('#fontchu').val();				
		$.cookie("fontchu",fontstr,{expires : 1000});			
		$('.boxview').css({'font-family' : fontstr});
    });
}



function RegEventHover(){	

	/*$('.login-attr').hover(function(){
		$('.dropdown-menu-user').css({'display':'block'});
	});//hover
	
	$("body").hover(function (e) {
			$('.dropdown-menu-user').css({'display':'none'});
	});*/
	
	 $('.login-box-ok').hover(function(){
       $(this).find('.dropdown-menu-user').css({'display':'block'});
    }); 
	 $('.login-box-ok').mouseleave(function(){
        $(this).find('.dropdown-menu-user').css({'display':'none'});
    });

}


function RegEventForCochu(){
	$("#cochu").change(function () {				
		//$.cookie("cochu", null, { path: '/' });		
		var cochu = $('#cochu').val()+'px';	
		
		//console.log(cochu);	
		//console.log($.cookie("cochu"));			
		
		$.cookie("cochu",cochu,{expires : 1000});		
		//console.log($.cookie("cochu"));	
		
		$('.boxview').css({'font-size' : cochu});
		
    });
}

function RegEventForMaunen(){
	$("#maunen").change(function () {				
		var maunen = '#'+$('#maunen').val();	
		
		console.log(maunen);	
		console.log($.cookie("maunen"));	
			
		$.cookie("maunen", maunen,{expires : 1000});
		
		console.log($.cookie("maunen"));	
			
		$('.wmainbox').css({'background-color' : maunen});		
		$('.boxview').css({'background-color' : maunen});	
    });
}

/*
 * Quick search friends
 * By QuyenNB
 */
function RegEventForTopSearch(){
	var default_text    = 'Ghé thăm bạn bè',
		hasData         = false,
		childs          = null,
		childidx        = -1,
		suggest_cache   = new Array,
		max_result      = 20,
		suggest_search  = '', 
		keyword_input   = $("#searchbox"),
		search_result   = $('#quick_search_result');
		base_url		= 'http://thichdoctruyen.com/';
		
		if (keyword_input.length == 0) return;
		//keyword_input.example(function() {return $(this).attr('title');}, {className: 'hint'});
		keyword_input.attr("autocomplete", "off");
		
		keyword_input.keyup(function(e) {		    	
			var obj = $(this),
			query = $.trim(obj.val());						
			if(query.length == 0) {								
				// Hide the suggestion box.                        
				search_result.hide();
				search_result.html("khong tim thay ket qua").show();
			} else {					
				if ((e.which != 13) && (e.which != 37) && (e.which != 38) && (e.which != 39) && (e.which != 40)) {
					//getSuggestList(query);
					
					$.ajax({
					   type: "POST",
					   url: base_url + "/actions/ajaxTruyen/ajaxLoadTruyenSuggest.php",
					   data: 'keyword='+ query,
					   success: function(msg){							
							hasData = true;
							childs = search_result.children('li');
							childidx = -1;                       
							//var etext = xss_prevent(query);							
							//console.log(jQuery.parseJSON(msg)); 							
							//addSuggestMember(etext, jQuery.parseJSON(msg));
							addSuggestMember(jQuery.parseJSON(msg));
					   }
					});
				}else{
					if(hasData){
							switch(e.which){
								case 40: //down
										if(childidx < childs.length-1){
												childidx = childidx+1;
												var nextchild = $(childs[childidx]);
												childs.removeClass('result-item-hover');
												nextchild.addClass('result-item-hover');
										}
										break;
								case 38: //up
										if(childidx>0){
												childidx = childidx-1;
												var prevchild = $(childs[childidx]);
												childs.removeClass('result-item-hover');
												prevchild.addClass('result-item-hover');
										} else {
												childs.removeClass('result-item-hover');
												childidx = -1;
										}
										break;
								case 13: //enter
										if (-1 != childidx) {
												var curchild = $(childs[childidx]);
										if(curchild.length > 0){
												document.location = $('a.display_box',curchild).attr('href');
										}
										}
										/*
										else {//jump to search
												var keyword = $.trim(keyword_input.val());
												keyword = keyword.replace(/([?*#<>!$%^&()/]+)/g,"");
												keyword = keyword.replace(/([ ]+)/g," ");
												keyword = keyword.replace(/"/g, '');
												keyword = xss_prevent(keyword);
												if (keyword == default_text){
														keyword_input.focus();
												} else {
														document.location = my_pligg_base+'search/u/' +keyword;
												}
										}*/
										break;
								default:
							}
					}
				}
			}
	});
	
	function addSuggestMember(data) {	
	    username_arr = new Array;
	    avatar_arr = new Array();	
		url_arr = new Array();
	    if (null != data) {
	        $.each(data, function(key, val){				
	        suggest_cache[val.key] = val;				
	        username_arr.push(val.name_story);                
	        avatar_arr.push(val.source_51);
			url_arr.push(val.friendly_url);
	        suggest_search += ""+ val.source_51 + ";";
	        });
	    }
	  //console.log(username_arr);	
	
	   
	    var content = '';
	    var suggest_data_num = 0;
	    var val= '';
	    for(var i = 0 ;i < username_arr.length ; i++) {
	       // if(username_arr[i] != null)
	        //{
	           // if((username_arr[i].indexOf(etext)!= -1) &&(max_result > suggest_data_num))
	           // {
	                suggest_cache[i] = val;
	                content += '<li class="resutl-item"><a href="' + base_url + url_arr[i] +
	                '" id="display_box_' + suggest_data_num + '" class="display_box" ' +
	                'target="_parent" rel="' + username_arr[i] + '">'+
	                '<img class="s-img" width="32" height="32" src="'+ avatar_arr[i] +'" onerror="this.src=\'http://sohaprofile.vcmedia.vn/thumbs/avatars/Gravatar_48.gif\';" />' +
	                '<strong>'+ username_arr[i] +'</strong></a></li>';
	               
	                suggest_data_num ++;
	           //}
	        //}
	    }
		
		//console.log(content);	
		
	    if (suggest_data_num > 0) {
	    	//search_result.html(content).show();
	    	$('#quick_search_result').html(content).show();
	            childs = search_result.children('li');
	            childidx = -1;
	    } else {
	    	$('#quick_search_result').html('<div class="text-center">Không tìm thấy kết quả</div>').show();
	    	//search_result.hide();
	    }
	}
	
	$("body").bind("click", function (e) {            
        $(".resutl-item").remove();
        $(".text-center").remove();
    });
}//end function reg event for top search

//Document ready
$(function(){		
	/*RegEventForFirst();
	RegEventForFontChu();
	RegEventForCochu();		
	RegEventForMaunen();*/
	RegEventHover();
	RegEventForTopSearch();	
});