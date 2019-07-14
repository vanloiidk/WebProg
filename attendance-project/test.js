function getCookie() {
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split('/');
    if(ca.length > 0) {
        return ca;
    }
    return "";
}

console.log(getCookie());