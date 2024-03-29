import CarsTable from "@/components/global/pagesJaunes/CardsTable";
import { SearchForm } from "@/components/global/pagesJaunes/SearchForm";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { addCard, addOldRequest, addUniqueObject, findDublicateNumbers, setError, setProgress, clearProgress, setLoading, setRequestData, updateProgressCardNumbersForEachPage, setCompletedScrapePage } from "@/state/pagesJaunes/PagesJaunesSlice";
import { AppDispatch, RootState } from "@/state/store";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { processUrl } from "@/lib/pagesjaunes_utils"
import { Route, Routes, useNavigate } from "react-router-dom";
import LoadingPage from "@/components/global/pagesJaunes/LoadingPage";


const PagesJaunes = () => {
    const uniqueObjects = useSelector((state: RootState) => state.pagesJaunes.uniqueObjects);
    const isLoading = useSelector((state: RootState) => state.pagesJaunes.loading);
    const oldRequestData = useSelector((state: RootState) => state.pagesJaunes.oldRequests);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { toast } = useToast()


    // Scrape the data from the server
    const scrape = async (RequestData: any) => {
        if (!isValidUrl(RequestData.url) || !true) return
        console.log(RequestData);
        dispatch(setLoading(true))
        dispatch(clearProgress())
        fetch(`${import.meta.env.VITE_APP_PAGESJAUNES}/setup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                url: RequestData.url,
                startPage: RequestData.startPage,
                endPage: RequestData.endPage,
                businessType: RequestData.businessType,
            }),
        })
            .then(() => {
                navigate("/scrapy/pagesjaunes/loading")
                const eventSource = new EventSource(`${import.meta.env.VITE_APP_PAGESJAUNES}/stream`);

                //! ------------------- Get the progress from the server -------------------
                eventSource.addEventListener('progress', function (event) {
                    if(JSON.parse(event.data).message.includes("Scraping Page completed")){
                        dispatch(setCompletedScrapePage())
                    }
                    dispatch(setProgress(JSON.parse(event.data)));
                });
                //! --------------------- Get the data from the server --------------------
                eventSource.onmessage = function (event) {
                    const obj = JSON.parse(event.data);
                    if (obj.card_url !== undefined) {
                        if (!uniqueObjects.includes(event.data)) {
                            dispatch(addUniqueObject(event.data))
                            obj["selected"] = false;
                            dispatch(addCard(obj));
                            dispatch(updateProgressCardNumbersForEachPage());
                        } else {
                            toast({
                                variant: "destructive",
                                title: "Card is already in the table.",
                                description: "The duplicate version doesn't added to table!",
                            });
                            console.log("duplicated");
                        }
                    }
                }
                //! ------------------- Get the done event from the server -------------------
                eventSource.addEventListener("done", function () {
                    dispatch(setProgress({ type: "progress", message: "Scraping is done" }))
                    dispatch(setLoading(false))
                    eventSource.close();
                });
                //! ------------------- Get the error from the server -------------------
                eventSource.addEventListener("errorEvent", function (event) {
                    console.error(event.data);
                    dispatch(setProgress(JSON.parse(event.data)));
                    dispatch(setLoading(false))
                    eventSource.close();
                });
                eventSource.onerror = function () {
                    dispatch(setProgress({ type: "error", progress: "EventSource failed" }));
                    dispatch(setLoading(false))
                    eventSource.close();
                };
            })
            .catch(() => {
                dispatch(setProgress({ type: "error", progress: "Fetch Connection Error" }));
                toast({
                    variant: "destructive",
                    title: "Fetch Connection Error.",
                    description: "Verifier votre connexion!",
                });
                dispatch(setLoading(false))
            });
    };

    // Check if the url is valid
    const isValidUrl = (url: string) => {
        return url.trim().startsWith("https://www.pagesjaunes.fr/annuaire")
    }

    // Handle the form submit
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(setError(null))

        const form_data: { [k: string]: string | number | FormDataEntryValue } = Object.fromEntries(new FormData(e.currentTarget));
        form_data.url = form_data.url as string;
        form_data.startPage = form_data.startPage as string;
        form_data.endPage = form_data.endPage as string;
        form_data.sortOption = form_data.sortOption as string;
        form_data.businessType = form_data.businessType as string;
        if (isValidUrl(form_data.url)) {
            // Process Url and set Request Data
            const baseUrl =
            {
                url: form_data.url,
                params: {
                    startPage: form_data.startPage,
                    tri: form_data.sortOption,
                },
                endPage: form_data.endPage,
                businessType: form_data.businessType,
            }
            const RequestData = processUrl(baseUrl);
            // Check if the url is already scraped
            if (oldRequestData.includes(JSON.stringify(form_data))) {
                const confirm = window.confirm('You have already scraped this url! Do you want to continue?');
                if (confirm) {
                    dispatch(setRequestData(RequestData));
                    scrape(RequestData)
                } else {

                    return
                }
            } else {
                dispatch(setRequestData(RequestData));
                dispatch(addOldRequest());
                scrape(RequestData)
            }
        } else {
            dispatch(setError({ type: "url", message: "Invalid URL" }))
        }
    }

    // Test if there is nay repeated number in cars vendor numbers
    useEffect(() => {
        if (!isLoading) {
            dispatch(findDublicateNumbers())
        }
    }
        , [dispatch, isLoading])


    return (
        <div className="flex flex-col w-full items-center justify-center">
            <Toaster />
            <Routes>
                // <Route path="/*" element={
                    <React.Fragment>
                        <div>
                            <SearchForm handleSubmit={handleSubmit} />
                        </div>
                    </React.Fragment>
                } />
                <Route path="loading" element={
                    <React.Fragment>
                        <div>
                            <LoadingPage scrape={scrape} />
                        </div>
                    </React.Fragment>
                } />
                <Route path="results" element={
                    <React.Fragment>
                        <div className="flex items-center">
                            <CarsTable />
                        </div>
                    </React.Fragment>
                } />
            </Routes>
        </div>
    )
};

export default PagesJaunes;