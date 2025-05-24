import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../Hook/useForm";

export const Login = () => {
    const navigate = useNavigate();
    const { email, password, onInputChange, onResetForm } = useForm({
        email: '',
        password: '',
    });

    const [error, setError] = useState(null);

    const onLogin = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                // Si hubo error (400, 401, etc)
                setError(data.message || 'Error en el login');
                return;
            }

            // Login exitoso
            localStorage.setItem('user', JSON.stringify(data.user));
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

    const goToRegister = () => {
        navigate('/register');
    };

    const goToForgottenPass = () => {
        navigate('/forgotten');
    };

    return (
        <>
            <div className="flex w-full h-screen">
                <div className="w-full flex items-center justify-center">
                    <section className="bg-white px-10 py-20 rounded-3xl border-2 border-gray-100">
                        <h1 className="text-5xl font-semibold">Bienvenido</h1>
                        <p className="font-medium text-lg text-gray-500 mt-4">Iniciar Sesión</p>
                        <form onSubmit={onLogin} action="">
                            <div className="mt-4">
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

                            <div className="mt-4 flex justify-between items-center">
                                <div>
                                    <input type="checkbox" id="remember" />
                                    <label className="ml-2 font-medium text-base" htmlFor="remember">Recordar</label>
                                </div>
                                <button className="ml-3 font-medium text-base text-violet-500" onClick={goToForgottenPass}>Olvidé la contraseña</button>
                            </div>

                            <div className="mt-4 flex flex-col gap-y-4">
                                <button
                                    type="submit"
                                    className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-3 rounded-xl bg-violet-500 text-white text-lg font-bold"
                                >
                                    Iniciar Sesión
                                </button>
                            </div>

                            <div className="mt-8 flex justify-center items-center">
                                <p className="font-medium text-base">¿No tienes cuenta?</p>
                                <button className="text-violet-500 text-base font-medium ml-2" onClick={goToRegister}>Registrarse</button>
                            </div>
                        </form>
                    </section>
                </div>
            </div>
        </>
    );
};
