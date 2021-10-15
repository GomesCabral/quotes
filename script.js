const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');

let apiQuotes = [];


//Show New Quotes
function newQuote(){
    //Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    
    //if Author field is blank
    if(quote.author == null){
        authorText.textContent = 'Unknown'
    }else{
        authorText.textContent = quote.author;
    }
    // Check Quote length to determine styling
    if(quote.text.length > 120){
        //Add Class
        quoteText.classList.add('long-quote')
    }else{
        //Remove Class
        quoteText.classList.remove('long-quote')
    }
    quoteText.textContent = quote.text;
}


//Get Quotes FRom API
async function getQuotes(){
    const apiUrl = 'https://type.fit/api/quotes';
    //catch error
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    }catch (error){

    }
}

//Tweet Quote
function tweetQuote(){
    //Template String
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    //Open a new page
    window.open(twitterUrl, '_blank');
}

//Event Listener
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

getQuotes();