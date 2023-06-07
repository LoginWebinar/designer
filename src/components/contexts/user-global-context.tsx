"use client";
import {createContext, useContext, Dispatch, SetStateAction, useState,useEffect } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { doc,getDoc,onSnapshot, Timestamp,updateDoc } from "firebase/firestore";
import { UserDataType } from "../types/user-data-type";
import {initFirebase,auth,db} from "../utils/firebase-app";


/**
 * Created by: Rob Helmstetter
 * Date: 4/02/23
 * 
 * this is the global context that stores information about the user to be presented on other pages
 * using the firestore auto update is on the users table. Any change to the users table will be
 * automatically updates to the userData global context.
 * 
 * Updates:
 * 
 * 
 */

interface ContextProps {
    uid: string,
    user: User|null,
    userData: UserDataType[],
}

const GlobalContext = createContext<ContextProps>({
    uid: "",
    user: null,
    userData: [],
});


export const GlobalContextProvider = ({ children }:{children:any}) => {
    initFirebase();
    const [uid, setUID] = useState("");
    const [userData, setUserData] = useState<[] | UserDataType[]>([]);
    const [userReady,setUserReady] = useState(false);
    const [user,setUser] = useState<User | null>(null);

    const getUsersData = async (_uid:string) =>{
        /**
         * This is used if the user clicks on the refresh button as the globel context
         * is gone. Lets see if the auth has the uid and reset the globel uid context
         * to be the auth uid, otherwise, log out this user and bring them back to the login page
         * get the users data from Firestore Users collection
         * This user can be new, so it may not have all the 
         * data fields for the user
         */
        const usersDocRef = doc(db,"users",_uid);
        try {
            const usersSnap = await getDoc(usersDocRef);
            if(usersSnap.exists()) {
                const _usersData = usersSnap.data();
                return _usersData;
            }
        }catch(error){
            console.log(error);
        }
            
    }

    const writeLoginUserData = async (_uid:string ) =>{
        /**
         * Add the timestamp to the docData
         */
        let docData = { designerLoginTimestamp: Timestamp.now() };
        
        const usersDocRef = doc(db,"users",_uid);
        try {
            await updateDoc(usersDocRef,docData);
        } catch (error) {
            console.log(error);
        }
         
    }


   

    useEffect(()=>{
        /**
         * This runs upon when the auth changes from nothering to something
         * we collect the authenication data.
         */
        const unsubscribe = onAuthStateChanged(auth, async (currentUser)=>{
            if (currentUser===null){
                /**
                 * this is if the currentUser is null, most likely from signing out
                 */
                setUserReady(()=>{return false});
                setUID("");
                setUserData([]);
                setUser(()=>null);
                return;
            }
            
            const _unknown = await getUsersData(currentUser.uid) as unknown;
            const _data = _unknown as UserDataType;
            
            if (_data?.isDesigner===undefined || _data?.isDesigner==false){
              /**
               * the user may be signed in, but doesn't have the role, so we want to remove
               * this user from accessing the system.
               */
              auth.signOut();
              setUserReady(()=>{return false});
              setUID(()=>"");
              setUserData(()=>[]);
              setUser(()=>null);
              return;
            }
            setUser(()=>currentUser);
            setUID(()=>currentUser.uid);
            setUserData(()=>[_data]);
            // /**
            //  * write off the known login data into the users collection
            //  */
            await writeLoginUserData(currentUser.uid);
            
          
            /**
             * this will allow the SubscribeUser in the useEffect below.
             */
            setUserReady(()=>true);
        });
        return() =>{
            unsubscribe();
        }
    },[]);
    
    useEffect(()=>{
        /**
         * this runs after the UID changes and gathers all the data about the user
         * and stores their data
         */
        if (uid===""){
            /**
             * the UID is not set so do not let this be available until there is 
             * value in the UID
             */
            return;
        }
       
        const unsubscribeUser = onSnapshot(doc(db,"users",uid),(doc)=>{
            /**
             * Cast the _data from the database into the type
             * and then save that into the UserData state
             */
            
            const _data = doc.data() as UserDataType;
            if (_data?.isDesigner===undefined || _data?.isDesigner==false){
              /**
               * the user may be signed in, but doesn't have the role, so we want to remove
               * this user from accessing the system.
               */
              auth.signOut();
              setUserReady(()=>{return false});
              setUID(()=>"");
              setUserData(()=>[]);
              return;
            }

            setUserData([_data]);
        });
       
        
        return() =>{
            unsubscribeUser();
        }

    },[userReady]);

    
    return (
        <GlobalContext.Provider value={{ uid, userData, user }}>
            {children}
        </GlobalContext.Provider>
    )
};

export const useGlobalContext = () => useContext(GlobalContext);