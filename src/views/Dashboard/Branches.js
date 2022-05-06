import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/toast";
import { Select } from "@chakra-ui/select";
import { GetBranchApi } from "services/auth";
import { GetBarsApi } from "services/auth";
import { DeleteBranchApiData } from "services/auth";
import { useHistory } from "react-router-dom";
import { BranchApiData } from "services/auth";

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
import { UpdateBranchApiData } from "services/auth";




const Branches = () => {

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
    const history = useHistory();

    const toast = useToast();

    const textColor = useColorModeValue("gray.700", "white");

    useEffect(() => {
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
        BranchApiData(managerName, city, email, phoneNo, latitude, longitude, branchName, bars, crashItem).then(function (response) {
            if (response.data.statusCode === 200) {
                toast({
                    title: "Branch Added",
                    status: 'success',
                    isClosable: true,
                })
                GetBranchApi().then((res) => res.json())
                    .then((res) => {
                        setBranch(res.data)
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

    const UpdateBranchApi = async () => {

        UpdateBranchApiData().then(function (response) {
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

    const [del, setDel] = useState("")
    const onSubmit = () => {
        setDeleteModalAlert(false)
        DeleteBranchApi(del)
            .then(res => res.json())
            .then(async (res) => {
            })
            .catch((error) => {
                throw (error)
            })
    }


    const DeleteBranchApi = async (id) => {

        DeleteBranchApiData(id).then(function (response) {
            if (response.data.statusCode === 200) {
                setDeleteModalAlert(false)
                toast({
                    title: data.message,
                    status: 'success',
                    isClosable: true,
                })
            }
            setData(response.data);
            GetBranchApi().then((res) => res.json())
                .then((res) => {
                    console.log(res.data, 'frggtrtg')
                    setBranch(res.data)

                })
        })
            .catch(function (error) {
                console.log(error);
            });
    };

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
                <Flex>
                    <Box fontSize='21px' color={'black'} mb="10px">

                        <h1 style={{ marginLeft: '250px' }} > Welcome to Ministry Of Bar Exchange</h1>
                    </Box>
                </Flex>
                <Box mt='9%' fontSize='20px' border='1px solid #e7eaec' w='74%' padding='2px'>
                    <h1> CREATE BRANCHES </h1>
                </Box>
                <Flex mt="20px">
                    <Flex gap="8%">

                        <Button
                            onClick={() => {

                                history.push('/admin/addbranch')
                            }}
                            bg='teal.300'
                            w='140%'
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
                            Add New Branch
                        </Button>

                    </Flex>
                </Flex>

                <Box width="100%" mt="-18px">

                    <Card overflowX={{ sm: "scroll", xl: "hidden" }} w="104%">
                        <CardHeader p='6px 0px  0px'>
                        </CardHeader>
                        <CardBody>

                            <Table variant='unstyled' size='lg' color={textColor} style={{ tableLayout: "fixed" }}>
                                <Thead>
                                    <Tr marginLeft='20px'>
                                        <Th>M.Name</Th>
                                        <Th>City</Th>
                                        <Th>Email</Th>
                                        <Th>Phone</Th>
                                        <Th>B.Name</Th>
                                        <Th>Status</Th>
                                        <Th>Actions</Th>
                                    </Tr>
                                </Thead>
                                {branch && branch.getBranche ?
                                    <Tbody>
                                        {branch.getBranche.map((item, index) => {

                                            return (
                                                <Tr>
                                                    <Td>{item?.managerName}</Td>
                                                    <Td>{item?.city}</Td>
                                                    <Td>{item?.email}</Td>
                                                    <Td>{item?.phoneNo}</Td>
                                                    <Td>{item?.branchName}</Td>
                                                    <Flex ml="124%" mt="5px">
                                                        <Flex>
                                                            <Td ml="-155px">
                                                                <Flex>
                                                                    <FormControl display='flex' alignItems='center'>
                                                                        <Switch id='email-alerts' isChecked={item.isBlocked} onChange={() => UpdateBranchApi()} colorScheme="teal" />
                                                                    </FormControl>
                                                                </Flex>
                                                            </Td>
                                                        </Flex>
                                                        <Flex gap="14px">
                                                            <Flex alignItems="center">
                                                                <Box mt="17%" border="1px solid black" backgroundColor="#4fd1c5" borderRadius="4px" padding="6px"
                                                                    onClick={() => {
                                                                        update(item)
                                                                        scrollToTop()
                                                                        history.push({ pathname: '/admin/updatebranch', state: { item: item } })
                                                                    }}   >
                                                                    <EditIcon boxSize={4} />
                                                                </Box>
                                                            </Flex>

                                                            <Flex alignItems="center">
                                                                <Box mt="6%" border="1px solid black" backgroundColor="red" padding="6px" borderRadius="4px"
                                                                    onClick={() => DeleteBranchApi(item._id), toggleModalVisibility3}>

                                                                    <DeleteIcon boxSize={5} onClick={() => setDel(item._id)} />
                                                                </Box>
                                                            </Flex>
                                                        </Flex>
                                                    </Flex>
                                                </Tr>
                                            );
                                        })}
                                    </Tbody>
                                    : null
                                }
                            </Table>
                        </CardBody>
                    </Card>
                </Box >

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
                {/* End Delete Modal  */}
            </Box >
            <Box style={{
                marginBottom: "1px",
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
                    pageCount={Math.floor(pagesQuantity / 5)}
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

export default Branches;
