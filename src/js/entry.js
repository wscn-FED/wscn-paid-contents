
require('../scss/home.scss');
function successHandler(data) {
  var carouselHtml = template('carousel', data.carousel);
  $('#ws-carousel').html(carouselHtml);
  initBannerSwiper();
  var recommendedHtml = template('recommended', data.recommended);
  $('#ws-recommended').html(recommendedHtml);
  initRecoSwiper();
  var unmissHtml = template('unmissing', data);
  $('#ws-unmissing').html(unmissHtml);
  var mostRecentHtml = template('mostrecent', data);
  $('#ws-mostrecent').html(mostRecentHtml);
}

function initBannerSwiper() {
  var swiper = new Swiper('.swiper-container', {
    direction: 'horizontal',
    loop: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    spaceBetween: 5
  })
}

function initRecoSwiper() {
  var recoSwiper = new Swiper('.reco-swiper-container', {
    direction: 'horizontal',
    loop: false,
    freeMode: true,
    slidesPerView: 'auto',
    spaceBetween: 5
  })
}

$.ajax({
  url: "/api/paid-subscriptions/all",
  method: 'GET',
  data: {},
  success: successHandler,
  error: function(err) {
    console.log(err);
  }
});
