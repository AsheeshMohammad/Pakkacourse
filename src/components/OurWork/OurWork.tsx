import {
  OurWorkContainer,
  WorkContainerContainer,
} from "./OurWork.styles";
import { SectionHeader } from "../../styles/globalStyles";
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
  { img: Img1, detail: "Delivering Career Guidance to Gitam Deemed University students" },
  { img: Img2, detail: "Leading Initial Physical Classes and hands-on instruction" },
  { img: Img3, detail: "Pioneering the first sessions of Live Online Teaching" },
  { img: Img4, detail: "Mentoring Central University Haryana students and sharing professional insights" },
  { img: Img5, detail: "Fostering Active Student Participation in virtual learning environments" },
  { img: Img6, detail: "Launching the Coding Competition (setting the stage)" },
  { img: Img7, detail: "Successfully Managing and concluding the coding competition event" },
  { img: Img8, detail: "Briefing Participants and clarifying competition rules" },
];
  return (
    <OurWorkContainer className="work-section">
      <SectionHeader>Our Work</SectionHeader>
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
