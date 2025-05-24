import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { GiTakeMyMoney, GiReceiveMoney, GiPayMoney } from "react-icons/gi";
import { RiSettings4Line } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineHeart } from "react-icons/ai";
import { FiFolder, FiShoppingCart } from "react-icons/fi";
import { CreateLoan } from "./CreateLoan";
import { PageLoands } from "../MyLoans/PageLoands";
import { PageDebts } from "../MyDebts/PageDebts";
import { MyLoans } from "../MyLoans/MyLoans";
import { Mydebts } from "../MyDebts/MyDebts";
import { CreateDebts } from "./CreateDebts";

export const SliderBar = () => {
  const [currentComponent, setCurrentComponent] = useState("default");
  const [open, setOpen] = useState(true);

  const menus = [
    { name: "Crear Prestamo", component: "create-loan", icon: GiTakeMyMoney },
    { name: "Crear Deuda", component: "create-debts", icon: GiTakeMyMoney },
    { name: "Mis Prestamos", component: "my-loans", icon: GiReceiveMoney },
    { name: "Mis Deudas", component: "debts", icon: GiPayMoney },
    { name: "Analisis", component: "analisis", icon: TbReportAnalytics, margin: true },
    { name: "File Manager", component: "file-manager", icon: FiFolder },
    { name: "Cart", component: "cart", icon: FiShoppingCart },
    { name: "Saved", component: "saved", icon: AiOutlineHeart, margin: true },
    { name: "Setting", component: "setting", icon: RiSettings4Line },
  ];

  const renderComponent = () => {
    switch (currentComponent) {
      case "create-loan":
        return <CreateLoan/>;
      case "create-debts":
        return <CreateDebts/>;
      case "my-loans":
        return <PageLoands/>;
      case "debts":
        return <PageDebts />;
      default:
        return <div className="m-3 text-xl text-gray-900 font-semibold">
          <MyLoans/>
          <div className="mt-8"></div>
          <Mydebts/>
        </div>;
    }
  };

  return (
    <section className="flex gap-6">
      <div
        className={` bg-dark-tremor-background-muted min-h-screen ${
          open ? "w-72" : "w-16"
        } duration-500 text-gray-100 px-4`}
      >
        <div className="py-3 flex justify-end">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {menus.map((menu, i) => (
            <div
              key={i}
              onClick={() => setCurrentComponent(menu.component)}
              className={`${
                menu.margin && "mt-5"
              } group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md cursor-pointer`}
            >
              <div>{React.createElement(menu.icon, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {menu.name}
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
              >
                {menu.name}
              </h2>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-grow m-3 text-xl text-gray-900 font-semibold">
        {renderComponent()}
      </div>
    </section>
  );
};
