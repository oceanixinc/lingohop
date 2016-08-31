//auth.js
// $ = jQuery = require('jquery');


module.exports = {
    login: function(username, pass, cb) {
        if (localStorage.token) {
            if (cb) cb(true)
            return
        }
        this.getToken(username, pass, (res) => {
            if (res.authenticated) {

                localStorage.token = res.token
                console.log(localStorage.token);
                if (cb) cb(true)
            } else {
                if (cb) cb(false)
            }
        })
    },        
    
    logout: function() {
        console.log(localStorage.token);
        delete localStorage.token
    },

    loggedIn: function() {

        return !!localStorage.token
    },

    getToken: function(username, pass, cb) {
        $.ajax({
            type: 'POST',
            url: '/rest-auth/login/',
            data: {
                username: username,
                password: pass
            },
            success: function(res){


                cb({
                    authenticated: true,
                    token: res.key
                })
            },
             error: function(xhr, status, err) {
        console.log("error",err)
      }

        })
    }, 
}