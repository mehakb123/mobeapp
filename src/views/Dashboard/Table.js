// Chakra imports
import {
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import { useState } from "react";
// import TablesTableRow from "components/Tables/TablesTableRow";
import TablesMixtureRowButton from "components/Tables/TableMixtureRowButton";


import React from "react";
import { addMixture } from "services/auth";

const Mixtures = ({ title, captions, data }) => {
  console.log(captions, "In Mixtures", data);
  const textColor = useColorModeValue("gray.700", "white");
  const [name, setName] = useState('')
  const [rs, setRs] = useState();

  const addNewMixture = (name, rs) => {
    addMixture(name, rs)
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
  return (
    <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
      <CardHeader p='6px 0px 22px 0px'>
        <Text fontSize='xl' color={textColor} fontWeight='bold'>
          {title}
        </Text>
      </CardHeader>
      <CardBody>
        <Table variant='simple' color={textColor}>

          <input type="Text" onChange={(e) => setName(e.target.value)} placeholder="Name" style={{ height: '35px', color: 'Black', border: '1px #1ab394 solid', width: '45%' }} />

          <input type="number" onChange={(e) => setRs(e.target.value)} placeholder="Rs" style={{ height: '35px', marginLeft: '10px', width: '45%', color: 'Black', border: '1px #1ab394 solid' }} />

          <button style={{ marginTop: '10px', background: '#1ab394', color: 'white' }}
            type="button"
            onClick={() => {
              addNewMixture(name, rs)
            }}
            className="btn">
            Add Mixture
          </button>
          <Tbody>
            {data.map((row) => {
              return (


                <TablesMixtureRowButton

                  key={`${row.email}-${row.name}`}
                  name={row.name.charAt(0).toUpperCase() + row.name.slice(1)}
                  logo={row.logo}
                  email={row.email}

                  // subdomain={row.subdomain}
                  //  domain={row.domain}
                  status={row.price + ' Rs'}
                //  status={row.id}
                //  status={'Offline'}
                //  date={row.date}
                //  date={'04/07/2000'}


                />


              );

            })
            }

          </Tbody>
        </Table>
      </CardBody>
    </Card>
  );
};

export default Mixtures;


import {
  Avatar,
  Badge,
  Button,
  Flex,
  Td,
  Text,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import { React, useState } from "react";
import { deleteMixture } from "services/auth";

// import { getTableData } from "services/auth";
function TablesMixtureRowButton(props) {
  const [deleteModalAlert, setDeleteModalAlert] = useState(false);
  const [putDataModal, setPutDataModal] = useState(false);
  const { logo, name, email, subdomain, domain, status, date } = props;
  const textColor = useColorModeValue("gray.700", "white");
  const bgStatus = useColorModeValue("gray.400", "#1a202c");
  const colorStatus = useColorModeValue("white", "gray.400");

  const toggleModalVisibility2 = () => {
    setPutDataModal(!putDataModal);
  };

  const toggleModalVisibility3 = () => {
    setDeleteModalAlert(!deleteModalAlert);
  };

  const onSubmit = () => {
    // console.log(data, 'data');
    deleteMixture()
      .then(async (res) => {

        console.log('Hiiiii');

      })
      .catch((error) => {
        throw (error)
      })
  }

  return (
    <Tr>
      <Td minWidth={{ sm: "250px" }} pl="0px">
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <Avatar src={logo} w="50px" borderRadius="12px" me="18px" />
          <Flex direction="column">
            <Text
              fontSize="md"
              color={textColor}
              fontWeight="bold"
              minWidth="100%"
            >
              {name}
            </Text>
            <Text fontSize="sm" color="gray.400" fontWeight="normal">
              {email}
            </Text>
          </Flex>
        </Flex>
      </Td>

      <Td>
        <Flex direction="column">
          <Text fontSize="md" color={textColor} fontWeight="bold">
            {domain}
          </Text>
          <Text fontSize="sm" color="gray.400" fontWeight="normal">
            {subdomain}
          </Text>
        </Flex>
      </Td>
      <Td>
        <Badge
          bg={status === "Online" ? "green.400" : bgStatus}
          color={status === "Online" ? "white" : colorStatus}
          fontSize="16px"
          p="3px 10px"
          borderRadius="8px"
        >
          {status}
        </Badge>
      </Td>
      <Td>
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
          {date}
        </Text>
      </Td>
      {/* Delete Modal */}
      {deleteModalAlert ? (
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
                <h5 className="modal-title" id="exampleModalLongTitle" style={{ fontSize: '20px' }}>
                  Alert!
                </h5>

              </div>
              <div className="modal-body">
                <div className="put">
                  <h5 style={{ fontSize: '20px' }}> Do you really want to Delete this Data ?</h5>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  onClick={() => {
                    // deleteDataClick();
                    onSubmit(), //row.branchId
                      toggleModalVisibility3();
                  }}
                  className="btn btn-danger"
                  data-dismiss="modal"
                >
                  Yes
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={toggleModalVisibility3}
                >
                  No{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {/* End Delete Modal */}


      {/* PUt DATA MODAL */}
      {putDataModal ? (
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
                <h5 className="modal-title" id="exampleModalLongTitle" style={{ fontSize: '20px', fontWeight: '500' }}>
                  Edit Existing Data
                </h5>
                {/* <button type="button" onClick={()=>toggleModalVisibility()} className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button> */}
              </div>
              <div className="modal-body">
                <div className="put">
                  {/* <input type="text" placeholder="id" value={id} onChange={(e) => { setId(e.target.value) }} name="id" /> <br /> <br /> */}
                  <input style={{ width: '50%', border: '1px solid', height: '35px' }}
                    type="text"
                    placeholder="Mixture Name"
                    // value={title}
                    onChange={(e) => {
                      // setTitle(e.target.value);
                    }}
                    name="name"
                  />{" "}
                  <br /> <br />
                  <input style={{ width: '50%', border: '1px solid', height: '35px' }}
                    type="text"
                    // value={author}
                    placeholder="Rs"
                    onChange={(e) => {
                      setAuthor(e.target.value);
                    }}
                    name="author"
                  />{" "}
                  <br /> <br />
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  onClick={() => {
                    toggleModalVisibility2();
                    // putData();
                  }}
                  className="btn btn-primary"
                  data-dismiss="modal"
                >
                  Save
                </button>

                {/* <button type="button" className="btn btn-primary" onClick={putData}> Put Data </button> */}
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {/* End Put Data Modal */}

      {/*  Edit Button */}
      <Td>
        {/* <Button p="0px" bg="transparent" variant="no-hover" 
        onClick={()=> toggleModalVisibility2()
        
        } */}
        {/* > */}
        {/* <Text
            fontSize="md"
            color="black"
            fontWeight="bold"
            cursor="pointer"
          >
           Update
          </Text> */}
        {/* Update */}
        {/* </Button> */}
        <button style={{ marginTop: '10px', background: '#f8ac59', color: 'white' }}
          type="button"
          onClick={() => {
            toggleModalVisibility2()
          }}
          className="btn"

        >
          Update
        </button>

      </Td>
      <Td>
        {/* <Button p="0px" bg="transparent" variant="no-hover" 
        onClick={()=> toggleModalVisibility3()
        
        }
        >
         <Text
            fontSize="md"
            color="red"
            fontWeight="bold"
            cursor="pointer"
          >
            Delete
          </Text>
  
         </Button> */}
        <button style={{ marginTop: '10px', background: '#ed5565', color: 'white' }}
          type="button"
          onClick={() => {
            toggleModalVisibility3()
          }}
          className="btn"

        >
          Delete
        </button>



      </Td>

    </Tr>
  );
}

export default TablesMixtureRowButton;


{/* <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
<CardHeader p='6px 0px 22px 0px'>
    {/* <Text fontSize='xl' color={textColor} fontWeight='bold'>
        {title}
    </Text> */}
// </CardHeader >
//   <CardBody>
//     <Table variant='simple' color={textColor}>


//       <Tbody>
//         {
//           orders?.length ?
//             orders.map((row) => {
//               return (


//                 <TablesMixtureRowButton

//                   key={`${row.email}-${row.name}`}
//                   // name={row.name.charAt(0).toUpperCase() + row.name.slice(1)}
//                   logo={row.logo}
//                   email={row.email}


//                   status={row.price + ' Rs'}


//                 />


//               );

//             })
//             : null
//         }

//       </Tbody>
//     </Table>
//   </CardBody>
// </Card >


{/* <TablesMixtureRowButton

  key={`${row.price}-${row.name}`}
  // name={row.name.charAt(0).toUpperCase() + row.name.slice(1)}
  name={row.orderDetails[0].categoryId.name}
  email={row.orderDetails[0].subCategoryId.name}


  status={row.price + ' Rs'}


/>  */}

const DeleteCategoryApi = async (id) => {
  console.log("mehakk")
  let token = `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjU4NzExYTQ5ZWM2ODA4NTMwYjU4NTRhYyIsInR5cGUiOiJBRE1JTiIsImlhdCI6MTY0Nzg2NDcyMX0.taYWb3SjPXpPdkGRie8FKYJlCKFRXRpMlKetuWmQSyY`;
  let formData = new FormData();
  formData.append("categorieId", id);
  console.log(id)
  formData.append("accessToken", token)
  console.log(formData, "message")
  axios.post(`http://192.168.1.108:8003/api/admin/deleteCategorie`, formData)
    .then(function (response) {
      console.log(response, "responseee")
      if (response.data.statusCode === 200) {
        const result = response.json();
        // setDeleteModalAlert(false)
        toast({

          title: data.message,
          status: 'success',
          isClosable: true,
        })

        console.log(toast, "toaster")

      }

      // } else {
      //     toast({

      //         title: data.message,
      //         status: 'success',
      //         isClosable: true,
      //     })

      // }

      setData(response.data);
      console.log(response);
      GetCategoryApi();
    })
    .catch(function (error) {
      console.log(error);
    });
};





{/* Delete Modal */ }
{ console.log(deleteModalAlert) }
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
                  // DeleteCategoryApi(id),
                  // console.log(id, "ddddddddddd")
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
{/* End Delete Modal */ }


<Modal isOpen={isOpen} onClose={onClose}>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>Modal Title</ModalHeader>
    <ModalCloseButton />
    <ModalBody>

    </ModalBody>

    <ModalFooter>
      <Button colorScheme='blue' mr={3} onClick={onClose}>
        Close
      </Button>
      <Button variant='ghost'
        onClick={() => {


          onSubmit(),
            // DeleteCategoryApi(id),
            // console.log(id, "ddddddddddd")
            toggleModalVisibility3();
          setDeleteModalAlert(false);

        }}

      >Secondary Action</Button>
    </ModalFooter>
  </ModalContent>
</Modal>

.then(function (response) {
  console.log(response, " console")
  GetSubCategoryApi();
  if (response.data.statusCode == 200) {
    console.log(response, " consoleconsoleconsoleconsole")
    toast({

      title: "SubCategory Deleted",
      status: 'success',
      isClosable: true,
    })
  }
  console.log(response);
  console.log(toast)


})
  .catch(function (error) {
    console.log(error);
  });