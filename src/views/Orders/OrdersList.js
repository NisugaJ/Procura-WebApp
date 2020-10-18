import React, { createRef, useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import OrderItem from "./OrderItem";
import PerfectScrollbar from "perfect-scrollbar";
import CardIcon from "components/Card/CardIcon.js";
import CardFooter from "components/Card/CardFooter.js";
import Icon from "@material-ui/core/Icon";
import DateRange from "@material-ui/icons/DateRange";
import CheckCircle from "@material-ui/icons/CheckCircle";
import Update from "@material-ui/icons/Update";
import baseAxios from "config/auth/axios";
import { toast, ToastContainer } from "react-toastify";
import stylesDashboard from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import { Button  as Btn, CircularProgress, Container } from "@material-ui/core";
import Button from "components/CustomButtons/Button.js";


let ps;

const styles = {
  cardCategory: stylesDashboard.cardCategory,
  cardTitle: stylesDashboard.cardTitle,
  stats:{
    ...stylesDashboard.stats,
    width: '10rem'
  },
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  },
  cardBody: {
    // overflowY:"scroll",
    height: "500px"
  }
};

const useStyles = makeStyles(styles);

export default function OrdersList() {
  const ordersBody = createRef()
  const classes = useStyles()
  const [orders, setOrders] = useState([])

  const[filtered,setFiltered] = useState([])
  const[filterLoading, setFilteredloading] = useState(false)

  const[counts,setCounts] = useState({
    ORDER_PLACED : 0,
    PARTIALLY_DELIVERED : 0,
    DELIVERED : 0,
    PAID : 0,
  })

  useEffect(() => {
    baseAxios.get('/order/all')
      .then((response) => {
        if (response.data.success){
          setOrders(response.data.orders)
          setCounts(response.data.counts)
        }
        else
          toast.error("Failed to get orders details")
      })
  }, [])

  const filterOrdersByStatus = (status) => {
    // setFiltered([])
    const filt =  orders.filter((value,index) =>{
      return value.status === status
    })
    if(filt.length > 0){
      setFiltered(filt)
      setFilteredloading(true)
      setTimeout(()=>{
        setFilteredloading(false)
      },1000)
    }
    else {
      toast.warning('No orders found', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }

  useEffect(() => {
      ps = new PerfectScrollbar(ordersBody.current, {
        // suppressScrollX: true,
        // suppressScrollY: false,
        // wheelSpeed: 1,
        // wheelPropagation: true,
        minScrollbarLength: 20
      });

    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
    };
  }, [ordersBody])

  if(orders.length === 0 || filterLoading )
   return (
     <Container style={{ height:"80vh",display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
       <CircularProgress  ref={ordersBody} />
     </Container>
   )
  return (
    <GridContainer>
      <ToastContainer />
      <GridItem xs={12} sm={12} md={12}>
        <GridContainer>
          <GridItem xs={12} sm={4} md={3}>
            <Btn onClick={()=>filterOrdersByStatus('ORDER_PLACED')}>
              <Card>
                <CardHeader color="rose" stats icon>
                  <CardIcon color="rose">
                  <Icon>send</Icon>
                  </CardIcon>
                  <h2 className={classes.cardTitle}>{counts.ORDER_PLACED}</h2>
                </CardHeader>
                <CardFooter stats>
                  <div className={classes.stats}>
                    <DateRange />
                    Order placed 
                </div>
                </CardFooter>
              </Card>
            </Btn>
          </GridItem>
          <GridItem xs={12} sm={4} md={3}>
            <Btn onClick={()=>filterOrdersByStatus('PARTIALLY_DELIVERED')}>
                <Card>
                  <CardHeader color="warning" stats icon>
                    <CardIcon color="warning">
                      <Icon>airport_shuttle</Icon>
                    </CardIcon>
                    <h2 className={classes.cardTitle}>{counts.PARTIALLY_DELIVERED}</h2>
                  </CardHeader>
                  <CardFooter stats>
                    <div className={classes.stats}>
                      <CheckCircle />
                    Partially delivered  {"             "}
                  </div>
                  </CardFooter>
                </Card>
              </Btn>
          </GridItem>
          <GridItem xs={12} sm={4} md={3}>
            <Btn onClick={()=>filterOrdersByStatus('DELIVERED')}>
              <Card>
                <CardHeader color="info" stats icon>
                  <CardIcon color="info">
                    <Icon>check_circle</Icon>
                  </CardIcon>
                  <h2 className={classes.cardTitle}>{counts.DELIVERED}</h2>
                </CardHeader>
                <CardFooter stats style={{width:"100%"}}>
                  <div className={classes.stats}>
                    <CheckCircle />
                    {"Delivered                                 "}
                </div>
                </CardFooter>
              </Card>
            </Btn>
          </GridItem>
          <GridItem xs={12} sm={4} md={3}>
            <Btn onClick={()=>filterOrdersByStatus('PAID')}>
              <Card>
                <CardHeader color="success" stats icon>
                  <CardIcon color="success">
                  <Icon>payments</Icon>
                  </CardIcon>
                  <h2 className={classes.cardTitle}>{counts.PAID}</h2>
                </CardHeader>
                <CardFooter stats>
                  <div className={classes.stats}>
                    <Update />
                    Added to the payment queue
                </div>
                </CardFooter>
              </Card>
            </Btn>
          </GridItem>
        </GridContainer>
      </GridItem>
      <GridItem xs={12} sm={12} md={12} style={{height:"auto"}}>
        <Button type="button" color="success"
          onClick={()=>{
            setFiltered([])
            setFilteredloading(true)
            setTimeout(()=>{
              setFilteredloading(false)
            },500)
          }}
        >
          Show all
        </Button>
        <Card>
          <div ref={ordersBody}>
            <CardBody className={classes.cardBody}>
              {filtered.length === 0 && orders.length > 0 ? orders.map((order, index) => {
                return <OrderItem orderProp={order} key={order._id} />
              })
              : filtered.length > 0  ? 
                filtered.map((order, index) => {
                  return <OrderItem orderProp={order} key={order._id} />
                })
              :null}
            </CardBody>
          </div>
        </Card>
      </GridItem>
    
    </GridContainer>
  );
}
