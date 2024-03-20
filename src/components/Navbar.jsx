import { NavLink } from "react-router-dom";

const Navbar = () => {
  const paths = [
    { name: "Home", url: "/"},
    { name: "Items", url: "/items" },
    { name: "Sales", url: "/sales" }
  ];

  return (
    <>
      <div className="bg-white px-4 py-[0.65rem]">
        <div className="container mx-auto">
          <div className="text-gray-800 text-2xl font-bold">Contoso</div>
        </div>
      </div>
      <nav>
        {paths.map((path, index) => (
          <div key={index} >
              <NavLink
                to={path.url}
                className={({ isActive, isPending }) =>
                  isPending ? "text-lg mb-4 hover:bg-gray-50" : isActive ? "text-lg font-semibold mb-4 bg-gray-100" : "text-lg mb-4 hover:bg-gray-50"
                  }
                >
                <div className="py-2 px-4 m-2 rounded-md bg-inherit ">
                  {path.name}
                </div>
              </NavLink>
          </div>
        ))
        }
      </nav>
      
      
    </>
  );
};

export default Navbar;
