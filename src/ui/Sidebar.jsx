import styled  from "styled-components";

const StyledSidebar = styled.aside`
    background-color: var(--color-grey-0);
    padding: 3.2rem 2.4rem;
    border-right: 1px solid var(--color-grey-100);

    grid-row: 1 / -1; // sidebar layout to the ,move it the left side
`;

function Sidebar() {
  return (
    <StyledSidebar>Sidebar</StyledSidebar>
  )
}

export default Sidebar;
