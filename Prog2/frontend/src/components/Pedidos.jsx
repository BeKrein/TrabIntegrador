import React from "react";
import axios from "axios";
import { Box, Stack, Typography} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import Texto from "./Texto";
import Sidebar from "./Sidebar";


const colunas = [
    { field: "idp", headerName: "ID do pedido", width: 100},
    { field: "nome", headerName: "Nome do cliente", width: 200 },
    { field: "cpf", headerName: "CPF", width: 200 },
    { field: "datainicio", headerName: "Data de inicio", width: 200 },
    { field: "empresa", headerName: "Empresa", width: 200 },
]




function Pedidos(){

    const [idPedido,setIdPedido] = React.useState([2]);

    const navigate = useNavigate();

    function handleClick(id){
        setIdPedido(id);
        vaiProPedido(id);
    }

    function vaiProPedido(id){
        console.log(id);
        navigate("/pedido", { state: { idpVindo : id} });
    }   

    
    const [listaPedidos, setListaPedidos] = React.useState([]);

    React.useEffect(() => {
        let res = axios.get("/pedidos");
        res.then((query) => {
            setListaPedidos(query.data);
        });
    }, []);


    return (
        <Box>
            <Sidebar />
            <Stack direction={"column"} alignItems={"center"}>
                <Box
                    bgcolor={'cinza.light'}
                >
                    <Texto texto="Pedidos"/>
                    <DataGrid
                        rows={listaPedidos}
                        columns={colunas}
                        getRowId={(listaPedidos) => listaPedidos.idp}
                        onCellClick={(rows)=>{handleClick(rows.id)}}
                    />
                    <Typography variant="h6">Selecione o pedido clicando no mesmo</Typography>
                </Box>
            </Stack>
        </Box>
    );
}









export default Pedidos