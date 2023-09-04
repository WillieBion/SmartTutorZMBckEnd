import { sign, verify } from "jsonwebtoken";
import { GenerateTokenI } from "./types/userDetailTypes";

export const generateToken = (userobject: GenerateTokenI) => {
  const { msisdn, user_name, password } = userobject;
  const token = sign(
    { msisdn, user_name, password },
    process.env.JSON_SECRET_KEY!
  );
  return token;
};

export const validateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(400).json({ error: "User is not authenticated" });
  }
  const accToken = authHeader.split(" ")[1];

  try {
    const validate = verify(accToken, process.env.JSON_SECRET_KEY!);
    if (validate) {
      req.authenticated = true;
      return next();
    }
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};

// module.exports = { generateToken, validateToken };
