import React, { createRef, useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import PerfectScrollbar from "perfect-scrollbar";
//import axios from 'axios';
import Button from "components/CustomButtons/Button.js";
import TextField from '@material-ui/core/TextField';

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
  },
  paper: {
    flexDirection: 'column',
    alignItems: 'center',
  },
};

const useStyles = makeStyles(styles);


export default function Summary() {
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

  const [form, setForm] = useState()
  const handleChange = ({ target }) => setForm({ ...form, [target.name]: target.value })

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Summary</h4>
            <p className={classes.cardCategoryWhite}>
              Get the summary filter
            </p>
          </CardHeader>
          <div ref={ordersBody}>
            <form>
              <CardBody className={classes.cardBody}>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={3} />
                  <GridItem xs={12} sm={12} md={6}>

                    <GridContainer>
                      <GridItem xs={12} sm={12} md={6}>
                        <TextField
                          variant="outlined"
                          margin="normal"
                          required
                          id="regular"
                          label='From'
                          autoFocus
                          type='string'
                          onChange={handleChange}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={6}>
                        <TextField
                          variant="outlined"
                          margin="normal"
                          required
                          id="regular"
                          label='To'
                          autoFocus
                          type='string'
                          onChange={handleChange}
                        />
                      </GridItem>
                    </GridContainer>

                  </GridItem>

                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={5} />

                  <GridItem xs={12} sm={12} md={4}>
                    <Button type="button" color="success" style={{ width: "40%" }}>Filter</Button><br />

                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem xs={12} sm={12} md={3} />

                  <GridItem xs={12} sm={12} md={6}  >
                    <Card>
                      <CardBody>
                        <GridContainer>
                          <GridItem xs={12} sm={12} md={4}>
                            <p style={{ color: "black", fontSize: 15 }}>Total orders:</p>
                          </GridItem>
                          <GridItem xs={12} sm={12} md={8}>
                            <p style={{ color: "black", fontSize: 15 }}></p>
                          </GridItem>
                        </GridContainer>
                        <GridContainer>
                          <GridItem xs={12} sm={12} md={4}>
                            <p style={{ color: "black", fontSize: 15 }}>Total cost:</p>
                          </GridItem>
                          <GridItem xs={12} sm={12} md={8}>
                            <p style={{ color: "black", fontSize: 15 }}></p>
                          </GridItem>
                        </GridContainer>
                        <GridContainer>
                          <GridItem xs={12} sm={12} md={4}>
                            <p style={{ color: "black", fontSize: 15 }}>Total Requisitions:</p>
                          </GridItem>
                          <GridItem xs={12} sm={12} md={8}>
                            <p style={{ color: "black", fontSize: 15 }}></p>
                          </GridItem>
                        </GridContainer>
                        <GridContainer>
                          <GridItem xs={12} sm={12} md={4}>
                            <p style={{ color: "black", fontSize: 15 }}>Top purchased item:</p>
                          </GridItem>
                          <GridItem xs={12} sm={12} md={8}>
                            <p style={{ color: "black", fontSize: 15 }}></p>
                          </GridItem>
                        </GridContainer>
                        <GridContainer>
                          <GridItem xs={12} sm={12} md={4}>
                            <p style={{ color: "black", fontSize: 15 }}>Most popular suppier:</p>
                          </GridItem>
                          <GridItem xs={12} sm={12} md={8}>
                            <p style={{ color: "black", fontSize: 15 }}></p>
                          </GridItem>
                        </GridContainer>

                      </CardBody>
                    </Card>
                  </GridItem>
                </GridContainer>

              </CardBody>
            </form>
          </div>
        </Card>
      </GridItem>

    </GridContainer >
  );
}
