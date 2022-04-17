const {memories} = require('../models/index');

module.exports = {
    posts: async (req, res) => {
        let all_memories = await memories.findAll();
        res.render('memories/post', {title: `${req.session.user.name} Memories`, memories: all_memories});
    },
    form: (req, res) => {
        res.render('memories/postForm', {title: `${req.session.user.name} add your memories`});
    },

    addMemories: async (req, res) => {
        let body = req.body;
        if (!Object.hasOwnProperty.bind(body)('title') ||
            !Object.hasOwnProperty.bind(body)('description')) {
            res.render('error', {message: 'Some required fields are missing'});
        }

        try {
            let memory = await memories.create({
                title: body.title,
                description: body.description,
                user_id: req.session.user.id
            });
            if (memory) {
                res.redirect('/memories');
            }
        } catch (e) {
            res.render('error', {message: e.toString()});
        }
    }
}