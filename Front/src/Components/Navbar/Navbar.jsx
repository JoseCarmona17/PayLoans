import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";


export const Navbar = () => {
  const { state } = useLocation();
  const location = useLocation();
  const navigate = useNavigate();

  console.log(state);

  const onlogout = () => {
    navigate('/', {
      replace: true,
    });
  };

  return (
    <>
      <header className="flex items-center justify-between mb-3">
        <h1 className="ml-3 mt-1 text-xl">
          <Link to="/" className="font-bold ">PayLoad</Link>
        </h1>

        {
          state?.logged ? (
            <div className="flex">
              <span className="mr-4 mt-3">{state?.name}</span>
              <button className="ml-4 mr-4 mt-2 inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white" onClick={onlogout}>Cerrar Sesíon</button>
            </div>
          ) : (
            // Ocultar los enlaces si estamos en la página de login
            location.pathname !== "/login" && location.pathname !== "/register" && (
              <nav>
                <Link className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white" to="/login">Iniciar Sesión</Link>
                <Link className="ml-4 mr-4 mt-2 inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white" to="/register">Registrarse</Link>
              </nav>
            )
          )
        }
      </header>
      <Outlet />
    </>
  );
};
