const express = require("express");

const speakersRoutes = require("./speakers");
const feedbackRoutes = require("./feedback");

const router = express.Router();

module.exports = (params) => {
  const { speakersService } = params;

  // For cookie session code
  // if (!req.session.visitCount) {
  //   req.session.visitCount = 0;
  // }
  // req.session.visitCount += 1;
  // console.log(`Number of visits: ${req.session.visitCount}`);
  router.get("/", async (req, res) => {
    const topSpeakers = await speakersService.getList();
    res.render("layout", { pageTitle: "Home", template: "index", topSpeakers });
  });

  router.use("/speakers", speakersRoutes(params));
  router.use("/feedback", feedbackRoutes(params));

  return router;
};
