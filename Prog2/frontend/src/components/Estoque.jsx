import React from "react";
import axios from "axios";
import { Box, Stack, Button} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Texto from "./Texto";


const colunas = [
    { field: "idt", headerName: "Codigo do tecido", width: 200 },
    { field: "tipo", headerName: "Tipo de tecido", width: 200 },
    { field: "cor", headerName: "Cor", width: 100 },
    { field: "peso", headerName: "Peso", width: 100 },
    { field: "fornecedor", headerName: "Fornecedor", width: 200 },
]



function Estoque() {

    const [listaTecidos, setListaTecidos] = React.useState([]);

    React.useEffect(() => {
        let res = axios.get("/tecidos");
        res.then((query) => {
            setListaTecidos(query.data);
        });
    }, []);


    return (
        <Box
            sx={{ bgcolor: 'text.secondary' }}
            height={'600px'}
        >
            <Stack direction={"column"} alignItems={"center"}>
                <Texto texto="Estoque" />
                <Box
                    height={"500px"}
                    width={"820px"}
                    bgcolor={'background.paper'}
                >
                    <DataGrid
                        rows={listaTecidos}
                        columns={colunas}
                        getRowId={(listaTecidos) => listaTecidos.idt}
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

export default Estoque