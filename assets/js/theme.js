// -----------------------------

//   JS INDEX
/* =================== */
/* 

    ## Animation Js
    ## Preloder
    ## Stiky menu
    ## Scrool Menu
    ## Scrool Up
    ## smart menu
    ## smoothscroll 
    ## Sidepanel JS 
    ## Owl Carousel 
    ## Timer Js
    ## Googel Map
    ## Ajax
    ## RTL Switch

*/
/*Animation js - High Performance & Snappy*/
AOS.init({
    offset:     60,
    delay:      0,
    easing:     'ease-out-cubic',
    duration:   800,
    disable:    false,
    once:       true,
    mirror:     false,
    startEvent: 'DOMContentLoaded'
});
  
(function($) {
  "use strict"; 

//**================== Preloder========================*//
$(window).on('load', function() {
  setTimeout(function() {
    $('#preloader').addClass('loaded');
    setTimeout(function() {
      $('#preloader').fadeOut(500, function() { $(this).remove(); });
    }, 400);
  }, 1100); // Allow full letter animation to display smoothly without getting cut
});

// Fallback in case window load takes long
setTimeout(function() {
  if ($('#preloader').length) {
    $('#preloader').addClass('loaded');
    setTimeout(function() {
      $('#preloader').fadeOut(500, function() { $(this).remove(); });
    }, 400);
  }
}, 3500);
//**================== Tree Hues Project Search & URL Sanitiser ====================*//
window.TreeHuesSearch = (function() {
  // Whitelist of strictly valid and existing project IDs
  var validProjectIds = [
    'vajram-residence',
    'v2-poorvi-enclave',
    'after-the-rain-theatre',
    'araku-coffee-flagship',
    'windmills-villa-64',
    'mirabilis-residence'
  ];

  // Comprehensive alias mappings: handles brand queries, space-separated and hyphenated names, and project keywords
  var projectAliases = {
    // Brand & General searches -> Vajram Essenza flagship residence
    'tree': 'vajram-residence',
    'tree-hues': 'vajram-residence',
    'treehues': 'vajram-residence',
    'tree-hue': 'vajram-residence',

    // Vajram Essenza
    'vajram': 'vajram-residence',
    'vajram-residence': 'vajram-residence',
    'vajram-essenza': 'vajram-residence',
    'essenza': 'vajram-residence',
    'bhavya': 'vajram-residence',
    'akshat': 'vajram-residence',
    'thanisandra': 'vajram-residence',

    // V2 Poorvi Enclave
    'v2': 'v2-poorvi-enclave',
    'v2-poorvi': 'v2-poorvi-enclave',
    'poorvi': 'v2-poorvi-enclave',
    'poorvi-enclave': 'v2-poorvi-enclave',
    'arpita': 'v2-poorvi-enclave',
    'nithish': 'v2-poorvi-enclave',

    // After The Rain Cinema
    'after-the-rain': 'after-the-rain-theatre',
    'after-rain': 'after-the-rain-theatre',
    'theatre': 'after-the-rain-theatre',
    'theater': 'after-the-rain-theatre',
    'cinema': 'after-the-rain-theatre',
    'home-theatre': 'after-the-rain-theatre',
    'home-theater': 'after-the-rain-theatre',
    'atmos': 'after-the-rain-theatre',
    'dolby': 'after-the-rain-theatre',
    'dolby-atmos': 'after-the-rain-theatre',
    'yelahanka': 'after-the-rain-theatre',
    'rao': 'after-the-rain-theatre',

    // Araku Coffee Flagship
    'araku': 'araku-coffee-flagship',
    'araku-coffee': 'araku-coffee-flagship',
    'coffee': 'araku-coffee-flagship',
    'bamboo': 'araku-coffee-flagship',
    'ashok-nagar': 'araku-coffee-flagship',

    // Windmills of Your Mind Villa 64
    'windmills': 'windmills-villa-64',
    'windmills-villa': 'windmills-villa-64',
    'villa-64': 'windmills-villa-64',
    'kulkarni': 'windmills-villa-64',
    'whitefield': 'windmills-villa-64',
    'teak': 'windmills-villa-64',

    // Mirabilis Residence
    'mirabilis': 'mirabilis-residence',
    'amruth': 'mirabilis-residence',
    'kalpitha': 'mirabilis-residence',

    // Legacy URLs
    'vdb-willow-farm': 'vajram-residence',
    'shriram-sahana': 'v2-poorvi-enclave',
    'independent-bungalow': 'windmills-villa-64',
    'modular-kitchen-suite': 'araku-coffee-flagship',
    'prestige-white-meadows': 'windmills-villa-64'
  };

  function normalizeQuery(str) {
    if (!str || typeof str !== 'string') return '';
    return str
      .toLowerCase()
      .trim()
      .replace(/[\s_+]+/g, '-')       // Convert spaces, underscores, pluses to hyphens
      .replace(/[^a-z0-9-]/g, '')     // Sanitize: strip out HTML tags, script injection, special characters
      .replace(/-+/g, '-')            // Collapse multiple hyphens
      .replace(/^-|-$/g, '');         // Trim leading/trailing hyphens
  }

  function resolveProjectId(query, projectsData) {
    var normalized = normalizeQuery(query);
    if (!normalized) return null;

    // 1. Direct whitelist match
    if (validProjectIds.indexOf(normalized) !== -1) {
      return normalized;
    }

    // 2. Alias mapping match
    if (projectAliases[normalized]) {
      return projectAliases[normalized];
    }

    // 3. Substring / keyword match against projectsData if available
    if (projectsData && typeof projectsData === 'object') {
      for (var id in projectsData) {
        if (Object.prototype.hasOwnProperty.call(projectsData, id)) {
          var p = projectsData[id];
          var normId = normalizeQuery(p.id);
          var normTitle = normalizeQuery(p.title);
          var normClient = normalizeQuery(p.client);
          var normLoc = normalizeQuery(p.location);

          if (normId.indexOf(normalized) !== -1 || normalized.indexOf(normId) !== -1) {
            return id;
          }
          if (normTitle.indexOf(normalized) !== -1) {
            return id;
          }
          if (normClient.indexOf(normalized) !== -1 || normLoc.indexOf(normalized) !== -1) {
            return id;
          }
        }
      }
    }

    return null;
  }

  return {
    validProjectIds: validProjectIds,
    projectAliases: projectAliases,
    normalizeQuery: normalizeQuery,
    resolveProjectId: resolveProjectId
  };
})();

// Attach Global Search Form Submission Handler with Safe URL Encoding
$(document).on('submit', '.nav-search-form', function(e) {
  e.preventDefault();
  var input = $(this).find('input[name="search"]');
  var query = (input.val() || '').trim();
  if (query) {
    if (window.TreeHuesSearch && window.TreeHuesSearch.resolveProjectId) {
      var resolved = window.TreeHuesSearch.resolveProjectId(query);
      if (resolved) {
        window.location.href = resolved + '.html';
        return;
      }
    }
    window.location.href = 'project-details.html?search=' + encodeURIComponent(query);
  }
});

//**================== Auto-Highlight Active Navigation Tab ====================*//
(function highlightActiveNav() {
  var path = window.location.pathname.split("/").pop() || "index.html";
  if (path === "") path = "index.html";
  var baseName = path.replace('.html', '');
  var isDedicatedProjectPage = window.TreeHuesSearch && window.TreeHuesSearch.validProjectIds && window.TreeHuesSearch.validProjectIds.indexOf(baseName) !== -1;

  $('#main-menu > li:not(.mobile-drawer-brand):not(.nav-quote-cta):not(.mobile-drawer-footer):not(.nav-search-item)').removeClass('active');
  $('#main-menu > li:not(.mobile-drawer-brand):not(.nav-quote-cta):not(.mobile-drawer-footer):not(.nav-search-item) > a').removeClass('active current');
  $('#main-menu > li:not(.mobile-drawer-brand):not(.nav-quote-cta):not(.mobile-drawer-footer):not(.nav-search-item) > a').each(function() {
    var href = $(this).attr('href');
    if (href === path || (path === "index.html" && href === "index.html") || (isDedicatedProjectPage && href === "project.html")) {
      $(this).parent().addClass('active');
      $(this).addClass('active');
    }
  });
})();
//**================== End Active Navigation ====================*//

//**================= Sticky Nav (High Performance Throttled) =====================**//
var isHeaderFixed = false;
var scrollTicking = false;

window.addEventListener('scroll', function() {
  if (document.body.classList.contains('mobile-menu-active')) return;
  if (!scrollTicking) {
    window.requestAnimationFrame(function() {
      var scrollY = window.pageYOffset || document.documentElement.scrollTop;
      var $header = $('.mextreo-header-area');
      var $scrollToTop = $('.scroll-to-target');

      if (scrollY > 50) {
        if (!isHeaderFixed) {
          $header.addClass('nav-fixed');
          $scrollToTop.addClass('open');
          isHeaderFixed = true;
        }
      } else {
        if (isHeaderFixed) {
          $header.removeClass('nav-fixed');
          $scrollToTop.removeClass('open');
          isHeaderFixed = false;
        }
      }
      scrollTicking = false;
    });
    scrollTicking = true;
  }
}, { passive: true });



//**===================Scroll UP ===================**//

if ($('.scroll-to-target').length) {
  $(".scroll-to-target").on('click', function () {
    var target = $(this).attr('data-target');
    // animate
    $('html, body').animate({
      scrollTop: $(target).offset().top
    }, 1000);

  });
}

//**===================Scroll UP ===================**//

//**================= Smart Menu =====================**//
// SmartMenus init
$(function() {
  $('#main-menu').smartmenus({
    subMenusSubOffsetX: 6,
    subMenusSubOffsetY: -8
  });
});

// Modern Luxury Mobile Menu Interaction
$(function() {
  var $mainMenuState = $('#main-menu-state');
  if ($mainMenuState.length) {
    $mainMenuState.on('change', function() {
      if (this.checked) {
        $('body').addClass('mobile-menu-active');
      } else {
        $('body').removeClass('mobile-menu-active');
      }
    });

    // Auto-close menu when tapping any link
    $('#main-menu a').on('click', function() {
      if ($(window).width() < 992 && $mainMenuState.prop('checked')) {
        $mainMenuState.prop('checked', false).trigger('change');
      }
    });

    // Clean up on page unload
    $(window).on('beforeunload unload', function() {
      if ($mainMenuState.length && $mainMenuState[0].checked) {
        $mainMenuState.prop('checked', false);
        $('body').removeClass('mobile-menu-active');
      }
    });
  }
});

//**================= End Smart Menu =====================**//


    /*---------------------
    Smooth scroll for in-page tabs, chips and anchor links
    --------------------- */
    $('a.service-chip-link, .smoothscroll, a[href^="#"]:not([href="#"]):not([href="#!"]):not([data-toggle]):not([data-bs-toggle])').on('click', function(e) {
      var targetHash = this.hash;
      if (!targetHash) return;
      var $target = $(targetHash);
      if ($target.length) {
        e.preventDefault();
        var headerHeight = $('.mextreo-header-area').outerHeight() || 80;
        var offsetTop = $target.offset().top - headerHeight - 20;
        if (offsetTop < 0) offsetTop = 0;
        
        $('html, body').stop().animate({
          scrollTop: offsetTop
        }, 650);

        if (history.pushState) {
          history.pushState(null, null, targetHash);
        }
      }
    });


  /*---------------------



  /*---------------------
    Sidepanel JS
    --------------------- */
    $('.sidebar-btn').on('click', function() {
      $('.side-panel').removeClass('hide');
  });
  $('.close-sp').on('click', function() {
      $('.side-panel').addClass('hide');
  });


  
//**================== Owl Carousl========================*//

if ($('.project').length > 0) {   

  $('.project').owlCarousel({
  
    loop:true,
    margin:30,
    center:true,
    dots:false,
    nav:true,
    autoplay:false,
    autoplayTimeout:3000,
    smartSpeed :3000,
    responsive:{
        0:{
            items:1
        },
        450:{
            items:2
            },
        600:{
            items:3
            },
        1000:{
            items:3
        }
    }
  })
  }

//**================== Owl Carousl========================*//

//Timer Js//

 if ($('body').find('#clockdiv').length !== 0) {

    function getTimeRemaining(endtime) {
      var t = Date.parse(endtime) - Date.parse(new Date());
      var seconds = Math.floor((t / 1000) % 60);
      var minutes = Math.floor((t / 1000 / 60) % 60);
      var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
      var days = Math.floor(t / (1000 * 60 * 60 * 24));
      return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
      };
    }
    
    function initializeClock(id, endtime) {
      var clock = document.getElementById(id);
      var daysSpan = clock.querySelector('.days');
      var hoursSpan = clock.querySelector('.hours');
      var minutesSpan = clock.querySelector('.minutes');
      var secondsSpan = clock.querySelector('.seconds');
    
      function updateClock() {
        var t = getTimeRemaining(endtime);
    
        daysSpan.innerHTML = t.days;
        hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
        minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
        secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
    
        if (t.total <= 0) {
          clearInterval(timeinterval);
        }
      }
    
      updateClock();
      var timeinterval = setInterval(updateClock, 1000);
    }
    var deadline = new Date("Sep5, 2020 19:37:25"); 
    initializeClock('clockdiv', deadline);
  } 

  //**=================End Timer=====================**//
  



}(jQuery));



