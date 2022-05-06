// Chakra Icons
import { BellIcon, SearchIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Select } from "@chakra-ui/select";
// Chakra Imports
import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from "@chakra-ui/react"

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
    Image,
} from "@chakra-ui/react";
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
import { Switch } from '@chakra-ui/react'
import { FormControl, FormLabel } from '@chakra-ui/react'
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
import { GetSubCategoryApi } from "services/auth";
import { GetCategoryApi } from "services/auth";
import { GetSubCategoryApi1 } from "services/auth";
import { SubCategoriesApiData } from "services/auth";
import { DeleteSubCategoryApiData } from "services/auth";
import { updateSubCategoriesApiData } from "services/auth";
import ReactPaginate from "react-paginate";
import DatePicker from "react-datepicker";
import Tables from "./Tables";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import { useToast } from "@chakra-ui/toast";
import { useHistory, useLocation } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import '../Dashboard/dashboard.css'
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,

    Route,
    Link
} from "react-router-dom";
const statuses = ['success', 'error', 'warning', 'info'];

const AddSubCategories = () => {
    const location = useLocation();
    const [name, setName] = useState("");
    const [subCategory, setSubCategory] = useState([]);
    const [subCategorieId, setSubCategorieId] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const [category, setCategory] = useState([]);
    const [data, setData] = useState([]);
    const [pagesQuantity, setPagesQuantity] = useState();
    const [curPage, setCurPage] = useState(0);
    const [skip, setSkip] = useState(0);
    const [isBlocked, setIsBlocked] = useState(false);
    const [enable, setEnable] = useState(false);
    const toast = useToast();
    const history = useHistory();


    const textColor = useColorModeValue("gray.700", "white");
    useEffect(() => {
        setName(location.state.item.name)
        setSubCategorieId(location.state.item._id)
        GetSubCategoryApi(skip).then((res) => res.json())
            .then((res) => {
                console.log(res.data, 'frggtrtg')
                setPagesQuantity(res.data.totalPages)
                setSubCategory(res.data)

            })
        GetCategoryApi().then((res) => res.json())
            .then((res) => {
                setCategory(res.data)
            }
            )


    }, [pagesQuantity]);


    const handlePageChange = (page) => {
        setCurPage(page);
    };
    const handlePageClick = (event) => {
        console.log("event?.selected", event?.selected)
        setPagesQuantity(event?.selected)
        setSkip(event?.selected * 4)
        GetSubCategoryApi(event?.selected).then((res) => res.json())
            .then((res) => {
                console.log(res.data, 'frggtrtg')
                setPagesQuantity(res.data.totalPages)
                setSubCategory(res.data)

            })
    };

    const update = (item) => {
        console.log('Edit btn')
        console.log(item.name)
        setName(item.name)
        setEnable(true)
        setSubCategorieId(item._id)
    }

    const UpdateSubCategorieApi = async (id) => {
        console.log('Add btn')
        updateSubCategoriesApiData(name, values, subCategorieId, isBlocked).then(function (response) {
            if (response.data.statusCode === 200) {
                toast({
                    title: "SubCategory Updated",
                    status: 'success',
                    isClosable: true,
                })
                GetSubCategoryApi().then((res) => res.json())
                    .then((res) => {
                        setSubCategory(res.data)
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

    const getSubCat = () => {
        GetSubCategoryApi1(values1).then((res) => res.json())
            .then((res) => {
                console.log(res.data, 'frggtrtg')
                setSubCategory(res.data)

            })
    }


    const [values, setValues] = useState("");
    const [values1, setValues1] = useState("");

    const SubCategoriesApi = async () => {
        SubCategoriesApiData(name, values).then(function (response) {
            if (response.data.statusCode === 200) {
                toast({

                    title: "SubCategory Added Successfully",
                    status: 'success',
                    isClosable: true,
                })
                GetSubCategoryApi().then((res) => res.json())
                    .then((res) => {
                        setSubCategory(res.data)

                    })

            }
            console.log(response);
            console.log(toast)

        })
            .catch(function (error) {
                console.log(error);
            });
    };



    console.log(values1, "values1values1values1");
    const [file, setFile] = React.useState("");
    const settingsRef = React.useRef();

    const onChange = (event) => {
        console.log("onChange called", event.target.value);
        setValue(event.target.value);
    };
    function handleUpload(event) {
        SUbCategoriesApi
        setFile(event.target.files[0]);
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

            <Box overflow="hidden" w="100%" >
                <Box width="180%" mt="80px">
                    <Flex alignItems="baseline">
                        <Box>
                            <Select placeholder='Select option' size='lg' onChange={(e) => setValues(e.target.value)}>
                                {category && category.data ?
                                    category.data.map((item, index) => {
                                        return (<option value={item?._id}>{item?.name}</option>);
                                    })
                                    : null}
                            </Select>
                        </Box>
                        <Box>
                            <Input
                                onChange={(e) => setName(e.target.value)}
                                fontSize='sm'
                                ms='4px'
                                mt='30px'
                                ml='40px'
                                w='100%'
                                borderRadius='15px'
                                type='text'
                                placeholder='Sub Category Name'
                                mb='24px'
                                size='lg'
                                value={name ? name : ""}
                            />
                        </Box>
                        <Box mt="30px">
                            <Button

                                onClick={(e) => {
                                    UpdateSubCategorieApi()
                                    history.push('/admin/subcategories')
                                    update(item)
                                }}
                                bg='teal.300'
                                w='100%'
                                h='45'
                                ml='51px'
                                mt='20px'
                                mb='20px'
                                color='white'
                                _hover={{
                                    bg: "teal.200",
                                }}
                                _active={{
                                    bg: "teal.400",
                                }}>
                                <Text>Update SubCategory</Text>
                            </Button>
                        </Box>
                    </Flex>
                    <Flex>
                        <Box w="16%">
                            <Select placeholder='Whiskey' size='lg' onChange={(e) => setValues1(e.target.value)}>
                                {category && category.data ?
                                    category.data.map((item, index) => {
                                        return (<option value={item?._id}>{item?.name}</option>);
                                    })
                                    : null}
                            </Select>
                        </Box>
                        <Box>
                            <Button

                                onClick={(e) => {
                                    getSubCat()
                                    history.push('/admin/subcategories')
                                }}
                                bg='teal.300'
                                w='100%'
                                h='45'
                                ml='51px'
                                mt='20px'
                                mb='20px'
                                color='white'
                                _hover={{
                                    bg: "teal.200",
                                }}
                                _active={{
                                    bg: "teal.400",
                                }}>
                                Add Data
                            </Button>
                        </Box>
                    </Flex>
                </Box>
            </Box>
        </Flex>
    );
}
export default AddSubCategories