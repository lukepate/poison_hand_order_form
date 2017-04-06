console.log('working');

GKey = "AIzaSyAagP8OMcTFjv1Fiz08bfMmL0SirqzMx7E"
var $submit = $('#submit_button');
var $input = $('#city_entered');




$submit.on('click', function(){
  console.log('getting clicked')
    event.preventDefault();
    let city =  $('#city').val();
    let streetInput = $('#street').val();
    let street = streetInput.split(" ");
    console.log(street)
    let state = $('#state').val();
    var checkAddress = function(){
    $.ajax({
      url:"https://maps.googleapis.com/maps/api/geocode/json?adddress="+ street + ",+" + city + ",+" + state + "&key=" + GKey,
        // url:"https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyAagP8OMcTFjv1Fiz08bfMmL0SirqzMx7E",
        method:"GET",
        success: function(data){
          console.log(data)
          },
        error: function (xhr, ajaxOptions, thrownError) {
        alert(xhr.status);
        alert(thrownError);
      }
        });
       }
       checkAddress();
    })

var x = document.getElementById("demo");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude;
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    console.log(lat,long)

}

