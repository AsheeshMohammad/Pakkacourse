import { WorkDetailProps } from "../../utils/constants"
import { WorkContainerDetails } from "./OurWork.styles"

const WorkContainer = ({img,detail}:WorkDetailProps) => {
  return (
    <WorkContainerDetails>
      <div>
        <img src={img} alt="img" />
        <span>{detail}</span>
      </div>
    </WorkContainerDetails>
  )
}

export default WorkContainer