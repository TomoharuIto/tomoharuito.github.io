// ======================================================
// JS for the whole Website
// ======================================================

// ==================================
// Drop down Menu
// ==================================

$(function(){

  function mediaDetect(query){
    if(window.matchMedia){
      return window.matchMedia(query).matches;
    } else {
      return false;
    }
}

  var $Drop = $('.dropdownMenu');

  $(window).on('load resize', function(){
    if(mediaDetect('(max-width:736px)')){
      $Drop
      .off('mouseenter')
      .off('mouseleave');
    } else {
      $Drop
      .on('mouseenter', function(){
        $(this).children('.list').stop().slideDown('fast');
      })
      .on('mouseleave', function(){
        $(this).children('.list').stop().slideUp('fast');
      })
      .each(function(){ // タッチデバイスで mouseenter, mouseleave イベントをキャンセル
        try{
          event = document.createEvent('TouchEvent');
          $(this)
          .off('mouseenter')
          .off('mouseleave');
        } catch(err) {
        }
      });
    }
  });

});

// ==================================
// Fade animation
// ==================================

$(function(){

  var $Fade = $('header').find('a.Fade');
  var $Main = $('#pageMain');
  $Main.addClass('fade-in');

  $Fade
  .on('click', function(event){
    event.preventDefault();
    var $Pass = $(this).attr('href');

    $Main
    .removeClass('fade-in')
    .addClass('fade-out');
    setTimeout(function(){
      location.href = $Pass;}, 1000);
  });

});

// ==================================
// Smartphone Global navigation Button
// ==================================
/*
$(function(){

  function mediaDetect(query){
    if(window.matchMedia){
      return window.matchMedia(query).matches;
    } else {
      return false;
    }
  }

  var $nav = $('Global_nav');
  var paper = Raphael('Horizontal', '100%', '100%');

  paper.setViewBox(0, 0, 50, 50, true);
  var path1 = 'M44,6 L4,6 M44,16 L4,16 M44,26 L4,26 M44,36 L4,36';
  var path2 = ' M6,4 L6,44 M16,4 L16,44 M26,4 L26,44 M36,4 L36,44';
  var path = paper.path(path1).attr({
                                stroke:'rgba(201, 201, 201, 0.50)',
                                'stroke-width':'5',
                                'stroke-linecap':'butt',
                                fill:'none'
                              });
  var Anim = Raphael.animation({path:path2}, 400, 'linear');
  var Anim1 = Raphael.animation({path:path1}, 400, 'linear');

  $(window)
  .on('resize', function(){
      var listFlex= $nav.css('flex-direction');
      var $DelayTimer;
      clearTimeout($DelayTimer);

      $DelayTimer = setTimeout(function(){
        if((listFlex === 'row') && (mediaDetect('(min-width:736px)'))){
          $nav.css('display','flex');
        } else if((listFlex === 'column') && (mediaDetect('(max-width:736px)'))){
        if($nav.css('display') === 'none'){
          $nav.css('display','none');
        } else if($nav.css('display') === 'flex'){
          $nav.css('display','flex');
          path.animate(Anim);
        }
        }
      }, 300);
  });

  $('.Menu_btn')
  .on('click', function(event){
    event.preventDefault();
    if(Raphael.isPointInsideBBox(path.getBBox(false), 4,6)){
      path.animate(Anim);
      $nav.slideDown(400);
    } else {
      path.animate(Anim1);
      $nav.slideUp(400);
    }
  });

});
*/
// ==================================
// Test script
// ==================================
$(function(){

  function mediaDetect(query){
    if(window.matchMedia){
      return window.matchMedia(query).matches;
    } else {
      return false;
    }
  }


  var $Nav = $('#Wrapper_globalNav');
  var $Menu_contents = $Nav.html();

  $(window).on('load', function(){

    function Menu_set(){

      if(mediaDetect('(max-width:736px)')){
        if(!($('#Wrap_menuBtn').length)){
          $('header').append('<div id="Wrap_menuBtn"><div class="Menu_btn"><a href="#"><div id="Horizontal"></div></a></div><!-- /.Menu_btn --></div><!-- /#Wrap_menuBtn -->');
          $('#Wrap_menuBtn').append($Menu_contents);

          var $Menu_list = $('#Wrap_menuBtn > ul');
          var $Menu_btn = $('.Menu_btn');

          var paper = Raphael('Horizontal', '100%', '100%');
          paper.setViewBox(0, 0, 50, 50, true);
          var path1 = 'M44,6 L4,6 M44,16 L4,16 M44,26 L4,26 M44,36 L4,36';
          var path2 = 'M6,4 L6,44 M16,4 L16,44 M26,4 L26,44 M36,4 L36,44';
          var path = paper.path(path1).attr({
            stroke:'rgba(201, 201, 201, 0.50)',
            'stroke-width':'5',
            'stroke-linecap':'butt',
            fill:'none'
          });
          var Anim = Raphael.animation({path:path2}, 400, 'linear');
          var Anim1 = Raphael.animation({path:path1}, 400, 'linear');

          $Menu_btn.on('click', function(e){
            e.preventDefault();
            if(Raphael.isPointInsideBBox(path.getBBox(false), 4,6)){
              path.animate(Anim);
              $Menu_list.slideDown(400);
            } else {
              path.animate(Anim1);
              $Menu_list.slideUp(400);
            }
//             $Menu_list.slideToggle($Slide_speed);
          });
        }
      } else {
        $('#Wrap_menuBtn').remove();
      }
    }

    $(window).on('resize', function(){
      Menu_set();
    });

    Menu_set();
  });
});

