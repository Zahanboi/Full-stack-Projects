let IS_PROD = false;
const server = IS_PROD ?
    "some-site" :

    "http://localhost:8000"


export default server;