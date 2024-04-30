const User = require("../model/auth");
const { UserZodSchema } = require("../utils/ZodSchema");

const handleSignup = async (req, res) => {
  const { firstName, lastName, email, gender, phone, password } = req.body;
  try {
    const validatedData = UserZodSchema.parse({
      firstName,
      lastName,
      email,
      gender,
      phone,
      password,
    });
    // make my validation validation
    const response = await User.create(validatedData);

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: "error creating data", error });
  }
};

module.exports = { handleSignup };
