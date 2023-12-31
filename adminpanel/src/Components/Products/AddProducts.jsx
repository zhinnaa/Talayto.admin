import React from "react";
import {
  GlobalStyle,
  Container,
  Wrapper,
  StepperHeader,
  ButtonStep,
  StepNum,
  ContentHeader,
  ContentTitle,
  ContentSubtitle,
  Novalidate,
  Footer,
  PreButton,
  PreIcon,
  PreSpan,
  NextButton,
  NextIcon,
  NextSpan,
  Headers,
  HeaderText,
  HeaderIcon,
} from "../../StyleComponent/AddProducts";
import { useState } from "react";
import steps from "./steps";
import Acount from "./Steps/Acount";
import Details from "./Steps/Details";
import Payment from "./Steps/Payment";
import Final from "./Steps/Final";
import NavBars from "../NavBar";
// import { useStepperContext } from "../../Contexts/StepperContext";
import axios from "../Axios";
import { Toast } from "../Toast";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { useContext } from "react";
import { StepperContext, UseContextProvider } from "../../Contexts/StepperContext";

export default function StepWizard({}) {
  const [currentStep, setCurrentStep] = useState(0);
  const currentProduct = steps[currentStep].productName;
  const currentProductDetails = steps[currentStep].productDetails;
  const [clicked, setClicked] = useState(false);
  const [clickedBack, setClickedBack] = useState(false);
  const [isFinalStep, setIsFinalStep] = useState(false);
  const { userData } = useContext(StepperContext)

  useEffect(() => {
    console.log(userData)
  }, [userData])
  const goToNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setIsFinalStep(currentStep + 1 === steps.length - 1);
    }
    setClicked(true);
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
    setClickedBack(true);
  };

  const displayStep = (step) => {
    switch (step) {
      case 0:
        return <Acount />;
      case 1:
        return <Details />;

      default:
    }
  };
  const submitData =  () => {

    const dataToSubmit = {
      ...userData,
      weight: parseFloat(userData.weight),
      weightUnit: parseFloat(userData.weightUnit),
      wage: parseFloat(userData.wage),
      quantity: parseInt(userData.quantity),
      discount: parseFloat(userData.discount),
     
    };
    const url = "http://91.107.160.88:3001/v1/product";
  
    axios
    .post("/product",dataToSubmit)
    .then(function (response) {
      console.log("response:", response);
      if (response.status == 200) {
      }
    })
    .catch(function (error) {
      console.error("Error:code", error);
      Toast(error.response.data.errorMessage, false);
    });
    console.log("Submitting data:", userData);
  };
  



  return (
    <>
    {/* <UseContextProvider> */}
      <ToastContainer/>
    <Container>
      <NavBars />
      <GlobalStyle />
      <Headers>
        <HeaderIcon></HeaderIcon>
        <HeaderText>اضافه کردن محصول</HeaderText>
      </Headers>
      <Wrapper>
        <StepperHeader>
          <ButtonStep>
            {steps.map((step, index) => (
              <StepNum
                key={step.title}
                active={index === currentStep}
                onClick={() => setCurrentStep(index)}
              >
                {step.title}
              </StepNum>
            ))}
          </ButtonStep>
        </StepperHeader>

        <ContentHeader>
          <ContentTitle>{currentProduct}</ContentTitle>
          <ContentSubtitle>{currentProductDetails}</ContentSubtitle>
        </ContentHeader>
        <Novalidate>
          {displayStep(currentStep)}
        </Novalidate>

        <Footer>
          <NextButton
            onClick={() => {
              goToNextStep();
              console.log("isFinalStep:", isFinalStep);
              if (isFinalStep) {
                submitData();
              }
            }}
            style={{ backgroundColor: clicked ? "#665be0" : "gray" }}
          >
            <NextIcon></NextIcon>
            <NextSpan>{isFinalStep ? "Submit" : "Next"}</NextSpan>
          </NextButton>

          <PreButton
            disabled={currentStep === 0}
            onClick={goToPreviousStep}
            style={{ backgroundColor: clickedBack ? "#665be0" : "gray" }}
          >
            <PreSpan>Pre</PreSpan>
            <PreIcon></PreIcon>
          </PreButton>
        </Footer>
      </Wrapper>
    </Container>
    {/* </UseContextProvider> */}
    
    </>
  );
}
