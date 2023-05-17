import { Loader, PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../redux/api/authApi";
import { addUser } from "../redux/services/authSlice";

const Login = () => {
  //const [email, setEmail] = useState("abcsusan@gmail.com");
  //const [password, setPassword] = useState("456789ss");

  const nav = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  const form = useForm({
    initialValues: {
      email: "admin@gmail.com",
      password: "admin123",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length < 7 ? "Password must have at least 8 letters" : null,
    },
  });

  return (
    <div className=" flex justify-center items-center h-screen">
      <form
        onSubmit={form.onSubmit(async (values) => {
          try {
            const { data } = await login(values);
            console.log(values);
            console.log(data);
            dispatch(addUser({ user: data?.user, token: data?.token }));

            if (data?.success) {
              nav("/");
            }
          } catch (error) {
            console.log(error);
          }
        })}
        className=" w-96 p-7 flex flex-col shadow-lg gap-10"
      >
        <h2 className="text-2xl text-gray-500 font-semibold">Login</h2>
        <TextInput
          {...form.getInputProps("email")}
          withAsterisk
          placeholder="Enter your Email..."
        />
        <PasswordInput
          {...form.getInputProps("password")}
          withAsterisk
          placeholder="Enter your Password..."
        />
        <div className=" flex gap-4 items-center">
          <p className=" text-gray-700 font-medium cursor-pointer">
            Don't have an account?
          </p>
          <Link to={"/register"}>
            <p className=" text-gray-700 font-medium cursor-pointer">
              Register
            </p>
          </Link>
        </div>
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
            "Sign in"
          )}
        </button>
      </form>
    </div>
  );
};

export default Login;
