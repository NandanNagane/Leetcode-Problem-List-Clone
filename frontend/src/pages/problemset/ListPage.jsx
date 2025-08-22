import { useParams } from "react-router-dom";
import CustomList from "../../components/ListComps/CustomList";

export default function ListPage(){
    const{listId}=useParams()
    return(
        <CustomList listId={listId}/>
    )
}