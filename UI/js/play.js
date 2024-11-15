const url = "http://localhost:3000/api/v1";

// Check the user's progress from local storage
window.onload = async function () {
  const token = localStorage.getItem("token");
  const referralId = document.getElementById("referral-link");

  if (!token) {
    window.location.href = "signin.html";
  }
  // get user profile
  const userDetails = await fetch(`${url}/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token,
    },
  });

  const res = await userDetails.json();

  if (res.id) {
    referralId.value = `${url}/invite?userId=${res.id}`;
  }

  const beginnerCompleted = localStorage.getItem("beginnerCompleted");
  const intermediateCompleted = localStorage.getItem("intermediateCompleted");

  // If Beginner is completed, enable the Intermediate button
  if (beginnerCompleted) {
    document.getElementById("startIntermediate").disabled = false;
  }

  // If Intermediate is completed, enable the Advanced button
  if (intermediateCompleted) {
    document.getElementById("startAdvanced").disabled = false;
  }
};

// Copy the referral link to clipboard
function copyReferral() {
  const referralLink = document.getElementById("referral-link");
  referralLink.select();
  document.execCommand("copy");
  alert("Referral link copied!");
}

// Share the web link on social media
function shareOnSocial(platform) {
  let url = "";
  if (platform === "facebook") {
    url =
      "https://www.facebook.com/sharer/sharer.php?u=" + document.location.href;
  } else if (platform === "twitter") {
    url = "https://twitter.com/intent/tweet?url=" + document.location.href;
  } else if (platform === "linkedin") {
    url =
      "https://www.linkedin.com/shareArticle?mini=true&url=" +
      document.location.href;
  }
  window.open(url, "_blank");
}
