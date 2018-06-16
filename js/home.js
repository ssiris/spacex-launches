
//UPCOMING launches
var getUpcomingLaunches = function () {
    var request = new XMLHttpRequest();

    // Opening a new connecting using GET to request data from API endpoint.
    request.open('GET', 'https://api.spacexdata.com/v2/launches/upcoming', true);

    request.onload = function () {
        var data = JSON.parse(this.response);
        if (request.status >= 200 && request.status < 400) {
        getLaunches(data);
        }
        else {
            console.log('error');
        }
    };

    // Send request
    request.send();

    // EGEN FUNKSJON!!!
    var getLaunches = function (data) {
        let list = document.getElementById('upcoming-launch-list');
        var counter = 0;
        data.forEach(launch => {
          if(counter <= 2) {
            var date = new Date(launch.launch_date_utc);
            list.innerHTML = list.innerHTML + '<li><a href="launch.html?id=' + launch.flight_number + '"><span>' + launch.mission_name + '</span><span>' + launch.rocket.rocket_name + '</span><span>' + date.toLocaleDateString() + '</span></a></li>';
          }
          counter++;
        });

    }
}


//PREVIOUS launches

var getPreviousLaunches = function () {
    var request = new XMLHttpRequest();

    // Opening a new connecting using GET to request data from API endpoint.
    request.open('GET', 'https://api.spacexdata.com/v2/launches/', true);

    request.onload = function () {
        var data = JSON.parse(this.response);
        if (request.status >= 200 && request.status < 400) {
        getLaunches(data);
        }
        else {
            console.log('error');
        }
    };

    // Send request
    request.send();

    // EGEN FUNKSJON!!!
    var getLaunches = function (data) {
        let list = document.getElementById('previous-launch-list');
        var counter = 0;

        data.forEach(launch => {
          if(counter <= 2) {
            var date = new Date(launch.launch_date_utc);
            list.innerHTML = list.innerHTML + '<li><a href="launch.html?id=' + launch.flight_number + '"><span>' + launch.mission_name + '</span><span>' + launch.rocket.rocket_name + '</span><span>' + date.toLocaleDateString() + '</span></a></li>';
          }
          counter++;
        });

    }
}









getUpcomingLaunches();
getPreviousLaunches();
