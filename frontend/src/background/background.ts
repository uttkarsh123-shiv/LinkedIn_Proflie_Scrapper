chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "scrapeProfiles") {
    const profiles: string[] = message.profiles;
    let index = 0;

    function openNextProfile() {
      if (index >= profiles.length) return; 

      chrome.tabs.create({ url: profiles[index], active: false }, (tab) => {
        if (!tab.id) return;

        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ["contentScript.js"],
        });

        const listener = (msg: any, sender: any) => {
          if (msg.action === "profileData" && sender.tab?.id === tab.id) {
            fetch("http://localhost:5000/profiles", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(msg.data),
            })
              .then(() => {
                console.log("Profile saved:", msg.data.name);

                chrome.runtime.sendMessage({ action: "profileSaved" });
              })
              .catch((err) => console.error("Error saving profile:", err));

            chrome.runtime.onMessage.removeListener(listener);

            if (tab.id) chrome.tabs.remove(tab.id);

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
