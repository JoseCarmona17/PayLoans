
import { DonutLoans } from "./DonutLoans"
import { LoansList } from "./LoansList"
import { MyLoans } from "./MyLoans"

export const PageLoands = () => {
  return (
    <div>
        <h1 className="text-center mb-4">Mis prestamos</h1>
        <div className="flex">
          <MyLoans/>
          {/* <DonutLoans/> */}
        </div>
        <LoansList/>
    </div>
  )
}
