import React, { createRef, useEffect } from "react";
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
import axios from 'axios';

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
  /*
    const [state] = useState({
      Requisitions: []
    })*/

  const ordersBody = createRef()
  const classes = useStyles()

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


  axios.get('http://localhost:8000/Requisitions/all')
    .then(response => {
      this.setState({ Requisitions: response.data });
    })
    .catch(function (error) {
      console.log(error);
    })


  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Recent Orders</h4>
            <p className={classes.cardCategoryWhite}>
              Latest recent orders are listed here.
            </p>
          </CardHeader>
          <div ref={ordersBody}>
            <CardBody className={classes.cardBody}>
              {[1, 2, 3].map((value, index) => {
                return <RequisitionItem item={value} />
              })}
            </CardBody>
          </div>
        </Card>
      </GridItem>

    </GridContainer>
  );
}
