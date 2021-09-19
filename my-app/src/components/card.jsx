import { Link } from "react-router-dom";

const Card = ({
  card: { _id, bizName, bizDescription, bizAddress, bizPhone, bizImage },
  onDelete,
}) => {
  return (
    <div className="col-md-6 col-lg-4 mt-3">
      <div className="card">
        <img src={bizImage} alt={bizImage} className="p-2" width="100%" />
        <div className="card-body">
          <h5 className="card-title">{bizName}</h5>
          <div className="card-text">{bizDescription}</div>
          <div className="card-text border-top pt-3 mt-4">
            <a rel="noreferrer" target="_blank" href={"tel:" + bizPhone}>
              <i className="bi bi-telephone-fill me-2"></i>
              {bizPhone}
            </a>
          </div>
          <div className="card-text border-top pt-3">
            <a
              rel="noreferrer"
              target="_blank"
              href={
                "https://www.google.com/maps/search/?api=1&query=" + bizAddress
              }
            >
              <i className="bi bi-geo-alt-fill me-2"></i>
              {bizAddress}
            </a>
          </div>
          <div className="card-text border-top pt-3 mt-2">
            <Link to={`my-cards/edit-card/${_id}`}>
              <button className="btn btn-warning float-start">
                <i className="bi bi-pencil-fill"></i> Edit
              </button>
            </Link>
          </div>
          <button className="btn btn-danger float-end" onClick={onDelete}>
            <i class="bi bi-trash-fill"></i> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
