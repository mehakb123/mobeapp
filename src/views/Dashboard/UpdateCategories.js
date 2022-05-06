import { BellIcon, SearchIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
// Chakra Imports
import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from "@chakra-ui/react"
import { useDisclosure } from '@chakra-ui/react'

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
import React, { useMemo, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import routes from "routes.js";
import axios from "axios";
import { ReactDOM } from "react-dom";
import DatePicker from "react-datepicker";
import Tables from "./Tables";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import { useToast } from "@chakra-ui/toast";
import "react-datepicker/dist/react-datepicker.css";
import FontAwesome from "react-fontawesome";
import { FaBeer } from 'react-icons/fa';
import { useHistory, useLocation } from "react-router-dom";
import { GetCategoryApi, CategoriesApiData, DeleteCategoryApiData } from "services/auth";
import { UpdateCategoriesApiData } from "services/auth";
import { GetCategoryApi1 } from "services/auth";
import '../Dashboard/dashboard.css'
import { GetSubCategoryApi } from "services/auth";
import createCategories from "views/Dashboard/CreateCategories"

const UpdateCategories = () => {
    const location = useLocation();
    console.log(location.state, "ppp")
    useEffect(() => {
        setName(location.state.item.name)
        setPriority(location.state.item.priority)
        setProfilePic(location.state.item.profilePic)
        setCatId(location.state.item._id)
        GetCategoryApi(skip).then((res) => res.json())
            .then((res) => {
                setPagesQuantity(res.data.totalPages)
                setCategory(res.data.data);

            })
    }, [pagesQuantity])
    const [file, setFile] = React.useState("");
    const [name, setName] = useState("");
    const [priority, setPriority] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const [CategorieId, setCategorieId] = useState("");
    const [noOfRows, setNoOfRows] = useState(0);
    const [category, setCategory] = useState([]);
    const [catId, setCatId] = useState([]);
    const [isBlocked, setIsBlocked] = useState(false);
    const toast = useToast();
    const history = useHistory();
    const statuses = ['success', 'error', 'warning', 'info'];
    const [sidebarVariant, setSidebarVariant] = useState("transparent");
    const [pagesQuantity, setPagesQuantity] = useState();
    const [curPage, setCurPage] = useState(0);
    const [enable, setEnable] = useState(false);
    const [skip, setSkip] = useState(0);
    const [data, setData] = useState([]);
    const [value, setValue] = useState("");



    const update = (item) => {
        console.log(item.name, item.priority, item.profilePic)
        setName(item.name)
        setPriority(item.priority)
        setProfilePic(item.profilePic)
        setCatId(item._id)
    }

    const UpdateCategoriesApi = async (id) => {
        console.log('Add btn')
        UpdateCategoriesApiData(name, priority, catId, isBlocked).then(function (response) {
            if (response.data.statusCode === 200) {
                toast({
                    title: "Categories Updated",
                    status: 'success',
                    isClosable: true,
                })
                GetCategoryApi().then((res) => res.json())
                    .then((res) => {
                        setCategory(res.data.data)
                    }
                    )
            }
            console.log(response);
            console.log(toast)

        })
            .catch(function (error) {
                console.log(error);
            });
    };

    const textColor = useColorModeValue("gray.700", "white");
    const handlePageChange = (page) => {
        setCurPage(page);
    };
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [deleteModalAlert, setDeleteModalAlert] = useState(false);
    const toggleModalVisibility3 = () => {
        setDeleteModalAlert(!deleteModalAlert);
    };
    const CategoriesApi = async () => {
        CategoriesApiData(name, priority).then(function (response) {
            if (response.data.statusCode === 200) {
                toast({
                    title: "Category Added",
                    status: 'success',
                    isClosable: true,
                })
                GetCategoryApi().then((res) => res.json())
                    .then((res) => {
                        setCategory(res.data.data)
                    }
                    )
            }
            console.log(response);
            console.log(toast)
        })
            .catch(function (error) {
                console.log(error);
            });
    };


    // Chakra Color Mode
    let mainTeal = useColorModeValue("teal.300", "teal.300");
    let inputBg = useColorModeValue("white", "gray.800");
    let mainText = useColorModeValue("gray.700", "gray.200");
    let navbarIcon = useColorModeValue("gray.500", "gray.200");
    let searchIcon = useColorModeValue("gray.700", "gray.200");
    const settingsRef = React.useRef();
    const onChange = (event) => {
        console.log("onChange called", event.target.value);
        setValue(event.target.value);
    };
    function handleUpload(event) {
        CategoriesApi
        setFile(event.target.files[0]);
    }
    const handlePageClick = (event) => {
        console.log("event?.selected", event?.selected)
        setPagesQuantity(event?.selected)
        setSkip(event?.selected * 10)
        GetCategoryApi(event?.selected).then((res) => res.json())
            .then((res) => {
                setPagesQuantity(res.data.totalPages)
                setCategory(res.data.data);

            })
    };

    const triggerToggle = () => {
        UpdateCategoriesApi()
        setIsBlocked(!isBlocked)

    }

    return (
        <Flex
            pe={{ sm: "0px", md: "16px" }}
            w={{ sm: "100%", md: "auto" }}
            alignItems="center"
            flexDirection="row"
        >
            <Box ml="-15px">
                <Flex ml="-12px">
                    <Box>
                        <Input
                            onChange={(e) => setName(e.target.value)}
                            fontSize='sm'
                            ms='4px'
                            mt='132px'
                            w='100%'
                            ml="22px"
                            borderRadius='15px'
                            type='text'
                            placeholder='Category Name'
                            mb='24px'
                            size='lg'
                            value={name ? name : ""}
                        />

                    </Box>
                    <Box>
                        <Input
                            type="file" onChange={handleUpload}
                            ml='137px'
                            mt='137px'
                            w='85%'
                        />
                        {file && <ImageThumb image={file}
                        />}
                    </Box>
                </Flex>

                <Flex>
                    <Box>
                        <NumberInput
                            onChange={(value) => {
                                console.log("this is the target value --->", value)
                                setPriority(value)
                            }}
                            defaultValue={15}
                            max={10}
                            keepWithinRange={false}
                            clampValueOnBlur={false}
                            mt='0px'
                            ml='20px'
                            value={priority ? priority : ""}
                        >
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </Box>
                    <Box>

                        <Button
                            fontSize='10px'
                            onClick={(e) => {
                                UpdateCategoriesApi()
                                history.push('/admin/categories')
                                update(item)

                            }}
                            bg='teal.300'
                            w='100%'
                            h='45'
                            ml='120px'
                            mb='20px'
                            color='white'

                            _hover={{
                                bg: "teal.200",
                            }}
                            _active={{
                                bg: "teal.400",
                            }}>
                            <Text>Edit Category</Text>
                        </Button>
                    </Box>
                </Flex>
            </Box>
        </Flex>
    );
}
export default UpdateCategories