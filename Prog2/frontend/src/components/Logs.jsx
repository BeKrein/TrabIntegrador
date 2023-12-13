import React from "react";
import axios from "axios";
import { Box, Stack, Button} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import Texto from "./Texto";
import Sidebar from "./Sidebar";


const colunas = [
    { field: "data", headerName: "Data", width: 200 },
    { field: "usuario", headerName: "Usuario", width: 200 },
    { field: "mudanca", headerName: "Mudanca", width: 600 },
]



function Logs() {

    const [listaLogs, setListaLogs] = React.useState([]);

    React.useEffect(() => {
        let res = axios.get("/logs");
        res.then((query) => {
            setListaLogs(query.data);
        });
    }, []);


    return (
        <Box>
            <Sidebar />
            <Stack direction={"column"} alignItems={"center"}>
                <Box
                    bgcolor={'cinza.light'}
                >
                    <Texto texto="Logs" />
                    <DataGrid
                        rows={listaLogs}
                        columns={colunas}
                        getRowId={(listaLogs) => listaLogs.idl}
                    />
                </Box>
            </Stack>
        </Box>
    );

}

export default Logs;