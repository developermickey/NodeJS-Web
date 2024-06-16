const express = require("express");
const path = require("path");

const cookieSession = require("cookie-session");

const FeedbackService = require("./services/FeedbackService");
const SpeakersService = require("./services/SpeakerService"); // Correct import

const feedbackService = new FeedbackService("./data/feedback.json");
const speakersService = new SpeakersService("./data/speakers.json"); // Correct instantiation

const routes = require("./routes");

const app = express();

const port = 3000;
app.set("trust proxy", 1);
app.use(
  cookieSession({
    name: "session",
    keys: ["Ghdur687399s7w", "hhjjdf89s866799"],
  })
);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

app.locals.siteName = "ROUX Meetups";

app.use(express.static(path.join(__dirname, "public")));

app.use(async (req, res, next) => {
  try {
    const names = await speakersService.getNames(); // Correctly use speakersService here
    res.locals.speakerNames = names;
    // console.log(res.locals);
    return next();
  } catch (err) {
    return next(err);
  }
});

app.use(
  "/",
  routes({
    feedbackService,
    speakersService,
  })
);

app.listen(port, () => {
  console.log(`Express Server Run ${port}`);
});
