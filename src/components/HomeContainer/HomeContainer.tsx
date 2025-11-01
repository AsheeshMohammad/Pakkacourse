import {
  HomeHeaderHeadLine,
  HomeHeaderHeadSideLine,
  HomeHeaderTab,
  HomeProfileContainer,
  ProfileDetails,
  ProfileDetailsContainer,
} from "./HomeContainer.styles";
import ProfileImaage from "../../assets/ProfileImages/ProfileImage.jpeg";
import SocialLinks from "../SocialLinks/SocialLinks";

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
              <SocialLinks />
            </div>
          </ProfileDetails>
        </ProfileDetailsContainer>
      </HomeProfileContainer>
    </HomeHeaderTab>
  );
};

export default HomeContainer;
