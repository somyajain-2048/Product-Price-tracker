(function() {
  // Prevent multiple injections
  if (document.getElementById("ppt-floating-btn")) return;

  const btn = document.createElement("button");
  btn.id = "ppt-floating-btn";
  
  // Icon and text
  const icon = `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>`;
  btn.innerHTML = `${icon} Track Price`;

  document.body.appendChild(btn);

  btn.addEventListener("click", () => {
    btn.className = "ppt-saving";
    btn.innerHTML = `Tracking...`;

    // Tell the background script to send the URL to backend
    chrome.runtime.sendMessage({ 
      action: "trackProduct", 
      url: window.location.href 
    }, (response) => {
      if (response && response.success) {
        btn.className = "ppt-success";
        btn.innerHTML = `Tracked!`;
        setTimeout(() => {
          btn.style.display = "none";
        }, 3000);
      } else {
        btn.className = "ppt-error";
        btn.innerHTML = `Failed (Check Login)`;
        setTimeout(() => {
          btn.className = "";
          btn.innerHTML = `${icon} Try Again`;
        }, 3000);
      }
    });
  });
})();
