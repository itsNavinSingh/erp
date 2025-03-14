import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainRoutePath } from "./constants/routepath";
import CustomToast from "./components/CustomToast";

const App: React.FC = () => {
  const routes = createBrowserRouter(MainRoutePath);
  return (
    <>
    <CustomToast />
      <RouterProvider router={routes} />
    </>
  );
};
export default App;
