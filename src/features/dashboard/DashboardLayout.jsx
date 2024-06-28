import { useGetRecentBookings } from "./useGetRecentBookings";
import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import { useGetRecentStays } from "./useGetRecentStays";
import Stats from "./Stats";

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
      <div>Activities</div>
      <div>Chart</div>
      <div>Stats</div>
    </StyledDashboardLayout>
  );
}
export default DashboardLayout
