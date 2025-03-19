document.addEventListener('DOMContentLoaded', () => {
  let quotetext = document.getElementById('quote');
  let author = document.getElementById('author');
  let nextbtn = document.getElementById('next-quote');
  let copybtn = document.getElementById('copybtn');
  let downloadbtn = document.getElementById('Downloadbtn');
  let tweetbtn = document.getElementById('tweetbtn');

  const api_url = "https://api.freeapi.app/api/v1/public/quotes/quote/random";

  fetchquote();
  changeBackground();

   // Fetch the first quote on load

  // Function to fetch quote from API
  async function fetchquote() {
      try {
          const response = await fetch(api_url);
          if (!response.ok) {
              throw new Error(`Response status: ${response.status}`);
          }

          const json = await response.json();
          let { data } = json;

          // Set quote text and author
          quotetext.textContent = data.content;
          author.textContent = ` ~  ${data.author}`;
      } catch (error) {
          console.error(error.message);
          quotetext.textContent = "Failed to load quote. Try again!";
          author.textContent = "";
      }
  }

  // Function to change the background image using a structured object
  function changeBackground() {
      // Object storing background images with categories
      const backgrounds = {
          "nature": "./assets/background.jpeg",
          "abstract": "./assets/nature.jpeg",
          "dark": "./assets/beach.jpg",
          "light": "./assets/background.jpeg",
          "minimal": "./assets/minimal.jpeg"
      };

      // Get the keys (categories) and choose a random one
      let keys = Object.keys(backgrounds);
      let randomKey = keys[Math.floor(Math.random() * keys.length)];

      // Apply the random background image
      document.getElementById('quote-box').style.backgroundImage = `url('${backgrounds[randomKey]}')`;
  }

  // Clipboard Copy Functionality
  copybtn.addEventListener('click', () => {
      navigator.clipboard.writeText(quotetext.textContent + "By " + author.textContent).then(() => {
          alert("Quote copied to clipboard!");
      }).catch(err => console.error("Failed to copy", err));
  });

  // Download as Image using html2canvas
  downloadbtn.addEventListener('click', () => {
      html2canvas(document.getElementById("quote-box")).then(canvas => {
          let link = document.createElement("a");
          link.href = canvas.toDataURL("image/png");
          link.download = "quote.png";
          link.click();
      });
  });

  // Share Quote on Twitter
  tweetbtn.addEventListener('click', () => {
      let tweetText = `${quotetext.textContent} - ${author.textContent}`;
      let twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
      window.open(twitterUrl, "_blank");
  });

  // Fetch a new quote & change background when "Next Quote" is clicked
  nextbtn.addEventListener('click', () => {
      fetchquote();
      changeBackground();
  });
});
