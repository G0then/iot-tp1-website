import { DataGrid, GridColDef, GridRowId } from '@mui/x-data-grid';
import React from 'react'

type TableProps = {
    rows: any[];
    columns: GridColDef[];
    pageSize?: number;
    getRowId: (row: any) => GridRowId;
}

//Construção do objeto default
const defaultTableProps: TableProps = {
    rows: [],
    columns: [],
    pageSize: 5,
    getRowId: (row) => row.id.$oid
  }

export default function Table(props: TableProps) {
  const resolvedProps = {...defaultTableProps, ...props};

  const { rows, columns, pageSize, getRowId } = resolvedProps

  return (
    <div className="min-h-full w-full">
    <DataGrid
      rows={rows}
      // loading={irrigationPlanTypes.length === 0} //Loading enquanto os dados estão a ser carregados
      columns={columns}
      getRowId={getRowId}
      initialState={{
          pagination: {
            paginationModel: {
              pageSize: pageSize,
            },
          },
        }}
      autoHeight
      disableRowSelectionOnClick
      // // hideFooter
      // hideFooterSelectedRowCount
      // checkboxSelection // Mostra as checkbox
      // disableColumnMenu // Deixa de mostrar os 3 pontos (icon de opções)
      // disableColumnSelector
      // onRowClick={(rowData) => onClickRow(rowData.row)}
      // getRowClassName={(params) => `super-app-theme--${params.row.status}`}
      sx={{
        width: '100%',
        boxShadow: 2,
        border: 0,
        // overflowX: "scroll",
        // overflowY: "scroll",
        //Remove os separadores de colunas
        ".MuiDataGrid-columnSeparator": {
          display: "none",
        },
        //Retira as borders do datagrid
        ".MuiDataGrid-root": {
          border: "none",
        },
        //Remove as linhas azuis que apareciam ao clicar na tabela
        "& .MuiDataGrid-columnHeader,  .MuiDataGrid-cell,  .MuiDataGrid-cellCheckbox":
          {
            border: 0,
            ":focus-within": {
              outline: "none",
            },
          },
        //Altera a cor das linhas
        ".MuiDataGrid-row": {
          backgroundColor: "var(--color-white)",
          cursor: "pointer",
          textAlign: "center"
        },
        // //Altera a cor das linhas ao fazer hover
        // ".MuiDataGrid-row:hover": {
        //   backgroundColor: "red",
        //   // color: "red"
        // },
        // //Altera a cor da linha selecionada
        // ".MuiDataGrid-row.Mui-selected": {
        //   backgroundColor:
        //     "green",
        // },
        // //Altera a cor da linha selecionada ao fazer hover
        // ".MuiDataGrid-row.Mui-selected:hover": {
        //   backgroundColor:
        //     "green",
        // },
        // //Altera a cor da checkbox
        // "& .Mui-checked": {
        //   color: "white !important",
        // },
        //Altera o header do datagrid
        ".MuiDataGrid-columnHeaders": {
          backgroundColor:
            "var(--color-whiteDark-main)",
          fontSize: "1.1em",
          color: "black",
        },
        //Altera os titles dos headers
        ".MuiDataGrid-columnHeaderTitle": {
          fontWeight: "bold",
          overflow: "visible",
        },
        //Remove a checkbox all do header
        ".MuiDataGrid-columnHeaderCheckbox": {
          display: "none",
        },
        //Para alterar o botão do sort
        ".MuiDataGrid-sortIcon": {
          color: "black",
        },
        // Para as linhas pares terem uma cor e as linhas impares outras
        // '& .MuiDataGrid-row':{
        //   '&:nth-child(2n)':{
        //     backgroundColor: 'var(--color-white)'
        //   }
        // }
        //Altera o footer do datagrid
        ".MuiDataGrid-footerContainer": {
          backgroundColor:
            "var(--color-whiteDark-main)",
          fontSize: "1.1em",
          color: "black",
        },
      }}
    />
    </div>
  )
}
