import styled from "styled-components";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 180px;
  width: 280x;
`;

function Logo() {
  return (
    <StyledLogo>
      {/* <Img src="/logo-light.png" alt="Logo" /> */}
      <Img src="/header-logo1-light.png" alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;