module.exports = {
    login: function(username, pass, cb) {
        if (localStorage.token) {
            if (cb)
                cb(true)
            return
        }
        this.getToken(username, pass, (res) => {
            if (res.authenticated) {

                localStorage.token = res.token
                if (cb)
                    cb(true)
            } else {
                console.log('erorrrr');
                console.log(res.error);
                if (cb)
                    cb(false)
                console.log('test error');
                console.log(cb);
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
            success: function(res) {

                cb({authenticated: true, token: res.key})
            },
            error: function(xhr, status, err) {
                console.log("error", err)

                cb({authenticated: false, error: err})
            }

        })
    }
}
