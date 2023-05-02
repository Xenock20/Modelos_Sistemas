export default function TablaHistorial({ lista }) {
  const historial = lista;

  return (
    <table>
      <thead>
        <tr>
          <td>Fecha de Realizacion</td>
          <td>Tipo</td>
          <td>Id de Producto</td>
        </tr>
      </thead>
      <tbody>
        {historial.map((historia) => (
          <tr key={historia.id}>
            <td>{historia.fdr}</td>
            <td>{historia.tipo}</td>
            <td>{historia.idProducto}</td>
          </tr>
        ))}
      </tbody>
      <tfoot></tfoot>
    </table>
  );
}
