import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWT_SECRET } from '../config';
import User from '../models/userModel';


export const protect = async (req: JwtPayload, res: Response, next: NextFunction) => {
    try {
        const authorization  = req.headers.authorization

        if(!authorization) {
            return res.status(401).json({
                Error: 'Kindly login'
            });
        }
         //Verify token
        const token = authorization.split(' ')[1];
        let verified = await jwt.verify(token, JWT_SECRET);

        if(!verified) {
            return res.status(401).json({
                Error: "unauthorized"
            });
        }
        const { _id } = verified as {[key:string]:string}

        //Find the user by id
        const user = await User.findOne({ _id });
        if (!user) {
            return res.status(401).json({
                Error: "Invalid token"
            });
        }

        req.user = user
        next();
    } catch (error) {
        return res.status(401).json({
            Error: "Unauthorized"
        });
    }
}


//**==== Verify and Authorize a User to Update and Delete Profile ====**/
export const verifyAndAuthorize = async (req: JwtPayload, res: Response, next: NextFunction) => {
    if(req.user._id === req.params.id || req.user.role === "admin") {
         next();
    } else {
        return res.status(401).json({
            Error: "You do not have permission to do that"
        })
    }
}

//**==== Verify and Authorize if User is Admin ====**/
export const verifyAndAuthorizeAdmin = async (req: JwtPayload, res: Response, next: NextFunction) => {
    if(req.user.role === "admin") {
         next();
    } else {
        return res.status(401).json({
            Error: "Only admins have the permission to do that"
        })
    }
}