// TODO: Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = 'jxgz4ue7rk'
export const apiEndpoint = `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev`

export const authConfig = {
  // TODO: Create an Auth0 application and copy values from it into this map
  domain: 'dev-kmqb1zim.auth0.com',            // Auth0 domain
  clientId: 'wE1LTToc9EFO49Lt9CBL2BRp1wfDr6ns',          // Auth0 client id
  callbackUrl: 'http://localhost:3000/callback'
}
