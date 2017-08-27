//=== Back to top of page === ページの先頭へ戻る ===

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

//=== Gallery === ギャラリー ===

$(function(){

  function preloadImage(path){  // 大きな画像をあらかじめプリロードする
    $('<img>').attr('src', path);
  }

  $('.Gallery')
  .children('.PicFrames').each(function(){ // プリロードしておいた大きな画像をサムネイルのdata-imgに渡す
    var imgPath = $(this).children('a').data('img');
    preloadImage(imgPath);
  })
  .on('mouseenter', '.Thumbnails', function(event){ // サムネイルをアニメーション
    event.preventDefault();
    $(this).find('.caption')
    .stop(false)
    .fadeIn(400);
  })
  .on('mouseleave', '.Thumbnails', function(event){
    event.preventDefault();
    $(this).find('.caption')
    .stop(false)
    .fadeOut(400);
  })
  .each(function(){ // タッチデバイスで mouseenter, mouseleave イベントをキャンセル
    try{
      event = document.createEvent('TouchEvent');
      $(this)
      .off('mouseenter')
      .off('mouseleave');
    } catch(err) {
    }
  })
  .on('click', '.Thumbnails', function(event){ // サムネイルをクリックして、モーダルウィンドウを表示。
    event.preventDefault();
    var $this = $(this);
    var $window = $(window);
    var imagePath = $this.data('img');

    $('.InModal')
    .attr('src', imagePath) //大きな画像を差し替える
    .animate({
      opacity: 1
    }, 500, 'swing')
    .css({
      'max-height':($window.height() * 0.95),
      'max-width':($window.width() * 0.95)
    });

    $this.parent().addClass('current'); // ターゲットに .current を追加。
    var $Modal = $('#Modal'); // モーダルウィンドウを表示
    $Modal
    .removeClass('hidden')
    .addClass('show')
    .animate({
        opacity: 1
      }, 500, 'swing');

    $window
    .on('resize', function(){	 // 画面サイズに合わせてImageを調整
      clearTimeout(DurayTimer);

      var DurayTimer = setTimeout(function(){ // イベントのタイミングを遅らせることでresize時の負荷を軽減
        $('.InModal')
        .css({
          'max-height':($window.height() * 0.95),
          'max-width':($window.width() * 0.95)
        });
      }, 800);
    });

  });

  // ▼ モーダルウィンドウの .next .prev .close ボタンが押された時の処理。▼
  function changeImage($click){
    var $Gallery = $('.Gallery');
    var $current = $Gallery.children('.current');
    var $new;
    var findSelector = ' ';
    var value = 1;
    var $Deg = -180;
    var $Modal = $('.InModal').css('opacity', 0);

    if($click.hasClass('next')){ // .next ボタン
      $new = $current.next();
      findSelector = ':first-child';
    }

    if($click.hasClass('prev')){ // .prev ボタン
      $new = $current.prev();
      findSelector = ':last-child';
      $Deg = 180;
    }

    if($click.hasClass('close')){  // .close ボタン
      hideModal();
      $Gallery.children().removeClass('current');
    }

    function hideModal() { // モーダルウィンドウを非表示にする
      $('#Modal')
      .css('opacity', 0) //アニメーション用に 'opacity' を0に戻す。
      .removeClass('show')
      .addClass('hidden')
      .children('img').removeAttr('src').css('opacity', 0);
    }

    if($new.length === 0){ // 列の最後(最初)の画像になったら、列の最初(最後)に戻す。
      $new = $current.siblings(findSelector);
    }

    $current.removeClass('current');
    $new.addClass('current');

    var $imgPath = $new.children('a').data('img'); // .current の data-img を取得。
    $Modal
    .attr('src', $imgPath) // それを大きな画像に代入。
    .stop(true).animate(
      {opacity: value},
      {
      duration:1000,
      step:function(now, tween){
        var rotate = 'rotateY(' + (1 - now) * ($Deg / value) + 'deg)';
        $(this)
        .css({
          'transform': rotate
        });
      }
    });
  }

  $('#Modal').on('click', '.next, .prev, .close', function(event){
    event.preventDefault();
    changeImage($(this));
  });

});
// ©2017 Tomoharu Ito FYI: https://github.com/TomoharuIto/tomoharuito.github.io
