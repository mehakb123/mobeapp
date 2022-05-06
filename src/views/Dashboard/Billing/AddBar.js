import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/toast";
import { BellIcon, SearchIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { GetBarsApi } from "services/auth";
import { BarsApiData } from "services/auth";
import { DeleteBarApiData } from "services/auth";
import { UpdateBarsApiData } from "services/auth";

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
import { Switch, FormControl, FormLabel } from '@chakra-ui/react'
import ReactPaginate from "react-paginate";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import { useHistory } from "react-router-dom";

import {
    billingData,
    invoicesData,
    newestTransactions,
    olderTransactions,
} from "variables/general";


const Billing = () => {
    const [name, setName] = useState("");
    const [city, setCity] = useState("");
    const [lat, setLat] = useState("");
    const [long, setLong] = useState("");
    const [barId, setBarId] = useState([]);
    const [isBlocked, setIsBlocked] = useState(false);
    const [category, setCategory] = useState([]);
    const [data, setData] = useState([]);
    const toast = useToast();
    const [pagesQuantity, setPagesQuantity] = useState();
    const [curPage, setCurPage] = useState(0);
    const [skip, setSkip] = useState(0);
    const textColor = useColorModeValue("gray.700", "white");
    const [enable, setEnable] = useState(false);
    const history = useHistory();
    useEffect(() => {
        console.log("pages changes --- ", pagesQuantity)
        GetBarsApi(skip).then((res) => res.json())
            .then((res) => {
                console.log(res.data, 'frggtrtg')
                setPagesQuantity(res.data.totalPages)
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
        GetBarsApi(event?.selected).then((res) => res.json())
            .then((res) => {
                console.log(res.data, 'frggtrtg')
                setPagesQuantity(res.data.totalPages)
                setCategory(res.data)
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
    const triggerToggle = () => {

        setIsBlocked(!isBlocked)

    }

    const update = (item) => {
        console.log('Edit btn')
        console.log(item.name, item.city, item.lat, item.long)
        setName(item.name)
        setCity(item.city)
        setLat(item.lat)
        setLong(item.long)
        setEnable(true)
        setBarId(item._id)
    }


    const BarsApi = async () => {
        BarsApiData(name, city, lat, long).then(function (response) {
            if (response.data.statusCode === 200) {
                toast({
                    title: "Bar Added",
                    status: 'success',
                    isClosable: true,
                })
                GetBarsApi().then((res) => res.json())
                    .then((res) => {
                        setCategory(res.data)
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

    //update bars
    const UpdateBarsApi = async (id) => {
        console.log('Add btn')
        UpdateBarsApiData(name, city, lat, long, barId, isBlocked).then(function (response) {
            if (response.data.statusCode === 200) {
                toast({
                    title: "Bar Updated",
                    status: 'success',
                    isClosable: true,
                })
                GetBarsApi().then((res) => res.json())
                    .then((res) => {
                        setCategory(res.data)
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




    return (
        <Flex
            pe={{ sm: "0px", md: "16px" }}
            w={{ sm: "100%", md: "auto" }}
            alignItems="center"
            flexDirection="row"
        >
            <Box overflow="hidden" mt="90px">
                <Flex>
                    <Box>
                        <Input
                            onChange={(e) => setName(e.target.value)}
                            fontSize='sm'
                            ms='4px'
                            mt='30px'
                            w='100%'
                            borderRadius='15px'
                            type='text'
                            placeholder='Name'
                            mb='24px'
                            size='lg'
                            value={name ? name : ""}
                        />
                    </Box>
                    <Box ml="53px">
                        <Input
                            onChange={(e) => setCity(e.target.value)}
                            fontSize='sm'
                            ms='4px'
                            mt='30px'
                            w="98%"
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
                            onChange={(e) => setLat(e.target.value)}
                            fontSize='sm'
                            ms='4px'
                            mt='-2px'
                            w='100%'
                            borderRadius='15px'
                            type='text'
                            placeholder='Lat'
                            mb='24px'
                            size='lg'
                            value={lat ? lat : ""}
                        />
                    </Box>

                    <Box ml="53px">
                        <Input
                            onChange={(e) => setLong(e.target.value)}
                            fontSize='sm'
                            ms='4px'
                            mt='-2px'
                            w="98%"

                            borderRadius='15px'
                            type='text'
                            placeholder='Long'
                            mb='24px'
                            size='lg'
                            value={long ? long : ""}
                        />
                    </Box>
                </Flex>

                <Box width="115%" mt="-18px">
                    <Box mt="-14px" ml='-53px'>
                        <Button
                            fontSize='10px'
                            onClick={(e) => {
                                enable == true ? UpdateBarsApi() : BarsApi()
                                history.push('/admin/bar')
                            }}
                            bg='teal.300'
                            w='30%'
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
                            {enable == true ? <Text>Edit Bar</Text> : <Text>Add Bar</Text>}
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Flex >
    );
}

export default Billing;
