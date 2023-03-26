import { useCallback, useState } from "react";
import { fetchAPI } from "./fetchAPI";

//Formato que as options têm que obedecer
type UrlPostOptionsType = {
  method: string;
  contentType?: string;
};

//Declaração da função
export const useRequest = <BodyType, ResponseType>(options?: UrlPostOptionsType) => {
  //Hooks (useState): isLoading é a variável e o setIsLoading a função que atua sobre a variável.
  const [isLoadingRequest, setIsLoading] = useState<boolean>(false);
  const [errorRequest, setError] = useState<any>(null);

  //Caso receba options, associa o method recebido das obtions à const method
  const { method, contentType } = options || {};

  //Hooks (useCallback) que é assincrono e recebe como parâmetros o body
  //A função callback não vai fazer render dos componentes todas as vezes que é chamada.
  //Neste caso apenas faz render novamente se o content-type ou method recebido for diferente do anterior
  const request = useCallback(
    async (
      url: string,
      body?: BodyType,
      specifyContentType: boolean = true,
      shouldStringify: boolean = true
    ) => {
      setError(null); //Não existe erro
      setIsLoading(true); //A variável isLoading passa a true

      //Definição do content-type
      const headers: HeadersInit = {
        "Content-Type": contentType || "application/json",
      };

      //Se a variável specifyContentType for false, o content-type é eliminado dos headers
      if (!specifyContentType) {
        delete headers["Content-Type"];
      }

      //Cria o content que contém o method, headers (content-type) e body
      //Se não for especificado um body, o mesmo vai como undefined
      //Se o shouldStringify estiver a true (default), o body é convertido para string, caso contrário é enviado como objeto.
      const content = {
        method: method || "POST",
        headers,
        body: body
          ? shouldStringify
            ? JSON.stringify(body)
            : body
          : undefined,
      };

      //Definição do pedido
      try {
        const response  = await fetchAPI<ResponseType>(url, content);

        return response; //Retorna o JSON
      } catch (error) {
        // console.log(error);
        setError(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [contentType, method]
  );

  return { request, isLoadingRequest, errorRequest }; //Retorna o resultado em JSON do callback e a variável isLoading
};
