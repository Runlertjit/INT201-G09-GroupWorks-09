export {cookie}


const cookie = {
    setCookie(cname,cvalue,days){
        const setDate = new Date();
        setDate.setTime(setDate.getTime()+ (days*24*60*1000));
        let expires = 'expires=' + setDate.toUTCString();
        document.cookie = cname + '=' + cvalue + ';' + expires;
    },
    getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
      }
}