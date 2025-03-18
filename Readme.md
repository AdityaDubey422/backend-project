# Backend Project


## 01
## first thing we did is learned how to setup bakcend project professionally (all folders ,.gitignore,.prettierrc,.prettierignore,.env,nodmeon,.gitkeep)


# 02
## Then we learned how to connect databse..with mongoose.connnect and giving the databse URI/Databse name and it takes time to connect to DB because DB is in another continent so async await try catch sab lagao catch me process.exit(1) kardo


# 03
## iss lecture me hamne sabse pehle to kuch middlewares likhe(cusotm middleware nahi..normal jo hai vo sab)..like cors,express.json,express.urlencoded,express.statis,cookieParser
## and hamne utils me asyuc handler bnaay, aur custom api error and custom api response ke clases bana diye ..jaaki kaise error handle karna hai kaise api respone ka maamla hoga sab standardize ho jaaye..ye aage aur samajh aaygea jab inn chijo ko use bhi karenge..abhi to bas banaya hai

# 04
## then we did the data modelling for user and video(you can see in user.mode.js and video.model.js) yaha pe sirf modelling ke alwa kuch chije hamne aru kari..jaise user ke password ko encrytp karne ke liye bcrypt naam ki library use kari dhyaan rakhna ye password ki hashing karna time consuim task hai to async await try catch rakhna..and ye hashing kari hamne data just databse me store hone se pehle..uske liye hamne ek in built method use kiya that is "pre"
## hamne kuch custom methods bhi banaye like isPasswordCorrect jisme hamne bcrypt.compare use kiya hai and databse me stored password and jo function call karte time passkword diya hoga as an argument usko compare karegs(again abhi sirf methof bnaya hai ..use ni kiya..use karenge to aur samajh aayega)
## aur custom methods hamne banaye that are generateAccessToken and generateRefreshToken , with the htlp of jwt(jsonwebtoken a third party librayr)..we used jwt.sign() and andar trrn chije di first ovject jisme propertie jo ham chhate hai second procces.env.ACCESS_TOKEN_SECRET and third is again object jisme hamne key di expiresIn and value di procces.env.ACCESS_TOKEN_EXPIRY
## same with refresh token bas env variable badal diye , again aage jab use karenge inn sabko to aur samajh aayega..abhi banana kaise hai ye samajh lo

# 05
## isme hamne cloduinary setup karna sikha hai...ek utils file banayi jisme hamne cloduinary importkarke config kara and ek function banaya uploadOnCloudinary jisme kuch ni kara..again ye time consumg task hai to async await try catch ye sab lagana...ye argument lega localFilePath and awai cloudinary.uploader.upload(localFilePath,{resourse_type:"auto})..catch me unlink the file with fs.unlinkSync(localFIlePath) and return null
## isme hamne multer.middleware.js bhi bnaya

## 06 
## then agla iss folder me kuch ni hai..aise he thoery thi http ki..to vo hamne samjhi...http header samjha(basically meta data of the request or response(in key value pair)) ..httop method dekhe get,post,patch,put,head,delete..patch means kuch part change karo..put me pura replcace he kardo...head me sirf http header aataa hai(used for knowning meta data)...http status codes...100-199 informational,200-299 success,300-399 redirection,400-499 client error,500-599 server error...these all are just standards convention

# 07
## in this lecture we made a template of router,controller and how to setup this(its a small lecture) basically router waali file me router banao aur fir router se alag alag routes banao aur alag alag controllers ko do uss route ko handle karne ko
## for now, abhi bas contolrrer me aise he ek /register banake usme 
res.json({
    message:ok
})
## bhej diya (with asyncHandler wrapper)
## and hamne ye bhi dekha ki ham app.js file me userRouter ko import karaya hai and then app.get nahi likha because ye ham tab kar sakte hai jab sab maamla ek file me chal raha hai..lekin prifessionaly har chij alag alag file me hoti..to basically hamne userRouter import kara and ek middleWare laga diya jisme likh diya kabhi bhi url me /user aaye to control fir userROuter ko de dena url => http://localhost:3000/ap/v1/user/register(chekc app.js for more information)

