"use client";

import { useEffect, useState } from "react";
import { Users, Store, Package, TrendingUp } from "lucide-react";

export default function MasterDashboard() {
  const [stats, setStats] = useState({
    total_users: 0,
    total_lojas: 0,
    total_produtos: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Busca as estatísticas da API Python Flask rodando na porta 5000
    const fetchStats = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/master/estatisticas");
        if (!response.ok) {
          throw new Error("Erro ao carregar os dados da API Flask (verifique se a API está rodando em http://127.0.0.1:5000).");
        }
        const data = await response.json();
        setStats(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Painel Master (Administração Central)</h1>
        <p className="text-gray-500 mt-2">Visão geral do ecossistema SaaS de lojas cadastradas na plataforma.</p>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-md mb-6 shadow-sm">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-500">Conectando ao Flask API...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Total de Lojas Ativas</p>
              <h3 className="text-4xl font-bold text-gray-800">{stats.total_lojas}</h3>
            </div>
            <div className="p-4 bg-blue-100 text-blue-600 rounded-full">
              <Store size={28} />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Total de Usuários</p>
              <h3 className="text-4xl font-bold text-gray-800">{stats.total_users}</h3>
            </div>
            <div className="p-4 bg-purple-100 text-purple-600 rounded-full">
              <Users size={28} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Total de Produtos</p>
              <h3 className="text-4xl font-bold text-gray-800">{stats.total_produtos}</h3>
            </div>
            <div className="p-4 bg-green-100 text-green-600 rounded-full">
              <Package size={28} />
            </div>
          </div>
        </div>
      )}

      <div className="mt-10 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Prósximos Passos (Ações do Super Admin)</h2>
        <div className="flex flex-wrap gap-4">
          <button className="bg-blue-600 text-white px-5 py-2.5 rounded-md font-medium hover:bg-blue-700 transition shadow-sm">
            Ver Lista Detalhada de Lojas
          </button>
          <button className="bg-gray-50 text-gray-700 border border-gray-200 px-5 py-2.5 rounded-md font-medium hover:bg-gray-100 transition shadow-sm">
            Gerenciar Lojistas
          </button>
        </div>
      </div>
    </div>
  );
}
