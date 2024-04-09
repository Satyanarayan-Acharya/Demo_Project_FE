// import React, { useState } from "react";
// import { useDispatch } from 'react-redux';
// import { register } from "../../Redux/authSlice/authSlice"; 
// import { useNavigate } from "react-router-dom";

// const Register = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const dispatch = useDispatch<any>();
//   const navigate = useNavigate()

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       dispatch(register({ email, password }));
//     } catch (error) {
//       console.error("Registration error:", error);
//       alert("Registration failed");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Register</h2>
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
//       <button type="submit">Register</button>
//       <p>Already Have Account: <button onClick={()=>navigate("/")}>Login</button></p>
//     </form>
//   );
// };

// export default Register;

import {
  Paper,
  TextInput,
  PasswordInput,
  Button,
  Title,
  Text,
  Anchor,
  Group,
} from '@mantine/core';
import classes from '../../Styles/LoginAuth.module.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {  register } from '../../Redux/authSlice/authSlice';
import { GoogleButton } from '../../Global_Components/GoogleIcon';
import { TwitterButton } from '../../Global_Components/TwitterButton';

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch<any>();
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      dispatch(register({ email, password }));
      navigate("/")
    } catch (error) {
      // console.log(object);
      console.error("Registration error:", error);
    }
  };
  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          REGISTER
        </Title>
        <TextInput label="Email address" placeholder="Your email"
        onChange={(e) => setEmail(e.target.value)}
        size="md" />
        <PasswordInput label="Password" placeholder="Your password" 
        onChange={(e) => setPassword(e.target.value)}
        mt="md" size="md" />
        <Button fullWidth mt="xl" size="md" onClick={(e:any)=>handleSubmit(e)}>
          Register
        </Button>
        <Group grow mb="md" mt="md">
        <GoogleButton radius="xl">Google</GoogleButton>
        <TwitterButton radius="xl">Twitter</TwitterButton>
      </Group>       
        <Text ta="center" mt="md">
          Already have  account?{' '}
          <Anchor<'a'> fw={700} onClick={()=>navigate("/")}>
            Login
          </Anchor>
        </Text>
      </Paper>
    </div>
  );
}
export default Register;