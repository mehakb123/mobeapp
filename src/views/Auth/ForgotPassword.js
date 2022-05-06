import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { forgotPasswordSchema } from "Validation/Validation";
import { yupResolver } from '@hookform/resolvers/yup';
import { useToast } from '@chakra-ui/react'
import { forgotPasswordApi } from "services/auth";
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

function ForgotPassword() {
    // Chakra color mode
    const [email, setEmail] = useState('');
    // const [password,setPassword] = useState('');
    const { register, handleSubmit, formState: { errors }, reset } = useForm({ resolver: yupResolver(forgotPasswordSchema) });
    const titleColor = useColorModeValue("teal.300", "teal.200");
    const textColor = useColorModeValue("gray.400", "white");
    const history = useHistory();

    const toast = useToast()

    // function forgotPasswordApi () {
    //   fetch(`http://192.168.1.108:8003/api/BranchManager/forgetPassword?email=${email}`, {
    //     method: 'GET',
    //     // headers: {
    //     //   "Content-Type": 'application/json',
    //     //   "Accept": 'application/json'
    //     // },

    //   }).then(async (res)=>{
    //     if(res.ok){

    //       history.push('/changepassword')

    //     }
    // }
    // ).catch((error) => {
    //   throw(error)
    // })    
    // }



    const onSubmit = (data) => {
        console.log(data, 'data');
        forgotPasswordApi(data)
            .then(res => res.json())
            .then(async (res) => {
                console.log({ res })
                if (res.statusCode === 200) {
                    localStorage.setItem("user-info", JSON.stringify(res));
                    // history.push("/dashboard");
                    // console.log("Hiiii")
                    //history.push('/changepassword')
                    // console.log('biiii');

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
        console.log(data)
    }

    // console.log(email+'Hello Ji')


    return (

        <Flex position='relative' mb='40px'>
            <Flex
                h={{ sm: "initial", md: "75vh", lg: "85vh" }}
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
                        mt={{ md: "150px", lg: "80px" }}>
                        <Heading color={titleColor} fontSize='32px' mb='10px'>
                            Welcome Back
                        </Heading>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Text
                                mb='36px'
                                ms='4px'
                                color={textColor}
                                fontWeight='bold'
                                fontSize='14px'>
                                Enter your email
                            </Text>
                            <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
                                Email
                            </FormLabel>
                            <Input style={{ border: '2px solid transparent', background: '#E8F0FE' }}

                                // value={email}
                                {...register("email", { required: true, pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })}
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
                            // required
                            />
                            <Text style={{ color: 'red' }}>{errors.email?.message}</Text>


                            <Button
                                fontSize='10px'
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
                                }}
                            >
                                Forgot Password
                            </Button>
                        </form>

                        <Flex
                            flexDirection='column'
                            justifyContent='center'
                            alignItems='center'
                            maxW='100%'
                            mt='0px'>
                            {/* <Text color={textColor} fontWeight='medium'>
                                Don't have an account?
                                <Link color={titleColor} as='span' ms='5px' fontWeight='bold'>
                                    Sign Up
                                </Link>

                            </Text> */}
                        </Flex>
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
                        bgImage={signInImage}
                        w='100%'
                        h='100%'
                        bgSize='cover'
                        bgPosition='50%'
                        position='absolute'
                        borderBottomLeftRadius='20px'></Box>
                </Box>
            </Flex>
        </Flex>

    );
}

export default ForgotPassword;
