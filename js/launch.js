var launchParams = window.location.search.substring(1);
var splitParamsToId = launchParams.split("=");
var launchId = splitParamsToId[1];

var getSingleLaunch = function () {
    var request = new XMLHttpRequest();
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
        var date = new Date(launch.launch_date_utc);

        // Place data from API into HTML
        let flightNumber = document.getElementById('flight-number');
        flightNumber.innerHTML = '#' + launch.flight_number;

        let missionName = document.getElementById('mission-name');
        missionName.innerHTML = launch.mission_name;

        let rocketName = document.getElementById('rocket-name');
        rocketName.innerHTML = launch.rocket.rocket_name;

        let launchDetails = document.getElementById('launch-details');
        launchDetails.innerHTML = launch.details;

        let launchDate = document.getElementById('time-date');
        launchDate.innerHTML = date.toLocaleString();

        let siteName = document.getElementById('site-name');
        siteName.innerHTML = launch.launch_site.site_name_long;

        let launchSuccess = document.getElementById('launch-success');
        if (launch.launch_success) {
          launchSuccess.innerHTML = "Successful ✅";
        }
        else {
          launchSuccess.innerHTML = "Not successful ❌";
        }

        let payload = document.getElementById('payload');
        var payload_number = 1;
        launch.rocket.second_stage.payloads.forEach(payloadItem => {
          payload.innerHTML = payload.innerHTML + '<li>Payload #' + payload_number + ': <span>' + payloadItem.payload_id + '</span></li><li> — Payload Type: <span>' + payloadItem.payload_type + '</span></li><li> — Payload Weight: <span>' + payloadItem.payload_mass_kg + ' kg</span></li><li> — Orbit: <span>' + payloadItem.orbit + '</span></li><li> — Customers: <span>' +  payloadItem.customers + '</span></li>';
          payload_number++;
        });

        let launchReuse = document.getElementById('launch-reuse');
        let reused = [];
        if (launch.reuse.core) {
          reused.push("Core");
        }
        if (launch.reuse.side_side1) {
          reused.push("Side Core 1");
        }
        if (launch.reuse.side_side2) {
          reused.push("Side Core 2");
        }
        if (launch.fairings) {
          reused.push("Fairings");
        }
        if (launch.capsule) {
          reused.push("Capsule");
        }
        launchReuse.innerHTML = reused;

        let flightClub = document.getElementById('flight-club');
        if(launch.telemetry.flight_club) {
          flightClub.innerHTML = 'Flight Club: <span><a href="' + launch.telemetry.flight_club + '">Link</a><span>';
        }
        else {
          flightClub.outerHTML = "";
        }


        let videoLink = document.getElementById('youtube-link');
        if(launch.links.video_link) {
          videoLink.innerHTML = 'YouTube: <span><a href="' + launch.links.video_link + '">Link</a><span>';
        }
        else {
          videoLink.outerHTML = "";
        }

        let wikiLink = document.getElementById('wiki-link');
        if(launch.links.wikipedia) {
          wikiLink.innerHTML = 'Wikipedia: <span><a href="' + launch.links.wikipedia + '">Link</a><span>';
        }
        else {
          wikiLink.outerHTML = "";
        }


        let patch = document.getElementById('mission-patch');
        let patchMobile = document.getElementById('mission-patch-mobile');
        // If mission has Patch, change placeholder patch with patch from API.
        if (launch.links.mission_patch) {
          patch.innerHTML = '<img src="' + launch.links.mission_patch + '" alt="' + launch.mission_name  + ' Patch">';
          patchMobile.innerHTML = '<img src="' + launch.links.mission_patch + '" alt="' + launch.mission_name  + ' Patch">';
        }


    }
}

getSingleLaunch();
