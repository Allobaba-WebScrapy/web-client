import { setUrl } from "@/state/autoscout24/AutoScout24Slice";
import { AppDispatch, RootState } from "@/state/store";

import { useSelector ,useDispatch} from "react-redux";

const AutoScout24 = () => {
    const url = useSelector((state: RootState) => state.autoscout24.url);
    // const data = useSelector((state: RootState) => state.autoscout24.data);
    const dispatch = useDispatch<AppDispatch>();
    return (
        <div>
            <h1>AutoScout24</h1>
            <input type="text" onChange={(e)=>dispatch(setUrl(e.target.value))}/>

            <div>{url}</div>
            <button className="bg-red-200" >click to fetch</button>
        </div>
    );
};

export default AutoScout24;