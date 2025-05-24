import { DebtsList } from "./DebtsList"
import { DonutDebts } from "./DonutDebts"
import { Mydebts } from "./MyDebts"

export const PageDebts = () => {
  return (
    <div>
    <h1 className="text-center mb-4">Mis Deudas</h1>
      <div className="flex">
        <Mydebts/>
        {/* <DonutDebts/> */}
      </div>
      <DebtsList/>
    </div>
  )
}
