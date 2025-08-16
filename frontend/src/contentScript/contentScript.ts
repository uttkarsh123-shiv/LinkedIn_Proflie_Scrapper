function scrapeProfile() {
  const name = document.querySelector("h1")?.textContent?.trim() || "";
  const about = document.querySelector(".pv-about__summary-text")?.textContent?.trim() || "";
  const bio = document.querySelector(".text-body-medium")?.textContent?.trim() || "";
  const location = document.querySelector(".pv-top-card--list-bullet")?.textContent?.trim() || "";

  const followerText = document.querySelector(".t-black--light")?.textContent || "";
  const followerCount = parseInt(followerText.replace(/\D/g, "")) || 0;

  const connectionText = document.querySelector(".t-bold")?.textContent || "";
  const connectionCount = parseInt(connectionText.replace(/\D/g, "")) || 0;

  const data = {
    name,
    url: window.location.href,
    about,
    bio,
    location,
    followerCount,
    connectionCount,
  };

  chrome.runtime.sendMessage({ action: "profileData", data });
}

setTimeout(scrapeProfile, 5000);
