import React, { createRef, useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import RequisitionItem from "./RequisitionItem";
import PerfectScrollbar from "perfect-scrollbar";
import baseAxios from "../../config/auth/axios";
import { toast, ToastContainer } from "react-toastify";



let ps;

const styles = {
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


export default function RequisitionList() {
  const ordersBody = createRef()
  const classes = useStyles()
  const [requisitions, setRequisitions] = useState([])


  useEffect(() => {
    baseAxios.get('/requisition/adminAll')
      .then((response) => {
        if (response.data.success)
          setRequisitions(response.data.requisitions)
        else
          toast.error("Failed to get Requisitions details")
      })
  }, [])



  useEffect(() => {
    ps = new PerfectScrollbar(ordersBody.current, {
      suppressScrollX: true,
      suppressScrollY: false,
      wheelSpeed: 1,
      wheelPropagation: true,
      minScrollbarLength: 20
    });

    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
    };
  }, [ordersBody])



  return (
    <GridContainer>
      <ToastContainer />
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Reqisitions</h4>
            <p className={classes.cardCategoryWhite}>
              View reqisitions to approve or reject.
            </p>
          </CardHeader>
          <div ref={ordersBody}>
            <CardBody className={classes.cardBody}>
              {requisitions.map((requisition, index) => {
                return <RequisitionItem requisition={requisition} />
              })}
            </CardBody>
          </div>
        </Card>
      </GridItem>

    </GridContainer>
  );
}
