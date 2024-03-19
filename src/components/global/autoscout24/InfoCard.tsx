import { RootState } from "@/state/store";
import React from "react";
import { useSelector } from "react-redux";

interface InfoCardProps {}

const InfoCard: React.FC<InfoCardProps> = () => {
  const requestState = useSelector(
    (state: RootState) => state.autoscout24.requestState
  );
  const info = useSelector((state: RootState) => state.autoscout24.info);
  const cars = useSelector((state: RootState) => state.autoscout24.cars);
  const sumProductRequested = useSelector(
    (state: RootState) => state.autoscout24.sumProductRequested
  );
  const productsNumBeforeLastRequest = useSelector(
    (state: RootState) => state.autoscout24.productsNumBeforeLastRequest
  );
  const isLoading = useSelector(
    (state: RootState) => state.autoscout24.loading
  );
  const errors_lst = info.errors_list.filter((error)=>!error.startsWith("error/"))
  return (
    <div>
      {isLoading && (
        <div>
          <h2>Progress</h2>
          <p>
            {requestState} ... ({cars.length}/{sumProductRequested})
          </p>
        </div>
      )}
      <h2>Request info</h2>
      <ul>
        <li>Number of pages: {info.num_of_pages}</li>
        <li>Start from page: {info.start_from_page}</li>
        <li>Stop in page: {info.end_in_page}</li>
        <li>Products Got: {cars.length - productsNumBeforeLastRequest}</li>
        { errors_lst.length > 0 &&
        <li>
          Errors list:
          <ul>
            {errors_lst.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </li>}
      </ul>
    </div>
  );
};

export default InfoCard;
