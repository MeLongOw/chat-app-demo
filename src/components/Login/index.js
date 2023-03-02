import { Row, Col, Typography, Button } from "antd";
import { auth, db } from "../../firebase/config";
import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import {
    query,
    getDocs,
    collection,
    where,
    addDoc,
    serverTimestamp,
} from "firebase/firestore";
import { generateKeywords } from "../../firebase/services";

const { Title } = Typography;
const facebookProvider = new FacebookAuthProvider();

export default function Login() {
    const handleFbLogin = async () => {
        try {
            const data = await signInWithPopup(auth, facebookProvider);
            const user = data.user;
            const q = query(
                collection(db, "users"),
                where("uid", "==", user.uid)
            );
            const docs = await getDocs(q);
            if (docs.docs.length === 0) {
                await addDoc(collection(db, "users"), {
                    uid: user.uid,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    authProvider: user.providerData[0].providerId,
                    email: user.email,
                    createdAt: serverTimestamp(),
                    keywords: generateKeywords(user.displayName?.toLowerCase()),
                });
            }
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    };

    return (
        <Row justify="center" style={{ height: 800 }}>
            <Col span={8}>
                <Title style={{ textAlign: "center" }} level={3}>
                    Chat app
                </Title>
                <Button
                    style={{ width: "100%", marginBottom: 5 }}
                    onClick={handleFbLogin}
                >
                    Đăng nhập bằng Facebook
                </Button>
                <Button style={{ width: "100%", marginBottom: 5 }}>
                    Đăng nhập bằng Google
                </Button>
            </Col>
        </Row>
    );
}
