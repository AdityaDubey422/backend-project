import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  // validation - any required field should not be empty
  // check if user already exits : username se ya email se check kar sakte hai
  // check karna hoga files hai ya nahi(user se jo required files chahiye vo hai ya nahi)
  // upload that files to cloudinary
  // create user object - create entry in db
  // remove password and refres tkoen field from ressponse
  // check for user creation
  // return response

  const { username, fullName, email, password } = req.body;
  // console.log("email: ", email, typeof username);
  // if (fullname === "") {
  //   throw new ApiError(400, "fullname is required");
  // }
  if (
    [fullName, email, username, password].some((field) => !field?.trim())
  ) {
    throw new ApiError(
      400,
      "All fields (username, fullName, email, password) are required"
    );
  }

  const normalizedUsername = username.toLowerCase();

  const existedUser = await User.findOne({
    $or: [{ normalizedUsername }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  //console.log(req.files)
  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  //const coverImageLocalPath = req.files?.coverImage?.[0]?.path  || "";

  let coverImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = coverImageLocalPath
    ? await uploadOnCloudinary(coverImageLocalPath)
    : null;

  if (!avatar) {
    throw new ApiError(500, "Failed to upload avatar");
  }

  const user = await User.create({
    username: normalizedUsername,
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User registered successfully"));
});

export { registerUser };
