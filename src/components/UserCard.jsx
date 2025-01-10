

const UserCard = ({data}) => {
  const { firstName, lastName, photoUrl, about,age, gender} = data;
  return (
    <div className="card bg-base-300 w-80 h-[28rem] shadow-xl mt-8">
      <figure className="bg-cover bg-center">
        <img
          src={photoUrl}
          alt="Photo"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName} {lastName}</h2>
        <h4>{age}, {gender}</h4>
        <p>{about}</p>
        <div className="card-actions flex justify-center mt-8 relative top-[14px]">
          <button className="btn btn-primary hover:bg-red-700 outline-none">Ignored</button>
          <button className="btn bg-pink-500 hover:bg-green-700">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
