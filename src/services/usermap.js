const sessionIdToUserMap = new Map();

const getUserFromMap = (sessionId) => {
    return sessionIdToUserMap.get(sessionId)
}

const setUserToMap = (sessionId, user) => {
    sessionIdToUserMap.set(sessionId, user)
}

export {getUserFromMap, setUserToMap, sessionIdToUserMap }