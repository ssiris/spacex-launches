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
        data.forEach(launch => {
            var date = new Date(launch.launch_date_utc);
            // creating array that contains payload of rocket, in case of multiple payload.
            var payload = [];
            for (var i = 0; i < launch.rocket.second_stage.payloads.length; i++) {
              payload.push(launch.rocket.second_stage.payloads[i].payload_type);
            }
            list.innerHTML = list.innerHTML + '<li><a href="launch.html?id=' + launch.flight_number + '"><span class="short-item">' + launch.flight_number + '</span><span>' + launch.mission_name + '</span><span class="hide-mobile">' + launch.rocket.rocket_name + '</span><span class="hide-mobile">' + payload + '</span><span>' + date.toLocaleDateString() + '</span></a></li>';
        });

    }
}

getUpcomingLaunches();
