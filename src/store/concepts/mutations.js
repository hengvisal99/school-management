
export const mutations = {
    setUser(state, user) {
        console.log('set user', user)
        state.user = user
    },
    setToken(state, token) {
        console.log('set token', token)
        state.token = token
    },
    setLoginError(state, error) {
        state.loginError = error
    },
    setLoading(state, loading) {
        state.isLoading = loading;
    },
    setRedirectedFrom(state, redirectedFrom) {
        state.redirectedFrom = redirectedFrom;
    }
};
