const router = require("express").Router();
const homeController = require("./controllers/homeController");
const userController = require("./controllers/userController");
const elementController = require("./controllers/elementController");

router.use(homeController);
router.use("/users", userController);
router.use("/element", elementController);

router.get("*", (req, res) => {
  res.redirect("/404");
});
module.exports = router;
