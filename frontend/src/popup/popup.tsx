import React, { useState, useEffect } from "react";

export default function Popup() {
  const [profiles, setProfiles] = useState<any[] | null>(null);
  const [inputUrl, setInputUrl] = useState("");
  const [urlList, setUrlList] = useState<string[]>([]); // Keep all URLs added
  const [loading, setLoading] = useState(false);

  const handleAddUrl = () => {
    const url = inputUrl.trim();
    if (!url) return;
    setUrlList((prev) => [...prev, url]);
    setInputUrl(""); // Clear input
  };

  const handleScrape = () => {
    if (urlList.length < 3) return alert("Please add at least 3 URLs");
    setLoading(true);
    chrome.runtime.sendMessage({ action: "scrapeProfiles", profiles: urlList });
  };

  const handleRemoveUrl = (index: number) => {
    setUrlList((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const fetchProfiles = () => {
      fetch("http://localhost:5000/profiles")
        .then((res) => res.json())
        .then((data) => {
          setProfiles(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    };

    fetchProfiles();

    chrome.runtime.onMessage.addListener((msg) => {
      if (msg.action === "profileSaved") {
        fetchProfiles();
      }
    });
  }, []);

  return (
    <div className="h-[500px] w-[300px] p-4 overflow-y-auto">
      <h1 className="text-xl text-center font-bold">
        LinkedIn Profiles Scraper
      </h1>

      <div className="mt-4 flex gap-2">
        <input
          type="text"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          placeholder="Paste LinkedIn URL"
          className="border p-2 flex-1"
        />
        <button
          onClick={handleAddUrl}
          className="px-2 py-2 bg-green-600 text-white"
        >
          Add
        </button>
      </div>

      {urlList.length > 0 && (
        <ul className="mt-2 text-sm">
          {urlList.map((url, i) => (
            <li key={i} className="flex justify-between items-center mb-1">
              <span className="text-[12px] text-gray-500">{url}</span>
              <button
                onClick={() => handleRemoveUrl(i)}
                className="text-red-500"
                title="Remove URL"
                aria-label="Remove URL"
              >
                <span className="sr-only">Remove URL</span>
                {/* <span className="sr-only">Remove URL</span> */}
                <svg
                  x="0px"
                  y="0px"
                  width="20"
                  height="20"
                  viewBox="0,0,256,256"
                >
                  <g
                    fill="#a0aec0"
                    fill-rule="nonzero"
                    stroke="none"
                    stroke-width="1"
                    stroke-linecap="butt"
                    stroke-linejoin="miter"
                    stroke-miterlimit="10"
                    stroke-dasharray=""
                    stroke-dashoffset="0"
                    font-family="none"
                    font-weight="none"
                    font-size="none"
                    text-anchor="none"
                    style={{ mixBlendMode: "normal" }}
                  >
                    <g transform="scale(5.12,5.12)">
                      <path d="M25,2c-12.69047,0 -23,10.30953 -23,23c0,12.69047 10.30953,23 23,23c12.69047,0 23,-10.30953 23,-23c0,-12.69047 -10.30953,-23 -23,-23zM25,4c11.60953,0 21,9.39047 21,21c0,11.60953 -9.39047,21 -21,21c-11.60953,0 -21,-9.39047 -21,-21c0,-11.60953 9.39047,-21 21,-21zM32.99023,15.98633c-0.26377,0.00624 -0.51439,0.11645 -0.69727,0.30664l-7.29297,7.29297l-7.29297,-7.29297c-0.18827,-0.19353 -0.4468,-0.30272 -0.7168,-0.30274c-0.40692,0.00011 -0.77321,0.24676 -0.92633,0.62377c-0.15312,0.37701 -0.06255,0.80921 0.22907,1.09303l7.29297,7.29297l-7.29297,7.29297c-0.26124,0.25082 -0.36648,0.62327 -0.27512,0.97371c0.09136,0.35044 0.36503,0.62411 0.71547,0.71547c0.35044,0.09136 0.72289,-0.01388 0.97371,-0.27512l7.29297,-7.29297l7.29297,7.29297c0.25082,0.26124 0.62327,0.36648 0.97371,0.27512c0.35044,-0.09136 0.62411,-0.36503 0.71547,-0.71547c0.09136,-0.35044 -0.01388,-0.72289 -0.27512,-0.97371l-7.29297,-7.29297l7.29297,-7.29297c0.29724,-0.28583 0.38857,-0.7248 0.23,-1.10546c-0.15857,-0.38066 -0.53454,-0.62497 -0.94679,-0.61524z"></path>
                    </g>
                  </g>
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={handleScrape}
        disabled={urlList.length < 3}
        className={`mt-4 px-4 py-2 w-full text-white ${
          urlList.length >= 3 ? "bg-blue-600" : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Scrape Profiles
      </button>

      {loading && <p className="text-center mt-2 font-semibold">Loading...</p>}

      <h2 className="text-[16px] mt-4">Saved Profiles:</h2>
      {profiles === null ? (
        <p>Loading profiles...</p>
      ) : profiles.length === 0 ? (
        <p>No profiles saved yet.</p>
      ) : (
        <ul>
          {profiles.map((p, i) => (
            <li key={i}>
              <strong>{p.name}</strong> <br />
              Bio: {p.bio} <br />
              Location: {p.location} <br />
              Followers: {p.followerCount} | Connections: {p.connectionCount}{" "}
              <br />
              <a href={p.url} target="_blank">
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
