import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useStore } from "../scripts/controlador-estados";

export default function CadastroPaciente() {
  const {
    armazenaName,
    armazenaWhatsapp,
    armazenaEmail,
    armazenaHasAvc,
    armazenaHasAnotherCondition,
    armazenaInvestmentAmount,
  } = useStore();
  const navigate = useNavigate();
  const trocarTela = () => navigate("/cadastroLocalizacao");
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // Armazenar dados no estado
    armazenaName(data.nome);
    armazenaEmail(data.email);
    armazenaWhatsapp(data.whatsapp);
    armazenaHasAvc(data.historicoAVCFamilia);
    armazenaHasAnotherCondition(data.outraCondicaoSaude);
    armazenaInvestmentAmount(data.valorInvestir);

    // Navegar para a próxima tela
    trocarTela();
  };

  return (
    <div className="bg-telaInicial min-h-screen bg-no-repeat bg-cover bg-center bg-fixed sm:max-w-full md:max-w-5xl lg:max-w-6xl xl:max-w-full">
      <div className="flex justify-center items-center h-screen font-poppins">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-cardPac h-cardPac p-12 bg-white flex flex-col gap-8 rounded-md sm:w-smFundoCard xm:w-xmFundoCard xm:h-xmHeightPaciente"
        >
          <label className="text-2xl font-bold">Informações do paciente</label>
          <div className="flex gap-6 xm:flex-col">
            <input
              id="nome"
              placeholder="Nome*"
              {...register("nome", {
                required: "Nome obrigatório",
              })}
              className={`outline-azulEscuro placeholder-gray-500 p-4 xm:w-full border h-14 rounded border-gray-400 mr-0.5 ${
                errors.nome ? "placeholder:text-red-500" : ""
              }`}
              type="text"
            />
            <input
              id="whatsapp"
              placeholder="whatsapp*"
              {...register("whatsapp", {
                required: "Número obrigatório",
              })}
              className={`outline-azulEscuro placeholder-gray-500 p-4 xm:w-full border h-14 rounded border-gray-400 mr-0.5 text-sm ${
                errors.whatsapp ? "placeholder:text-red-500" : ""
              }`}
              type="text"
            />
          </div>
          <input
            id="email"
            placeholder="Email*"
            className={`outline-azulEscuro placeholder-gray-500 p-6 border h-14 rounded border-gray-400 ${
              errors.email ? "placeholder:text-red-500" : ""
            }`}
            type="email"
            {...register("email", {
              required: "Email obrigatório",
            })}
          />
          <label className="text-2xl font-bold">Informações do AVC</label>
          <div className="flex gap-6 xm:flex-col">
            <Controller
              name="historicoAVCFamilia"
              control={control}
              defaultValue=""
              rules={{ required: "Por favor, selecione uma opção" }}
              render={({ field }) => (
                <select
                  {...field}
                  id="historicoAVCFamilia"
                  className={`outline-none border border-1 ${
                    errors.historicoAVCFamilia ? "text-red-500" : ""
                  }`}
                >
                  <option value="" disabled hidden>
                    Você tem AVC na familia?
                  </option>
                  <option value="sim">Sim</option>
                  <option value="nao">Não</option>
                </select>
              )}
            />
            {errors.historicoAVCFamilia && (
              <span className="text-red-500">
                {errors.historicoAVCFamilia.message}
              </span>
            )}
            <Controller
              name="valorInvestir"
              control={control}
              defaultValue=""
              rules={{ required: "Por favor, selecione um valor a investir" }}
              render={({ field }) => (
                <select
                  {...field}
                  id="valorInvestir"
                  className={`outline-none border border-1 ${
                    errors.valorInvestir ? "text-red-500" : ""
                  }`}
                >
                  <option value="" disabled hidden>
                    Não tenho valor para investir
                  </option>
                  <option value="R$ 500 a R$1000">R$ 500 a R$1000</option>
                  <option value="R$ 1000 a R$1500">R$ 1000 a R$1500</option>
                  <option value="R$ 1600 a R$2500">R$ 1600 a R$2500</option>
                  <option value="Acima de R$2500">Acima de R$2500</option>
                </select>
              )}
            />
            {errors.valorInvestir && (
              <span className="text-red-500">
                {errors.valorInvestir.message}
              </span>
            )}
          </div>
          <input
            id="outraCondicao"
            placeholder="Possui outra condição que não seja AVC? Qual?"
            className={`outline-azulEscuro placeholder-gray-500  p-4 border h-14 rounded border-gray-400 ${
              errors.outraCondicaoSaude ? "placeholder:text-red-500" : ""
            }`}
            type="text"
            {...register("outraCondicaoSaude", {
              required: "Campo obrigatório",
            })}
          />
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-32 h-10 delay-300 bg-corAzul hover:bg-azulEscuro ease-linear duration-300 font-bold text-white rounded"
            >
              Avançar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
