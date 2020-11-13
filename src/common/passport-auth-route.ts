const passport = require("passport");

module.exports = (app: any) => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req: any, res: any) => {
      res.redirect("/");
    }
  );

  app.get("/api/logout", (req: any, res: any) => {
    req.logout();
    res.redirect("/");
  });

  app.get("/api/currentuser", (req: any, res: any) => {
    res.send(req.user);
  });
};
