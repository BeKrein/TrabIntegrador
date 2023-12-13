import React from "react";
import axios from "axios";
import { Box, Stack, Button} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import Texto from "./Texto";
import Sidebar from "./Sidebar";


const colunas = [
    { field: "idt", headerName: "Codigo do tecido", width: 200 },
    { field: "tipo", headerName: "Tipo de tecido", width: 200 },
    { field: "cor", headerName: "Cor", width: 100 },
    { field: "peso", headerName: "Peso", width: 100 },
    { field: "fornecedor", headerName: "Fornecedor", width: 200 },
]



function Estoque() {

    const navigate = useNavigate();

    const [listaTecidos, setListaTecidos] = React.useState([]);

    function tecido(id){
        navigate("/attTecido",  { state: { idtVindo : id} });
    }

    React.useEffect(() => {
        let res = axios.get("/tecidos");
        res.then((query) => {
            setListaTecidos(query.data);
        });
    }, []);


    return (
        <Box>
            <Sidebar />
            <Stack direction={"column"} alignItems={"center"}>
                <Box
                    bgcolor={'cinza.light'}
                >
                    <Texto texto="Estoque" />
                    <DataGrid
                        rows={listaTecidos}
                        columns={colunas}
                        getRowId={(listaTecidos) => listaTecidos.idt}
                        onCellClick={(rows) => {tecido(rows.id)}}
                    />
                </Box>
            </Stack>
        </Box>
    );

}

export default Estoque