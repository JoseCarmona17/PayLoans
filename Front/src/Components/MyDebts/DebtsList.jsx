import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '@tremor/react';
import { useEffect, useState } from 'react';
import { CreateDebts } from '../Boardpage/CreateDebts';
import { UpdateDebts } from '../Boardpage/UpdateDebts';

export const DebtsList = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateLoan, setShowCreateLoan] = useState(false);
  const [debtsToEditId, setDebtsToEditId] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      setError('Usuario no autenticado');
      setLoading(false);
      return;
    }

    fetch(`http://localhost:3000/users/${user.id}/debts`)
      .then((res) => {
        if (!res.ok) throw new Error('Error al cargar préstamos');
        return res.json();
      })
      .then((data) => {
        setLoans(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleDeletedebts = async (id) => {
    const confirmDelete = confirm('¿Estás seguro de eliminar esta deuda?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:3000/debts/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('No se pudo eliminar la deuda');
      }

      // Actualiza la lista local
      setLoans((prevLoans) => prevLoans.filter((loan) => loan.id !== id));
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  if (showCreateLoan) {
    return <CreateDebts />;
  }

  if (debtsToEditId) {
      return (
        <UpdateDebts
          loanId={debtsToEditId}
          onUpdateSuccess={() => {
            setDebtsToEditId(null);
            window.location.reload();
          }}
        />
      );
    }

  return (
    <>
      <div className="sm:flex sm:items-center sm:justify-between sm:space-x-10 mt-3">
        <div>
          <h3 className="font-semibold text-tremor-content-strong">
            Mis Deudas
          </h3>
          <p className="mt-1 text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
            Lista detallada de Deudas
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowCreateLoan(true)}
          className="mt-4 w-full whitespace-nowrap rounded-tremor-small bg-tremor-brand px-4 py-2.5 text-tremor-default font-medium text-tremor-brand-inverted shadow-tremor-input hover:bg-tremor-brand-emphasis dark:bg-dark-tremor-brand dark:text-dark-tremor-brand-inverted dark:shadow-dark-tremor-input dark:hover:bg-dark-tremor-brand-emphasis sm:mt-0 sm:w-fit"
        >
          Crear Deuda
        </button>
      </div>

      {loading ? (
        <p className="p-4">Cargando...</p>
      ) : error ? (
        <p className="p-4 text-red-500">{error}</p>
      ) : (
        <Table className="mt-8">
          <TableHead>
            <TableRow className="border-b dark:border-dark-tremor-border">
              <TableHeaderCell className="text-tremor-content dark:text-tremor-content-strong">
                Nombre
              </TableHeaderCell>
              <TableHeaderCell className="text-tremor-content dark:text-tremor-content-strong">
                Dirección
              </TableHeaderCell>
              <TableHeaderCell className="text-tremor-content dark:text-tremor-content-strong">
                % de intereses
              </TableHeaderCell>
              <TableHeaderCell className="text-right text-tremor-content dark:text-tremor-content-strong">
                Cantidad
              </TableHeaderCell>
              <TableHeaderCell className="text-right text-tremor-content dark:text-tremor-content-strong">
                Fecha del préstamo
              </TableHeaderCell>
              <TableHeaderCell className="text-right text-tremor-content dark:text-tremor-content-strong mr-5">
                Acciones
              </TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loans.map((loan, index) => (
              <TableRow
                key={index}
                className="even:bg-tremor-background-muted even:dark:bg-dark-tremor-background-muted"
              >
                <TableCell>{loan.name}</TableCell>
                <TableCell>{loan.address || 'Sin dirección'}</TableCell>
                <TableCell>{loan.interest || '0%'}</TableCell>
                <TableCell className="text-right">
                  {`$${Number(loan.amount).toLocaleString()}`}
                </TableCell>
                <TableCell className="text-right">
                  {new Date(loan.date).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <button
                    onClick={() => setDebtsToEditId(loan.id)}
                    className="px-3 py-1 rounded bg-tremor-brand text-white hover:bg-yellow-600 text-sm"

                  >
                    Actualizar
                  </button>
                  <button
                    onClick={() => handleDeletedebts(loan.id)}
                    className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 text-sm"
                  >
                    Eliminar
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};