import React from "react";
import axios from "axios";
import { Box, Stack, Button} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import Texto from "./Texto";
import Sidebar from "./Sidebar";


const colunas = [
    { field: "idprod", headerName: "Codigo do produto", width: 200 },
    { field: "tipoprod", headerName: "Tipo do produto", width: 200 },
    { field: "tamanho", headerName: "tamanho", width: 100 },
    { field: "uso_de_tecido", headerName: "Uso de tecido por peça", width: 100 },
    { field: "tipotec", headerName: "Tipo de tecido", width: 100},
]



function Produtos() {

    const navigate = useNavigate();

    const [listaprodutos, setListaprodutos] = React.useState([]);
    

    function produto(id){
        navigate("/attProduto",  { state: { idprod : id} });
    }

    React.useEffect(() => {
        let res = axios.get("/produtos");
        res.then((query) => {
            setListaprodutos(query.data);
        });
    }, []);


    return (
        <Box>
            <Sidebar />
            <Stack direction={"column"} alignItems={"center"}>
                <Box
                    bgcolor={'cinza.light'}
                >
                    <Texto texto="Produtos" />
                    <DataGrid
                        rows={listaprodutos}
                        columns={colunas}
                        getRowId={(listaprodutos) => listaprodutos.idprod}
                        onCellClick={(rows) => {produto(rows.id)}}
                    />
                </Box>
            </Stack>
        </Box>
    );

}

export default Produtos