// Chakra Icons
import { BellIcon, SearchIcon } from "@chakra-ui/icons";
// Chakra Imports
import {
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
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import routes from "routes.js";
import axios from "axios";
import { GetstocksApi } from "services/auth";


const StocksItem = () => {
    useEffect(() => {
        // GetstocksApi();

    }, []);
    const [data, setData] = useState([])
    // const { variant, children, fixed, secondary, onOpen, ...rest } = props;

    // Chakra Color Mode
    let mainTeal = useColorModeValue("teal.300", "teal.300");
    let inputBg = useColorModeValue("white", "gray.800");
    let mainText = useColorModeValue("gray.700", "gray.200");
    let navbarIcon = useColorModeValue("gray.500", "gray.200");
    let searchIcon = useColorModeValue("gray.700", "gray.200");

    //createBar API 
    // const GetdataClick12 = () => {
    //     console.log("Clicked");
    //     axios.post("http://192.168.1.108:8003/api/admin/createBar").then((response) => {
    //         setData(response.data);
    //     });
    // };

    //getBar API
    // const GetdataClicks = () => {
    //     console.log("Clickssssssss");
    //     axios.get("http://192.168.1.108:8003/api/admin/getBars?accessToken=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjU4NzExYTQ5ZWM2ODA4NTMwYjU4NTRhYyIsInR5cGUiOiJBRE1JTiIsImlhdCI6MTY0OTMzMTA4MX0.TPEIvvsmG9R_cSc3wsDqvxDA_CaGU-Iwp8zv_l75ip4").then((response) => {
    //         setData(response.data);
    //     });
    // };

    //deleteBar API
    // const GetdataClick = () => {
    //     console.log("hghfhgdjdjgvh");
    //     axios.post("http://192.168.1.108:8003/api/admin/deleteBar${barId}").then((response) => {
    //         setData(response.data);
    //     });
    // };


    // const deleteData = async () => {
    //     let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjU4NzExYTQ5ZWM2ODA4NTMwYjU4NTRhYyIsInR5cGUiOiJBRE1JTiIsImlhdCI6MTY0OTMzMTA4MX0.TPEIvvsmG9R_cSc3wsDqvxDA_CaGU-Iwp8zv_l75ip4';
    //     return fetch(`http://192.168.1.108:8003/api/admin/deleteBar?accessToken=${token}`, {
    //         method: 'POST',
    //         headers: {
    //             "Content-Type": 'application/json',
    //             "Accept": 'application/json'
    //         }

    //     })


    // };



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
                <InputLeftElement
                // children={
                //     <IconButton
                //         bg="inherit"
                //         borderRadius="inherit"
                //         _hover="none"
                //         _active={{
                //             bg: "inherit",
                //             transform: "none",
                //             borderColor: "transparent",
                //         }}
                //         _focus={{
                //             boxShadow: "none",
                //         }}
                //         icon={<SearchIcon color={searchIcon} w="15px" h="15px" />}
                //     ></IconButton>
                // }
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
            {/* <Button
                    ms="0px"
                    px="0px"
                    me={{ sm: "2px", md: "16px" }}
                    color={navbarIcon}
                    variant="transparent-with-icon"
                    rightIcon={
                        document.documentElement.dir ? (
                            ""
                        ) : (
                            <ProfileIcon color={navbarIcon} w="22px" h="22px" me="0px" />
                        )
                    }
                    leftIcon={
                        document.documentElement.dir ? (
                            <ProfileIcon color={navbarIcon} w="22px" h="22px" me="0px" />
                        ) : (
                            ""
                        )
                    }
                >
                    <Text display={{ sm: "none", md: "flex" }}>Sign In</Text>
                </Button> */}
            {/* </NavLink> */}
            <SidebarResponsive
                // logoText={props.logoText}
                // secondary={props.secondary}
                routes={routes}
            // logo={logo}
            // {...rest}
            />
            {/* <SettingsIcon
                cursor="pointer"
                ms={{ base: "16px", xl: "0px" }}
                me="16px"
                ref={settingsRef}
                // onClick={props.onOpen}
                color={navbarIcon}
                w="18px"
                h="18px"
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
        </Flex>
    );
}

export default StocksItem

// HeaderLinks.propTypes = {
//     variant: PropTypes.string,
//     fixed: PropTypes.bool,
//     secondary: PropTypes.bool,
//     onOpen: PropTypes.func,
// };