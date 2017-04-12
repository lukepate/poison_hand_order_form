console.log('working');

GKey = "";
Gif= "";
var $submit = $('#submit_button');
var $send = $('#send_button');
var $input = $('#city_entered');
var $getaddress = $('#getaddress');
var $more = $('#more_button');
var $more2 = $('#more2_button');
var $more3 = $('#more3_button');
var $phone = $('#phone');
var $inhere =$('#b')
var $inheretoo =$('#a')


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



    var getGif = function(){
    $.ajax({
        url:"http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=kung+fu",
        method:"GET",
        success: function(data){
                 // let i = data.data[0].images.fixed_height.url;
          let i = data.data.image_url;
          console.log(i)
          console.log("this worked")
            $inhere.attr("src", i)
        }
        });
       }
       getGif();

    var getRon = function(){
    $.ajax({
        url:"http://ron-swanson-quotes.herokuapp.com/v2/quotes",
        method:"GET",
        success: function(data){

          console.log(data)

            $inheretoo.append('"' + data + '"')
        }
        });
       }
       getRon();

$('#logo').hover(function () {
  console.log('this clicked')
  $('#logo').addClass('magictime twisterInDown');
});

setTimeout(function(){
   $( "#logo" ).show()
    $('#logo').addClass('magictime twisterInDown');
}, 800);

$('#clickMe').click(function (){
// setTimeout(function(){
   $( "#container" ).show();
    $('#container').addClass('magictime spaceInDown');
    $('#clickMe').hide()
    $('#hideMe').hide()
// }, 100);
})

$submit.hover(function () {
  console.log('this clicked')
  $('#form').addClass('magictime twisterInDown');
});

setTimeout(function(){
   $( ".shirt" ).show();
    $( ".stock" ).show();
     $( ".graphic" ).show();
  $('.shirt').addClass('magictime vanishIn');
  $('.stock').addClass('magictime vanishIn');
  $('.graphic').addClass('magictime vanishIn');
}, 100);

$('#first_name').click(function (){
   $( ".instructions" ).show();
    $('.instructions').empty().html('<h5>Please put your insert your contact name.</h5>');
})
$('#email_address').click(function (){
   $( ".instructions" ).show();
    $('.instructions').empty().html('<h5>Please put your insert your email address.</h5>');
})
$('#phone').click(function (){
   $( ".instructions" ).show();
    $('.instructions').empty().html('<h5>Use the phone number we can reach you with.</h5>');
})
$('#street').click(function (){
   $( ".instructions" ).show();
    $('.instructions').empty().html('<h5>Address you would like to ship to or click the icon for current address.</h5>');
})
$('#date').click(function (){
   $( ".instructions" ).show();
    $('.instructions').empty().html('<h5>Please use the date you would like the order to arrive</h5>');
})
$('#shirt').click(function (){
   $( ".instructions" ).show();
    $('.instructions').empty().html('<h5>Select the shirt color you would like</h5>');
})
$('#front_color').click(function (){
   $( ".instructions" ).show();
    $('.instructions').empty().html('<h5>Select the shirt color you would like</h5>');
})

$('#file_place').click(function (){
   $( ".instructions" ).show();
    $('.instructions').empty().html('<h5>Upload a file</h5>');
})
