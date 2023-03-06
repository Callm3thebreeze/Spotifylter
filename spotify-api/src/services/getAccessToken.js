//API Access Token
export async function getAccessToken() {

    const authParameters = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials&client_id=' + import.meta.env.VITE_CLIENT_ID + '&client_secret=' + import.meta.env.VITE_CLIENT_SECRET
    }

    try {
        const response = await fetch('https://accounts.spotify.com/api/token', authParameters)
        const json = await response.json()
        const token = json.access_token
        return token

    } catch (e) {
        throw new Error('Error searching id')
    }

}