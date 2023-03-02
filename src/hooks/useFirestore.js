import {
    collection,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
    where,
} from "firebase/firestore";

import { useEffect, useState } from "react";
import { db } from "../firebase/config";

const useFireStore = (collectionValue, condition) => {
    const [documents, setDocuments] = useState([]);
    useEffect(() => {
        if (condition) {
            if (!condition.compareValue || !condition.compareValue.length) {
                // reset documents data
                setDocuments([]);
                return;
            }
        }
        const q = query(
            collection(db, collectionValue),
            where(
                condition.fieldName,
                condition.operator,
                condition.compareValue
            ),
            orderBy("createdAt")
        );
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const documents = [];
            querySnapshot.forEach((doc) => {
                documents.push({
                    createdAt: serverTimestamp(),
                    ...doc.data(),
                    id: doc.id,
                });
            });
            setDocuments(documents);
        });
        return unsubscribe;
    }, [collectionValue, condition]);
    return documents;
};
export default useFireStore;
