import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { resetPassword } from "../../Redux/authSlice/authSlice";
import { Container, Paper, Title } from "@mantine/core";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const location = useLocation();
  const dispatch = useDispatch<any>();

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      const searchParams = new URLSearchParams(location.search);
      const token = searchParams.get("token");
      const email = searchParams.get("email")?.toString();

      if (password !== confirmPassword) {
        setMessage("Passwords do not match");
        return;
      }

      dispatch(resetPassword({ email, password ,token }));

      setMessage("Password reset successful. You can now login with your new password.");
      setPassword("")
      setConfirmPassword("")
    } catch (error) {
      console.error("Reset password error:", error);
      setMessage("Password reset failed. Please try again.");
    }
  };

  return (
    <Container size={460} my={30}>
      <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
       <Title ta="center">
       Reset Password
       </Title>
       <br />
      <form onSubmit={handleSubmit}>
        New Password: <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
          <br /><br />
        Confirm Password: <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <br /><br />
        <button type="submit">Reset Password</button>
      </form>
          </Paper>
      <p>{message}</p>
    </Container>
  );
};

export default ResetPassword;
