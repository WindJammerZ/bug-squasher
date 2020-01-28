const isValidRole = (allowedRoles, userRole) => {
    return (allowedRoles.includes(userRole) || (userRole === ADMINISTRATOR))
}

module.exports = {
    isValidRole
}