//**=================== Google Map ==========================**//

if ($('#googleMap').length > 0) { 
  var user_lat, user_lng;
      var map;
  
      function initMap() {
          map = new google.maps.Map(document.getElementById('googleMap'), {
              center: {
                  lat: 23.782062,
                  lng: 90.416053
              },
              zoom: 15,
              scrollwheel: false
          });
                
        var marker = new google.maps.Marker({
          position:  {  lat: 23.782062, lng: 90.416053},
          map: map,
       /*    icon: "assets/img/locator.png" */
        });
  
            } 
          }
  
  //*================ End Google Map ============*//
  
/*---------------------
    // Ajax Contact Form
    --------------------- */
   $('.cf-msg').hide();
    $('form#cf button#submit').on('click', function() {
        var name = $('#name').val();
        var email = $('#email').val();
        var msg = $('#msg').val();
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    
        if (!regex.test(email)) {
            alert('Please enter valid email');
            return false;
        }
    
        name = $.trim(name);
        email = $.trim(email);
        msg = $.trim(msg);
    
        if (name != '' && email != '' && msg != '') {
            var values = "name=" + name + "&email=" + email + "&msg=" + msg;
            $.ajax({
                type: "POST",
                url: "assets/mail-sender/contact.php",
                data: values,
                success: function() {
                    $('#name').val('');
                    $('#email').val('');
                    $('#msg').val('');
    
                   $('.cf-msg').fadeIn().html('<div class="alert alert-success"><strong>Success!</strong> Email has been sent successfully.</div>');
                    setTimeout(function() {
                        $('.cf-msg').fadeOut('slow');
                    }, 4000);
                }
            });
        } else {
            $('.cf-msg').fadeIn().html('<div class="alert alert-danger"><strong>Warning!</strong> Please fillup the informations correctly.</div>')   
            $('.cf-msg').fadeOut(2000)
        }
        return false;
    });

