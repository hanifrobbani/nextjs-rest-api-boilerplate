import * as z from "zod";
 
export const PostUserSchema = z.object({ 
  username: z.string().nonempty("Username is required"),
  email: z.string().email("Invalid email format").nonempty("Email is required"),
  password: z.string().nonempty("Password is required")
});