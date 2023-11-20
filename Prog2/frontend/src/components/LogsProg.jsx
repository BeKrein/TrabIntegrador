import React from "react";
import axios from "axios";
import { Box, Stack, Button} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Texto from "./Texto";


const colunas = [
    { field: "data", headerName: "Data", width: 200 },
    { field: "usuario", headerName: "Usuario", width: 200 },
    { field: "mudanca", headerName: "Log", width: 400 },
]

function LogsProg() {

    const [listaLogs, setListaLogs] = React.useState([]);

    React.useEffect(() => {
        let res = axios.get("/Logs");
        res.then((query) => {
            setListaLogs(query.data);
        });
    }, []);


    return (
        <Box
            sx={{ bgcolor: 'text.secondary' }}
            height={'600px'}
        >
            <Stack direction={"column"} alignItems={"center"}>
                <Texto texto="Logs"/>
                <Box
                    height={"500px"}
                    width={"820px"}
                    bgcolor={'background.paper'}
                >
                    <DataGrid
                        rows={listaLogs}
                        columns={colunas}
                        getRowId={(listaLogs) => listaLogs.idl}
                    />
                </Box>
                <Button
                    variant="contained"
                    // onClick={handleClick}
                    type="submit"
                    color="primary">
                    Voltar
                </Button>
            </Stack>
        </Box>
    );

}

export default LogsProg