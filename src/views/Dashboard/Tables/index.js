// Chakra imports
import { Flex } from "@chakra-ui/react";
import React, { useEffect } from "react";
import Authors from "./components/Authors";
import Projects from "./components/Projects";
import { tablesTableData, dashboardTableData } from "variables/general";
// import { getData } from "services/auth";
// import axios from "axios";

function Tables() {

  // const [customers, setCustomers] = useState([]);
  // const fetchData = () => {
  //   return axios.get("http://192.168.1.108:8003/api/BranchManager/getTable?")
  //     .then((response) => console.log(response.data));
  // }

  // const getData = async () => {

  //   let token = localStorage.getItem('AccessToken')

  //   const onSubmit = (data) => {
  //     llogin(data)
  //       .then(res => res.json())
  //       .then(async (res) => {
  //         console.log({ res })
  //         if (res.statusCode === 200) {
  //           localStorage.setItem("user-info", JSON.stringify(res));
  //           history.push("/dashboard");
  //         } else {
  //           toast({
  //             title: `${res?.message}`,
  //             status: 'error',
  //             isClosable: true,
  //           })

  //         }
  //       }).catch((error) => {
  //         throw (error)
  //       })
  //   }



  //   console.log(token)
  //   console.log(`http://192.168.1.108:8003/api/BranchManager/getTable?accessToken=${token}`)
  //   axios
  //     .get(`http://192.168.1.108:8003/api/BranchManager/getTable?accessToken=${token}`
  //     )

  //     .then(res => {
  //       console.log(`statusCode: ${res.status}`);
  //       console.log(res);
  //       setBranchData(res.data)
  //       console.log("success")
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // };

  return (
    <Flex direction='column' pt={{ base: "120px", md: "75px" }}>
      {/* <Authors
        title={"Authors Table"}
        captions={["Author", "Function", "Status", "Employed", ""]}
        data={tablesTableData}
      /> */}
      {/* <Projects
        title={"Projects Table"}
        captions={["Companies", "Budget", "Status", "Completion", ""]}
        data={dashboardTableData}
      /> */}

    </Flex>
  );
}

export default Tables;
