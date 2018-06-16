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

        let launchDetails = document.getElementById('launch-details');
        launchDetails.innerHTML = launch.details;
        console.log(launch.details);

        let launchDate = document.getElementById('time-date');
        launchDate.innerHTML = launch.launch_date_utc;

        let siteName = document.getElementById('site-name');
        siteName.innerHTML = launch.launch_site.site_name_long;

        let launchSuccess = document.getElementById('launch-success');
        launchSuccess.innerHTML = launch.launch_success;

        let customerName = document.getElementById('customer-name');
        customerName.innerHTML = launch.rocket.second_stage.payloads[0].customers;

        let missionPayload = document.getElementById('mission-payload');
        missionPayload.innerHTML = launch.rocket.second_stage.payloads[0].payload_type;

        let missionPayloadWeight = document.getElementById('payload-weight');
        missionPayloadWeight.innerHTML = launch.rocket.second_stage.payloads[0].payload_mass_kg;

        let launchOrbit = document.getElementById('launch-orbit');
        launchOrbit.innerHTML = launch.rocket.second_stage.payloads[0].orbit;

      // denne funker ikke så bra
      //  let launchReuse = document.getElementById('launch-reuse');
      //  launchReuse.innerHTML = launch.reuse;
      //  if (launch.reuse)

        let flightClub = document.getElementById('flight-club');
        flightClub.innerHTML = launch.telemetry.flight_club;

        let videoLink = document.getElementById('youtube-link');
        videoLink.innerHTML = launch.links.video_link;

        let wikiLink = document.getElementById('wiki-link');
        wikiLink.innerHTML = launch.links.wikipedia;



        let patch = document.getElementById('mission-patch');
        // If mission has Patch, change placeholder patch with patch from API.
        if (launch.links.mission_patch) {
          patch.innerHTML = '<img src="' + launch.links.mission_patch + '" alt="' + launch.mission_name  + ' Patch">';
        }


    }
}

getSingleLaunch();
