 var main_order_id;
function detectOS() {
    const platform = navigator.platform.toLowerCase(),
        iosPlatforms = ['iphone', 'ipad', 'ipod', 'ipod touch'];

    if (platform.includes('mac')) return 'MacOS';
    if (iosPlatforms.includes(platform)) return 'iOS';

    return 'unknown';
}
if (detectOS()=='MacOS' || detectOS()=='iOS'){
    document.body.classList.add('body_mac_os');
   
}


/*lazyload images*/
var if_prices_clicked = 0;
    if_prices_clicked_num = 0;

document.addEventListener("DOMContentLoaded", function() {
  var lazyImages = [].slice.call(document.querySelectorAll(".lazy"));
  var lazyBackgrounds = [].slice.call(document.querySelectorAll(".lazy-background"));
  var active = false;

  const lazyLoad = function() {
    if (active === false) {
      active = true;



      setTimeout(function() {
        lazyImages.forEach(function(lazyImage) {
           
          if ( (lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0) && 

            (  (getComputedStyle(lazyImage).display !== "none") || lazyImage.parentNode.classList.contains('buket-info') || lazyImage.parentNode.classList.contains('tov-img')     )       )   {
            
            if (lazyImage.dataset.src){
                lazyImage.src = lazyImage.dataset.src;
            } 
            if (lazyImage.dataset.img){
                lazyImage.src = lazyImage.dataset.img;
            } 
            if (lazyImage.dataset.srcset){
                lazyImage.srcset = lazyImage.dataset.srcset; 
            } 
            lazyImage.classList.remove("lazy");

            lazyImages = lazyImages.filter(function(image) {
              return image !== lazyImage;
            });

            if (lazyImages.length === 0) {
              document.removeEventListener("scroll", lazyLoad);
              window.removeEventListener("resize", lazyLoad);
              window.removeEventListener("orientationchange", lazyLoad);
            }
          }
        });
        lazyBackgrounds.forEach(function(lazyBackground) {
          if ((lazyBackground.getBoundingClientRect().top <= window.innerHeight && lazyBackground.getBoundingClientRect().bottom >= 0) && getComputedStyle(lazyBackground).display !== "none") {
            lazyBackground.classList.remove("lazy-background");
            lazyBackgrounds = lazyBackgrounds.filter(function(image) {
              return image !== lazyBackground;
            });
            
          }
        });

        active = false;
      }, 200);
    }
  };

  document.addEventListener("scroll", lazyLoad);
  window.addEventListener("resize", lazyLoad);
  window.addEventListener("orientationchange", lazyLoad);
});

  /*lazyload images END*/

function setCookie(name, value, expires, path, domain, secure) {
    if (expires) {
        var d = new Date();
        d.setTime(d.getTime() + (expires * 24 * 60 * 60 * 1000));
        expires = d.toUTCString();
    }
    document.cookie = name + "=" + encodeURIComponent(value) + ((expires) ? "; expires=" + expires : "") + ((path) ? "; path=" + path : "") + ((domain) ? "; domain=" + domain : "") + ((secure) ? "; secure" : "");
}
function getCookie(name) {
    var cookie = " " + document.cookie;
    var search = " " + name + "=";
    var setStr = null;
    var offset = 0;
    var end = 0;
    if (cookie.length > 0) {
        offset = cookie.indexOf(search);
        if (offset != -1) {
            offset += search.length;
            end = cookie.indexOf(";", offset)
            if (end == -1) {
                end = cookie.length;
            }
            try {
                setStr = decodeURIComponent(cookie.substring(offset, end));
            } catch (err) {
                setCookie(name, '', 365, "/");
                setStr = '';
            }
        }
    }
    return (setStr);
}

function is_not_working_time(form){
    var date = new Date();
    $('.not_working_time').hide();
    $(form).find('.second17').parent().show();
     $('.second17').each(function(){
          $(this.parentNode).show();
     })
    if ( date.getHours()-0>22 || (date.getHours()-0==22 && date.getMinutes()-0>0) || date.getHours()-0<10 ){
        //НЕрабочее время
        
        if ($(form).find('.not_working_time').length<1){
             $(form).append('<p class="not_working_time" style="display:none">Магазин откроется в 10 утра и мы сразу приступим к обработке Вашего заказа.</p>');
         } 
         $(form).find('.not_working_time').show();
         $(form).find('.second17').parent().hide();
         if ( $(form).parents('.win').length ){
            $(form).find(".17seccond_button_m").val('ЗАКРЫТЬ ОКНО').html('ЗАКРЫТЬ ОКНО');
            $(form).find(".17seccond_button_m").on('click', function(){
                 if ( $(this).val()=='ЗАКРЫТЬ ОКНО' || $(this).html()=='ЗАКРЫТЬ ОКНО' ){
                    $.fancybox.close();
                    $(this).html( $(this).attr('data-button1') );
                    $(this).val( $(this).attr('data-button1') );
                    $('.not_working_time').hide();
                    return false;
                 }
            });
         }    
    }
}

