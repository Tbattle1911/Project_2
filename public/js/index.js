// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getExamples().then(function(data) {
    var $examples = data.map(function(example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var example = {
    text: $exampleText.val().trim(),
    description: $exampleDescription.val().trim()
  };

  if (!(example.text && example.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveExample(example).then(function() {
    refreshExamples();
  });

  $exampleText.val("");
  $exampleDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);

/// Jacobs Area
//Create a new User
$("#createAccount").on("click", () => {
  console.log($('#logIn')) 
  console.log($('#password'))
  $.post(
    "/api/user",
    {
      name: $('#logIn').text().trim(),
      password: $('#password').text().trim()

       //TODO - pull in the User entry and everything else needed.
    },
    () => {
      //TODO - Navigate to the Projects Page.
    }
  );
});

//Create a new Project
$("#createProject").on("click", () => {
  $.post(
    "/api/project",
    {
      //TODO - pull in the project entry and everything else needed.
      title: "ProjectZ",
      showMask: 0xffff,
      UserId: 1
    },
    () => {
      //TODO - Navigate to active Project Page.
    }
  );
});

//Respond to a user clicking away a Shortcut
$(".xButton").on("click", () => {
  //Get the current Project Settings.
  $.get(`api/project/${$(this).data("projectid")}`).then(prjdata => {
    //Mask away this shortcut.
    //Take the Id, Subtract by 1, Shift it to the appropriate Bit.  Invert it so its the only zero then clamp it to our max supported.
    const maskAway =
      ~(1 << Number($(this).data("shortcutid") - 1)) & prjdata.showMask;
    console.log("maskAway: " + maskAway);

    //Put updated key to server.
    $.ajax({
      url: "/api/project",
      method: "PUT",
      data: {
        id: prjdata.id,
        showMask: maskAway,
        UserId: prjdata.UserId
      }, // data as js object
      success: () => {
        //TODO - Any update that needs to take place in the UI.  Such as hiding the $(this).
      }
    });
  });
});
