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

export default function OrderItem() {
  const classes = useStyles();

  return (
    <Box className={classes.orderBox}>
      <Card >
        <CardHeader color="info"  >
          <CardIcon color="warning">
            <Icon>content_copy</Icon>
          </CardIcon>
          <Typography><b> ORD00001 - Cement</b></Typography>
        </CardHeader>
        <CardBody>
          <GridContainer >
            <GridItem xs={12} sm={6} md={3} elevation={1} >
              <img className={classes.orderImage} alt="orderImg" src={require("../../assets/img/goods/cement_bag.jpg")} />
            </GridItem>
            <GridItem xs={12} sm={6} md={3}>
              <h4 className={classes.cardTitle}>
                Rs. 202800.88
                      </h4>
              <Chip
                style={{ backgroundColor: "orange" }}
                label="x 100"
                size="small" />
              <Chip
                className={classes.chip}
                size="small"
                style={{ backgroundColor: "orange" }}
                label="Pending"
              />
              <Chip
                icon={<StoreFront />}
                label="Holcim"
                size="small"
                className={classes.chip}
              />

              <div className={classes.deliveryDate} >
                <Muted> Delivery Date <code>10/09/2020</code> </Muted>
              </div>
            </GridItem>
            <GridItem xs={12} sm={6} md={4} >
              <Box>
                <label>Construction site</label>
                <p>Colombo</p>
                <label>Comment</label>
                <p>Urgent</p>
              </Box>
            </GridItem>
            <GridItem xs={12} sm={6} md={2} >
              <Box>
                <Button type="button" color="success" style={{ width: "50%" }}>Approve</Button><br />
                <Button type="button" color="info" style={{ width: "50%" }}>Proceess</Button><br />
                <Button type="button" color="danger" style={{ width: "50%" }}>Reject</Button><br />
              </Box>
            </GridItem>
          </GridContainer>
        </CardBody>
      </Card>
    </Box>
  )
}