var form = false;
var sec17 = 17;
var setint = false;
var order_updated = false;
var ssecond_button = function(close=true) {
    if (setint) {
        clearInterval(setint);
        sec17 = 17;
    }
    var but = $(".17seccond_button_m");

    var date = new Date();
    if ( date.getHours()-0>22 || (date.getHours()-0==22 && date.getMinutes()-0>0) || date.getHours()-0<10 ){
        //НЕрабочее время
        
    } else {
        //рабочее время
        for (var i = 0; i < but.length; i++) {
            but.eq(i).html(but.eq(i).attr('data-button2'));
            but.eq(i).val(but.eq(i).attr('data-button2'));
        }
        setint = setInterval(function() {
            sec17--;
            if (sec17 < 0) {
                $('#buy_online_button').show();
                clearInterval(setint);
                sec17 = 17;
                var but = $(".17seccond_button_m");
                for (var i = 0; i < but.length; i++) {
                    but.eq(i).html(but.eq(i).attr('data-button1'));
                    but.eq(i).val(but.eq(i).attr('data-button1'));
                }
                var sec17_text = sec17 + ' секунд';
                $(".second17").html(sec17_text);
                if (close) {
                    $.fancybox.close();
                }
                return;
            }
            var sec17_text = sec17 + ' секунд';
            if (sec17 >= 2 && sec17 <= 4) {
                sec17_text = sec17 + ' секунды';
            } else if (sec17 == 1) {
                sec17_text = sec17 + ' секунду';
            }
            //console.log(sec17_text);
            $(".second17").html(sec17_text);
        }, 1000);
    }
}
$(document).scroll(function(a) {
    if ($(this).scrollTop() > 1031) {
        
        $(".side1_virtual2").addClass("open");
		if ($(".side2").hasClass("closed") && $(".side1").hasClass("closed")) {
			$(".side2").removeClass("closed");
		}
    } else {
        $(".side1_virtual2").removeClass("open");
        $(".side2").addClass("closed");
        $(".side1").addClass("closed");
    }
});
$(document).ready(function() {

    $(".js-popup-1").click(function (e) {
            e.preventDefault();
            var el = $(this);
            var id = el.attr("href");
            var params = el.attr("data-params");
            id = id.replace("#", "");
            id = id.replace("-", "");
            var wrCSS = '';
            if (el.attr("href")=='#win8'){
                wrCSS = 'fancyv';              
            } 
            if (el.attr("href")=='#win9'){
                 wrCSS = 'fancy-wh';
            }
        if (el.attr("href")=='#win8' || el.attr("href")=='#win15'){
            if ($(el.attr("href")).html()!=''){
                    $(el.attr("href")).addClass('loaded_content');
                }
        }




            
            if ( $(el.attr("href")).hasClass('loaded_content') ){
                $.fancybox.open({href : el.attr("href")},{
                            nextEffect:'elastic',
                            nextSpeed:400,
                            prevEffect:'elastic',
                            prevSpeed:400,
                            wrapCSS: wrCSS
                        });
            } else {
                $.ajax({
                    type    : "POST",
                    cache   : false,
                    url     : "/popups.php?id="+ id,
                    data    : params,
                    success: function(data) {
                        $(el.attr("href")).append(data).addClass('loaded_content');

                        $.fancybox.open({href : el.attr("href")},{
                            nextEffect:'elastic',
                            nextSpeed:400,
                            prevEffect:'elastic',
                            prevSpeed:400,
                            wrapCSS: wrCSS
                            
                        });
                        if ( $(el.attr("href")).find('input[type="tel"]').length ){
                          
                            $(el.attr("href")).find('input[type="tel"]').mask('+7 (999) 999-99-99', {
                                placeholder: "+7 (___) ___-__-__"
                            });
                        }
                     

                    }
                });
            }
        });

	
	$("#search-form").submit(function(){
		var text = $("#search-text").val();
		
		if (text.length == 0) {
			return;
		}
		
		$.ajax({
			url: '/',
			method: 'POST',
			dataType: 'json',
			data: {
				'module': 'buket',
				'action': 'search-flowers',
				'text': text
			},
			success: function(response) {
				if (response.link) {
					document.location=response.link;
				} else if (response.html) {
					$("#search-not-found").hide();
					$(".section-cat .wrapper").html(response.html);
				} else {
					$(".section-cat .wrapper").html("");
					$("#search-not-found").show();
				}
			}
		});
		
		return false;
	})
	
	$("#filter-type-locations").change(function() {
		if ($(this).val() == 1) {
			$(".filter-top-links-area").hide();
			$(".filter-top-links-metro").hide();
			$(".filter-top-links-city").show();
		} else if ($(this).val() == 2) {
			$(".filter-top-links-area").hide();
			$(".filter-top-links-city").hide();
			$(".filter-top-links-metro").show();
		} else if ($(this).val() == 3) {
			$(".filter-top-links-city").hide();
			$(".filter-top-links-metro").hide();
			$(".filter-top-links-area").show();
		}
		
	});
	
	$(".fancy-zone-1").click(function() {
		$.fancybox({
            margin: 0,
            padding: 0,
            href: '#win23'
        });
		return false;
	})
	$(".fancy-zone-2").click(function() {
		$.fancybox({
            margin: 0,
            padding: 0,
            href: '#win24'
        });
		return false;
	})
	$(".fancy-zone-3").click(function() {
		$.fancybox({
            margin: 0,
            padding: 0,
            href: '#win25'
        });
		return false;
	})
	
    //setTimeout(function() {
        //$(".load_active a").click();
    //}, 100);
    var d = new Date();
    var hours = d.getHours();
    if (hours >= 22 && hours < 6) {
        $("#night-block").show();
        $("#day-block").hide();
    }
    if (hours >= 5 && hours < 9) {
        $("#night-text").html('утром намного меньше...');
    }
    var h = d.getHours();
    var m = d.getMinutes();
    if (h < 10) {
        h = '0' + h;
    }
    if (m < 10) {
        m = '0' + m;
    }
    $("#now-time").html(h + ':' + m);
    var phone = getCookie('phone');
    if (phone) {
        $('input[type="tel"]').val(phone);
    }
    if ($("#kuda-input").length) {
        $(".kuda-" + $("#kuda-input").val()).click();
    }
    if ($("#mpages").val() == 1) {
        $("#btn-more").parent().hide();
    }
    $('body').on("click", '#btn-more', function() {
        var pg = $("#mpage").val();
        pg++;
        $("#mpage").val(pg);
        var ztop =   self.pageYOffset || (document.documentElement && document.documentElement.scrollTop) || (document.body && document.body.scrollTop);               
        if (pg == 1) {
            $(".tov-10, .tov-11, .tov-12, .tov-13, .tov-14, .tov-15, .tov-16, .tov-17, .tov-18, .tov-19").show();
             $('html,body').animate({scrollTop:ztop},0);
        } else if (pg == 2) {
            $(".tov-20, .tov-21, .tov-22, .tov-23, .tov-24, .tov-25, .tov-26, .tov-27, .tov-28, .tov-29").show();
             $('html,body').animate({scrollTop:ztop},0);
        } else {
            reload_flowers_m();
        }
       
        if (pg >= parseInt($("#mpages").val()) - 1) {
            $("#btn-more").parent().hide();
        }
        return false;
    });
    $('body').on('click', '.buket-paginator-next', function() {
        var page = parseInt($("#page").val());
        page++;
        $("#page").val(page);
        reload_flowers();
        $("html, body").animate({
            scrollTop: $("#section-cat").offset().top
        }, "slow");
        return false;
    })
    $('body').on('click', '.buket-paginator-prev', function() {
        var page = parseInt($("#page").val());
        page--;
        $("#page").val(page);
        reload_flowers();
        $("html, body").animate({
            scrollTop: $("#section-cat").offset().top
        }, "slow");
        return false;
    })
    $('body').on('click', '.buket-paginator-page', function() {
        $("#page").val($(this).data('page'));
        reload_flowers();
        $("html, body").animate({
            scrollTop: $("#section-cat").offset().top
        }, "slow");
        return false;
    })
    $('body').on('click', '.fast-order-button', function() {
        $("#one-click-order-buket-id").val($(this).attr('rel'));
        $('#buy_online_button').show();

        if ( $(this).hasClass('is_monobuket_1') ){
            $('#win18 form input[name="mono_bukets"]').val(1);
        } else {
            $('#win18 form input[name="mono_bukets"]').val(0);
        }
        $('#win18 form input[name="add_flower_for_free_delivery"]').val(0);

        $('#win18 #buket_order_text').val('');
        $('#win18 input[name="buket_order_price"]').val('');
        
        $.fancybox({
            margin: 0,
            padding: 0,
            href: '#win18'
        });
        return false;
    })
    $(".scrollTo").click(function() {
        var dl = 0;
        if ($(this).attr('rel')) {
            dl = parseInt($(this).attr('rel'));
        }
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            dl = 0;
        }
        var href = $(this).attr('href');
        if (href == '#sflorist') {
            if ($($(this).attr('href')).offset().top > $(document).scrollTop()) {
                var dl = parseInt($(".time-block").css('margin-top'));
                //console.log(dl);
                $("html, body").animate({
                    scrollTop: $($(this).attr('href')).offset().top
                }, "slow");
            } else {
                $("html, body").animate({
                    scrollTop: $($(this).attr('href')).offset().top
                }, "slow");
            }
        } else {
            $("html, body").animate({
                scrollTop: $($(this).attr('href')).offset().top - dl
            }, "slow");
        }
        return false;
    })
    //function side1_mouseleave() {
        //if ($(document).scrollTop() < 1031) {
            //$(".side1").addClass("closed");
            //$(".side2").addClass("closed");
            //return;
        //}
        //$(".side1").addClass("closed");
        //$(".side2").removeClass("closed");
        //setTimeout(function() {
            //$('body').off('mouseleave', '.side1');
            //$('body').on('mouseenter', '.side2', side2_mouseenter);
        //}, 600);
    //}
    //function side2_mouseenter() {
        //if ($(document).scrollTop() < 1031) {
            //$(".side1").addClass("closed");
            //$(".side2").addClass("closed");
            //return;
        //}
        //$(".side2").addClass("closed");
        //$(".side1").removeClass("closed");
        //setTimeout(function() {
            //$('body').off('mouseenter', '.side2');
            //$('body').on('mouseleave', '.side1', side1_mouseleave)
        //}, 600);
    //}
    $('body').on('mouseenter', '.side1_virtual', function() {
		if ($(document).scrollTop() < 1031) {
            $(".side1").addClass("closed");
            $(".side2").addClass("closed");
            return;
        }
        $(".side2").addClass("closed");
        $(".side1").removeClass("closed");
	})
	$('body').on('mouseleave', '.side1_virtual', function() {
		//console.log("!!!");
		if ($(document).scrollTop() < 1031) {
            $(".side1").addClass("closed");
            $(".side2").addClass("closed");
            return;
        }
        $(".side2").removeClass("closed");
        $(".side1").addClass("closed");        
	})
	
    //$('body').on('mouseenter', '.side2', side2_mouseenter);
    $("body").on("submit", ".orders-ajax-form", function() {
        // var checkboxfo = $($(this).find('#checkbox_soglashenie'));
        // checkboxfo.addClass('active-form-check');
        // if (checkboxfo.prop('checked')) {
        //     console.log('true-form');
        // } else {
        //     console.log('false-form');
        //     $('.input_check_sogl label').css('color', 'red');
        //     return false;
        // }
        if ($(this).find('input[type="tel"]').length) {
            $('input[type="tel"]').val($(this).find('input[type="tel"]').val());
            setCookie('phone', $(this).find('input[type="tel"]').val(), 1000, '/');
        }
   
         if ($(this).find('input[name="action"][value="email-notif"]').length  ) {
        
           $('.after-order-form input[type="submit"]').val('ПИСЬМО ОТПРАВЛЕНО');
         }

        if ($(this).hasClass("check-oferta") ) {
           var vtel = $(this).find('input[type="tel"]').val();
            if (vtel.length<18 || ( (vtel.indexOf('+7 (495)')<0) && (vtel.indexOf('+7 (499)')<0) && (vtel.indexOf('+7 (9')<0) ) ) {
                $(this).find('input[type="tel"]').focus().addClass('tel_error');
            } else {
                $(this).find('input[type="tel"]').removeClass('tel_error');
                form = $(this);
                $.ajax({
                    url: '/',
                    method: 'POST',
                    data: {
                        'module': 'orders',
                        'action': 'check-oferta',
                        'phone': $(this).find('input[type="tel"]').val()
                    },
                    success: function(response) {
                        if (response == 1) {
                            $.ajax({
                                url: '/',
                                method: 'POST',
                                data: form.serialize(),
                                dataType: 'json',
                                success: function(response) {
                                   /* console.log(response); */
                                    if (response.ssecond_button && response.ssecond_button == 1) {
                                        ssecond_button();
                                        is_not_working_time(form);
                                    }
                                    if (response.order_id) {
                                        
                                        
                                        if ( form.find('#order_type1').length && (form.find('#order_type1').val()-0)==2  ){
                                      
                                            ssecond_button();
                                            is_not_working_time(form);
                                            $('#buy_online_button').hide();
                                        } else {
                                           
                                            get_order(response.order_id);
                                        }
                                        $("#header-choise-bukket-link")
                                            .html("Заказ №" + response.order_id)
                                            .addClass('get-order-button')
                                            .removeClass('scrollTo')
                                            .attr('rel', response.order_id)
                                            .attr('href', 'javascript:;');
                                    }
                                    //console.log(form.hasClass("close-modal"));
                                    if (form.hasClass("close-modal")) {
                                        $.fancybox.close();
                                    }
                                    
                                
                                    if (form.hasClass("question-form")) {
                                         
                                        $.fancybox.close();
                                        /*
                                        $.fancybox({
                                            margin: 0,
                                            padding: 0,
                                            href: '#win12'
                                        });
                                        */
                                        $("#question_button").val("Вопрос отправлен");
                                    }
                                    
                                    if (form.hasClass("optovik-form")) {
                                        $.fancybox.close();
                                        $("#optovik-button").val("Ваша заявка принята");
                                    }
                                }
                            });
                        } else {
                            $.fancybox({
                                margin: 0,
                                padding: 0,
                                href: '#win13'
                            });
                        }
                    }
                });
            }
        } else {
            form = $(this);
            $.ajax({
                url: '/',
                method: 'POST',
                data: $(this).serialize(),
                dataType: 'json',
                success: function(response) {
                    if (response.ssecond_button && response.ssecond_button == 1) {
                        ssecond_button();
                        is_not_working_time(form);
                        
                    }
                    if (response.order_id) {
                        if ( form.find('#order_type1').length && (form.find('#order_type1').val()-0)==2  ){
                           
                            ssecond_button();
                            is_not_working_time(form);
                            $('#buy_online_button').hide();
                        } else {
                            get_order(response.order_id);
                       
                        }
                        
                    }
                    if (form.hasClass("close-modal")) {
                        $.fancybox.close();
                    }
                   
                    if (form.hasClass("question-form")) {
                        
                        $.fancybox.close();
                        /*
                        $.fancybox({
                            margin: 0,
                            padding: 0,
                            href: '#win12'
                        });
                        */
                        $("#question_button").val("Вопрос отправлен");
                    }
                    if (form.hasClass("optovik-form")) {
                        $.fancybox.close();
                        $("#optovik-button").val("Ваша заявка принята");
                    }
                }
            });
        }
        return false;
    })
    $("#win-13-cancel,#win-13-cancel-1").click(function() {
        $.fancybox.close();
        return false;
    })
    $("#win-13-accept").click(function() {
        $.ajax({
            url: '/',
            method: 'POST',
            data: {
                'module': 'orders',
                'action': 'add-oferta',
                'phone': form.find('input[type="tel"]').val()
            },
            success: function(response) {
                if (response == 1) {
                    form.removeClass('check-oferta');
                    if (form.find('input[name="action"]').val() == 'call-me' || (form.find('input[name="order_type1"]').val()-0 == 2) ) {
                        $.fancybox.close();
                        $.fancybox({
                            margin: 0,
                            padding: 0,
                            href: '#win9'
                        });
                    }
                    form.submit();
                }
            }
        });
        return false;
    });
    $(".fakeLink").click(function() {
        return false;
    })




    $("body").on("click", ".buket_cart_order", function() {
        $('#win18 form input[name="buket-id"]').val( $(this).parents('form').find('input[name="buket-id"]').val() );
        $('#win18 form input[name="big-buket"]').val( $(this).parents('form').find('input[name="big-buket"]').val() );
        $('#win18 form input[name="buket100"]').val( $(this).parents('form').find('input[name="buket100"]').val() );
        $('#win18 form input[name="buket_big"]').val( $(this).parents('form').find('input[name="buket_big"]').val() );
        $('#win18 form input[name="dis-buket"]').val( $(this).parents('form').find('input[name="dis-buket"]').val() );

        $('#win18 form input[name="mono_bukets_num"]').val( $(this).parents('form').find('input[name="mono_bukets_num"]').val() );
        $('#win18 form input[name="mono_bukets_price"]').val( $(this).parents('form').find('input[name="mono_bukets_price"]').val() );
        if ($(this).parents('form').find('input[name="mono_bukets_is"]').length && $(this).parents('form').find('input[name="mono_bukets_is"]').val()==1){
            $('#win18 form input[name="mono_bukets"]').val(1);
        } else {
            $('#win18 form input[name="mono_bukets"]').val(0);
        }
        if ( $('#add_flowers_for_free_delivery').val()==1 ){
            $('#win18 form input[name="add_flower_for_free_delivery"]').val(1);
        } else {
            $('#win18 form input[name="add_flower_for_free_delivery"]').val(0);
        }
        $('#win18 #buket_order_text').val('');
        $('#win18 input[name="buket_order_price"]').val('');
         $.fancybox({
            margin: 0,
            padding: 0,
            href: '#win18'
        });
    });

    $("#win7").on("click", ".slick-slider", function() {
        $('#win7 .slider-for').slick('slickNext');
    })

    $("#win7").on("click", ".price-dis0", function() {
        stay_as_was();
        $(this).addClass('active');
        $("#win7 .price-dis0").html('Как на фото');


        delivery_cart_check();
    });


    
   

    var prpr;
    $("#win7").on("click", ".mono_bukets_num", function() {
        stay_as_was();
        $(this).addClass('active');
        $("#win7 .inf-text").html($(this).attr('data-title')); 
        var zprice = Number($("#win7 #buket-price").val()) + Number($(this).attr('data-price') );
        $("#win7 .price").html( zprice+ ' Р');

        if ( $("#win7 #price_buket_discount").length ){

            if ( $(this).attr('data-price_dis') && ($(this).attr('data-price_dis')-0)>0){
                var old_price_v = Number($(this).attr('data-price_dis'));
                var difference_v = '-'+Number($(this).attr('data-price_diff'));
            } else {
                var discount_z = (100-Number($('#price_buket_discount').val()))/100;
                var old_price_v = (zprice/discount_z); 
                var difference_v = (zprice-old_price_v);              
            }
            
            
            

            $("#win7 .old-price").text( Math.round(old_price_v)+' Р' );
            $("#win7 .price-old-block .dis").text( Math.round(difference_v)+'Р' );
        }
        
        
        

            $("#win7 #big-buket").val(1);
            $('#win7 #buket_big').val(99999);
            $('#win7 #mono_bukets_num').val($(this).attr('data-num'));
            $('#win7 #mono_bukets_price').val($(this).attr('data-price'));

            $('#big-buket-price').val( parseInt($("#win7 #buket-price").val()) + Number($(this).attr('data-price') ) );
            delivery_cart_check();

             $("#win7 .mono_bukets_num").each(function(){
                 prpr = ($(this).attr('data-price')-0) - (Number($('#big-buket-price').val()) - Number($('#buket-price').val()) ); 
                nnnn = Number($(this).attr('data-num') );
                if (prpr>0){
                    prpr = '+'+prpr;
                }
            if ( $(this).attr('id')=='mono_bukets_num1' && !$(this).hasClass('active') ){
               
                $(this).html('На фото <span>'+prpr+' Р</span>');
            } else if ( $(this).attr('id')=='mono_bukets_num1' && $(this).hasClass('active') ){
                $(this).html('Как на фото '+$(this).attr('data-num-default')+' шт.');
            } else if ( $(this).hasClass('active') ){
                $(this).html($(this).attr('data-num')+' шт.');
            } else {

                $(this).html($(this).attr('data-num')+' шт. <span>'+prpr+' Р</span>');
            }
            
         });
    });


    $("#win7").on("click", ".price-dis", function() {
         stay_as_was();
         $(this).addClass('active');


         $("#win7 .inf-text").html('Больше на 30%, чем на фото'); 
        $("#win7 .price-dis0").html('Как на фото <span>-' + parseInt($("#win7 #buket-price-30").val()) + ' Р</span>');
        $("#win7 #big-buket").val(1);
        $("#win7 .price").html(parseInt($("#win7 #buket-price").val()) + parseInt($("#win7 #buket-price-30").val()) + ' Р');
        $('#win7 #buket_big').val(30);

         $('#win7 .price-dis').html('Больше на 30% ');
         var pr50 = parseInt($("#win7 #buket-price-50").val())-parseInt($("#win7 #buket-price-30").val());
         var pr100 = parseInt($("#win7 #buket-price-100").val())-parseInt($("#win7 #buket-price-30").val());
         $('#win7 .price-dis3').html('Больше на 50% <span>+' + pr50 + ' Р</span>');
         $('#win7 .price-dis4').html('Больше на 100% <span>+' + pr100 + ' Р</span>');

         $('#big-buket-price').val( parseInt($("#win7 #buket-price").val()) + parseInt($("#win7 #buket-price-30").val()) );
        delivery_cart_check();

    });

$("#win7").on("click", ".price-dis3", function() {

    stay_as_was();

        $(this).addClass('active');
        $("#win7 .inf-text").html('В полтора раза больше, чем на фото'); 
        $("#win7 .price-dis0").html('Как на фото <span>-' + parseInt($("#win7 #buket-price-50").val()) + ' Р</span>');
        $("#win7 #big-buket").val(1);
        $("#win7 .price").html(parseInt($("#win7 #buket-price").val()) + parseInt($("#win7 #buket-price-50").val()) + ' Р');
        $('#win7 #buket_big').val(50);
    
     $('#win7 .price-dis3').html('Больше на 50% ');
     var pr30 = parseInt($("#win7 #buket-price-50").val())-parseInt($("#win7 #buket-price-30").val());
     var pr100 = parseInt($("#win7 #buket-price-100").val())-parseInt($("#win7 #buket-price-50").val());
     $('#win7 .price-dis').html('Больше на 30% <span>-' + pr30 + ' Р</span>');
     $('#win7 .price-dis4').html('Больше на 100% <span>+' + pr100 + ' Р</span>');

     $('#big-buket-price').val( parseInt($("#win7 #buket-price").val()) + parseInt($("#win7 #buket-price-50").val()) );
        delivery_cart_check();
});

$("#win7").on("click", ".price-dis4", function() {
    stay_as_was();

        $(this).addClass('active');
        $("#win7 .inf-text").html('В 2 раза больше, чем на фото'); 
        $("#win7 .price-dis0").html('Как на фото <span>-' + parseInt($("#win7 #buket-price-100").val()) + ' Р</span>');
        $("#win7 #big-buket").val(1);
        $("#win7 .price").html(parseInt($("#win7 #buket-price").val()) + parseInt($("#win7 #buket-price-100").val()) + ' Р');
        $('#win7 #buket_big').val(100);

     $('#win7 .price-dis4').html('Больше на 100% ');
     var pr30 = parseInt($("#win7 #buket-price-100").val())-parseInt($("#win7 #buket-price-30").val());
     var pr50 = parseInt($("#win7 #buket-price-100").val())-parseInt($("#win7 #buket-price-50").val());
     $('#win7 .price-dis').html('Больше на 30% <span>-' + pr30 + ' Р</span>');
     $('#win7 .price-dis3').html('Больше на 50% <span>-' + pr50 + ' Р</span>');

     $('#big-buket-price').val( parseInt($("#win7 #buket-price").val()) + parseInt($("#win7 #buket-price-100").val()) );
        delivery_cart_check();
});


function stay_as_was(){
    $("#win7 .price-dis2").show().text('Хочу дешевле');
    $('#win7 .price-dis0, #win7 .price-dis, #win7 .price-dis2, #win7 .price-dis3, #win7 .price-dis4, #win7 .mono_bukets_num').removeClass('active');

     $('#win7 .price-dis').html('Больше на 30% <span>+' + parseInt($("#win7 #buket-price-30").val()) + ' Р</span>');
     $('#win7 .price-dis3').html('Больше на 50% <span>+' + parseInt($("#win7 #buket-price-50").val()) + ' Р</span>');
     $('#win7 .price-dis4').html('Больше на 100% <span>+' + parseInt($("#win7 #buket-price-100").val()) + ' Р</span>');

    $("#win7 .inf-text").html('Один в один как на фото'); 
   
    $("#win7 .price").html( parseInt( $("#win7 #buket-price").val() ) + ' Р');

    $("#win7 #big-buket").val(0);
    $('#win7 #buket_big').val(0);
    $('#buket100').val(0);
    $("#win7 #dis-buket").val(0);

    $(".flowers_html").show();
    $(".flowers_html_dis").hide();

    $("#win7 .price-dis2").text('Хочу дешевле');
    $('#big-buket-price').val( parseInt( $("#win7 #buket-price").val() ) );
}

    $("#win7").on("click", ".price-dis2", function() {
       

        $('#win7 .price-dis0, #win7 .price-dis, #win7 .price-dis2, #win7 .price-dis3, #win7 .price-dis4, #win7 .mono_bukets_num').removeClass('active');
        $(this).addClass('active');

		$("#win7 #dis-buket").val(1);
		$("#win7 #big-buket").val(0);
        $('#win7 #buket_big').val(0);
		//$("#win7 .price").html(Math.round(parseInt($("#win7 #buket-price").val())*0.8)  + ' Р');

        
            $('#buket100').val( $('#buket100').val()-0+100 );
             if ($('#buket100').val()-0 >= 100){
                $(this).text('Еще дешевле');
             } else {
                $(this).text('Хочу дешевле');
             }
           
        if ( Math.round(parseInt($("#win7 #buket-price").val())-$('#buket100').val()) <=2500 ){
            //$("#win7 .price-dis2").hide();
            $('#buket100').val( parseInt($("#win7 #buket-price").val())-2500 );
            $("#win7 .price").html(2500  + ' Р');
            $("#win7 .price-dis0").html('Как на фото <span>+' + $('#buket100').val()  + ' Р</span>');
        } else {
            $("#win7 .price").html(Math.round(parseInt($("#win7 #buket-price").val())-$('#buket100').val())  + ' Р');

            $("#win7 .price-dis0").html('Как на фото <span>+' + $('#buket100').val()  + ' Р</span>');
        }

        $('#win7 .price-dis').html('Больше на 30% <span>+' + (parseInt($("#win7 #buket-price-30").val())+parseInt($('#buket100').val())) + ' Р</span>');
        $('#win7 .price-dis3').html('Больше на 50% <span>+' + (parseInt($("#win7 #buket-price-50").val())+parseInt($('#buket100').val())) + ' Р</span>');
        $('#win7 .price-dis4').html('Больше на 100% <span>+' + (parseInt($("#win7 #buket-price-100").val())+parseInt($('#buket100').val())) + ' Р</span>');

        if ( $("#win7 #buket-price").val()<=2500 ){
            $("#win7 #dis-buket").val(0);
            $('#buket100').val(0);
            $("#win7 .price-dis2").hide();
        }

        
		$("#win7 .inf-text").html('Составим похожий букет в рамках Вашего бюджета');
		 /* $("#win7 .price-dis2").hide(); */
        /*
		$("#win7 .price-dis").html('Как на фото <span>+' + (Math.round(parseInt($("#win7 #buket-price").val())) - Math.round(parseInt($("#win7 #buket-price").val())*0.8))  + ' Р</span>');
        */
        $('#big-buket-price').val( Math.round(parseInt($("#win7 #buket-price").val())-$('#buket100').val()) );
        delivery_cart_check();
		$(".flowers_html").hide();
		$(".flowers_html_dis").show();
    });

    $(".section-cat").on("click", ".fav", function() {
        var favorites = JSON.parse(getCookie('favorites')) || Array();
        if (jQuery.inArray($(this).attr('rel'), favorites) == -1) {
            favorites.push($(this).attr('rel'));
            $(this).addClass('active');
            $(this).html("в избранном");
        } else {
            favorites.splice(favorites.indexOf($(this).attr('rel')), 1);
            $(this).removeClass('active');
            $(this).html("в избранное");
        }
        favorites = JSON.stringify(favorites);
        setCookie('favorites', favorites, 999999, '/');
        return false;
    })
    $("body").on("click", ".buket-info", function() {
        show_buket($(this).attr('rel'));
        return false;
    })
    $("body").on("click", ".buket-info2", function() {
        if ($(this).parent().parent().hasClass('slick-active')) {
            show_buket($(this).attr('rel'));
        } else {
            $('.tovs-slider').slick('slickGoTo', parseInt($(this).parent().parent().attr('data-slick-index')));
        }

        return false;
    })

    $("body").on("click", ".buket-info3", function() {
        if ($(this).parent().parent().hasClass('slick-active')) {
            if ( $(this).parents('#win23-1').length<1 ){
                show_buket($(this).attr('rel'));  
            }  
        } else {
            $('#tovs-slider2').slick('slickGoTo', parseInt($(this).parent().parent().attr('data-slick-index')));
        }
        return false;
    })

    $("#win-13-accept-1").click(function() {
        $.ajax({
            url: '/',
            method: 'POST',
            data: {
                'module': 'orders',
                'action': 'add-oferta',
                'phone': $('#delivery-phone2').val()
            },
            success: function(response) {
                if (response == 1) {
                    check_order_oferta(main_order_id);
                }
            }
        });
        return false;
    });

    function show_buket(id) {
        $.ajax({
            url: '/',
            method: 'POST',
            dataType: 'json',
            data: {
                'module': 'buket',
                'action': 'get-buket',
                'id': id
            },
            success: function(response) {
                $('#win7 .slider-for').slick('unslick');
                $('#win7 .slider-nav').slick('unslick');
                $("#win7").html(response)
                $('#win7 input[type="checkbox"]').styler();
                $('#win7 input[type="tel"]').mask('+7 (999) 999-99-99', {
                    placeholder: "+7 (___) ___-__-__"
                });
                $.fancybox.close();
                $('#win7 .slider-for').slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    fade: true,
                    dots: true,
                    asNavFor: '#win7 .slider-nav'
                });
                $('#win7 .slider-nav').slick({
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    asNavFor: '#win7 .slider-for',
                    dots: false,
                    centerMode: false,
                    focusOnSelect: true
                });
                $.fancybox({
                    margin: 0,
                    padding: 0,
                    href: '#win7',
                    afterShow: function() {
                        $('#win7 .slider-for').slick('setPosition');
                        $('#win7 .slider-nav').slick('setPosition');
                    },
                });
            }
        });
    }
    $("body").on("mouseover", ".tov-price", function() {
        var rel = parseInt($(this).parent().find('.tov-img').attr('rel'));
        if (rel != 1) {
            $(this).parent().find('.tov-img').attr('rel', 1);
            $(this).parent().find('.tov-img img').removeClass('active');
            $(this).parent().find('.tov-img img').eq(1).addClass('active');
        }
      
    })
    $("body").on("mouseout", ".tov-price", function(a, b) {
        if ($(a.relatedTarget).parent().hasClass('tov-price') || $(a.relatedTarget).hasClass('tov-price')) {
            return;
        }
        var rel = parseInt($(this).parent().find('.tov-img').attr('rel'));
        if (rel == 1) {
            $(this).parent().find('.tov-img').attr('rel', 0);
            $(this).parent().find('.tov-img img').removeClass('active');
            $(this).parent().find('.tov-img img').eq(0).addClass('active');
        }
    })
    $("body").on("click", ".tov-price", function(a, b) {
        var rel = parseInt($(this).parent().find('.tov-img').attr('rel'));
        var count_img = $(this).parent().find('.tov-img img').length;
        rel++;
        if (rel >= count_img) {
            rel = 0
        }
        $(this).parent().find('.tov-img').attr('rel', rel);
        $(this).parent().find('.tov-img img').removeClass('active');
        $(this).parent().find('.tov-img img').eq(rel).addClass('active');
      
        return false;
    })
    $(".filter-show").click(function() {
        if ($(this).hasClass('opened')) {
            $(this).removeClass('opened');
            $("." + $(this).attr('rel') + '-block').hide();
            if ($(".filter-show.opened").length == 0) {
                $('.section-filter').removeClass('open');
            }
        } else {
            $(this).addClass('opened');
            $("." + $(this).attr('rel') + '-block').show();
            $('.section-filter').addClass('open');
        }
    })
    
    $("#filter-type-1").change(function() {
        $(".params_type_1.active").removeClass('active');
        $(".params_type_2.active").removeClass('active');
        if ($(this).val() == 1) {
            $(".params_type_1").removeClass('hidde');
            $(".params_type_2").addClass('hidde');
        } else {
            $(".params_type_2").removeClass('hidde');
            $(".params_type_1").addClass('hidde');
        }
        $("#filter-top-links-level2").html('');
        $("#filter-top-links-level22").html('');
        $("#filter-top-links-level11").html('');
        reload_filters();
    });



    $("#main_opts").on("click", ".filter-type1-button", function() {
		if ($(this).attr('rel') == 'price1' || $(this).attr('rel') == 'price2' || $(this).attr('rel') == 'price3' || $(this).attr('rel') == 'price4' || $(this).attr('rel') == 'price5') {
			
            var min_pr = 0;
            var max_pr = 99999999;
            
           
            if ($(this).parent().hasClass('active')) {
                $(this).parent().removeClass('active');
                //$('.range_slider').show();
                if_prices_clicked = 0;
            } else {
                 if ($(this).attr('rel') == 'price1'){
                    min_pr = 0;
                    max_pr = 2000;
                }   else  if ($(this).attr('rel') == 'price2'){
                    min_pr = 2000;
                    max_pr = 3000;
                } else  if ($(this).attr('rel') == 'price3'){
                    min_pr = 3000;
                    max_pr = 5000;
                } else  if ($(this).attr('rel') == 'price4'){
                    min_pr = 5000;
                    max_pr = 8000;
                } else  if ($(this).attr('rel') == 'price5'){
                    min_pr = 8000;
                    max_pr = 99999999;
                }
                if_prices_clicked = $(this).attr('rel');
                $(this).parent().parent().find('.active').removeClass('active');
                $(this).parent().addClass('active');
                
                //$('.range_slider').hide();            
            }
         
            $("#filter-slider").rangeSlider("min", parseInt(min_pr) );
            $("#filter-slider").rangeSlider("max", parseInt(max_pr) );
			//reload_flowers();
		} else {
            $('.range_slider').show();
			if ($(this).parent().hasClass('active')) {
				$(this).parent().removeClass('active');
			} else {
				$(this).parent().addClass('active');
			}
			reload_filters();
		}
		return false;
		
	})

    $(".section-filter").on("click", ".filter-type2-button", function() {
        $("#page").val(0);
        $("#mpage").val(0);
        if ($(this).parent().hasClass("active")) {
            $(this).parent().removeClass("active");
            $(this).closest("ul").find(".parent_param_" + $(this).attr('rel')).addClass('hidden');
        } else {
            $(this).parent().addClass("active");
            $(this).closest("ul").find(".parent_param_" + $(this).attr('rel')).removeClass('hidden');
        }
        reload_filters();
        return false;
    })
    $("#clear-filter").click(function() {
        $("#main_opts .active").removeClass('active');
		$("#param3 .active").removeClass('active');
		$("#param4 .active").removeClass('active');
		$("#param5 .active").removeClass('active');
        $("#filter-slider").rangeSlider("min", parseInt($("#silder_min").val()));
        $("#filter-slider").rangeSlider("max", parseInt($("#silder_max").val()));
        $(".filters-drop-line").hide();
        $(".filter-show").removeClass('opened');
        if_prices_clicked_num = 2;
        reload_filters();
        return false;
    })
    $("#filter-slider").bind("valuesChanged", function(e, data) {
        reload_filters(true);
    });
    $(".filter-bottom-nav a").click(function() {
        $(this).parent().parent().find("li").removeClass("active");
        $(this).parent().addClass("active");
        reload_flowers();
        return false;
    })
    $("#win17").on("click", "#after-order-modal-close-button", function() {
        $.fancybox.close();
         $('html,body').animate({scrollTop:0},0);
    })
    $("#win17").on("click", "#after-order-modal-pay-button", function() {
        return false;
    })
    $("#win17").on("click", "#after-order-modal-edit-button", function() {
        get_order($(this).attr('rel'), false, 1);
      
    })

    $('body').on("click", '.get-order-button, #order_show_2 a', function() {

        get_order($(this).attr('rel'), false, 1);
       
    });

   



    function reload_filters(slider = false) {
        var params = new Array();
        var flowers = new Array();
        var tmp = $(".active .filter-type1-button");
        for (var i = 0; i < tmp.length; i++) {
            params.push(tmp.eq(i).attr('rel'));
        }
        var tmp = $(".active .filter-type2-button");
        for (var i = 0; i < tmp.length; i++) {
            params.push(tmp.eq(i).attr('rel'));
        }
        var price_slider = $("#filter-slider").rangeSlider("values");
        if ($("#filter-type-1").val()==10){
            $("#main_opts").addClass('main_opts_price');
        } else {
            $("#main_opts").removeClass('main_opts_price');
        }

        $.ajax({
            url: '/',
            method: 'POST',
            data: {
                'module': 'buket',
                'action': 'reload-filters',
                'flowers': flowers,
                'params': params,
                'min_price': price_slider.min,
                'max_price': price_slider.max,
                'type': $("#filter-type-1").val()
            },
            dataType: 'json',
            success: function(response) {
                if (response.main_opts) {
                    $("#main_opts").html(response.main_opts);
                     if (if_prices_clicked!=0){
                                               
                        if (if_prices_clicked_num>1){
                            if_prices_clicked = 0;
                            if_prices_clicked_num = 0;
                        } else {
                            $('#main_opts .filter-type1-button[rel="'+if_prices_clicked+'"]').parents('.link-block').addClass('active');
                        }
                        
                    } 
                    
                }
                if (response.type3_opts) {
                    $("#param3").html(response.type3_opts);
                }
                if (response.type4_opts) {
                    $("#param4").html(response.type4_opts);
                }
                if (response.type5_opts) {
                    $("#param5").html(response.type5_opts);
                }
                $(".range_slider .found").html(response.count_full);

                //if (!slider) {
					//if (response.slider_min && response.slider_max) {
						//$("#filter-slider").rangeSlider("bounds", parseInt(response.slider_min), parseInt(response.slider_max));
						//$("#filter-slider").rangeSlider("values", parseInt(response.slider_min), parseInt(response.slider_max));
					//}
				//}
            }
        });
        $("#page").val(0);
        $("#mpage").val(0);
        reload_flowers();
    }
    function reload_flowers() {
        var params = new Array();
        var tmp = $(".active .filter-type1-button");
        for (var i = 0; i < tmp.length; i++) {
            params.push(tmp.eq(i).attr('rel'));
        }
        var price_slider = $("#filter-slider").rangeSlider("values");
        var sort = $(".filter-bottom-nav .active a").attr('rel');
        
        var tmp = $(".active .filter-type2-button");
        for (var i = 0; i < tmp.length; i++) {
            params.push(tmp.eq(i).attr('rel'));
        }
        var page = $("#page").val();
        
        $.ajax({
            url: '/',
            method: 'POST',
            data: {
                'module': 'buket',
                'action': 'reload-flowers',
                'params': params,
                'min_price': price_slider.min,
                'max_price': price_slider.max,
                'sort': sort,
                'page': page,
                'page_tittle': window.location.pathname != '/'? $('.cont-cov h1.txt2').text():'',
            },
            dataType: 'json',
            success: function(response) {
                $(".section-cat .wrapper").html(response);

                
            }
        });

    }
    function reload_flowers_m() {
        var params = new Array();
        var tmp = $(".active .filter-type1-button");
        for (var i = 0; i < tmp.length; i++) {
            params.push(tmp.eq(i).attr('rel'));
        }
        var price_slider = $("#filter-slider").rangeSlider("values");
        var sort = $(".filter-bottom-nav .active a").attr('rel');
        var tmp = $(".active .filter-type2-button");
        for (var i = 0; i < tmp.length; i++) {
            params.push(tmp.eq(i).attr('rel'));
        }
        var page = $("#mpage").val();
        $.ajax({
            url: '/',
            method: 'POST',
            data: {
                'module': 'buket',
                'action': 'reload-flowers-m',
                'params': params,
                'min_price': price_slider.min,
                'max_price': price_slider.max,
                'sort': sort,
                'page': page,
            },
            dataType: 'json',
            success: function(response) {

               var ztop =   self.pageYOffset || (document.documentElement && document.documentElement.scrollTop) || (document.body && document.body.scrollTop);   
                $("#section-cat .tovs").append($(response));
                 $('html,body').animate({scrollTop:ztop},0);
          
            }
        });
    }

