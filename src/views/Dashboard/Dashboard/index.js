// Chakra imports
import {
  Flex,
  Grid,
  Button,
  Text,
  Box,
  Image,
  SimpleGrid,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { TriangleDownIcon, EmailIcon, MoonIcon, LockIcon } from '@chakra-ui/icons'

// assets
import peopleImage from "assets/img/people-image.png";
import logoChakra from "assets/svg/logo-white.svg";
import BarChart from "components/Charts/BarChart";
import LineChart from "components/Charts/LineChart";

import { ProfileIcon, SettingsIcon } from "components/Icons/Icons";
// Custom icons
import {
  CartIcon,
  DocumentIcon,
  CreditIcon,
  StatsIcon,
  GlobeIcon,
  WalletIcon,
} from "components/Icons/Icons.js";
import React, { useState, useEffect, useRef } from "react";
import { dashboardTableData, timelineData } from "variables/general";
import ActiveUsers from "./components/ActiveUsers";
import BuiltByDevelopers from "./components/BuiltByDevelopers";
import MiniStatistics from "./components/MiniStatistics";
import OrdersOverview from "./components/OrdersOverview";
import Projects from "./components/Projects";
import SalesOverview from "./components/SalesOverview";
import WorkWithTheRockets from "./components/WorkWithTheRockets";
import { NavLink } from "react-router-dom";
import { GetDataCount } from "services/auth";
import { GetTotalOrderCount } from "services/auth";


export default function Dashboard() {
  let navbarIcon = useColorModeValue("gray.500", "gray.200");
  const iconBoxInside = useColorModeValue("white", "white");
  const [data, setData] = useState([]);
  const [count, setCount] = useState([]);
  const [count1, setCount1] = useState([]);
  const [totalBars, setTotalBars] = useState([]);
  const [totalBranches, setTotalBranches] = useState([]);
  const [totalCategories, setTotalCategories] = useState([]);
  const [totalSubCategories, setTotalSubCategories] = useState([]);
  const [approved, setApproved] = useState([]);
  const [pending, setPending] = useState([]);
  const [rejected, setRejected] = useState([]);
  const { colorMode, toggleColorMode } = useColorMode();
  const [click, setClick] = useState(false);
  const history = useHistory();
  const ref = useRef()


  let token = localStorage?.getItem("user-info");
  useEffect(() => {
    // window?.location?.reload()

    const checkIfClickedOutside = e => {
      if (click && ref.current && !ref.current.contains(e.target)) {
        setClick(false)
      }
    }
    GetDataCount().then((res) => res.json())
      .then((res) => {
        setCount(res.data)
        setTotalBars(res.data.totalBars)
        setTotalBranches(res.data.totalBranches)
        setTotalCategories(res.data.totalCatgories)
        setTotalSubCategories(res.data.totalSubCatgories)
      }
      )
    GetTotalOrderCount().then((res) => res.json())
      .then((res) => {
        console.log(res.data, 'ordersorders')
        setCount1(res.data)
        setApproved(res.data.approved)
        setPending(res.data.pending)
        setRejected(res.data.rejected)
      }
      )
  }, []);

  const del = () => {
    console.log("del function")
    localStorage.getItem("user-info", token);
    console.log((localStorage.getItem("user-info", token), 'hiiiiiiii'))
    // localStorage.getItem("user-info");
    localStorage.removeItem("user-info", token)
    history.push("/auth/signin");
  }

  const item = () => {
    console.log("inside function")
    setClick(click => !click);
  }

  // useEffect(() => {
  //   window?.location?.reload()
  // }, [])

  return (
    <Flex flexDirection='column' pt={{ base: "120px", md: "75px" }}>
      <Flex>
        <Box ml="80%" mt="-10%" ref={ref}>
          <Button
            ms="0px"
            ml="-17px"
            px="0px"
            me={{ sm: "2px", md: "16px" }}
            color={navbarIcon}
            variant="transparent-with-icon"
            leftIcon={
              document.documentElement.dir ? (
                <ProfileIcon color="black" w="22px" h="22px" me="0px" />
              ) : (
                ""
              )
            }
          >
            <h1 style={{ color: "black" }}> Demo </h1>
            <TriangleDownIcon color="black" w="20px" h="17px" me="0px" zIndex="99999999" onClick={() => item()} />
            {click ?
              <Box ml="-123px" mt="193px" padding="20px" boxShadow="xl" zIndex="99999999" backgroundColor="white" borderRadius="10px"
              >
                <Box >
                  <Flex padding="10px" _hover={{
                    background: "lavender",
                    color: "teal.500",
                  }}>
                    <EmailIcon w={5} h={5} color="black" />
                    <Text fontSize="lg" ml="10px" color="black">Email</Text>
                  </Flex>
                  <Flex padding="10px" _hover={{
                    background: "lavender",
                    color: "teal.500",
                  }}>
                    <MoonIcon w={5} h={5} color="black" />
                    <Text fontSize="lg" ml="10px" color="black" onClick={toggleColorMode} color="black">
                      Toggle {colorMode === "light" ? "Dark" : "Light"}

                    </Text>
                  </Flex>
                  <Flex padding="10px" _hover={{
                    background: "lavender",
                    color: "teal.500",
                  }}>
                    <LockIcon w={5} h={5} color="black" />
                    <Text fontSize="lg" ml="10px" color="black" onClick={() => del()} >Logout</Text>
                  </Flex>
                </Box>
              </Box>
              : null
            }
            <Box mb='1800%'>
              {/* <NavLink to="/auth/signin"> */}
              <Text display={{ sm: "none", md: "flex" }}>Logout</Text>
              {/* if () {
              const result = await res.json();
              localStorage.setItem("user-info", JSON.stringify(result));
              history.push("/auth/signin");
              
      } */}
              {/* </NavLink> */}
            </Box>
          </Button>
        </Box>
      </Flex>
      <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing='24px' mt="25px" mr="2%" >
        <Box boxShadow="2xl" borderRadius="30%">
          <MiniStatistics
            title={"Bars"}
            amount={totalBars}
            icon={<CreditIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
          />
        </Box>
        <Box boxShadow="2xl" borderRadius="30%">
          <MiniStatistics
            title={"Branches"}
            amount={totalBranches}
            totalBranches
            icon={<GlobeIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
          />
        </Box>
        <Box boxShadow="2xl" borderRadius="30%">
          <MiniStatistics
            title={"Categories"}
            amount={totalCategories}
            icon={<CartIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
          />
        </Box>
        <Box boxShadow="2xl" borderRadius="30%">
          <MiniStatistics
            title={"Sub Categories"}
            amount={totalSubCategories}
            icon={<StatsIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
          />
        </Box>
      </SimpleGrid>

      <Box mt='8%' fontSize='20px' w='100%' padding='2px' fontWeight="bold" >
        <h1> This Week Orders </h1>
      </Box>
      <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing='24px' mt="46px">
        <Box boxShadow="2xl" borderRadius="30%">
          <MiniStatistics
            title={"Approved Orders"}
            amount={approved}
            totalBranches
            icon={<CreditIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
          />
        </Box>
        <Box boxShadow="2xl" borderRadius="30%">
          <MiniStatistics
            title={"Pending Orders"}
            amount={pending}
            icon={<CreditIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
          />
        </Box>
        <Box boxShadow="2xl" borderRadius="30%">
          <MiniStatistics
            title={"Rejected Orders"}
            amount={rejected}
            icon={<CreditIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
          />
        </Box>
      </SimpleGrid>
      <Grid
        templateColumns={{ sm: "1fr", md: "1fr 1fr", lg: "2fr 1fr" }}
        templateRows={{ sm: "1fr auto", md: "1fr", lg: "1fr" }}
        gap='24px'>
      </Grid>
    </Flex>

  );
}
