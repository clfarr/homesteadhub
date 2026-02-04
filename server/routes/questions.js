const express = require('express');
const supabase = require('../supabase');

const router = express.Router();

// Get all questions (optionally filter by category)
router.get('/', async (req, res) => {
  try {
    const { category_id } = req.query;

    let query = supabase
      .from('questions')
      .select(`
        *,
        users (username),
        categories (name)
      `)
      .order('created_at', { ascending: false });

    if (category_id) {
      query = query.eq('category_id', category_id);
    }

    const { data: questions, error } = await query;

    if (error) throw error;

    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single question by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const { data: question, error } = await supabase
      .from('questions')
      .select(`
        *,
        users (username),
        categories (name)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;

    res.json(question);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new question
router.post('/', async (req, res) => {
  try {
    const { title, body, user_id, category_id } = req.body;

    const { data: question, error } = await supabase
      .from('questions')
      .insert([{ title, body, user_id, category_id }])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json(question);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;