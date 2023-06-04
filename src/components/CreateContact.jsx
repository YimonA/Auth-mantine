import { Loader, TextInput } from "@mantine/core";
import { hasLength, useForm } from "@mantine/form";
import Cookies from "js-cookie";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useCreateContactMutation } from "../redux/api/contactApi";

const CreateContact = () => {
  const [createContact, { isLoading }] = useCreateContactMutation();
  const token = Cookies.get("token");
  const nav = useNavigate();

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },

    validate: {
      name: (value) =>
        value.length < 2 ? "Name must have at least 2 letters" : null,

      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      phone: hasLength({ min: 9, max: 11 }),
    },
  });

  return (
    <div className=" flex justify-center items-center h-screen">
      <form
        onSubmit={form.onSubmit(async (values) => {
          try {
            const {data} = await createContact({ token, contact: values });
            console.log("v", values);
            console.log("t", token);

            console.log(data);
            //dispatch(addUser({ user: data?.user, token: data?.token }));

            if (data?.success) {
              nav("/");
            }
            
          } catch (error) {
            console.log(error);
          }
        })}
        className=" w-96 p-7 flex flex-col shadow-lg gap-10"
      >
        <h2 className="text-2xl text-gray-500 font-semibold mx-auto">Create Contact</h2>
        <TextInput
          {...form.getInputProps("name")}
          placeholder="Enter your Name..."
        />
        <TextInput
          {...form.getInputProps("email")}
          placeholder="Enter your Email..."
        />
        <TextInput
          {...form.getInputProps("phone")}
          placeholder="Enter your Phone..."
        />
        <TextInput
          {...form.getInputProps("address")}
          placeholder="Enter your Address..."
        />

        <button
          disabled={isLoading && true}
          type="submit"
          className=" bg-blue-700 text-white px-4 py-1"
        >
          {isLoading ? (
            <div className=" flex justify-center items-center gap-1">
              <Loader color="white" size="xs" />
              <span>Loading....</span>
            </div>
          ) : (
            "Create"
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateContact;
