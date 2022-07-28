import { Container, Grid } from "@mui/material";
import CalculatorVector from "./calculator-yondu.svg";

const ContainerCalc = (props) => {
  return (
    <Container
      maxWidth="lg"
      sx={{ height: "100vh", display: "flex", alignItems: "center" }}
    >
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <img src={CalculatorVector} height={"90%"} />
        </Grid>
        <Grid item xs={6}>
          {props.children}
        </Grid>
      </Grid>
    </Container>
  );
};

export default ContainerCalc;
