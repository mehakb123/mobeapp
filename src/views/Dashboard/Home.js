// Chakra Icons
import { BellIcon, SearchIcon } from "@chakra-ui/icons";
import { Select } from "@chakra-ui/select";
// Chakra Imports
import {
    Avatar,
    Text,
    Tr,
    Th,
    Table,
    Thead,
    Tbody,
    Td,
    Box,
    Flex,
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    useColorModeValue,
    ChakraProvider,
} from "@chakra-ui/react";
// Assets
import avatar1 from "assets/img/avatars/avatar1.png";
import avatar2 from "assets/img/avatars/avatar2.png";
import avatar3 from "assets/img/avatars/avatar3.png";
// Custom Icons
import { ProfileIcon, SettingsIcon } from "components/Icons/Icons";
// Custom Components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import { ItemContent } from "components/Menu/ItemContent";
import SidebarResponsive from "components/Sidebar/SidebarResponsive";
import PropTypes from "prop-types";
import React, { useMemo, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import routes from "routes.js";
import axios from "axios";
import TablesMixtureRowButton from "./TablesMixtureRowButon";
import { DateRangePicker } from "materialui-daterange-picker";
import { Button } from "@material-ui/core";
import { CalendarToday } from "@material-ui/icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReactPaginate from "react-paginate";
import Tables from "./Tables";
import { RangeDatepicker } from 'chakra-dayzed-datepicker'
import { GetSubCategoryApi1 } from "services/auth";


const Home = () => {
    const textColor = useColorModeValue("gray.700", "white");
    const [name, setName] = useState('')
    const [price, setPrice] = useState();
    const [orders, setOrders] = useState();
    const [firstDay, setFirstDay] = useState();
    const [selectedDates, setSelectedDates] = useState([new Date(), new Date()]);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [values1, setValues1] = useState("");
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [data, setData] = useState([]);
    const baseUrl = 'http://192.168.1.108:8003/api';

    useEffect(() => {
        if (selectedDates?.length === 2) {
            HomeApi()
        }

    }, [selectedDates]);

    const getSubCat = () => {
        GetSubCategoryApi1(values1).then((res) => res.json())
            .then((res) => {
                console.log(res.data, 'frggtrtg')
                setCategory(res.data)

            })
    }

    const addOrders = (name, price) => {
        addMixture(name, price)
            .then(res => res.json())
            .then(async (res) => {
                console.log({ res })
                if (res.statusCode === 200) {
                    // localStorage.setItem("user-info", JSON.stringify(res));

                    // history.push("/dashboard");

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


    const HomeApi = async () => {

        let token = `${localStorage.getItem("user-info")}&startDate=${selectedDates?.[0]}&endDate=${selectedDates?.[1]}&limit=10&skip=0`;
        return fetch(`${baseUrl}/admin/showOrders?accessToken=${token}`, {

            method: 'GET',
            headers: {
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            }

        }

        ).then((res) => res.json())
            .then((res) => {
                console.log('response data --- ', res.data)
                setOrders(res.data.data ?? [])
                setSubCategory(res.data)
            }
            )
    };


    // Chakra Color Mode
    let mainTeal = useColorModeValue("teal.300", "teal.300");
    let inputBg = useColorModeValue("white", "gray.800");
    let mainText = useColorModeValue("gray.700", "gray.200");
    let navbarIcon = useColorModeValue("gray.500", "gray.200");
    let searchIcon = useColorModeValue("gray.700", "gray.200");
    const settingsRef = React.useRef();
    // console.log(orders, "hii")
    console.log(values1, "values1values1values1");
    return (
        <Box>
            <Flex
                pe={{ sm: "0px", md: "16px" }}
                w={{ sm: "100%", md: "auto" }}
                alignItems="center"
                flexDirection="row"
            >
                <Box>
                    <Flex>
                        <Box fontSize='21px' color={'black'}>
                            <h1 style={{ marginLeft: '250px' }} > Welcome to Ministry Of Bar Exchange</h1>
                        </Box>
                    </Flex>
                    <Box mt='12%'>
                        <Box mt='-34px' fontSize='20px' border='1px solid #e7eaec' w='80%' >
                            <h1 > View Orders</h1>
                        </Box>
                    </Box>

                    <Box>
                        <Flex mt='40px'>
                            <Box>
                                <RangeDatepicker
                                    selectedDates={selectedDates}
                                    onDateChange={setSelectedDates}
                                />
                                {console.log(startDate)}
                            </Box>

                            {/* <Box w="16%" ml="55px">
                                <Select placeholder='select' size='lg' onChange={(e) => setValues1(e.target.value)}>
                                    {category && category.data ?
                                        category.getSubCat.map((item, index) => {
                                            return (<option value={item?._id}>{item?.name}</option>);
                                        })
                                        : null}
                                </Select>
                            </Box> */}


                            <Box mt='40px' border='1px solid black' borderRadius='base'>
                            </Box>
                        </Flex>
                        <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
                            <CardHeader p='6px 0px 22px 0px'>
                            </CardHeader>
                            <CardBody>
                                {orders?.length ?
                                    <Table variant='striped' size='md' color={textColor} >
                                        <Thead>
                                            <Tr marginLeft='10px'>
                                                <Th>Category</Th>
                                                <Th>Name</Th>
                                                <Th>Mixture</Th>
                                                <Th>Order Quantity</Th>
                                                <Th>Table No.</Th>
                                                <Th>Status</Th>
                                                <Th>Price</Th>
                                                <Th>Total Amount</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {
                                                orders.map((row) => {
                                                    console.log(row, "rowwwwwwww");
                                                    return (
                                                        <TablesMixtureRowButton
                                                            key={`${row.price}-${row.name}`}
                                                            // name={row.name.charAt(0).toUpperCase() + row.name.slice(1)}
                                                            name={row?.orderDetails[0]?.categoryId?.name}
                                                            email={row?.orderDetails[0]?.subCategoryId?.name}
                                                            domain={row?.mixture[0]?.mixtureId?.name}
                                                            subdomain={row?.orderDetails[0]?.quantity}
                                                            logo={row?.table}
                                                            state={row?.status}
                                                            rate={row?.orderDetails[0]?.price}
                                                            total={row?.totalAmount}

                                                        />
                                                    );
                                                })
                                            }
                                        </Tbody>
                                    </Table>
                                    : null
                                }
                            </CardBody>
                        </Card>
                    </Box>
                    <Box>
                    </Box>
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
                    <InputLeftElement
                    />
                </InputGroup>
                <Button
                    ms="0px"
                    px="0px"
                    me={{ sm: "2px", md: "16px" }}
                    color={navbarIcon}
                    variant="transparent-with-icon"
                >
                </Button>
                <SidebarResponsive
                    routes={routes}
                />
                <Menu>
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
            </Flex >
        </Box>
    );
}


export default Home

