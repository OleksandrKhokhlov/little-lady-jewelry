const cron = async (req, res) => {
  res.status(200).send("pong");
};

module.exports = { cron };
