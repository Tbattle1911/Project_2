//Create a new User
$("#createAccount").on("click", () => {
  const name = $("#logIn")
    .val()
    .trim();

  const password = $("#password")
    .val()
    .trim();

  $.post(
    "/api/user",
    {
      name,
      password
    },
    res => {
      console.log(res);
      if (res.success) {
        //TODO - save token in local session.
        window.location.href = "/user/" + name;
      } else {
        M.toast({ html: res.message });
      }
    }
  );
});

//Login
$("#logInButton").on("click", () => {
  const name = $("#logIn")
    .val()
    .trim();

  const password = $("#password")
    .val()
    .trim();

  $.post(
    "/api/login",
    {
      name,
      password
    },
    res => {
      if (res.success) {
        localStorage.setItem("sessionToken", res.token);
        window.location.href = "/user/" + res.id;
      } else {
        console.log(res);
        // console.log(res.message);
        M.toast({ html: res.message });
      }
    }
  );
});

//Create a new Project
$("#createProject").on("click", event => {
  event.preventDefault();
  $.post(
    "/api/project",
    {
      //TODO - pull in the project entry and everything else needed.
      title: $("#projectName")
        .val()
        .trim(),
      token: localStorage.getItem("sessionToken")
    },
    response => {
      if (response.success) {
        window.location.href = "/project/" + response.id;
      } else {
        M.toast({ html: res.message });
      }
    }
  );
});

$(".loadProject").on("click", () => {
  $.post("/api/project/" + $(this).data("projectId"), res => {
    if (res.success) {
      window.location.href = "/project/" + res.id;
    } else {
      M.toast({ html: res.message });
    }
  });
});

//Respond to a user clicking away a Shortcut
$(".xButton").on("click", () => {
  //Get the current Project Settings.
  $.get(`api/project/${$(this).data("projectId")}`).then(prjdata => {
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
        $(this).hide();
      }
    });
  });
});
