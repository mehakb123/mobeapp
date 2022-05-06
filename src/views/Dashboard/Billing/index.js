import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/toast";
import { BellIcon, SearchIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { GetBarsApi } from "services/auth";
import { BarsApiData } from "services/auth";
import { DeleteBarApiData } from "services/auth";
import { UpdateBarsApiData } from "services/auth";
import { useHistory } from "react-router-dom";

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


  const [del, setDel] = useState("")
  const onSubmit = () => {
    setDeleteModalAlert(false)
    DeleteBarApi(del)
      .then(res => res.json())
      .then(async (res) => {
      })
      .catch((error) => {
        throw (error)
      })
  }

  const DeleteBarApi = async (id) => {
    DeleteBarApiData(id).then(function (response) {
      if (response.data.statusCode === 200) {
        setDeleteModalAlert(false)
        toast({
          title: data.message,
          status: 'success',
          isClosable: true,
        })
      }
      setData(response.data);
      GetBarsApi().then((res) => res.json())
        .then((res) => {
          console.log(res.data, 'frggtrtg')
          setCategory(res.data)

        })
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
      <Box overflow="hidden">

        <Flex>
          <Box fontSize='21px' color={'black'} mb="10px">
            <h1 style={{ marginLeft: '250px' }} > Welcome to Ministry Of Bar Exchange</h1>
          </Box>
        </Flex>

        <Box mt='10%' fontSize='20px' border='1px solid #e7eaec' w='115%' padding='2px'>
          <h1> CREATE BARS </h1>

        </Box>
        <Flex>
          <Box>


            <Flex gap="8%">

              <Button

                onClick={() => {

                  history.push('/admin/addbar')
                }}
                bg='teal.300'
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
                Add New Bar
              </Button>
            </Flex>
          </Box>
        </Flex>
        <Flex>

          <Box ml="53px">
          </Box>
        </Flex>
        <Box width="115%" mt="-18px">
          <Box mt="-14px" ml='-53px'>
          </Box>
          <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
            <CardHeader p='6px 0px 22px 0px' >
            </CardHeader>
            <CardBody width="91%">
              <Table variant='unstyled' size='lg' color={textColor} style={{ tableLayout: "fixed" }}>
                <Thead>
                  <Tr>
                    <Th>Name</Th>
                    <Th>City</Th>
                    <Th>Lat</Th>
                    <Th>Long</Th>
                    <Th>Status</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                {category && category.getBar ?
                  <Tbody>
                    {category.getBar.map((item, index) => {
                      return (
                        <Tr>
                          <Td>{item?.name}</Td>
                          <Td>{item?.city}</Td>
                          <Td>{item?.lat}</Td>
                          <Td>{item?.long}</Td>
                          <Flex mt="5px">
                            <Flex>

                              <Flex>
                                <Td>
                                  <FormControl display='flex' alignItems='center' >
                                    <Switch id='email-alerts' isChecked={item.isBlocked} onChange={() => UpdateBarsApi()} colorScheme="teal"
                                    />
                                  </FormControl>

                                </Td>

                                <Flex ml="92px" gap="14px">
                                  <Flex alignItems="center">
                                    <Box mt="15%" border="1px solid black" backgroundColor="#4fd1c5" borderRadius="4px" padding="6px"
                                      onClick={() => {
                                        update(item)
                                        scrollToTop()
                                        history.push({ pathname: '/admin/updatebar', state: { item: item } })
                                      }}
                                    >
                                      <EditIcon boxSize={4} />
                                    </Box>

                                  </Flex>
                                  <Flex alignItems="center">
                                    <Box mt="15%" border="1px solid black" backgroundColor="red" padding="6px" borderRadius="4px"
                                      onClick={() => DeleteBarApi(item._id), toggleModalVisibility3} >

                                      <DeleteIcon boxSize={5} onClick={() => setDel(item._id)} />
                                    </Box>
                                  </Flex>
                                </Flex>
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
      </Box>
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

export default Billing;
