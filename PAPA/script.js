document.getElementById('analyse-button').addEventListener('click', async () => {
    const outputElement = document.getElementById('output-text');
    outputElement.innerHTML = `<p>Analysing...</p>`;

    try {
        // This is the key change! We're now calling your Vercel serverless function.
        // Vercel automatically exposes the 'api/analyse.js' file at the '/api/analyse' endpoint.
        const response = await fetch('/api/analyse');
        
        // Check if the response was successful
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        // Parse the JSON data from the backend
        const data = await response.json();

        // Use the data from the backend to construct the output message
        const outputMessage = `Qoutex is analysed using all indicators, all patterns and all strategies, able to fetch live market then give us the outputs accurate
        
${data.currencyPair}
${data.timeFrame} 
Time it's should expire: ${data.expirationTime} 
${data.direction}`;

        outputElement.innerText = outputMessage;

    } catch (error) {
        outputElement.innerHTML = `<p>Error during analysis. Please try again. Check the console for details.</p>`;
        console.error('Analysis failed:', error);
    }
});
