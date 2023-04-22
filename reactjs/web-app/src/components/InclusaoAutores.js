import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { inAxios } from "../config_axios";

const InclusaoAutores = () => {
  const { register, handleSubmit, reset } = useForm();

  const [aviso, setAviso] = useState("");

  const salvar = async (campos) => {
    try {
      const response = await inAxios.post("autores", campos);
      setAviso(`Ok! Autor cadastrado com código ${response.data.id}`);
      limparFormulario();
    } catch (error) {
      setAviso(`Erro...autor não cadastrado: ${error}`);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setAviso("");
    }, 5000);

    return () => clearTimeout(timer);
  }, [aviso]);

  const limparFormulario = () => {
    reset({
      nome: "",
    });
  };

  return (
    <div className="container">
      <h4 className="fst-italic mt-3">Inclusão de Autores</h4>
      <form onSubmit={handleSubmit(salvar)}>
        <div className="form-group">
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            className="form-control"
            id="nome"
            required
            autoFocus
            {...register("nome")}
          />
        </div>
        <input type="submit" className="btn btn-primary mt-3" value="Enviar" />
        <input
          type="reset"
          className="btn btn-danger mt-3 ms-3"
          value="Limpar"
        />
      </form>
      <div
        className={
          aviso.startsWith("Ok!")
            ? "alert alert-sucess"
            : aviso.startsWith("Erro:")
            ? "alert alert-danger"
            : ""
        }
      >
        {aviso}
      </div>
    </div>
  );
};

export default InclusaoAutores;
