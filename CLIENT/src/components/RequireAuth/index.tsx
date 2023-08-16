import jwtDecode from 'jwt-decode';
import  { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import ExpNotify from '../ExpNotify';

const RequireAuth = () => {
    const token:any = localStorage.getItem("accessToken"); // lấy token từ localStorage về JSON.parse(...)
    console.log(token);
    
    const [exp, setExp] = useState<boolean>(false); // set trạng thái để hiện popup hết phiên đăng nhập
    const navigate = useNavigate();

    useEffect(() => {
        try {
            let date = new Date();
            let decode = jwtDecode(token) as { exp: number };
            if (decode && decode.exp > date.getTime() / 1000) {
                // néu token còn hạn thì chỉ chuyển hướng trang vào outlet
                setExp(false);
                console.log(1111, decode);
            } else {
                // nếu hết hạn thì hiện popup thông báo hết phiên
                setExp(true);
                console.log(1111, "Hết hạn");
            }
        } catch (error) {
            // nếu cố ý nhập bậy token thì cho về login
            navigate("/login");
            console.log(error, "Token bậy vay");
        }
    }, []);

    return (
        <>
            {exp && <ExpNotify />}
            <Outlet />
        </>
    );
};

export default RequireAuth;
