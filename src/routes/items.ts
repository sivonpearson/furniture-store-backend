import express from 'express';
import multer from 'multer';
import Item from '../models/item';

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // saves images to 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // use unique filename
  },
});
const upload = multer({ storage });

// Get all items
router.get('/get_all_items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

// Add new item
router.post('/add_item', upload.single('image'), async (req, res) => {
  const { name, description, price } = req.body;

  // Validate request
  if (!name || !description || !price || !req.file) {
    res.status(400).json({ error: 'All fields are required' });
    return;
  }

  // const imageUrl = `../uploads/${req.file.filename}`;
  const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

  try {
    const newItem = new Item({ name, description, price, imageUrl });
    await newItem.save();
    res.status(201).json({ message: 'Item added successfully', item: newItem });
  } catch (error) {
    console.error('Error adding item:', error);
    res.status(500).json({ error: 'Failed to add item' });
  }
});

router.post('/delete_all_items', async (req, res) => {
  try {
    await Item.deleteMany();
    res.status(201).json({ message: 'All items successfully deleted' });
  } catch (error) {
    console.error('Error deleting all items:', error);
    res.status(500).json({ error: 'Failed to delete all items' });
  }
});

export default router;