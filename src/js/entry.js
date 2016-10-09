import { fetchData } from './wsajax';


$(function() {
  const config = {
    url: '/api/paid-subscriptions/all',
    params: {
      page: 1,
      limit: 5,
      order: 1
    }
  };
  fetchData(config, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log(res.carousel.results)
      const carouselhtml = template('carousel', res.carousel);
      console.log(carouselhtml)
      document.getElementById('ws-carousel').innerHTML = carouselhtml;
    }
  })
});
