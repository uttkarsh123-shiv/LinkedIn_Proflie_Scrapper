chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // Start scraping multiple profiles
  if (message.action === "scrapeProfiles") {
    const profiles: string[] = message.profiles;
    let index = 0;

    function openNextProfile() {
      if (index >= profiles.length) return; // all done

      chrome.tabs.create({ url: profiles[index], active: false }, (tab) => {
        if (!tab.id) return;

        // Inject scraper script
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ["contentScript.js"],
        });

        // Listener for profile data (specific to this tab)
        const listener = (msg: any, sender: any) => {
          if (msg.action === "profileData" && sender.tab?.id === tab.id) {
            // Save profile to backend
            fetch("http://localhost:5000/profiles", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(msg.data),
            })
              .then(() => {
                console.log("Profile saved:", msg.data.name);

                // 🔥 Notify popup
                chrome.runtime.sendMessage({ action: "profileSaved" });
              })
              .catch((err) => console.error("Error saving profile:", err));

            // Remove listener (avoid duplicate calls)
            chrome.runtime.onMessage.removeListener(listener);

            // Close the tab
            if (tab.id) chrome.tabs.remove(tab.id);

            // Move to next
            index++;
            openNextProfile();
          }
        };

        chrome.runtime.onMessage.addListener(listener);
      });
    }

    openNextProfile();
  }
});
