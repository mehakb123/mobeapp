import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { userSchema } from "Validation/Validation";
import { yupResolver } from '@hookform/resolvers/yup';
import { useToast } from "@chakra-ui/toast";
import { llogin } from "services/auth";
import Loading from "react-loading";
import LoadingOverlay from "react-loading-overlay";
import { forgotPasswordApi } from "services/auth";
import { logAdmin } from "services/auth";

// Chakra imports

import {
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Switch,
  Text,
  useColorModeValue,

} from "@chakra-ui/react";
// Assets
import signInImage from "assets/img/signInImage.png";

function SignIn() {
  // Chakra color mode
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loader, setLoader] = useState(false)
  const { register, handleSubmit, formState: { errors }, reset } = useForm({ resolver: yupResolver(userSchema) });

  const titleColor = useColorModeValue("teal.300", "teal.200");
  const textColor = useColorModeValue("gray.400", "white");
  const history = useHistory();
  const toast = useToast();
  const statuses = ['success', 'error', 'warning', 'info']


  const [apiText, setApiText] = useState(true);

  useEffect(() => {
    // if (localStorage.getItem('user-info')) {
    //   history.push('/home')
    // }
    // else{
    // history.push('/signin')
    // }
  }, [])
  if (localStorage.getItem('user-info')) {
    history.push('/home')

  }
  console.log(errors);

  const onSubmit = (email, password) => {
    llogin(email, password)
      .then(res => res.json())
      .then(async (res) => {
        console.log({ res })
        if (res.statusCode === 200) {
          localStorage.setItem("user-info", JSON.stringify(res));
          history.push("/home");
          window?.location?.reload();
        } else {
          toast({

            title: `${res?.message}`,
            status: 'error',
            isClosable: true,

          })

        }
      }).catch((error) => {
        throw (error)
      })
  }

  const onSubmit1 = (email, password) => {
    logAdmin(email, password)
      .then((res) => res.json()).then(async (res) => {
        if (res.statusCode == 200) {
          console.log(res.data.access_token)
          localStorage.setItem("user-info", res.data.access_token);
          console.log(localStorage.getItem(), 'hey')
          history.push("/home");
          setLoader(false)
          window?.location?.reload();



        } else {
          toast({
            title: "invalid username and password",
            status: 'error',
            isClosable: true,
          })

        }
      }).catch((error) => {
        throw (error)
      })

  }


  const buttonChanging = () => {
    apiText === true ? setApiText(false) : setApiText(true)
  }

  const forgotPassword = () => {
    history.push('/forgotpassword')
  }

  const apiHit = () => {
    if (apiText === true) {
      console.log('mehak1')
      onSubmit1(email, password)

    } else {
      onSubmit(email, password)
    }
  }
  return (

    <Box style={{ background: '#253645' }}>

      <Box>
        <form action="" onSubmit={handleSubmit(apiHit)}>
          <Flex position='relative' mt="-20px">
            <Flex
              h={{ sm: "initial", md: "75vh", lg: "97vh" }}
              w='100%'
              maxW='1044px'
              mx='auto'
              justifyContent='space-between'
              mb='30px'
              pt={{ sm: "100px", md: "0px" }}>
              <Flex
                alignItems='center'
                justifyContent='start'
                style={{ userSelect: "none" }}
                w={{ base: "100%", md: "50%", lg: "42%" }}>
                <Flex
                  direction='column'
                  w='100%'
                  background='transparent'
                  p='48px'
                  mt={{ md: "150px", lg: "10%" }}>
                  <Heading color={'white'} fontSize='32px' mb='10px'>
                    Welcome To Ministry Of Bar Exchange
                  </Heading>


                  {apiText ? <Text
                    mb='36px'
                    ms='4px'
                    color={textColor}
                    fontWeight='bold'
                    fontSize='12px'>
                    Login As Admin
                  </Text> :

                    <Text
                      mb='36px'
                      ms='4px'
                      color={textColor}
                      fontWeight='bold'
                      fontSize='12px'>
                      Login As Branch Manager
                    </Text>
                  }

                  <FormControl>
                    <FormLabel ms='4px' color={'white'} fontSize='sm' fontWeight='normal'>
                      Email
                    </FormLabel>
                    <Input
                      style={{ background: 'white' }}

                      {...register("email", { required: true, pattern: /^(([^<>()\[\]\\.,;: \s @"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+")) @((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })}
                      onChange={(e) => setEmail(e.target.value)}
                      name='email'
                      borderRadius='15px'
                      mb='24px'
                      fontSize='sm'
                      type='text'
                      isInvalid={errors.email}
                      errorBorderColor='crimson'
                      placeholder='Your email adress'
                      size='lg'
                    />
                    {errors.email && <Text color='red' mb='25px'>Please check the Email</Text>}

                    <FormLabel ms='4px' color={'white'} fontSize='sm' fontWeight='normal'>
                      Password
                    </FormLabel>
                    <Input
                      style={{ background: 'white' }}
                      {...register("password", { required: true, minLength: 6, maxLength: 10 })}
                      onChange={(e) => setPassword(e.target.value)}
                      name='password'
                      borderRadius='15px'
                      mb='36px'
                      fontSize='sm'
                      type='password'
                      isInvalid={errors.password}
                      errorBorderColor='crimson'
                      placeholder='Your password'
                      size='lg'
                    />
                    {errors.password && <Text color='red' mb='25px'>Please check the password</Text>}

                    <Button
                      fontSize='13px'
                      type='submit'
                      bg='teal.300'
                      w='100%'
                      h='45'
                      mb='20px'
                      color='white'
                      mt='20px'
                      _hover={{
                        bg: "teal.200",
                      }}
                      _active={{
                        bg: "teal.400",
                      }}>
                      {apiText ? <Text>Login as Admin</Text> : <Text>Login as Branch Manager</Text>}
                      {/* login as branch Manager */}
                    </Button>



                  </FormControl>
                  <Flex
                    flexDirection='row'
                    justifyContent='center'
                    alignItems='center'
                    maxW='100%'
                    mt='0px'>
                    <button onClick={() => forgotPassword()}>

                      <Button
                        fontSize='10px'
                        bg='teal.300'
                        w='100%'
                        h='45'
                        mb='20px'
                        color='white'
                        mt='20px'
                        _hover={{
                          bg: "teal.200",
                        }}
                        _active={{
                          bg: "teal.400",
                        }}>
                        Forgot Password
                        {/* //login as admin */}
                      </Button>
                    </button>

                    {/* {loader ? <Loading /> : null} */}
                    {/* {console.log(loader ? <LoadingOverlay active={Loader}
                      spinner
                      text='Loading your content...'
                    > </LoadingOverlay> : null)} */}
                    {/* <LoadingOverlay
                      active={loader}
                      spinner
                      text='Loading your content...'
                    > */}

                    {/* </LoadingOverlay> */}

                    <Button
                      fontSize='10px'
                      onClick={() => buttonChanging()}
                      bg='teal.300'
                      w='40%'
                      ml='10px'
                      h='45'
                      mb='20px'
                      color='white'
                      mt='20px'
                      _hover={{
                        bg: "teal.200",
                      }}
                      _active={{
                        bg: "teal.400",
                      }}>

                      {apiText ? <Text>Login as Branch Manager</Text> : <Text>
                        Login as Admin</Text>}
                      {/* //login as admin */}
                    </Button>
                    {/* </Text> */}
                    {/* {loader ? <Loading /> : null} */}
                  </Flex>
                  <Box ml='40%'>
                    {/* {loader ? <Loading color='pink' /> : null} */}
                  </Box>
                </Flex>

              </Flex>

              <Box
                display={{ base: "none", md: "block" }}
                overflowX='hidden'
                h='100%'
                w='40vw'
                position='absolute'
                right='0px'>
                <Box
                  bgImage="http://mobe.keymouseit.com/mobebarstock/img/ic_mobe.png"
                  w='40%'
                  h='67%'
                  mt='111px'
                  bgSize='cover'
                  bgPosition='50%'
                  position='absolute'
                  borderBottomLeftRadius='20px'></Box>
              </Box>

            </Flex>
          </Flex>
        </form >

      </Box>
    </Box >

  );
}

export default SignIn;