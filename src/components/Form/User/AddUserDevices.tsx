"use client";

import { CreateDeviceDto, DeviceDto } from "@/types/device";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import { GridColDef, GridRowId, GridRowSelectionModel } from "@mui/x-data-grid";

import React from "react";
import CustomModalButtons from "@/components/Modal/Buttons/CustomModalButtons";
import { useQuery } from "@/utils/requests/getSwr";
import { LoadingData } from "@/components/Loading/LoadingData";
import { NoData } from "@/components/Error/NoData";
import StatusButton from "@/components/Button/StatusButton";

const columns: GridColDef[] = [
    {
        field: "pid",
        headerName: "Device Pid",
        // minWidth: 350,
        flex: 1,
        // filterable: false,
        // resizable: true,
        headerAlign: "left",
        // align: 'center',
      },
      {
        field: "name",
        headerName: "Device Name",
        // minWidth: 350,
        flex: 1,
        // filterable: false,
        // resizable: true,
        headerAlign: "left",
        // align: 'center',
      },
      {
        field: "description",
        headerName: "Description",
        // minWidth: 350,
        flex: 1,
        // filterable: false,
        // resizable: true,
        headerAlign: "left",
        // align: 'center',
      },
      {
        field: "status",
        headerName: "State",
        // minWidth: 350,
        flex: 1,
        // filterable: false,
        // resizable: true,
        headerAlign: "left",
        // align: 'center',
        renderCell: StatusButton,
      },
  ];

type AddUserDevicesFormProps = {
  activeDevices: GridRowId[];
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onSelectItem: (newState: GridRowSelectionModel) => void;
  handleClose: () => void;
};

export default function AddUserDevicesForm({
  activeDevices,
  handleSubmit,
  onSelectItem,
  handleClose,
}: AddUserDevicesFormProps) {
    const urlGetDevices = `devices`;
  const {
    data: devices,
    isLoading: devicesLoading,
    error: devicesError
  } = useQuery<DeviceDto[]>(urlGetDevices);

    //Ocorreu um erro
    if (devicesError) {
        return <NoData text="Error fetching data!!"/>;
      }
    
      //A carregar os dados
      if (devicesLoading) {
        return <LoadingData/>;
      }

  //Quando uma linha é selecionada
  const onRowsSelectionHandler = (pids: GridRowSelectionModel) => {
    //If de prevenção devido ao método find poder retornar null
    if (pids !== undefined) {
      onSelectItem(pids);
    }
  };

  return (
    <form className="w-full flex flex-col space-y-6" onSubmit={handleSubmit}>
    <div className="lg:w-[900px] md:w-[600px] w-[300px] h-80 overflow-auto">
      <DataGrid
        rows={devices}
        // loading={irrigationPlanTypes.length === 0} //Loading enquanto os dados estão a ser carregados
        columns={columns}
        getRowId={(row: DeviceDto) => row.pid}
        pageSizeOptions={[2]}
        // autoHeight
        // hideFooter
        hideFooterSelectedRowCount
        checkboxSelection // Mostra as checkbox
        disableColumnMenu // Deixa de mostrar os 3 pontos (icon de opções)
        disableColumnSelector
        // onRowClick={(rowData) => onClickRow(rowData.row)}
        onRowSelectionModelChange={(pids) => onRowsSelectionHandler(pids)}
        rowSelectionModel={activeDevices}
        // getRowClassName={(params) => `super-app-theme--${params.row.status}`}
        sx={{
          width: "100%",
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
            backgroundColor: "var(--main-white-primary-color)",
            cursor: "pointer",
          },
          //Altera a cor das linhas ao fazer hover
          ".MuiDataGrid-row:hover": {
            backgroundColor: "var(--main-grey-secondary-color)",
            // color: "red"
          },
          //Altera a cor da linha selecionada
          ".MuiDataGrid-row.Mui-selected": {
            backgroundColor: "var(--input-border-bottom-green-primary-color)",
          },
          //Altera a cor da linha selecionada ao fazer hover
          ".MuiDataGrid-row.Mui-selected:hover": {
            backgroundColor: "var(--input-border-bottom-green-primary-color)",
          },
          //Altera a cor da checkbox
          "& .Mui-checked": {
            color: "var(--main-white-primary-color) !important",
          },
          //Altera o header do datagrid
          ".MuiDataGrid-columnHeaders": {
            backgroundColor: "var(--input-border-bottom-blue-primary-color)",
            fontSize: "1.1em",
            color: "var(--main-white-primary-color)",
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
            color: "var(--main-white-primary-color)",
          },
          // Para as linhas pares terem uma cor e as linhas impares outras
          // '& .MuiDataGrid-row':{
          //   '&:nth-child(2n)':{
          //     backgroundColor: 'rgba(235,235,235,0.7)'
          //   }
          // }
        }}
      />
    </div>
    <CustomModalButtons handleClose={handleClose} />
    </form>
  );
}
