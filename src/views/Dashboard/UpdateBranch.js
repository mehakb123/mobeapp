import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/toast";
import { Select } from "@chakra-ui/select";
import { GetBranchApi } from "services/auth";
import { GetBarsApi } from "services/auth";
import { DeleteBranchApiData } from "services/auth";
import { useHistory, useLocation } from "react-router-dom";
import { BellIcon, SearchIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
// Assets
import avatar1 from "assets/img/avatars/avatar1.png";
import avatar2 from "assets/img/avatars/avatar2.png";
import avatar3 from "assets/img/avatars/avatar3.png";

import {
    Avatar,
    Badge,
    Text,
    Tr,
    Th,
    Table,
    Thead,
    Tbody,
    Td,
    Img,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
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
    useColorModeValue,
    ChakraProvider,
} from "@chakra-ui/react";
import {
    Previous,
    Paginator,
    PageGroup,
    Page,
    Next,
    generatePages
} from "chakra-paginator";

import {
    Pagination,
    usePagination,
    PaginationPage,
    PaginationNext,
    PaginationPrevious,
    PaginationPageGroup,
    PaginationContainer,
    PaginationSeparator,

} from "@ajna/pagination";
import ReactPaginate from "react-paginate";
import { Switch, FormControl, FormLabel } from '@chakra-ui/react'
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";


const AddBranch = () => {
    const location = useLocation();
    const [managerName, setManagerName] = useState("");
    const [city, setCity] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [branchName, setBranchName] = useState("");
    const [bars, setBars] = useState("");
    const [crashMarket, setCrashMarket] = useState("");
    const [data, setData] = useState([]);
    const [getBar, setGetBar] = useState("");
    const [category, setCategory] = useState([]);
    const [branch, setBranch] = useState([]);
    const [pagesQuantity, setPagesQuantity] = useState();
    const [curPage, setCurPage] = useState(0);
    const [skip, setSkip] = useState(0);
    const [values, setValues] = useState("");
    const [branchId, setBranchId] = useState([]);
    const [isBlocked, setIsBlocked] = useState(false);
    const [crashItem, setCrashItem] = useState("");
    const [enable, setEnable] = useState(false);
    const toast = useToast();
    const history = useHistory();
    const textColor = useColorModeValue("gray.700", "white");

    useEffect(() => {
        setManagerName(location.state.item.managerName)
        setCity(location.state.item.city)
        setPhoneNo(location.state.item.phoneNo)
        setLatitude(location.state.item.branchLocation[0])
        setLongitude(location.state.item.branchLocation[1])
        setBranchName(location.state.item.branchName)
        setBranchId(location.state.item._id)
        GetBranchApi(skip).then((res) => res.json())
            .then((res) => {
                setPagesQuantity(res.data.totalPages)
                setBranch(res.data)
            }
            )
        GetBarsApi().then((res) => res.json())
            .then((res) => {
                console.log(res.data, 'frggtrtg')
                setCategory(res.data)
            }
            )
    }, [pagesQuantity]);

    const handlePageClick = (event) => {
        console.log("event?.selected", event?.selected)
        setPagesQuantity(event?.selected)
        setSkip(event?.selected * 5)
        GetBranchApi(event?.selected).then((res) => res.json())
            .then((res) => {
                setPagesQuantity(res.data.totalPages)
                setBranch(res.data)
            }
            )
    };

    const [visible, setVisible] = useState(false)

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300) {
            setVisible(true)
        }
        else if (scrolled <= 300) {
            setVisible(false)
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'

        });
    };

    window.addEventListener('scroll', toggleVisible);

    const [deleteModalAlert, setDeleteModalAlert] = useState(false);

    const toggleModalVisibility3 = () => {
        setDeleteModalAlert(!deleteModalAlert);
    };

    const BranchApi = async () => {
        let token = localStorage.getItem("user-info")
        let formData = new FormData();
        formData.append("accessToken", token)
        formData.append("managerName", managerName);
        formData.append("city", city);
        formData.append("email", email);
        formData.append("phoneNo", phoneNo);
        formData.append("branchName", branchName);
        formData.append("bars", values);
        formData.append("crashMarket", crashItem);
        formData.append("branchId", branchId);
        formData.append("isBlocked", isBlocked);

        axios.post(`http://192.168.1.108:8003/api/admin/createBranch`, formData)
            .then(function (response) {
                if (response.statusCode === 200) {
                    const result = response.json();
                    console.log({ response })
                    console.log(toast, "toaster")
                } else {
                    toast({

                        title: "Branches Added",
                        status: 'success',
                        isClosable: true,
                    })
                }
                console.log(response);
                console.log(toast)
                GetBranchApi().then((res) => res.json())
                    .then((res) => {
                        setBranch(res.data)
                    }
                    )

            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const UpdateBranchApi = async () => {
        let token = localStorage.getItem("user-info")
        let formData = new FormData();
        formData.append("accessToken", token)
        formData.append("managerName", managerName);
        formData.append("city", city);
        formData.append("phoneNo", phoneNo);
        formData.append("latitude", latitude);
        formData.append("longitude", longitude);
        formData.append("branchName", branchName);
        formData.append("branchId", branchId);
        formData.append("bars", values);
        formData.append("crashMarket", crashItem);

        axios.put(`http://192.168.1.108:8003/api/admin/updateBranch`, formData)
            .then(function (response) {
                if (response.statusCode === 200) {
                    const result = response.json();
                    console.log({ response })
                    console.log(toast, "toaster")
                } else {
                    toast({

                        title: "Branches Added",
                        status: 'success',
                        isClosable: true,
                    })
                }
                console.log(response);
                console.log(toast)
                GetBranchApi().then((res) => res.json())
                    .then((res) => {
                        setBranch(res.data)
                    }
                    )

            })
            .catch(function (error) {
                console.log(error);
            });
    };
    console
    const update = (item) => {
        console.log('Edit btn')
        console.log(item.managerName, item.city, item.branchLocation[0], item.branchLocation[1], item.phoneNo, item.branchName)
        setManagerName(item.managerName)
        setCity(item.city)
        setPhoneNo(item.phoneNo)
        setLatitude(item.branchLocation[0])
        setLongitude(item.branchLocation[1])
        setBranchName(item.branchName)
        setEnable(true)
        setBranchId(item._id)
    }

    const triggerToggle = () => {

        setIsBlocked(!isBlocked)

    }

    return (
        <Flex
            pe={{ sm: "0px", md: "16px" }}
            w={{ sm: "100%", md: "auto" }}
            alignItems="center"
            flexDirection="row"
        >
            <Box>
                <Flex mt="20px" mt="110px">

                    <Box w="64%" ml="2%" >

                        <Select placeholder='Select Branch Name' size='lg' onChange={(e) => setValues(e.target.value)}>
                            {category && category.getBar ?
                                category.getBar.map((item, index) => {

                                    return (<option value={item?._id}>{item?.name}</option>);
                                })


                                : null}
                        </Select>
                    </Box>

                    <Box w="37%">
                        <Select placeholder='Select Crash Market' w="143%" size='lg' ml="80%" onChange={(e) => setCrashItem(e.target.value)}>

                            <option value='true'>True</option>
                            <option value='false'>false</option>
                        </Select>
                    </Box>


                </Flex>

                <Flex>
                    <Box>

                        <Input
                            onChange={(e) => setManagerName(e.target.value)}
                            fontSize='sm'
                            ms='4px'
                            mt='30px'
                            w='145%'
                            borderRadius='15px'
                            type='text'
                            placeholder='Manager Name'
                            mb='24px'
                            size='lg'
                            value={managerName ? managerName : ""}
                        />
                    </Box>

                    <Box ml="53px">
                        <Input
                            onChange={(e) => setCity(e.target.value)}
                            fontSize='sm'
                            ms='4px'
                            mt='30px'
                            w='145%'
                            ml="82%"
                            borderRadius='15px'
                            type='text'
                            placeholder='City'
                            mb='24px'
                            size='lg'
                            value={city ? city : ""}
                        />

                    </Box>
                </Flex>

                <Flex>
                    <Box>

                        <Input
                            onChange={(e) => setEmail(e.target.value)}
                            fontSize='sm'
                            ms='4px'
                            mt='-2px'
                            w='145%'
                            borderRadius='15px'
                            type='text'
                            placeholder='Email'
                            mb='24px'
                            size='lg'
                        />

                    </Box>

                    <Box ml="53px">
                        <Input
                            onChange={(e) => setPhoneNo(e.target.value)}
                            fontSize='sm'
                            ms='4px'
                            mt='-2px'
                            w='145%'
                            ml="82%"
                            borderRadius='15px'
                            type='text'
                            placeholder='Phone no.'
                            mb='24px'
                            size='lg'
                            value={phoneNo ? phoneNo : ""}
                        />

                    </Box>
                </Flex>

                <Flex>
                    <Box>

                        <Input
                            onChange={(e) => setLatitude(e.target.value)}
                            fontSize='sm'
                            ms='4px'
                            mt='3px'
                            w='145%'
                            borderRadius='15px'
                            type='text'
                            placeholder='Latitude'
                            mb='24px'
                            size='lg'
                            value={latitude ? latitude : ""}
                        />
                    </Box>

                    <Box ml="53px">
                        <Input
                            onChange={(e) => setLongitude(e.target.value)}
                            fontSize='sm'
                            ms='4px'
                            mt='2px'
                            w='145%'
                            ml="82%"
                            borderRadius='15px'
                            type='text'
                            placeholder='Longitude'
                            mb='24px'
                            size='lg'
                            value={longitude ? longitude : ""}
                        />
                    </Box>
                </Flex>


                <Box width="100%" mt="-18px">
                    <Flex>

                        <Box w="23%">

                            <Input
                                onChange={(e) => setBranchName(e.target.value)}
                                fontSize='sm'
                                ms='4px'
                                w="279px"
                                mt='30px'
                                borderRadius='15px'
                                type='text'
                                placeholder='Branch Name'
                                mb='24px'
                                size='lg'
                                value={branchName ? branchName : ""}
                            />
                        </Box>

                        <Box mt="14px">
                            <Button
                                fontSize='10px'
                                onClick={(e) => {
                                    UpdateBranchApi()
                                    history.push('/admin/branches')
                                    update(item)
                                }}
                                bg='teal.300'
                                ml="351%"
                                h='45'
                                mt='20px'
                                mb='20px'
                                color='white'

                                _hover={{
                                    bg: "teal.200",
                                }}
                                _active={{
                                    bg: "teal.400",
                                }}>
                                <Text>UPdate Branch</Text>

                            </Button>

                        </Box>

                    </Flex>


                </Box >


            </Box >


        </Flex >


    );
}

export default AddBranch;
