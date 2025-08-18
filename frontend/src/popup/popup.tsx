import React, { useState, useEffect } from "react";

export default function Popup() {
  const [profiles, setProfiles] = useState<any[] | null>(null);
  const [inputUrl, setInputUrl] = useState("");

  // Scrape button
  const handleScrape = () => {
    if (!inputUrl) return alert("Please enter a LinkedIn URL");
    chrome.runtime.sendMessage({ action: "scrapeProfiles", profiles: [inputUrl] });
    setInputUrl(""); // Clear input
  };

  useEffect(() => {
    const fetchProfiles = () => {
      fetch("http://localhost:5000/profiles")
        .then((res) => res.json())
        .then((data) => setProfiles(data))
        .catch((err) => console.error(err));
    };

    fetchProfiles();

    chrome.runtime.onMessage.addListener((msg) => {
      if (msg.action === "profileSaved") {
        fetchProfiles();
      }
    });
  }, []);

  return (
    <div className="h-[400px] w-[300px] p-4">
      <h1 className="text-xl text-center font-bold">LinkedIn Profiles Scraper</h1>
      
      <input
        type="text"
        value={inputUrl}
        onChange={(e) => setInputUrl(e.target.value)}
        placeholder="Enter LinkedIn URL"
        className="border p-2 w-full mt-4"
      />
      
      <button
        onClick={handleScrape}
        className="px-4 py-2 bg-blue-600 text-white w-full mt-2"
      >
        Scrape LinkedIn Profile
      </button>

      <h2 className="text-[16px] mt-4">Saved Profiles:</h2>
      {profiles === null ? (
        <p>Loading...</p>
      ) : profiles.length === 0 ? (
        <p>No profiles saved yet.</p>
      ) : (
        <ul>
          {profiles.map((p, i) => (
            <li key={i}>
              <strong>{p.name}</strong> <br />
              Bio: {p.bio} <br />
              Location: {p.location} <br />
              Followers: {p.followerCount} | Connections: {p.connectionCount} <br />
              <a href={p.url} target="_blank" rel="noreferrer">
                {p.url}
              </a>
              <hr />
              <br />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
