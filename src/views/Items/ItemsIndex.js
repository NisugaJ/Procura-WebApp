import React, { createRef, useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import PerfectScrollbar from "perfect-scrollbar";
import { toast, ToastContainer } from "react-toastify";
import stylesDashboard from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import { CircularProgress, Container } from "@material-ui/core";
import ItemsTable from "./ItemsTable";
import baseAxios from "config/auth/axios";

const useStyles = makeStyles(stylesDashboard);
let ps;

export default function ItemsIndex() {
  const itemsBody = createRef()
  // const classes = useStyles()
  const [items, setItems] = useState([])

  useEffect(() => {
    baseAxios.get('/item/')
      .then((response) => {
        if (response.data){
          let itemsData = response.data
          itemsData.forEach((item,index) => {
            itemsData[index].images = [item.photoURL11 , item.photoURL21 ]
          })
          
          console.log(itemsData)
          setItems(itemsData)
        }
        else
          toast.error("Failed to get orders details")
      })
  }, [])

 
  useEffect(() => {
      ps = new PerfectScrollbar(itemsBody.current, {
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
  }, [itemsBody])

  if(items.length === 0)
   return (
     <Container style={{ height:"80vh",display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
       <CircularProgress  ref={itemsBody} />
     </Container>
   )
  return (
    <GridContainer>
      <ToastContainer />
      <div ref={itemsBody}>
        <GridItem xs={12} sm={12} md={12}>
          <GridContainer >
            <ItemsTable itemsData={items}/>
          </GridContainer>
        </GridItem>
      </div>
      <GridItem xs={12} sm={12} md={12} style={{height:"auto"}}>
   
      </GridItem>
    
    </GridContainer>
  );
}
