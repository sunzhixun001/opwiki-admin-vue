export const getToken = () => {
    let result = '';
    const token = localStorage.getItem('access_token');
    const expires = localStorage.getItem('expires_in');
    const expires_number = Number(expires);
    if (!isNaN(expires_number)) {
        const expires_date = new Date(expires_number);
        if (expires_date.toString() !== 'Invalid Date') {
            if((new Date()).getTime() < expires_date) {
                result = token
            } else {
                removeToken()
            }
        } else {
            removeToken()
        }
    } else {
        removeToken()
    }
    return result;
}

const removeToken = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('expires_in')
}