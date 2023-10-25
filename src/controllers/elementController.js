const router = require("express").Router();
const elementManager = require("../manager/elementManager");
const { getErrorMessage } = require("../utils/errorHelper");

router.get("/create", (req, res) => {
  res.render("element/create");
});

router.post("/create", async (req, res) => {
  const elementData = req.body;
  elementData["owner"] = req.user.id;
  try {
    await elementManager.create(elementData);
    res.redirect("/element/catalog");
  } catch (err) {
    res.render("element/create", { error: getErrorMessage(err) });
  }
});

router.get("/catalog", async (req, res) => {
  try {
    const elements = await elementManager.getAll();
    res.render("element/catalog", { elements });
  } catch (err) {
    res.render("element/catalog", { error: getErrorMessage(err) });
  }
});

router.get("/:id/details", async (req, res) => {
  const elementId = req.params.id;

  try {
    const element = await elementManager.getOne(elementId);
    const isOwner = element.owner._id.toString() === req.user?.id;
    res.render("element/details", { element, isOwner });
  } catch (err) {
    res.render("404", { error: getErrorMessage(err) });
  }
});

router.get("/:id/edit", async (req, res) => {
  const elementId = req.params.id;
  try {
    const elementData = await elementManager.getOne(elementId);
    const option = getDifficultyOptionViewData(elementData.platform);
    res.render("element/edit", { elementData, option });
  } catch (err) {
    res.render("404", { error: getErrorMessage(err) });
  }
});

router.post("/:id/edit", async (req, res) => {
  const elementId = req.params.id;
  const elementData = req.body;

  try {
    await elementManager.update(elementId, elementData);
    res.redirect(`/element/${elementId}/details`);
  } catch (err) {
    res.render("element/edit", { elementData, error: getErrorMessage(err) });
  }
});

router.get("/:id/delete", async (req, res) => {
  //check for id !!!
  const elementId = req.params.id;
  try {
    await elementManager.delete(elementId);
    res.redirect("/element/catalog");
  } catch (err) {
    res.render("404", { error: getErrorMessage(err) });
  }
});

module.exports = router;

function getDifficultyOptionViewData(difficultyLevel) {
  const titles = {
    PC: "PC",
    Nintendo: "Nintendo",
    PS4: "PS4",
    PS5: "PS5",
    XBOX: "XBOX",
  };
  const option = Object.keys(titles).map((key) => ({
    key,
    label: titles[key],
    selected: key == difficultyLevel,
  }));

  return option;
}
