import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { updateCustomChartConfigByMutating } from "../../../utils/chart/UpdateChart/Settings";
import { BarChartOptionsForm } from "./ChartTypeOptionsForms/Bar/BarChartOptionsForm";
import { LineChartOptionsForm } from "./ChartTypeOptionsForms/Line/LineChartOptionsForm";
import styles from "./ModalOptions.module.css";
import { Bar, Line } from "react-chartjs-2";
import CustomModal from "@/components/Modal/CustomModal";

type CustomChartOptionsModalProps = {
  chartRef: any | null;
  chartType: any;
  onClose: Dispatch<SetStateAction<boolean>>;
};

export const CustomChartOptionsModal = ({
  chartRef,
  chartType,
  onClose,
}: CustomChartOptionsModalProps) => {
  const [newOptions, setNewOptions] = useState<any>(null);

  //Quando o state das novas configurações é alterado, as configurações do gráficos são alteradas pelas novas 
  useEffect(() => {
    updateCustomChartConfigByMutating(chartRef.current, newOptions); //Atualiza as opções do gráfico
  }),[newOptions];

  //Handler do botão
  const handleConfirmBtn = () => {
    updateCustomChartConfigByMutating(chartRef.current, newOptions); //Atualiza as opções do gráfico novamente (APENAS PARA CONFIRMAR POIS NÃO É NECESSÁRIO)
    onClose(false);
  };

  //Callback assegura que a função que altera o state tem a mesma referência
  const handleChangeNewOptions = useCallback((options: any) => setNewOptions(options), [])
  
  return (
    <CustomModal
      title={"Opções de Visualização"}
      description={"Personalize o gráfico"}
      open={true}
      handleClose={() => onClose(false)}
    >
      <div className={styles.modalContent}>
        <div className={styles.mainContainer}>
          <div className={styles.detailsDataContainer}>
            {/* <p>Crie a sua condição para o evento ocorrer</p> */}
            {chartType === Line ? <LineChartOptionsForm
              handleChangeNewOptions={handleChangeNewOptions}
              chartRef={chartRef} />
            : chartType === Bar && <BarChartOptionsForm
            handleChangeNewOptions={handleChangeNewOptions}
            chartRef={chartRef}
            />}
          </div>
        </div>
      </div>
      <div className={styles.modalActions}>
        <div className={styles.actionsContainer}>
          <button
            className={styles.addBtn}
            onClick={() => handleConfirmBtn()}
            // disabled={isLoadingRequests}
          >
            Voltar
          </button>
          {/* <button className={styles.cancelBtn} onClick={() => onClose(false)}>
            Cancelar
          </button> */}
        </div>
      </div>
    </CustomModal>
  );
};
