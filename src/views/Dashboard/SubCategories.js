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
import { useHistory } from "react-router-dom";
import ReactPaginate from "react-paginate";
import DatePicker from "react-datepicker";
import Tables from "./Tables";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import { useToast } from "@chakra-ui/toast";
import "react-datepicker/dist/react-datepicker.css";
import '../Dashboard/dashboard.css'
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,

    Route,
    Link
} from "react-router-dom";
const statuses = ['success', 'error', 'warning', 'info'];

const SubCategories = () => {
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
    const history = useHistory()


    const textColor = useColorModeValue("gray.700", "white");
    useEffect(() => {

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

    const [del, setDel] = useState("")
    const onSubmit = () => {
        setDeleteModalAlert(false)
        DeleteSubCategoryApi(del)
        console.log(id, "nnnnnnn")
            .then(res => res.json())
            .then(async (res) => {
                console.log('Hi');
            })
            .catch((error) => {
                throw (error)
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


    const DeleteSubCategoryApi = async (id) => {

        DeleteSubCategoryApiData(id).then(function (response) {
            if (response.data.statusCode === 200) {
                setDeleteModalAlert(false)
                toast({
                    title: data.message,
                    status: 'success',
                    isClosable: true,
                })
            }
            setData(response.data);
            GetSubCategoryApi().then((res) => res.json())
                .then((res) => {
                    console.log(res.data, 'frggtrtg')
                    setSubCategory(res.data)

                })
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
                <Flex>
                    <Box fontSize='21px' color={'black'} mb="10px">

                        <h1 style={{ marginLeft: '250px' }} > Welcome to Ministry Of Bar Exchange</h1>
                    </Box>
                </Flex>
                <Box mt='10%' fontSize='20px' border='1px solid #e7eaec' padding='2px'>
                    <h1> CREATE SUB CATEGORIES </h1>
                </Box>

                <Flex gap="8%">

                    <Button

                        onClick={() => {

                            history.push('/admin/addsubcategories')
                        }}
                        bg='teal.300'
                        w="21%"
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
                        Add New SubCategory
                    </Button>

                </Flex>


                <Box width="180%">
                    <Card overflowX={{ sm: "scroll", xl: "hidden" }} minWidth="80vw">
                        <CardHeader p='6px 0px 22px 0px'>
                        </CardHeader>
                        <CardBody>
                            <Table variant='unstyled' size='lg' w="60%" color={textColor} style={{ tableLayout: "fixed" }}>
                                <Thead>
                                    <Tr marginLeft='20px'>
                                        <Th>Name</Th>
                                        <Th>Profile Pic</Th>
                                        <Th>Status</Th>
                                        <Th>Actions</Th>
                                    </Tr>
                                </Thead>
                                {subCategory && subCategory.getSubCat ?
                                    <Tbody>
                                        {subCategory.getSubCat.map((item, index) => {
                                            console.log(item, "nnnnnnn");
                                            return (
                                                <Tr>
                                                    <Td>{item?.name}</Td>
                                                    <Flex mt="5px">
                                                        <Td ml="10%">
                                                            <Box ml="auto" >
                                                                <Image size='sm' src="http://mobe.keymouseit.com/mobebarstock/img/ic_mobe.png" maxW="28px" borderRadius="10px" />
                                                            </Box>
                                                        </Td>
                                                        <Td ml="59%">
                                                            <FormControl display='flex' alignItems='center' >
                                                                <Switch id='email-alerts' isChecked={item.isBlocked} onChange={() => UpdateSubCategorieApi()} colorScheme='teal' />
                                                            </FormControl>
                                                        </Td>
                                                        <Td ml="10%">
                                                            <Flex ml="104px" gap="14px">
                                                                <Flex alignItems="center">
                                                                    <Box mt="15%" border="1px solid black" backgroundColor="#4fd1c5" borderRadius="4px" padding="6px"
                                                                        onClick={() => {
                                                                            update(item)
                                                                            scrollToTop()
                                                                            history.push({ pathname: '/admin/updatesubcategories', state: { item: item } })
                                                                        }} >
                                                                        <EditIcon boxSize={4} />
                                                                    </Box>
                                                                </Flex>

                                                                <Flex alignItems="center">
                                                                    <Box mt="15%" border="1px solid black" backgroundColor="red" padding="6px" borderRadius="4px"
                                                                        onClick={() => DeleteCategoryApi(item._id), toggleModalVisibility3} >

                                                                        <DeleteIcon boxSize={5} onClick={() => setDel(item._id)} />
                                                                    </Box>
                                                                </Flex>
                                                            </Flex>
                                                        </Td>
                                                    </Flex>
                                                </Tr>
                                            );
                                        })}
                                    </Tbody>
                                    : null
                                }
                            </Table>
                        </CardBody>
                    </Card >
                </Box>

                {/* Delete Modal */}
                {console.log(deleteModalAlert)}
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
                    pageRangeDisplayed={2}
                    marginPagesDisplayed={2}
                    breakLinkClassName={"breakLinkClassName"}
                    pageCount={Math.floor(pagesQuantity / 3)}
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
export default SubCategories