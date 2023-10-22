const expressPkg = require("express");
const expSession = require("express-session");
const conSequelizeStore = require("connect-session-sequelize")(expSession.Store);
const Routes = require("./controllers");
const newSequelize = require("./config/connection");
const expHandle = require("express-handlebars");
const dateformate = expHandle.create({ helpers: require("./utils/dateformate") });

const app = expressPkg();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new conSequelizeStore({db: newSequelize,}),
};

app.use(expSession(sess));

app.use(expressPkg.json());
app.use(expressPkg.urlencoded({ extended: true }));
app.use(expressPkg.static("public"));
app.engine("handlebars", dateformate.engine);
app.set("view engine", "handlebars");

app.use(
  expSession({
    secret: process.env.SECRET,
    store: new conSequelizeStore({ db: newSequelize }),
    resave: false,
    saveUninitialized: false,
  })
);

app.use(Routes);

newSequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
});
