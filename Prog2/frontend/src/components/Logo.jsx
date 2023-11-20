import { Box, Stack } from "@mui/material";
import React from "react";

function Logo(props) {
    return (
        <Box>
            <Stack direction={"column"} alignItems={"center"}>
                <img src="logo.png" alt="Logo" />
            </Stack>
        </Box>
    )
}

export default Logo