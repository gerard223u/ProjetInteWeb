function initMap() {
    // The location of Uluru
    var iut = {lat: 48.289975, lng: 6.942165};
    // The map, centered at Uluru
    var map = new google.maps.Map(
        document.getElementById('map'), 
        {zoom: 18, center: iut}
    );
    // The marker, positioned at Uluru
    var marker = new google.maps.Marker({position: iut, map: map});
  }
  