function check_order_oferta(id){
    main_order_id = id;
    $.ajax({
                url: '/',
                method: 'POST',
                data: {
                    'module': 'orders',
                    'action': 'check-oferta',
                    'phone': $('#delivery-phone2').val()
                },
                success: function(response) {
                    if (response == 1) {
                       get_after_order(id);
                        if (order_updated) {
                            $.ajax({
                                url: '/',
                                method: 'POST',
                                data: {
                                    'module': 'orders',
                                    'action': 'order-updated',
                                    'id': id
                                },
                                dataType: 'json',
                                success: function(response) {}
                            })
                        }                     
                    } else {
                        var vtel = $('#delivery-phone2').val();
                        if (vtel.length<18 || ( (vtel.indexOf('+7 (495)')<0) && (vtel.indexOf('+7 (499)')<0) && (vtel.indexOf('+7 (9')<0) ) ) {

                        } else {
                            $.fancybox({
                                margin: 0,
                                padding: 0,
                                href: '#win13-1'
                            });
                        }
                        
                    }
                }
            });

    
}


    get_order = function(id, timer=true, edit=0) {

        order_updated = false;
        $.ajax({
            url: '/',
            method: 'POST',
            data: {
                'module': 'orders',
                'action': 'get-order',
                'id': id,
                'edit': edit
            },
            dataType: 'json',
            success: function(response) {
                $("#win6").html(response)
                $('#win6 select, #win6 input[type="radio"], #win6 input[type="checkbox"]').styler();
                $.fancybox.close();
                $.fancybox({
                    margin: 0,
                    padding: 0,
                    href: '#win6',
                    wrapCSS: 'fancy-wh',
                    afterClose: function() {
                        check_order_oferta(id);
                        open_order_button_2(id);
                    }
                });
                if (timer) {
                    //ssecond_button(false);
                }
                $('#win6 [placeholder]').focus(function() {
                    var input = $(this);
                    if (input.val() == input.attr('placeholder')) {
                       // input.val('');
                       // input.removeClass('placeholder');
                    }
                }).blur(function() {
                    var input = $(this);
                    if (input.val() == '' || input.val() == input.attr('placeholder')) {
                       // input.addClass('placeholder');
                       // input.val(input.attr('placeholder'));
                    }
                }).blur();
                $('#win6 input[type="tel"]').mask('+7 (999) 999-99-99', {
                    placeholder: "+7 (___) ___-__-__"
                });
            }
        });
    }
    get_after_order = function(id) {
        $.ajax({
            url: '/',
            method: 'POST',
            data: {
                'module': 'orders',
                'action': 'get-after-order',
                'id': id
            },
            dataType: 'json',
            success: function(response) {
                $("#win17").html(response)
                $.fancybox.close();
                $.fancybox({
                    margin: 0,
                    padding: 0,
                    href: '#win17',
                    wrapCSS: 'fancyv',
                });
                $('#win17 [placeholder]').focus(function() {
                    var input = $(this);
                    if (input.val() == input.attr('placeholder')) {
                        input.val('');
                        input.removeClass('placeholder');
                    }
                }).blur(function() {
                    var input = $(this);
                    if (input.val() == '' || input.val() == input.attr('placeholder')) {
                        input.addClass('placeholder');
                        input.val(input.attr('placeholder'));
                    }
                }).blur();
            }
        });
    }
    function update_order() {                
            order_updated = true;
            $.ajax({
                url: '/',
                method: 'POST',
                data: $("#update-order-form").serialize(),
                dataType: 'json',
                success: function(response) {
                   /* console.log(response);*/
                    //console.log(response.is_telfin);
                    if (response.sum) {
                        $("#order-price").html(response.sum);
                    }
                    if (response.personal_discount) {
                        $("#personal-discount").html(response.personal_discount + '%');
                    }
                    //console.log(response.delivery_discount);
                    if (response.delivery_discount && parseInt(response.delivery_discount) > 0) {
                        $("#delivery-discount").html(response.delivery_discount + '%');
                        $("#delivery-discount-block").show();
                    } else {
                        $("#delivery-discount-block").hide();
                    }
                    if (response.delivery_date_discount && parseInt(response.delivery_date_discount) > 0) {
                        $("#delivery-date-discount").html(response.delivery_date_discount + '%');
                        $("#delivery-date-discount-text").html(response.delivery_date_discount_text);
                        $("#delivery-date-discount-block").show();
                    } else {
                        $("#delivery-date-discount-text").html(response.delivery_date_discount_text);
                        $("#delivery-date-discount-block").hide();
                    }
                    if (response.promocode_discount && parseInt(response.promocode_discount) > 0) {
                        $("#promocode-price").html(response.promocode_discount + '%');
                        $("#promocode-discount-block").show();
                    } else {
                        $("#promocode-discount-block").hide();
                    }
                    if (response.max_discount && parseInt(response.max_discount) > 0) {
                        $("#max-discount").html(response.max_discount + '%');
                        $("#max-discount-block").show();
                    } else {
                        $("#max-discount-block").hide();
                    }
                    if (response.discount_sum && parseInt(response.discount_sum) > 0) {
                        $("#price-old-block-main-dis").html('-'+response.discount_sum);
                        $("#price-old-block-main-old-price").html(response.old_sum);
                        $("#price-old-block-main").show();
                    } else {
                        $("#price-old-block-main").hide();
                    }
                    if (response.free_delivery_text && response.free_delivery_text.length > 0) {
                        $("#add_flower_for_free_text2").html(response.free_delivery_text);
                        $(".promocod.order_add_flowers").show();
                    } else {
                        $(".promocod.order_add_flowers").hide();
                    }
                    $("#delivery-price").html(response.delivery_price);
                }
            });
       
        
    }
    $("#win6").on("keyup", "#text-option3", function() {
        if ($(this).val() == '') {
            $("#input-option3").prop('checked', false).trigger('refresh');
        } else {
            $("#input-option3").prop('checked', true).trigger('refresh');
        }
    })
    $("#win6").on("change", "input.update-order-form-trigger, #text-option3, select.update-order-form-trigger", function() {
        $('#need_call_2').val(0);
        update_order();
    })
    $("#win6").on("change", "#promocode-ch", function() {
        if ($(this).is(":checked")) {
            $("#promocode-block-hide").show();
        } else {
            $("#promocode-block-hide").hide();
        }
    })
    $("#win6").on("click", "#promocode-button", function() {
        $('#need_call_2').val(0);
        update_order();
        return false;
    })
    $("#win6").on("click", '.order-tabs.order-tabs-recipient a', function() {
        $(this).parent('li').addClass('active');
        $(this).parent('li').siblings('li').removeClass('active');
        $("#delivery-type").val($(this).attr('rel'));
       
        if ($("#delivery-name").val() == 'Ваше имя' || $("#delivery-name").val() == 'Имя получателя' || $("#delivery-name").val() == '') {
            $("#delivery-name").val('').focus();
        } else  if ($("#delivery-phone2").val() == '') {
            $("#delivery-phone2").focus();
        } 
        if ($(this).attr('rel') == "1") {
            $('#dost_day').text('Дата доставки');
            $('#dost_time').text('Время доставки');
           // $("#delivery-name").attr('placeholder', 'Ваше имя');
            //$('#order_name_t').text('Ваше имя');
            $("#delivery-block").show();
            $("#pay-type-2").removeClass('disabled');
           // $("#pay-type-2 a").html('Наличными курьеру');
           $("#pay-type-2 a").html('Оплата онлайн');
           $('#getter_row').hide();
        } else if ($(this).attr('rel') == "2") {
            $('#dost_day').text('Дата доставки');
            $('#dost_time').text('Время доставки');
           // $("#delivery-name").attr('placeholder', 'Имя получателя');
            //$('#order_name_t').text('Имя получателя');
   
            $("#delivery-block").show();
            //$("#pay-type-2").addClass('disabled');
            if ($("#pay-type").val() == 2) {
               // $("#pay-type-1 a").click();
            }
           // $("#pay-type-2 a").html('Наличными курьеру');
           $("#pay-type-2 a").html('Оплата онлайн');
           $('#getter_row').show();
        } else if ($(this).attr('rel') == "3") {
            $('#dost_day').text('Дата заказа');
            $('#dost_time').text('Время заказа');
           // $("#delivery-name").attr('placeholder', 'Имя получателя');
           $('#order_name_t').text('Ваше имя');
            $("#delivery-block").hide();
            $("#pay-type-2").removeClass('disabled');
            //$("#pay-type-2 a").html('Наличными или картой');
            $("#pay-type-2 a").html('Оплата онлайн');
            $('#getter_row').hide();
        }
        $('#need_call_2').val(0);
        update_order();
        return false;
    });
    $("#win6").on("click", '.order-tabs.order-tabs-delivery a', function() {
        $(this).parent('li').addClass('active');
        $(this).parent('li').siblings('li').removeClass('active');
        $("#delivery-zone").val($(this).attr('rel'));
        setCookie('delivery_zone', ($(this).attr('rel')-0), 1000, '/');
        $("#delivery-location").val($(this).attr('rel'));
        

        $(this).parents('.order-block').find(".conditions-block-line").hide();
        $(this).parents('.order-block').find(".conditions-block-line-" + $(this).attr('rel')).show();

        $('#need_call_2').val(0);
        update_order();
        return false;
    });
    $("#win6").on("click", '.order-tabs.order-tabs-pay-type a', function() {
        if ($(this).parent().hasClass('disabled')) {
            return false;
        }
        $(this).parents('.order-block').find(".conditions-block-line").hide();
        $(this).parents('.order-block').find(".conditions-block-line-" + $(this).attr('rel')).show();

        $(this).parent('li').addClass('active');
        $(this).parent('li').siblings('li').removeClass('active');
        $("#pay-type").val($(this).attr('rel'));
        if ($(this).attr('rel') == 1) {
            $("#pay-button").html('Оплатить');
        } else {
            $("#pay-button").html('Отправить');
        }
        $('#need_call_2').val(0);
        update_order();
        return false;
    });
    $("#win6").on("click", '#pay-button', function() {
        var vtel = $('#delivery-phone2').val();
        if (vtel.length<18 || ( (vtel.indexOf('+7 (495)')<0) && (vtel.indexOf('+7 (499)')<0) && (vtel.indexOf('+7 (9')<0) ) ) {
            $('#delivery-phone2').focus().parents('.sel-cov').addClass('tel_error2');
            
        } else {
            $('#delivery-phone2').parents('.sel-cov').removeClass('tel_error2');
            $('html,body').animate({scrollTop:0},0);
            $('#need_call_2').val(1);
            update_order();
            
           
            if ($("#pay-type").val() != 1) {
                $.fancybox.close();
            }
        }
        

    });

    if (location.hash && ((location.hash).indexOf('order_id=') + 1) ) {
        
        var order_id = location.hash.replace('#order_id=','')-0;
        //console.log(order_id)
        get_order(order_id, false, 1);
    }

    
    $("#win6").on("change", '#input-option3-styler', function() {
        if ( $('#input-option3:checked').length ){
            $('.otkritka_txt').show();
        } else {
            $('.otkritka_txt').hide();
            $('#text-option3')
        }
    });
})


