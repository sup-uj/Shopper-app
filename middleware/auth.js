// import jwt from 'jsonwebtoken';

// const checkToken = (req, res, next) => {
//     if (!req.headers.authorization) {
//         return res.status(403).send({ code: 403, message: 'Unauthorized User' });
//     }

//     jwt.verify(req.headers.authorization, ' KEY')
//         .then(decodeUser => {
//             console.log(decodeUser, Date.now() / 1000, "12");

//             if (Date.now() / 1000 >= decodeUser.exp) {
//                 return res.status(403).send({ code: 403, message: 'TOKEN_EXPIRED' });
//             }

//             // req.user = decodeUser;
//             // req.permissions = decodeUser.roles[0].permissions;
//             next();
//         })
//         .catch(err => {
//             console.error('Error verifying token:', err);
//             return res.status(403).send({ code: 403, message: 'TOKEN_EXPIRED' });
//         });
// };
// export default checkToken


import jwt from 'jsonwebtoken';

const checkToken = async (req, res, next) => {
    console.log(req.headers,'13')
    try {
        if (!req.headers.authorization) {
            return res.send({ code: 403, message: 'Unauthorized User' })
        }

        const decodeUser = await jwt.verify(req.headers.authorization, 'KEY')
        console.log(decodeUser, Date.now() / 1000, "12")

        if (Date.now() / 1000 >= decodeUser.exp) {
            return res.send({ code: 403, message: 'TOKEN_EXPIRED' })
        }

        // req["user"] = decodeUser
        // req["permissions"] = decodeUser.roles[0].permissions
        next()


    } catch (err) {
        // console.log(err, "err")
        return res.send({ code: 403, message: 'TOKEN_EXPIRED' })
    }
}
export default checkToken