import {
  OurWorkContainer,
  OurWorkHeader,
  WorkContainerContainer,
} from "./OurWork.styles";
import Img1 from "../../assets/ProfileImages/GitamSession1.jpeg";
import Img2 from "../../assets/ProfileImages/teach1.jpeg";
import Img3 from "../../assets/ProfileImages/Teach2.jpeg";
import Img4 from "../../assets/ProfileImages/cuhSession1.jpeg";
import Img5 from "../../assets/ProfileImages/cuhSession2.jpeg";
import Img6 from "../../assets/ProfileImages/cuhCompetition1.jpeg";
import Img7 from "../../assets/ProfileImages/CuhCompetition2.jpeg";
import Img8 from "../../assets/ProfileImages/CuhCompetition3.jpeg";
import WorkContainer from "./WorkContainer";
import { WorkDetailProps } from "../../utils/constants";

const OurWork = () => {
  const workDetails: WorkDetailProps[] = [
    { img: Img1, detail: "Project 1 Description" },
    { img: Img2, detail: "Project 2 Description" },
    { img: Img3, detail: "Project 3 Description" },
    { img: Img4, detail: "Project 4 Description" },
    { img: Img5, detail: "Project 5 Description" },
    { img: Img6, detail: "Project 6 Description" },
    { img: Img7, detail: "Project 7 Description" },
    { img: Img8, detail: "Project 8 Description" },
  ];
  return (
    <OurWorkContainer>
      <OurWorkHeader>Our Work</OurWorkHeader>
      <WorkContainerContainer>
        {workDetails.map((workDetail, index) => (
          <WorkContainer
            img={workDetail.img}
            detail={workDetail.detail}
            key={index}
          />
        ))}
      </WorkContainerContainer>
    </OurWorkContainer>
  );
};

export default OurWork;