function win18_fnc(dd) {
    $('#win18_tel').attr('required','required');
    $('#win18_tel').parents('form').addClass('check-oferta');
    if (dd==2){
        document.getElementById('order_type1').value = '2';       
    } else {
        document.getElementById('order_type1').value = '0';
        if ($('#win18_tel').val()==''){
            $('#win18_tel').removeAttr('required');
            $('#win18_tel').parents('form').removeClass('check-oferta');
        }
        
        
    }
    
}




$(document).ready(function() {
    //зоны доставки в карточке товара
    $('body').on("click", '#delivery_cart .delivery_cart-tabs li a', function() {
        $('#delivery_cart .delivery_cart-tabs li.active').removeClass('active');
        $(this.parentNode).addClass('active');
        var rel = $(this).attr('rel')-0;
        $('#delivery_cart .conditions-block-line.active').removeClass('active');
        $('#delivery_cart .conditions-block-line-'+rel).addClass('active');
        delivery_cart_check();
        setCookie('delivery_zone', rel, 1000, '/');
    });

});

function delivery_cart_check(){
    var tprice = $('#big-buket-price').val()-0;
    var zprice = $('#delivery_cart .delivery_cart-tabs li.active').attr('data-min_price')-0;
    if (tprice>=zprice){
        $('#delivery_io_text').html('Доставка<br> бесплатная');   
    } else {
        $('#delivery_io_text').html('Доставка<br> '+$('#delivery_cart .delivery_cart-tabs li.active').attr('data-price')+' руб.');       
    }
    flower_for_free_check();
}

