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
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {  register } from '../../Redux/authSlice/authSlice';
import { GoogleButton } from '../../Global_Components/GoogleIcon';
import GoogleLogin from 'react-google-login';
import { gapi } from 'gapi-script';

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch<any>();
  const navigate = useNavigate()

  useEffect(()=>{
    gapi.load("client:auth2",()=>{
      gapi.auth2.init({clientId:"413627927433-em8p7fsp32soar8bgf05f6kcl3n3jbnp.apps.googleusercontent.com"})
    })
  },[])

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
  const handleSuccess = async (response:any) => {
    console.log('Google Login Success:', response.profileObj);
    const user = response.profileObj
    await localStorage.setItem("token_dummy",JSON.stringify(user.googleId))
    navigate("/navbar")
 };
 const handleFailure = (response:any) => {
    console.error('Google Login Failed:', response);
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
        <GoogleButton radius="xl">
        <GoogleLogin
              clientId="413627927433-em8p7fsp32soar8bgf05f6kcl3n3jbnp.apps.googleusercontent.com"
              buttonText="Google"
              onSuccess={handleSuccess}
              onFailure={handleFailure}
              cookiePolicy={"single_host_origin"}
            />
          </GoogleButton>
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