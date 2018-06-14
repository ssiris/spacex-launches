// Navigation Toggle
function toggleNavigation(x) {
    var menu = document.getElementById('menu');
    x.classList.toggle("active");
    menu.classList.toggle("active");
}


// Form Validation
var validateForm = function () {
  var form = document.forms["form"];
  var success = document.getElementById('success-message');

  var name = form["name"].value;
  var name_message = document.getElementById('name-message');
  var name_status = false;

  var email = form["email"].value;
  var email_message = document.getElementById('email-message');
  var email_status = false;

  var message = form["message"].value;
  var message_message = document.getElementById('message-message');
  var message_status = false;

  var email_regex = new RegExp(/.+\@.+\..+/);



  // Name check
  if(name.length) {
    name_message.innerHTML = "";
    name_status = true;
  }
  else{
    name_message.innerHTML = "<br>This field cannot be empty...";
    name_status = false;
  }

  // Email check
  if(email_regex.exec(email)) {
    email_message.innerHTML = "";
    email_status = true;
  }
  else {
    email_message.innerHTML = "<br>Not a valid e-mail..";
    email_status = false;
  }

  // Message check
  if(message.length) {
    message_message.innerHTML = "";
    message_status = true;
  }
  else {
    message_message.innerHTML = "<br>This field cannot be empty...";
    console.log("Hello world");
    message_status = false;
  }


  // if form validates, send message..
  if (name_status && email_status && message_status) {
    success.innerHTML = "<br>Message has been sent!";
  }

}
