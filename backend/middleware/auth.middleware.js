import jwt from 'jsonwebtoken';

export const protectRoute = async(req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken;

        if (!accessToken) {
           return res.status(401).json({ message: 'You are not authenticated' });

        }

        try {
            
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        req.user = user;

        next();
            
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Token expired' });
            }
            else {
                throw error;
            }
            
        }

    }

    catch (error) {
        console.log('Error in protectRoute middleware', error.message);
        res.status(401).json({ message: error.message });
    }
}


export const adminRoute = async(req, res, next) => {
    try {
        if (req.user && req.user.role === 'admin') {
            next();
        }
        else {
            res.status(403).json({ message: 'Not authorized as an admin' });
        }
    }
    catch (error) {
        console.log('Error in adminRoute middleware', error.message);
        res.status(401).json({ message: error.message });
    }
}
