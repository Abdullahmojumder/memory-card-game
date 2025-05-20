function Card({ id, name, image, onClick }) {
  return (
    <div
      className="bg-white rounded-lg shadow-lg p-4 cursor-pointer transform hover:scale-105 transition-transform duration-200"
      onClick={() => onClick(id)}
    >
      <img src={image} alt={name} className="w-32 h-32 mx-auto" />
      <p className="text-center capitalize text-lg font-semibold mt-2">{name}</p>
    </div>
  );
}

export default Card;