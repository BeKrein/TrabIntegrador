import React from "react";
import { Box, Stack, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";


function BotaoSide(props) {

    const navigate = useNavigate();

    return (
        <Box>
            <Button
                color="cinza"
                size="small"
                variant="contained"
                onClick={() => {
                    navigate(props.nav);
                }}
            >
                {props.mensagem}
            </Button>
        </Box>
    )
}

export default BotaoSide