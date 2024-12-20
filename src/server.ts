import app from './app';
import itemRoutes from './routes/items';
import userRoutes from './routes/users';

const PORT = 3000;

// Routes
app.use('/items', itemRoutes);
app.use('/users', userRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
