
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
        getRocketStats(data);
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

    var getRocketStats = function(data) {
      let falconNines = [];
      let falconHeavy = [];
      let falconOnes = [];
      data.forEach(launch => {
        if(launch.rocket.rocket_id === "falcon1") {
          falconOnes.push(launch);
        }
        else if (launch.rocket.rocket_id === "falcon9") {
          falconNines.push(launch);
        }
        else if (launch.rocket.rocket_id === "falconheavy") {
          falconHeavy.push(launch);
        }
      });

      var oneFirst = falconOnes[0];
      var oneTotal = falconOnes.length;
      var oneLast = falconOnes[oneTotal-1];
      var oneFirstElement = document.getElementById('oneFirst');
      var oneLastElement = document.getElementById('oneLast');
      var oneTotalElement = document.getElementById('oneTotal');
      var oneFirstDate = new Date(oneFirst.launch_date_utc);
      var oneLastDate = new Date(oneLast.launch_date_utc);

      oneFirstElement.innerHTML = '<a href="launch.html?id=' + oneFirst.flight_number + '">' + oneFirstDate.toLocaleDateString() + '</a>';
      oneLastElement.innerHTML = '<a href="launch.html?id=' + oneLast.flight_number + '">' + oneLastDate.toLocaleDateString() + '</a>';
      oneTotalElement.innerHTML = oneTotal;


      var nineFirst = falconNines[0];
      var nineTotal = falconNines.length;
      var nineLast = falconNines[nineTotal-1];
      var nineFirstElement = document.getElementById('nineFirst');
      var nineLastElement = document.getElementById('nineLast');
      var nineTotalElement = document.getElementById('nineTotal');
      var nineFirstDate = new Date(nineFirst.launch_date_utc);
      var nineLastDate = new Date(nineLast.launch_date_utc);

      nineFirstElement.innerHTML = '<a href="launch.html?id=' + nineFirst.flight_number + '">' + nineFirstDate.toLocaleDateString() + '</a>';
      nineLastElement.innerHTML = '<a href="launch.html?id=' + nineLast.flight_number + '">' + nineLastDate.toLocaleDateString() + '</a>';
      nineTotalElement.innerHTML = nineTotal;


      var heavyFirst = falconHeavy[0];
      var heavyTotal = falconHeavy.length;
      var heavyLast = falconHeavy[heavyTotal-1];
      var heavyFirstElement = document.getElementById('heavyFirst');
      var heavyLastElement = document.getElementById('heavyLast');
      var heavyTotalElement = document.getElementById('heavyTotal');
      var heavyFirstDate = new Date(heavyFirst.launch_date_utc);
      var heavyLastDate = new Date(heavyLast.launch_date_utc);

      heavyFirstElement.innerHTML = '<a href="launch.html?id=' + heavyFirst.flight_number + '">' + heavyFirstDate.toLocaleDateString() + '</a>';
      heavyLastElement.innerHTML = '<a href="launch.html?id=' + heavyLast.flight_number + '">' + heavyLastDate.toLocaleDateString() + '</a>';
      heavyTotalElement.innerHTML = heavyTotal;

    }
}

getUpcomingLaunches();
getPreviousLaunches();
