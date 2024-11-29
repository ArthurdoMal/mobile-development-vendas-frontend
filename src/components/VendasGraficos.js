import { useEffect, useState } from "preact/hooks";
import { Line, Bar } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";


ChartJS.register(LineElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const VendasGraficos = () => {
  const [linhaDados, setLinhaDados] = useState(null);
  const [barraDados, setBarraDados] = useState(null);
nk
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("URL_DA_API");
        const data = response.data;

        const meses = data.map((item) => item.mes);
        const custos = data.map((item) => item.custo);
        const vendas = data.map((item) => item.venda);
        const compradas = data.map((item) => item.comprada);
        const vendidas = data.map((item) => item.vendida);

        setLinhaDados({
          labels: meses,
          datasets: [
            {
              label: "Custo Total",
              data: custos,
              borderColor: "rgba(255, 99, 132, 1)",
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              fill: true,
            },
            {
              label: "Venda Total",
              data: vendas,
              borderColor: "rgba(54, 162, 235, 1)",
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              fill: true,
            },
          ],
        });

        setBarraDados({
          labels: meses,
          datasets: [
            {
              label: "Quantidade Comprada",
              data: compradas,
              backgroundColor: "rgba(75, 192, 192, 0.5)",
            },
            {
              label: "Quantidade Vendida",
              data: vendidas,
              backgroundColor: "rgba(153, 102, 255, 0.5)",
            },
          ],
        });
      } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Visualização de Vendas</h1>
      {linhaDados && (
        <div>
          <h2>Gráfico de Linha</h2>
          <Line data={linhaDados} />
        </div>
      )}
      {barraDados && (
        <div>
          <h2>Gráfico de Barras</h2>
          <Bar data={barraDados} />
        </div>
      )}
    </div>
  );
};

export default VendasGraficos;
