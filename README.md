# Rafflebox API Jackpot Script

This jQuery script retrieves event information from the Rafflebox API.

The `index.html` file provided will showcases the IDs in use and will display the proper data if used in a server environment or by using a tool like `npx http-server`.

It will format the data and inject it into predefined HTML element IDs.

The jackpot total - `#jackpot-total`  
The jackpot for customers (total / 2) - `#jackpot-half`  
The formatted Draw date - `#drawdate`  
Additionaly, any element with a `.rb-checkout` class will have it's href updated to the appropriate checkout link.

## Recent Purchasers

There are 4 recent purchasers who each have 3 values, (name, value, date) purchased and are associated to their elements in the following pattern.  
`#recent-{#}-name`  
`#recent-{#}-value`  
`#recent-{#}-date`
