const Spot = require('../models/Spot');
const User = require('../models/User');

module.exports = {
  async index(req, res) {
    const { tech } = req.query;

    const spots = await Spot.find({ techs: tech });

    return res.json(spots);
  },

  async store(req, res) {
    const { filename } = req.file;
    const { company, techs, price } = req.body;
    const { user_id } = req.headers;

    const user = await User.findById(user_id);

    if (!user) {
      return res.status(400).json({ error: 'O usuário não existe' });
    }

    const spot = await Spot.create({
      user: user_id,
      thumbnail: filename,
      company,
      // divide a cada "," e remove espaço do inicio e fim de cada string
      techs: techs.split(',').map(tech => tech.trim()),
      price,
    });

    return res.json(spot);
  },
};
