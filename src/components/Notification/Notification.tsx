"use client"

import { toast, ToastContainer } from "react-toastify";
import { Slide, Zoom, Flip, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Hook para mostrar notificação
//Recebe o texto a mostrar e o tipo da notificação e mostra a respectiva notificação
export const showToastMessage = (text: string, type?: string) => {
  switch (type) {
    case "success":
      toast.success(text, {
        // toastId: "005", //Prevent Multiple Toasts
        // transition: Slide,
      });
      break;

    case "error":
      toast.error(text, {
        // toastId: "005", //Prevent Multiple Toasts
        // transition: Slide,
      });
      break;

    case "warning":
      toast.warning(text, {
        // toastId: "005", //Prevent Multiple Toasts
      });
      break;

    case "info":
      toast.info(text, {
        // toastId: "005", //Prevent Multiple Toasts
      });
      break;

    default:
      toast.success(text, {
        // toastId: "005", //Prevent Multiple Toasts
        // transition: Slide,
      });
      break;
  }
};

//Componente de notificação customizado
export const ToastNotification = () => {
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      transition={Slide}
      draggablePercent={60}
      pauseOnFocusLoss={false}
      limit={3} //Número limite de notificações a aparecer ao mesmo tempo (As outras notificações aparecem conforme as que acabam)
      draggable
      pauseOnHover
    />
  );
};
