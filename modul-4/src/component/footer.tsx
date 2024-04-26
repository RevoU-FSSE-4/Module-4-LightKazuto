import { Link } from "react-router-dom";

export default function FooterComponent() {
  return (
    <footer className="text-sm text-stone-600">
      <div className="text-center absolute inset-x-0 bottom-12 ">
        <div>
          <ul  className="flex flex-row justify-center gap-5 mb-3">
            <li><Link to="https://github.com/LightKazuto"> Github </Link></li>
            <li><Link to="#">Linked-in </Link></li>
            <li><Link to="#">Instagram </Link></li>
            <li></li>
          </ul>
        </div>
        <div className="">
          <p> &copy; 2024 My Floris from Amsterdam Ilham Sidiq </p>
        </div>
      </div>
    </footer>
  );
}

