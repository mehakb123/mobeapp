// Chakra Icons
import { BellIcon, SearchIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
// Chakra Imports
import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Image,
} from "@chakra-ui/react"
import { useDisclosure, Portal } from '@chakra-ui/react'

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
    Spacer,
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

import { Switch, FormControl, FormLabel } from '@chakra-ui/react'
import { CgChevronLeft, CgChevronRight } from "react-icons/cg";
// Assets
import avatar1 from "assets/img/avatars/avatar1.png";
import avatar2 from "assets/img/avatars/avatar2.png";
import avatar3 from "assets/img/avatars/avatar3.png";
// Custom Icons
import { ProfileIcon, SettingsIcon } from "components/Icons/Icons";
// Custom Components
import React, { useMemo, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { ReactDOM } from "react-dom";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import { useToast } from "@chakra-ui/toast";
import ReactPaginate from "react-paginate";
import "react-datepicker/dist/react-datepicker.css";
import FontAwesome from "react-fontawesome";
import { FaBeer } from 'react-icons/fa';
import { useHistory } from "react-router-dom";
import { GetCategoryApi, CategoriesApiData, DeleteCategoryApiData } from "services/auth";
import { UpdateCategoriesApiData } from "services/auth";
import { Redirect, Route } from "react-router-dom";
import routes from "routes.js";
import { GetCategoryApi1 } from "services/auth";
import '../Dashboard/dashboard.css'
import { GetSubCategoryApi } from "services/auth";
import AddCategories from "views/Dashboard/AddCategories";
import updateCategories from "views/Dashboard/UpdateCategories";
var FA = require('react-fontawesome')



const CreateCategories = (props) => {

    const [name, setName] = useState("");
    const [priority, setPriority] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const [CategorieId, setCategorieId] = useState("");
    const [noOfRows, setNoOfRows] = useState(0);
    const [category, setCategory] = useState([]);
    const [catId, setCatId] = useState([]);
    const [isBlocked, setIsBlocked] = useState(false);
    const toast = useToast();
    const statuses = ['success', 'error', 'warning', 'info'];
    const [sidebarVariant, setSidebarVariant] = useState("transparent");
    const history = useHistory()
    const [pagesQuantity, setPagesQuantity] = useState();
    const [curPage, setCurPage] = useState(0);
    const [enable, setEnable] = useState(false);
    const [skip, setSkip] = useState(0);

    useEffect(() => {
        console.log("pages changes --- ", pagesQuantity)
        GetCategoryApi(skip).then((res) => res.json())
            .then((res) => {
                setPagesQuantity(res.data.totalPages)
                setCategory(res.data.data);

            })
    }, [pagesQuantity])


    const {
        pages,
        pagesCount,
        offset,
        currentPage,
        setCurrentPage,
        setIsDisabled,
        isDisabled,
        pageSize,
        setPageSize
    } = usePagination({
        initialState: {
            pageSize: 5,
            isDisabled: false,
            currentPage: 1
        }
    });
    const update = (item) => {
        console.log(item.name, item.priority, item.profilePic)
        setName(item.name)
        setPriority(item.priority)
        setProfilePic(item.profilePic)
        setEnable(true)
        setCatId(item._id)
    }

    const UpdateCategoriesApi = async (id) => {
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
    const [del, setDel] = useState("")
    const onSubmit = () => {
        setDeleteModalAlert(false)
        DeleteCategoryApi(del)
            .then(res => res.json())
            .then(async (res) => {
            })
            .catch((error) => {
                throw (error)
            })
    }
    const DeleteCategoryApi = async (id) => {
        console.log(DeleteCategoryApi, "ddddddd")
        DeleteCategoryApiData(id).then(function (response) {
            if (response.data.statusCode === 200) {
                setDeleteModalAlert(false)
                toast({
                    title: data.message,
                    status: 'success',
                    isClosable: true,
                })
            }
            setData(response.data);
            GetCategoryApi().then((res) => res.json())
                .then((res) => {
                    setCategory(res.data.data)
                }
                )
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

    const [data, setData] = useState([]);
    const [value, setValue] = useState("");
    const [file, setFile] = React.useState("");
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

    // const triggerToggle = () => {
    //     UpdateCategoriesApi()
    //     setIsBlocked(!isBlocked)

    // }
    return (
        <Flex
            pe={{ sm: "0px", md: "16px" }}
            w={{ sm: "100%", md: "auto" }}
            alignItems="center"
            flexDirection="row"
        >
            <Box overflow="hidden">
                <Flex>
                    <Box fontSize='21px' color={'black'} mb="10px">

                        <h1 style={{ marginLeft: '250px' }}> Welcome to Ministry Of Bar Exchange</h1>
                    </Box>
                </Flex>
                <Box mt='10%' fontSize='20px' border='1px solid #e7eaec' w='140%' padding='2px'>
                    <h1> CREATE CATEGORY </h1>
                </Box>
                <Box width="150%">
                    <Flex gap="8%">

                        <Button
                            onClick={() => {

                                history.push('/admin/addcategories')
                            }}
                            bg='teal.300'
                            w='13%'
                            h='45'
                            ml='11px'
                            mt="20px"
                            mb='20px'
                            color='white'
                            _hover={{
                                bg: "teal.200",
                            }}
                            _active={{
                                bg: "teal.400",
                            }}>
                            Add New Category
                        </Button>

                    </Flex>


                    <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
                        <CardHeader p='6px 0px 22px 0px'>
                        </CardHeader>
                        <CardBody w="70%">
                            <Table variant='style' borderBottomStyle="solid" size='lg' color={textColor} style={{ tableLayout: "fixed" }}>
                                <Thead>
                                    <Tr>
                                        <Th>Name</Th>
                                        <Th>Priority</Th>
                                        <Th>Profile Pic</Th>
                                        <Th>Status</Th>
                                        <Th>Actions</Th>
                                    </Tr>
                                </Thead>
                                {category && category ?
                                    <Tbody>
                                        {category.map((item, index) => {
                                            return (
                                                <Tr>

                                                    <Td>{item?.name}</Td>
                                                    <Td>{item?.priority}</Td>

                                                    <Flex ml="120%" mt="5px">

                                                        <Flex>
                                                            <Td ml="-33px">
                                                                <FormControl display='flex' alignItems='center'>
                                                                    <Switch id='email-alerts' isChecked={item.isBlocked} onChange={() => UpdateCategoriesApi()} colorScheme='teal' />
                                                                </FormControl>
                                                            </Td>
                                                        </Flex>
                                                        <Flex ml="92px" gap="14px">
                                                            <Flex alignItems="center" ml="30px">
                                                                <Box mt="-30%" border="1px solid black" backgroundColor="#4fd1c5" borderRadius="4px" padding="6px"
                                                                    onClick={() => {
                                                                        update(item)

                                                                        scrollToTop()
                                                                        history.push({ pathname: '/admin/updatecategories', state: { item: item } })
                                                                    }}

                                                                >
                                                                    <EditIcon boxSize={4} />
                                                                </Box>
                                                            </Flex>
                                                            <Flex>
                                                                <Flex alignItems="center" mt="-13px">
                                                                    <Box mt="15%" border="1px solid black" backgroundColor="red" padding="6px" borderRadius="4px"
                                                                        onClick={() => DeleteCategoryApi(item._id), toggleModalVisibility3} >

                                                                        <DeleteIcon boxSize={5} onClick={() => setDel(item._id)} />
                                                                    </Box>
                                                                </Flex>
                                                            </Flex>
                                                        </Flex>
                                                    </Flex>
                                                    <Box ml="50px" mb="20px">
                                                        <Image size='sm' src="http://mobe.keymouseit.com/mobebarstock/img/ic_mobe.png" w="28px" borderRadius="10px" me="20px" h="60px" mb="10px" mt="-41px" />
                                                    </Box>
                                                </Tr>
                                            );
                                        })}
                                    </Tbody>
                                    : null
                                }
                            </Table>
                        </CardBody>
                    </Card>
                </Box>
                <Box>
                </Box>
                {/* Delete Modal */}
                {
                    deleteModalAlert ? (
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
                                            <Box ml="13%">
                                                <h5 style={{ fontSize: '20px' }}> Are You Sure You Want to delete ?</h5>
                                            </Box>
                                        </div>
                                    </div>
                                    <div className="modal-footer" style={{ marginRight: "30%" }}>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                onSubmit(),
                                                    toggleModalVisibility3();
                                                setDeleteModalAlert(false);
                                            }}
                                            className="btn btn-danger"
                                            data-dismiss="modal"
                                        >
                                            Yes,Delete it!{" "}
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
                    ) : null
                }
                {/* End Delete Modal */}

            </Box >
            <Spacer />
            <Box style={{
                height: 300,
                width: 300,
                zIndex: 99999999,
                position: 'absolute',
                bottom: 0
            }}>

                <ReactPaginate
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={3}
                    breakLinkClassName={"breakLinkClassName"}
                    pageCount={Math.floor(pagesQuantity / 10)}
                    disabledClassName="disabledClassName"
                    previousLabel="<"
                    renderOnZeroPageCount={null}
                    pageClassName={"pageClassName"}
                    previousClassName={"previousClassName"}
                    nextClassName={"nextClassNameLight"}
                    previousClassName={"previousClassNameLight"}
                    containerClassName="containerClassName"
                    activeLinkClassName={"activeLinkClassNameLight"}
                    pageLinkClassName={"pageLinkClassNameLight"}
                    activeClassName="pageActiveClassName"
                />
            </Box>
        </Flex >
    );
}
export default CreateCategories