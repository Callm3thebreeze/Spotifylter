//API Access Token
export async function getAccessToken() {

    const authParameters = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials&client_id=' + import.meta.env.VITE_CLIENT_ID + '&client_secret=' + import.meta.env.VITE_CLIENT_SECRET
    }

    return fetch(import.meta.env.VITE_TOKEN_URL, authParameters)
        .then(res => res.json())
        .then(data => data.access_token)

}