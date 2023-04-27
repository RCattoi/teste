import React, { useState, useCallback } from "react";

const useFetch = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  /**
   * Não precisa usar let se você não precisa reatribuir o valor da variavel
   * Nesse caso, pode declarar direto, usando const
   */
  const request = useCallback(async (url, options) => {
    let json 
    try {
      // não precisa definir o estado pra null se ele já é iniciado com o valor de null
      // setError(null);
      setLoading(true);
      const response = await fetch(url, options);
      json = await response.json();
      /**
       * Se der algum erro na requisição (vide status diferente da familia do 200) 
       * ele ja vai estourar no catch direto. Não precisa tratar isso no try
       * O try é só pra parte de sucesso da requisição
       */
      // if (response.ok === false) throw new Error(json.message);
    } catch (err) {
      // Não precisa definir o json como null se você nao vai usar ele depois.
      // json = null;
      setError(err.message);
      throw new Error(err.message);
    } finally {
      setData(json);
      setLoading(false);
      /**
       * Precisa desse retorno? 
       * Não entendi o intuito dele se o dado retornado ta sendo só o do estado
       */
      return { json };
    }
  }, []);

  return {
    data,
    loading,
    error,
    request,
  };
};

export default useFetch;
