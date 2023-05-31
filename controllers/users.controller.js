const httpStatus = require("http-status");
const { ApiError } = require("../middleWare/apiError");
const { userService,authService, emailService } = require("../services");

const usersController = {
  async profile(req, res, next) {
    try {
      const user = await userService.findUserById(req.user._id);
      if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, "User Not Found");
      }

      res.json(res.locals.permission.filter(user._doc));
      // res.json(user);
    } catch (error) {
      next(error);
    }
  },

  async updateProfile(req, res, next) {
    try {
      const user = await userService.updateUserProfile(req);
      res.json(user);
    } catch (error) {}
  },

  async updateUserEmail(req,res,next){
   try{
       const user = await userService.updateUserEmail(req);
       const token = await authService.getAuthToken(user);


       //Send Email To Verify Account
         await emailService.registerEmail(user.email,user);


       res.cookie("x-access-token",token)
       .send({
        user,
        token
       })
   } 
   catch(error){
      next(error)
   }
  },

  async verifyAccount(req,res, next){
    try {
        const token = await userService.validateToken(req.query.validation);
        const user = await userService.findUserById(token.sub);

        if(!user) throw new ApiError(httpStatus.NOT_FOUND,'User not found');
        if(user.verified) throw new ApiError(httpStatus.BAD_REQUEST,'Already verified')

        user.verified = true;
        user.save();
        res.status(httpStatus.CREATED).send({
            user
        })
    } catch(error){
        next(error);
    }
}
};

module.exports = usersController;
