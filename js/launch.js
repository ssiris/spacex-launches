var launchParams = window.location.search.substring(1);
var splitParamsToId = launchParams.split("=");
var launchId = splitParamsToId[1];


var getSingleLaunch = function () {
    var request = new XMLHttpRequest();
    var thisYear = new Date();
    var apiEndpoint = "https://api.spacexdata.com/v2/launches/all?flight_number=" + launchId;

    // Opening a new connecting using GET to request data from API endpoint.
    request.open('GET', apiEndpoint, true);

    request.onload = function () {
        var data = JSON.parse(this.response);
        if (request.status >= 200 && request.status < 400) {
        getLaunchData(data);
        }
        else {
            console.log('error');
        }
    };

    // Send request
    request.send();


    var getLaunchData = function (data) {
        // Refer to first element in API response as launch - instead of typing data[0] several times.
        var launch = data[0];

        // Place data from API into HTML
        let flightNumber = document.getElementById('flight-number');
        flightNumber.innerHTML = '#' + launch.flight_number;

        let missionName = document.getElementById('mission-name');
        missionName.innerHTML = launch.mission_name;

        let rocketName = document.getElementById('rocket-name');
        rocketName.innerHTML = launch.rocket.rocket_name;
        console.log(launch.rocket_name);

        let patch = document.getElementById('mission-patch');
        // If mission has Patch, change placeholder patch with patch from API.
        if (launch.links.mission_patch) {
          patch.innerHTML = '<img src="' + launch.links.mission_patch + '" alt="' + launch.mission_name  + ' Patch">';
        }


    }
}

getSingleLaunch();
