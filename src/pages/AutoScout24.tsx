import { setUrl } from "@/state/autoscout24/AutoScout24Slice";
import { AppDispatch, RootState } from "@/state/store";

import { useSelector ,useDispatch} from "react-redux";

const AutoScout24 = () => {
    const url = useSelector((state: RootState) => state.autoscout24.url);
    const dispatch = useDispatch<AppDispatch>();
    return (
        <div>
            <h1>AutoScout24</h1>
            <input type="text" onChange={(e)=>dispatch(setUrl(e.target.value))}/>

            <div>{url}</div>
        </div>
    );
};

export default AutoScout24;