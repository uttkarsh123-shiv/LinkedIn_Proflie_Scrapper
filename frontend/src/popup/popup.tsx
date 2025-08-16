import React, { useState, useEffect } from "react";

export default function Popup() {
  const [profiles, setProfiles] = useState<any[] | null>(null);


  // Scrape button
  const handleScrape = () => {
    const urls = [
      "https://www.linkedin.com/in/gaurav-bhaya-7736444/",
      "https://www.linkedin.com/in/sundarpichai/",
      "https://www.linkedin.com/in/arvindkrishna/",
    ];
    chrome.runtime.sendMessage({ action: "scrapeProfiles", profiles: urls });
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
  <div className="h-[400px] w-[300px] p-4 ">
    <h1 className="text-xl text-center font-bold">LinkedIn Profiles Scrapper</h1>
    <button onClick={handleScrape} className="px-4 py-2 bg-blue-600 text-white ml-14 m-4">Scrape LinkedIn Profiles</button>
    <h1 className="text-[16px] m-2 ml-0">Saved Profiles:</h1>

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
            Followers: {p.followerCount} | Connections: {p.connectionCount}
            <br />
            <a href={p.url} target="_blank" rel="noreferrer">
              {p.url}
            </a>
            <hr />
            <br/>
          </li>
        ))}
      </ul>
    )}
  </div>
);

}

    // name,
    // url: window.location.href,
    // about,
    // bio,
    // location,
    // followerCount,
    // connectionCount,