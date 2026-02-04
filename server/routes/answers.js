const express = require('express');
const supabase = require('../supabase');

const router = express.Router();

// Get all answers for a question
router.get('/question/:question_id', async (req, res) => {
  try {
    const { question_id } = req.params;

    const { data: answers, error } = await supabase
      .from('answers')
      .select(`
        *,
        users (username)
      `)
      .eq('question_id', question_id)
      .order('created_at', { ascending: true });

    if (error) throw error;

    res.json(answers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new answer
router.post('/', async (req, res) => {
  try {
    const { body, user_id, question_id } = req.body;

    const { data: answer, error } = await supabase
      .from('answers')
      .insert([{ body, user_id, question_id }])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json(answer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
