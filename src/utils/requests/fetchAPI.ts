const api = "http://localhost:8080"; //Url da API do servidor

//Função que faz o pedido à API
// Nota: o parâmetro insideData é apenas utilizado quando a resposta ao pedido vem dentro de um objeto data (usado no react admin)
export const fetchAPI = async <T>(
    url: string,
    { headers: optionalHeaders = undefined, ...options }: any
  ) => {
    const headers = { ...optionalHeaders };
  
    //TODO: colocar o fetch dentro de um try and catch???? Porque quando o bakckend está desligado, o 
    //Faz o pedido com o header definido anteriormente e o body(...) que é passado nas options
    const res = await fetch(`${api}/${url}`, {
      ...options,
      headers: headers,
    }).catch(() => {
      throw { Type: "Erro", Status: 503, ErrorMsg: "O servidor encontra-se com problemas!" }; //Se não for obtida nenhuma resposta do servidor, este objeto de erro é enviado como throw
    });
  
    //Se existir um erro na resposta do servidor, retorna o erro
    if (!res.ok) {
       throw new Error("Failed to fetch data");
    }
  
    return await res.json() as T;
  };