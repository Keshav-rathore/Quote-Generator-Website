document.addEventListener('DOMContentLoaded', () => { //reload the content 
  //take element through their id
  let quotetext = document.getElementById('quote');
  let author = document.getElementById('author');
  let nextbtn = document.getElementById('next-quote');
  let copybtn = document.getElementById('copybtn');
  let downloadbtn = document.getElementById('Downloadbtn');
  let tweetbtn = document.getElementById('tweetbtn');

  //Api URIL
  const api_url = "https://api.freeapi.app/api/v1/public/quotes/quote/random";

  //Run fetchquote and changeBackground to fetch the Quote first time
  fetchquote();
  changeBackground();

  
  // Function to fetch quote from API
  async function fetchquote() {
      try {
          const response = await fetch(api_url);
          if (!response.ok) {
              throw new Error(`Response status: ${response.status}`);
          }

          const json = await response.json();
          let { data } = json; //destructing of json to get data only

          // Set quote text and author
          quotetext.textContent = ` "${data.content}"`;
          author.textContent = ` ~  ${data.author}`;
        
      } catch (error) {
          console.error(error.message);
          quotetext.textContent = "Failed to load quote. Try again!";
          author.textContent = "";
      }
  }

  // Function to change the background image using a structured object
  function changeBackground() {
    // we create a backgrounds object that store image in form of key-value pair
      const backgrounds = {
          "nature": "./assets/background.jpeg",
          "abstract": "./assets/nature.jpeg",
          "dark": "./assets/beach.jpg",
          "light": "./assets/quote-bg.jpg",
          "minimal": "./assets/minimal.jpeg"
      };

      // Get the keys (categories) and choose a random one
      let keys = Object.keys(backgrounds); // return array of all keys
      let randomKey = keys[Math.floor(Math.random() * keys.length)]; // select a random key element

      // Apply the random background image
      document.getElementById('quote-box').style.backgroundImage = `url('${backgrounds[randomKey]}')`;
  }

  // Clipboard Copy Functionality
  copybtn.addEventListener('click', () => {

    //help to paste Content on the Clipboard
      navigator.clipboard.writeText(quotetext.textContent + "By " + author.textContent).then(() => {
          alert("Quote copied to clipboard!");
      }
      ).catch(err => console.error("Failed to copy", err));
  });

  // We fist use html2canvas to convert quote-box into image and use link.click() to downlaod image
  downloadbtn.addEventListener('click', () => {
    
      html2canvas(document.getElementById("quote-box")).then(canvas => {
          let link = document.createElement("a");
          link.href = canvas.toDataURL("image/png");
          link.download = "quote.png";
          link.click();
      });
  });

  // Add Eventlistener on tweet button to tweet Quote on the X
  tweetbtn.addEventListener('click', () => {
      let tweetText = `${quotetext.textContent} - ${author.textContent}`;
      //https://twitter.com/intent/tweet?text=`text` helps to write tweet.
      let twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
      window.open(twitterUrl, "_blank");
  });

  //Add EventListener on the next button to fetch new Quote & random Background image
  nextbtn.addEventListener('click', () => {
      fetchquote();
      changeBackground();
  });
});
