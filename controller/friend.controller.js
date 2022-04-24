const bcrypt = require('bcrypt');
const {friend, user} = require('../models/index');

module.exports = {
    friendMappingExist: async (user1Id, user2Id) => {
        let alreadyFriend = await friend.findOne({where: {user1: user1Id, user2: user2Id}});
        if (!alreadyFriend) {
            return false;
        }
        return true;
    },

    getFriends: async (req, res) => {
        let currentUserId = req.session.user.id;
        try {
            let friendList = await friend.findAll({where: {user1: currentUserId}});
            res.status(200).json({friends: friendList});
        } catch (e) {
            res.status(500).json({error: e.toString()});
        }
    },
    add: async (req, res) => {
        try {
            let currentUserId = req.session.user.id;
            let friendId = req.params.id;
            if (!friendId) {
                res.status(402).json({error: 'Friend Id is missing!'});
            }
            await friend.create({user1: currentUserId, user2: friendId});
            res.status(200).json({success: true});
        } catch (e) {
            res.status(500).json({error: 'Error while adding friend. ' + e.toString()});
        }
    },

    remove: async (req, res) => {
        try {
            let currentUserId = req.session.user.id;
            let friendId = req.params.id;
            if (!friendId) {
                res.status(402).json({error: 'Friend Id is missing!'});
            }
            if (!await this.friendMappingExist(currentUserId, friendId)) {
                res.status(500).json({error: 'User is not already friend!'});
            }
            await friend.remove({where: {user1: currentUserId, user2: friendId}});
            res.status(200).json({success: true});
        } catch (e) {
            res.status(500).json({error: 'Error while removing friend. ' + e.toString()});
        }
    },
    accept: async (req, res) => {

    }

}
