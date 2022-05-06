// Chakra Icons
import { BellIcon, SearchIcon } from "@chakra-ui/icons";
// Chakra Imports
import {
    Box,
    Button,
    Flex,
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
// Assets
import avatar1 from "assets/img/avatars/avatar1.png";
import avatar2 from "assets/img/avatars/avatar2.png";
import avatar3 from "assets/img/avatars/avatar3.png";
// Custom Icons
import { ProfileIcon, SettingsIcon } from "components/Icons/Icons";
// Custom Components
import { ItemContent } from "components/Menu/ItemContent";
import SidebarResponsive from "components/Sidebar/SidebarResponsive";
import PropTypes from "prop-types";
import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import routes from "routes.js";
import axios from "axios";
// import { HomeApi } from "services/auth";
import DatePicker from "react-datepicker";


import "react-datepicker/dist/react-datepicker.css";



const DeleteOrders = () => {

    useEffect(() => {


    }, []);
    const DeleteApi = async () => {
        let token = `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjU4NzExYTQ5ZWM2ODA4NTMwYjU4NTRhYyIsInR5cGUiOiJBRE1JTiIsImlhdCI6MTY0Nzg2NDcyMX0.taYWb3SjPXpPdkGRie8FKYJlCKFRXRpMlKetuWmQSyY`;
        return fetch(`http://192.168.1.108:8003/api/admin/deleteBar
        `, {

            method: 'POST',
            body: JSON.stringify({
                barId: "624a92946583163928a854a6",
                accessToken: token,

            }),
            headers: {
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            }

        })

    };

    const onSubmit = () => {
        // console.log(data, 'data');
        DeleteApi()
            .then(res => res.json())
            .then(async (res) => {
                console.log('Hi');
            })
            .catch((error) => {
                throw (error)
            })
    }

    const [data, setData] = useState([])

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [deleteModalAlert, setDeleteModalAlert] = useState(false);

    const toggleModalVisibility3 = () => {
        setDeleteModalAlert(!deleteModalAlert);
    };

    // function HomeApi() {
    //      let item = { startDate, endDate }
    //      console.warn(item)
    // }
    // const { variant, children, fixed, secondary, onOpen, ...rest } = props;

    // Chakra Color Mode
    let mainTeal = useColorModeValue("teal.300", "teal.300");
    let inputBg = useColorModeValue("white", "gray.800");
    let mainText = useColorModeValue("gray.700", "gray.200");
    let navbarIcon = useColorModeValue("gray.500", "gray.200");
    let searchIcon = useColorModeValue("gray.700", "gray.200");


    // if (secondary) {
    //     navbarIcon = "white";
    //     mainText = "white";
    // }
    const settingsRef = React.useRef();
    return (

        <Flex
            pe={{ sm: "0px", md: "16px" }}
            w={{ sm: "100%", md: "auto" }}
            alignItems="center"
            flexDirection="row"
        >
            {/* <DatePicker
                closeOnScroll={true}
                selected={startDate}
                onChange={(date) => setStartDate(date)}
            /> */}
            <Box>
                {/* <Box> */}
                <Flex>
                    <Box fontSize='21px' color={'black'}>

                        <h1 style={{ marginLeft: '200px' }} > Welcome to Ministry Of Bar Exchange</h1>
                    </Box>

                    {/* <Box>
                        <NavLink to="/auth/signin">
                            <Text display={{ sm: "none", md: "flex" }}>Log out</Text>
                        </NavLink>
                    </Box> */}
                </Flex>
                {/* </Box> */}

                <Box mt='65px' fontSize='20px' border='1px solid #e7eaec' w='157%' padding='10px'>
                    <h1> Delete Orders </h1>

                </Box>
                <Box ml='10px'>
                    <a>
                        <strong> Home </strong>
                    </a>
                </Box>

                <Box mt='42px' fontSize='20px' border='1px solid #e7eaec' w='157%'>
                    <h1 > Delete Orders</h1>
                </Box>

                <Box>
                    <Flex >
                        <Box mt='40px' border='1px solid black'>

                            <DatePicker
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                border='1px solid black'
                                placeholderText="Enter Start Date"
                                selected={startDate === " " ? null : startDate}
                                onChange={(date) => new Date(setStartDate(date))}
                                selectsStart
                                startDate={startDate}
                                endDate={endDate}


                            />


                        </Box>
                        <Box mt='40px' ml='100px' border='1px solid black' borderRadius='base'>
                            <DatePicker
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                placeholderText="Enter End Date"
                                selected={endDate === " " ? null : endDate}
                                onChange={(date) => new Date(setEndDate(date))}
                                selectsEnd
                                startDate={startDate}
                                endDate={endDate}
                                minDate={startDate}
                            />
                        </Box>
                        {/* <Button
                            fontSize='10px'
                            //  type='submit'
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
                            View Orders
                        </Button> */}

                    </Flex>
                    {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
                    <Button
                        fontSize='10px'
                        onClick={DeleteApi, toggleModalVisibility3}
                        //  type='submit'
                        bg='teal.300'
                        w='30%'
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
                        Delete Orders
                    </Button>
                </Box>
                {/* Delete Modal */}
                {console.log(deleteModalAlert)}
                {deleteModalAlert ? (
                    <div
                        class="modal"
                        tabindex="-1"
                        role="dialog"
                        style={{ display: "block" }}
                    >
                        <div
                            className="modal-dialog modal-dialog-centered"
                            role="document"
                        >
                            <div className="modal-content">
                                <div className="modal-header">
                                    <Box ml='35%'>
                                        <h5 className="modal-title" id="exampleModalLongTitle" style={{ fontSize: '31px' }}>
                                            Alert!
                                        </h5>
                                    </Box>

                                </div>
                                <div className="modal-body">
                                    <div className="put">
                                        <Box ml='30%'>
                                            <h5 style={{ fontSize: '20px' }}> Are You Sure ?</h5>
                                        </Box>
                                    </div>
                                </div>

                                <div className="modal-footer">

                                    <button
                                        type="button"
                                        onClick={() => {

                                            // deleteDataClick();
                                            onSubmit(),
                                                toggleModalVisibility3();
                                        }}
                                        className="btn btn-danger"
                                        data-dismiss="modal"
                                    >
                                        Yes,Delete it!
                                    </button>

                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={toggleModalVisibility3}
                                    >
                                        No,Cancel{" "}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}
                {/* End Delete Modal */}
            </Box>
            <InputGroup
                cursor="pointer"
                bg={inputBg}
                borderRadius="15px"
                w={{
                    sm: "128px",
                    md: "200px",
                }}
                me={{ sm: "auto", md: "20px" }}
                _focus={{
                    borderColor: { mainTeal },
                }}
                _active={{
                    borderColor: { mainTeal },
                }}
            >
                {/* <Box>
                    <Input
                        type="text"
                        class="form-control ng-pristine ng-invalid ng-invalid-required ng-touched"
                        datetime-picker="" date-format="yyyy-MM-dd" date-only=""
                        placeholder="Choose Start Date"
                        required="" ng-model="vieworders.startdate" />
                </Box> */}
                <InputLeftElement

                />
                {/* <Input
                    fontSize="xs"
                    py="11px"
                    color={mainText}
                    placeholder="Type here..."
                    borderRadius="inherit"
                /> */}
            </InputGroup>
            {/* <NavLink to="/auth/signin"> */}
            <Button
                ms="0px"
                px="0px"
                me={{ sm: "2px", md: "16px" }}
                color={navbarIcon}
                variant="transparent-with-icon"
            // rightIcon={
            //     document.documentElement.dir ? (
            //         ""
            //     ) : (
            //         <ProfileIcon color={navbarIcon} w="22px" h="22px" me="0px" />
            //     )
            // }
            // leftIcon={
            //     document.documentElement.dir ? (
            //         <ProfileIcon color={navbarIcon} w="22px" h="22px" me="0px" />
            //     ) : (
            //         ""
            //     )
            // }
            >
                {/* <Text display={{ sm: "none", md: "flex" }}>Sign In</Text> */}
            </Button>
            {/* </NavLink> */}
            {/* <Box>
                <h1> welcome to ministry of bar exchange</h1>
            </Box> */}
            <SidebarResponsive

                routes={routes}

            />


            {/* <Input
                fontSize='sm'
                        ms='4px'
                        borderRadius='15px'
                        type='text'
                        placeholder='Your full name'
                        mb='24px'
                        size='lg'
            /> */}
            <Menu>
                {/* <MenuButton>
                    <BellIcon color={navbarIcon} w="18px" h="18px" />
                </MenuButton> */}
                <MenuList p="16px 8px">
                    <Flex flexDirection="column">
                        <MenuItem borderRadius="8px" mb="10px">
                            <ItemContent
                                time="13 minutes ago"
                                info="from Alicia"
                                boldInfo="New Message"
                                aName="Alicia"
                                aSrc={avatar1}
                            />
                        </MenuItem>
                        <MenuItem borderRadius="8px" mb="10px">
                            <ItemContent
                                time="2 days ago"
                                info="by Josh Henry"
                                boldInfo="New Album"
                                aName="Josh Henry"
                                aSrc={avatar2}
                            />
                        </MenuItem>
                        <MenuItem borderRadius="8px">
                            <ItemContent
                                time="3 days ago"
                                info="Payment succesfully completed!"
                                boldInfo=""
                                aName="Kara"
                                aSrc={avatar3}
                            />
                        </MenuItem>
                    </Flex>
                </MenuList>
            </Menu>

            {/* <Box>
                <h1> welcome to ministry of bar exchange</h1>
            </Box> */}
        </Flex >
    );
}

export default DeleteOrders

// HeaderLinks.propTypes = {
//     variant: PropTypes.string,
//     fixed: PropTypes.bool,
//     secondary: PropTypes.bool,
//     onOpen: PropTypes.func,
// };