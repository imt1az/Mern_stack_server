const httpStatus = require("http-status");
const { authService, emailService } = require("../services");

const authController = {
  async register(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await authService.createUser(email, password);
      console.log("Its calling Next");
      const token = await authService.getAuthToken(user);
      console.log("Token is  ", token);


      // Send Register Email
      await emailService.registerEmail(email,user,token)

      res.cookie("x-access-token", token).status(httpStatus.CREATED).send({
        user,
        token,
      });
    } catch (error) {
      console.log("Error is", error);
      next(error);
    }
  },
  async signin(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await authService.signInWithEmailAndPassword(
        email,
        password
      );
      const token = await authService.getAuthToken(user);
      res.cookie("x-access-token", token).send({
        user,
        token,
      });
    } 
    catch (error) {
      next(error);
    }
  },
  async isauth(req, res, next) {
    try {
      res.json(req.user)
    } catch (error) {}
  },

  
};

module.exports = authController;