var data_num1;
function flower_for_free_check(){
    var tprice = $('#big-buket-price').val()-0;
    var afff_min_price = $('#delivery_cart .delivery_cart-tabs li.active').attr('data-min_price')-0;
    var afff_price = $('#delivery_cart .delivery_cart-tabs li.active').attr('data-price')-0;
    $('#add_flower_for_free_none').hide();
    $('#add_flower_for_free').hide();
    if (tprice>=afff_min_price ){
        $('#add_flower_for_free_none').show();
        $('#add_flowers_for_free_delivery').val(0);
        $('#win7 #add_flower_for_free input[type="checkbox"]').removeAttr('checked');
        $('#win7 #add_flower_for_free .jq-checkbox').removeClass('checked');      
    } else {
        var afff_difference = 999999999999;
        var afff_num;
        var afff_min_price1;
        var value_price;
        if ( $('#win7 input[name="mono_bukets_is"]').length && $('#win7 input[name="mono_bukets_is"]').val()==1 ){
            $('#win7 .mono_bukets_num').each(function(){
                if (afff_difference==999999999999){
                    value_price = Number($('#buket-price').val() )+Number($(this).attr('data-price'));
                    if (value_price>afff_min_price){ 
                        afff_difference = value_price - Number($('#big-buket-price').val());
                        if ($(this).attr('data-num-default')>0){
                            afff_num = $(this).attr('data-num-default');
                        } else {
                            afff_num = $(this).attr('data-num');
                        }
                        
                     
                        
                        afff_min_price1 = value_price;
                        data_num1 = afff_num;
                    }
                }
                
            });
            var add_flower_for_free_text = 'Заказать '+afff_num+' шт. за '+afff_min_price1+'&#8381; и сэкономить '+afff_price+'&#8381; на доставке (+'+afff_difference+'&#8381;)';
        } else {
           
            var price =  Number($('#buket-price').val());
           
            var big_buket_price = Number($('#big-buket-price').val());

            afff_difference = afff_min_price - big_buket_price;

           
            var add_flower_for_free_text = 'Увеличить букет до '+afff_min_price+'&#8381; и сэкономить '+afff_price+'&#8381; на доставке (+'+afff_difference+'&#8381;)';
        }
        $('#add_flower_for_free_text').html(add_flower_for_free_text);
        if (afff_difference!=999999999999){
            $('#add_flower_for_free').show().attr('data-num', afff_num);
        } else {
            $('#add_flowers_for_free_delivery').val(0);
            $('#win7 #add_flower_for_free input[type="checkbox"]').removeAttr('checked');
            $('#win7 #add_flower_for_free .jq-checkbox').removeClass('checked');  
        }
       
    }
    
}
$(document).ready(function() {
    $('#win7 ').on("change", '#add_flower_for_free input[type="checkbox"]', function() {
        if ( $(this).prop('checked')==true ){
            
            let data_num = $(this).data('num');
            if (data_num && data_num > 0) {
                $(".price-dis-any.mono_bukets_num[data-num=" + data_num + "]").click();
                $(".price-dis-any.mono_bukets_num[data-num-default=" + data_num + "]").click();
            }

            flower_for_free_check()
            /*
            if ($('#win7 .price-block .price-dis-any[data-num="'+data_num1+'"]').length){
                $('#win7 .price-block .price-dis-any[data-num="'+data_num1+'"]').click();
            } else {
                $('#win7 .price-block .price-dis-any[data-num-default="'+data_num1+'"]').click();
            }
            */
            $('#add_flowers_for_free_delivery').val(1);
            
            
        } else {
            $('#add_flowers_for_free_delivery').val(0);
        }
        // console.log(data_num1);
            

    });
});


   
//букет-цветов-на-заказ
var buket_order_run = 0;
$(document).ready(function() {
    if ( $('#tovs-slider2').length ){
        tovs_slider2();
    }
     $('body').on("click", '.buket-order-info', function() {
        if (buket_order_run!=1){
            buket_order_run = 1;
            $.ajax({
                url: '/',
                method: 'POST',
                data: {
                    'module': 'buket',
                    'action': 'open_buket_to_order'
                },
                dataType: 'json',
                success: function(response) {
                
                    $('#win23-1').html(response);
                   
                     $.fancybox({
                        margin: 0,
                        padding: 0,
                        href: '#win23-1',
                        wrapCSS: 'fancy-wh',
                    });
                      if ($('#tovs-slider2 .slick-slide ').length>0){
       

                        setTimeout(tovs_slider2,500);
                    }
                }   
            });
        } else {
             $.fancybox({
                margin: 0,
                padding: 0,
                href: '#win23-1',
                wrapCSS: 'fancy-wh'
            });
        }
      return false;      
     });

    $('body').on("click", '.filter-type3-button', function() {

        if ($(this).parent().hasClass("active")) {
            if ( $(this).parents('#cb_param3').length || $(this).parents('#cb_param5').length ){
                $(this).parent().removeClass("active");
            }
            
            
        } else {
            if ( $(this).hasClass('filter-type3-button-radio') || ($(this).attr('rel')-0)==0 ){
                $(this).parents('.filter-list').find('li.active').removeClass("active");
            } else if (($(this).attr('rel')-0)!=0 ){
                $(this).parents('.filter-list').find('li.active a[rel="0"]').parent().removeClass("active");
            }
            $(this).parent().addClass("active");
        }
        reload_buket_to_order();
        return false;
    });

    $('body').on("click", '#cb_param2 .filter-type4-button', function() {
        $('#cb_param2-1 li').removeClass('active').hide();

         if ($(this).parent().hasClass("active")) {
            $(this).parent().removeClass("active");
            $('#cb_param2 li').show();
        } else {
            $('#cb_param2 li').hide();
            $(this).parents('.filter-list').find('li.active').removeClass("active");
            $(this).parent().addClass("active").show();
            var spl = $(this).attr('data-params').split('|');
            for (i=0; i<spl.length; i++){
                $('#cb_param2-1 li[rel="'+spl[i]+'"]').show();
            }
        }
        reload_buket_to_order();
        return false;
    });


    
    $('body').on("click", '#cb_param5-1 .filter-type3-button', function() {
        var rel = '#ctext-'+$(this).attr('rel');
        $('.buket-order-win__conditions-block-lines .buket-order-win__conditions-block-line').removeClass('active');
        if ($(this).parent().hasClass("active")) {
            $(rel).addClass('active');
        }
    });
    var  sbo_price='', sbo_occasion='', sbo_type='', sbo_flowers='', sbo_colors='';
    $('body').on("click", '#sbo_submit', function() {

        var sbo_text = 'Букет цветов на заказ \n';

        sbo_price = '';
        if ( $('#cb_param1 li.active a').length ){
            sbo_price = $.trim( $('#cb_param1 li.active a').text() );
        } else {
            sbo_price = 'не выбрано';
        }
        sbo_text += 'Цена букета с доставкой: '+sbo_price+' \n';

        
        $('#win18 input[name="buket_order_price"]').val($('#cb_param1 li.active a').attr('data-price'));

        sbo_occasion = '';
        if ( $('#cb_param2 li.active a').length ){
            $('#cb_param2 li.active a').each(function(i){
                if (i>0) sbo_occasion += ', ';
                sbo_occasion += $.trim( $(this).text() );
            });            
        } else {
            sbo_occasion = 'не выбрано';
        }
         sbo_text += 'Для кого и к какому событию: '+sbo_occasion+' \n';

         sbo_type = '';
        if ( $('#cb_param5-1 li.active a').length ){
            sbo_type = $.trim( $('#cb_param5-1 li.active a').text() );
        } else {
            sbo_type = 'не выбрано';
        }
        sbo_text += 'Тип букета: '+sbo_type+' \n';
        if ( ($('#cb_param5-1 li.active a').attr('rel')-0)==148){
            $('#win18 input[name="mono_bukets"]').val(0);
        } else {
            $('#win18 input[name="mono_bukets"]').val(1);    
        }
        

        sbo_flowers = '';
        if ( $('#cb_param5 li.active a').length ){
            $('#cb_param5 li.active a').each(function(i){
                if (i>0) sbo_flowers += ', ';
                sbo_flowers += $.trim($(this).text() );
            });            
        } else {
            sbo_flowers = 'не выбрано';
        }
         sbo_text += 'Любимые цветы получателя: '+sbo_flowers+' \n';

         sbo_colors = '';
         if ( $('#cb_param3 li.active a').length ){
            $('#cb_param3 li.active a').each(function(i){
                if (i>0) sbo_colors += ', ';
                sbo_colors += $.trim( $(this).text() );
            });            
        } else {
            sbo_colors = 'не выбрано';
        }
         sbo_text += 'Любимые цвета получателя: '+sbo_colors+' \n';

         if ($('#sbo_comment').val()!=''){
            sbo_text += 'Пожелания: '+$.trim($('#sbo_comment').val());
         } else {
            sbo_text += 'Пожелания: не выбрано';
         }
          $('#win18 #buket_order_text').val(sbo_text);
          $('#one-click-order-buket-id').val(335);
          $.fancybox({
            margin: 0,
            padding: 0,
            href: '#win18'
        });
    });
    
});
function reload_buket_to_order(){
     var params = new Array();
        var tmp = $(".active .filter-type3-button");
        for (var i = 0; i < tmp.length; i++) {
            params.push(tmp.eq(i).attr('rel'));
        }
        var tmp2 = $(".active .filter-type4-button");
        for (var i = 0; i < tmp2.length; i++) {
            params.push(tmp2.eq(i).attr('rel'));
        }
        // console.log(params)
        $.ajax({
            url: '/',
            method: 'POST',
            data: {
                'module': 'buket',
                'action': 'reload_buket_to_order',
                'params': params
            },
            dataType: 'json',
            success: function(response) {
                $('#tovs-slider2').slick('unslick');
                $('#tovs-slider2').html(response);
                if ($('#tovs-slider2 .slick-slide ').length>0){
                    tovs_slider2();
                }
                
            }   
        });

}
function tovs_slider2(){
    $('#tovs-slider2').slick({lazyLoad:'ondemand',slidesToShow:1,slidesToScroll:1,infinite:true,arrows:true,fade:false,dots:true,speed:500,swipe:true,touchMove:true});
}

function open_order_button_2(id){
    
    $('#order_show_2 .side-link1').attr('rel',id);
    $('#order_show_2 .side-link2').attr('rel',id);
    $('#order_show_2 .side-link1').html('Заказ №'+id);
    $('#order_show_2 .side-link2').html('<span>Ваш заказ №'+id+' получен</span> Перейти к заказу');
    $('.side1_virtual2').show();
}
        