import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' }); //por esto no funcionaba, faltaba especificar el camino
console.log('MONGO_URI:', process.env.MONGO_URI);
console.log('PORT:', process.env.PORT);
console.log('VITE_API_KEY:', process.env.VITE_API_KEY);



const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

const searchSchema = new mongoose.Schema({
  city: String,
  country: String,
  temperature: Number,
  conditionText: String,
  icon: String,
  date: { type: Date, default: Date.now }
});

const Search = mongoose.model('Search', searchSchema);

app.post('/api/search', async (req, res) => {
  const search = new Search(req.body);
  try {
    await search.save();
    res.status(201).send(search);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get('/api/search', async (req, res) => {
  try {
    const searches = await Search.find().sort({ date: -1 }).limit(10);
    res.send(searches);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
