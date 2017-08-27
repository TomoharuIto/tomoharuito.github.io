//=== Slideshow === スライドショー ===

$(function(){
  var intervalId;
  setTimer();

  function setTimer(){
   intervalId = setInterval(autoClick, 5000);
  }
/*
  function autoClick(){
   $('.Slide').find('.next a').click();
  }
*/
  function changeImage($click){
    var $current = $click.parent().siblings('figure').children('.MainImage').find('.current');
    var $new;
    var findSelector = '';

    if($click.parent().hasClass('next')){
      $new = $current.next();
      findSelector = ':first-child';
    } else {
      $new = $current.prev();
      findSelector = ':last-child';
    }
    if($new.length === 0){
      $new = $current.siblings(findSelector);
    }
    $current.removeClass('current');
    $new.addClass('current');
    setTimer();
  }

  $('.Slide')
  .on('click', '.prev a, .next a', function(event){
    event.preventDefault();
    event.stopPropagation();
    clearInterval(intervalId);
    changeImage($(this));
  });

});

//=== Tab Contents === タブコンテンツ ===

$(function(){

	$('.tabMenu')
  .on('click', 'li > a', function(event){
    event.preventDefault();
    var $this = $(this);
    $this.parent().siblings()
    .removeClass('selected')
    .end()
    .addClass('selected');
    var tabId = $this.data('tabid');

    $this.closest('.Tab').find('.tabContents').children()
    .each(function(){
      var $content = $(this);
      if($content.data('contentid') === tabId){
        $content.removeClass('hidden');
      } else {
        $content.addClass('hidden');
      }
    });
  });

});

// ========================================
// Back to top of page === ページの先頭へ戻る
// ========================================

$(function(){

  $('.scrollLink').on('click', function(event){
    event.preventDefault();
    var $this = $(this);
    var linkTo = $this.attr('href');
    var $target;
    var pos = 0;
    if(linkTo !== '#top'){
      $target = $(linkTo);
      pos = $target.offset().top;
    }
    $('html, body').animate({scrollTop: pos}, 400, 'swing');
  });

  var paper = Raphael('Arrow', '100%', '100%');
  paper.setViewBox(0, 0, 50, 50, true);
  var $Arrow = $('#Arrow');
  var $circle = paper.circle(25, 25, 0).attr({'fill':'rgba(201, 201, 201, 0.50)', 'stroke':'none'});
  var $path1 = 'M25,25 L25,25 L25,25';
  var $path2 = 'M12,31 L25,15 L38,31';
  var $path = paper.path($path1).attr({
                                  'fill':'none',
                                  'stroke':'rgba(255, 255, 255, 0.50)',
                                  'stroke-width':'4px',
                                  'stroke-linecap':'round',
                                  'stroke-linejoin':'round'
                                });
  var $visible = Raphael.animation({cx:25, cy:25, r:20}, 1000, 'bounce');
  var $visible1 = Raphael.animation({path:$path2}, 1000, 'bounce');
  var $Invisible = Raphael.animation({cx:25, cy:25, r:0}, 1000, 'backIn', function(){$Arrow.fadeOut();});
  var $Invisible1 = Raphael.animation({path:$path1}, 1000, 'backIn');

  $(window).scroll(function(){
    var $this = $(this);

    if($this.scrollTop() > 300){
      $Arrow
      .fadeIn('fast', function(){
        $circle.stop(false).animate($visible);
        $path.stop(false).animate($visible1);
      });
    } else {
      $circle.stop(false).animate($Invisible);
      $path.stop(false).animate($Invisible1);
    }
  });

});
// ©2017 Tomoharu Ito FYI: https://github.com/TomoharuIto/tomoharuito.github.io

//=== Main Image === メインイメージ ===
/*
$(function(){
  $('#MainImage').find('img.MainImage').attr({
    'src':'common/images/Main_Image906x560.png',
    'width':'906',
    'height':'560'
  });
});
*/
