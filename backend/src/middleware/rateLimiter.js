import ratelimit from "../config/upstash.js"


const rateLimiter = async (req, res, next) => {
    try {
        const {success } = await ratelimit.limit("my-rate-limit");
         // Use the client's IP address as the key for rate limiting
        if (!success) {
            return res.status(429).json({ 
                message: "Too many requests, please try again later." 
            });
        }
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.log("Error in rate limiter middleware:", error);
        next(error); // Pass the error to the next middleware (error handler)
        
    }
}

export default rateLimiter;
