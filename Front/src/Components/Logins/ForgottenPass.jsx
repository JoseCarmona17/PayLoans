import { useNavigate } from "react-router-dom";

export const ForgottenPass = () => {

    const navigate = useNavigate()

    const goToLogin = () => {
        navigate('/login');
    };

    return (

        <>
            <div className="flex w-full h-screen">
                <div className="w-full flex items-center justify-center">
                    <section className="bg-white px-10 py-20 rounded-3xl border-2 border-gray-100">
                        <h1 className="text-5xl font-semibold">Bienvenido</h1>
                        <p className="font-medium text-lg text-gray-500 mt-4">Recuperar Acceso</p>
                        <form action="">
                            <div className="mt-4">
                                <label htmlFor="" className="text-lg font-medium">Email</label>
                                <input
                                    className="w-full border-2 border-gray-100 rounded-xl p-2 mt-1 bg-transparent"
                                    type="text"
                                    placeholder="Ingrese Email"
                                />
                            </div>

                            <div>
                                <label htmlFor="" className="text-lg font-medium">Confirmar Email</label>
                                <input
                                    className="w-full border-2 border-gray-100 rounded-xl p-2 mt-1 bg-transparent"
                                    type="password"
                                    placeholder="Confirmar Email"
                                />
                            </div>

                            <div className="mt-4 flex flex-col gap-y-4">
                                <button className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-3 rounded-xl bg-violet-500 text-white text-lg font-bold">Recuperar Acceso</button>
                            </div>

                            <div className="mt-8 flex justify-center items-center">
                                <p className="font-medium text-base">¿Ya tienes cuenta?</p>
                                <button className="text-violet-500 text-base font-medium ml-2" onClick={goToLogin}>Iniciar Sesion</button>
                            </div>
                        </form>
                    </section>

                </div>

            </div>
        </>

    )
}
