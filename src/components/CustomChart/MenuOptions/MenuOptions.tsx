import { exportToExcel } from "@/utils/excel/exportToExcel";
import { DateTime } from "luxon";
import { useState } from "react";
import { BiDownload, BiFullscreen, BiZoomIn, BiZoomOut } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineZoomOutMap } from "react-icons/md";
import { RiFileExcel2Fill } from "react-icons/ri";
import { shoudShowChartConfigOption } from "../../../utils/chart/Permissions/shouldShowChartConfigOptions";
import { chartDateTypeFormatDto } from "../../../utils/objects/chartTypeData";
import { showToastMessage } from "../../Notification/Notification";
import { CustomChartOptionsModal } from "../ModalOptions/ModalOptions";
import styles from "./MenuOptions.module.css";

export type CustomChartOptionsMenuProps = {
  chartRef: any | null;
  chartType: any;
  timeFormat:chartDateTypeFormatDto,
  handleFullScreen: () => void;
  disableChartButtons?: boolean;
  children?: React.ReactNode;
};

export const CustomChartOptionsMenu = ({
  chartRef,
  chartType,
  timeFormat,
  handleFullScreen,
  disableChartButtons,
  children,
}: CustomChartOptionsMenuProps) => {
  const [showOptionsModal, setShowOptionsModal] = useState<boolean>(false);

  //Handler do botão de reset do zoom
  const handleResetZoom = () => {
    if (chartRef && chartRef.current) {
      chartRef.current.resetZoom();
    }
  };

  //Handler do botão para download da imagem do gráfico
  const handleDownloadChart = () => {
    //O if serve para evitar erros quando o chartRef.current não é válido, ou seja, quando o mesmo não tem dados
    if (chartRef.current) {
      const link = document.createElement("a"); //Cria um elemento <a>
      link.download = "chart.png"; //Nome do ficheiro
      link.href = chartRef.current.toBase64Image(); //Converte para imagem
      // Trigger the download
      link.click();
      showToastMessage("Imagem descarregada com sucesso");
    }else{
      showToastMessage("Erro! Verifique se o gráfico tem dados.", "error");
    }
  };

  //Handler do botão para download do ficheiro excel
  const handleDownloadExcel = () => {
    //O if serve para evitar erros quando o chartRef.current não é válido, ou seja, quando o mesmo não tem dados
    if (chartRef.current) {
      const todayStringFormatted = DateTime.fromJSDate(new Date()).toFormat("dd_LL_yyyy T") //Converte a data atual para a string com o formato indicado
      const datasets = chartRef.current.config.data.datasets; //Obtem o array com os datasets presentes no gráficos

      if(datasets.length === 0){
        showToastMessage("Não existem dados para descarregar", "info");
        return;
      }

      const highNumberOfDates = datasets.reduce(
        (p: any, c: any, i: any, a: any) => (a[p].length > c.length ? p : i),
        0
      );

      if(datasets[highNumberOfDates].data.length === 0){
        showToastMessage("Não existem dados para descarregar", "info");
        return;
      }


      let rows = []; //Cria um array vazio que vai ser usado para guardar os dados a serem descarregados
      //Loop que corre conforme o número de dados existentes por dataset no gráfico
      for (let i = 0; i < datasets[highNumberOfDates].data.length; i++) {
        let obj = {} 
        datasets.map((dataset: any) => {
          obj = {...obj, 
            [`Data (${dataset.label})`]: dataset.data[i] ? DateTime.fromJSDate(dataset.data[i].x).toFormat(timeFormat.format) : "", 
            [dataset.label]: dataset.data[i] ? dataset.data[i].y : ""} //Adiciona ao objeto um novo campo em que a key é o nome do device, telemetria... e o valor é o valor do dado
        });
        rows.push(obj); //Adiciona o objeto ao json com os dados a enviar
      }

      exportToExcel(rows, `Dados Gráfico (${todayStringFormatted})`); //Exporta o ficheiro com os dados
      showToastMessage("Dados descarregados com sucesso");
    }else {
      showToastMessage("Erro! Verifique se o gráfico tem dados.", "error");
    }
  };

  //Handler do botão para download da imagem para PDF
  //Deixei de usar porque a resolução das imagens estava má e ainda não existia solução nos fóruns
  //  const handleDownloadChartToPDF = () => {
  //   const canvasImage = chartRef.current.toBase64Image(); //

  //   const pdf = new jsPDF('landscape');
  //   pdf.setFontSize(20);
  //   pdf.addImage(canvasImage, 'JPEG', 15, 15, 270, 120);
  //   // pdf.text(15, 15, "Texto de teste")
  //   pdf.save("chart.pdf")
  // }

  //Handler dos botões de zoom
  //O value pode tomar valores como 0.9, 1.1... Sendo que o 0.9 significa um zoom out de 10% e o valor 1.1 um zoom in de 10%
  const handleZoomButton = (value: number) => {
    if (chartRef && chartRef.current) {
      chartRef.current.zoom(value);
    }
  };

  //Retorna gráfico
  return (
    <>
      <div className={styles.chartMenu}>
        <div className={styles.chartOptionsContainer}>
          {children && children}
        </div>
        {!disableChartButtons && (
          <div className={styles.chartButtonsContainer}>
            <a className={styles.button} onClick={() => handleZoomButton(1.1)}>
              <BiZoomIn />
            </a>
            <a className={styles.button} onClick={() => handleZoomButton(0.9)}>
              <BiZoomOut />
            </a>
            <a className={styles.button} onClick={handleResetZoom}>
              <MdOutlineZoomOutMap />
            </a>
            <a className={styles.button} onClick={() => handleFullScreen()}>
              <BiFullscreen />
            </a>
            <a className={styles.button} onClick={handleDownloadChart}>
              <BiDownload />
            </a>
            <a className={styles.button} onClick={handleDownloadExcel}>
              <RiFileExcel2Fill />
            </a>
            {shoudShowChartConfigOption(chartType) && <a
              className={styles.button}
              onClick={() => setShowOptionsModal(true)}
            >
              <IoSettingsOutline />
            </a>}
          </div>
        )}
        {showOptionsModal && (
          <CustomChartOptionsModal
            chartRef={chartRef}
            chartType={chartType}
            onClose={() => setShowOptionsModal(false)}
          />
        )}
      </div>
    </>
  );
};
