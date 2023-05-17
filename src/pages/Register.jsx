import { PasswordInput, TextInput } from "@mantine/core";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../redux/api/authApi";
import { useForm } from "@mantine/form";
import { Loader } from "@mantine/core";

const Register = () => {
  const [register, { isLoading }] = useRegisterMutation();
  const nav = useNavigate();

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },

    validate: {
      name: (value) =>
        value.length < 2 ? "Name must have at least 2 letters" : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length < 8 ? "Password must have at least 8 letters" : null,
      password_confirmation: (value, values) =>
        value !== values.password ? "Passwords did not match" : null,
    },
  });
  
  return (
    <div className=" flex justify-center items-center h-screen">
      <form
        onSubmit={form.onSubmit(async (values) => {
          try {
            const { data } = await register(values);
            console.log(values);
            console.log(data);
            if (data?.success) {
              nav("/login");
            }
          } catch (error) {
            console.log(error);
          }
        })}
        className=" w-96 p-7 flex flex-col shadow-lg gap-10"
      >
        <h2 className="text-2xl text-gray-500 font-semibold">Register</h2>
        <TextInput
          value="name"
          placeholder="Enter your Name..."
          {...form.getInputProps("name")}
        />
        <TextInput
          value="email"
          placeholder="Enter your Email..."
          {...form.getInputProps("email")}
        />
        <PasswordInput
          value="password"
          placeholder="Enter your Password..."
          {...form.getInputProps("password")}
        />
        <PasswordInput
          value="password_confirmation"
          placeholder="Confirm Password"
          {...form.getInputProps("password_confirmation")}
        />
        <div className=" flex gap-4 items-center">
          <p className=" text-gray-700 font-medium cursor-pointer">
            Already have an account?
          </p>
          <Link to={"/login"}>
            <p className=" text-gray-700 font-medium cursor-pointer">Sign in</p>
          </Link>
        </div>
        <button
          disabled={isLoading && true}
          type="submit"
          className=" bg-blue-700 text-white px-4 py-1"
        >
          {isLoading ? (
            <div className=" flex justify-center items-center gap-2">
              <Loader color="white" size="xs" />
              <span>Loading....</span>
            </div>
          ) : (
            "Sign up"
          )}
        </button>
      </form>
    </div>
  );
};

export default Register;