// Ajax Contact Form JS END


$(document).ready(function() {
  var o1 = $('#c1'), o2 = $('#c2'), o3 = $('#c3');

  //Sync o2 by o1
  o1.on('click', '.owl-next', function () {
    o2.trigger('next.owl.carousel')
  });
  o1.on('click', '.owl-prev', function () {
    o2.trigger('prev.owl.carousel')
  });
  //Sync o1 by o2
  o2.on('click', '.owl-next', function () {
    o1.trigger('next.owl.carousel')
  });
  o2.on('click', '.owl-prev', function () {
    o1.trigger('prev.owl.carousel')
  });
  //Sync o1 by o3
  o2.on('click', '.owl-next', function () {
    o3.trigger('next.owl.carousel')
  });
  o2.on('click', '.owl-prev', function () {
    o3.trigger('prev.owl.carousel')
  });
 
  //Carousel settings
  o1.owlCarousel({
    center : true,
   loop : true,
   items : 1,
   margin:0,
   dots:false,
   nav : false,
   smartSpeed :3000,
  });
  o2.owlCarousel({
    center : true,
   loop : true,
   items : 1,
   margin:0,
   navText : ["","<i class='flaticon-right-arrow'></i>"],
   nav : true,
   smartSpeed :1500,
  });
  o3.owlCarousel({
    center : true,
   loop : true,
   items : 1,
   margin:0,
   dots:false,
   nav : false,
   smartSpeed :3000,
  });
 });

  /*================== Tree Hues Home Gallery Carousel Activation ==================*/
  $(document).ready(function() {
    var galleryCarousel = $("#treeHuesGalleryCarousel");
    if (galleryCarousel.length) {
      galleryCarousel.owlCarousel({
        loop: true,
        margin: 24,
        autoplay: true,
        autoplayTimeout: 3500,
        autoplayHoverPause: true,
        smartSpeed: 800,
        dots: false,
        nav: false,
        responsive: {
          0: {
            items: 1,
            stagePadding: 20
          },
          576: {
            items: 2,
            stagePadding: 20
          },
          992: {
            items: 3,
            stagePadding: 30
          },
          1200: {
            items: 4,
            stagePadding: 40
          }
        }
      });

      $('#galleryPrevBtn').on('click', function() {
        galleryCarousel.trigger('prev.owl.carousel');
      });
      $('#galleryNextBtn').on('click', function() {
        galleryCarousel.trigger('next.owl.carousel');
      });
    }

    if ($.fn.fancybox) {
      $('[data-fancybox="home-gallery"]').fancybox({
        buttons: ["zoom", "slideShow", "fullScreen", "thumbs", "close"],
        animationEffect: "fade",
        transitionEffect: "slide",
        loop: true
      });
    }

    // Testimonials Owl Carousel Slider Initialization
    if ($('#testimonialCarousel').length) {
      $('#testimonialCarousel').owlCarousel({
        loop: true,
        margin: 25,
        nav: false,
        dots: true,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        smartSpeed: 800,
        responsive: {
          0: { items: 1 },
          768: { items: 2 },
          1100: { items: 3 }
        }
      });
    }
  });



  // Custom Animated Luxury Mouse Cursor
  if (window.innerWidth >= 992) {
    if (!$('.custom-cursor-dot').length) {
      $('body').append('<div class="custom-cursor-dot"></div><div class="custom-cursor-outline"></div>');
      
      var cursorDot = document.querySelector('.custom-cursor-dot');
      var cursorOutline = document.querySelector('.custom-cursor-outline');
      var mouseX = 0, mouseY = 0;
      var outlineX = 0, outlineY = 0;

      window.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
      });

      function animateCursor() {
        outlineX += (mouseX - outlineX) * 0.18;
        outlineY += (mouseY - outlineY) * 0.18;
        cursorOutline.style.left = outlineX + 'px';
        cursorOutline.style.top = outlineY + 'px';
        requestAnimationFrame(animateCursor);
      }
      animateCursor();

      var interactiveElements = 'a, button, .editorial-project-card, .pg-item, .pg-grid-card, .luxury-testimonial-card, input, textarea, select';
      $(document).on('mouseenter', interactiveElements, function() {
        $('body').addClass('cursor-hover');
      }).on('mouseleave', interactiveElements, function() {
        $('body').removeClass('cursor-hover');
      });
    }
  }
