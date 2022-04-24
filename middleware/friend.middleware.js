const {friend, user} = require('../models/index');

module.exports = {
    sameUser: (req, res, next) => {
        let user1 = req.params.id;
        let user2 = req.session.user.id;
        if (user1 === user2) {
            res.status(500).json({error: 'Cant perform this operation on same user!'});
        }
        next();
    },
    friendExist: async (req, res, next) => {
        let friendId = req.params.id;
        let friendUser = await user.findOne({where: {id: friendId}});
        if (!friendUser) {
            res.status(500).json({error: 'Friend does not exist'});
        }
        next();
    },

    friendMappingExist: async (req, res, next) => {
        let user1Id = req.session.user.id;
        let user2Id = req.params.id;
        let alreadyFriend = await friend.findOne({where: {user1: user1Id, user2: user2Id}});
        if (alreadyFriend) {
            res.status(500).json({error: 'User is already friend!'});
        }
        next();
    },
}
