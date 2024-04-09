// import React, { useState } from "react";
// import { useDispatch } from 'react-redux';
// import { login } from "../../Redux/authSlice/authSlice"; 
//  import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const dispatch = useDispatch<any>();
//   const navigate = useNavigate();

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       await dispatch(login({email, password }));
//       navigate("/home")
//     } catch (error) {
//       console.error("Login error:", error);
//       alert("Login failed");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Login</h2>
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button type="submit">Login</button>
//       <div>
//       <p>Forgot Password: <button onClick={()=>navigate("/forgotpassword")}>Click Here</button> </p>
//       <p>Don't have Account : <button onClick={()=>navigate("/register")}>Create Account</button> </p>
//       </div>
//     </form>
//   );
// };

// export default Login;

import {
  Paper,
  TextInput,
  PasswordInput,
  Button,
  Title,
  Text,
  Anchor,
  Group,
} from "@mantine/core";
import classes from "../../Styles/LoginAuth.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../Redux/authSlice/authSlice";
import { GoogleButton } from "../../Global_Components/GoogleIcon";
import { TwitterButton } from "../../Global_Components/TwitterButton";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await dispatch(login({ email, password }));
      if (response.meta.requestStatus === "fulfilled") {
        navigate("/home");
      } else {
        console.error("Login error:", response.status);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          LOGIN
        </Title>

        <TextInput
          label="Email address"
          placeholder="hello@gmail.com"
          onChange={(e) => setEmail(e.target.value)}
          size="md"
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          onChange={(e) => setPassword(e.target.value)}
          mt="md"
          size="md"
        />
        <Anchor<"a"> fw={400} size="sm" onClick={()=>navigate("/forgotpassword")}>
          Forgot Password?
        </Anchor>
        <Button
          fullWidth
          mt="xl"
          size="md"
          onClick={(e: any) => handleSubmit(e)}
        >
          Login
        </Button>
        <Group grow mb="md" mt="md">
          <GoogleButton radius="xl">Google</GoogleButton>
          <TwitterButton radius="xl">Twitter</TwitterButton>
        </Group>
        <Text ta="center" mt="md">
          Don&apos;t have an account?{" "}
          <Anchor<"a"> fw={700} onClick={() => navigate("/register")}>
            Register
          </Anchor>
        </Text>
      </Paper>
    </div>
  );
};
export default Login;