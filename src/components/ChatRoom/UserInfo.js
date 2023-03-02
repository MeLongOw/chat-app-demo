import { useContext } from "react";
import { Button, Avatar, Typography } from "antd";
import styled from "styled-components";
import { signOut } from "firebase/auth";
import { AuthContext } from "../../Context/AuthProvider";
import { AppContext } from "../../Context/AppProvider";
import { auth } from "../../firebase/config";

const WrapperStyled = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 12px 16px;
    border-bottom: 1 solid rgba(82, 38, 83);
    .username {
        color: white;
        margin-left: 5px;
    }
`;

export default function UserInfo() {
    const {
        user: { displayName, photoURL },
    } = useContext(AuthContext);
    const { clearState } = useContext(AppContext);

    return (
        <WrapperStyled>
            <div>
                <Avatar src={photoURL}>
                    {photoURL ? "" : displayName?.charAt(0)?.toUpperCase()}
                </Avatar>
                <Typography.Text className="username">
                    {displayName}
                </Typography.Text>
            </div>
            <Button
                ghost
                onClick={() => {
                    // clear state in App Provider when logout
                    clearState();
                    signOut(auth);
                }}
            >
                Đăng xuất
            </Button>
        </WrapperStyled>
    );
}
