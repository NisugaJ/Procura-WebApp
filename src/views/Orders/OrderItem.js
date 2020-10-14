import { Box, Icon, makeStyles } from "@material-ui/core"
import React from "react"
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardFooter from "components/Card/CardFooter.js";
import Danger from "components/Typography/Danger";

const styles= {}

const useStyles = makeStyles(styles);

export default function OrderItem(){
    const classes = useStyles();

    return (
        <Box>
         <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>content_copy</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Used Space</p>
              <h3 className={classes.cardTitle}>
                49/50 <small>GB</small>
              </h3>
            </CardHeader>
            loram
            <CardFooter stats>
              <div className={classes.stats}>
                <Danger>
                  {/* <Warnings /> */}
                </Danger>
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  Get more space
                </a>
              </div>
            </CardFooter>
          </Card>
        </Box>
    )
}