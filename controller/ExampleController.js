// Controller.js
const ExampleModels = require('../models/ExampleModels');

async function selectAll(req, res) {
    try {
        const examples = await ExampleModels.findAll();
        res.json(examples);
    } catch (error) {
        console.error('Unable to select examples:', error);
        res.status(500).json({ error: 'Unable to select examples' });
    }
}

async function selectById(req, res) {
    try {
        const DataID = req.params.id;
        const example = await ExampleModels.findByPk(DataID);

        if (!example) {
            return res.status(404).json({ error: 'Example not found' });
        }

        res.json(example);
    } catch (error) {
        console.error('Unable to select example:', error);
        res.status(500).json({ error: 'Unable to select example' });
    }
}

async function createData(req, res) {
    try {
        const newExample = await ExampleModels.create({
            title: req.body.title,
            description: req.body.description,
            date_update: new Date()
        });

        console.log('New example created:');
        console.log(newExample.toJSON());

        res.status(201).json(newExample);
    } catch (error) {
        console.error('Unable to create example:', error);
        res.status(500).json({ error: 'Unable to create example' });
    }
}

async function updateById(req, res) {
    try {
        const DataID = req.params.id;
        const example = await ExampleModels.findByPk(DataID);

        if (!example) {
            return res.status(404).json({ error: 'Example not found' });
        }

        example.title = req.body.title;
        example.description = req.body.description;
        example.date_update = new Date();

        await example.save();

        console.log('Example updated:');
        console.log(example.toJSON());

        res.json(example);
    } catch (error) {
        console.error('Unable to update example:', error);
        res.status(500).json({ error: 'Unable to update example' });
    }
}

async function deleteById(req, res) {
    try {
        const DataID = req.params.id;
        const example = await ExampleModels.findByPk(DataID);

        if (!example) {
            return res.status(404).json({ error: 'Example not found' });
        }

        await example.destroy();

        console.log('Example deleted:');
        console.log(example.toJSON());

        res.json(example);
    } catch (error) {
        console.error('Unable to delete example:', error);
        res.status(500).json({ error: 'Unable to delete example' });
    }
}

module.exports = { selectById, createData, updateById, deleteById, selectAll };
