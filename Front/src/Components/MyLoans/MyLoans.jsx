import { useEffect, useState } from 'react';
import { BarList, Card } from '@tremor/react';

const valueFormatter = (number) =>
  `${Intl.NumberFormat('us').format(number).toString()}`;

export const MyLoans = () => {
  const [loans, setLoans] = useState([]);
  const [extended, setExtended] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      setError('Usuario no autenticado');
      setLoading(false);
      return;
    }

    fetch(`http://localhost:3000/users/${user.id}/loans`)
      .then((res) => {
        if (!res.ok) throw new Error('Error al cargar préstamos');
        return res.json();
      })
      .then((data) => {
        // Suponiendo que data es un array de préstamos, cada uno con
        // { id, amount, description } o similar.
        // Adaptamos a la forma que usa BarList: { name, value }

        const formatted = data.map((loan) => ({
          name: loan.name || 'Préstamo',
          value: loan.amount || 0,
        }));

        setLoans(formatted);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="p-6">Cargando préstamos...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <Card className="p-0 sm:mx-auto sm:max-w-lg">
      <div className="flex items-center justify-between border-b border-tremor-border p-6 dark:border-dark-tremor-border">
        <p className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
          Mis Préstamos
        </p>
        <p className="text-tremor-label font-medium uppercase text-tremor-content dark:text-dark-tremor-content">
          Cantidad
        </p>
      </div>
      <div className={`overflow-hidden p-6 ${extended ? '' : 'max-h-[260px]'}`}>
        <BarList data={loans} valueFormatter={valueFormatter} />
      </div>

      <div
        className={`flex justify-center ${
          extended
            ? 'px-6 pb-6'
            : 'absolute inset-x-0 bottom-0 rounded-b-tremor-default bg-gradient-to-t from-tremor-background to-transparent py-7 dark:from-dark-tremor-background'
        }`}
      >
        <button
          className="flex items-center justify-center rounded-tremor-small border border-tremor-border bg-tremor-background px-2.5 py-2 text-tremor-default font-medium text-tremor-content-strong shadow-tremor-input hover:bg-tremor-background-muted dark:border-dark-tremor-border dark:bg-dark-tremor-background dark:text-dark-tremor-content-strong dark:shadow-dark-tremor-input hover:dark:bg-dark-tremor-background-muted"
          onClick={() => setExtended(!extended)}
        >
          {extended ? 'Ver menos' : 'Ver más'}
        </button>
      </div>
    </Card>
  );
};