// ==================================
// Sticky Bar
// ==================================

$(function(){

  function mediaDetect(query){
    if(window.matchMedia){
      return window.matchMedia(query).matches;
    } else {
      return false;
    }
  }

  var $Fixed = $('.fixedMenu');

  $Fixed
  .each(function(){
    var $this = $(this);
    $this.data('initial', $this.offset().top);
  });

  $(window)
  .on('scroll', function(){
    var scrollValue = $(this).scrollTop();
    $Fixed
    .trigger('customScroll', {posY: scrollValue});
  })
  .on('resize load', function(){
    if(mediaDetect('(max-width:736px)')){

      $('.Global_nav').addClass('fixedMenu');
      $Fixed
      .off('customScroll')
      .addClass('fixed')
      .css({top:'60px'})
      .next('.substitute').remove();
    } else {
      $('.Global_nav').removeClass('fixedMenu');
      $Fixed
      .removeClass('fixed')
      .on('customScroll', function(event, object){

        var $this = $(this);

        if($this.data('initial') <= object.posY) {
          if(!$this.hasClass('fixed')){
            var $substitute = $('<div></div>');
            $substitute
            .css({
              'width':'auto',
              'height':($this.outerHeight(true))
            })
            .addClass('substitute');
            $this
            .after($substitute)
            .addClass('fixed')
            .css({top:0});
          }
        } else {
          $this.removeClass('fixed')
          .next('.substitute').remove();
        }
      });
    }
  });
});

// ==================================
// Translate
// ==================================

$(function(){

  var paper = Raphael('Switch', '100%', '100%');
  paper.setViewBox(0, 0, 95, 30, true);
  var $Btn = paper.add([
    {
      type:'rect',
      x:0,
      y:0,
      width:10,
      height:30,
      fill:'#FCFCFC',
      stroke:'#C9C9C9',
      'stroke-width':'1px',
      r:2,
      href:'#'
    },
    {
      type:'rect',
      x:10,
      y:0,
      width:85,
      height:30,
      fill:'#FCFCFC',
      stroke:'none',
      r:2,
      href:'#'
    },
    {
      type:'text',
      text:'Japanese',
      'font-family':'"Helvetica Neue", Arial, sans-serif',
      x:53,
      y:14,
      fill:'#9B9B9B',
      stroke:'none',
      'font-size':'14rem',
      href:'#'
    },
    {
      type:'rect',
      x:-85,
      y:0,
      width:85,
      height:30,
      fill:'#C9C9C9',
      stroke:'none',
      r:2,
      href:'#'
    },
    {
      type:'text',
      text:'Engrish',
      'font-family':'"Helvetica Neue", Arial, sans-serif',
      x:'-40',
      y:14,
      fill:'#FCFCFC',
      stroke:'none',
      'font-size':'16rem',
      href:'#'
    }
    ]);

  paper.add([
    {
      type:'rect',
      x:0,
      y:0,
      width: 95,
      height:30,
      stroke:'#C9C9C9',
      'stroke-width':'2px',
      fill:'none',
      r:3,
      href:'#'
    }
  ]);

  var $Switch = $('#Switch');
  var $target = $('main').find('.langCode');
  var $anim = Raphael.animation({transform:'t85, 0',}, 500, 'easeIn');
  var $anim1 = Raphael.animation({transform:'t0, 0'}, 500, 'easeIn');

  if(Cookies.get('Language')){ // <= js-cookie, cookieに保存する値を代入
    $Btn.transform('t85, 0');
    $target.toggleClass('hidden01');
  }

  $Switch
  .on('click', 'a', function(event){
    event.preventDefault();
    if(Raphael.isPointInsideBBox($Btn[0].getBBox(false), 0,0)){
      $Btn.animate($anim);
      Cookies.set('Language', 'En', {path:'/'}); // <= cookieを呼び出す
    } else {
      $Btn.animate($anim1);
      Cookies.remove('Language', {path:'/'}); // <= cookieを削除
    }
    setTimeout(function(){
      $target.toggleClass('hidden01');
    }, 700);
  });

});

// ==================================
// Prohibited to copy
// ==================================

$(function(){
  var $body = $('body');
  var $target = $body.find('img').not('.InModal');
  var $wrapper = $('<div></div>');
  $wrapper.addClass('WrapperImg');

  $target.wrap($wrapper)
  .on('contextmenu', function(e){
     e.preventDefault();
   });

  $body // ctrl + C || ctrl + A key を無効化
  .keydown(function(e){     if((e.ctrlKey === true && e.which === 67) ||
      (e.ctrlKey === true && e.which === 65)){
      e.preventDefault();
    }
  })
  .on('copy cut', function(e){
    e.preventDefault();
  });

});

// ==================================
// Copyright year update automatically
// ==================================

window.onload = function(){

  var now = new Date();
  var year = now.getFullYear();
  console.log(year);
  document.getElementById('year').textContent = year;

};

// ©2017 Tomoharu Ito FYI: https://github.com/TomoharuIto/tomoharuito.github.io
