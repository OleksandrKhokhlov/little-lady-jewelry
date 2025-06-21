export const ProduktCardDetails = ({ }) => {
    
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-lg font-semibold">Produktdetails</h3>
      <p className="text-sm text-gray-600">
        Hier finden Sie alle wichtigen Informationen zu diesem Produkt.
      </p>
      <ul className="list-disc pl-5 text-sm text-gray-700">
        <li>Material: 925er Sterlingsilber</li>
        <li>Größe: Verstellbar von 16 bis 20 cm</li>
        <li>Farbe: Silber</li>
        <li>Lieferumfang: 1 Armband, Geschenkverpackung optional</li>
      </ul>
    </div>
  );
}            