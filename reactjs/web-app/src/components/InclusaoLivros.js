import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { inAxios } from "../config_axios";

//register serve para definir os nomes dos campos do formulário e validações
//handleSubmit serve para indicar o método a ser chamado quando o formulario for enviado pelo onSubmit
//reset, para atribuir um valor para os campos registrados (limpar os dados do formulário)
  const InclusaoLivros = () => {
  const { register, handleSubmit, reset } = useForm();

  const [aviso, setAviso] = useState("");
  const [autores, setAutores] = useState([]);
  const [editoras, setEditoras] = useState([]);

  useEffect(() => {
    const fetchAutoresEditoras = async () => {
      try {
        const [autoresResponse, editorasResponse] = await Promise.all([
          inAxios.get("autores"),
          inAxios.get("editoras"),
        ]);
        setAutores(autoresResponse.data);
        setEditoras(editorasResponse.data);
      } catch (error) {
        console.error("Erro ao buscar autores e editoras:", error);
      }
    };
    fetchAutoresEditoras();
  }, []);

  const salvar = async (campos) => {
    try {
      const response = await inAxios.post("livros", campos);
      setAviso(`Ok! Livro cadastrado com código ${response.data.id}`);
      limparFormulario();
    } catch (error) {
      setAviso(`Erro...livro não cadastrado: ${error}`);
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
      titulo: "",
      autor_id: "",
      editora_id: "",
      foto: "",
      ano: "",
      preco: "",
    });
  };

  return (
    <div className="container">
      <h4 className="fst-italic mt-3">Inclusão </h4>
      <form onSubmit={handleSubmit(salvar)}>
        <div className="form-group">
          <label htmlFor="titulo">Título:</label>
          <input
            type="text"
            className="form-control"
            id="titulo"
            required
            autoFocus
            {...register("titulo")}
          />
        </div>
        <div className="form-group mt-2">
                    <label htmlFor="autor_id">Autor:</label>
                    <select className="form-control" id="autor_id" required {...register("autor_id")}>
                        <option value="">Selecione um autor</option>
                        {autores.map(autor => (
                            <option key={autor.id} value={autor.id}>{autor.nome}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group mt-2">
                    <label htmlFor="editora_id">Editora:</label>
                    <select className="form-control" id="editora_id" required {...register("editora_id")}>
                        <option value="">Selecione uma editora</option>
                        {editoras.map(editora => (
                            <option key={editora.id} value={editora.id}>{editora.nome}</option>
                        ))}
                    </select>
                </div>
        <div className="form-group mt-2">
          <label htmlFor="foto">URL da foto:</label>
          <input
            type="url"
            className="form-control"
            id="foto"
            required
            {...register("foto")}
          />
        </div>
        <div className="row mt-2">
          <div className="col-sm-4">
            <div className="form-group">
              <label htmlFor="ano">Ano de Publicação:</label>
              <input
                type="number"
                className="form-control"
                id="ano"
                required
                {...register("ano")}
              />
            </div>
          </div>
          <div className="col-sm-8">
            <div className="form-group">
              <label htmlFor="preco">Preço R$:</label>
              <input
                type="number"
                className="form-control"
                id="preco"
                step="0.01"
                required
                {...register("preco")}
              />
            </div>
          </div>
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

export default InclusaoLivros;
