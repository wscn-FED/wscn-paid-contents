export function fetchData(config, cb) {
  $.ajax({
    url: config.url,
    method: 'GET',
    data: config.params,
    success: function(res) {
      cb(null, res)
    },
    error: function(err) {
      cb(err)
    }
  })
}
