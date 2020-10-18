import React, { useState, useEffect } from "react"
import MaterialTable from "material-table"
import {Button, CircularProgress, Dialog, DialogActions, DialogContent, LinearProgress } from "@material-ui/core";
import { toast, ToastContainer} from "react-toastify";
import baseAxios from "config/auth/axios";
import ImagesViewer from "./ItemImagesViewer";
import AddItem from "views/AddItem";


const ItemsTable = ({itemsData}) => {
    const [loaded, setLoaded] = useState(false)
    const[ addDialog, setAddDialog ] = useState(false)
    const [state] = useState({
        columns: [
            { title: 'ID', field: '_id', editable: 'never', hidden: true },
            { title: 'Item Name', field: 'itemName' },
            { title: 'Price', field: 'price',type :"numeric"   },
            { title: 'Category', field: 'category', lookup: {'SPECIAL_APPROVAL': 'SPECIAL_APPROVAL', 'NORMAL': 'NORMAL'}  },
            { title: 'Weight per item', field: 'weightPerItem',  type :"numeric" },
            { title: 'Available Quantity', field: 'availableQty', type :"numeric" },
            { title: 'Max Quantity', field: 'maxQty', type :"numeric" },
            {

                field: 'availabiliy',
                title: 'Availabiliy',
                render: rowData => (
                    <LinearProgress
                        variant="determinate"
                        size={40}
                        thickness={4}
                        value={rowData.availableQty / rowData.maxQty * 100}
                    />
                )
                },
                { title: 'Supplier', field: 'supplierId'},
            { title: 'Images', field: 'images', hidden: true},
        ]
    })

    const [entries, setEntries] = useState({
        data: [
            {
                _id: "",
                itemName: '',
                supplierId: '',
                weightPerItem: '',
                price: '',
                category: '',
                maxQty: '',
                availableQty: '',
                photoURL11: '',
                photoURL21: '',
                images:[]
            }
        ],
    })

    useEffect(() => {
        setEntries({ data: itemsData })
        setLoaded(true)
    }, [loaded])

    const handleClose = () => {
        setAddDialog(false)
    }
 
    if (!loaded) return <CircularProgress />

    return (
        <>
        <ToastContainer/>
        <MaterialTable
            searchable
            title="Items"
            columns={state.columns}
            data={entries.data}
            options={{
                addRowPosition: "first",
                rowStyle: {
                    fontSize:"12px",
                    padding:"5px"
                }, 
                headerStyle:{ 
                    fontSize:"13px",
                    padding:"5px"
                }
            }}
            
            detailPanel={[
                rowData=>({
                    icon: 'collections',
                    disabled: !rowData.images === undefined ,
                    tooltip: 'Show Item Images',
                    render: rowData => {
                        return <ImagesViewer rowData={rowData} />
                    },
                })
            ]}

            actions={[
                {
                  icon: "add",
                  isFreeAction: true,
                  onClick: (event) => {
                    setAddDialog(true)
                  }
                }
              ]}
            
            editable={{
                
                // onRowAdd: (newData) =>
                // new Promise((resolve) => {
                //     setTimeout(() => {
                //             resolve();
                            
                            
                //             baseAxios
                //             .post("item/add", { vendorData: JSON.stringify(newData) })
                //             .then(function (response) {
                //                 console.log(response)
                //                 if (response.data.success) {
                //                     newData._id = response.data.data._id
                //                         toast.success("Added item succcesfully")
                //                         setEntries(prevState => {
                //                             const data = [...prevState.data]
                //                             data.push(newData)
                //                             return { ...prevState, data }
                //                         })
                //                     } else {
                //                         toast.error("Failed to add item")
                //                     }
                //                 })
                //                 .catch(function (error) {
                //                     toast.error( 'Failed when adding vendor')
                //                 })
                //             }, 600)
                //         }),
                        
                        
                        onRowUpdate: (newData, oldData) =>
                        new Promise(resolve => {
                            setTimeout(() => {
                                resolve()
                                baseAxios
                                .put("item/" + oldData._id, newData)
                                .then(function (response) {
                                    if (response.data) {
                                        newData._id = oldData._id
                                        
                                        setEntries(prevState => {
                                            const data = [...prevState.data]
                                            data[data.indexOf(oldData)] = newData
                                            return { ...prevState, data }
                                        })
                                        toast.success("Updated item succcesfully")
                                    } else {
                                        toast.error("Update failed")
                                    }
                                })
                                .catch(function (error) {
                                    toast.error("Update failed"+error.message)
                                })
                            }, 600)
                        }),

                        onRowDelete: (oldData) =>
                        new Promise(resolve => {
                            setTimeout(() => {
                                resolve()
                                // deleting from DB
                                const data = [...entries.data]
                                baseAxios
                                .delete("item/"+oldData._id )
                                .then(response => {
                                    if (response.data) {
                                        toast.success("Deleted item succcesfully")

                                        setEntries({ ...entries, data })
                                        setEntries(prevState => {
                                            const data = [...prevState.data]
                                            data.splice(data.indexOf(oldData), 1)
                                            return { ...prevState, data }
                                        })
                                    } else {
                                        toast.error("Deletion failed")
                                    }
                                })
                                .catch(error => {
                                    toast.error("Deletion failed. "+error.message)
                                })
                            }, 600)
                        })
                    }}
                    />
                     <Dialog
                        open={addDialog}
                        onClose={handleClose}
                        aria-labelledby="responsive-dialog-title"
                        >
                        {/* <DialogTitle id="responsive-dialog-title">{"Use Google's location service?"}</DialogTitle> */}
                        <DialogContent>
                            <AddItem
                            
                            />
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleClose} color="primary" autoFocus>
                            OK
                        </Button>
                        </DialogActions>
                    </Dialog>
                </>
    )
}

export default ItemsTable