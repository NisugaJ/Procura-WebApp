import React, { useState } from "react"
import { makeStyles, useMediaQuery, useTheme, Button, Dialog, DialogContent, DialogContentText, DialogActions } from "@material-ui/core"

const ImagesViewer = ({rowData}) => {
    const[images, ] = useState(rowData.images)
    const [open, setOpen] = React.useState(false);
    const[selectedImage, setSelectedImage] = useState(rowData.images[0]);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  
    const handleClickOpen = (imagePath) => {
        setSelectedImage(imagePath)
        setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const useStyles = makeStyles((theme)=>({
        img:{
            width:"200px",
            [theme.breakpoints.down(768)]: {
                width:"100px",
            },
            height:"auto",
            padding:"5px",
            borderRadius:"5px",
            objectFit: "cover",
        },
        imageViewer:{
            [theme.breakpoints.down(768)]: {
                width:"300px",
            },
            alignContent:"left",
            fontSize: 100,
            textAlign: 'center',
            color: 'white',
        },
        imageDialog:{
            height:"auto",
            width:"600px",
            [theme.breakpoints.down(768)]: {
                width:"250px",
            },
        }
    }))

    const imgStyles = useStyles()

    return (
    <>
        <div
            className={imgStyles.imageViewer}
        >
            {images.map(imgPath => {
                return (
                    <Button  color="primary"  onClick={(()=>handleClickOpen(imgPath))}>
                        <img key={imgPath} className={imgStyles.img} src={ imgPath} />
                    </Button>
            )
            })}
           
        </div>
        
        <Dialog
                id={selectedImage}
                key={selectedImage}
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                {/* <DialogTitle id="responsive-dialog-title">{"Use Google's location service?"}</DialogTitle> */}
                <DialogContent>
                <DialogContentText>
                    <img className={imgStyles.imageDialog}  src={ selectedImage} />
                </DialogContentText>
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


export default ImagesViewer