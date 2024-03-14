import { ScrapySearchCar } from "@/components/global/autoscout24/SearchCard";
import { addCar, setError, setInfo, setLoading, setRequestData } from "@/state/autoscout24/AutoScout24Slice";
import { AppDispatch, RootState } from "@/state/store";
import { useEffect } from "react";

import { useSelector ,useDispatch} from "react-redux";

const AutoScout24 = () => {
    const requestData = useSelector((state: RootState) => state.autoscout24.requestData);
    // const data = useSelector((state: RootState) => state.autoscout24.data);
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        if(!isValidUrl(requestData.url)) return
        const fetchData = async () => {
            try {
              dispatch(setLoading(true))
              const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: requestData.url,
                startPage: requestData.startPage,
                offersNumber: requestData.offers,
                waitingTime: requestData.waitingTime,
            })
            };
              const response = await fetch('http://localhost:3000/scrape',requestOptions);
              if (!response.ok || !response.body) {
                throw response.statusText;
              }
       
              const reader = response.body.getReader();
              const decoder = new TextDecoder();
       
              // eslint-disable-next-line no-constant-condition
              while (true) {
                const { value, done } = await reader.read();
                if (done) {
                    dispatch(setLoading(false));
                    break;
                }
       
                const decodedChunk = decoder.decode(value, { stream: true });
                const obj = JSON.parse(decodedChunk)
                console.log(obj)
                if(obj.url !== undefined){
                    dispatch(addCar(obj));
                }else{
                    dispatch(setInfo(obj));
                }
              }
            } catch (error) {
                dispatch(setLoading(false));
              // add later the other errors
            }
          };

          fetchData()
       
          
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [requestData]);
    const isValidUrl = (url: string) => {
        return url.trim().startsWith('https://www.autoscout24.fr/lst')
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(setError(null))
        const form_data:{[k:string]: string |number |FormDataEntryValue} = Object.fromEntries(new FormData(e.currentTarget));
        form_data.url = form_data.url as string; 
        form_data.startPage  =  parseInt(form_data.startPage as string);
        form_data.offers =  parseInt(form_data.offers as string);
        form_data.waitingTime =  parseInt(form_data.waitingTime as string);
        console.log(form_data);
        const RequestData = {
            url: form_data.url,
            startPage: form_data.startPage,
            offers: form_data.offers,
            waitingTime: form_data.waitingTime,
        }
        if(isValidUrl(form_data.url)){
            dispatch(setRequestData(RequestData));
        }else{
            dispatch(setError('Invalid url'))
        }
        console.log(form_data);
    }

    return (
        <div>
            <ScrapySearchCar handleSubmit={handleSubmit} />
        </div>
    );
};

export default AutoScout24;