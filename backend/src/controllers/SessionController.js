const User = require('../models/User');

// index, show, store, update, destroy

// GET, POST, PUT, DELETE

// req.query = Acessar query params (para filtros)
// req.params = Acessar route params (para edição, delete)
// req.body = Acessar corpo da requisição (para criação, edição)

module.exports = {
  async store(req, res) {
    const { email } = req.body;

    let user = await User.findOne({ email: email });

    if (!user) {
      user = await User.create({ email });
    }

    return res.json(user);
  },
};
