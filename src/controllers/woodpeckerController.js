const express = require('express');
const router = express.Router();
const Woodpecker = require('../models/Woodpecker');
const Joi = require('joi');

// Define a schema for validation
const schema = Joi.object({
    name: Joi.string().alphanum().min(1).max(50).required()
});

// Get Get all woodpecker available sets
router.get('/', async (req, res) => {
    try {
        const sets = await Woodpecker.find({}, 'name').exec();
        res.json(sets);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' + error });
    }
});

// Get a single woodpecker set by name
router.get('/:name', async (req, res) => {
    // Validate the input
    const { error, value } = schema.validate({ name: req.params.name });
    if (error) {
        return res.status(400).json({ error: 'Invalid input' });
    }

    try {
        const set = await Woodpecker.findOne({
            name: value.name,
        }).exec();
        if (!set) {
            return res.status(404).json({ error: 'Set not found' });
        }
        res.json(set);
    } catch (error) {
        console.error('Internal server error:', error); // Log the error for debugging
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get puzzles from a specific set and difficulty
router.get('/:name/:difficulty', async (req, res) => {
    // Validate the input
    const { error, value } = schema.validate({ name: req.params.name });
    if (error) {
        return res.status(400).json({ error: 'Invalid input' });
    }
    // validate the difficulty
    if (!['easy', 'intermediate', 'advanced'].includes(req.params.difficulty))
        return res.status(400).json({ error: 'Invalid difficulty level' });

    try {
        const set = await Woodpecker.findOne({
            name: value.name,
        }).exec();
        if (!set) {
            return res.status(404).json({ error: 'Set not found' });
        }

        let puzzles = [];
        switch (req.params.difficulty) {
            case 'easy':
                puzzles = set.easy;
                break;
            case 'intermediate':
                puzzles = set.intermediate;
                break;
            case 'advanced':
                puzzles = set.advanced;
                break;
            default:
                return res.status(400).json({ error: 'Invalid difficulty' });
        }

        res.json(puzzles);
    } catch (error) {
        console.error('Internal server error:', error); // Log the error for debugging
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get available themes for the woodpecker set and difficulty
router.get('/:name/:difficulty/themes', async (req, res) => {
    // Validate the input
    const { error, value } = schema.validate({ name: req.params.name });
    if (error) {
        return res.status(400).json({ error: 'Invalid input' });
    }
    // validate the difficulty
    if (!['easy', 'intermediate', 'advanced'].includes(req.params.difficulty))
        return res.status(400).json({ error: 'Invalid difficulty level' });

    try {
        const set = await Woodpecker.findOne({
            name: value.name,
        }).exec();
        if (!set) {
            return res.status(404).json({ error: 'Set not found' });
        }
        // check easy_themes, intermediate_themes, advanced_themes depending on the input difficulty
        let themes = [];
        switch (req.params.difficulty) {
            case 'easy':
                themes = set.easy_themes;
                break;
            case 'intermediate':
                themes = set.intermediate_themes;
                break;
            case 'advanced':
                themes = set.advanced_themes;
                break;
            default:
                return res.status(400).json({ error: 'Invalid difficulty' });
        }
        res.json(themes);
    } catch (error) {
        console.error('Internal server error:', error); // Log the error for debugging
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;
