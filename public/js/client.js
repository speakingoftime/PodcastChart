// Declaring a function to check if the document is loaded then passing a callback into the function
// Think of "callback" as "x" to be replaced by a value
function ready(callback) {
  if (document.readyState !== "loading") {
    // Manually call the callback() function if needed
    callback();
    console.log("ready state is 'complete'");
  } 
  else {
    // When "DOMContentLoaded" event happens, invoke the callback (the function within ready())
    document.addEventListener("DOMContentLoaded", callback);
    console.log("Document has loaded");
  }
}

// Invoke the ready() function that was just declared above
// The function inside this ready() is the callback in the above method declaration
ready(function () {
  console.log("Client script has loaded");

  // Declare a function to grab data from the server
  function ajaxGET(url, callback) {
    // Create an XMLHttpRequest object to retrieve any type of data from URL w/o reloading page
    const xhr = new XMLHttpRequest();
    // 2 options here after the xhr object is created and loads:
    // if the xhr object receives data, pass it back to the parent function ajaxGET()
    // otherwise, print the status to console and move to next statement --> xhr.get()
    xhr.onload = function() {
      // Note to self: XMLHttpRequest.DONE is predefined. Check out HTTP response status codes. 
      // With the "GET" method, 200 means "resource has been fetched and transmitted in the message body"
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        // When the data associated with the URL is received from the server, return the data to the parent function ajaxGET()
        callback(this.responseText);
      } 
      else {
        // Print status if xhr is not ready and no data was received
        console.log(this.status);
      }
    };
    // open(), send(), and GET are predefined methods, url is a predefined parameter type
    // Initialize a new request to retrieve the URL that was passed to the parent function ajaxGET()
    xhr.open("GET", url);
    // Sends the url to the server. Then flow of control goes back up to the xhr.onload
    xhr.send();
  }

  // Declaring functions to get the data for the following podcast charts
  function appleChart() {
    document.getElementById("platform-name").innerText = "Apple Podcasts";
    ajaxGET("/topshow", function(data) {
      document.getElementById("topshow").innerHTML = data;
    });
    ajaxGET("/othershows", function(data) {
      document.getElementById("othershows").innerHTML = data;
    });
    console.log("HTML loaded through AJAX: Apple Podcasts");
  }
  
  function spotifyChart() {
    document.getElementById("platform-name").innerText = "Spotify";
    ajaxGET("/topshow-spotify", function(data) {
      document.getElementById("topshow").innerHTML = data;
    });
    ajaxGET("/othershows-spotify", function(data) {
      document.getElementById("othershows").innerHTML = data;
    });
    console.log("HTML loaded through AJAX: Spotify");
  }

  function stitcherChart() {
    document.getElementById("platform-name").innerText = "Stitcher";
    ajaxGET("/topshow-stitcher", function(data) {
      document.getElementById("topshow").innerHTML = data;
    });
    ajaxGET("/othershows-stitcher", function(data) {
      document.getElementById("othershows").innerHTML = data;
    });
    console.log("HTML loaded through AJAX: Stitcher");
  }

  // Display Apple Podcast info as default when index.html loads
  appleChart();

  // Update info through ajax when nav links are clicked
  document.getElementById("linkApple").addEventListener("click", appleChart);
  document.getElementById("linkSpotify").addEventListener("click", spotifyChart);
  document.getElementById("linkStitcher").addEventListener("click", stitcherChart);

  // Parse podcast categories/genres JSON data and append to index.html
  let genreBtn = document.getElementById("genres-btn");
  let content = document.getElementById("genre-menu-content");


  // Parse the JSON version
  ajaxGET("/genres2", function(data) {
    let parsedData2 = JSON.parse(data);
    console.log("JSON version", parsedData2);

    // Start of the menu, then start a sublist for News
    let list2 = '<ul><li><a href="#">News</a><ul>';
    for (let i = 0; i < parsedData2["News"].length; i++) {
      list2 += '<li><a href="#">' + parsedData2["News"][i] + '</a></li>';
    }
    // Close News, then start Comedy sublist
    list2 += '</ul></li><li><a href="#">Comedy</a><ul>';
    for (let i = 0; i < parsedData2["Comedy"].length; i++) {
      list2 += '<li><a href="#">' + parsedData2["Comedy"][i] + '</a></li>';
    }
    // Close Comedy, then start Society & culture sublist
    list2 += '</ul></li><li><a href="#">Society & culture</a><ul>';
    for (let i = 0; i < parsedData2["Society & culture"].length; i++) {
      list2 += '<li><a href="#">' + parsedData2["Society & culture"][i] + '</a></li>';
    }
    // Close Society & culture, then start Health & fitness sublist
    list2 += '</ul></li><li><a href="#">Health & fitness</a><ul>';
    for (let i = 0; i < parsedData2["Health & fitness"].length; i++) {
      list2 += '<li><a href="#">' + parsedData2["Health & fitness"][i] + '</a></li>';
    }
    // Close Health & fitness, then start Business sublist
    list2 += '</ul></li><li><a href="#">Business</a><ul>';
    for (let i = 0; i < parsedData2["Business"].length; i++) {
      list2 += '<li><a href="#">' + parsedData2["Business"][i] + '</a></li>';
    }
    // Close Business, then start True Crime sublist
    list2 += '</ul></li><li><a href="#">True crime</a><ul>';
    for (let i = 0; i < parsedData2["True crime"].length; i++) {
      list2 += '<li><a href="#">' + parsedData2["True crime"][i] + '</a></li>';
    }
    // Close True Crime, then start Education sublist
    list2 += '</ul></li><li><a href="#">Education</a><ul>';
    for (let i = 0; i < parsedData2["Education"].length; i++) {
      list2 += '<li><a href="#">' + parsedData2["Education"][i] + '</a></li>';
    }
    // Close Education, then start Arts sublist
    list2 += '</ul></li><li><a href="#">Arts</a><ul>';
    for (let i = 0; i < parsedData2["Arts"].length; i++) {
      list2 += '<li><a href="#">' + parsedData2["Arts"][i] + '</a></li>';
    }
    // Close Arts, then start Science sublist
    list2 += '</ul></li><li><a href="#">Science</a><ul>';
    for (let i = 0; i < parsedData2["Science"].length; i++) {
      list2 += '<li><a href="#">' + parsedData2["Science"][i] + '</a></li>';
    }
    // Close Science, then start Kids & family
    list2 += '</ul></li><li><a href="#">Kids & family</a><ul>';
    for (let i = 0; i < parsedData2["Kids & family"].length; i++) {
      list2 += '<li><a href="#">' + parsedData2["Kids & family"][i] + '</a></li>';
    }
    // Close Kids & family, then close main menu
    list2 += '<ul>';
    content.innerHTML = list2;
  })
  

  // Expand the podcast categories menu on click
  genreBtn.addEventListener("click", function() {   
    // Expand the menu
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
    // Change the arrow inside the button
    if (genreBtn.getAttribute("value") === "all categories ▲") {
      genreBtn.setAttribute("value", "all categories ▼");
    } else {
      genreBtn.setAttribute("value", "all categories ▲");
    }
  });

}); // Keep things within the ready function
