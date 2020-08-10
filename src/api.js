import axios from 'axios';

const CLIENT_ID = "pq17aukq0zjckfiu0vdmoz6p66fz22";
const MY_ACCESS_TOKEN = "9pupj6lkhbrl0nwdhyjddvc1l4eht2";

let api = axios.create({
  headers: {
    'Client-ID': `${CLIENT_ID}`
  }
})


export { CLIENT_ID, MY_ACCESS_TOKEN, api };