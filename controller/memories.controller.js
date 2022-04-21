const {memories, like} = require('../models/index');

module.exports = {
    posts: async (req, res) => {
        let all_memories = await memories.findAll({
            include: [{
                model: like,
                as: 'likes'
            }],
            order: [['createdAt', 'DESC']]
        });
        res.render('memories/post', {title: `${req.session.user.name} Memories`, memories: all_memories});
    },
    form: (req, res) => {
        res.render('memories/postForm', {title: `${req.session.user.name} add your memories`});
    },

    editMemories: async (req, res) => {
        let memoryId = req.params.id;
        let memory = await memories.findOne({where: {id: memoryId}});
        res.render('memories/postForm', {
            title: `${req.session.user.name} add your memories`,
            memory: memory
        });
    },

    addMemories: async (req, res) => {
        let body = req.body;
        if (!Object.hasOwnProperty.bind(body)('title') ||
            !Object.hasOwnProperty.bind(body)('description')) {
            res.render('error', {message: 'Some required fields are missing'});
        }

        try {
            let memory = null;
            console.log(body)
            if (body.method !== 'edit') {
                memory = await memories.create({
                    title: body.title,
                    description: body.description,
                    userId: req.session.user.id
                });
            } else {
                console.log('editing')
                memory = await memories.update(
                    {
                        title: body.title,
                        description: body.description
                    },
                    {
                        where: {id: body.memoryId}
                    }
                );
            }
            if (memory) {
                res.redirect('/memories');
            }
        } catch (e) {
            res.render('error', {message: e.toString()});
        }
    },

    like: async (req, res) => {
        let memoryId = req.params.id;
        const Like = await like.findOne({where: {memoryId: memoryId}});
        if (!Like) {
            await like.create({count: 1, memoryId: memoryId});
        } else {
            await like.update(
                {count: Like.count + 1},
                {where: {memoryId: memoryId}}
            )
        }
        res.redirect('/memories');
    }
}
