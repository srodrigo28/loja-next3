import { Stats } from "./_components/analytics";
import Link from "next/link";
import { ListarProdutos } from "./_components/listarProdutos";
import { PlusIcon } from "lucide-react";

export default async function Dashboard() {

  return (
    <div className="p-4 relative">
      <section className="flex items-center justify-between mb-4 ">
    
        <div className="w-full flex items-center gap-2 justify-between">
          <h1 className="text-2xl font-semibold">Minha conta</h1>
          <Link href="dashboard/create">
          <div className="flex items-center gap-2">
            <button className="text-white flex items-center justify-center h-10 w-10 
            text-2xl px-3 py-1 rounded-full bg-green-400"><PlusIcon  /></button>
            <span className="text-sm text-gray-500 font-semibold">Adicionar produto</span>
          </div>
          </Link>
        </div>
      </section>

      <Stats />


      <h2 className="text-2xl font-semibold mb-2">Últimos registros</h2>
      <ListarProdutos />
    </div>
  );
}