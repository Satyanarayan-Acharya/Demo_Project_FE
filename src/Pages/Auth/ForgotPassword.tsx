// // ForgotPassword.jsx
// import  { useState } from "react";
// import { useDispatch } from 'react-redux';
// import { forgotPassword } from "../../Redux/authSlice/authSlice";

// const ForgotPassword = () => {
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");
//   const dispatch = useDispatch<any>();

//   const handleSubmit = async (e:any) => {
//     e.preventDefault();
//     try {
//       dispatch(forgotPassword({email}));
//       setMessage("Password reset email sent.Please check your email for instructions.");
//     } catch (error) {
//       console.error("Forgot password error:", error);
//       setMessage("Failed to send password reset email.");
//     }
//   };

//   return (
//     <div>
//       <h2>Forgot Password</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           placeholder="Enter your email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <button type="submit">Reset Password</button>
//       </form>
//       <p>{message}</p>
//     </div>
//   );
// };

// export default ForgotPassword;

import {
  Paper,
  Title,
  Text,
  TextInput,
  Button,
  Container,
  Group,
  Anchor,
  Center,
  Box,
  rem,
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import classes from "../../Styles/ForgotPasswordAuth.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../Redux/authSlice/authSlice";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [resetMsg, setResetMsg] = useState(false);
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await dispatch(forgotPassword({ email }));
      console.log(response.status,'response.status');
      if (response.meta.requestStatus === "fulfilled") {
        setResetMsg(true);
      } 
      else {
        console.error("Login error:", response.status);
      }
    } catch (error) {
      console.error("Forgot password error:", error);
    }
  };
  return (
    <Container size={460} my={30}>
      {!resetMsg && (
        <>
          <Title className={classes.title} ta="center">
            Forgot your password?
          </Title>
          <Text c="dimmed" fz="sm" ta="center">
            Enter your email to get a reset link
          </Text>
        </>
      )}

      {resetMsg ? (
        <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
          <Text c="dimmed" fz="sm" ta="center">
            Password reset email sent. Please check your email for instructions.
            <br /><br />
          <Anchor<"a"> fw={400} size="sm" onClick={()=>navigate("/")}>
            Back to the login page
          </Anchor>
          </Text>
        </Paper>
      ) : (
        <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
            
          <TextInput
            label="Your email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Group justify="space-between" mt="lg" className={classes.controls}>
            <Anchor c="dimmed" size="sm" className={classes.control}>
              <Center inline>
                <IconArrowLeft
                  style={{ width: rem(12), height: rem(12) }}
                  stroke={1.5}
                />
                <Box ml={5} onClick={() => navigate("/")}>
                  Back to the login page
                </Box>
              </Center>
            </Anchor>
            <Button className={classes.control} onClick={(e:any)=>handleSubmit(e)}>
              Reset password
            </Button>
          </Group>
        </Paper>
      )}
    </Container>
  );
};

export default ForgotPassword;
