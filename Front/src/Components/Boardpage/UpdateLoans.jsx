import React, { useEffect, useState } from 'react';

export const UpdateLoans = ({ loanId, onUpdateSuccess }) => {
  const [loanData, setLoanData] = useState({
    nombre: '',
    direccion: '',
    interes: '',
    cantidad: '',
    fechaPrestamo: '',
    fechaPago: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDebt = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3000/loans/${loanId}`);
        if (!response.ok) throw new Error('No se pudo cargar la deuda');
        const data = await response.json();

        setLoanData({
          nombre: data.name || '',
          direccion: data.address || '',
          interes: data.interest ? data.interest.replace('%', '') : '',
          cantidad: data.amount || '',
          fechaPrestamo: data.date ? data.date.split('T')[0] : '',
          fechaPago: data.dueDate ? data.dueDate.split('T')[0] : '',
        });

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchDebt();
  }, [loanId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoanData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar campos necesarios si quieres, aquí un ejemplo básico:
    if (
      !loanData.nombre.trim() ||
      !loanData.cantidad ||
      isNaN(loanData.cantidad) ||
      !loanData.interes ||
      isNaN(loanData.interes)
    ) {
      alert('Por favor, complete todos los campos correctamente');
      return;
    }

    const updatedDebt = {
      name: loanData.nombre.trim(),
      address: loanData.direccion.trim(),
      interest: `${loanData.interes}%`,
      amount: Number(loanData.cantidad),
      date: loanData.fechaPrestamo,
      dueDate: loanData.fechaPago,
    };

    try {
      const response = await fetch(`http://localhost:3000/loans/${loanId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedDebt),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Error al actualizar la deuda');
      }

      alert('✅ Deuda actualizada correctamente');
      if (onUpdateSuccess) onUpdateSuccess();
    } catch (err) {
      alert(`❌ Error al actualizar la deuda: ${err.message}`);
    }
  };

  if (loading) return <p>Cargando datos...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6">Actualizar Deuda</h2>

        <label className="block mb-2 font-medium">Nombre</label>
        <input
          type="text"
          name="nombre"
          value={loanData.nombre}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
          required
        />

        <label className="block mb-2 font-medium">Dirección</label>
        <input
          type="text"
          name="direccion"
          value={loanData.direccion}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
        />

        <label className="block mb-2 font-medium">% de Interés</label>
        <input
          type="number"
          name="interes"
          value={loanData.interes}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
          min="0"
          step="0.01"
          required
        />

        <label className="block mb-2 font-medium">Cantidad de Dinero</label>
        <input
          type="number"
          name="cantidad"
          value={loanData.cantidad}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
          min="0"
          step="0.01"
          required
        />

        <label className="block mb-2 font-medium">Fecha de Deuda</label>
        <input
          type="date"
          name="fechaPrestamo"
          value={loanData.fechaPrestamo}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
          required
        />

        <label className="block mb-2 font-medium">Fecha de Pago</label>
        <input
          type="date"
          name="fechaPago"
          value={loanData.fechaPago}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-6"
          required
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700"
        >
          Actualizar Deuda
        </button>
      </form>
    </div>
  );
};
