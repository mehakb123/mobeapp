import {
    Avatar,

    Box,
    Button,
    Flex,
    Td,
    Text,
    Tr,
    useColorModeValue,
} from "@chakra-ui/react";
import { React, useState } from "react";
//import { deleteMixture } from "services/auth";

// import { getTableData } from "services/auth";
function TablesMixtureRowButton(props) {
    const [deleteModalAlert, setDeleteModalAlert] = useState(false);
    const [putDataModal, setPutDataModal] = useState(false);
    const { logo, name, email, subdomain, domain, state, date, rate, total } = props;
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
            <Td >
                {name}
            </Td>
            <Td >
                {email}



            </Td>
            <Td >


                {domain}



            </Td>
            <Td >


                {subdomain}


            </Td>
            <Td >


                {logo}



            </Td>
            <Td >


                {state}



            </Td>
            <Td >


                {rate}


            </Td>
            <Td >


                {total}



            </Td>





            {/* <Td>
                <Flex direction="column">
                    <Text fontSize="md" color={textColor} fontWeight="bold">
                        {domain}
                    </Text>
                    <Text fontSize="sm" color="gray.400" fontWeight="normal">
                        {subdomain}
                    </Text>
                </Flex>
            </Td> */}
            <Td>
                {/* <Badge
                    bg={status === "Online" ? "green.400" : bgStatus}
                    color={status === "Online" ? "white" : colorStatus}
                    fontSize="16px"
                    p="3px 10px"
                    borderRadius="8px"
                >
                    {status}
                </Badge> */}
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
                {/* <button style={{ marginTop: '10px', background: '#f8ac59', color: 'white' }}
                    type="button"
                    onClick={() => {
                        toggleModalVisibility2()
                    }}
                    className="btn"

                >
                    Update
                </button> */}

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
                {/* <button style={{ marginTop: '10px', background: '#ed5565', color: 'white' }}
                    type="button"
                    onClick={() => {
                        toggleModalVisibility3()
                    }}
                    className="btn"

                >
                    Delete
                </button> */}



            </Td>

        </Tr>
    );
}

export default TablesMixtureRowButton;
