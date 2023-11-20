import React from "react";
import { Typography, Box, Stack } from "@mui/material";



function Texto(props){
    return(
        <Stack direction={"column"} alignItems={"center"}>
                <Typography
                    variant="h3">
                    {props.texto}
                </Typography>
            </Stack>
    );
}

export default Texto