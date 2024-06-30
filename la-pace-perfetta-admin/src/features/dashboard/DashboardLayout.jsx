import { useGetRecentBookings } from "./useGetRecentBookings";
import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import { useGetRecentStays } from "./useGetRecentStays";
import Stats from "./Stats";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;


function DashboardLayout() {

  const {isLoading: isLoadingBookings, bookings} = useGetRecentBookings();
  const {isLoading: isLoadingStays, confirmStays, numDays} = useGetRecentStays();

  if(isLoadingStays || isLoadingBookings) return <Spinner/>

  return (
    <StyledDashboardLayout>
      <Stats bookings={bookings} confirmStays={confirmStays} numDays={numDays}/>
      <TodayActivity/>
      <DurationChart confirmStays={confirmStays}/>
      <SalesChart bookings={bookings} numDays={numDays}/>
    </StyledDashboardLayout>
  );
}
export default DashboardLayout
