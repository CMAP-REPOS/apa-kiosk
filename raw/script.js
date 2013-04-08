var App = {
  init: function() {
    $('#main').load('home.html', function() {
      var currentHref = 'home';
      // console.log(currentHref);
      $(this).addClass(currentHref);
    });
    $(document).on('click', '#main-nav li:not(.play-video,.pause-video,.action) a, #header a', App.loadMainPages);

    $(document).on('click', '#main.project-list .primary li a, .secondary a.more, .secondary a.back', App.loadMainPages);

    $(document).on('click', '#main.individuals-taking-action .primary li a', App.loadMainPages);

    $(document).on('click','.play-video, .pause-video', App.playPauseBtn);
    $(document).on('click', 'video', App.videoClicked);

    $(document).on('click', '.supporting-sustainable-local-food-2 .cycles-diagram li', App.cycleDiagram);

    $(document).on('click', '.supporting-sustainable-local-food-3 .secondary li a', App.cycleCharts);

    $(document).on('click', '.managing-congestion .phases a', App.congestionPhases);
    $(document).on('click', '.managing-congestion-2 .areas a', App.congestionAreas);

    $(document).on('click', '.action a', function(e) {
      e.preventDefault();
      var theTitle = $('#action h3').html();
      $('#action h3').hide();

      $('#action').dialog({
        width: 500,
        height: 290,
        show: 'fade',
        hide: 'fade',
        modal: true,
        title: theTitle,
        draggable: false,
        open: function() {
          $('.ui-dialog-titlebar-close').html('X');
        }
      });
    });

  },
  loadMainPages: function(e) {
    e.preventDefault();
    // var currentHref = window.location.pathname.replace('.html', '').replace('/', '');
    var href = $(this).attr('href');
    var hrefClass = href.replace('.html', '');

    $('#main').load(href, function() {
      $('#main').attr('class','');
      $('#main').addClass(hrefClass);
      history.pushState(null, null, href);
      // App.init();
      if (hrefClass === 'supporting-sustainable-local-food-2'){
        App.cyclePhases();
      }
      if (hrefClass === 'project-list' || hrefClass === 'individuals-taking-action' || hrefClass === 'supporting-sustainable-local-food-2' || hrefClass === 'supporting-sustainable-local-food-3' || hrefClass === 'managing-congestion' || hrefClass === 'managing-congestion-2'){
        $('.play-video a').removeClass('active').addClass('disabled');
      } else {
        $('.play-video a').removeClass('disabled').addClass('active');
      }
    });
    $('.pause-video').removeClass('active').addClass('inactive');
    $('.play-video').addClass('active').removeClass('inactive');
  },
  playPauseBtn: function(e) {
    e.preventDefault();
    if ($(this).children('a').hasClass('disabled')) {
      return false;
    } else if ($('.play-video').hasClass('active')) {
      $('.play-video').removeClass('active').addClass('inactive');
      $('.pause-video').addClass('active').removeClass('inactive');
      $('.primary video')[0].play();
    } else {
      $('.pause-video').removeClass('active').addClass('inactive');
      $('.play-video').addClass('active').removeClass('inactive');
      $('.primary video')[0].pause();
    }
  },
  videoClicked: function() {
    if ($('.primary video')[0].paused === true) {
      $('.play-video').removeClass('active').addClass('inactive');
      $('.pause-video').addClass('active').removeClass('inactive');
    } else {
      $('.pause-video').removeClass('active').addClass('inactive');
      $('.play-video').addClass('active').removeClass('inactive');
    }
  },
  cycleDiagram: function(e) {
    e.preventDefault();
    var clicked = $(this);
    var ind = clicked.index();

    clicked.parent().children().removeClass('active');
    clicked.addClass('active');
    $('.cycles li').removeClass('active');
    $('.cycles li').eq(ind).addClass('active');
    $('.cycles').parent().children('h1,p').hide();

  },
  cycleCharts: function(e) {
    e.preventDefault();
    var clicked = $(this);
    var ind = clicked.parent().index();

    clicked.parents().eq(1).children().removeClass('active');
    clicked.parent().addClass('active');

    $('.supporting-sustainable-local-food-3 .primary li').removeClass('active');
    $('.supporting-sustainable-local-food-3 .primary li').eq(ind).addClass('active');
  },
  cyclePhases: function() {
    function removeActiveCycles() {
      $.each($('.cycles-diagram li'), function(i){
        setTimeout(function() {
          $('.cycles-diagram li').eq(i).removeClass('active');
        }, i * 200);
      });
    }
    if ($('#main').hasClass('supporting-sustainable-local-food-2')) {
      $.each($('.cycles-diagram li'), function(i){
        setTimeout(function() {
          $('.cycles-diagram li').eq(i).addClass('active');
        }, i * 200);
      });

      setTimeout(function() { removeActiveCycles(); },1000);
    }
  },
  congestionPhases: function(e) {
    e.preventDefault();
    var ind = $(this).parent().index();

    $('.managing-congestion > .wrap').css({
      backgroundImage: 'url(../img/bg-congestion'+(ind+1)+'.jpg)'
    });
    $('.phases-description li').fadeOut();
    $('.phases-description li').eq(ind).fadeIn();
    $(this).parents().eq(1).children().removeClass('engaged');
    $(this).parent().addClass('engaged');
  },
  congestionAreas: function(e) {
    e.preventDefault();
    var ind = $(this).parent().index();

    $('.description li').fadeOut();
    $('.description li').eq(ind).fadeIn();
    $(this).parents().eq(1).children().removeClass('engaged');
    $(this).parent().addClass('engaged');
  }
};
$(function() {
  App.init();
});