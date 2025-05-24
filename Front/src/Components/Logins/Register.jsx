import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../Hook/useForm";

export const Register = () => {
  const navigate = useNavigate();
  const { name, email, password, onInputChange, onResetForm } = useForm({
    name: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);

  const onRegister = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Error en el registro');
        return;
      }

      // Registro exitoso
      navigate('/boardpage', {
        replace: true,
        state: {
          logged: true,
          user: data.user,
        }
      });

      onResetForm();

    } catch (err) {
      setError('Error en la conexión al servidor');
      console.error(err);
    }
  };

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <>
      <div className="flex w-full h-screen">
        <div className="w-full flex items-center justify-center">
          <section className="bg-white px-10 py-20 rounded-3xl border-2 border-gray-100">
            <h1 className="text-5xl font-semibold">Registro</h1>
            <p className="font-medium text-lg text-gray-500 mt-4">Ingrese sus datos</p>
            <form onSubmit={onRegister} action="">
              <div className="mt-4">
                <label htmlFor="name" className="text-lg font-medium">Nombre</label>
                <input
                  className="w-full border-2 border-gray-100 rounded-xl p-2 mt-1 bg-transparent"
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={onInputChange}
                  required
                  autoComplete="off"
                  placeholder="Ingrese su Nombre"
                />
              </div>

              <div>
                <label htmlFor="email" className="text-lg font-medium">Email</label>
                <input
                  className="w-full border-2 border-gray-100 rounded-xl p-2 mt-1 bg-transparent"
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={onInputChange}
                  required
                  autoComplete="off"
                  placeholder="Ingrese Email"
                />
              </div>

              <div>
                <label htmlFor="password" className="text-lg font-medium">Contraseña</label>
                <input
                  className="w-full border-2 border-gray-100 rounded-xl p-2 mt-1 bg-transparent"
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={onInputChange}
                  required
                  autoComplete="off"
                  placeholder="Ingrese Contraseña"
                />
              </div>

              {error && (
                <div className="mt-2 text-red-600 font-semibold">
                  {error}
                </div>
              )}

              <div className="mt-4 flex flex-col gap-y-2">
                <button
                  type="submit"
                  className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-3 rounded-xl bg-violet-500 text-white text-lg font-bold"
                >
                  Registrarse
                </button>
              </div>

              <div className="mt-4 flex justify-center items-center">
                <p className="font-medium text-base">¿Ya tienes cuenta?</p>
                <button className="text-violet-500 text-base font-medium ml-2" onClick={goToLogin}>Iniciar Sesión</button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </>
  );
};
