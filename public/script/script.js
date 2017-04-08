console.log('working');

GKey = "AIzaSyAagP8OMcTFjv1Fiz08bfMmL0SirqzMx7E"
Gif= "dc6zaTOxFJmzC";
var $submit = $('#submit_button');
var $input = $('#city_entered');
var $getaddress = $('#getaddress');
var $more = $('#more_button');
var $more2 = $('#more2_button');
var $more3 = $('#more3_button');
var $inhere =$('#b')

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

//  $('#imageContainer').click(function () {
//      $.ajax({
//         url:"http://api.openweathermap.org/data/2.5/weather?q=brooklyn&APPID=4fd80f2ec2c56827bb6d4f629a1d2090&units=imperial&type=accurate",
//         method:"GET",
//         success: function(data){
//           let i = data.embed_url;
//             console.log(i)
//           console.log("this worked")
//           $('#imageContainer').attr("src", i)
//         }
//         });
// });


// $('#imageContainer').click(function(){
//     event.preventDefault();
    var getWeatherFive = function(){
    $.ajax({
        url:"http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=thanks",
        method:"GET",
        success: function(data){
                 // let i = data.data[0].images.fixed_height.url;
          let i = data.data.fixed_height_downsampled_url;
          console.log(i)
          console.log("this worked")
            $('#imageContainer').attr("src", i)
        }
        });
       }
       getWeatherFive();
    // })

