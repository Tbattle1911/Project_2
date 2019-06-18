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
      if (res.success) {
        localStorage.setItem("sessionToken", res.token);
        window.location.href = "/user/" + res.id;
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
      title: $("#projectName")
        .val()
        .trim(),
      token: localStorage.getItem("sessionToken")
    },
    response => {
      if (response.success) {
        window.location.href = "/project/" + response.projectId;
      } else {
        M.toast({ html: res.message });
      }
    }
  );
});

$(".loadProject").on("click", event => {
  //TODO - validate session token first.
  window.location.href = "/project/" + $(event.target).attr("data-projectId");
  // $.get("/project/" + $(event.target).attr("data-projectId"), res => {
  //   if (res.success) {
  //     window.location.href = "/project/" + res.projectId;
  //   } else {
  //     M.toast({ html: res.message });
  //   }
  // });
});

//Respond to a user clicking away a Shortcut
$(".xButton").on("click", event => {
  // console.log($(event.target).attr("data-shortcutId"));
  //Get the current Project Settings.
  $.ajax({
    method: "PUT",
    url: "/api/project",
    data: {
      index: Number($(event.target).attr("data-shortcutId") - 1),
      projectId: 1
    }
  }).then(function() {
    $(event.target)
      .closest(".shortcutItem")
      .hide();
  });

  // $.post("/api/project/" + $(event.target).attr("data-shortcutId")).then(
  //   prjdata => {
  //     //Mask away this shortcut.
  //     //Take the Id, Subtract by 1, Shift it to the appropriate Bit.  Invert it so its the only zero then clamp it to our max supported.
  //     const maskAway =
  //       ~(1 << Number($(this).data("shortcutid") - 1)) & prjdata.showMask;
  //     console.log("maskAway: " + maskAway);

  //     //Put updated key to server.
  //     $.ajax({
  //       url: "/api/project",
  //       method: "PUT",
  //       data: {
  //         id: prjdata.id,
  //         showMask: maskAway,
  //         UserId: prjdata.UserId
  //       }, // data as js object
  //       success: () => {
  //         $(this).hide();
  //       }
  //     });
  //   }
  // );
});

$(document).ready(() => {
  $(".collapsible").collapsible();
});
