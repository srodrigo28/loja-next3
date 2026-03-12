
import { Users, DollarSign, Wallet } from "lucide-react";
import { StatCard } from "./stats-card";

export async function Stats() {

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-3 mb-6">

      <StatCard
        title="Estoque"
        description="Produtos disponíveis"
        icon={<Users className="w-8 h-8 text-blue-400" />}
        value={22500}
      />

      <StatCard
        title="Total recebido"
        description="Quantidade total recebida"
        icon={<DollarSign className="w-8 h-8 text-amber-500" />}
        value={2000}
      />

      <StatCard
        title="Saldo em conta"
        description="Saldo pendente"
        icon={<Wallet className="w-8 h-8 text-green-500" />}
        value={18500}
      />

    </div>
  );
}