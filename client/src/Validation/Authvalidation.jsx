import { object, string, ref } from "yup";

export const userRegistrationValidationSchema = object().shape({
    username: string().trim().required("First Name is required").min(4, 'First name should be at least 4 characters'),
    email: string().email("Invalid email").trim().required("Email is required"),
    password: string().required("Password is required").min(4, 'Password should be at least 4 characters'),
  });