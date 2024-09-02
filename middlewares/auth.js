const { validateUser } = require("../services/auth")

const checkForAuthenticationCookie=(cookieName)=>{
    return (req,res,next)=>{
        const tokenCookieValue=req.cookies[cookieName]
        if (!tokenCookieValue) {
            return next(); // Early return to prevent further processing
        }

        try {
            const userPayload=validateUser(tokenCookieValue)
            req.user=userPayload
        } catch (error) {
            console.error('JWT validation failed:', error.message);
            return next(error);
        }

        next()
    }
}

module.exports={
    checkForAuthenticationCookie
}