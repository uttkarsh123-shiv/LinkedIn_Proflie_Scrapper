# Page Title Picker Chrome Extension

A simple Chrome extension built with React and TypeScript that fetches the **title of the current webpage** and displays it in the popup when you click a button.


---

### Preview
![Title Screenshot](https://res.cloudinary.com/df134toxg/image/upload/v1755101524/Screenshot_2025-08-13_214035_axdnzd.png)

---

## 🎥 Demo Video

<video width="400" controls>
  <source src="path-to-your-demo-video.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

---


## 📝 How It Works

1. **Popup React Component**: Sends a message to the background service worker when the button is clicked.  
2. **Background Service Worker**: Queries the current active tab and forwards a message to the content script.  
3. **Content Script**: Fetches `document.title` of the page and sends it back to the popup.  
4. **Popup UI**: Receives the title and displays it immediately.

---

## 📌 Notes

- Works on all modern browsers supporting Chrome Extensions MV3.  
- Can be extended to fetch other page information like headings or meta descriptions.
