import { CarsTable } from "@/components/global/autoscout24/CarsTable";
import { ScrapySearchCar } from "@/components/global/autoscout24/SearchCard";
import { addCar, addOldRequest, addUniqueObject, findDublicateNumbers, setError, setInfo, setLoading, setRequestData } from "@/state/autoscout24/AutoScout24Slice";
import { AppDispatch, RootState } from "@/state/store";
import { useEffect } from "react";

import { useSelector ,useDispatch} from "react-redux";

const AutoScout24 = () => {
    const requestData = useSelector((state: RootState) => state.autoscout24.requestData);
    const uniqueObjects = useSelector((state: RootState) => state.autoscout24.uniqueObjects);
    const isLoading = useSelector((state: RootState) => state.autoscout24.loading);
    const oldRequestData = useSelector((state: RootState) => state.autoscout24.oldRequests);
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
                    if(!uniqueObjects.has(decodedChunk)){
                        dispatch(addUniqueObject(decodedChunk))
                        dispatch(addCar(obj));
                    }else{
                        console.log('--------duplicate')
                    }
                }else{
                    dispatch(setInfo(obj));
                }
              }
            } catch (error) {
                console.log(error)
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
            if(oldRequestData.includes(JSON.stringify(form_data))){
                const confirm = window.confirm('You have already scraped this url! Do you want to continue?');
                if (confirm) {
                    dispatch(setRequestData(RequestData));
                }else{
                    
                    return
                }
            }else{
                dispatch(setRequestData(RequestData));
                dispatch(addOldRequest());
            }
        }else{
            dispatch(setError('Invalid url'))
        }
        console.log(form_data);
        console.log(oldRequestData);
    }
    // test if there is nay repeated number in cars vendor numbers
  useEffect(() => {
    if(!isLoading){
        console.log("test")
        dispatch(findDublicateNumbers())
    }}
    ,[dispatch, isLoading])
    return (
        <div className="flex flex-col w-full items-center">
            <div>
            <ScrapySearchCar handleSubmit={handleSubmit} />
            </div>
        <div>
            <CarsTable />
        </div>
        </div>
    )
};

export default AutoScout24;