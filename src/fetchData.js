import fetch from 'isomorphic-fetch';

const apiEndpoint = API_SERVER_ADDRESS;

export default async function fetchData(query = '', vars = {}) {
    const result = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {'Content-type': 'applicaiton/json'},
        body: JSON.stringify({query, variables: vars})
    });
    
    console.log(result);
}