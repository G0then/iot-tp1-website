import { useState } from "react";
import styles from "./NumberInput.module.css";

type CreateSubscriptionNumberInputProps = {
  name: string;
  description?: string;
  value: number | undefined;
  maxValue?: number;
  minValue?: number;
  intervalValue: number;
  onChangeValue: (e: number | undefined) => void;
  onRemove?: () => void;
};

export const ChartOptionsNumberInput = ({
  name,
  description,
  value,
  maxValue,
  minValue,
  intervalValue,
  onChangeValue,
}: CreateSubscriptionNumberInputProps) => {
  const [valueNumberInput, setValueNumberInput] = useState<number | undefined>(
    value
  );

  //Handler do botão de incremento
  const incrementButtonHandler = () => {
    //Se o valor for undefined faz a soma do valor atual com o intervalo de incremento
    //Se o valor for zero, o novo valor vai ser zero+intervalo de incremento, ou seja, vai ser o intervalo de incremento    
    (valueNumberInput || valueNumberInput===0)  &&
    inputHandler(
      (maxValue || maxValue===0)
        ? valueNumberInput + intervalValue <= maxValue
          ? valueNumberInput + intervalValue
          : maxValue
        : valueNumberInput + intervalValue
    );
  };

  //Handler do botão de decremento
  const decrementButtonHandler = () => {
    //Se o valor não for undefined faz a subtração do valor atual com o intervalo de decremento (ou igual o valor a zero, caso a conta dê menor que zero)
    (valueNumberInput || valueNumberInput===0)  &&
      inputHandler(
        (minValue || minValue===0)
          ? valueNumberInput - intervalValue >= minValue
            ? valueNumberInput - intervalValue
            : minValue
          : valueNumberInput - intervalValue
      );
  };

  //Handler do input
  const inputHandler = (numberInput: number) => {
    const newValue = Number(numberInput.toFixed(3));
    setValueNumberInput(newValue); //Atualiza o state e faz rerender da página
    onChangeValue(newValue); //Altera no state do plano de rega
  };

  return (
    <div className={styles.numberInputContainter}>
      <div className={styles.mainDataContainer}>
          <div className={styles.textContainer}>
            <p className={styles.title}>{name}</p>
            {description && <p className={styles.description}>{description}</p>}
          </div>
      </div>
      <div className={styles.inputContainer}>
        <a className={styles.buttonInput} onClick={decrementButtonHandler}>
          -
        </a>
        <input
          className={styles.numberInput}
          type="number"
          value={valueNumberInput?.toString() ?? 1} //Converto para string para retirar os zeros à esquerda do numero
          min={1}
          step={intervalValue}
          onChange={(e) =>
            inputHandler(
              e.target.value == ""
                ? minValue && minValue > 0
                  ? minValue
                  : 0
                : (minValue || minValue===0) && +e.target.value < minValue
                ? minValue
                : (maxValue || maxValue===0) && +e.target.value > maxValue
                ? maxValue
                : +e.target.value
            )
          }
        />
        <a className={styles.buttonInput} onClick={incrementButtonHandler}>
          +
        </a>
      </div>
    </div>
  );
};
