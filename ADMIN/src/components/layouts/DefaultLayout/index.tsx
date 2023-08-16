import { DefaultLayoutProps } from "../../../types/type";
import Sidebar from "../../Sidebar/index";

const DefaultLayout: React.FC<DefaultLayoutProps>  = ({ children }) => {
  return (
    <div>
      <Sidebar />
      <div className="content">{children}</div>
    </div>
  );
};

export default DefaultLayout;
