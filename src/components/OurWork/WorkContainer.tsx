import { WorkDetailProps } from "../../utils/constants"
import { WorkContainerDetails } from "./OurWork.styles"

const WorkContainer = ({img,detail}:WorkDetailProps) => {
  return (
    <WorkContainerDetails>
        <img src={img} alt="img" />
        <span>{detail}</span>
    </WorkContainerDetails>
  )
}

export default WorkContainer