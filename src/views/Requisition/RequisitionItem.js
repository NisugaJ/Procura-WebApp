import { Box, Chip, Icon, makeStyles, Typography } from "@material-ui/core"
import React from "react"
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import { cardTitle } from "assets/jss/material-dashboard-react.js";
import StoreFront from '@material-ui/icons/Storefront';
import Muted from "components/Typography/Muted.js";
import Button from "components/CustomButtons/Button.js";
import baseAxios from "config/auth/axios";
import { toast, ToastContainer } from "react-toastify";

const styles = {
  orderBox: {
    paddingTop: 3
  },
  orderImage: {
    borderRadius: 10,
    height: "height",
    width: "10rem",
    // boxShadow:"0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)"
  },
  cardTitle: {
    ...cardTitle,
    fontSize: 30
  },
  chip: {
    margin: 3
  },
  deliveryDate: {
    marginTop: 20
  }
}

const useStyles = makeStyles(styles);

export default function RequisitionItem({ requisition }) {
  const classes = useStyles();

  const approveOrReject = (status) => {
    if (status === 'ORDER_PLACED') {
      baseAxios.post('/requisition/placeApprovedOrder', {
        reqId: requisition._id
      }).then(response => {

        if (response) {
          toast.success('Approved', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          toast.success('Email sent to the supplier', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      }).catch(e => {
        //alert(e)
        toast.error(e)
      })
    } else if (status === 'REJECTED') {
      baseAxios.post('/requisition/placeRejectOrder', {
        reqId: requisition._id
      }).then(response => {

        if (response) {
          toast.success('REJECTED', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      }).catch(e => {
        //alert(e)
        toast.error(e)
      })
    }
  }

  return (
    <Box className={classes.orderBox}>
      <ToastContainer />
      <Card >
        <CardHeader color="info"  >
          <CardIcon color="warning">
            <Icon>content_copy</Icon>
          </CardIcon>
          <Typography><b> {requisition.itemId.itemName}</b></Typography>
        </CardHeader>
        <CardBody>
          <GridContainer >
            <GridItem xs={12} sm={6} md={3} elevation={1} >
              <img className={classes.orderImage} alt="orderImg" src={require("../../assets/img/goods/cement_bag.jpg")} />
            </GridItem>
            <GridItem xs={12} sm={6} md={3}>
              <h4 className={classes.cardTitle}>
                {requisition.totalPrice}
              </h4>
              <Chip
                style={{ backgroundColor: "orange" }}
                label={"x " + requisition.quantity}
                size="small" />
              <Chip
                className={classes.chip}
                size="small"
                style={{ backgroundColor: "orange" }}
                label={requisition.status}
              />
              <Chip
                icon={<StoreFront />}
                label={requisition.supplierId.name + ", " + requisition.supplierId.location}
                size="small"
                className={classes.chip}
              />

              <div className={classes.deliveryDate} >
                <Muted> Delivery Date <code>{requisition.requisitionDate}</code> </Muted>
              </div>
            </GridItem>
            <GridItem xs={12} sm={6} md={4} >
              <Box>
                <label>Construction site</label>
                <p>{requisition.siteId.location}</p>
                {/* <label>Comment</label>
                <p>Urgent</p> */}
              </Box>
            </GridItem>
            <GridItem xs={12} sm={6} md={2} >
              <Box>
                <Button type="button" color="success" style={{ width: "50%" }} onClick={() => approveOrReject('ORDER_PLACED')} >Approve</Button><br />
                <Button type="button" color="danger" style={{ width: "50%" }} onClick={() => approveOrReject('REJECTED')} >Reject</Button><br />
              </Box>
            </GridItem>
          </GridContainer>
        </CardBody>
      </Card>
    </Box>
  )
}