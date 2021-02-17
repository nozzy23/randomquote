const spinner = document.querySelector("#js-spinner");


const newQuoteButton = document.querySelector('#js-new-quote');

newQuoteButton.addEventListener('click', getQuote);

//reference to the API
const endPoint = 'https://api.whatdoestrumpthink.com/api/v1/quotes/random';

/* to make a function asynchronous use async. asynchronous means we can use key words like await to pause the function 
while waiting for a operation to be completed usually a promise */
async function getQuote() {
    //removes the class
    spinner.classList.remove('hidden');
    //disables button
    newQuoteButton.disable= true;
    /* Try and catch block. if a error pops up in the try block the catch block will execute */
    try {
    /* Fetch takes a single parameter the url we want and returns a promise
    a promise eventually results in a success or a failure.  */
        const response = await fetch(endPoint)
        if (!response.ok) {
            throw Error(response.statusText)
        }
/*response.json method reads the body and parse the response as json
we use await because the JSON method returns a promise */
        const json = await response.json();
        displayQuote(json.message);
    } catch (err){
        console.log(err)
        alert('failed to fetch quote');
    } finally {
        //enables button again
        newQuoteButton.disable= false;
        //add class again
        spinner.classList.add('hidden');
    }
}

function displayQuote(quote){
    const quoteText = document.querySelector('#js-quote-text');
    quoteText.textContent = quote;
}
