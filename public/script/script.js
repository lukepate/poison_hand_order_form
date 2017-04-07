console.log('working');

GKey = "AIzaSyAagP8OMcTFjv1Fiz08bfMmL0SirqzMx7E"
var $submit = $('#submit_button');
var $input = $('#city_entered');
var $getaddress = $('#getaddress');
var $more = $('#more_button');
var $more2 = $('#more2_button');
var $more3 = $('#more3_button');
var $inhere =$('#b')
var $quan = $('#apparel_color')
var $bubmit = $('#bubmit_button');

  var x = document.getElementById("show");
    function showPosition(position) {
      lat = position.coords.latitude;
      long = position.coords.longitude;
      console.log(lat,long)
  }

  var getPosition = function (options) {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  }
  getPosition()
    .then((position) => {
      let lat = position.coords.latitude;
      let long = position.coords.longitude;
      $getaddress.on('click', function(){
        // event.preventDefault();
          var checkAddress = function(){
            $.ajax({
            url:"https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat +"," + long + "&key=" + GKey,
            method:"GET",
            success: function(data){
            let address = data.results[0].formatted_address;
            console.log(address);
            $('#street').val(address)
            },
            error: function (error) {
            alert("something went wrong");
            }
            });
          }
        checkAddress();
    })
  })

  function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }

  $(document).ready(function() {
    Materialize.updateTextFields();
  });
  $(document).ready(function() {
    $('select').material_select();
  });

$bubmit.on('click', function(){
    console.log('clicked')
  $quan.val()
    event.preventDefault();
    var getWeatherFive = function(){
      console.log( 6)
 $('.total').html($quan.val() * 6)
         };
        getWeatherFive();
     })


$more.on('click', function(){
    event.preventDefault();
    var loadMore = function(){
      console.log('clicked')
        $('#hide').css("display", "block" )
    }
      loadMore();
})
$more2.on('click', function(){
    event.preventDefault();
    var loadMore2 = function(){
      console.log('clicked')
        $('#hide2').css("display", "block" )
    }
      loadMore2();
})

$more3.on('click', function(){
    event.preventDefault();
    var loadMore3 = function(){
      console.log('clicked')
        $('#hide3').css("display", "block" )

    }
      loadMore3();
})
