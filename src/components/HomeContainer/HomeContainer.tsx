import {
  HomeHeaderHeadLine,
  HomeHeaderHeadSideLine,
  HomeHeaderTab,
  HomeProfileContainer,
  ProfileDetails,
  ProfileDetailsContainer,
} from "./HomeContainer.styles";
import ProfileImaage from "../../assets/ProfileImages/ProfileImage.jpeg";
import { FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

const HomeContainer = () => {
  return (
    <HomeHeaderTab>
      <HomeHeaderHeadLine>
        Become a world-class developer with Pakka Course.
      </HomeHeaderHeadLine>
      <HomeHeaderHeadSideLine>
        From DSA to Development, learn everything you need to crack top tech
        interviews and real-world challenges.
      </HomeHeaderHeadSideLine>
      <HomeProfileContainer>
        <img src={ProfileImaage} alt="Profile Image" />
        <ProfileDetailsContainer>
          <ProfileDetails>
            <span className="profile-name">Rahul Yadav</span>
            <br />
            <span className="profile-designation">Founder & Instructor</span>
            <div className="social-icons">
              <a target="_blank" href="https://www.instagram.com/rahul_snippets/">
                <FaInstagram size={24} color="#E1306C" />
              </a>
              <a target="_blank" href="https://www.linkedin.com/company/pakkacourse/">
                <FaLinkedin size={24} color="#0A66C2" />
              </a>
              <a target="_blank" href="https://www.youtube.com/@pakkacourse">
                <FaYoutube size={24} color="#FF0000" />
              </a>
            </div>
          </ProfileDetails>
        </ProfileDetailsContainer>
      </HomeProfileContainer>
    </HomeHeaderTab>
  );
};

export default HomeContainer;
